import { Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { formatDate } from '@angular/common';
import { Subscription } from "rxjs";


window.onbeforeunload = function (e) {
    // Cancel the event
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    // Chrome requires returnValue to be set
    e.returnValue = false;
    // return "Are you sure? You will lose unwanted changes"
};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent{
  
  constructor() {
  }
  
  ngAfterViewInit(): void {}

  ngOnDestroy(): void { }

  ngOnInit(): void {}

}
