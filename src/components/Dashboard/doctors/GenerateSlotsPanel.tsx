import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

type GenerateSlotsPanelProps = {
  dates: string;
  onDatesChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating?: boolean;
};

export const GenerateSlotsPanel = ({
  dates,
  onDatesChange,
  onGenerate,
  isGenerating = false,
}: GenerateSlotsPanelProps) => {
  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Generate slots</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Generate future appointment slots for selected dates.
      </p>
      <div className="mt-4 space-y-4">
        <label className="block space-y-1 text-sm">
          <span>Dates (comma separated)</span>
          <input
            value={dates}
            onChange={(event) => onDatesChange(event.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            placeholder="2026-06-08,2026-06-09"
          />
        </label>
        <Button onClick={onGenerate} className="w-full" disabled={isGenerating}>
          <RefreshCw className="h-4 w-4" /> {isGenerating ? "Generating..." : "Generate slots"}
        </Button>
      </div>
    </section>
  );
};
