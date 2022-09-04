import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question';
import { QuestionService } from '../services/question.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalstorageService } from '../services/localstorage.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-questionform',
  templateUrl: './questionform.component.html',
  styleUrls: ['./questionform.component.scss']
})
export class QuestionformComponent implements OnInit {
  form      : FormGroup
  formimage : FormGroup
  content   : Question
  questions : Question[]=[]
  year      : Date= new Date()
  subject   : string
  code      : string
  key       : string
  questionNo : number = 0
  answerNo : number = 0
  imageDisplay : string | ArrayBuffer
  withImage : boolean = false;
  isSubmitted : boolean = false;
  editmode   : boolean = false;
  questionId : string;
  prevbutton : boolean=false;
  nextbutton : boolean=true;
  cancelEditbutton: boolean=true;
  constructor(private questionService : QuestionService,
              private messageService: MessageService,
              private formBuilder: FormBuilder,
              private localStorage: LocalstorageService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group( {
      key: [''],
      question: ['', Validators.required],
      answer: ['2', Validators.required],
      q: ['', Validators.required],
      a: [''],
      b: [''],
      c: [''],
      d: [''],
      image: ['']
    })

    this.formimage = this.formBuilder.group( {
      id: ['', Validators.required],
      image: [''],
      answerno: [0] //answer number
    })

    this._getKey()
  }

  addQuestion(question: Question, questionFormData)
  {
    if (this.editmode) { this.updateQuestion(question); return; }
    this.questionService.addQuestionWithImage(question, questionFormData, this.withImage).subscribe(
      (question: Question) => {
        this.questionId = question.id
        this.getQuestions();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Question ${question.id} is created!`
        });
        timer(5000)
          .toPromise()
          .then(() => {
            console.log("After 5 Seconds")
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not created!'
        });
      }
    );
  }

  updateQuestion(question : Question)
  {
    this.editmode = false; this.setbuttons();
    this.questionService.updateQuestion(question, this.content.id).subscribe(
      (question: Question) => {
        this.questionId = question.id
        this.getQuestions();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Question ${question.id} is updated!`
        });
      }
    );
    this.initForm()
  }

  onSave() {
    this._storeKey()
    this.isSubmitted = true;
    if ( this.form.invalid) {
     console.log('Invalid Form'); return; }

     const question : Question = {
      key : this.key,
      question : this.questionForm['question'].value,
      a : this.questionForm['a'].value,
      b : this.questionForm['b'].value,
      c : this.questionForm['c'].value,
      d : this.questionForm['d'].value,
      q : this.questionForm['q'].value,
      answer: this.questionForm['answer'].value,
    }

    const questionFormData = new FormData();
    Object.keys(this.questionForm).map((key) => {
      questionFormData.append(key, this.questionForm[key].value)
    });

    this.addQuestion(question, questionFormData);

    this.withImage=false;
    console.log("withimage reset to "+this.withImage)
  }
  
  edit(id: string) {
    this.editmode = true; this.setbuttons();
    this.questionForm['question'].setValue(this.content.question)
    this.questionForm['a'].setValue(this.content.a)
    this.questionForm['b'].setValue(this.content.b)
    this.questionForm['c'].setValue(this.content.c)
    this.questionForm['d'].setValue(this.content.d)
    this.questionForm['q'].setValue(this.content.q)
    this.questionForm['answer'].setValue(this.content.answer)
  }


  del(id:string) {
    this.questionService.deleteQuestion(id).subscribe((response)=> {this.getQuestions()},
    (error) => { console.log(error.error.message)})
  }

  getQuestions() {
    this.questionService.getQuestions(this.key).subscribe((response)=> {
      console.log("Questions received "+response.length);
      this.questions = response;
      this.questionNo=this.questions.length;
      this.content = this.questions[this.questionNo-1];//while accessing array
      this.questionForm['q'].setValue(this.questionNo)
    },
    (error) => { 
      console.log(error.error.message);
    });
   }

   onFetch() {
      console.log("Fetch:"+this.year.getFullYear()+this.subject+this.code)
      this.key=this.year.getFullYear()+this.subject+this.code
      this.getQuestions()
 }

  _getKey() {
    let key = this.localStorage.getKey();
    if( key ) {
      const keys= key.split(',')
      if ( keys.length ===3 ){
        this.year.setFullYear(Number(keys[0]))
        this.subject = keys[1]
        this.code = keys[2]
        this.key=this.year.getFullYear()+this.subject+this.code
        this.getQuestions()}
    }else
    this.key=''
    this.questionForm['key'].setValue(this.key)
   }

   onQuestionNo() {
    if(this.questionNo>0 && this.questionNo<= this.questions.length){
      this.content=this.questions[this.questionNo-1]; }}

   onPrev() {
    if ( this.questionNo>1 ) {
      this.questionNo--
      this.content=this.questions[this.questionNo-1]}   
      this.setbuttons()
    }

    onNext() {
     if ( this.questionNo<this.questions.length ) {
      this.questionNo++
      this.content=this.questions[this.questionNo-1]}
      this.setbuttons()
    }

    onEditCancel() {
      this.editmode = false;
      this.setbuttons()
      this.initForm()
    }

    setbuttons() {
      this.questionNo===  this.questions.length ? this.nextbutton=true: this.nextbutton=false;
      this.questionNo===1 ? this.prevbutton=true: this.prevbutton=false;
      this.editmode ? this.cancelEditbutton=false: this.cancelEditbutton=true;
    }

   _storeKey() {
      const key= this.year.getFullYear()+','+this.subject+','+this.code;
      this.localStorage.setKey(key)
      this.localStorage.getKey()} 

  refresh() {
    this._storeKey()
    this._getKey()
    this.getQuestions()}         

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      this.withImage=true;
      };
      fileReader.readAsDataURL(file);
    }
  }

  onanswerImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.formimage.patchValue({ image: file });
      this.formimage.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        console.log("file Read");//this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    };}

  uploadAnswerImage() {
    if (!this.questionId)
    { this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Cannot upload image without saving question!'});
        return;}
    this.imageForm['answerno'].setValue(this.answerNo)
    this.imageForm['id'].setValue(this.questionId)
    console.log(this.questionId)
    this.questionId=''

    const imageFormData = new FormData();
    Object.keys(this.imageForm).map((key) => {
      imageFormData.append(key, this.imageForm[key].value)
    });

    this.questionService.addAnswerImage(imageFormData).subscribe((response)=> {
      console.log("Response received "+response);
    },
    (error) => { 
      console.log("Error sending image"+error.error.error);});   
  }

  get questionForm() {
      return this.form.controls;
    }  

  get imageForm() {
    return this.formimage.controls;
  }  

  initForm() {
    this.questionForm['question'].setValue('')
    this.questionForm['a'].setValue('')
    this.questionForm['b'].setValue('')
    this.questionForm['c'].setValue('')
    this.questionForm['d'].setValue('')
    this.questionForm['q'].setValue('')
    this.questionForm['answer'].setValue('')
  }

}

