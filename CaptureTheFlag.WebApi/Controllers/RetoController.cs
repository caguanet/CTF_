using CaptureTheFlag.Controlador;
using CaptureTheFlag.Entidades;
using System;
using System.Net;
using System.Net.Http;
using System.ServiceModel;
using System.Web;
using System.Web.Http;

namespace CaptureTheFlag.CTF.Controllers
{
    [RoutePrefix("api/v1/reto")]
    public class RetoController : ApiController
    {
        [HttpPost]
        [Route("LPmmeC3HXndH")]
        public IHttpActionResult CargarArchivo()
        {
            JsonResultCTF respuesta = new JsonResultCTF();
            try
            {

                if (HttpContext.Current.Session["usuario"] != null)
                {
                    var request = HttpContext.Current.Request;
                    string urlAdjunto = string.Empty;
                    if (request.Files.Count > 0)
                    {
                        foreach (string strfile in request.Files)
                        {
                            var file = request.Files[strfile];
                            string extension = System.IO.Path.GetExtension(file.FileName);
                            urlAdjunto = $"{Guid.NewGuid()}.{extension}";
                            var RutaServer = HttpContext.Current.Server.MapPath(string.Format("~/Uploads/{0}", urlAdjunto));
                            file.SaveAs(RutaServer);
                        }
                    }

                    Reto objReto = new Reto
                    {
                        usuario = (Usuario)HttpContext.Current.Session["usuario"],
                        urlAdjunto = urlAdjunto
                    };

                    var obj = new RetoControler().CrearReto(objReto);

                    respuesta.EstatusCode = 200;
                    respuesta.Json = obj;
                    respuesta.StatusMessage = new StatusMessage() { Titulo = "Felicidades, ", Mensaje = "Haz creado un nuevo reto.", TypeStyle = TypeStyleNoty.success };

                    return Ok(respuesta);
                }
                else
                {
                    var msg = new HttpResponseMessage(HttpStatusCode.RequestTimeout) { ReasonPhrase = "la session expiro" };
                    throw new HttpResponseException(msg);
                }
            }
            catch (FaultException<CTFExcepcion> ex)
            {
                respuesta.EstatusCode = 418; respuesta.StatusMessage = new StatusMessage() { Mensaje = ex.Detail.Mensaje, Titulo = ex.Detail.Clase + " - " + ex.Detail.Metodo, TypeStyle = (ex.Detail.EsValidacion) ? TypeStyleNoty.info : TypeStyleNoty.warning };
            }
            catch (Exception ex)
            {
                respuesta.EstatusCode = 418; respuesta.StatusMessage = new StatusMessage() { Mensaje = ex.Message, Titulo = "", TypeStyle = TypeStyleNoty.error };
            }
            return NotFound();
        }
    }

}
