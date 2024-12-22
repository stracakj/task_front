import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Device } from '../../models/device.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeviceService } from '../../services/device.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSnackBarModule]
})
export class DeviceComponent {
  @Output() close = new EventEmitter<void>(); 
  device: Device;
  form: FormGroup;
 


  constructor(private deviceService: DeviceService, @Inject(MAT_DIALOG_DATA) public data: { device: Device }, private dialogRef: MatDialogRef<DeviceComponent>,  
  private snackBar: MatSnackBar){
    this.device = data.device;
    this.form = new FormGroup({
      deviceName: new FormControl(this.device.name, Validators.required),
      deviceType: new FormControl(this.device.type, Validators.required),
      brightness: new FormControl(this.device.data.brightness, Validators.required),
      state: new FormControl(this.device.data.state, Validators.required),
      temperature: new FormControl(this.device.data.temperature , Validators.required),
      mode: new FormControl(this.device.data.mode, Validators.required),
      cameraState: new FormControl(this.device.data.cameraState, Validators.required),
      recording: new FormControl(this.device.data.recording, Validators.required),
      blindsState: new FormControl(this.device.data.blindsState, Validators.required),
      position: new FormControl(this.device.data.position, [Validators.required])
    });
  }

  ngOnInit(){
    console.log(this.data.device);
    console.log("device")
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

    this.deviceService.updateDevice(this.device.id, submittedValues.deviceName, submittedValues.deviceType, JSON.stringify(submittedValues.data)).subscribe({
      next: (response: any) => {
        console.log('Device added successfully:', response);
        this.showNotification('Device updated successfully!', 'success');
      },
      error: (error: any) => {
        console.error('Error occurred while adding device:', error);
        this.showNotification('Error occurred while updating the device.', 'error');
      }
  })

    this.dialogRef.close();
    
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
