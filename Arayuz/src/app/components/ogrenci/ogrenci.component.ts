import { OgrenciDialogComponent } from './../dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from './../../services/api.service';
import { Ogrenciler } from './../../models/Ogrenciler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-ogrenci',
  templateUrl: './ogrenci.component.html',
  styleUrls: ['./ogrenci.component.css']
})
export class OgrenciComponent implements OnInit {
  ogrenciler! : Ogrenciler[];
  displayedColumns=['ogrNo','ogrAdsoyad','islemler'];
  dataSource:any ;
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  dialogRef!:MatDialogRef<OgrenciDialogComponent>;
  confirmDialogRef!:MatDialogRef<ConfirmDialogComponent>;

  
  constructor(
    public apiServis : ApiService,
    public matDialog : MatDialog,
    public alert : MyAlertService
  ) { }

  ngOnInit() {
    this.OgrencilerListele();
  }
  OgrencilerListele(){
  this.apiServis.OgrencilerListe().subscribe((d :any | Ogrenciler[]) => {
    this.ogrenciler = d ;
    this.dataSource=new MatTableDataSource(this.ogrenciler);
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  });
}

Filtrele(e:any){
  var deger=e.target.value;
  this.dataSource.filter=deger.trim().toLowerCase();
   if (this.dataSource.paginator){
     this.dataSource.paginator.firstPage();
   }
}

  Ekle(){
    var yeniKayit:Ogrenciler=new Ogrenciler();
    this.dialogRef=this.matDialog.open(OgrenciDialogComponent,{
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
        this.dialogRef.afterClosed().subscribe(d =>{
          if (d){
          this.apiServis.OgrenciEkle(d).subscribe((s: any | Sonuc)=>{
            this.alert.AlertUygula(s);
            if (s.islem){
               this.OgrencilerListele();
            }
          });
        }
        });

  }

  Duzenle(kayit:Ogrenciler){
    this.dialogRef=this.matDialog.open(OgrenciDialogComponent,{
      width:'400px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d =>{
      if (d){
      kayit.ogrNo=d.ogrNo;
      kayit.ogrAdsoyad=d.ogrAdsoyad;

      this.apiServis.OgrenciDuzenle(kayit).subscribe((s: any | Sonuc) =>{
         this.alert.AlertUygula(s);
      });
    }
    });
  }

  Sil(kayit:Ogrenciler){
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent, {
      width : '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.ogrAdsoyad + " isimli öğrenci silinecektir Onaylıyor musunuz?"

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if (d){
        this.apiServis.OgrenciSil(kayit.OgrId).subscribe((s: any | Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.OgrencilerListele();
          }
        });
      }
    });
  }

}


