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
}
