import { Category } from "./category";

export interface Expense {
  expense_id: string;
  expense_costs: number;
  expense_description: string;
  expense_date: Date;
  expense_space: string;
  expense_paid_by: string;
  expense_caetgory: Category[];
}
