import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionService } from './services/question.service';
import { Message, MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { QuestionComponent } from './question/question.component';
import { ViewComponent } from './view/view.component';
import { ViewquestionComponent } from './viewquestion/viewquestion.component';
import { RepoComponent } from './repository/repo.component';
import { MathjaxComponent } from './mathjax/mathjax/mathjax.component';
import { Mathjax2Component } from './mathjax/mathjax2/mathjax2.component';
import { QuestionformComponent } from './questionform/questionform.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import {CalendarModule} from 'primeng/calendar';
import {ToolbarModule} from 'primeng/toolbar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';

const UX_MODULE = [    
  ButtonModule,
  TableModule,
  InputTextareaModule,
  InputTextModule,
  CheckboxModule,
  CardModule,
  CalendarModule,
  ToolbarModule,
  MessagesModule,
  MessageModule,
  ToastModule,
  DialogModule,
]

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    RepoComponent,
    ViewComponent,
    ViewquestionComponent,
    MathjaxComponent,
    Mathjax2Component,
    QuestionformComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MessageModule,
    ...UX_MODULE
  ],
  providers: [QuestionService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
