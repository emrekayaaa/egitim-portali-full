import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from './../../models/Sonuc';
import { Kayit } from './../../models/kayit';
import { OdevDialogComponent } from './../dialogs/odev-dialog/odev-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from './../../services/myAlert.service';
import { ApiService } from 'src/app/services/api.service';
import { Odevler } from './../../models/Odevler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-odev',
  templateUrl: './odev.component.html',
  styleUrls: ['./odev.component.css']
})
export class OdevComponent implements OnInit {
odevler!:Odevler[];
dataSource : any;
displayedColumns=['odevAdi','islemler'];
@ViewChild(MatSort) sort!:MatSort;
@ViewChild(MatPaginator) paginator!:MatPaginator;
dialogRef! : MatDialogRef<OdevDialogComponent>;
confirmDialogRef! : MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis : ApiService,
    public alert : MyAlertService,
    public matDialog : MatDialog
  ) { }

  ngOnInit() {
    this.OdevListele();
  }

  OdevListele(){
    this.apiServis.OdevlerListe().subscribe((d:any | Odevler)=>{
      this.odevler=d;
      this.dataSource=new MatTableDataSource(d);
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
    var yeniKayit:Odevler=new Odevler();
    this.dialogRef=this.matDialog.open(OdevDialogComponent,{
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.OdevEkle(d).subscribe((s:any | Sonuc)=>{
            this.alert.AlertUygula(s);
            if (s.islem){
              this.OdevListele();
            }
        });
      }
    });
  }

  Duzenle(kayit:Odevler){
    this.dialogRef=this.matDialog.open(OdevDialogComponent,{
      width:'400px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        d.odevId=kayit.odevId;
        this.apiServis.OdevDuzenle(d).subscribe((s:any | Sonuc)=>{
            this.alert.AlertUygula(s);
            if (s.islem){
              this.OdevListele();
            }
        });
      }
    });
    
  }

  Sil(kayit:Odevler){
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent, {
      width : '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.odevAdi + " isimli ödev silinecektir Onaylıyor musunuz?"
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.OdevSil(kayit.odevId).subscribe((s:any | Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.OdevListele();
          }
        });
      }
    });
  }
}
