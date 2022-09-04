import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../models/question';
import { QuestionService } from '../services/question.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  form: FormGroup;
  year: string = '2004';
  subject: string =  'Physics';
  ver: string = 'A1';
  content2: Question; 
  inputQuestion: string;
  checkContent: boolean=false;
  questionNo : number = 0;
  a: string = '7';
  b: string = '9';
  c: string = '1';
  d: string = '3';
  q: number = 0;
  answer: string = '2';
  totalquestions: Number;
  questions : Question[]=[];
  imageDisplay :string | ArrayBuffer;
  imageOn:boolean=false;

  constructor(private formBuiler : FormBuilder,
              private questionService: QuestionService,
              private messageService  : MessageService,
                      private route:Router
                      ) { }

  ngOnInit(): void {
    this.form = this.formBuiler.group({
      image: ['', Validators.required]
    })
  }

  onQuestion(question: Question[]) {
    this.questions = question;
    this.content2=question[this.questionNo]
  }

  onNext() {
    if ( (this.questionNo+1) < this.totalquestions)
    {
      this.questionNo++;
      this.content2=this.questions[this.questionNo]
    }
  }

  onBack() {
    if ( (this.questionNo+1) > 1 ) 
    {
      this.questionNo--;
      this.content2=this.questions[this.questionNo]
    }
  }

  onTotal(totalquestions: Number) {
    console.log("Total received : ["+totalquestions+"]")
    this.totalquestions = totalquestions;
  }

  onAddQuestion()
  {
    const question : Question = {
      key : this.year+this.subject+this.ver,
      question : this.inputQuestion,
      a : this.a,
      b : this.b,
      c : this.c,
      d : this.d,
      q : this.q,
      answer: this.answer,
      image: this.form.get('image').value
    }
    console.log("Image")
    console.log(this.form.get('image').value)
    if( this.imageOn) this.addwithimage(question)
    else this.addwithoutimage(question)
  }
 
  addwithoutimage(question:Question)
  {
    this.questionService.addQuestion(question).subscribe((response)=> {
      console.log("Response received "+response);
      this.getQuestions()
    },
    (error) => { 
      console.log(error.error.message);
            this.addMessage(false, error.error.message);
          });   
  }

  addwithimage(question:Question)
  {
/*     this.imageOn=false;
    this.questionService.addQuestionWithImage(question).subscribe((response)=> {
      console.log("Response received "+response);
      this.getQuestions()
    },
    (error) => { 
      console.log(error.error.message);
            this.addMessage(false, error.error.message);
          });   
 */  }

  key : string = "2004PhysicsA1";

  getQuestions() {
    this.questionService.getQuestions(this.key).subscribe((response)=> {
      console.log("Question received "+response.length);
      this.questions = response;
      this.totalquestions = this.questions.length;
      this.content2=this.questions[this.q]
    },
    (error) => { 
      console.log(error.error.message);
    });
   }

   onNo() {
    let id=0;
    if (this.q != 0 ) id=this.q-1;
    this.content2=this.questions[id]
    this.questionNo=id;
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    console.log(file)
    if (file) {
      this.imageOn=true;
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };

      fileReader.readAsDataURL(file);
    }
//    console.log('image'+this.form.get('image').value);
  }


  
  addMessage(state: boolean, log : string){
    this.messageService.add({
      severity: state ? 'success' : 'error', 
      summary: state ? 'Success!' : 'error', 
      detail: log})      }
}
