"use client";

import { useCallback, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { format } from "date-fns";
import {
  Bold,
  Italic,
  UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Loader2,
  Plus,
  FileDown,
  Save,
  RotateCcw,
  Calendar,
} from "lucide-react";
import { BubbleMenu } from "@tiptap/extension-bubble-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import MedicineRow from "./MedicineRow";
import { downloadPrescriptionPDF } from "./PrescriptionPDF";
import { Prescription, PrescriptionMedicine } from "@/types/prescriptions.types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useCreatePrescription, useUpdatePrescription } from "@/hooks/prescriptions/usePrescription";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PrescriptionEditorProps {
  appointmentId: number;
  patientId: number;
  /** Pass existing prescription to enter edit mode */
  existingPrescription?: Prescription;
  /** Injected doctor + patient info for PDF (from session / appointment detail) */
  doctorInfo?: Prescription["doctor"];
  patientInfo?: Prescription["patient"];
  appointmentInfo?: Prescription["appointment"];
  onSaved?: (prescription: Prescription) => void;
}

const emptyMedicine = (): PrescriptionMedicine => ({
  medicineName: "",
  dosage: "1 tablet",
  frequency: "OD",
  duration: "10 days",
  instruction: "",
});

// ─── Toolbar button ───────────────────────────────────────────────────────────

