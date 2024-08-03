// global
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "data-distribution",
  templateUrl: "./component.html",
  providers: [],
  styleUrls: ["./component.scss"]
})
export class DataDistributionComponent implements OnInit, AfterViewInit {

  widgetModel: object;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  widgetUpdated(model, widget) {
    console.log(widget, this.widgetModel[widget]['model']['provenance']);
  }

  ngAfterViewInit(): void { }

  ngOnInit(): void {
    this.widgetModel = {
      singleSlider: {
        isFrozen: true,
        model: {
          value: 25,
          provenance: {
            revalidate: true,
            "data": [
              {
                "value": [
                  25
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  14
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  24
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              ,
              {
                "value": [
                  34
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  44
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  49
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  54
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  20
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  35
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  45
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  40
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  50
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  45
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  40
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  30
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  40
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  10
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  20
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  25
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  35
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  30
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  30
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  30
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  35
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  25
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  20
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  65
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  100
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  0
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  19,
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  11,
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  29,
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  39,
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  80
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              }
            ]
          }
        },
        config: { floor: 0, ceil: 100, showTicks: true, tickStep: 5 },
        mode: {
          options: [{ label: "Interaction", value: "interaction" }, { label: "Time", value: "time" }],
          value: "time"
        }
      },
      rangeSlider: {
        config: { floor: 0, ceil: 250, showTicks: true, tickStep: 15 },
        isFrozen: true,
        model: {
          value: 75,
          highValue: 180,
          provenance: {
            revalidate: true,
            "data": [
              {
                "value": [
                  105,
                  180
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  135,
                  180
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              ,
              {
                "value": [
                  0,
                  180
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  135,
                  210
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  135,
                  210
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  210,
                  250
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              }
              ,
              {
                "value": [
                  45,
                  125
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              }
            ]
          },
        },
        mode: {
          options: [{ label: "Interaction", value: "interaction" }, { label: "Time", value: "time" }],
          value: "time"
        }
      },
      singleSelectDropdown: {
        isFrozen: true,
        model: {
          options: [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
          ],
          value: { name: 'London', code: 'LDN' },
          provenance: {
            revalidate: true,
            "selections": [
              {
                "value": [
                  "NY"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "RM"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "LDN"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "RM"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "LDN"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "IST"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "LDN"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              }
            ]
          }
        },
        mode: {
          options: [{ label: "Interaction", value: "interaction" }, { label: "Time", value: "time" }],
          value: "time"
        }
      },
      multiSelectDropdown: {
        isFrozen: true,
        model: {
          options: [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
          ],
          value: [{ name: 'New York', code: 'NY' }, { name: 'Rome', code: 'RM' }],
          provenance: {
            revalidate: true,
            "selections": [
              {
                "value": [
                  "NY",
                  "RM"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "NY"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "NY",
                  "LDN"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "PRS"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "NY"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "IST",
                  "PRS"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "NY",
                  "RM"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              }
            ]
          },
        },
        mode: {
          options: [{ label: "Interaction", value: "interaction" }, { label: "Time", value: "time" }],
          value: "time"
        }
      },
      checkboxGroup: {
        isFrozen: true,
        model: {
          options: [
            { label: 'New York', value: 'NY' },
            { label: 'Rome', value: 'RM' },
            { label: 'London', value: 'LDN' },
            { label: 'Istanbul', value: 'IST' },
            { label: 'Paris', value: 'PRS' }
          ],
          value: ['NY', 'LDN', 'RM'],
          provenance: {
            revalidate: true,
            "selections": [
              {
                "value": [
                  "NY",
                  "RM"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "NY"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "NY",
                  "LDN"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "NY",
                  "LDN",
                  "RM"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              }
            ]
          },
        },
        mode: {
          options: [{ label: "Interaction", value: "interaction" }, { label: "Time", value: "time" }],
          value: "time"
        }
      },
      radioButtonGroup: {
        isFrozen: true,
        model: {
          options: [
            { label: 'New York', value: 'NY' },
            { label: 'Rome', value: 'RM' },
            { label: 'London', value: 'LDN' },
            { label: 'Istanbul', value: 'IST' },
            { label: 'Paris', value: 'PRS' }
          ],
          value: undefined,
          provenance: {
            revalidate: true,
            "selections": [
              {
                "value": [
                  "PRS"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "NY"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "RM"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "LDN"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "RM"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "LDN"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "IST"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": [
                  "LDN"
                ],
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              }
            ]
          }
        },
        mode: {
          options: [{ label: "Interaction", value: "interaction" }, { label: "Time", value: "time" }],
          value: "time"
        }
      },
      inputText: {
        isFrozen: true,
        model: {
          value: "Atlanta",
          provenance: {
            revalidate: true,
            "data": [
              {
                "value": "Rome",
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": "New York",
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": "Rome",
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              },
              {
                "value": "Atlanta",
                "timestamp": new Date("2024-03-05T00:00:00.000Z")
              }
            ]
          }
        },
        mode: {
          options: [{ label: "Interaction", value: "interaction" }, { label: "Time", value: "time" }],
          value: "time"
        }
      }
    }
  }
}