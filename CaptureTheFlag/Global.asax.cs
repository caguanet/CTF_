using System;
using System.Web;
using System.Web.Http;
using System.Web.Http.WebHost;
using System.Web.Routing;
using System.Web.SessionState;

namespace CaptureTheFlag.CTF
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {                   GlobalConfiguration.Configure(config =>
            {
                config.MapHttpAttributeRoutes();

                // Web API Stateless Route Configurations

            });
        }

    }
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {


        }
    }


    public class SessionableControllerHandler : HttpControllerHandler, IRequiresSessionState
    {
        public SessionableControllerHandler(RouteData routeData)
            : base(routeData)
        { }
    }

    public class SessionStateRouteHandler : IRouteHandler
    {
        IHttpHandler IRouteHandler.GetHttpHandler(RequestContext requestContext)
        {
            return new SessionableControllerHandler(requestContext.RouteData);
        }
    }
}