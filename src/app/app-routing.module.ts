import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyDevicesComponent } from "./pages/my-devices/my-devices.component";
import { DeviceDiscoveryComponent } from "./pages/device-discovery/device-discovery.component";

const routes: Routes = [
  {
    path: "",
    component: MyDevicesComponent,
  },
  {
    path: "discover",
    component: DeviceDiscoveryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
