import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-video',
  templateUrl: './demo-video.component.html',
  styleUrls: ['./demo-video.component.scss']
})
export class DemoVideoComponent implements OnInit {

  @Input() videoURL: string;

  constructor() { }

  ngOnInit() {
  }

}
