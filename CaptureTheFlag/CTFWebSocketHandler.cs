using CaptureTheFlag.Controlador;
using CaptureTheFlag.Entidades;
using Microsoft.Web.WebSockets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CaptureTheFlag.CTF
{
    public class CTFWebSocketHandler : WebSocketHandler
    {
        public static WebSocketCollection clientes = new WebSocketCollection();
        private Usuario Usuario = new Usuario();

        public override void OnOpen()
        {
            //Usuario.usuarioNombres = WebSocketContext.QueryString["name"];
            clientes.Add(this);
            OnMessage(new DestockBoardControler().ListarTopDiez());
        }

        public override void OnMessage(string message)
        {

            clientes.Broadcast(message);
        }

        public override void OnClose()
        {
            clientes.Remove(this);

        }


    }
}