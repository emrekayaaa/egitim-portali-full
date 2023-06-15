import { OgrsecDialogComponent } from './components/dialogs/ogrsec-dialog/ogrsec-dialog.component';
import { OgrlisteleComponent } from './components/ogrlistele/ogrlistele.component';
import { OdevDialogComponent } from './components/dialogs/odev-dialog/odev-dialog.component';
import { OdevlisteleComponent } from './components/odevlistele/odevlistele.component';
import { OgrenciDialogComponent } from './components/dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { OdevComponent } from './components/odev/odev.component';
import { OgrenciComponent } from './components/ogrenci/ogrenci.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    OgrenciComponent,
    OdevComponent,
    OdevlisteleComponent,
    OgrlisteleComponent,

    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    OgrenciDialogComponent,
    OdevDialogComponent,
    OgrsecDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    OgrenciDialogComponent,
    OdevDialogComponent,
    OgrsecDialogComponent
  ],
  providers: [MyAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
