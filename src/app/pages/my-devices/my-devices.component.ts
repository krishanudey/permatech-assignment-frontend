import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Subscription } from "rxjs";
import { DeviceConfig } from "src/app/models/device-config";
import { HeaderButton } from "src/app/shared/components/header/header.component";

@Component({
  selector: "app-my-devices",
  templateUrl: "./my-devices.component.html",
  styleUrls: ["./my-devices.component.scss"],
})
export class MyDevicesComponent implements OnInit, OnDestroy {
  headerButtons: HeaderButton[] = [
    {
      icon: "fa-plus",
      name: "add",
    },
    {
      icon: "fa-search",
      name: "search",
    },
  ];
  myDevices: DeviceConfig[] = [];
  private myDeviceSubscription: Subscription;
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.myDeviceSubscription = this.api.getMyDevices().subscribe((devices) => {
      this.myDevices = devices;
    });
  }
  ngOnDestroy() {
    this.myDeviceSubscription.unsubscribe();
  }

  onHeaderButtonClicked(btn: HeaderButton) {
    console.log("MyDevicesComponent -> onHeaderButtonClicked -> btn", btn);
  }
}
