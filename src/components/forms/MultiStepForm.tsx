import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check, User, Home, DollarSign, CreditCard, Clock, Phone, FileCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { FormData, FormStep } from '../../types';
import { getFormSteps } from '../../data/formSteps';

interface MultiStepFormProps {
  loanType: string;
  onSubmit: (data: FormData) => void;
  onClose?: () => void;
  initialData?: Partial<FormData>;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  loanType,
  onSubmit,
  onClose,
  initialData = {}
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    loanType,
    ...initialData
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = getFormSteps(loanType);
  const currentStepData = steps.find(step => step.id === currentStep);

  const stepIcons = [User, Home, DollarSign, CreditCard, Clock, Phone, FileCheck];

  useEffect(() => {
    // Auto-save to localStorage
    localStorage.setItem('mortgageFormData', JSON.stringify(formData));
  }, [formData]);

  const validateStep = (step: FormStep): boolean => {
    const newErrors: Record<string, string> = {};
    
    step.fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      
      if (field.validation && formData[field.name]) {
        const validationError = field.validation(formData[field.name]);
        if (validationError) {
          newErrors[field.name] = validationError;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStepData && validateStep(currentStepData)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (name: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    localStorage.removeItem('mortgageFormData');
  };

  const renderField = (field: any) => {
    const value = formData[field.name] || '';
    const error = errors[field.name];

    switch (field.type) {
      case 'select':
        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        );

      case 'radio':
        return (
          <div key={field.name} className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-2">
              {field.options?.map((option: any) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={value === option.value}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="mr-3 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        );

      default:
        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              value={value}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        );
    }
  };

  const renderReviewStep = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Review Your Information</h3>
          <p className="text-gray-600">Please review your details before submitting</p>
        </div>

        <div className="grid gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Loan Details</h4>
            <p className="text-sm text-gray-600">Type: {formData.loanType}</p>
            <p className="text-sm text-gray-600">Property: {formData.propertyType}</p>
            <p className="text-sm text-gray-600">Price: ${formData.purchasePrice?.toLocaleString()}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
            <p className="text-sm text-gray-600">{formData.firstName} {formData.lastName}</p>
            <p className="text-sm text-gray-600">{formData.email}</p>
            <p className="text-sm text-gray-600">{formData.phone}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Financial Summary</h4>
            <p className="text-sm text-gray-600">Income: ${formData.income?.toLocaleString()}/year</p>
            <p className="text-sm text-gray-600">Down Payment: ${formData.downPayment?.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Credit Score: {formData.creditScore}</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Helen will review your application within 2 hours</li>
            <li>• You'll receive a pre-qualification letter via email</li>
            <li>• We'll schedule a consultation to discuss your options</li>
            <li>• Get pre-approved and start shopping with confidence</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of {steps.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((currentStep / steps.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Icons */}
          <div className="flex justify-center space-x-4 mb-6">
            {steps.slice(0, 7).map((step, index) => {
              const IconComponent = stepIcons[index] || User;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              
              return (
                <div
                  key={step.id}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <IconComponent className="w-5 h-5" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step Title */}
          {currentStepData && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {currentStepData.title}
              </h2>
              <p className="text-gray-600">{currentStepData.description}</p>
            </div>
          )}
        </CardHeader>

        <CardContent>
          {/* Form Fields */}
          <div className="space-y-6 mb-8">
            {currentStep === steps.length ? (
              renderReviewStep()
            ) : (
              currentStepData?.fields.map(renderField)
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              className="flex items-center"
            >
              {currentStep === steps.length ? 'Submit Application' : 'Next Step'}
              {currentStep < steps.length && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Need help? Call Helen at{' '}
              <a href="tel:8185550123" className="text-primary-600 hover:underline">
                (818) 555-0123
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiStepForm;