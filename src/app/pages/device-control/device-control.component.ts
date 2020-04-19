import { Component, OnInit } from "@angular/core";
import { HeaderButton } from "src/app/shared/components/header/header.component";
import { DeviceConfig } from "src/app/models/device-config";
import { Subscription, timer } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import { ActivatedRoute, Params } from "@angular/router";
import swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";

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
          this.api.getMyDevice(uuid).subscribe(
            (device) => {
              this.myDevice = device;
              this.loading = false;
            },
            async (err: HttpErrorResponse) => {
              await swal({
                title: `Error!!!`,
                text: `Could not find requested device.`,
                type: "error",
              });
              this.onBackButtonClick();
            }
          )
        );
      })
    );
  }
  delete() {
    this.subscription.add(
      this.api.deleteMyDevice(this.myDevice.deviceMeta.uuid).subscribe(
        async (res) => {
          await swal({
            title: `${this.myDevice.name} has been deleted from your device list.`,
            type: "success",
            timer: 2000,
            showConfirmButton: false,
            showCloseButton: false,
          });
          this.onBackButtonClick();
        },
        async (err) => {
          await swal({
            title: `Error!!!`,
            text: `Could not delete ${this.myDevice.name} from your device list`,
            type: "error",
          });
        }
      )
    );
  }
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
