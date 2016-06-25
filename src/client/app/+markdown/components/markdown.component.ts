import { Component, AfterViewInit } from '@angular/core';
import * as MarkdownIt from 'markdown-it';
declare var jQuery:any;
@Component({
  selector: 'sd-markdown',
  templateUrl: 'app/+markdown/components/markdown.component.html',
  styleUrls: ['app/+markdown/components/markdown.component.css'],
})
export class MarkdownComponent implements AfterViewInit {
  md: any;
  constructor() {
    this.md = new MarkdownIt();
  }
  ngAfterViewInit() {
    jQuery('.selectpicker').selectpicker({
      style: 'btn-info',
      size: 4
    });
  }

  onSelect(value: string) {
    console.log(value);
  }

  onTextAreaChange(text: string) {
    jQuery('.result').html(this.md.render(text));
  }
}
