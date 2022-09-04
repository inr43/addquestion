import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SimpleChange } from '@angular/core';

@Component({
  selector: 'app-mathjax2',
  inputs: ['checkq'],
  templateUrl: './mathjax2.component.html',
  styles: ['']
})
export class Mathjax2Component implements OnInit {
  @Input() checkq : string;

  mathJaxObject;
  constructor() { }

  ngOnInit(): void {
    this.loadMathConfig();
    this.renderMath();
  }

  ngOnChanges(changes: SimpleChange) {
    if ( changes['checkq']) {
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
      showMathMenu: true,
      tex2jax: {inlineMath: [["$","$"],["\\(","\\("]]},
      menuSettings: { zoom: "Double-Click", zscale: "150%" },
      CommonHTML: { linebreaks: {automatic: true }},
      "HTML-CSS": { linebreaks: {automatic: true }},
            SVG :{ linebreaks: {automatic: true }}
    });
  }
}
