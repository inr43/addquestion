import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { QuestionformComponent } from './questionform/questionform.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionformComponent
  }, 
  {
  path: 'view',
  component: ViewComponent
 } 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
