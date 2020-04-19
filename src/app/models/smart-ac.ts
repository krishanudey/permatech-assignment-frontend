import { AcMode, AcFanSpeed, PowerState, AcSwing } from "./enums";
import { NetworkDevice } from "./network-device";

export interface SmartAcState {
  temp: number;
  mode: AcMode;
  fanSpeed: AcFanSpeed;
  swing: AcSwing;
  powerState: PowerState;
}
export class SmartAC {
  private state: SmartAcState = null;
  constructor(public networkDevice: NetworkDevice) {
    this.state = {
      temp: 28,
      mode: AcMode.AUTO,
      fanSpeed: AcFanSpeed.AUTO,
      swing: AcSwing.AUTO,
      powerState: PowerState.OFF,
    };
  }

  getState() {
    return this.state;
  }

  async setTemperature(temp: number): Promise<boolean> {
    //TODO::
    if (temp < 18) {
      temp = 18;
    } else if (temp > 32) {
      temp = 32;
    }
    this.state.temp = temp;
    return;
  }

  async setMode(mode: AcMode): Promise<boolean> {
    //TODO::
    this.state.mode = mode;
    return;
  }

  async setFanSpeed(speed: AcFanSpeed): Promise<boolean> {
    //TODO::
    this.state.fanSpeed = speed;
    return;
  }

  async setSwing(swing: AcSwing): Promise<boolean> {
    //TODO::
    this.state.swing = swing;
    return;
  }

  async setPowerState(state: PowerState): Promise<boolean> {
    //TODO::
    this.state.powerState = state;
    return;
  }
}
