import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // {path:'' , redirectTo:'home' , pathMatch:'full'},
  {path:'' , component:HomeComponent , canActivate:[AuthGuard] ,title:'home'},
  {path:'login' , component:LoginComponent ,title:'login'},
  {path:'signup' , component:SignupComponent ,title:'signup'},
  {path:'**' , component:NotfoundComponent ,title:'404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
