<%@ Page Title="" Language="C#" MasterPageFile="~/Sitio.Master" AutoEventWireup="true" CodeBehind="MisRetos.aspx.cs" Inherits="CaptureTheFlag.CTF.MisRetos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>CTF+ | Retos</title>
    <link href="Content/plugins/jasny/jasny-bootstrap.min.css" rel="stylesheet" />
    <link href="Content/plugins/ionRangeSlider/ion.rangeSlider.css" rel="stylesheet" />
    <link href="Content/plugins/ionRangeSlider/ion.rangeSlider.skinFlat.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row" id="app">
        <div class="col-lg-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title ">
                    <h5><span style="font-weight: 600;">Mis Retos</span></h5>
                    <div class="ibox-tools">
                        <a class="collapse-link">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                        <a class="fullscreen-link">
                            <i class="fa fa-expand"></i>
                        </a>
                        <a class="close-link" href="Principal.aspx">
                            <i class="fa fa-times"></i>
                        </a>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12 ">
                                <div id="panelInfoGeneral" class="row m-b-lg " style="background: #f3f3f4; border-left: 6px solid #e7eaec; border-right: 6px solid #e7eaec; border-radius: 4px; color: inherit; margin-bottom: 2px;">
                                </div>
                                <div>
                                    <div class="tabs-container">
                                        <ul class="nav nav-tabs" role="tablist">
                                            <li><a class="nav-link active show" id="tabCrearModificar" data-toggle="tab" href="#tab-1"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Crear/Modificar</a></li>
                                            <li><a class="nav-link" data-toggle="tab" href="#tab-2"><i class="fa fa-retweet" aria-hidden="true"></i>Mis Retos</a></li>
                                        </ul>
                                        <div class="tab-content">
                                            <div id="tab-1" class="tab-pane active show" role="tabpanel">
                                                <div class="panel-body">
                                                    <form id="frmRetos" method="post" class="form-horizontal">
                                                        <div class="form-group row">
                                                            <label class="col-xl-2 control-label font-bold ">Nombre</label>
                                                            <div class="col-xl-10">
                                                                <input type="text" class="form-control required clearAuto" id="txtNombreReto" name="txtNombreReto" v-model="reto.nombre" />
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-xl-2 control-label font-bold ">Descripcion</label>
                                                            <div class="col-xl-10">
                                                                <textarea class="form-control clearAuto" id="txtDescripcionReto" name="txtDescripcionReto" style="max-width: 100%; min-width: 100%;" v-model="reto.descripcion"></textarea>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-xl-2 control-label font-bold ">Archivo</label>
                                                            <div class="col-xl-10 ">

                                                                <div class="fileinput fileinput-new" data-provides="fileinput">
                                                                    <span class="btn btn-default btn-file bg-warning"><span class="fileinput-new">Seleccione un archivo</span>
                                                                        <span class="fileinput-exists ">Cambiar</span><input id="fileArchivo" class="clearAuto" name="fileArchivo" type="file" /></span>
                                                                    <span class="fileinput-filename"></span>
                                                                    <a href="#" class="close fileinput-exists" data-dismiss="fileinput" style="float: none">×</a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="form-group row">
                                                            <label class="col-xl-2 control-label font-bold ">Categoria</label>
                                                            <div class="col-xl-10">
                                                                <select class="form-control required chosen-select clearAuto" id="cboCategoriaReto" name="cboCategoriaReto" style="width: 100%;" > </select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-xl-2 control-label font-bold ">Nivel</label>
                                                            <div class="col-xl-10">
                                                                <select class="form-control required chosen-select clearAuto" id="cboNivelReto" name="cboNivelReto" style="width: 100%;"></select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-xl-2 control-label font-bold ">Puntaje</label>
                                                            <div class="col-xl-10">
                                                                <input type="number" class="form-control required clearAuto" id="txtPuntajeReto" name="txtPuntajeReto" v-model="reto.puntaje" />
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-xl-2 control-label font-bold ">Intentos</label>
                                                            <div class="col-xl-10">
                                                                <input type="number" class="form-control required clearAuto" id="txtIntentosReto" name="txtIntentosReto" v-model="reto.intento" />
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-xl-2 control-label font-bold ">Bandera</label>
                                                            <div class="col-xl-10">
                                                                <input type="text" class="form-control required clearAuto" id="txtBanderaReto" name="txtBanderaReto" v-model="reto.bandera" />
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="offset-xl-2 col-xl-10">
                                                                <div class="i-checks">
                                                                    <label>
                                                                        <input id="chkRetoPublico" name="chkRetoPublico" type="checkbox" class="clearAuto"  v-model="reto.publico"><i></i> Reto Público</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <div class="offset-xl-2 col-xl-10">
                                                                <div class="i-checks">
                                                                    <label>
                                                                        <input id="chkEstado" name="chkEstado" type="checkbox" class="clearAuto" v-model="reto.activo"><i></i> Estado Reto</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="hr-line-dashed"></div>
                                                        <div class="form-group  row">
                                                            <div class="col-md-6 offset-md-2">
                                                                <button id="btnCancelar" class="btn btn-white" type="reset" v-on:click="cancelarReto">Cancelar</button>
                                                                <button v-if="reto.id<=0" id="btnGuardar" class="btn btn-primary" type="submit" v-on:click="crearReto(reto)">Crear Reto</button>
                                                                <button v-else id="btnActualizar" class="btn btn-primary" type="submit" v-on:click="actualizarReto(reto)">Guardar Cambios</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div id="tab-2" class="tab-pane" role="tabpanel">
                                                <div class="panel-body">
                                                    <div class="row">
                                                        <div class="col-lg-12">
                                                            <div class="wrapper wrapper-content animated fadeInRight">

                                                                <div class="ibox-content m-b-sm border-bottom">
                                                                    <div class="p-xs">
                                                                        <div class="float-left m-r-md">
                                                                            <i class="fa fa-globe text-navy mid-icon"></i>
                                                                        </div>
                                                                        <h2>Mis Aportes</h2>
                                                                    </div>
                                                                </div>

                                                                <div id="divMisAportes" class="ibox-content forum-container">

                                                                    <div class="forum-item " v-for="(reto, index) of retos">
                                                                        <div class="row">
                                                                            <div class="col-md-9">
                                                                                <div class="forum-icon align-items-center">
                                                                                    <span class="views-number font-bold">{{index +1 }}  </span>
                                                                                </div>
                                                                                <a data-toggle="collapse" v-bind:href="'#faq1'+index" class="faq-question collapsed" aria-expanded="false">{{reto.nombre}}</a>
                                                                                <%--                                                                                <a class="forum-item-title">{{reto.nombre}}</a>--%>
                                                                                <div claagss="forum-sub-title">
                                                                                    <span>{{reto.categoria.descripcion}}</span>
                                                                                    <div class="row">
                                                                                        <div class="col-lg-12">
                                                                                            <div v-bind:id="'faq1'+index" class="panel-collapse collapse">
                                                                                                <div class="faq-answer">
                                                                                                    <p>
                                                                                                        {{reto.descripcion}}
                                                                                                    </p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <a target="_blank" v-if="reto.urlAdjunto" v-bind:href="'Uploads/'+reto.urlAdjunto" v-bind:download="reto.urlAdjunto" class="btn btn-xs btn-success"><i class="fa fa-download" aria-hidden="true"></i>Descargar</a>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-md-1 forum-info">
                                                                                <span class="views-number">{{reto.puntaje}}
                                                                                </span>
                                                                                <div>
                                                                                    <small>Puntaje</small>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-md-1 forum-info">
                                                                                <span class="views-number">{{reto.intento}}
                                                                                </span>
                                                                                <div>
                                                                                    <small>Intentos Permitidos</small>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-md-1 forum-info">
                                                                                <span class="font-bold" style="font-size: 1em">{{reto.nivelReto.nombre}}
                                                                                </span>
                                                                                <div>
                                                                                    <small>Nivel</small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="text-right">
                                                                            <div class="btn-group">
                                                                                <button class="btn-white btn btn-warning btn-xs" v-on:click="editarReto(reto)"><i class="fa fa-pencil"></i>Editar</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="scritp" runat="server">
    <script>
</script>
    <script src="Scripts/plugins/jasny/jasny-bootstrap.min.js"></script>
    <script src="Scripts/plugins/ionRangeSlider/ion.rangeSlider.min.js"></script>
    <script src="Scripts/app/MisRetos.aspx.js"></script>
</asp:Content>