import { OgrlisteleComponent } from './components/ogrlistele/ogrlistele.component';
import { OdevlisteleComponent } from './components/odevlistele/odevlistele.component';
import { OdevComponent } from './components/odev/odev.component';
import { OgrenciComponent } from './components/ogrenci/ogrenci.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'ogrenci',
    component:OgrenciComponent
  },
  {
    path:'odev',
    component:OdevComponent
  },
  {
    path:'odevlistele/:OgrId',
    component:OdevlisteleComponent
  },
  {
    path:'ogrlistele/:dersId',
    component:OgrlisteleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
