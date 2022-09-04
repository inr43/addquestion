import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Question } from '../models/question';
import { QuestionService } from '../services/question.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  questions : Question[]=[]
  key : string = "2004MathsA1";
  mathJaxObject;
  mathContent: string;
  constructor(private location: Location,
              private messageService: MessageService,
              private questionService: QuestionService) { }

  ngOnInit(): void {
//    this.loadMathConfig()
    this.getQuestions()
  }

  back() { this.location.back()}

  getQuestions() {
    this.questionService.getQuestions(this.key).subscribe((response)=> {
      console.log("Question received "+response);
  //     this.account = response.ledger.accountid;
      this.questions = response;
    },
    (error) => { 
      console.log(error.error.message);
            this.addMessage(false, error.error.message);
    });
   }

   loadMathConfig(){
    console.log("load config")

    this.mathJaxObject  = window['MathJax'] ;
      this.mathJaxObject.Hub.Config({        
        showMathMenu: false,
        tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]},
        menuSettings: { zoom: "Double-Click",zscale: "150%" },
        CommonHTML: { linebreaks: { automatic: true } },
        "HTML-CSS": { linebreaks: { automatic: true } },
              SVG: { linebreaks: { automatic: true } }
      });
  } 

    addMessage(state: boolean, log : string){
      this.messageService.add({
        severity: state ? 'success' : 'error', 
        summary: state ? 'Success!' : 'error', 
        detail: log})      }
    
        showDialog() {}
}
