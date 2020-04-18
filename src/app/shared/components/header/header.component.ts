import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() showBackButton: boolean;
  @Input() buttons: HeaderButton[];
  @Output() backButtonClick: EventEmitter<void> = new EventEmitter();
  @Output() buttonClick: EventEmitter<HeaderButton> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  onBackButtonClick() {
    this.backButtonClick.emit();
  }
  onButtonClick(btn: HeaderButton) {
    this.buttonClick.emit(btn);
  }
}

export interface HeaderButton {
  name: string;
  icon: string;
}
