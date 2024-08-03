import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { HttpErrorHandler } from "./http-error-handler.service";
import { MessageService } from "./message.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { AccordionModule } from 'primeng/accordion';
import { BlockUIModule } from 'primeng/blockui';
import { ScrollPanelModule } from 'primeng/scrollpanel';

// Local App Imports

import { HomeComponent } from "./applications/home/component";
import { PlaygroundComponent } from "./applications/playground/component";
import { ScentedWidgetsComponent } from "./applications/scented-widgets/component";
import { PhosphorObjectsComponent } from "./applications/phosphor-objects/component";
import { DataDistributionComponent } from "./applications/data-distribution/component";
import { DynamicQueryWidgetsHomeFinderComponent } from "./applications/dynamic-query-widgets-homefinder/component";
import { VegaExampleComponent } from "./applications/vega-example/component";
import { VisToWidgetsOneWayComponent } from "./applications/vis-to-widgets-one-way/component";
import { WidgetsToVisOneWayComponent } from "./applications/widgets-to-vis-one-way/component";

import { ProvenanceWidgetsModule } from "provenance-widgets";


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    OverlayPanelModule,
    TabViewModule,
    SidebarModule,
    CardModule,
    SliderModule,
    ProgressBarModule,
    TableModule,
    AccordionModule,
    BlockUIModule,
    ScrollPanelModule,
    ButtonModule,
    BadgeModule,
    ProvenanceWidgetsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    PlaygroundComponent,
    ScentedWidgetsComponent,
    PhosphorObjectsComponent,
    DataDistributionComponent,
    DynamicQueryWidgetsHomeFinderComponent,
    VegaExampleComponent,
    WidgetsToVisOneWayComponent,
    VisToWidgetsOneWayComponent,
  ],
  providers: [
    Title,
    HomeComponent,
    PlaygroundComponent,
    ScentedWidgetsComponent,
    PhosphorObjectsComponent,
    DataDistributionComponent,
    DynamicQueryWidgetsHomeFinderComponent,
    VegaExampleComponent,
    WidgetsToVisOneWayComponent,
    VisToWidgetsOneWayComponent,
    HttpErrorHandler,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
