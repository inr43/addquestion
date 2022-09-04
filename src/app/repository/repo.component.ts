import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Question } from '../models/question';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-repo',
  template: '',
  styles: ['']
})

export class RepoComponent implements OnInit {
  @Input() index!: number;
  @Output() question = new EventEmitter<Question[]>();
  @Output() totalquestions = new EventEmitter<Number>();
  
  questions : Question[]=[]
  key : string = "2004PhysicsA1";
  current : String = 'init';

  constructor(
              private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getQuestions()
  }

  getQuestions() {
    this.questionService.getQuestions(this.key).subscribe((response)=> {
      console.log("Question received "+response.length);
  //     this.account = response.ledger.accountid;
      this.questions = response;
      this.setQuestion()
    },
    (error) => { 
      console.log(error.error.message);
    });
   }

  setQuestion()
  {
    if( this.questions.length)
    {
      this.current = this.questions[this.index].question
      this.question.emit(this.questions)
    }
    this.totalquestions.emit(this.questions.length)
  }
}
