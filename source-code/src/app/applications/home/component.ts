import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "home",
  templateUrl: "./component.html",
  providers: [],
  styleUrls: ["./component.scss"],
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void { }

  navigateToRoute(route){
    this.router.navigateByUrl(route);
  }
}
