import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-singout-modal',
  templateUrl: './singout-modal.component.html',
  styleUrls: ['./singout-modal.component.css']
})
export class SingoutModalComponent implements OnInit {

  @Input() onCancel: Function;
  @Input() onOk: Function;
  @Input() isVisible: boolean;

  isModalShown: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.isModalShown = this.isVisible;
  }

  handleOk(): void {this.onOk();}

  handleCancel(): void {this.onCancel();}
}
