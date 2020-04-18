import { Component, OnInit } from "@angular/core";
import { HeaderButton } from "src/app/shared/components/header/header.component";
import { DeviceConfig } from "src/app/models/device-config";
import { Subscription, timer } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-device-control",
  templateUrl: "./device-control.component.html",
  styleUrls: ["./device-control.component.scss"],
})
export class DeviceControlComponent implements OnInit {
  loading: boolean = false;
  private headerButtons: HeaderButton[] = [
    {
      icon: "fa-trash-alt",
      name: "delete",
    },
  ];
  private subscription: Subscription = new Subscription();
  myDevice: DeviceConfig = null;
  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription.add(
      this.route.params.subscribe((params: Params) => {
        this.fetchDevice(params.uuid);
      })
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  fetchDevice(uuid: string) {
    this.loading = true;
    this.subscription.add(
      timer(1000).subscribe((x) => {
        this.subscription.add(
          this.api.getMyDevice(uuid).subscribe((device) => {
            this.myDevice = device;
            console.log(
              "DeviceControlComponent -> fetchDevice -> device",
              device
            );
            this.loading = false;
          })
        );
      })
    );
  }
  delete() {}
  getHeaderButtons(): HeaderButton[] {
    return this.loading ? [] : this.headerButtons;
  }

  onBackButtonClick() {
    history.back();
  }

  onHeaderButtonClicked(btn: HeaderButton) {
    switch (btn.name) {
      case "delete":
        this.delete();
        break;
      default:
        console.log("No handler for header button click. Button: ", btn);
    }
  }
}
