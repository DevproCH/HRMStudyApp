import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'study',
    loadChildren: () => import('./study/study.module').then(m => m.StudyModule),
  },
  /*
    TODO: Add the impressum
  */
  {
    path: '**',
    redirectTo: '/study',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
