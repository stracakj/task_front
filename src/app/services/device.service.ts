import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Device } from '../models/device.model';
import { map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private devicesSubject = new BehaviorSubject<Device[]>([]);
  devices$ = this.devicesSubject.asObservable();
  
  constructor(private http: HttpClient) { }


  getAllDevices(): Observable<Device[]>{
    return this.http.get<Device[]>(`http://localhost:8080/allDevices`).pipe(
      map((devices: any[]) =>
        devices.map((device) => ({
          ...device,
          data: JSON.parse(device.data), 
        }))
        .sort((a, b) => a.id - b.id)), tap((transformedDevices) => this.devicesSubject.next(transformedDevices)))
  }

  addNewDevice(name: any, type: any, data: any): Observable<any>{
    const body = {
      name,
      type,
      data
    }
    return this.http.post(`http://localhost:8080/addNew`, body).pipe(
      tap(() => {
        this.refreshDevices();
      })
    );
  }
;
  

  deleteDevice(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/delete/${id}`).pipe(
      tap(() => {
        this.refreshDevices();
      })
    );
  }

  updateDevice(id: any, name: any, type: any, data: any): Observable<any>{
    const body = {
      id,
      name,
      type,
      data
    }

    return this.http.put(`http://localhost:8080/update`, body).pipe(
      tap(() => {
        this.refreshDevices();
      }))
      ;
  }

  refreshDevices() {
    this.getAllDevices().subscribe();
  }



  }

