import {User} from '@/types/User';

function formatPermission(permission: User['permission']): string {
    switch (permission) {
      case 'ADMIN':
        return 'Admin';
      case 'MANAGER':
        return 'Manager';
      case 'FINANCE':
        return 'Finance';
      default:
        return 'Employee';
    }
  }

function formatCurrency(currencyCode: string): string{
    const currencySymbols: Record<string, string> = {
      USD: "$", // United States Dollar
      EUR: "€", // Euro
      JPY: "¥", // Japanese Yen
      GBP: "£", // British Pound Sterling
      AUD: "A$", // Australian Dollar
      CAD: "C$", // Canadian Dollar
      CHF: "₣", // Swiss Franc
      CNY: "¥", // Chinese Yuan
      HKD: "HK$", // Hong Kong Dollar
      MXN: "₱", // Mexican Peso
      INR: "₹", // Indian Rupee
      SGD: "S$", // Singapore Dollar
    };
  
    return currencySymbols[currencyCode] || currencyCode;
  };

  function formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(date).toLocaleDateString('en-GB', options);
  }
  
export { formatCurrency, formatPermission, formatDate };