import { LucideIcon } from "lucide-react";

type Stat = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
};

type Activity = {
  title: string;
  meta: string;
  status: string;
};

type DashboardOverviewProps = {
  eyebrow: string;
  title: string;
  description: string;
  stats: Stat[];
  activityTitle: string;
  activities: Activity[];
  sideTitle: string;
  sideItems: string[];
};

const DashboardOverview = ({
  eyebrow,
  title,
  description,
  stats,
  activityTitle,
  activities,
  sideTitle,
  sideItems,
}: DashboardOverviewProps) => {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-secondary">{eyebrow}</p>
        <div className="mt-2 max-w-3xl space-y-2">
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article key={stat.label} className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary/10 text-secondary">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{stat.detail}</p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-lg border border-border bg-card shadow-sm">
          <div className="border-b border-border p-5">
            <h2 className="text-xl font-semibold">{activityTitle}</h2>
          </div>
          <div className="divide-y divide-border">
            {activities.map((activity) => (
              <div
                key={activity.title}
                className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.meta}</p>
                </div>
                <span className="w-fit rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <h2 className="text-xl font-semibold">{sideTitle}</h2>
          <div className="mt-4 space-y-3">
            {sideItems.map((item) => (
              <div
                key={item}
                className="rounded-md border border-border bg-background p-3 text-sm text-muted-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
};

export default DashboardOverview;
