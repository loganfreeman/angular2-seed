import { Component, AfterViewInit } from '@angular/core';
declare var jQuery:any;
@Component({
  selector: 'sd-markdown',
  templateUrl: 'app/+markdown/components/markdown.component.html',
  styleUrls: ['app/+markdown/components/markdown.component.css'],
})
export class MarkdownComponent implements AfterViewInit {
  ngAfterViewInit() {
    jQuery('.selectpicker').selectpicker({
      style: 'btn-info',
      size: 4
    });
  }

  onSelect(value: string) {
    console.log(value);
  }
}
