import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const name = control.value;
    if (!name || name.trim().length === 0) {
      return { emptyName: 'Name must not be empty' };
    }
    return null;
  };
}