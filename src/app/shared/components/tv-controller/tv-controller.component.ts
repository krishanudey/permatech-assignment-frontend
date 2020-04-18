import { Component, OnInit, Input } from "@angular/core";
import { SmartTV } from "src/app/models/smart-tv";
import { DeviceConfig } from "src/app/models/device-config";

@Component({
  selector: "app-tv-controller",
  templateUrl: "./tv-controller.component.html",
  styleUrls: ["./tv-controller.component.scss"],
})
export class TvControllerComponent implements OnInit {
  private deviceConfig: DeviceConfig;
  private smartAC: SmartTV = null;

  @Input() set device(value: DeviceConfig) {
    this.deviceConfig = value;
    this.smartAC = new SmartTV(value.deviceMeta);
  }

  get device(): DeviceConfig {
    return this.deviceConfig;
  }
  constructor() {}

  ngOnInit() {}
}
