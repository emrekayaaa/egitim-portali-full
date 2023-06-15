import { Odevler } from './../../../models/Odevler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-odev-dialog',
  templateUrl: './odev-dialog.component.html',
  styleUrls: ['./odev-dialog.component.css']
})
export class OdevDialogComponent implements OnInit {
  dialogBaslik!:string;
  islem!:string;
  frm!:FormGroup;
  yeniKayit!:Odevler;
   constructor(
     public matDialog : MatDialog,
     public frmBuild : FormBuilder,
     public dialogRef: MatDialogRef<OdevDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any
   ) {
     this.islem=data.islem;
     this.yeniKayit=data.kayit;
     if (this.islem=='ekle'){
       this.dialogBaslik="Ödev Ekle";
     }
     if (this.islem=='duzenle'){
       this.dialogBaslik="Ödev Düzenle";
     }
     this.frm=this.FormOlustur();
    }
 
   ngOnInit() {
   }
 
   FormOlustur(){
     return this.frmBuild.group({
       odevAdi:[this.yeniKayit.odevAdi],
     });
   }

}
