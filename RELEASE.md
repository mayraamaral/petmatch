[English version below](#release-process-english)

# Processo de release

Use este fluxo com Changesets para versionar o projeto e gerar atualizações no `CHANGELOG.md`.

## Criar changeset na branch da feature

```bash
pnpm changeset
```

Este comando cria um arquivo em `.changeset/*.md` com:

- tipo de bump (`patch`, `minor` ou `major`)
- resumo da mudança

## Aplicar bump de versão e atualizar changelog

```bash
pnpm changeset version
```

Este comando atualiza:

- `package.json` (versão)
- `CHANGELOG.md` (notas de release)
- arquivos de changeset já aplicados

## Commitar os arquivos de release

```bash
git add .
git commit -m "chore(release): apply changesets"
```

## Referência rápida de versionamento

- `patch`: correções retrocompatíveis (`1.0.0` -> `1.0.1`)
- `minor`: novas funcionalidades retrocompatíveis (`1.0.0` -> `1.1.0`)
- `major`: mudanças quebrando compatibilidade (`1.0.0` -> `2.0.0`)

---

<a id="release-process-english"></a>

# Release Process

Use this Changesets flow to version the project and generate updates in `CHANGELOG.md`.

## Create a changeset on your feature branch

```bash
pnpm changeset
```

This creates a file in `.changeset/*.md` with:

- bump type (`patch`, `minor`, or `major`)
- summary of the change

## Apply version bump and update changelog

```bash
pnpm changeset version
```

This updates:

- `package.json` (version)
- `CHANGELOG.md` (release notes)
- applied changeset files

## Commit release files

```bash
git add .changeset CHANGELOG.md package.json
git commit -m "chore(release): apply changesets"
```

## Versioning quick reference

- `patch`: backward-compatible fixes (`1.0.0` -> `1.0.1`)
- `minor`: backward-compatible features (`1.0.0` -> `1.1.0`)
- `major`: breaking changes (`1.0.0` -> `2.0.0`)
