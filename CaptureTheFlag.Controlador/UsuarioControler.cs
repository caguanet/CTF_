using CaptureTheFlag.Entidades;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Reflection;
using System.ServiceModel;

namespace CaptureTheFlag.Controlador
{
    public class UsuarioControler
    {
        #region [  Acciones ]
        public string CrearUsuarioBasico(Usuario objUsuario)
        {
            try
            {
                var client = InterOperabilidad.Cliente($"v1/usuario/tipoDocumento/{objUsuario.tipoDocumento.id}/carrera/{objUsuario.carrera.id}/rol/1");
                RestRequest request = new RestRequest(Method.POST);
                objUsuario.tipoDocumento.id = null;
                objUsuario.carrera.id = null;
                objUsuario.rol = new Role();
                objUsuario.rol.id = null;
                request.AddParameter("application/json", JsonConvert.SerializeObject(objUsuario), ParameterType.RequestBody);
                var response = client.Execute(request);
                return InterOperabilidad.RestResponse(response);
            }
            catch (FaultException<CTFExcepcion> ex)
            { throw ex; }
            catch (Exception ex)
            { throw new FaultException<CTFExcepcion>(new CTFExcepcion(Assembly.GetCallingAssembly().GetName().Name, this.GetType().Name, MethodBase.GetCurrentMethod().Name, ex.Message, false)); }
        }
        #endregion
        #region [  Validacion Acceso ]
        public string ValidarUsuario(string Parametros)
        {
            try
            {
                var client = InterOperabilidad.Cliente("auth/login");
                RestRequest request = new RestRequest(Method.POST);
                request.AddParameter("application/json", Parametros, ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                return InterOperabilidad.RestResponse(response,"user");
            }
            catch (FaultException<CTFExcepcion> ex)
            { throw ex; }
            catch (Exception ex)
            { throw new FaultException<CTFExcepcion>(new CTFExcepcion(Assembly.GetCallingAssembly().GetName().Name, this.GetType().Name, MethodBase.GetCurrentMethod().Name, ex.Message, false)); }
        }
        #endregion
    }
}