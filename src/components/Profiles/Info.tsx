export function Info({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      {icon}

      <div>
        <p className="text-muted-foreground text-sm">{label}</p>

        <p className="font-medium break-all">{value || "-"}</p>
      </div>
    </div>
  );
}