function ToolbarBtn({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault(); // keep editor focus
              onClick();
            }}
            className={`p-1.5 rounded transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// ─── Rich text toolbar ────────────────────────────────────────────────────────

function RichTextToolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-0.5 p-2 border-b bg-muted/30">
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
        title="Bold (Ctrl+B)"
      >
        <Bold className="h-3.5 w-3.5" />
      </ToolbarBtn>

      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
        title="Italic (Ctrl+I)"
      >
        <Italic className="h-3.5 w-3.5" />
      </ToolbarBtn>

      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive("underline")}
        title="Underline (Ctrl+U)"
      >
        <UnderlineIcon className="h-3.5 w-3.5" />
      </ToolbarBtn>

      <Separator orientation="vertical" className="h-5 mx-1" />

      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive("heading", { level: 3 })}
        title="Heading"
      >
        <span className="text-xs font-bold">H3</span>
      </ToolbarBtn>

      <ToolbarBtn
        onClick={() => editor.chain().focus().setParagraph().run()}
        active={editor.isActive("paragraph")}
        title="Normal text"
      >
        <span className="text-xs">¶</span>
      </ToolbarBtn>

      <Separator orientation="vertical" className="h-5 mx-1" />

      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
        title="Bullet list"
      >
        <List className="h-3.5 w-3.5" />
      </ToolbarBtn>

      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
        title="Numbered list"
      >
        <ListOrdered className="h-3.5 w-3.5" />
      </ToolbarBtn>

      <Separator orientation="vertical" className="h-5 mx-1" />

      <ToolbarBtn
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        active={editor.isActive({ textAlign: "left" })}
        title="Align left"
      >
        <AlignLeft className="h-3.5 w-3.5" />
      </ToolbarBtn>

      <ToolbarBtn
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        active={editor.isActive({ textAlign: "center" })}
        title="Align center"
      >
        <AlignCenter className="h-3.5 w-3.5" />
      </ToolbarBtn>

      <ToolbarBtn
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        active={editor.isActive({ textAlign: "right" })}
        title="Align right"
      >
        <AlignRight className="h-3.5 w-3.5" />
      </ToolbarBtn>
    </div>
  );
}

// ─── Rich text editor field ───────────────────────────────────────────────────

function RichEditor({
  placeholder,
  initialContent,
  onUpdate,
}: {
  placeholder: string;
  initialContent?: string;
  onUpdate: (text: string, json: Record<string, unknown>) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder, emptyEditorClass: "is-empty" }),
      BubbleMenu.configure({
        element: document.querySelector("#bubble-menu"),
      }),
    ],
    content: initialContent || "",
    editorProps: {
      attributes: {
        class: "min-h-[100px] p-3 text-sm focus:outline-none prose prose-sm max-w-none dark:prose-invert",
      },
    },
    onUpdate({ editor }) {
      onUpdate(editor.getText(), editor.getJSON() as Record<string, unknown>);
    },
  });

  return (
    <div className="border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-ring">
      <RichTextToolbar editor={editor} />
      {editor && (
        <>
          <div className="flex items-center gap-0.5 bg-popover border rounded-md shadow-md p-1">
            <ToolbarBtn
              onClick={() => editor.chain().focus().toggleBold().run()}
              active={editor.isActive("bold")}
              title="Bold"
            >
              <Bold className="h-3 w-3" />
            </ToolbarBtn>
            <ToolbarBtn
              onClick={() => editor.chain().focus().toggleItalic().run()}
              active={editor.isActive("italic")}
              title="Italic"
            >
              <Italic className="h-3 w-3" />
            </ToolbarBtn>
            <ToolbarBtn
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              active={editor.isActive("underline")}
              title="Underline"
            >
              <UnderlineIcon className="h-3 w-3" />
            </ToolbarBtn>
          </div>
        </>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PrescriptionEditor({
  appointmentId,
  patientId,
  existingPrescription,
  //   doctorInfo,
  //   patientInfo,
  //   appointmentInfo,
  onSaved,
}: PrescriptionEditorProps) {
  const isEditMode = !!existingPrescription;
  const { data: session } = useSession();

  const authToken = session?.token || session?.user?.token;
  // ── Local form state ──
  const [diagnosis, setDiagnosis] = useState(existingPrescription?.diagnosis ?? "");
  const [diagnosisJson, setDiagnosisJson] = useState<Record<string, unknown>>({});
  const [advice, setAdvice] = useState(existingPrescription?.advice ?? "");
  const [adviceJson, setAdviceJson] = useState<Record<string, unknown>>({});
  const [followUpDate, setFollowUpDate] = useState(
    existingPrescription?.followUpDate
      ? format(new Date(existingPrescription.followUpDate), "yyyy-MM-dd")
      : "",
  );
  const [medicines, setMedicines] = useState<PrescriptionMedicine[]>(
    existingPrescription?.medicines?.length ? existingPrescription.medicines : [emptyMedicine()],
  );
  const [savedPrescription, setSavedPrescription] = useState<Prescription | null>(
    existingPrescription ?? null,
  );
  const [isDownloading, setIsDownloading] = useState(false);

  const createMutation = useCreatePrescription(authToken);
  const updateMutation = useUpdatePrescription(authToken);
  const isSaving = createMutation.isPending || updateMutation.isPending;

  // ── Medicine handlers ──
  const handleMedicineChange = useCallback((index: number, updated: PrescriptionMedicine) => {
    setMedicines((prev) => prev.map((m, i) => (i === index ? updated : m)));
  }, []);

  const handleAddMedicine = () => setMedicines((prev) => [...prev, emptyMedicine()]);

  const handleRemoveMedicine = useCallback((index: number) => {
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // ── Validation ──
  const validate = (): string | null => {
    if (!diagnosis.trim()) return "Diagnosis / chief complaint is required";
    if (medicines.length === 0) return "Add at least one medicine";
    for (let i = 0; i < medicines.length; i++) {
      const m = medicines[i];
      if (!m.medicineName.trim()) return `Medicine #${i + 1}: name is required`;
      if (!m.dosage.trim()) return `Medicine #${i + 1}: dosage is required`;
      if (!m.frequency.trim()) return `Medicine #${i + 1}: frequency is required`;
      if (!m.duration.trim()) return `Medicine #${i + 1}: duration is required`;
    }
    return null;
  };

  // ── Save ──
  const handleSave = async () => {
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    const payload = {
      diagnosis,
      advice,
      followUpDate: followUpDate ? new Date(followUpDate).toISOString() : undefined,
      content: { diagnosisJson, adviceJson }, // store rich text JSON
      medicines,
    };

    try {
      let result: Prescription;

      if (isEditMode && existingPrescription) {
        result = await updateMutation.mutateAsync({
          publicId: existingPrescription.publicId,
          payload,
        });
      } else {
        result = await createMutation.mutateAsync({
          appointmentId,
          patientId,
          ...payload,
        });
      }

      setSavedPrescription(result);
      toast.success(isEditMode ? "Prescription updated!" : "Prescription saved!");
      onSaved?.(result);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;

      toast.error(error.response?.data?.message ?? "Failed to save prescription");
    }
  };

  // ── Download PDF ──
  const handleDownloadPDF = async () => {
    const target = savedPrescription;
    if (!target) {
      toast.error("Save the prescription first before downloading");
      return;
    }
    setIsDownloading(true);
    try {
      await downloadPrescriptionPDF(target);
      toast.success("PDF downloaded!");
    } catch {
      toast.error("Failed to generate PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  // ── Reset ──
  const handleReset = () => {
    setDiagnosis("");
    setAdvice("");
    setFollowUpDate("");
    setMedicines([emptyMedicine()]);
    setSavedPrescription(null);
  };

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* ── Header bar ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{isEditMode ? "Edit Prescription" : "Write Prescription"}</h2>
          {savedPrescription && (
            <Badge variant="outline" className="text-xs text-green-600 border-green-300">
              Saved
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isEditMode && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-muted-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              Reset
            </Button>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownloadPDF}
            disabled={!savedPrescription || isDownloading}
          >
            {isDownloading ? (
              <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
            ) : (
              <FileDown className="h-3.5 w-3.5 mr-1.5" />
            )}
            Export PDF
          </Button>

          <Button type="button" size="sm" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5 mr-1.5" />
            )}
            {isEditMode ? "Update" : "Save Prescription"}
          </Button>
        </div>
      </div>

      {/* ── Diagnosis ── */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          Diagnosis / Chief Complaint <span className="text-destructive">*</span>
        </Label>
        <RichEditor
          placeholder="e.g. Upper respiratory tract infection, Hypertension, Type 2 Diabetes..."
          initialContent={existingPrescription?.diagnosis}
          onUpdate={(text, json) => {
            setDiagnosis(text);
            setDiagnosisJson(json);
          }}
        />
      </div>

      {/* ── Medicines ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">
            Medicines <span className="text-destructive">*</span>
          </Label>
          <Badge variant="secondary" className="text-xs">
            {medicines.length} {medicines.length === 1 ? "item" : "items"}
          </Badge>
        </div>

        {/* Column headers */}
        <div className="hidden sm:grid grid-cols-12 gap-2 px-3 text-xs text-muted-foreground font-medium">
          <div className="col-span-1" />
          <div className="col-span-3">Medicine Name</div>
          <div className="col-span-2">Dosage</div>
          <div className="col-span-2">Frequency</div>
          <div className="col-span-2">Duration</div>
          <div className="col-span-1">Note</div>
          <div className="col-span-1" />
        </div>

        <div className="space-y-2">
          {medicines.map((med, idx) => (
            <MedicineRow
              key={idx}
              index={idx}
              medicine={med}
              onChange={handleMedicineChange}
              onRemove={handleRemoveMedicine}
              isOnly={medicines.length === 1}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddMedicine}
          className="w-full border-dashed text-muted-foreground hover:text-foreground"
        >
          <Plus className="h-3.5 w-3.5 mr-1.5" />
          Add Medicine
        </Button>
      </div>

      {/* ── Advice ── */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Advice / Instructions</Label>
        <RichEditor
          placeholder="e.g. Take plenty of fluids, avoid cold foods, rest for 3 days..."
          initialContent={existingPrescription?.advice}
          onUpdate={(text, json) => {
            setAdvice(text);
            setAdviceJson(json);
          }}
        />
      </div>

      {/* ── Follow-up date ── */}
      <div className="space-y-2 max-w-xs">
        <Label className="text-sm font-medium flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
          Follow-up Date
          <span className="text-xs text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Input
          type="date"
          value={followUpDate}
          onChange={(e) => setFollowUpDate(e.target.value)}
          min={format(new Date(), "yyyy-MM-dd")}
          className="text-sm"
        />
      </div>

      {/* ── Bottom save bar ── */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleDownloadPDF}
          disabled={!savedPrescription || isDownloading}
        >
          {isDownloading ? (
            <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
          ) : (
            <FileDown className="h-3.5 w-3.5 mr-1.5" />
          )}
          Export PDF
        </Button>

        <Button type="button" onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-1.5" />
          )}
          {isEditMode ? "Update Prescription" : "Save Prescription"}
        </Button>
      </div>
    </div>
  );
}
