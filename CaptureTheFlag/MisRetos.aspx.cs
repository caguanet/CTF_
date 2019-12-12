using CaptureTheFlag.Controlador;
using CaptureTheFlag.Entidades;
using Newtonsoft.Json;
using System;
using System.ServiceModel;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;

namespace CaptureTheFlag.CTF
{
    public partial class MisRetos : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region [ WebMethodo]

        #region [ Reto ]
        [WebMethod(MessageName = "Mwe1vKXk3xsm", EnableSession = true, Description = "metodo que crea un reto", BufferResponse = true)]
        public static string Reto_ListarMisAportes()
        {
            JsonResultCTF respuesta = new JsonResultCTF();

            try
            {
                var lst = new NivelRetoControler().ListarNivelReto();

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


        #region [ Nivel Reto ]
        [WebMethod(EnableSession = true, Description = "metodo que lista los niveles del reto", BufferResponse = true,
            MessageName = "DRnra3IE7jBu")]
        public static string NivelReto_Listar()
        {
            try
            {
                var lst = new NivelRetoControler().ListarNivelReto();

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

        #region [ Categoria ]
        [WebMethod(EnableSession = true, Description = "metodo que lista las categorias de un reto", BufferResponse = true,
            MessageName = "wA6ImikH7uVR")]
        public static string Categoria_Listar()
        {
            try
            {
                var lst = new CategoriaControler().ListarCategoria();
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