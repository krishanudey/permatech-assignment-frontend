import { PowerState } from "./enums";
import { NetworkDevice } from "./network-device";

export interface SmartLightState {
  powerState: PowerState;
  color: string;
  brightness: number;
}

export class SmartLight {
  private state: SmartLightState = null;
  constructor(networkDevice: NetworkDevice) {
    this.state = {
      powerState: PowerState.OFF,
      color: "#FFFFFF",
      brightness: 75,
    };
  }

  getState() {
    return this.state;
  }
  async setBrightness(brightness: number): Promise<boolean> {
    //TODO::
    if (brightness < 0) {
      brightness = 0;
    } else if (brightness > 100) {
      brightness = 100;
    }
    this.state.brightness = brightness;
    return;
  }

  async setColor(color: string): Promise<boolean> {
    //TODO::
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      this.state.color = color;
    }
    return;
  }

  async setPowerState(state: PowerState): Promise<boolean> {
    //TODO::
    this.state.powerState = state;
    return;
  }
}
