import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from './../../models/Sonuc';
import { Ogrenciler } from './../../models/Ogrenciler';
import { Odevler } from './../../models/Odevler';
import { Kayit } from './../../models/kayit';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { OgrsecDialogComponent } from '../dialogs/ogrsec-dialog/ogrsec-dialog.component';

@Component({
  selector: 'app-odevlistele',
  templateUrl: './odevlistele.component.html',
  styleUrls: ['./odevlistele.component.css']
})
export class OdevlisteleComponent implements OnInit {
kayitlar!:Kayit[];
odevler!:Odevler[];
secOgrenci!:Ogrenciler;
OgrId!:string;
odevId:string =""; 
displayedColumns =['odevAdi','islemler']; 
dataSource:any;
confirmDialogRef!:MatDialogRef<ConfirmDialogComponent>
  constructor(
    public apiServis : ApiService,
    public alert : MyAlertService,
    public route : ActivatedRoute,
    public matDialog : MatDialog 
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if (p) {
        this.OgrId=p.OgrId;
        this.OgrenciGetir();
        this.KayitListele();
        this.OdevListele();
      }
    });
  }

  OgrenciGetir(){
    this.apiServis.OgrencilerById(this.OgrId).subscribe((d:any | Ogrenciler )=>{
      this.secOgrenci=d;
    });
  }

  KayitListele(){
    this.apiServis.OgrenciOdevListe(this.OgrId).subscribe((d:any | Kayit[] )=>{
      this.kayitlar=d;
      this.dataSource=new MatTableDataSource(this.kayitlar);
    });
  }

  OdevListele(){
    this.apiServis.OdevlerListe().subscribe((d:any | Odevler[] )=>{
      this.odevler=d;
    });
  }

  OdevSec(odevId:string){
    console.log(odevId);
    this.odevId=odevId;
  }

  Kaydet(){
    if (this.odevId==""){
      var s:Sonuc=new Sonuc();
      s.islem=false;
      s.mesaj="Ödev Seçiniz";
      this.alert.AlertUygula(s);
  }


  var kayit:Kayit=new Kayit();
  kayit.kayitOdevId=this.odevId;
  kayit.kayitOgrId=this.OgrId;

  this.apiServis.KayitEkle(kayit).subscribe((s:any |Sonuc)=>{
    this.alert.AlertUygula(s);
    if (s.islem){
      this.KayitListele();
    }
  });
  }


  Sil(kayit:Kayit){
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.odevBilgi.odevAdi + "Ödevi Silinecektir Onaylıyor musunuz?"
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if (d){
        this.apiServis.KayitSil(kayit.kayitId).subscribe((s:any | Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.KayitListele();
          }
        });
      }
    });
  }
}
