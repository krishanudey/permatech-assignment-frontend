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
    this.api.deviceAction(this.networkDevice.uuid, "keyPress", key).subscribe(
      (resp) => {
        console.log("SmartTV -> resp", resp);
      },
      (err) => {
        console.log("SmartTV -> err", err);
      }
    );
    return;
  }
}
