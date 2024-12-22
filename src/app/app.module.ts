import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';

import { AppRoutingModule, routes } from './app.routes';
import { AppComponent } from './app.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceControlComponent } from './device-control/device-control.component';
import { DeviceService } from './services/device.service';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    DeviceListComponent,
    DeviceControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [provideHttpClient(), DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }