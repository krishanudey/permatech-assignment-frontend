import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() buttons: HeaderButton[];
  @Output() buttonClick: EventEmitter<HeaderButton> = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  onButtonClick(btn: HeaderButton) {
    this.buttonClick.emit(btn);
  }
}

export interface HeaderButton {
  name: string;
  icon: string;
}
