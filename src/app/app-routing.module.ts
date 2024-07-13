import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';



const routes: Routes = [
  { path: 'inbox',
    canMatch: [AuthGuard],
    loadChildren: () =>
      import ('./inbox/inbox.module').then(mod => mod.InboxModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
