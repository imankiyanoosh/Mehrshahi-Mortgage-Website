export interface LoanType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  maxAmount?: string;
  image: string;
  features: string[];
  eligibility: string[];
  slug: string;
  category: 'purchase' | 'refinance' | 'investment' | 'specialty';
}

export interface Calculator {
  id: string;
  title: string;
  description: string;
  category: 'purchase' | 'refinance' | 'investment' | 'alt-doc' | 'credit' | 'commercial' | 'renovation' | 'advanced';
  slug: string;
  icon: string;
}

export interface FormData {
  loanType?: string;
  propertyType?: string;
  purchasePrice?: number;
  downPayment?: number;
  creditScore?: string;
  income?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  zipCode?: string;
  timeframe?: string;
  currentStep?: number;
  employmentType?: string;
  monthlyDebt?: number;
  propertyUse?: string;
  cashAvailable?: number;
  currentMortgage?: number;
  militaryService?: string;
  businessType?: string;
  yearsInBusiness?: number;
  age?: number;
  currentHomeValue?: number;
  desiredCashOut?: number;
  renovationBudget?: number;
  experienceLevel?: string;
  propertyCondition?: string;
  timeline?: string;
}

export interface FormStep {
  id: number;
  title: string;
  description: string;
  fields: FormField[];
  condition?: (data: FormData) => boolean;
}

export interface FormField {
  name: keyof FormData;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'select' | 'radio' | 'checkbox';
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  validation?: (value: any) => string | null;
}

export interface City {
  name: string;
  slug: string;
  zipCodes: string[];
  population: string;
  medianHomePrice: string;
  description: string;
}