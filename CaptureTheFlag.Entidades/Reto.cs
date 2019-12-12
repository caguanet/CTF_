using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CaptureTheFlag.Entidades
{
    public class Reto
    {
        public long? id { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public string bandera { get; set; }
        public string urlAdjunto { get; set; }
        public int puntaje { get; set; }
        public int intento { get; set; }
        public bool publico { get; set; }
        public bool activo { get; set; }
        public Usuario usuario { get; set; }
        public Categoria categoria { get; set; }
        public nivelReto nivelReto { get; set; }
    }
}
