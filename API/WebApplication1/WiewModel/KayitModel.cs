using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.WiewModel
{
    public class KayitModel
    {
    
        public string kayitId { get; set; }
        public string kayitodevId { get; set; }
        public string kayitOgrId { get; set; }

        public OgrencilerModel ogrBilgi { get; set; }
        public OdevlerModel odevBilgi { get; set; }
    }
}