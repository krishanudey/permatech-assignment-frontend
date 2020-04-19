import { AcMode, AcFanSpeed, PowerState, AcSwing } from "./enums";
import { NetworkDevice } from "./network-device";
import { ApiService } from "../services/api.service";

export interface SmartAcState {
  temp: number;
  mode: AcMode;
  fanSpeed: AcFanSpeed;
  swing: AcSwing;
  powerState: PowerState;
}
export class SmartAC {
  private state: SmartAcState = null;
  constructor(private networkDevice: NetworkDevice, private api: ApiService) {
    this.state = {
      temp: 28,
      mode: AcMode.AUTO,
      fanSpeed: AcFanSpeed.AUTO,
      swing: AcSwing.AUTO,
      powerState: PowerState.OFF,
    };
    api.getDeviceState(networkDevice.uuid).subscribe((state) => {
      this.state.temp = state.temp;
      this.state.mode = state.mode;
      this.state.fanSpeed = state.fanSpeed;
      this.state.swing = state.swing;
      this.state.powerState = state.powerState;
    });
  }

  getState() {
    return this.state;
  }

  async setTemperature(temp: number): Promise<boolean> {
    if (temp < 18) {
      temp = 18;
    } else if (temp > 32) {
      temp = 32;
    }
    let success = await this.takeAction("setTemperature", temp);
    if (success) {
      this.state.temp = temp;
    }
    return;
  }

  async setMode(mode: AcMode): Promise<boolean> {
    let success = await this.takeAction("setMode", mode);
    if (success) {
      this.state.mode = mode;
    }
    return;
  }

  async setFanSpeed(speed: AcFanSpeed): Promise<boolean> {
    let success = await this.takeAction("setFanSpeed", speed);
    if (success) {
      this.state.fanSpeed = speed;
    }
    return;
  }

  async setSwing(swing: AcSwing): Promise<boolean> {
    let success = await this.takeAction("setSwing", swing);
    if (success) {
      this.state.swing = swing;
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
