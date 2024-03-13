import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BluetoothPage } from './bluetooth.page';

const routes: Routes = [
  {
    path: '',
    component: BluetoothPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BluetoothPageRoutingModule {}
