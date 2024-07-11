import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { StudyRoutingModule } from './study-routing.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StudyComponent } from './study/study.component';
import { InsertComponent } from './components/insert/insert.component';
import { TrainWordsComponent } from './components/train-words/train-words.component';
import { TestWordsComponent } from './components/test-words/test-words.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestWordsResultComponent } from './components/test-words-result/test-words-result.component';
import { AnswerFormComponent } from './components/answer-form/answer-form.component';



@NgModule({
  declarations: [SideNavComponent, ToolbarComponent, StudyComponent, InsertComponent, TrainWordsComponent, TestWordsComponent, TestWordsResultComponent, AnswerFormComponent],
  imports: [
    StudyRoutingModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule
]
})
export class StudyModule { }
