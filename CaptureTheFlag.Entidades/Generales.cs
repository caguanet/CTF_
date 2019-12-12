using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Net;
using System.Reflection;
using System.ServiceModel;

namespace CaptureTheFlag.Entidades
{

    public enum TypeStyleNoty : byte
    {
        alert,
        info,
        success,
        warning,
        error,
    }

    public class StatusMessage
    {
        public TypeStyleNoty TypeStyle { get; set; }

        public string Titulo { get; set; }

        public string Mensaje { get; set; }
    }
    public class JsonResultCTF
    {
        public JsonResultCTF()
        {
            this.EstatusCode = 0; this.StatusMessage = new StatusMessage() { Mensaje = "Mensaje", Titulo = "Nuevo mensaje" }; this.Json = null;
        }

        public Object Json { get; set; }
        public StatusMessage StatusMessage { get; set; }
        public Int16 EstatusCode { get; set; }
    }


    public static class InterOperabilidad
    {
        public static RestClient Cliente(string ParametrosUrl = "")
        {

            try
            {
                return new RestClient($"{System.Configuration.ConfigurationManager.AppSettings["UrlBase"].ToString()}{ParametrosUrl }"); ;
            }
            catch (Exception ex) { throw new FaultException<CTFExcepcion>(new CTFExcepcion(Assembly.GetCallingAssembly().GetName().Name, "InterOperabilidad", MethodBase.GetCurrentMethod().Name, ex.Message, false)); }
        }
        public static string RestResponse(IRestResponse response, string nombreObjeto = "")
        {
            try
            {
                int corcheabrir = -1;
                string subjson;
                JObject joResponse;

                switch (response.StatusCode)
                {
                    case HttpStatusCode.Created:
                    case HttpStatusCode.OK:
                    case HttpStatusCode.Accepted:
                        if (response.Content.IndexOf("[") == 0)
                        {
                            return JsonConvert.SerializeObject(response.Content);
                        }
                        else
                        {
                            corcheabrir = response.Content.IndexOf("{");
                            if (corcheabrir < 0)
                            {
                                return JsonConvert.SerializeObject(response.Content);
                            }
                            subjson = response.Content.Substring(corcheabrir);
                            joResponse = JObject.Parse(subjson);
                            if (string.IsNullOrWhiteSpace(nombreObjeto))
                                return JsonConvert.SerializeObject(joResponse);
                            else
                                return joResponse[nombreObjeto].ToString();
                        }

                    case HttpStatusCode.Found:
                        corcheabrir = response.Content.IndexOf("{");
                        subjson = response.Content.Substring(corcheabrir);
                        joResponse = JObject.Parse(subjson);
                        throw new FaultException<CTFExcepcion>(new CTFExcepcion(Assembly.GetCallingAssembly().GetName().Name, "InterOperabilidad", MethodBase.GetCurrentMethod().Name, joResponse["message"].ToString(), false));

                    case HttpStatusCode.Unauthorized:
                        throw new FaultException<CTFExcepcion>(new CTFExcepcion(Assembly.GetCallingAssembly().GetName().Name, "InterOperabilidad", MethodBase.GetCurrentMethod().Name, response.ErrorMessage, false));

                    case HttpStatusCode.BadRequest:
                        throw new FaultException<CTFExcepcion>(new CTFExcepcion(Assembly.GetCallingAssembly().GetName().Name, "InterOperabilidad", MethodBase.GetCurrentMethod().Name, response.ErrorMessage, false));
                    case HttpStatusCode.InternalServerError:
                        throw new FaultException<CTFExcepcion>(new CTFExcepcion(Assembly.GetCallingAssembly().GetName().Name, "InterOperabilidad", MethodBase.GetCurrentMethod().Name, "Problemas con el servidor", false));

                }

                return null;
            }
            catch (FaultException<CTFExcepcion> ex) { throw ex; }
            catch (Exception ex) { throw new FaultException<CTFExcepcion>(new CTFExcepcion(Assembly.GetCallingAssembly().GetName().Name, "InterOperabilidad", MethodBase.GetCurrentMethod().Name, ex.Message, false)); }
        }


    }
}