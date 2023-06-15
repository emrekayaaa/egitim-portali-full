import { Kayit } from './../models/kayit';
import { Odevler } from './../models/Odevler';
import { Ogrenciler } from './../models/Ogrenciler';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl="http://localhost:64066/api/";
constructor(
  public http:HttpClient
) { }

  OgrencilerListe(){
    return this.http.get(this.apiUrl+"ogrencilerliste");
  }
  OgrencilerById(ogrId:string){
    return this.http.get(this.apiUrl+"ogrencilerbyId/" + ogrId);
  }
  OgrenciEkle(ogr:Ogrenciler){
    return this.http.post(this.apiUrl+"ogrenciekle", ogr);
  }
  OgrenciDuzenle(ogr:Ogrenciler){
    return this.http.put(this.apiUrl+"ogrenciduzenle", ogr);
  }
  OgrenciSil(ogrId:string){
    return this.http.delete(this.apiUrl+"ogrencisil/" + ogrId);
  }

 
  OdevlerListe(){
    return this.http.get(this.apiUrl+"odevlerliste");
  }
  OdevById(odevId:string){
    return this.http.get(this.apiUrl+"odevlerbyid/" + odevId);
  }
  OdevEkle(odev : Odevler){
    return this.http.post(this.apiUrl+"odevekle", odev);
  }
  OdevDuzenle(odev : Odevler){
    return this.http.put(this.apiUrl+"odevduzenle", odev);
  }
  OdevSil(odevId:string){
    return this.http.delete(this.apiUrl+"odevsil/" + odevId);
  }

  
  OgrenciOdevListe(OgrId : string){
    return this.http.get(this.apiUrl+"ogrenciodevliste/" + OgrId);
  }
  OdevOgrenciListe(odevId : string){
    return this.http.get(this.apiUrl+"odevogrenciliste/" + odevId);
  }
  KayitEkle(kayit : Kayit){
    return this.http.post(this.apiUrl+"kayitekle", kayit);
  }
  KayitSil(kayitId:string){
    return this.http.delete(this.apiUrl+"kayitsil/" + kayitId);
  }

}
