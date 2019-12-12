using System.Diagnostics;
using System.Runtime.CompilerServices;
using System.Runtime.Serialization;

public class CTFExcepcion
{
    [CompilerGenerated]
    [DebuggerBrowsable(DebuggerBrowsableState.Never)]
    public bool EsValidacion { get; set; }

    public string Mensaje { get; set; }

    public string Clase { get; set; }

    public string Metodo { get; set; }

    public string Aplicacion { get; set; }

    public bool Autorizacion { get; set; }

    public CTFExcepcion(string strMensaje, bool blnEsValidacion = true)
    {
        Mensaje = strMensaje;
        EsValidacion = blnEsValidacion;
    }

    public CTFExcepcion(string strAplicacion, string strClase, string strMetodo, string strMensaje)
    {
        Mensaje = strMensaje;
        Clase = strClase;
        Metodo = strMetodo;
        Aplicacion = strAplicacion;
    }

    public CTFExcepcion(string strAplicacion, string strClase, string strMetodo, string strMensaje, bool blnEsValidacion)
    {
        Mensaje = strMensaje;
        Clase = strClase;
        Metodo = strMetodo;
        Aplicacion = strAplicacion;
        EsValidacion = blnEsValidacion;
    }

    public CTFExcepcion(string strMensaje, bool blnEsValidacion = true, bool blAutorizacion = false)
    {
        Mensaje = strMensaje;
        EsValidacion = blnEsValidacion;
        Autorizacion = blAutorizacion;
    }
}