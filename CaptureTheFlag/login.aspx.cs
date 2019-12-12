using CaptureTheFlag.Controlador;
using CaptureTheFlag.Entidades;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.ServiceModel;
using System.Web;
using System.Web.Services;
using System.Web.UI;

namespace CaptureTheFlag.CTF
{
    public partial class Login : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region [ WebMethodo]
        #region [Usuario]
        [WebMethod(EnableSession = true, Description = "metodo que valida el acceso al sistema", BufferResponse = true,
                MessageName = "xPHz7QalQ3LM")]
        public static JsonResultCTF Usuario_ValidarXNickName(string nickName, string contrasena)
        {
            JsonResultCTF respuesta = new JsonResultCTF();

            try
            {
                var objUsuario = new UsuarioControler().ValidarUsuario(JsonConvert.SerializeObject(new { username = nickName, password = contrasena }));
                if (!string.IsNullOrWhiteSpace(objUsuario))
                {
                    HttpContext.Current.Session["usuario"] = JsonConvert.DeserializeObject<Usuario>(objUsuario);
                }
                respuesta.EstatusCode = 200;
                respuesta.Json = objUsuario;
                respuesta.StatusMessage = new StatusMessage() { Titulo = "Acceso al Sistema", Mensaje = "Bienvenido a CTF+", TypeStyle = TypeStyleNoty.success };

            }
            catch (FaultException<CTFExcepcion> ex)
            {
                respuesta.EstatusCode = 418; respuesta.StatusMessage = new StatusMessage() { Mensaje = ex.Detail.Mensaje, Titulo = ex.Detail.Clase + " - " + ex.Detail.Metodo, TypeStyle = (ex.Detail.EsValidacion) ? TypeStyleNoty.info : TypeStyleNoty.warning };

            }
            catch (Exception ex)
            {
                respuesta.EstatusCode = 418; respuesta.StatusMessage = new StatusMessage() { Mensaje ="Error No Controlado", Titulo = ex.Message, TypeStyle =  TypeStyleNoty.error };

            }
            return respuesta;
        }

        #endregion
        #endregion


    }
}