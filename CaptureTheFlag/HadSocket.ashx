<%@ WebHandler Language="C#" Class="CaptureTheFlag.CTF.HadSocket" %>
using System.Web;
using Microsoft.Web.WebSockets;
namespace CaptureTheFlag.CTF
{
    public class HadSocket : IHttpHandler
    {
       public void ProcessRequest(HttpContext context)
        {
            if (context.IsWebSocketRequest)
                context.AcceptWebSocketRequest(new CTFWebSocketHandler());
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

    }
}
