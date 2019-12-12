using CaptureTheFlag.Controlador;
using CaptureTheFlag.Entidades;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
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
                var request = HttpContext.Current.Request;
                string urlAdjunto = string.Empty;
                if (request.Files.Count > 0)
                {
                    foreach (string strfile in request.Files)
                    {
                        var file = request.Files[strfile];
                        string extension = System.IO.Path.GetExtension(file.FileName);
                        urlAdjunto = $"{Guid.NewGuid()}{extension}";
                        var RutaServer = HttpContext.Current.Server.MapPath(string.Format("~/Uploads/{0}", urlAdjunto));
                        file.SaveAs(RutaServer);
                    }
                }

                var objReto = JsonConvert.DeserializeObject<Reto>(request.Form["objReto"].ToString());
                objReto.urlAdjunto = urlAdjunto;

                var obj = new RetoControler().CrearReto(objReto);

                respuesta.EstatusCode = 200;
                respuesta.Json = obj;
                respuesta.StatusMessage = new StatusMessage() { Titulo = "Felicidades, ", Mensaje = "Haz creado un nuevo reto.", TypeStyle = TypeStyleNoty.success };

                return Ok(respuesta);
            }
            catch (FaultException<CTFExcepcion> ex)
            {
                respuesta.EstatusCode = 418; respuesta.StatusMessage = new StatusMessage() { Mensaje = ex.Detail.Mensaje, Titulo = ex.Detail.Clase + " - " + ex.Detail.Metodo, TypeStyle = (ex.Detail.EsValidacion) ? TypeStyleNoty.info : TypeStyleNoty.warning };
            }
            catch (Exception ex)
            {
                respuesta.EstatusCode = 418; respuesta.StatusMessage = new StatusMessage() { Mensaje = ex.Message, Titulo = "", TypeStyle = TypeStyleNoty.error };
            }
            return Ok(respuesta);
        }

        [HttpPut]
        [Route("432eJuTZ7IK4")]
        public IHttpActionResult ActualizarArchivo()
        {
            JsonResultCTF respuesta = new JsonResultCTF();
            try
            {
                var request = HttpContext.Current.Request;
                string urlAdjunto = string.Empty;
                if (request.Files.Count > 0)
                {
                    foreach (string strfile in request.Files)
                    {
                        var file = request.Files[strfile];
                        string extension = System.IO.Path.GetExtension(file.FileName);
                        urlAdjunto = $"{Guid.NewGuid()}{extension}";
                        var RutaServer = HttpContext.Current.Server.MapPath(string.Format("~/Uploads/{0}", urlAdjunto));
                        file.SaveAs(RutaServer);
                    }
                }

                var objReto = JsonConvert.DeserializeObject<Reto>(request.Form["objReto"].ToString());
                objReto.urlAdjunto = urlAdjunto;

                var obj = new RetoControler().ActualizarReto(objReto);

                respuesta.EstatusCode = 200;
                respuesta.Json = obj;
                respuesta.StatusMessage = new StatusMessage() { Titulo = "Actualización, ", Mensaje = "Se ha modificado el reto correctamente.", TypeStyle = TypeStyleNoty.success };

                return Ok(respuesta);
            }
            catch (FaultException<CTFExcepcion> ex)
            {
                respuesta.EstatusCode = 418; respuesta.StatusMessage = new StatusMessage() { Mensaje = ex.Detail.Mensaje, Titulo = ex.Detail.Clase + " - " + ex.Detail.Metodo, TypeStyle = (ex.Detail.EsValidacion) ? TypeStyleNoty.info : TypeStyleNoty.warning };
            }
            catch (Exception ex)
            {
                respuesta.EstatusCode = 418; respuesta.StatusMessage = new StatusMessage() { Mensaje = ex.Message, Titulo = "", TypeStyle = TypeStyleNoty.error };
            }
            return Ok(respuesta);
        }

        [HttpPost]
        [Route("Mwe1vKXk3xsm/{IdUsuario}")]
        public IHttpActionResult ListarMisAportes(int IdUsuario)
        {
            JsonResultCTF respuesta = new JsonResultCTF();
            try
            {

                var lst = new RetoControler().ListarMisRetos(IdUsuario);

                respuesta.EstatusCode = 200;
                respuesta.Json = JsonConvert.DeserializeObject(lst);
                respuesta.StatusMessage = new StatusMessage() { Titulo = "Felicidades, ", Mensaje = "Haz creado un nuevo reto.", TypeStyle = TypeStyleNoty.success };

                return Ok(respuesta);
            }
            catch (FaultException<CTFExcepcion> ex)
            {
                respuesta.EstatusCode = 418; respuesta.StatusMessage = new StatusMessage() { Mensaje = ex.Detail.Mensaje, Titulo = ex.Detail.Clase + " - " + ex.Detail.Metodo, TypeStyle = (ex.Detail.EsValidacion) ? TypeStyleNoty.info : TypeStyleNoty.warning };
            }
            catch (Exception ex)
            {
                respuesta.EstatusCode = 418; respuesta.StatusMessage = new StatusMessage() { Mensaje = ex.Message, Titulo = "", TypeStyle = TypeStyleNoty.error };
            }
            return Ok(respuesta);
        }

        [HttpPost]
        [Route("ROfFBwG6IDUA")]
        public IHttpActionResult ListarTopDiez()
        {
            JsonResultCTF respuesta = new JsonResultCTF();
            try
            {

                var lst = new DestockBoardControler().ListarTopDiez();

                respuesta.EstatusCode = 200;
                respuesta.Json = JsonConvert.DeserializeObject(lst);
                respuesta.StatusMessage = new StatusMessage() { Titulo = "", Mensaje = "", TypeStyle = TypeStyleNoty.success };

                return Ok(respuesta);
            }
            catch (FaultException<CTFExcepcion> ex)
            {
                respuesta.EstatusCode = 418; respuesta.StatusMessage = new StatusMessage() { Mensaje = ex.Detail.Mensaje, Titulo = ex.Detail.Clase + " - " + ex.Detail.Metodo, TypeStyle = (ex.Detail.EsValidacion) ? TypeStyleNoty.info : TypeStyleNoty.warning };
            }
            catch (Exception ex)
            {
                respuesta.EstatusCode = 418; respuesta.StatusMessage = new StatusMessage() { Mensaje = ex.Message, Titulo = "", TypeStyle = TypeStyleNoty.error };
            }
            return Ok(respuesta);
        }

        [HttpGet]
        [Route("1MfQ68eKWXxr/{IdUsuario}")]
        public IHttpActionResult ListarRetosActivos(int IdUsuario)
        {
            JsonResultCTF respuesta = new JsonResultCTF();
            try
            {

                var lst = new RetoControler().ListarRetosActivos(IdUsuario);

                respuesta.EstatusCode = 200;
                respuesta.Json = JsonConvert.DeserializeObject(lst);
                respuesta.StatusMessage = new StatusMessage() { Titulo = "Felicidades, ", Mensaje = "Haz creado un nuevo reto.", TypeStyle = TypeStyleNoty.success };

                return Ok(respuesta);
            }
            catch (FaultException<CTFExcepcion> ex)
            {
                respuesta.EstatusCode = 418; respuesta.StatusMessage = new StatusMessage() { Mensaje = ex.Detail.Mensaje, Titulo = ex.Detail.Clase + " - " + ex.Detail.Metodo, TypeStyle = (ex.Detail.EsValidacion) ? TypeStyleNoty.info : TypeStyleNoty.warning };
            }
            catch (Exception ex)
            {
                respuesta.EstatusCode = 418; respuesta.StatusMessage = new StatusMessage() { Mensaje = ex.Message, Titulo = "", TypeStyle = TypeStyleNoty.error };
            }
            return Ok(respuesta);
        }

        [HttpPost]
        [Route("GlYsUZOhOak2/{idReto}/{idUsuario}/{bandera}")]
        public IHttpActionResult EnviarBandera(int idReto, int idUsuario, string bandera)
        {
            JsonResultCTF respuesta = new JsonResultCTF();
            try
            {

                var resp = new RetoControler().EnviarBandera(idReto, idUsuario, bandera);

                respuesta.EstatusCode = 200;
                respuesta.Json = JsonConvert.DeserializeObject(resp);
                if (resp.Contains("true"))
                {
                    var lst = new DestockBoardControler().ListarTopDiez();
                    CTFWebSocketHandler.clientes.Broadcast(lst);
                    respuesta.StatusMessage = new StatusMessage() { Titulo = "Felicitaciones !!!, ", Mensaje = "Haz conquistado un reto mas.", TypeStyle = TypeStyleNoty.success };

                }
                else
                {
                    respuesta.StatusMessage = new StatusMessage() { Titulo = "No desfallezcas !!!, ", Mensaje = "Tu bandera no es la correcta.", TypeStyle = TypeStyleNoty.info };

                }

                return Ok(respuesta);
            }
            catch (FaultException<CTFExcepcion> ex)
            {
                respuesta.EstatusCode = 418; respuesta.StatusMessage = new StatusMessage() { Mensaje = ex.Detail.Mensaje, Titulo = ex.Detail.Clase + " - " + ex.Detail.Metodo, TypeStyle = (ex.Detail.EsValidacion) ? TypeStyleNoty.info : TypeStyleNoty.warning };
            }
            catch (Exception ex)
            {
                respuesta.EstatusCode = 418; respuesta.StatusMessage = new StatusMessage() { Mensaje = ex.Message, Titulo = "", TypeStyle = TypeStyleNoty.error };
            }
            return Ok(respuesta);
        }


    }

}
