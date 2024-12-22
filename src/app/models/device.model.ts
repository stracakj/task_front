
  
export  interface Device {
    id: number;
    name: string;
    type: string;
    data: DeviceState;
  }

  export interface DeviceState {
    brightness?: number;
    state?: string;
    recording?: boolean;
    temperature?: number;
    mode?: string;
    cameraState?: string;
    blindsState?: string;
    position?: number;

  }