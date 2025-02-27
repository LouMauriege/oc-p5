import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { CreateComponent } from './components/create/create.component';

const routes: Routes = [
    { title: 'Posts', path: '', component: ListComponent },
    { title: 'Posts - detail', path: 'detail/:id', component: DetailComponent },
    { title: 'Posts - create', path: 'create', component: CreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
