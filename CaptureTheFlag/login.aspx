<%@ Page Title="" Language="C#" MasterPageFile="~/SitioLogin.Master" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="CaptureTheFlag.CTF.Login" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>CTF | Iniciar Sesión</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <div>
                <h1 class="logo-name">CTF+</h1>
            </div>
            <h3>Bienvenidos a CFT+</h3>
            <p>Iniciar sesión</p>
            <form class="m-t" role="form">
                <div class="form-group">
                    <div class="input-group margin-bottom-sm">
                        <span class="input-group-addon"><i class="fa fa-user fa-fw"></i></span>
                        <input id="txtUsuario" name="txtUsuario" type="text" class="form-control " placeholder="Usuario" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-key fa-fw"></i></span>
                        <input id="txtContrasena" name="txtContrasena" type="password" class="form-control " placeholder="Contraseña" />
                    </div>
                </div>
                <button id="btnlogin" type="submit" class="btn btn-primary block full-width m-b">Iniciar sesión</button>
                <p class="text-muted text-center"><small>¿No tiene una cuenta?</small></p>
                <a class="btn btn-sm btn-white btn-block" href="Registro.aspx">Crear una cuenta</a>
            </form>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scritp" runat="server">

    <script type="text/javascript" src="Scripts/app/login.aspx.js"></script>
</asp:Content>
