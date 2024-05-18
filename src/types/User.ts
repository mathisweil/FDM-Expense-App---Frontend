export type User = {
  employee_id: number;
  first_name: string;
  last_name: string;
  permission: 'EMPLOYEE' | 'MANAGER' | 'FINANCE' | 'ADMIN';
  email: string;
  phone: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
  account_number: string;
  sort_code: string;
  tax_code: string;
  manager_id: number;
  finance_id: number;
};
