import { DeviceType } from "./enums";

export interface NetworkDevice {
  type: DeviceType;
  ip: string;
  servicePort: number;
  uuid: string;
}
