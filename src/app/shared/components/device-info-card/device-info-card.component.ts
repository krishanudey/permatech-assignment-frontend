import { Component, OnInit, Input } from "@angular/core";
import { DeviceConfig } from "src/app/models/device-config";

@Component({
  selector: "app-device-info-card",
  templateUrl: "./device-info-card.component.html",
  styleUrls: ["./device-info-card.component.scss"],
})
export class DeviceInfoCardComponent implements OnInit {
  @Input() device: DeviceConfig;
  constructor() {}

  ngOnInit() {}
}
