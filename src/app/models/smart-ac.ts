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
  constructor(networkDevice: NetworkDevice) {
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
    return;
  }

  async setMode(mode: AcMode): Promise<boolean> {
    //TODO::
    return;
  }

  async setFanSpeed(speed: AcFanSpeed): Promise<boolean> {
    //TODO::
    return;
  }

  async setSwing(swing: AcSwing): Promise<boolean> {
    //TODO::
    return;
  }

  async setPowerState(state: PowerState): Promise<boolean> {
    //TODO::
    return;
  }
}
