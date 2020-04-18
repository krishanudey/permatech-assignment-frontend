import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyDevicesComponent } from "./pages/my-devices/my-devices.component";

const routes: Routes = [
  {
    path: "",
    component: MyDevicesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
