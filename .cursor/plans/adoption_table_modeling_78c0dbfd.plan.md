---
name: Adoption Table Modeling
overview: Plan to implement an adoption process table that links animals and adopter profiles, with process tracking in the adoption table and availability-only state on animals.
todos:
  - id: define-availability-boundary
    content: Add animals availability-only field and remove process-tracking responsibility from animals
    status: pending
  - id: design-adoptions-schema
    content: Define adoptions enum, columns, FKs, defaults, and nullable adopter assignment
    status: pending
  - id: enforce-animal-owner-consistency
    content: Derive lister ownership from animals via adoptions.animal_id joins in rules and queries
    status: pending
  - id: secure-adoptions-rls
    content: Design RLS policies for listers and adopters without overlapping permissive policies
    status: pending
  - id: add-adoptions-indexes
    content: Add indexes for animal timeline, lister dashboard, adopter dashboard, and status filtering
    status: pending
  - id: define-status-lifecycle-rules
    content: Specify required process transitions and invariants including adoption_date when ADOPTED
    status: pending
  - id: prepare-app-layer-followup
    content: Outline next implementation plan for repositories/use-cases/hooks/screens using adoptions table
    status: pending
isProject: false
---

# Adoption Table Modeling Plan

Implement a dedicated `public.adoptions` model to represent the adoption process between `animals` and `adopter_profiles`, while keeping lister ownership from `animals.lister_profile_id`. The adoption table will be the canonical source of process tracking, and `animals` will keep only availability information.

## Scope and confirmed decisions

