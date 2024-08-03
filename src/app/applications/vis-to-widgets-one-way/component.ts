// global
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import embed from 'vega-embed';
import vegaLiteSpecCars from './vegalite-spec-cars.json';
import carsData from './cars.json';

@Component({
  selector: "vis-to-widgets-one-way",
  templateUrl: "./component.html",
  providers: [],
  styleUrls: ["./component.scss"]
})
export class VisToWidgetsOneWayComponent implements OnInit, AfterViewInit {

  vegaLiteSpecCars: any;
  currentBrushSelection: any = [];
  appFilters: any = {
    Acceleration: {
      model: [0, 26],
      provenance: {},
      qFilterSliderConfig: {
        floor: 0,
        ceil: 26,
        showTicks: true,
        step: 0.1,
        ticksArray: [0, 26]
      }
    },
    Horsepower: {
      model: [0, 240],
      provenance: {},
      qFilterSliderConfig: {
        floor: 0,
        ceil: 240,
        showTicks: true,
        step: 0.1,
        ticksArray: [0, 240]
      }
    }
  };


  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.vegaLiteSpecCars = vegaLiteSpecCars;
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.updateVis();
  }

  updateVis(){
    let context = this;
    let container = "#visualization-canvas";
    this.vegaLiteSpecCars["data"] = { values: carsData }
    this.vegaLiteSpecCars["width"] = $(container).parent().width() - 100;
    this.vegaLiteSpecCars["height"] = this.vegaLiteSpecCars["width"] * 0.66;

    embed(container, this.vegaLiteSpecCars as any, { renderer: "svg", actions: false })
    .then(result => {
      result.view.addDataListener('brush_store', function (event, items) {
        if(items.length > 0 && "values" in items[0]){
          context.currentBrushSelection = items[0]["values"];
        }
      });

      result.view.addEventListener('click', function (event, items) {

        if(context.currentBrushSelection.length != 2) return;
        if(context.currentBrushSelection[0].length != 2) return;
        if(context.currentBrushSelection[1].length != 2) return;

        setTimeout(function(){
          let provenance_Acceleration = {...context.appFilters['Acceleration']['provenance']};
          if(!("data" in provenance_Acceleration)){
            provenance_Acceleration["data"] = [];
          }
          provenance_Acceleration["data"].push({value: context.currentBrushSelection[1].reverse(), timestamp: new Date()})
          context.appFilters['Acceleration']['provenance'] = provenance_Acceleration ? { 
            data: provenance_Acceleration["data"],
            revalidate: true
          } : provenance_Acceleration;
        });
        
        setTimeout(function(){
          let provenance_Horsepower = {...context.appFilters['Horsepower']['provenance']};
          if(!("data" in provenance_Horsepower)){
            provenance_Horsepower["data"] = [];
          }
          provenance_Horsepower["data"].push({value: context.currentBrushSelection[0], timestamp: new Date()})
          context.appFilters['Horsepower']['provenance'] = provenance_Horsepower ? { 
            data: provenance_Horsepower["data"],
            revalidate: true
          } : provenance_Horsepower;
        });

      });
    });
  }
}