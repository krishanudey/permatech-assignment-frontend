import { PowerState, TvKeys } from "./enums";
import { NetworkDevice } from "./network-device";

export interface SmartTvState {
  powerState: PowerState;
  volume: number;
  isMuted: boolean;
}

export class SmartTV {
  private state: SmartTvState = null;
  constructor(networkDevice: NetworkDevice) {
    this.state = {
      powerState: PowerState.OFF,
      volume: 35,
      isMuted: false,
    };
  }

  getState() {
    return this.state;
  }

  async setVolume(vol: number): Promise<boolean> {
    //TODO::
    return;
  }

  async toggleMute(): Promise<boolean> {
    //TODO::
    return;
  }

  async setPowerState(state: PowerState): Promise<boolean> {
    //TODO::
    return;
  }

  async keyPress(key: TvKeys): Promise<boolean> {
    console.log("SmartTV -> key", key);
    //TODO::
    return;
  }
}
