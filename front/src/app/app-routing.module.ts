import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components import
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent} from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MeComponent } from './pages/me/me.component';

import { UnauthGuard } from './guards/unauth.guard';
import { AuthGuard } from './guards/auth.guard';

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
    {
        path: '',
        canActivate: [UnauthGuard],
        loadChildren: () => import('./features/auth/auth.module').then(module => module.AuthModule)
    },
    {
        path: 'me',
        canActivate: [AuthGuard],
        component: MeComponent
    },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
