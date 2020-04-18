import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Subscription } from "rxjs";
import { DeviceConfig } from "src/app/models/device-config";

@Component({
  selector: "app-my-devices",
  templateUrl: "./my-devices.component.html",
  styleUrls: ["./my-devices.component.scss"],
})
export class MyDevicesComponent implements OnInit, OnDestroy {
  myDevices: DeviceConfig[] = [];
  private myDeviceSubscription: Subscription;
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.myDeviceSubscription = this.api.getMyDevices().subscribe((devices) => {
      this.myDevices = devices;
      console.log(this.myDevices);
    });
  }
  ngOnDestroy() {
    this.myDeviceSubscription.unsubscribe();
  }
}
