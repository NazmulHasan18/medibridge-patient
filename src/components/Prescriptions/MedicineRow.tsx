"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DOSAGE_PRESETS,
  DURATION_PRESETS,
  FREQUENCY_PRESETS,
  PrescriptionMedicine,
} from "@/types/prescriptions.types";

interface MedicineRowProps {
  index: number;
  medicine: PrescriptionMedicine;
  onChange: (index: number, updated: PrescriptionMedicine) => void;
  onRemove: (index: number) => void;
  isOnly: boolean;
}

/**
 * A single medicine row with:
 * - Free-text medicine name input
 * - Preset selectors (with custom override) for dosage, frequency, duration
 * - Optional instruction
 */
export default function MedicineRow({ index, medicine, onChange, onRemove, isOnly }: MedicineRowProps) {
  const update = (field: keyof PrescriptionMedicine, value: string) => {
    onChange(index, { ...medicine, [field]: value });
  };

  return (
    <div className="grid grid-cols-12 gap-2 items-start p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
      {/* Row number */}
      <div className="col-span-12 sm:col-span-1 flex items-center justify-center">
        <span className="text-xs font-semibold text-muted-foreground bg-background border rounded-full w-6 h-6 flex items-center justify-center">
          {index + 1}
        </span>
      </div>

      {/* Medicine name (free text) */}
      <div className="col-span-12 sm:col-span-3">
        <Input
          placeholder="Medicine name *"
          value={medicine.medicineName}
          onChange={(e) => update("medicineName", e.target.value)}
          className="text-sm font-medium"
        />
      </div>

      {/* Dosage — preset + custom */}
      <div className="col-span-6 sm:col-span-2">
        <Select
          value={DOSAGE_PRESETS.includes(medicine.dosage) ? medicine.dosage : "__custom__"}
          onValueChange={(val) => {
            if (val !== "__custom__") update("dosage", val);
          }}
        >
          <SelectTrigger className="text-xs h-9">
            <SelectValue placeholder="Dosage *" />
          </SelectTrigger>
          <SelectContent>
            {DOSAGE_PRESETS.map((d) => (
              <SelectItem key={d} value={d} className="text-xs">
                {d}
              </SelectItem>
            ))}
            <SelectItem value="__custom__" className="text-xs text-muted-foreground">
              Custom…
            </SelectItem>
          </SelectContent>
        </Select>
        {/* Show input if value is custom */}
        {!DOSAGE_PRESETS.includes(medicine.dosage) && (
          <Input
            className="mt-1 text-xs h-8"
            placeholder="e.g. 250mg"
            value={medicine.dosage}
            onChange={(e) => update("dosage", e.target.value)}
          />
        )}
      </div>

      {/* Frequency — preset + custom */}
      <div className="col-span-6 sm:col-span-2">
        <Select
          value={
            FREQUENCY_PRESETS.map((f) => f.value).includes(medicine.frequency)
              ? medicine.frequency
              : "__custom__"
          }
          onValueChange={(val) => {
            if (val !== "__custom__") update("frequency", val);
          }}
        >
          <SelectTrigger className="text-xs h-9">
            <SelectValue placeholder="Frequency *" />
          </SelectTrigger>
          <SelectContent>
            {FREQUENCY_PRESETS.map((f) => (
              <SelectItem key={f.value} value={f.value} className="text-xs">
                <span className="font-semibold">{f.value}</span>
                <span className="text-muted-foreground ml-1">— {f.label}</span>
              </SelectItem>
            ))}
            <SelectItem value="__custom__" className="text-xs text-muted-foreground">
              Custom…
            </SelectItem>
          </SelectContent>
        </Select>
        {!FREQUENCY_PRESETS.map((f) => f.value).includes(medicine.frequency) && (
          <Input
            className="mt-1 text-xs h-8"
            placeholder="e.g. 1+0+1"
            value={medicine.frequency}
            onChange={(e) => update("frequency", e.target.value)}
          />
        )}
      </div>

      {/* Duration — preset + custom */}
      <div className="col-span-6 sm:col-span-2">
        <Select
          value={DURATION_PRESETS.includes(medicine.duration) ? medicine.duration : "__custom__"}
          onValueChange={(val) => {
            if (val !== "__custom__") update("duration", val);
          }}
        >
          <SelectTrigger className="text-xs h-9">
            <SelectValue placeholder="Duration *" />
          </SelectTrigger>
          <SelectContent>
            {DURATION_PRESETS.map((d) => (
              <SelectItem key={d} value={d} className="text-xs">
                {d}
              </SelectItem>
            ))}
            <SelectItem value="__custom__" className="text-xs text-muted-foreground">
              Custom…
            </SelectItem>
          </SelectContent>
        </Select>
        {!DURATION_PRESETS.includes(medicine.duration) && (
          <Input
            className="mt-1 text-xs h-8"
            placeholder="e.g. 10 days"
            value={medicine.duration}
            onChange={(e) => update("duration", e.target.value)}
          />
        )}
      </div>

      {/* Instruction (optional free text) */}
      <div className="col-span-5 sm:col-span-1">
        <Input
          placeholder="Note"
          value={medicine.instruction ?? ""}
          onChange={(e) => update("instruction", e.target.value)}
          className="text-xs h-9"
          title="e.g. After meal, With water"
        />
      </div>

      {/* Remove button */}
      <div className="col-span-1 flex items-center justify-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onRemove(index)}
          disabled={isOnly}
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
          title="Remove medicine"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
