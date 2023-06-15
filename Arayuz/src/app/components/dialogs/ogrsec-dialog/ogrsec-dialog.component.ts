import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ogrenciler } from 'src/app/models/Ogrenciler';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { OgrenciDialogComponent } from '../ogrenci-dialog/ogrenci-dialog.component';


@Component({
  selector: 'app-ogrsec-dialog',
  templateUrl: './ogrsec-dialog.component.html',
  styleUrls: ['./ogrsec-dialog.component.css']
})
export class OgrsecDialogComponent implements OnInit {
  ogrenciler! : Ogrenciler[];
  displayedColumns=['ogrNo','ogrAdsoyad','islemler'];
  dataSource:any ;
  @ViewChild(MatSort) sort!:MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  confirmDialogRef!:MatDialogRef<ConfirmDialogComponent>;

  
  constructor(
    public apiServis : ApiService,
    public matDialog : MatDialog,
    public alert : MyAlertService,
    public  dialogRef:MatDialogRef<OgrenciDialogComponent>
   
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

OgrenciSec(ogr:Ogrenciler ){
  this.dialogRef.close(ogr);
}

}
