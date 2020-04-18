import { Component, OnInit, Input } from "@angular/core";
import { SmartAC } from "src/app/models/smart-ac";
import { DeviceConfig } from "src/app/models/device-config";

@Component({
  selector: "app-ac-controller",
  templateUrl: "./ac-controller.component.html",
  styleUrls: ["./ac-controller.component.scss"],
})
export class AcControllerComponent implements OnInit {
  private deviceConfig: DeviceConfig;
  private smartAC: SmartAC = null;

  @Input() set device(value: DeviceConfig) {
    this.deviceConfig = value;
    this.smartAC = new SmartAC(value.deviceMeta);
  }

  get device(): DeviceConfig {
    return this.deviceConfig;
  }

  constructor() {}

  ngOnInit() {}
}
