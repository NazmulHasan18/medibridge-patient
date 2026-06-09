"use client";

import React from "react";
import { Document, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";
import { FREQUENCY_PRESETS, Prescription } from "@/types/prescriptions.types";
import moment from "moment";

// ─── Font registration (optional — use system fonts as fallback) ──────────────
// Register a clean sans-serif for prescription look
// You can host these in /public/fonts/
// Font.register({
//   family: 'Inter',
//   fonts: [
//     { src: '/fonts/Inter-Regular.ttf' },
//     { src: '/fonts/Inter-Bold.ttf', fontWeight: 'bold' },
//   ],
// });

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 30,
    paddingBottom: 80, // space for footer
    paddingHorizontal: 40,
    color: "#1a1a2e",
    backgroundColor: "#ffffff",
  },

  // ── Header ──
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb",
    paddingBottom: 12,
    marginBottom: 16,
  },
  headerLeft: { flex: 1 },
  platformName: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#2563eb",
    marginBottom: 2,
  },
  platformTagline: { fontSize: 8, color: "#6b7280" },

  headerRight: { alignItems: "flex-end" },
  rxBadge: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    color: "#2563eb",
    opacity: 0.15,
  },

  // ── Doctor / Patient cards ──
  infoRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#f8fafc",
    borderRadius: 4,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#2563eb",
  },
  infoCardRight: {
    borderLeftColor: "#10b981",
  },
  infoTitle: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  infoName: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a2e",
    marginBottom: 2,
  },
  infoSub: { fontSize: 9, color: "#4b5563", marginBottom: 1 },

  // ── Appointment meta ──
  metaRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 14,
    backgroundColor: "#eff6ff",
    padding: 8,
    borderRadius: 4,
  },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaLabel: { fontSize: 8, color: "#6b7280" },
  metaValue: { fontSize: 8, fontFamily: "Helvetica-Bold", color: "#1e40af" },

  // ── Section ──
  section: { marginBottom: 12 },
  sectionTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#2563eb",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 5,
    paddingBottom: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dbeafe",
  },
  sectionText: { fontSize: 10, color: "#374151", lineHeight: 1.5 },

  // ── Medicine table ──
  table: { marginBottom: 12 },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRadius: 3,
    marginBottom: 2,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e5e7eb",
  },
  tableRowEven: { backgroundColor: "#f8fafc" },
  tableRowNumber: {
    width: 22,
    fontSize: 9,
    color: "#9ca3af",
    fontFamily: "Helvetica-Bold",
  },
  tableColName: { flex: 2.5, fontSize: 9 },
  tableColDosage: { flex: 1.2, fontSize: 9 },
  tableColFreq: { flex: 1.2, fontSize: 9 },
  tableColDuration: { flex: 1.2, fontSize: 9 },
  tableColInstruction: { flex: 1.8, fontSize: 9 },
  tableHeaderText: {
    color: "#ffffff",
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
  },
  medicineName: { fontFamily: "Helvetica-Bold", color: "#1a1a2e" },
  medicineInstruction: { fontSize: 8, color: "#6b7280", marginTop: 1 },

  // ── Follow up ──
  followUp: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
    backgroundColor: "#fef3c7",
    borderRadius: 4,
    marginBottom: 12,
  },
  followUpText: { fontSize: 9, color: "#92400e", fontFamily: "Helvetica-Bold" },
  followUpDate: { fontSize: 10, color: "#92400e" },

  // ── Footer ──
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  footerLeft: {},
  footerPlatform: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#2563eb",
  },
  footerSub: { fontSize: 7, color: "#9ca3af", marginTop: 1 },
  footerRight: { alignItems: "flex-end" },
  footerPageNum: { fontSize: 7, color: "#9ca3af" },
  footerDisclaimer: {
    fontSize: 6.5,
    color: "#d1d5db",
    marginTop: 1,
    maxWidth: 220,
    textAlign: "right",
  },

  // ── Watermark ──
  watermark: {
    position: "absolute",
    top: "40%",
    left: "20%",
    fontSize: 60,
    color: "#f1f5f9",
    fontFamily: "Helvetica-Bold",
    transform: "rotate(-30deg)",
    opacity: 0.4,
  },
});

// ─── Sub-components ───────────────────────────────────────────────────────────

