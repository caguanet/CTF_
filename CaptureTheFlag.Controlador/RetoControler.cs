using CaptureTheFlag.Entidades;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Reflection;
using System.ServiceModel;

namespace CaptureTheFlag.Controlador
{
    public class RetoControler
    {
        #region [  Acciones ]
        public string CrearReto(Reto objReto)
        {
            try
            {

                    var client = InterOperabilidad.Cliente($"v1/reto/categoria/{objReto.categoria.id}/nivel/{objReto.nivelReto.id}/usuario/{objReto.usuario.id}");

                RestRequest request = new RestRequest(Method.POST);
                request.AddParameter("application/json", JsonConvert.SerializeObject(objReto), ParameterType.RequestBody);

                objReto.nivelReto = null;
                objReto.categoria = null;
                objReto.usuario = null;
                var response = client.Execute(request);
                return InterOperabilidad.RestResponse(response);
            }
            catch (FaultException<CTFExcepcion> ex)
            { throw ex; }
            catch (Exception ex)
            { throw new FaultException<CTFExcepcion>(new CTFExcepcion(Assembly.GetCallingAssembly().GetName().Name, this.GetType().Name, MethodBase.GetCurrentMethod().Name, ex.Message, false)); }
        }
        public string ActualizarReto(Reto objReto)
        {
            try
            {

                var client = InterOperabilidad.Cliente($"v1/reto/categoria/{objReto.categoria.id}/nivel/{objReto.nivelReto.id}/usuario/{objReto.usuario.id}");

                RestRequest request = new RestRequest(Method.PUT);
                request.AddParameter("application/json", JsonConvert.SerializeObject(objReto), ParameterType.RequestBody);

                objReto.nivelReto = null;
                objReto.categoria = null;
                objReto.usuario = null;
                var response = client.Execute(request);
                return InterOperabilidad.RestResponse(response);
            }
            catch (FaultException<CTFExcepcion> ex)
            { throw ex; }
            catch (Exception ex)
            { throw new FaultException<CTFExcepcion>(new CTFExcepcion(Assembly.GetCallingAssembly().GetName().Name, this.GetType().Name, MethodBase.GetCurrentMethod().Name, ex.Message, false)); }
        }

        public string EnviarBandera(int idReto,int idUsuario,string bandera)
        {
            try
            {

                var client = InterOperabilidad.Cliente($"v1/reto/reto/{idReto}/usuario/{idUsuario}/bandera/{bandera}");

                RestRequest request = new RestRequest(Method.POST);
                var response = client.Execute(request);
                return InterOperabilidad.RestResponse(response);
            }
            catch (FaultException<CTFExcepcion> ex)
            { throw ex; }
            catch (Exception ex)
            { throw new FaultException<CTFExcepcion>(new CTFExcepcion(Assembly.GetCallingAssembly().GetName().Name, this.GetType().Name, MethodBase.GetCurrentMethod().Name, ex.Message, false)); }
        }

        #endregion
        #region [  Consulta ]
        public string ListarMisRetos(int idUsuario)
        {
            try
            {

                var client = InterOperabilidad.Cliente($"v1/reto/list/findAll/{idUsuario}");

                RestRequest request = new RestRequest(Method.GET);

                var response = client.Execute(request);
                return InterOperabilidad.RestResponse(response);
            }
            catch (FaultException<CTFExcepcion> ex)
            { throw ex; }
            catch (Exception ex)
            { throw new FaultException<CTFExcepcion>(new CTFExcepcion(Assembly.GetCallingAssembly().GetName().Name, this.GetType().Name, MethodBase.GetCurrentMethod().Name, ex.Message, false)); }
        }
        public string ListarRetosActivos(int idUsuario)
        {
            try
            {

                var client = InterOperabilidad.Cliente($"v1/reto/list/{idUsuario}");

                RestRequest request = new RestRequest(Method.GET);

                var response = client.Execute(request);
                return InterOperabilidad.RestResponse(response);
            }
            catch (FaultException<CTFExcepcion> ex)
            { throw ex; }
            catch (Exception ex)
            { throw new FaultException<CTFExcepcion>(new CTFExcepcion(Assembly.GetCallingAssembly().GetName().Name, this.GetType().Name, MethodBase.GetCurrentMethod().Name, ex.Message, false)); }
        }

        #endregion

    }
}
