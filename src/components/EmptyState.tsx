export default function EmptyState({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-6">
      <p className="text-[15px] font-semibold mb-1.5" style={{ color: "var(--text)" }}>
        {title}
      </p>
      <p className="text-[13.5px] mb-6" style={{ color: "var(--text-secondary)" }}>
        {subtitle}
      </p>
      {action}
    </div>
  );
}
