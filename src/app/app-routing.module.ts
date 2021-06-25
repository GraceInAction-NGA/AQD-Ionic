import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import("./list/list.module").then(m => m.ListPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import("./pages/about/about.module").then(m => m.AboutPageModule)
  },
  { 
    path: 'health', 
    loadChildren: () => import("./pages/health/health.module").then(m => m.HealthPageModule)
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
