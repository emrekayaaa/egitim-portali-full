using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;
using WebApplication1.WiewModel;

namespace WebApplication1.Controllers
{
    public class ServisController : ApiController
    {
        DB04Entities db = new DB04Entities();
        SonucModel sonuc = new SonucModel();


        #region Ödevler
        [HttpGet]
        [Route("api/odevlerliste")]
        public List<OdevlerModel> OdevlerListe()
        {
            List<OdevlerModel> liste = db.Odevler.Select(x => new OdevlerModel()
            {
                odevId = x.odevId,
                odevAdi = x.odevAdi,
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/odevlerbyid/{odevId}")]

        public OdevlerModel OdevById(string OdevId)
        {
            OdevlerModel kayit = db.Odevler.Where(s => s.odevId == OdevId).Select(x => new OdevlerModel()
            {
                odevId = x.odevId,
                odevAdi = x.odevAdi,
            }).SingleOrDefault();

            return kayit;
        }

        [HttpPost]
        [Route("api/odevekle")]
        public SonucModel OdevEkle(OdevlerModel Model)
        {
            Odevler yeni = new Odevler();
            yeni.odevId = Guid.NewGuid().ToString();
            yeni.odevAdi = Model.odevAdi;
            db.Odevler.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ödev Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/odevduzenle")]
        public SonucModel OdevDuzenle(OdevlerModel Model)
        {
            Odevler kayit = db.Odevler.Where(s => s.odevId == Model.odevId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ödev Bulunamadı!";
                return sonuc;
            }

            kayit.odevAdi = Model.odevAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Ödev Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/odevsil/{odevId}")]
        public SonucModel OdevSil(string odevId)
        {
            Odevler kayit = db.Odevler.Where(s => s.odevId == odevId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ödev Bulunamadı!";
                return sonuc;
            }

            if (db.Kayit.Count(s => s.kayitodevId == odevId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ödevi Alan Öğrenci Olduğu İçin Ödev Silinemez!";
                return sonuc;
            }
            db.Odevler.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ödev Silindi!";
            return sonuc;
        }
        #endregion

        #region Ogrenciler

        [HttpGet]
        [Route("api/ogrencilerliste")]

        public List<OgrencilerModel> OgrencilerListe()
        {
            List<OgrencilerModel> liste = db.Ogrenciler.Select(x => new OgrencilerModel()
            {
                OgrId = x.OgrId,
                ogrNo = x.ogrNo,
                ogrAdsoyad = x.ogrAdsoyad,
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/ogrencilerbyId")]

        public OgrencilerModel OgrencilerById(string OgrId)
        {
            OgrencilerModel kayit = db.Ogrenciler.Where(s => s.OgrId == OgrId).Select(x => new OgrencilerModel()
            {
                OgrId = x.OgrId,
                ogrNo = x.ogrNo,
                ogrAdsoyad = x.ogrAdsoyad,
            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/ogrenciekle")]

        public SonucModel OgrenciEkle(OgrencilerModel Model)
        {
            if (db.Ogrenciler.Count(s => s.ogrNo == Model.ogrNo) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Öğrenci Numarası Kayıtlıdır!";
                return sonuc;
            }

            Ogrenciler yeni = new Ogrenciler();
            yeni.OgrId = Guid.NewGuid().ToString();
            yeni.ogrNo = Model.ogrNo;
            yeni.ogrAdsoyad = Model.ogrAdsoyad;
            db.Ogrenciler.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Öğrenci Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/ogrenciduzenle")]

        public SonucModel OgrenciDuzenle(OgrencilerModel Model)
        {
            Ogrenciler kayit = db.Ogrenciler.Where(s => s.OgrId == Model.OgrId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ögrenci Bulunamadi!";
                return sonuc;
            }

            kayit.ogrNo = Model.ogrNo;
            kayit.ogrAdsoyad = Model.ogrAdsoyad;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Öğrenci Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/ogrencisil/{OgrId}")]
        public SonucModel OgrenciSil(string OgrId)
        {
            Ogrenciler kayit = db.Ogrenciler.Where(s => s.OgrId == OgrId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Öğrenci Bulunamadı!";
                return sonuc;
            }

            if (db.Kayit.Count(s => s.kayitOgrId == OgrId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Öğrenci Ödev Aldığı İçin Öğrenci Silinemez!";
                return sonuc;
            }
            db.Ogrenciler.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Öğrenci Silindi!";
            return sonuc;
        }
        #endregion

        #region Kayit

        [HttpGet]
        [Route("api/ogrenciodevliste/{OgrId}")]
        public List<KayitModel> OgrenciOdevListe(string OgrId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitOgrId == OgrId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitOgrId = x.kayitOgrId,
                kayitodevId = x.kayitodevId,
            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.ogrBilgi = OgrencilerById(kayit.kayitOgrId);
                kayit.odevBilgi = OdevById(kayit.kayitodevId);
            }

            return liste;
        }

        [HttpGet]
        [Route("api/odevogrenciliste/{odevId}")]
        public List<KayitModel> OdevOgrenciListe(string odevId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitodevId == odevId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitOgrId = x.kayitOgrId,
                kayitodevId = x.kayitodevId,
            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.ogrBilgi = OgrencilerById(kayit.kayitOgrId);
                kayit.odevBilgi = OdevById(kayit.kayitodevId);
            }
            return liste;
        }


        [HttpPost]
        [Route("api/kayitekle")]
        public SonucModel KayitEkle(KayitModel Model)
        {
            if (db.Kayit.Count(s => s.kayitodevId == Model.kayitodevId && s.kayitOgrId == Model.kayitOgrId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Öğrenciye Ödev Verilmiştir!";
                return sonuc;
            }

            Kayit yeni = new Kayit();
            yeni.kayitId = Guid.NewGuid().ToString();
            yeni.kayitOgrId = Model.kayitOgrId;
            yeni.kayitodevId = Model.kayitodevId;

            db.Kayit.Add(yeni);
      
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Ödev Kaydı Eklendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/kayitsil/{kayitId}")]
        public SonucModel KayitSil(string kayitId)
        {
            Kayit kayit = db.Kayit.Where(s => s.kayitId == kayitId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            db.Kayit.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ödev Kaydı Silindi";
            return sonuc;
        }


        #endregion


    }
}

