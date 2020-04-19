import { PowerState } from "./enums";
import { NetworkDevice } from "./network-device";
import { ApiService } from "../services/api.service";

export interface SmartLightState {
  powerState: PowerState;
  color: string;
  brightness: number;
}

export class SmartLight {
  private state: SmartLightState = null;
  constructor(private networkDevice: NetworkDevice, private api: ApiService) {
    this.state = {
      powerState: PowerState.OFF,
      color: "#FFFFFF",
      brightness: 75,
    };
    api.getDeviceState(networkDevice.uuid).subscribe((state) => {
      this.state.powerState = state.powerState;
      this.state.color = state.color;
      this.state.brightness = state.brightness;
    });
  }

  getState() {
    return this.state;
  }
  async setBrightness(brightness: number): Promise<boolean> {
    if (brightness < 0) {
      brightness = 0;
    } else if (brightness > 100) {
      brightness = 100;
    }
    let success = await this.takeAction("setBrightness", brightness);
    if (success) {
      this.state.brightness = brightness;
    }
    return;
  }

  async setColor(color: string): Promise<boolean> {
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      let success = await this.takeAction("setColor", color);
      if (success) {
        this.state.color = color;
      }
    }
    return;
  }

  async setPowerState(state: PowerState): Promise<boolean> {
    let success = await this.takeAction("setPowerState", state);
    if (success) {
      this.state.powerState = state;
    }
    return;
  }
  takeAction(action: string, args?: any) {
    return this.api.deviceAction(this.networkDevice.uuid, action, args);
  }
}
