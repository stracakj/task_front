import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function temperatureValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const temperature = control.value;
      if (temperature === null || temperature === undefined || temperature === ''  || temperature < -50 || temperature > 35) {
        return { invalidTemperature: 'Temperature must be set' }; 
      }
      return null;
    };
  }