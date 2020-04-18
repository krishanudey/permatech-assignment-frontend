import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Subscription, timer } from "rxjs";
import { DeviceConfig } from "src/app/models/device-config";
import { HeaderButton } from "src/app/shared/components/header/header.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-devices",
  templateUrl: "./my-devices.component.html",
  styleUrls: ["./my-devices.component.scss"],
})
export class MyDevicesComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  private headerButtons: HeaderButton[] = [
    {
      icon: "fa-plus",
      name: "add",
    },
    // {
    //   icon: "fa-search",
    //   name: "search",
    // },
    {
      icon: "fa-sync",
      name: "refresh",
    },
  ];
  myDevices: DeviceConfig[] = [];
  private myDeviceSubscription: Subscription = new Subscription();
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.fetchDevices();
  }
  ngOnDestroy() {
    this.myDeviceSubscription.unsubscribe();
  }
  getHeaderButtons(): HeaderButton[] {
    return this.loading
      ? this.headerButtons.filter((el) => {
          return el.name !== "refresh";
        })
      : this.headerButtons;
  }
  fetchDevices() {
    this.loading = true;
    this.myDeviceSubscription.add(
      timer(1000).subscribe((x) => {
        this.myDeviceSubscription.add(
          this.api.getMyDevices().subscribe((devices) => {
            this.myDevices = devices;
            this.loading = false;
          })
        );
      })
    );
  }

  onHeaderButtonClicked(btn: HeaderButton) {
    switch (btn.name) {
      case "add":
        this.router.navigate(["discover"]);
        break;
      case "refresh":
        this.fetchDevices();
        break;
      case "search":
        break;
      default:
        console.log("No handler for header button click. Button: ", btn);
    }
  }
}
