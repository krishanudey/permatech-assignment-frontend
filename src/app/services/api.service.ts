import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { NetworkDevice } from "../models/network-device";
import { DeviceConfig } from "../models/device-config";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  apiRoot: string = `http://${window.location.hostname}:8080/api/v1`;
  constructor(private http: HttpClient) {}

  discoverDevices(): Observable<NetworkDevice[]> {
    let apiURL = `${this.apiRoot}/devices/discover`;
    return this.http.get<NetworkDevice[]>(apiURL);
  }

  getMyDevices(): Observable<DeviceConfig[]> {
    let apiURL = `${this.apiRoot}/devices`;
    return this.http.get<DeviceConfig[]>(apiURL);
  }

  addDevice(name: string, nd: NetworkDevice): Observable<DeviceConfig> {
    let apiURL = `${this.apiRoot}/devices`;
    return this.http.post<DeviceConfig>(apiURL, {
      name: name,
      uuid: nd.uuid,
      ip: nd.ip,
      servicePort: nd.servicePort,
      type: nd.type,
    });
  }
}

export const HTTP_API_ERROR_CODE = {
  VALIDATION_FAILED: "VALIDATION_FAILED",
  DEVICE_ALREADY_ADDED: "DEVICE_ALREADY_ADDED",
  DUPLICATE_DEVICE_NAME: "DUPLICATE_DEVICE_NAME",
  INVALID_ACTION: "INVALID_ACTION",
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
};
