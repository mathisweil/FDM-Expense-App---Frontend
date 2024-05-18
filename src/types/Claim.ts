export type Claim = {
  claim_id: number;
  employee_id: number;
  amount: number;
  currency: string;
  type: "Travel" | "Meal" | "Night Stay" | "Gift" | "Other";
  description: string;
  receipt?: File;
  status: "REJECTED" | "REJECTEDF" | "PENDING" | "APPROVED" | "PROCESSED";
  date: string;
  claimed_by: string;
  approved_by?: string;
  approved_on?: string;
  comment?: string;
};
