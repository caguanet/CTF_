using CaptureTheFlag.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CaptureTheFlag.CTF
{
    public partial class Sitio : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //if (Session["usuario"] != null)
            //{
            //    var objUsu = ((Usuario)Session["usuario"]);
                NombreUsuario.InnerText = "Leandro Garcia";
                NickName.InnerText = "Caguanet";
            //}
            //else
            //{
            //    Response.Redirect("login.aspx");
            //}
        }
    }
}