- Canonical process tracking lives in `adoptions` (not in `animals`).
- `animals` should only indicate if the pet is available or not.
- One animal can have multiple adoption records over time (unrestricted history).
- Context comes from existing schema in [`/home/mayra/Documents/projects/petmatch/supabase/migrations/20260426000000_animals_table.sql`](file:///home/mayra/Documents/projects/petmatch/supabase/migrations/20260426000000_animals_table.sql) and plan style in [`/home/mayra/Documents/projects/petmatch/.cursor/plans/animal_table_modeling_19dfb9c2.plan.md`](file:///home/mayra/Documents/projects/petmatch/.cursor/plans/animal_table_modeling_19dfb9c2.plan.md).

## Availability boundary

- Add `animals.is_available BOOLEAN NOT NULL DEFAULT true`.
- Deprecate `animals.adoption_status` for business decisions.
- Animal listing/search should filter by `animals.is_available`.
- Process lifecycle, adopter assignment, and adoption dates should come from `adoptions`.

## Target data model

Create `public.adoptions` with:

- `id UUID PRIMARY KEY DEFAULT uuid_generate_v4()`
- `animal_id UUID NOT NULL REFERENCES public.animals(id) ON DELETE CASCADE`
- `adopter_profile_id UUID REFERENCES public.adopter_profiles(id) ON DELETE SET NULL`
- `status` enum with process lifecycle values:
  - `UNDER_REVIEW`
  - `IN_PROGRESS`
  - `VISIT_PENDING`
  - `IN_ADAPTATION`
  - `VISITED`
  - `ADOPTED`
  - `CANCELED`
  - `REJECTED`
- `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`
- `adoption_date TIMESTAMPTZ` (nullable; set when status reaches `ADOPTED`)
- `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`
- `notes TEXT` (internal context for shelter/donor).
- `cancel_reason TEXT` (optional when status is `CANCELED` or `REJECTED`).
- `status_changed_at TIMESTAMPTZ` (audit-friendly timeline support).
- `visit_scheduled_for TIMESTAMPTZ` (planned date/time when status is `VISIT_PENDING`).
- `visited_at TIMESTAMPTZ` (actual visit completion timestamp when status is `VISITED`).
- `adaptation_started_at TIMESTAMPTZ` (start of trial period for `IN_ADAPTATION`).
- `adaptation_ended_at TIMESTAMPTZ` (end of trial period before final decision).
- `decision_notes TEXT` (short rationale for `ADOPTED`, `REJECTED`, or `CANCELED`).

## Relationship and consistency rules

- `adoptions` does not store `lister_profile_id`; owner is derived from `animals.lister_profile_id` through `animal_id`.
- Use normalized ownership checks in queries and RLS through joins to `animals` and `lister_profiles`.
- Keep `animals` availability-only:
  - `animals.is_available` is the only adoption-related field in `animals`.
  - All process flow decisions read from `adoptions.status`.

## RLS policy design

Enable RLS on `public.adoptions` and apply policies:

- **Listers**: can `INSERT/UPDATE/SELECT` rows where `adoptions.animal_id` belongs to an `animals` row owned by their `lister_profile`.
- **Adopters**: can `SELECT` rows where `adopter_profile_id` belongs to `auth.uid()`.
- **Cross-role safety**: no user can update rows outside their linked profile.
- **Catalog reads**: public browsing should remain in `animals` using `is_available`, not direct `adoptions` reads.

Prefer one permissive policy per role/action path to avoid repeated “multiple permissive policies” lint warnings.

## Indexing strategy

- `INDEX (animal_id)` for timeline/history queries by animal.
- `INDEX (adopter_profile_id, created_at DESC)` for adopter journey views.
- `INDEX (status, created_at DESC)` for process tracking.
- Reuse `animals(lister_profile_id, created_at DESC)` for owner dashboard queries that join from `adoptions` to `animals`.
- Keep/introduce `INDEX` on `animals(is_available, created_at DESC)` for available-pet listing.

## Lifecycle rules

- On animal creation by lister: `animals.is_available = true`.
- Candidate enters queue with `status = 'UNDER_REVIEW'`.
- Active progress uses `status = 'IN_PROGRESS'`.
- Visit scheduling uses `status = 'VISIT_PENDING'`.
- Optional trial period uses `status = 'IN_ADAPTATION'`.
- After the adopter visits the pet, set `status = 'VISITED'`.
- Success path: `status = 'ADOPTED'` requires `adoption_date` and sets `animals.is_available = false`.
- Exit paths: `status = 'CANCELED'` or `status = 'REJECTED'` should store `cancel_reason`.
- Keep transitions validated in app/domain layer; enforce critical invariants in DB where feasible.

## Migration and rollout order

1. Add `animals.is_available` and define deprecation path for `animals.adoption_status`.
2. Create enum + `adoptions` table + constraints + indexes.
3. Enable RLS and create role-safe policies.
4. Attach `set_updated_at` trigger for `updated_at`.
5. Implement normalized ownership checks for `adoptions` via `animal_id` joins.
6. Define read model queries for lister and adopter dashboards.
7. Prepare follow-up plan for application-layer integration (repository/use-case/hooks/screens).

## Architecture view

```mermaid
erDiagram
    lister_profiles ||--o{ animals : "owns"
    adopter_profiles ||--o{ adoptions : "joins_as_adopter"
    animals ||--o{ adoptions : "has_process_rows"

    animals {
        uuid id PK
        uuid lister_profile_id FK
        bool is_available
    }

    adoptions {
        uuid id PK
        uuid animal_id FK
        uuid adopter_profile_id FK
        enum status
        timestamptz created_at
        timestamptz updated_at
        timestamptz adoption_date
    }
```

## Acceptance criteria

- `animals` only carries availability for adoption visibility (`is_available`).
- `adoptions` table exists and links `animals`, `lister_profiles`, and optional `adopter_profiles`.
- Process lifecycle is represented in `adoptions` with English statuses (`UNDER_REVIEW`, `IN_PROGRESS`, `VISIT_PENDING`, `IN_ADAPTATION`, `VISITED`, `ADOPTED`, `CANCELED`, `REJECTED`).
- RLS allows only intended read/write access for lister/adopter actors.
- Indexes support lister/adopter dashboards and status filtering.
- Lister ownership for adoptions is resolved from `animals.lister_profile_id` (single source of truth).
