export function formatPetAgeLabel(birthDate: string): string {
  const birth = new Date(birthDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - birth.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) return `${diffYears} ANO${diffYears > 1 ? "S" : ""}`;
  if (diffMonths > 0) return `${diffMonths} MÊS${diffMonths > 1 ? "ES" : ""}`;
  return `${diffDays} DIA${diffDays > 1 ? "S" : ""}`;
}
