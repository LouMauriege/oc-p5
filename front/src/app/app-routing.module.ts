import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components import
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent} from './features/auth/components/login/login.component';

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
