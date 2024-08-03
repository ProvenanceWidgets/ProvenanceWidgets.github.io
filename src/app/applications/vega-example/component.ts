// global
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import embed from 'vega-embed';
import jobvoyagerVegaSpec from './jobvoyager-vega-spec.json';
import { View } from "vega";

@Component({
  selector: "vega-example",
  templateUrl: "./component.html",
  providers: [],
  styleUrls: ["./component.scss"]
})
export class VegaExampleComponent implements OnInit, AfterViewInit {

  view?: View;
  jobvoyagerVegaSpec: any;
  data = [
    {
      label: "Men",
      value: "men"
    },
    {
      label: "Women",
      value: "women"
    },
    {
      label: "All",
      value: "all"
    }
  ]
  selected = 'all'

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.jobvoyagerVegaSpec = jobvoyagerVegaSpec;

  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.updateVis();
  }

  changeRadioButtonSelection(e: string) {
    console.log(e);
    this.view?.signal("sex", e).runAsync();
  }

  changeSliderSelection(change: any) {
    // this
    //   .view
    //   ?.signal("customExtent", [change.value, change.highValue])
    //   .runAsync()
    this.jobvoyagerVegaSpec = {
      ...this.jobvoyagerVegaSpec,
      "signals": [
        {
          "name": "customExtent", "value": [change.value, change.highValue]
        },
        {
          "name": "sex", "value": this.view?.signal("sex")
        },
        {
          "name": "query", "value": this.view?.signal("query"),
          "on": [
            { "events": "area:click!", "update": "datum.job" },
            { "events": "dblclick!", "update": "''" }
          ]
        }
      ]
    }
    this.updateVis();
  }

  updateVis(){

    let container = "#visualization-canvas";
    this.jobvoyagerVegaSpec["width"] = $(container).parent().width() - 100;
    this.jobvoyagerVegaSpec["height"] = this.jobvoyagerVegaSpec["width"] * 0.66;

    embed(container, this.jobvoyagerVegaSpec as any, { renderer: "svg", actions: false })
    .then(res => {
      this.view = res.view;
      this.view.signal("sex", this.selected).runAsync();
    });
  }
}