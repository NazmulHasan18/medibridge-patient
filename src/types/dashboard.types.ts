import { PaymentItem } from "./payment.types";
import { TransactionItem } from "./transaction.types";

export interface PatientOverview {
  appointments: {
    total: number;
    upcoming: number;
    completed: number;
    cancelled: number;
  };
  financials: {
    totalSpent: number;
    walletBalance: number;
  };
}

export type RecentActivityItem =
  | ({ kind: "payment" } & PaymentItem)
  | ({ kind: "transaction" } & TransactionItem);

// =========================== SHARED ENVELOPE ===========================

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

// =========================== DOCTOR DASHBOARD TYPES ===========================

export type DoctorDashboardStats = {
  totalAppointments: number;
  todayAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalPatients: number;
  totalEarnings: number;
  upcomingAppointments: number;
};

export type DoctorDashboardStatsResponse = ApiResponse<DoctorDashboardStats>;

export type AppointmentStatusBreakdownItem = {
  status: "PENDING" | "PAID" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "REFUNDED";
  count: number;
};

export type AppointmentStatusBreakdownResponse = ApiResponse<AppointmentStatusBreakdownItem[]>;

export type DoctorRecentAppointmentItem = {
  id: number;
  publicId: string;
  patientName: string;
  consultationType: "ONLINE" | "OFFLINE";
  appointmentStatus: "PENDING" | "PAID" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "REFUNDED";
  appointmentDate: string;
  createdAt: string;
  patient: {
    publicId: string;
    user: {
      name: string;
      email: string;
      phone: string | null;
      profileImage: string | null;
    };
  };
};

export type DoctorRecentAppointmentsResponse = ApiResponse<DoctorRecentAppointmentItem[]>;

export type DoctorUpcomingScheduleItem = {
  id: number;
  doctorId: number;
  scheduleId: number;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  isCancelled: boolean;
  appointmentId: number | null;
  createdAt: string;
  appointment: {
    publicId: string;
    patientName: string;
    consultationType: "ONLINE" | "OFFLINE";
    appointmentStatus: "PENDING" | "PAID" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "REFUNDED";
  } | null;
};

export type DoctorUpcomingScheduleResponse = ApiResponse<DoctorUpcomingScheduleItem[]>;

// =========================== ADMIN DASHBOARD TYPES ===========================

export type AdminDashboardStats = {
  totalUsers: number;
  totalDoctors: number;
  totalPatients: number;
  totalAppointments: number;
  todayAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  totalRevenue: number;
  totalRefunded: number;
  activeUsers: number;
  blockedUsers: number;
  pendingUsers: number;
};

export type AdminDashboardStatsResponse = ApiResponse<AdminDashboardStats>;

export type UserRoleBreakdownItem = {
  role: "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";
  count: number;
};

export type UserRoleBreakdownResponse = ApiResponse<UserRoleBreakdownItem[]>;

export type RevenueChartItem = {
  date: string;
  revenue: number;
  appointments: number;
};

export type RevenueChartResponse = ApiResponse<RevenueChartItem[]>;

export type AdminRecentAppointmentItem = {
  id: number;
  publicId: string;
  patientName: string;
  consultationType: "ONLINE" | "OFFLINE";
  appointmentStatus: "PENDING" | "PAID" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "REFUNDED";
  appointmentDate: string;
  createdAt: string;
  doctor: {
    publicId: string;
    specialization: string;
    user: {
      name: string;
    };
  };
  patient: {
    publicId: string;
    user: {
      name: string;
      email: string;
    };
  };
};

export type AdminRecentAppointmentsResponse = ApiResponse<AdminRecentAppointmentItem[]>;

export type AdminRecentTransactionItem = {
  id: number;
  publicId: string;
  type:
    | "APPOINTMENT_PAYMENT"
    | "REFERRAL_BONUS"
    | "REFUND"
    | "ADMIN_ADJUSTMENT"
    | "WALLET_TOPUP"
    | "COIN_USAGE";
  status: "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";
  amount: number;
  previousBalance: number;
  currentBalance: number;
  createdAt: string;
  user: {
    publicId: string;
    name: string;
    email: string;
    role: "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";
  };
};

export type AdminRecentTransactionsResponse = ApiResponse<AdminRecentTransactionItem[]>;

export type AdminTopDoctorItem = {
  doctor:
    | {
        id: number;
        publicId: string;
        specialization: string;
        consultationFee: number;
        user: {
          name: string;
          profileImage: string | null;
        };
      }
    | undefined;
  completedAppointments: number;
};

export type AdminTopDoctorsResponse = ApiResponse<AdminTopDoctorItem[]>;
