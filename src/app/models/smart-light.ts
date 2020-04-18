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
    return;
  }

  async setColor(color: string): Promise<boolean> {
    //TODO::
    return;
  }

  async setPowerState(state: PowerState): Promise<boolean> {
    //TODO::
    return;
  }
}
