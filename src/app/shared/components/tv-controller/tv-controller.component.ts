import { Component, OnInit, Input } from "@angular/core";
import { SmartTV } from "src/app/models/smart-tv";
import { DeviceConfig } from "src/app/models/device-config";
import { TvKeys } from "src/app/models/enums";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-tv-controller",
  templateUrl: "./tv-controller.component.html",
  styleUrls: ["./tv-controller.component.scss"],
})
export class TvControllerComponent implements OnInit {
  private deviceConfig: DeviceConfig;
  private smartDevice: SmartTV = null;

  @Input() set device(value: DeviceConfig) {
    this.deviceConfig = value;
    this.smartDevice = new SmartTV(value.deviceMeta, this.api);
  }

  get device(): DeviceConfig {
    return this.deviceConfig;
  }
  constructor(private api: ApiService) {}

  ngOnInit() {}
  keyPress(key: string) {
    this.smartDevice.keyPress(TvKeys[key]);
  }
}
