import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { DeviceConfig } from "src/app/models/device-config";
import swal from "sweetalert2";
import { Subscription } from "rxjs";
import { ApiService, HTTP_API_ERROR_CODE } from "src/app/services/api.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-device-info-card",
  templateUrl: "./device-info-card.component.html",
  styleUrls: ["./device-info-card.component.scss"],
})
export class DeviceInfoCardComponent implements OnInit, OnDestroy {
  @Input() device: DeviceConfig;
  private subscription = new Subscription();
  constructor(private api: ApiService) {}

  ngOnInit() {}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async edit(editName?: string) {
    let device = this.device.deviceMeta;
    let previousName = editName || this.device.name;
    let name = await swal({
      title: `Enter the name of this ${device.type}`,
      input: "text",
      inputValue: previousName,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!/^[a-zA-Z0-9 ']*$/.test(value)) {
          return "Name can only contain letters, numbers, spaces and apostrophe ( ' )";
        }
        if (value.length < 3 || value.length > 30) {
          return "Name length must be 3 to 30 characters long";
        }
      },
    }).then((alert) => {
      return alert.value;
    });
    if (name) {
      this.subscription.add(
        this.api.updateDevice(device.uuid, name).subscribe(
          (deviceConfig) => {
            this.device.name = name;
            swal({
              title: `This device has been renamed to ${name}`,
              type: "success",
              timer: 2000,
              showConfirmButton: false,
              showCloseButton: false,
            });
          },
          async (err: HttpErrorResponse) => {
            if (
              err.error.reason === HTTP_API_ERROR_CODE.DUPLICATE_DEVICE_NAME
            ) {
              await swal({
                title: `Error!!!`,
                text: err.error.message,
                type: "error",
              });
              setTimeout(() => {
                this.edit(name);
              }, 50);
            } else {
              await swal({
                title: `Error!!!`,
                text: `Oops! Something isn't right. Please try in some time.`,
                type: "error",
              });
            }
          }
        )
      );
    }
  }
}
