import { Component, OnInit } from "@angular/core";
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

  navigateToRoute(route:string){
    const url = `${window.location.origin}/#/${route}`;
  window.open(url, '_blank');
    // this.router.navigateByUrl(route, '_blank');
  }
}
