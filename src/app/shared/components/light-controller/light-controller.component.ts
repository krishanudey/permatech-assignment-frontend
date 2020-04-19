import { Component, OnInit, Input } from "@angular/core";
import { SmartLight } from "src/app/models/smart-light";
import { DeviceConfig } from "src/app/models/device-config";
import { PowerState } from "src/app/models/enums";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-light-controller",
  templateUrl: "./light-controller.component.html",
  styleUrls: ["./light-controller.component.scss"],
})
export class LightControllerComponent implements OnInit {
  private deviceConfig: DeviceConfig;
  private smartDevice: SmartLight = null;
  defaultColors: string[] = [
    "#ffffff",
    "#ff4136",
    "#2ecc40",
    "#0074d9",
    "#ffdc00",
    "#ff851b",
    // "#b10dc9",
  ];

  @Input() set device(value: DeviceConfig) {
    this.deviceConfig = value;
    this.smartDevice = new SmartLight(value.deviceMeta, this.api);
  }

  get device(): DeviceConfig {
    return this.deviceConfig;
  }
  constructor(private api: ApiService) {}

  ngOnInit() {}
  togglePower() {
    this.smartDevice.setPowerState(
      this.smartDevice.getState().powerState === PowerState.ON
        ? PowerState.OFF
        : PowerState.ON
    );
  }
  changeBrightness(delta: number) {
    this.smartDevice.setBrightness(
      this.smartDevice.getState().brightness + delta
    );
  }
  changeColor(color: string) {
    this.smartDevice.setColor(color);
  }
}
