import { Odevler } from './Odevler';
import { Ogrenciler } from './Ogrenciler';
export class Kayit {
    kayitId! : string;
    kayitOgrId! : string;
    kayitOdevId! : string;
    ogrBilgi! : Ogrenciler;
    odevBilgi! : Odevler;
    
}