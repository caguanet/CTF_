using System;

namespace CaptureTheFlag.Entidades
{
    public class Usuario
    {
        public Carrera carrera { get; set; }
        public int? id { get; set; }
        public string password { get; set; }
        public Role rol { get; set; }
        public TipoDocumento tipoDocumento { get; set; }
        public string username { get; set; }
        public string usuarioApellidos { get; set; }
        public string usuarioDireccion { get; set; }
        public string usuarioEmail { get; set; }
        public string usuarioFechaNacimiento { get; set; }
        public string usuarioIdentificacion { get; set; }
        public string usuarioMovil { get; set; }
        public string usuarioNombres { get; set; }
    }
}