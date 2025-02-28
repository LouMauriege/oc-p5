import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        if (!control.value) {
        return null;
        }

        const password: string = control.value || '';
        const errors: ValidationErrors = {};

        if (password.length < 8) {
            errors['length'] = 'Password must be at least 8 characters long';
        }
        if (!/[A-Z]/.test(password)) {
            errors['uppercase'] = 'Password must contain at least one uppercase letter';
        }
        if (!/[a-z]/.test(password)) {
            errors['lowercase'] = 'Password must contain at least one lowercase letter';
        }
        if (!/[0-9]/.test(password)) {
            errors['number'] = 'Password must contain at least one number';
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors['special'] = 'Password must contain at least one special character';
        }

        return Object.keys(errors).length ? errors : null;
    };
}
