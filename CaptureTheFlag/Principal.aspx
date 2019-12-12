<%@ Page Title="" Language="C#" MasterPageFile="~/Sitio.Master" AutoEventWireup="true" CodeBehind="Principal.aspx.cs" Inherits="CaptureTheFlag.CTF.Principal" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>CTF+ | Principal</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row" id="app">
        <div class="col-lg-9">
            <div class="wrapper wrapper-content animated fadeInUp">
                <div class="ibox">
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="m-b-md">
                                    <h2>Desafía tus Habilidades y Conocimientos</h2>
                                </div>

                            </div>
                        </div>
                        <input placeholder="Buscar" class="form-control-sm form-control" v-model="findName" id="filtername" type="text" />
                        <small>Realiza busquedas por el nombre del creador del reto, usuario, categoria, nivel o puntaje</small>

                        <div class="faq-item" v-for="(reto, index) of filteredNames">
                            <div class="row">
                                <div class="col-md-5">
                                    <a data-toggle="collapse" v-bind:href="'#faq'+index" class="faq-question text-uppercase">{{reto.reto.nombre}}</a>
                                    <small>Creado por <strong>{{reto.reto.usuario.username}} </strong><i class="fa fa-university" aria-hidden="true"></i>{{reto.reto.usuario.carrera.universidad.nombre}}</small>
                                </div>
                                <div class="col-md-3">
                                    <span class="small font-bold">Categoria</span>
                                    <div class="tag-list">
                                        <span class="tag-item">{{reto.reto.categoria.nombre}}</span>
                                    </div>
                                </div>
                                <div class="col-md-2 text-center">
                                    <span class="small font-bold">Nivel</span>
                                    <br />
                                    {{reto.reto.nivelReto.nombre}}
                                </div>

                                <div class="col-md-2 text-center">
                                    <span class="small font-bold">Puntos</span>
                                    <br />
                                    {{reto.reto.puntaje}}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div v-bind:id="'faq'+index" class="panel-collapse collapse ">
                                        <div class="faq-answer ">
                                            <p class="text-lowercase">
                                                {{reto.reto.descripcion}}

                                            </p>
                                            <div class="text-right" v-if="reto.reto.urlAdjunto">
                                                <br />
                                                <hr>
                                                <span>
                                                    <a target="_blank" v-bind:href="'Uploads/'+reto.reto.urlAdjunto" v-bind:download="reto.reto.urlAdjunto" class="btn btn-xs btn-success"><i class="fa fa-download" aria-hidden="true"></i>Descargar</a>
                                                </span>

                                            </div>
                                            <div class="m-t-xs">
                                                <hr>
                                                <div v-if="reto.usuarioActual.id !== reto.reto.usuario.id">
                                                    <div v-if="reto.puntaje == null">
                                                        <form v-bind:id="'frmFlag'+reto.reto.id" method="post" >
                                                            <div class="form-group row">
                                                                <div class="col-sm-12">
                                                                    <div class="input-group">
                                                                        <input v-bind:id="'txtbandera'+reto.reto.id" v-on:keyup.enter="enviarBandera(reto.reto.id)" type="text" class="form-control required" placeholder="Ingresa la bandera ">
                                                                        <span class="input-group-append">
                                                                            <button class="btn btn-primary" type="button" v-on:click="enviarBandera(reto.reto.id)">
                                                                                <i class="fa fa-flag" aria-hidden="true"></i>
                                                                                Enviar Bandera !!!
                                                                            </button>
                                                                        </span>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>

                                                    </div>
                                                    <div v-else class="bg-primary p-xs b-r-sm">Ya solucionaste este reto, puntos obtenidos {{reto.puntaje}}</div>

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
        <div class="col-lg-3">
            <div class="wrapper wrapper-content project-manager">
                <div class="ibox-content">
                    <h2>CTF+ Top 10</h2>
                    <small>Nuestro top de destacados</small>
                    <ul class="todo-list m-t font-bold">
                        <li v-for="(top, index) of topDiez" v-if="top.totalPuntos > 0">
                            <span class="m-l-xs ">{{top.totalPuntos}}  {{top.usuario.username}} </span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="scritp" runat="server">
    <script src="Scripts/app/principal.js"></script>

</asp:Content>
