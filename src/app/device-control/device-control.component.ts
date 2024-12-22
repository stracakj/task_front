import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DeviceService } from '../services/device.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';  
import { temperatureValidator } from '../validators/temperature-validator';
import { nameValidator } from '../validators/name-validator';




@Component({
  selector: 'app-device-control',
  templateUrl: './device-control.component.html',
  styleUrls: ['./device-control.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSnackBarModule],
})
export class DeviceControlComponent {
  form: FormGroup;
  formVisible = false; 
  @Output() addButtonClicked = new EventEmitter<void>();


  constructor(private deviceService: DeviceService, private snackBar: MatSnackBar
  ) {

    this.form = new FormGroup({
      deviceName: new FormControl('', [Validators.required, nameValidator()]),
      deviceType: new FormControl('', Validators.required),
      brightness: new FormControl(1, Validators.required),
      state: new FormControl('', Validators.required),
      temperature: new FormControl('', [Validators.required, temperatureValidator()]),
      mode: new FormControl('', Validators.required),
      cameraState: new FormControl('', Validators.required),
      recording: new FormControl('', Validators.required),
      blindsState: new FormControl('', Validators.required),
      position: new FormControl(1, [Validators.required])
    });
  }

  onAddButtonClick() {
    this.formVisible = !this.formVisible;
    if (!this.formVisible) {
      this.form.reset(); 
    }
    this.addButtonClicked.emit();

  }

  onSubmit(): void {
    const deviceType = this.form.get('deviceType')?.value;
  
    const submittedValues: any = {
      deviceName: this.form.get('deviceName')?.value,
      deviceType: deviceType,
      data: {} 
    };
  
    switch (deviceType?.toLowerCase()) {
      case 'light':
        submittedValues.data = {
          brightness: this.form.get('brightness')?.value,
          state: this.form.get('state')?.value,
        };
        break;
  
      case 'thermostat':
        submittedValues.data = {
          temperature: this.form.get('temperature')?.value,
          mode: this.form.get('mode')?.value,
        };
        break;
  
      case 'camera':
        submittedValues.data = {
          cameraState: this.form.get('cameraState')?.value,
          recording: this.form.get('recording')?.value,
        };
        break;
  
      case 'blinds':
        submittedValues.data = {
          position: this.form.get('position')?.value,
          blindsState: this.form.get('blindsState')?.value,
        };
        break;
  
      default:
        console.error('Invalid device type');
        return;
    }
  
    console.log('Final Submitted Data:', submittedValues);  

    this.deviceService.addNewDevice(submittedValues.deviceName, submittedValues.deviceType, JSON.stringify(submittedValues.data)).subscribe({
      next: (response: any) => {
        console.log('Device added successfully:', response);
        this.showNotification('Device added successfully!', 'success');
      },
      error: (error: any) => {
        console.error('Error occurred while adding device:', error);
        this.showNotification('Error occurred while adding the device.', 'error');
      }
  })
  this.onAddButtonClick();

}
showNotification(message: string, type: string): void {
  let snackBarClass = '';
  if (type === 'success') {
    snackBarClass = 'snackbar-success';
  } else if (type === 'error') {
    snackBarClass = 'snackbar-error';
  }

  this.snackBar.open(message, 'Close', {
    duration: 3000, 
    panelClass: [snackBarClass]
  });
}
  
}