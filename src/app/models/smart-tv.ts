import { PowerState, TvKeys } from "./enums";
import { NetworkDevice } from "./network-device";
import { ApiService } from "../services/api.service";

export interface SmartTvState {
  powerState: PowerState;
  volume: number;
  isMuted: boolean;
}

export class SmartTV {
  private state: SmartTvState = null;
  constructor(private networkDevice: NetworkDevice, private api: ApiService) {
    this.state = {
      powerState: PowerState.OFF,
      volume: 0,
      isMuted: false,
    };
    api.getDeviceState(networkDevice.uuid).subscribe((state) => {
      this.state.powerState = state.powerState;
      this.state.volume = state.volume;
      this.state.isMuted = state.isMuted;
    });
  }

  getState() {
    return this.state;
  }

  async keyPress(key: TvKeys): Promise<boolean> {
    let success = await this.api.deviceAction(
      this.networkDevice.uuid,
      "keyPress",
      key
    );

    return;
  }
}
