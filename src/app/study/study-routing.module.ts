import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudyComponent } from './study/study.component';
import { InsertComponent } from './components/insert/insert.component';
import { TrainWordsComponent } from './components/train-words/train-words.component';
import { TestWordsComponent } from './components/test-words/test-words.component';
import { ExamGuard } from '../core/guards/exam.guard';
import { WordGuard } from '../core/guards/word.guard';



const routes: Routes = [
  { path: '',
    component: StudyComponent,
    children: [
      {
        path: 'insert',
        component: InsertComponent,
        canActivate: [ExamGuard]
      },
      {
        path: 'train',
        component: TrainWordsComponent,
        canActivate: [ExamGuard, WordGuard]
      },
      {
        path: 'test',
        component: TestWordsComponent,
        canActivate: [WordGuard]
      },
      {
        path: '**',
        redirectTo: '/study/insert'
      },

    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],




exports: [RouterModule]
})
export class StudyRoutingModule { }
