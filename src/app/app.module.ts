import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DeviceDiscoveryComponent } from "./pages/device-discovery/device-discovery.component";
import { MyDevicesComponent } from "./pages/my-devices/my-devices.component";

@NgModule({
  declarations: [AppComponent, DeviceDiscoveryComponent, MyDevicesComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
