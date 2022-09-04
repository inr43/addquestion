import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SimpleChange } from '@angular/core';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-mathjax',
  inputs: ['content'],
  templateUrl: './mathjax.component.html',
  styleUrls: ['./mathjax.component.scss']
})
export class MathjaxComponent implements OnInit {
  @Input() content : Question;
  mathJaxObject;
  selectedCities: string[]=[];
  selectedCategories: any[] = ['Technology', 'Sports'];

  categories: any[] = [{name: 'Accounting', key: 'A'}, {name: 'Marketing', key: 'M'}, {name: 'Production', key: 'P'}, {name: 'Research', key: 'R'}];
  a : string = 'a'
  ans : number;
  empty : string ;
  constructor() { }

  ngOnInit(): void {
    console.log("init")
    this.a = this.empty;
    this.loadMathConfig();
    this.renderMath();
/*     this.categories.push( {name: this.content.a, key: 1})
    this.categories.push( {name: this.content.b, key: 2})
    this.categories.push( {name: this.content.c, key: 3})
    this.categories.push( {name: this.content.d, key: 4})

    this.ans = Number(this.content.answer)
    console.log("answer "+this.ans)
 */
    this.selectedCities = this.categories.slice(1,3)
  }

  ngOnChanges(changes: SimpleChange) {
    if ( changes['content']) {
      this.renderMath();
 }
  }

  renderMath() {
    this.mathJaxObject = window['MathJax'];
    let angObj = this;
    setTimeout( ()=>{
      angObj.mathJaxObject.Hub.Queue(["Typeset",angObj.mathJaxObject.Hub], 'mathContent');
    }
    )
  }

  loadMathConfig() {
    this.mathJaxObject = window['MathJax'];
    this.mathJaxObject.Hub.Config({
      showMathMenu: false,
      tex2jax: {inlineMath: [["$","$"],["\\(","\\("]]},
      menuSettings: { zoom: "Double-Click", zscale: "150%" },
      CommonHTML: { linebreaks: {automatic: false }},
      "HTML-CSS": { linebreaks: {automatic: false }},
            SVG :{ linebreaks: {automatic: false }}
    });
  }
}
