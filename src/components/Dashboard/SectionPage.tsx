import { LucideIcon } from "lucide-react";

type SectionPageProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  items?: {
    title: string;
    meta: string;
    status: string;
  }[];
};

const SectionPage = ({ title, description, icon: Icon, items }: SectionPageProps) => {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary/10 text-secondary">
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="mt-1 text-muted-foreground">{description}</p>
          </div>
        </div>
      </section>

      {items?.length && (
        <section className="rounded-lg border border-border bg-card shadow-sm">
          <div className="grid grid-cols-[minmax(0,1fr)_120px] gap-4 border-b border-border px-5 py-3 text-sm font-medium text-muted-foreground">
            <span>Details</span>
            <span>Status</span>
          </div>
          <div className="divide-y divide-border">
            {items?.map((item) => (
              <article key={item.title} className="grid grid-cols-[minmax(0,1fr)_120px] gap-4 px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate font-medium">{item.title}</p>
                  <p className="truncate text-sm text-muted-foreground">{item.meta}</p>
                </div>
                <span className="h-fit w-fit rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {item.status}
                </span>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SectionPage;
