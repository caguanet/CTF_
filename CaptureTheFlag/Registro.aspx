<%@ Page Title="" Language="C#" MasterPageFile="~/SitioLogin.Master" AutoEventWireup="true" CodeBehind="Registro.aspx.cs" Inherits="CaptureTheFlag.CTF.Registro" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>CTF | Registro Usuario</title>
    <link href="Content/plugins/datapicker/datepicker3.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="middle-box loginscreen   animated fadeInDown">
        <div>
            <div class="text-center">

                <h1 class="logo-name">CTF+</h1>
                <h3>Registrate en CTF+</h3>
                <p>Crea una cuenta para ponerte a prueba con tus habilidades y conocimientos..</p>

            </div>
            <form id="frmRegistro" class="m-t" role="form">
                <div class="form-group">
                    <input id="txtNombre" name="txtNombre" type="text" class="form-control required clearAuto" placeholder="Nombre" />
                </div>
                <div class="form-group">
                    <input id="txtApellido" name="txtApellido" type="text" class="form-control required clearAuto" placeholder="Apellido" />
                </div>
                <div class="form-group">
                    <div class="txtFechaNacimiento input-group date">
                        <input type="text" id="txtFechaNacimiento" name="txtFechaNacimiento" class="form-control required clearAuto" placeholder="Fecha Nacimiento" />
                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                    </div>
                </div>
                <div class="form-group">
                    <input id="txtEmail" name="txtEmail" type="email" class="form-control required email clearAuto" placeholder="Email" />
                </div>
                <div class="form-group">
                    <input id="txtMovil" name="txtMovil" type="tel" class="form-control required clearAuto" placeholder="Movil" />
                </div>
                <div class="form-group">
                    <input id="txtDireccion" name="txtDireccion" type="text" class="form-control clearAuto" placeholder="Direccion" />
                </div>

                <div class="form-group">
                    <select id="cboTipoDocumento" name="cboTipoDocumento" class="form-control required chosen-select clearAuto" style="width: 100%;"></select>
                </div>

                <div class="form-group">
                    <input id="txtIdentificacion" name="txtIdentificacion" type="text" class="form-control required" placeholder="Número de Identificación" />
                </div>
                <div class="form-group">
                    <select id="cboCarrera" name="cboCarrera" class="form-control required chosen-select clearAuto" style="width: 100%;"></select>
                </div>
                <div class="form-group">
                    <input id="txtNickName" name="txtNickName" type="text" class="form-control required clearAuto" placeholder="Tu nombre en CTF+" />
                </div>
                <div class="form-group">
                    <input id="txtPassWord" name="txtPassWord" type="password" class="form-control required clearAuto" placeholder="contraseña" />
                </div>
                <div class="form-group">
                    <input id="txtPassWord2" name="txtPassWord2" type="password" class="form-control required clearAuto" placeholder="Confirmar contraseña" />
                </div>
                <button id="btnGrabar" type="submit" class="btn btn-primary block full-width m-b">Registrarme !!!</button>

                <p class="text-muted text-center"><small>¿Ya tienes una cuenta?</small></p>
                <a class="btn btn-sm btn-white btn-block" href="Login.aspx">Login</a>
            </form>
            <p class="m-t"><small>Cature The Flag - CTF+ &copy; 2018</small> </p>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scritp" runat="server">
    <script src="Scripts/plugins/datapicker/datepicker.min.js"></script>
    <script src="Scripts/plugins/datapicker/datepicker.es.min.js"></script>

    <script src="Scripts/app/Registro.aspx.js"></script>
</asp:Content>
