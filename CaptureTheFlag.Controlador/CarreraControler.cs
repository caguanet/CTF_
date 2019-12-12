using CaptureTheFlag.Entidades;
using RestSharp;
using System;
using System.Reflection;
using System.ServiceModel;

namespace CaptureTheFlag.Controlador
{
    public class CarreraControler
    {
        public string ListarCarrerasActivas(int IdUniversidad)
        {
            try
            {
                var client = InterOperabilidad.Cliente("v1/carrera/universidad/1");
                RestRequest request = new RestRequest(Method.GET);
                var response = client.Execute(request);
                return InterOperabilidad.RestResponse(response);
            }
            catch (FaultException<CTFExcepcion> ex)
            { throw ex; }
            catch (Exception ex)
            { throw new FaultException<CTFExcepcion>(new CTFExcepcion(Assembly.GetCallingAssembly().GetName().Name, this.GetType().Name, MethodBase.GetCurrentMethod().Name, ex.Message, false)); }
        }

    }
}
