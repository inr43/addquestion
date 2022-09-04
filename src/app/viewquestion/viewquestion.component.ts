import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-viewquestion',
  templateUrl: './viewquestion.component.html',
  styleUrls: ['./viewquestion.component.scss']
})
export class ViewquestionComponent implements OnInit {
  @Input() questionno: string;
  @Input() question: string;

  mathJaxObject;

  constructor() { }

  ngOnInit(): void {
    this.loadMathConfig()
   this.renderMath();
  }

   renderAgain() { this.loadMathConfig()}
/*     
  ngOnChanges(changes: SimpleChanges) {
    console.log("OnChanges")
    if (changes['question']) {
      this.renderMath()
    }
  }
 */

  renderMath(){
    console.log("render math")
  
    this.mathJaxObject  = window['MathJax'] ;
    let angObj = this;
    setTimeout(()=>{
    angObj.mathJaxObject.Hub.Queue(["Typeset",angObj.mathJaxObject.Hub],'question');
  
    },1000)
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
      
 
}
