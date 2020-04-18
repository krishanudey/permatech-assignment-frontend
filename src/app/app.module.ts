import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DeviceDiscoveryComponent } from "./pages/device-discovery/device-discovery.component";
import { MyDevicesComponent } from "./pages/my-devices/my-devices.component";
import { HeaderComponent } from './shared/components/header/header.component';
import { LoadingPanelComponent } from './shared/components/loading-panel/loading-panel.component';
import { DeviceControlComponent } from './pages/device-control/device-control.component';
import { AcControllerComponent } from './shared/components/ac-controller/ac-controller.component';
import { TvControllerComponent } from './shared/components/tv-controller/tv-controller.component';
import { LightControllerComponent } from './shared/components/light-controller/light-controller.component';

@NgModule({
  declarations: [AppComponent, DeviceDiscoveryComponent, MyDevicesComponent, HeaderComponent, LoadingPanelComponent, DeviceControlComponent, AcControllerComponent, TvControllerComponent, LightControllerComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
