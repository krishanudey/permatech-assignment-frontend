import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiService, HTTP_API_ERROR_CODE } from "src/app/services/api.service";
import { Subscription } from "rxjs";
import swal from "sweetalert2";
import { NetworkDevice } from "src/app/models/network-device";
import { HeaderButton } from "src/app/shared/components/header/header.component";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-device-discovery",
  templateUrl: "./device-discovery.component.html",
  styleUrls: ["./device-discovery.component.scss"],
})
export class DeviceDiscoveryComponent implements OnInit, OnDestroy {
  headerButtons: HeaderButton[] = [
    {
      icon: "fa-sync",
      name: "refresh",
    },
  ];
  discovering: boolean = false;
  private discoverDeviceSubscription: Subscription = new Subscription();

  devices: NetworkDevice[] = [];
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.discover();
  }
  ngOnDestroy() {
    this.discoverDeviceSubscription.unsubscribe();
  }

  getDevices(): NetworkDevice[] {
    return this.devices.sort((x, y) => {
      return Number(x.isAdded) - Number(y.isAdded);
    });
  }

  discover() {
    this.discovering = true;
    this.discoverDeviceSubscription.add(
      this.api.discoverDevices().subscribe(
        (devices) => {
          this.devices = devices;
          this.discovering = false;
        },
        async (err) => {
          this.discovering = false;
          await swal({
            title: null,
            text: `Oops! Something went wrong while talking to server. Please try after some time.`,
            type: "error",
          });
        }
      )
    );
  }
  onBackButtonClick() {
    history.back();
  }

  onHeaderButtonClicked(btn: HeaderButton) {
    switch (btn.name) {
      case "refresh":
        this.discover();
        break;
      default:
        console.log("No handler for header button click. Button: ", btn);
    }
  }

  async onAddButtonClick(device: NetworkDevice, previousName: string = "") {
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
      this.discoverDeviceSubscription.add(
        this.api.addDevice(name, device).subscribe(
          (deviceConfig) => {
            device.isAdded = true;
            this.discover();
            swal({
              title: `${name} has been added to your device list.`,
              type: "success",
              timer: 2000,
              showConfirmButton: false,
              showCloseButton: false,
            });
          },
          async (err: HttpErrorResponse) => {
            console.log(
              "DeviceDiscoveryComponent -> onAddButtonClick -> err",
              err
            );
            if (
              err.error.reason === HTTP_API_ERROR_CODE.DUPLICATE_DEVICE_NAME
            ) {
              await swal({
                title: `Error!!!`,
                text: err.error.message,
                type: "error",
              });
              setTimeout(() => {
                this.onAddButtonClick(device, name);
              }, 50);
            } else if (
              err.error.reason === HTTP_API_ERROR_CODE.DEVICE_ALREADY_ADDED
            ) {
              device.isAdded = true;
              await swal({
                title: `Error!!!`,
                text: err.error.message,
                type: "error",
              });
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