function MedicineTable({ medicines }: { medicines: Prescription["medicines"] }) {
  return (
    <View style={styles.table}>
      {/* Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableRowNumber, { color: "#fff" }]}>#</Text>
        <Text style={[styles.tableColName, styles.tableHeaderText]}>Medicine</Text>
        <Text style={[styles.tableColDosage, styles.tableHeaderText]}>Dosage</Text>
        <Text style={[styles.tableColFreq, styles.tableHeaderText]}>Frequency</Text>
        <Text style={[styles.tableColDuration, styles.tableHeaderText]}>Duration</Text>
        <Text style={[styles.tableColInstruction, styles.tableHeaderText]}>Instruction</Text>
      </View>

      {medicines.map((med, i) => (
        <View key={i} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowEven : {}]}>
          <Text style={styles.tableRowNumber}>{i + 1}.</Text>
          <View style={styles.tableColName}>
            <Text style={styles.medicineName}>{med.medicineName}</Text>
          </View>
          <Text style={styles.tableColDosage}>{med.dosage}</Text>
          <Text style={styles.tableColFreq}>
            {med.frequency} - {FREQUENCY_PRESETS.find((data) => data.value === med.frequency)?.label}
          </Text>
          <Text style={styles.tableColDuration}>{med.duration}</Text>
          <Text style={[styles.tableColInstruction, { color: "#6b7280", fontSize: 8.5 }]}>
            {med.instruction || "—"}
          </Text>
        </View>
      ))}
    </View>
  );
}

function PrescriptionDocument({ prescription }: { prescription: Prescription }) {
  const { doctor, patient, appointment, medicines } = prescription;

  const prescriptionDate = moment(new Date(prescription.createdAt)).format("dd MMM yyyy");
  const appointmentDate = moment(new Date(appointment?.appointmentDate as string)).format(
    "dd MMM yyyy, hh:mm a",
  );

  return (
    <Document
      title={`Prescription - ${patient.user.name} - ${prescriptionDate}`}
      author={doctor.user.name}
      subject="Medical Prescription"
      keywords="prescription, medibridge, medical"
    >
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        <Text style={styles.watermark}>Rx</Text>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.platformName}>MediBridge</Text>
            <Text style={styles.platformTagline}>Digital Healthcare Platform · www.medibridge.com</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.rxBadge}>Rx</Text>
          </View>
        </View>

        {/* ── Doctor & Patient cards ── */}
        <View style={styles.infoRow}>
          {/* Doctor */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Prescribing Doctor</Text>
            <Text style={styles.infoName}>Dr. {doctor.user.name}</Text>
            {doctor.specialization && <Text style={styles.infoSub}>{doctor.specialization}</Text>}
            {doctor.qualification && <Text style={styles.infoSub}>{doctor.qualification}</Text>}
            {/* {doctor.currentWorkingHospital && (
              <Text style={styles.infoSub}>{doctor.currentWorkingHospital}</Text>
            )}
            {doctor.bmdc && <Text style={styles.infoSub}>BMDC Reg: {doctor.bmdc}</Text>}
            {doctor.user. && <Text style={styles.infoSub}>📞 {doctor.phone}</Text>} */}
            <Text style={styles.infoSub}>✉ {doctor.user.email}</Text>
          </View>

          {/* Patient */}
          <View style={[styles.infoCard, styles.infoCardRight]}>
            <Text style={styles.infoTitle}>Patient</Text>
            <Text style={styles.infoName}>{patient.user.name}</Text>
            {appointment.gender && <Text style={styles.infoSub}>Gender: {appointment.gender}</Text>}
            {appointment.dateOfBirth && (
              <Text style={styles.infoSub}>
                DOB: {moment(new Date(appointment.dateOfBirth)).format("dd MMM yyyy")}
              </Text>
            )}
            {/* {patient.bloodGroup && <Text style={styles.infoSub}>Blood Group: {patient.bloodGroup}</Text>} */}
            <Text style={styles.infoSub}>✉ {patient.user.email}</Text>
          </View>
        </View>

        {/* ── Appointment meta ── */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Date:</Text>
            <Text style={styles.metaValue}>{prescriptionDate}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Appointment:</Text>
            <Text style={styles.metaValue}>{appointmentDate}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Type:</Text>
            <Text style={styles.metaValue}>{appointment.consultationType}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Ref #:</Text>
            <Text style={styles.metaValue}>{prescription.publicId.slice(0, 10).toUpperCase()}</Text>
          </View>
        </View>

        {/* ── Diagnosis ── */}
        {prescription.diagnosis && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Diagnosis / Chief Complaint</Text>
            <Text style={styles.sectionText}>{prescription.diagnosis}</Text>
          </View>
        )}

        {/* ── Medicines ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medicines</Text>
          <MedicineTable medicines={medicines} />
        </View>

        {/* ── Advice ── */}
        {prescription.advice && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Advice / Instructions</Text>
            <Text style={styles.sectionText}>{prescription.advice}</Text>
          </View>
        )}

        {/* ── Follow-up ── */}
        {prescription.followUpDate && (
          <View style={styles.followUp}>
            <Text style={styles.followUpText}>Follow-up Date:</Text>
            <Text style={styles.followUpDate}>
              {moment(new Date(prescription.followUpDate)).format("dd MMMM yyyy")}
            </Text>
          </View>
        )}

        {/* ── Footer ── */}
        <View style={styles.footer} fixed>
          <View style={styles.footerLeft}>
            <Text style={styles.footerPlatform}>MediBridge</Text>
            <Text style={styles.footerSub}>support@medibridge.com · +880-XXXX-XXXX</Text>
          </View>
          <View style={styles.footerRight}>
            <Text
              style={styles.footerPageNum}
              render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
            />
            <Text style={styles.footerDisclaimer}>
              This prescription is generated digitally via MediBridge. Valid only when issued by a registered
              physician.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

// ─── Export helper ────────────────────────────────────────────────────────────

/**
 * Trigger PDF download in the browser.
 * Usage: await downloadPrescriptionPDF(prescription)
 */
export async function downloadPrescriptionPDF(prescription: Prescription): Promise<void> {
  const blob = await pdf(<PrescriptionDocument prescription={prescription} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `prescription-${prescription.patient.user.name.replace(/\s+/g, "-")}-${moment(
    new Date(prescription.createdAt),
  ).format("dd-MM-yyyy")}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default PrescriptionDocument;
