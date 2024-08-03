// global
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "playground",
  templateUrl: "./component.html",
  providers: [],
  styleUrls: ["./component.scss"]
})
export class PlaygroundComponent implements OnInit, AfterViewInit {

  widgetModel: object = {
    singleSlider: {
      model: {
        value: 25
      },
      config: { floor: 0, ceil: 100, showTicks: true, tickStep: 5 },
      mode: {
        options: [{ label: "Interaction", value: "interaction" }, { label: "Time", value: "time" }],
        value: "interaction"
      }
    },
    rangeSlider: {
      config: { floor: 0, ceil: 100, showTicks: true, tickStep: 15 },
      model: {
        value: 0,
        highValue: 100,
      },
      mode: {
        options: [{ label: "Interaction", value: "interaction" }, { label: "Time", value: "time" }],
        value: "interaction"
      }
    },
    singleSelectDropdown: {
      model: {
        options: [
          { name: 'New York', code: 'NY' },
          { name: 'Rome', code: 'RM' },
          { name: 'London', code: 'LDN' },
          { name: 'Istanbul', code: 'IST' },
          { name: 'Paris', code: 'PRS' }
        ],
        value: { name: 'New York', code: 'NY' }
      },
      mode: {
        options: [{ label: "Interaction", value: "interaction"}, { label: "Time", value: "time" }],
        value: "interaction"
      }
    },
    multiSelectDropdown: {
      model: {
        options: [
          { name: 'New York', code: 'NY' },
          { name: 'Rome', code: 'RM' },
          { name: 'London', code: 'LDN' },
          { name: 'Istanbul', code: 'IST' },
          { name: 'Paris', code: 'PRS' }
        ],
        value: [{ name: 'New York', code: 'NY' }, { name: 'Rome', code: 'RM' }]
      },
      mode: {
        options: [{ label: "Interaction", value: "interaction"}, { label: "Time", value: "time" }],
        value: "interaction"
      }
    },
    checkboxGroup: {
      model: {
        options: [
          { label: 'New York', value: 'NY' },
          { label: 'Rome', value: 'RM' },
          { label: 'London', value: 'LDN' },
          { label: 'Istanbul', value: 'IST' },
          { label: 'Paris', value: 'PRS' }
        ],
        value: ['NY', 'RM']
      },
      mode: {
        options: [{ label: "Interaction", value: "interaction"}, { label: "Time", value: "time" }],
        value: "interaction"
      }
    },
    radiobuttonGroup: {
      model: {
        options: [
          { label: 'New York', value: 'NY' },
          { label: 'Rome', value: 'RM' },
          { label: 'London', value: 'LDN' },
          { label: 'Istanbul', value: 'IST' },
          { label: 'Paris', value: 'PRS' }
        ],
        value: 'NY'
      },
      mode: {
        options: [{ label: "Interaction", value: "interaction"}, { label: "Time", value: "time" }],
        value: "interaction"
      }
    },
    inputText: {
      model: {
        value: null
      },
      mode: {
        options: [{ label: "Interaction", value: "interaction" }, { label: "Time", value: "time" }],
        value: "interaction"
      }
    }
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // todo
  }

}