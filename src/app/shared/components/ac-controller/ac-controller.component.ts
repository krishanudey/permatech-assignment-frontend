import { Component, OnInit, Input } from "@angular/core";
import { SmartAC } from "src/app/models/smart-ac";
import { DeviceConfig } from "src/app/models/device-config";
import { PowerState, AcMode, AcFanSpeed, AcSwing } from "src/app/models/enums";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-ac-controller",
  templateUrl: "./ac-controller.component.html",
  styleUrls: ["./ac-controller.component.scss"],
})
export class AcControllerComponent implements OnInit {
  private deviceConfig: DeviceConfig;
  private smartDevice: SmartAC = null;

  @Input() set device(value: DeviceConfig) {
    this.deviceConfig = value;
    this.smartDevice = new SmartAC(value.deviceMeta, this.api);
  }

  get device(): DeviceConfig {
    return this.deviceConfig;
  }

  defaultModes: string[] = Object.keys(AcMode);
  defaultFanSpeeds: string[] = Object.keys(AcFanSpeed);
  defaultSwings: string[] = Object.keys(AcSwing);

  constructor(private api: ApiService) {}

  ngOnInit() {}
  togglePower() {
    this.smartDevice.setPowerState(
      this.smartDevice.getState().powerState === PowerState.ON
        ? PowerState.OFF
        : PowerState.ON
    );
  }
  changeTemperature(delta: number) {
    this.smartDevice.setTemperature(this.smartDevice.getState().temp + delta);
  }
  changeMode(selected: string) {
    this.smartDevice.setMode(AcMode[selected]);
  }
  changeFanSpeed(selected: string) {
    this.smartDevice.setFanSpeed(AcFanSpeed[selected]);
  }
  changeSwing(selected: string) {
    this.smartDevice.setSwing(AcSwing[selected]);
  }

  getModeDisplayText(m: AcMode): string {
    switch (m) {
      default:
        return m.toString()[0];
    }
  }

  getFanSpeedDisplayText(m: AcFanSpeed): string {
    return m.toString()[0];
  }

  getSwingDisplayText(m: AcSwing): string {
    switch (m) {
      case AcSwing.AUTO:
        return "A";
      case AcSwing.OFF:
        return "\u25A0";
      case AcSwing.S30:
        return "30";
      case AcSwing.S45:
        return "45";
      case AcSwing.S60:
        return "60";
    }
  }
}
