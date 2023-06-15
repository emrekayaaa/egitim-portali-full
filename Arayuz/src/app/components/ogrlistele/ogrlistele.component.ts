import { OgrsecDialogComponent } from './../dialogs/ogrsec-dialog/ogrsec-dialog.component';
import { MyAlertService } from './../../services/myAlert.service';
import { Sonuc } from './../../models/Sonuc';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Kayit } from './../../models/kayit';
import { Odevler } from './../../models/Odevler';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ogrenciler } from 'src/app/models/Ogrenciler';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ogrlistele',
  templateUrl: './ogrlistele.component.html',
  styleUrls: ['./ogrlistele.component.css']
})
export class OgrlisteleComponent implements OnInit {
ogrenciler!:Ogrenciler;
odevId!:string;
secOdev!:Odevler;
kayitlar! : Kayit[];
displayedColumns=['ogrNo','ogrAdsoyad','islemler'];
dataSource:any ;
@ViewChild(MatSort) sort!:MatSort;
@ViewChild(MatPaginator) paginator!:MatPaginator;
confirmDialogRef! : MatDialogRef<ConfirmDialogComponent>;
dialogRef! : MatDialogRef<OgrsecDialogComponent>

  constructor(
    public apiServis : ApiService,
    public route : ActivatedRoute,
    public matDialog : MatDialog,
    public alert : MyAlertService

  ) { }

  ngOnInit() {
this.route.params.subscribe(p=>{
  this.odevId=p.odevId;
  this.OdevById();
  this.KayitListele();
});
  }

  KayitListele(){
    this.apiServis.OdevOgrenciListe(this.odevId).subscribe((d :any | Kayit[]) => {
      this.kayitlar = d ;
      this.dataSource=new MatTableDataSource(this.kayitlar);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }

  OdevById(){
    this.apiServis.OdevById(this.odevId).subscribe((d:any | Odevler)=>{
      this.secOdev=d;
    });
  }

  Ekle(){
    this.dialogRef=this.matDialog.open(OgrsecDialogComponent,{
      width: '500px'
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        var kayit : Kayit=new Kayit();
        kayit.kayitOgrId=d.OgrId;
        kayit.kayitOdevId=this.odevId;

        this.apiServis.KayitEkle(kayit).subscribe((s:any | Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        });
      }
    });
   }

  Sil(kayit:Kayit){
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width:"500px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.ogrBilgi.ogrAdsoyad + "isimli öğrencinciden ödev silinecektir Onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.KayitSil(kayit.kayitId).subscribe((s:any | Sonuc)=>{
           this.alert.AlertUygula(s);
           if (s.islem) {
             this.KayitListele();
           }
        });
      }
    });
  }

}
