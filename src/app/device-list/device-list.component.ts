import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DeviceService } from '../services/device.service';
import { Device } from '../models/device.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DeviceComponent } from './device/device.component';
import { MatDialog } from '@angular/material/dialog';
import { DeviceControlComponent } from '../device-control/device-control.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
  imports: [CommonModule, MatButtonModule, MatIconModule, DeviceControlComponent], 

})
export class DeviceListComponent implements OnInit {
  devices: Device[] = [];
  selectedDevice: Device | undefined; 
  isDeviceListVisible: boolean = true;


  ngOnInit(): void {

    this.deviceService.devices$.subscribe((devices) => {
      this.devices = devices;
    });

    this.deviceService.getAllDevices().subscribe();

  }


  toggleDeviceList(): void {
    this.isDeviceListVisible = !this.isDeviceListVisible;
  }


   constructor(private deviceService: DeviceService, private dialog: MatDialog, private snackBar: MatSnackBar) { }




  deleteDevice(event: Event, id: number){
    event.stopPropagation()
          this.deviceService.deleteDevice(id).subscribe({
            next: (response: any) => {
              console.log('Device deleted successfully:', response);
              this.showNotification('Device deleted successfully!', 'success');
            },
            error: (error: any) => {
              console.error('Error occurred while deleting device:', error);
              this.showNotification('Error occurred while deleting the device.', 'error');
            }
        })
}


viewDevice(deviceId: number): void {
  this.selectedDevice = this.devices.find(device => device.id === deviceId);
  console.log(this.selectedDevice, "selektirani ");
  if (this.selectedDevice) {
    this.selectedDevice.data;
    this.dialog.open(DeviceComponent, {
      width: '500px',
      data: { device: this.selectedDevice }
    });
  }
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