import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {path:'users',component : UserComponent },
  {path: 'users/edit/:id', component : EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
