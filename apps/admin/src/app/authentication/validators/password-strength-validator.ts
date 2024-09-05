import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Create the custom password validator function
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Define password strength rules
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[@$!%*?&]/.test(value);
    const isValidLength = value?.length >= 8;

    const isValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && isValidLength;

    // Return validation result if invalid
    return !isValid ? { passwordStrength: 'Password does not meet the criteria' } : null;
  };
}
