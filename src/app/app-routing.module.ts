import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DatosComponent } from './pages/datos/datos.component';
import { TemplateComponent } from './pages/template/template.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'datos', component: DatosComponent },
  {path: 'template', component: TemplateComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
