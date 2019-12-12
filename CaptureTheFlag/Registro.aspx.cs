using CaptureTheFlag.Controlador;
using CaptureTheFlag.Entidades;
using Newtonsoft.Json;
using System;
using System.ServiceModel;
using System.Web.Services;

namespace CaptureTheFlag.CTF
{
    public partial class Registro : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        #region [ WebMethodo]
        #region [ Usuario ]
        [WebMethod(EnableSession = true, Description = "metodo que crea un usuario basico", BufferResponse = true,
            MessageName = "q0WzHJ6Ei3Xs")]
        public static JsonResultCTF Usuario_CrearBasico(Usuario objUsuario)
        {
            var respuesta = new JsonResultCTF();
            try
            {
                var obj = new UsuarioControler().CrearUsuarioBasico(objUsuario);
                respuesta.EstatusCode = 200;
                respuesta.Json = obj;
                respuesta.StatusMessage = new StatusMessage() { Mensaje = "ya haces parte de CTF+ !!!", Titulo = "Felicidades,", TypeStyle = TypeStyleNoty.success };

            }
            catch (FaultException<CTFExcepcion> ex)
            {
                respuesta.EstatusCode = 418; respuesta.StatusMessage = new StatusMessage() { Mensaje = ex.Detail.Mensaje, Titulo = ex.Detail.Clase + " - " + ex.Detail.Metodo, TypeStyle = (ex.Detail.EsValidacion) ? TypeStyleNoty.info : TypeStyleNoty.warning };
            }
            catch (Exception ex)
            {
                respuesta.EstatusCode = 418; respuesta.StatusMessage = new StatusMessage() { Mensaje = ex.Message, Titulo = "", TypeStyle = TypeStyleNoty.error };
            }
            return respuesta;
        }

        #endregion

        #region [ Tipo Documento ]
        [WebMethod(EnableSession = true, Description = "metodo que lista los tipos de documentos del usuario", BufferResponse = true,
            MessageName = "wA6ImikH7uVR")]
        public static string TipoDocumento_Listar()
        {
            try
            {
                var lst = new TipoDocumentoControler().ListarTipoDocumentoActivos();

                return JsonConvert.SerializeObject(new { status = 200, response = JsonConvert.DeserializeObject(lst), statusText = "" });

            }
            catch (FaultException<CTFExcepcion> ex)
            {
                return JsonConvert.SerializeObject(new { status = ex.Detail.EsValidacion ? 419 : 418, response = "", statusText = ex.Detail.Mensaje });
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new { status = 418, response = "", statusText = ex.Message });
            }
        }

        #endregion

        #region [ Carrera]
        [WebMethod(EnableSession = true, Description = "metodo que lista los las carreras por universidad", BufferResponse = true,
            MessageName = "09Qv0mSmvCZ1")]
        public static string Carrera_Listar(int IdUniversidad)
        {
            try
            {
                var lst = new CarreraControler().ListarCarrerasActivas(IdUniversidad);
                return JsonConvert.SerializeObject(new { status = 200, response = JsonConvert.DeserializeObject(lst), statusText = "" });

            }
            catch (FaultException<CTFExcepcion> ex)
            {
                return JsonConvert.SerializeObject(new { status = ex.Detail.EsValidacion ? 419 : 418, response = "", statusText = ex.Detail.Mensaje });
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new { status = 418, response = "", statusText = ex.Message });
            }
        }

        #endregion

        #endregion

    }

}