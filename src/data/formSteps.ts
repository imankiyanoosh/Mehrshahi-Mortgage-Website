import { FormStep, FormData } from '../types';

export const getFormSteps = (loanType: string): FormStep[] => {
  const baseSteps: FormStep[] = [
    {
      id: 1,
      title: "Let's Get Started",
      description: "Tell us about your loan needs",
      fields: [
        {
          name: 'loanType',
          label: 'Loan Type',
          type: 'select',
          required: true,
          options: [
            { value: 'purchase', label: 'Purchase' },
            { value: 'refinance', label: 'Refinance' },
            { value: 'cash-out', label: 'Cash-Out Refinance' },
            { value: 'construction', label: 'Construction' },
            { value: 'investment', label: 'Investment Property' },
          ]
        },
        {
          name: 'propertyType',
          label: 'Property Type',
          type: 'select',
          required: true,
          options: [
            { value: 'single-family', label: 'Single Family Home' },
            { value: 'condo', label: 'Condominium' },
            { value: 'townhome', label: 'Townhome' },
            { value: 'multi-family', label: 'Multi-Family (2-4 units)' },
            { value: 'commercial', label: 'Commercial Property' },
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Property Details",
      description: "Tell us about the property",
      fields: [
        {
          name: 'purchasePrice',
          label: 'Purchase Price / Property Value',
          type: 'number',
          required: true,
          placeholder: '750000'
        },
        {
          name: 'zipCode',
          label: 'Property ZIP Code',
          type: 'text',
          required: true,
          placeholder: '91364'
        },
        {
          name: 'propertyUse',
          label: 'How will you use this property?',
          type: 'radio',
          required: true,
          options: [
            { value: 'primary', label: 'Primary Residence' },
            { value: 'secondary', label: 'Secondary/Vacation Home' },
            { value: 'investment', label: 'Investment/Rental Property' },
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Financial Information",
      description: "Help us understand your financial situation",
      fields: [
        {
          name: 'downPayment',
          label: 'Down Payment Amount',
          type: 'number',
          required: true,
          placeholder: '150000'
        },
        {
          name: 'income',
          label: 'Annual Gross Income',
          type: 'number',
          required: true,
          placeholder: '120000'
        },
        {
          name: 'monthlyDebt',
          label: 'Monthly Debt Payments',
          type: 'number',
          required: true,
          placeholder: '2500'
        }
      ]
    },
    {
      id: 4,
      title: "Credit & Employment",
      description: "A few more details about your background",
      fields: [
        {
          name: 'creditScore',
          label: 'Credit Score Range',
          type: 'select',
          required: true,
          options: [
            { value: '800+', label: '800+ (Excellent)' },
            { value: '740-799', label: '740-799 (Very Good)' },
            { value: '680-739', label: '680-739 (Good)' },
            { value: '620-679', label: '620-679 (Fair)' },
            { value: '580-619', label: '580-619 (Poor)' },
            { value: 'unknown', label: "I don't know" },
          ]
        },
        {
          name: 'employmentType',
          label: 'Employment Type',
          type: 'select',
          required: true,
          options: [
            { value: 'w2', label: 'W2 Employee' },
            { value: 'self-employed', label: 'Self-Employed' },
            { value: 'business-owner', label: 'Business Owner' },
            { value: 'retired', label: 'Retired' },
            { value: 'military', label: 'Military' },
            { value: 'other', label: 'Other' },
          ]
        }
      ]
    },
    {
      id: 5,
      title: "Timeline & Goals",
      description: "When are you looking to close?",
      fields: [
        {
          name: 'timeframe',
          label: 'When do you want to close?',
          type: 'select',
          required: true,
          options: [
            { value: 'asap', label: 'As soon as possible' },
            { value: '30-days', label: 'Within 30 days' },
            { value: '60-days', label: 'Within 60 days' },
            { value: '90-days', label: 'Within 90 days' },
            { value: 'exploring', label: 'Just exploring options' },
          ]
        },
        {
          name: 'cashAvailable',
          label: 'Total Cash Available for Purchase',
          type: 'number',
          required: true,
          placeholder: '200000'
        }
      ]
    },
    {
      id: 6,
      title: "Contact Information",
      description: "How can we reach you?",
      fields: [
        {
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          required: true,
          placeholder: 'John'
        },
        {
          name: 'lastName',
          label: 'Last Name',
          type: 'text',
          required: true,
          placeholder: 'Smith'
        },
        {
          name: 'email',
          label: 'Email Address',
          type: 'email',
          required: true,
          placeholder: 'john@example.com'
        },
        {
          name: 'phone',
          label: 'Phone Number',
          type: 'tel',
          required: true,
          placeholder: '(818) 555-0123'
        }
      ]
    },
    {
      id: 7,
      title: "Review & Submit",
      description: "Review your information and submit your application",
      fields: []
    }
  ];

  // Customize steps based on loan type
  switch (loanType) {
    case 'va-loans':
      return getVALoanSteps(baseSteps);
    case 'fha-loans':
      return getFHALoanSteps(baseSteps);
    case 'construction-loans':
      return getConstructionLoanSteps(baseSteps);
    case 'reverse-mortgage':
      return getReverseMortgageSteps(baseSteps);
    case 'fix-flip-loans':
      return getFixFlipLoanSteps(baseSteps);
    case 'bank-statement-loans':
      return getBankStatementLoanSteps(baseSteps);
    case 'commercial-loans':
      return getCommercialLoanSteps(baseSteps);
    case 'dscr-investment-loans':
      return getDSCRLoanSteps(baseSteps);
    default:
      return baseSteps;
  }
};

const getVALoanSteps = (baseSteps: FormStep[]): FormStep[] => {
  const vaSteps = [...baseSteps];
  
  // Add VA-specific step
  vaSteps.splice(4, 0, {
    id: 4.5,
    title: "Military Service",
    description: "Tell us about your military background",
    fields: [
      {
        name: 'militaryService',
        label: 'Military Service Status',
        type: 'select',
        required: true,
        options: [
          { value: 'active-duty', label: 'Active Duty' },
          { value: 'veteran', label: 'Veteran' },
          { value: 'reserves', label: 'Reserves/National Guard' },
          { value: 'spouse', label: 'Eligible Surviving Spouse' },
        ]
      }
    ]
  });

  return vaSteps;
};

const getFHALoanSteps = (baseSteps: FormStep[]): FormStep[] => {
  const fhaSteps = [...baseSteps];
  
  // Modify down payment step for FHA
  fhaSteps[2].fields[0] = {
    name: 'downPayment',
    label: 'Down Payment Amount (Minimum 3.5%)',
    type: 'number',
    required: true,
    placeholder: '26250'
  };

  return fhaSteps;
};

const getConstructionLoanSteps = (baseSteps: FormStep[]): FormStep[] => {
  const constructionSteps = [...baseSteps];
  
  // Add construction-specific step
  constructionSteps.splice(5, 0, {
    id: 5.5,
    title: "Construction Details",
    description: "Tell us about your construction project",
    fields: [
      {
        name: 'renovationBudget',
        label: 'Total Construction Budget',
        type: 'number',
        required: true,
        placeholder: '500000'
      },
      {
        name: 'timeline',
        label: 'Expected Construction Timeline',
        type: 'select',
        required: true,
        options: [
          { value: '6-months', label: '6 months or less' },
          { value: '12-months', label: '6-12 months' },
          { value: '18-months', label: '12-18 months' },
          { value: '24-months', label: '18-24 months' },
        ]
      }
    ]
  });

  return constructionSteps;
};

const getReverseMortgageSteps = (baseSteps: FormStep[]): FormStep[] => {
  const reverseSteps = [...baseSteps];
  
  // Add age verification step
  reverseSteps.splice(1, 0, {
    id: 1.5,
    title: "Age Verification",
    description: "Reverse mortgages are available for borrowers 62+",
    fields: [
      {
        name: 'age',
        label: 'Your Age',
        type: 'number',
        required: true,
        placeholder: '65'
      }
    ]
  });

  // Modify property details for reverse mortgage
  reverseSteps[3].fields = [
    {
      name: 'currentHomeValue',
      label: 'Current Home Value',
      type: 'number',
      required: true,
      placeholder: '750000'
    },
    {
      name: 'currentMortgage',
      label: 'Current Mortgage Balance',
      type: 'number',
      required: true,
      placeholder: '200000'
    }
  ];

  return reverseSteps;
};

const getFixFlipLoanSteps = (baseSteps: FormStep[]): FormStep[] => {
  const fixFlipSteps = [...baseSteps];
  
  // Add experience step
  fixFlipSteps.splice(4, 0, {
    id: 4.5,
    title: "Investment Experience",
    description: "Tell us about your real estate investment experience",
    fields: [
      {
        name: 'experienceLevel',
        label: 'Real Estate Investment Experience',
        type: 'select',
        required: true,
        options: [
          { value: 'first-time', label: 'First-time investor' },
          { value: '1-3-deals', label: '1-3 previous deals' },
          { value: '4-10-deals', label: '4-10 previous deals' },
          { value: '10-plus', label: '10+ previous deals' },
        ]
      },
      {
        name: 'renovationBudget',
        label: 'Estimated Renovation Budget',
        type: 'number',
        required: true,
        placeholder: '100000'
      }
    ]
  });

  return fixFlipSteps;
};

const getBankStatementLoanSteps = (baseSteps: FormStep[]): FormStep[] => {
  const bankSteps = [...baseSteps];
  
  // Modify employment step
  bankSteps[4].fields.push({
    name: 'businessType',
    label: 'Type of Business',
    type: 'select',
    required: true,
    options: [
      { value: 'sole-proprietor', label: 'Sole Proprietorship' },
      { value: 'llc', label: 'LLC' },
      { value: 'corporation', label: 'Corporation' },
      { value: 'partnership', label: 'Partnership' },
      { value: 'freelancer', label: 'Freelancer/Contractor' },
    ]
  });

  return bankSteps;
};

const getCommercialLoanSteps = (baseSteps: FormStep[]): FormStep[] => {
  const commercialSteps = [...baseSteps];
  
  // Add business details step
  commercialSteps.splice(3, 0, {
    id: 3.5,
    title: "Business Information",
    description: "Tell us about your business",
    fields: [
      {
        name: 'businessType',
        label: 'Business Type',
        type: 'select',
        required: true,
        options: [
          { value: 'retail', label: 'Retail' },
          { value: 'office', label: 'Office' },
          { value: 'warehouse', label: 'Warehouse/Industrial' },
          { value: 'restaurant', label: 'Restaurant' },
          { value: 'medical', label: 'Medical/Healthcare' },
          { value: 'other', label: 'Other' },
        ]
      },
      {
        name: 'yearsInBusiness',
        label: 'Years in Business',
        type: 'number',
        required: true,
        placeholder: '5'
      }
    ]
  });

  return commercialSteps;
};

const getDSCRLoanSteps = (baseSteps: FormStep[]): FormStep[] => {
  const dscrSteps = [...baseSteps];
  
  // Modify for rental income focus
  dscrSteps[3].fields.push({
    name: 'experienceLevel',
    label: 'Rental Property Experience',
    type: 'select',
    required: true,
    options: [
      { value: 'first-time', label: 'First rental property' },
      { value: '1-3-properties', label: '1-3 rental properties' },
      { value: '4-10-properties', label: '4-10 rental properties' },
      { value: '10-plus', label: '10+ rental properties' },
    ]
  });

  return dscrSteps;
};