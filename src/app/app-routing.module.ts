import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlaygroundComponent } from "./applications/playground/component";
import { ScentedWidgetsComponent } from "./applications/scented-widgets/component";
import { VegaExampleComponent } from "./applications/vega-example/component";
import { DynamicQueryWidgetsHomeFinderComponent } from "./applications/dynamic-query-widgets-homefinder/component";
import { PhosphorObjectsComponent } from "./applications/phosphor-objects/component";
import { DataDistributionComponent } from "./applications/data-distribution/component";
import { VisToWidgetsOneWayComponent } from "./applications/vis-to-widgets-one-way/component";
import { WidgetsToVisOneWayComponent } from "./applications/widgets-to-vis-one-way/component";
import { HomeComponent } from "./applications/home/component";


const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'playground', component: PlaygroundComponent }, 
  { path: 'scented-widgets', component: ScentedWidgetsComponent }, 
  { path: 'phosphor-objects', component: PhosphorObjectsComponent }, 
  { path: 'data-distribution', component: DataDistributionComponent }, 
  { path: 'widgets-to-vis-one-way', component: WidgetsToVisOneWayComponent }, 
  { path: 'vis-to-widgets-one-way', component: VisToWidgetsOneWayComponent }, 
  { path: 'vega-example', component: VegaExampleComponent }, 
  { path: 'dynamic-query-widgets-homefinder', component: DynamicQueryWidgetsHomeFinderComponent }, 
  { path: '**', redirectTo: '', pathMatch: 'full' },  // An attempt to reach any page other than the above will result in a redirect to the home page.
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled", useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
