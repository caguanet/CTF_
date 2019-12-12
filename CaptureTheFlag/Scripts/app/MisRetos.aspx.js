$(document).ready(function () {
    //#region Variables
    var _context = { name: "Retos", description: "Controlador para la página que realiza el registro y busqueda de retos" };
    var _resources = Obj.Resources;
    var _ajaxRequest = Obj.gabrielaRequest;

    // #endregion
    var App = {
        initApp: () => {
            App.ConstruirComponentesIniciales();
            App.CargarComponentesIniciales();
            //App.Utilidades.ValidarFormulario();
            App.CargarAccionesBotones();
        },
        ConstruirComponentesIniciales: () => {
            App.Componentes.CboCategoriaReto();
            App.Componentes.CboNivelReto();
            App.Componentes.TxtIntentosReto();
            App.Componentes.TxtPuntajeReto();
        },
        CargarAccionesBotones: async () => {
            try {
                //$('[id$=btnGuardar]').on('click', function () {
                //    if (validatorFormulario.form()) {
                //        Master.Utilidades.ActivarDesactivarLoading(true);
                //        App.Controlador.CrearReto();

                //    }
                //});
                $('.custom-file-input').on('change', function () {
                    let fileName = $(this).val().split('\\').pop();
                    $(this).next('.custom-file-label').addClass("selected").html(fileName);
                });
            } catch (e) {
                Master.Utilidades.ActivarDesactivarLoading(false);
                Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
            }
            // Botón Crear usuario
        },
        CargarComponentesIniciales: () => {
            App.CargarDataComponentes.CboCategoriaReto();
            App.CargarDataComponentes.CboNivelReto();
        },
        CargarDataComponentes: {
            CboCategoriaReto: async (item = null) => {
                try {
                    let dataset = await App.Controlador.Categoria();
                    Utilities.CargarChosen($('[id$=cboCategoriaReto]'), typeof dataset === "undefined" || dataset === null ? [] : dataset, "nombre", "id", item);
                } catch (ex) {
                    Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
                }
            },
            CboNivelReto: async (item = null) => {
                try {
                    let dataset = await App.Controlador.NivelReto();
                    Utilities.CargarChosen($('[id$=cboNivelReto]'), typeof dataset === "undefined" || dataset === null ? [] : dataset, "nombre", "id", item);
                } catch (ex) {
                    Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
                }
            },
        },
        Controlador: {
            Categoria: () => {
                return new Promise(resolve => {
                    try {
                        var parametros = {};
                        _ajaxRequest("wA6ImikH7uVR", parametros, function (res) {
                            try {
                                resolve(res);
                            } catch (ex) {
                                Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
                            }
                        }, Utilities.OnError);
                    } catch (ex) {
                        Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
                    }
                });
            },
            NivelReto: () => {
                return new Promise(resolve => {
                    try {
                        var parametros = { IdUniversidad: 1 };
                        _ajaxRequest("DRnra3IE7jBu", parametros, function (res) {
                            try {
                                resolve(res);
                            } catch (ex) {
                                Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
                            }
                        }, Utilities.OnError);
                    } catch (ex) {
                        Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
                    }
                });
            },
            ActualizarReto: (Reto) => {
                toastr.clear();
                try {
                    const formData = new FormData();
                    let parametros = App.Modelo.Reto();
                    if (document.querySelector('#fileArchivo').files.length > 0) {
                        formData.append('file', $('#fileArchivo')[0].files[0], document.querySelector('#fileArchivo').files[0].name);
                    }
                    parametros = JSON.stringify(parametros);
                    parametros.id = Reto.id;
                    formData.append('objReto', parametros);
                    Master.Utilidades.AplicationRequest.RequestFile("api/v1/reto", "432eJuTZ7IK4", formData, "PUT", (res) => {
                        try {
                            if (res) {
                                Utilities.Notification.Toastr("Haz actualizado el reto con exito.", "Actualizacion", _resources.ToastType.Success, Obj.Resources.ToastPosition.Top_Right);
                                $("#frmRetos")[0].reset();
                                Master.ToolAplication.InicializarComponentes("#frmRetos");
                                $('#txtNombreReto').focus();
                            }
                        } catch (ex) {
                            Master.Utilidades.ActivarDesactivarLoading(false);
                            Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
                        }
                        Master.Utilidades.ActivarDesactivarLoading(false);
                    }, Utilities.OnError, undefined);
                } catch (ex) {
                    Master.Utilidades.ActivarDesactivarLoading(false);
                    Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
                }
            },
            CrearReto: () => {
                toastr.clear();
                try {
                    const formData = new FormData();
                    let parametros = App.Modelo.Reto();
                    if (document.querySelector('#fileArchivo').files.length > 0) {
                        formData.append('file', $('#fileArchivo')[0].files[0], document.querySelector('#fileArchivo').files[0].name);
                    }
                    parametros = JSON.stringify(parametros);
                    formData.append('objReto', parametros);
                    Master.Utilidades.AplicationRequest.RequestFile("api/v1/reto", "LPmmeC3HXndH", formData, "POST", (res) => {
                        try {
                            if (res) {
                                Utilities.Notification.Toastr("Haz creado un nuevo reto.", "Felicidades:", _resources.ToastType.Success, Obj.Resources.ToastPosition.Top_Right);
                                $("#frmRetos")[0].reset();
                                Master.ToolAplication.InicializarComponentes("#frmRetos");
                                $('#txtNombreReto').focus();
                            }
                        } catch (ex) {
                            Master.Utilidades.ActivarDesactivarLoading(false);
                            Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
                        }
                        Master.Utilidades.ActivarDesactivarLoading(false);
                    }, Utilities.OnError, undefined);
                } catch (ex) {
                    Master.Utilidades.ActivarDesactivarLoading(false);
                    Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
                }
            }
        },
        Componentes: {
            CboCategoriaReto: () => {
                if ($('[id$=cboCategoriaReto]')) {
                    $('[id$=cboCategoriaReto]').chosen({
                        no_results_text: "Vaya, ¡nada encontrado!",
                        placeholder_text_single: "Seleccione una categoria",
                        search_contains: true,
                        width: "100%"
                    });
                } else {
                    throw new FaultException(_context, _nameFn, "Se presentó una inconsistencia en la construcción del formulario.", _resources.danger, true);
                }
            },
            CboNivelReto: () => {
                if ($('[id$=cboNivelReto]')) {
                    $('[id$=cboNivelReto]').chosen({
                        no_results_text: "Vaya, ¡nada encontrado!",
                        placeholder_text_single: "Seleccione un nivel",
                        search_contains: true,
                        width: "100%"
                    });
                } else {
                    throw new FaultException(_context, _nameFn, "Se presentó una inconsistencia en la construcción del formulario.", _resources.danger, true);
                }
            },
            TxtIntentosReto: () => {
                if ($('[id$=txtIntentosReto]')) {
                    $("[id$=txtIntentosReto]").ionRangeSlider({
                        type: "single",
                        min: 0,
                        max: 10,
                        grid: true,
                        grid_snap: true
                    });
                } else {
                    throw new FaultException(_context, _nameFn, "Se presentó una inconsistencia en la construcción del formulario.", _resources.danger, true);
                }
            },
            TxtPuntajeReto: () => {
                if ($('[id$=txtPuntajeReto]')) {
                    $("[id$=txtPuntajeReto]").ionRangeSlider({
                        type: "single",
                        min: 0,
                        max: 100,
                        grid: true,
                        grid_snap: true
                    });
                } else {
                    throw new FaultException(_context, _nameFn, "Se presentó una inconsistencia en la construcción del formulario.", _resources.danger, true);
                }
            },
            FileAchivo: () => {
                if ($('.fileinput')) {
                    $("[id$=fileArchivo]").fileinput();
                } else {
                    throw new FaultException(_context, _nameFn, "Se presentó una inconsistencia en la construcción del formulario.", _resources.danger, true);
                }
            },
        },
        Modelo: {
            Reto: () => {
                try {
                    return {
                        nombre: $('[id$=txtNombreReto]').val(),
                        descripcion: $('[id$=txtDescripcionReto]').val(),
                        urlAdjunto: document.querySelector('#fileArchivo').files.length > 0 ? document.querySelector('#fileArchivo').files[0].name : "",
                        puntaje: $('[id$=txtPuntajeReto]').val(),
                        intento: $('[id$=txtIntentosReto]').val(),
                        publico: $('[id$=chkRetoPublico]').is(':checked'),
                        activo: $('[id$=chkEstado]').is(':checked'),
                        bandera: $('[id$=txtBanderaReto]').val(),
                        nivelReto: {
                            id: $('[id$=cboNivelReto]').val(),
                            tipo: $('[id$=cboNivelReto]').text()
                        },
                        categoria: {
                            id: $('[id$=cboCategoriaReto]').val(),
                            tipo: $('[id$=cboCategoriaReto]').text()
                        },
                        usuario: JSON.parse(localStorage.getItem("U"))
                    };
                } catch (ex) {
                    Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
                }
            },
            Usuario: () => {
                try {
                    return JSON.parse(localStorage.getItem("U"));
                } catch (ex) {
                    Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
                }
            },
        },
        Utilidades: {
            //#region validacion
            ValidarFormulario: () => {
                validatorFormulario = $('#frmRetos').validate({
                    debug: true,
                    rules: {
                    },
                    highlight: function (element, errorClass, validClass) {
                        if ($(element).hasClass('select2-hidden-accessible')) {
                            $(element).first().parent().addClass('has-error');
                        } if ($(element).is('.required.chosen-select')) {
                            $(element).siblings(".chosen-container").addClass('has-error');
                        } else {
                            $(element).closest('.form-group').addClass('has-error');
                        }
                    },
                    unhighlight: function (element) {
                        if ($(element).hasClass('select2-hidden-accessible')) {
                            $(element).first().parent().removeClass('has-error');
                        } if ($(element).is('.required.chosen-select')) {
                            $(element).siblings(".chosen-container").removeClass('has-error');
                        } else {
                            $(element).closest('.form-group').removeClass('has-error');
                        }
                    },
                    errorElement: 'span',
                    errorClass: 'help-block',
                    errorPlacement: function (error, element) {
                        if (element.hasClass('select2-hidden-accessible')) {
                            error.insertAfter(element.next('span'));
                        } else if ($(element).is('.required.chosen-select')) {
                            error.insertAfter($(element).siblings('.chosen-container'));
                        } else if (element.parent('.input-group').length) {
                            error.insertAfter(element.parent());
                        } else {
                            error.insertAfter(element);
                        }
                    },
                    ignore: ".ignore, :hidden:not(.chosen-select)",

                    onfocusout: function (element) {
                        $(element).valid();
                    }
                });
                // validacion de chosen on change
                if ($("select.chosen-select").length > 0) {
                    $("select.chosen-select").each(function () {
                        if ($(this).attr('aria-required') !== undefined && $(this).attr('aria-required') === "true") {
                            $(this).on("change", function () {
                                $(this).valid();
                            });
                        }
                    });
                }
            }
        }
    };

    App.initApp();
});
new Vue({
    el: "#app",
    data: {
        retos: [],
        reto: {
            id: 0,
            nombre: "",
            descripcion: "",
            urlAdjunto: "",
            puntaje: 0,
            intento: 0,
            publico: false,
            activo: false,
            bandera: "",
            nivelReto: {
                id: 0,
                nombre: ""
            },
            categoria: {
                id: 0,
                nombre: ""
            },
            usuario: {},
            editing: false
        },
        validate: null
    },
    mounted: function () {
        this.obtenerRetos();
        this.validatorFormulario();
    },
    methods: {
        validatorFormulario: function () {
            this.validate = $('#frmRetos').validate({
                debug: true,
                highlight: function (element, errorClass, validClass) {
                    if ($(element).hasClass('select2-hidden-accessible')) {
                        $(element).first().parent().addClass('has-error');
                    } if ($(element).is('.required.chosen-select')) {
                        $(element).siblings(".chosen-container").addClass('has-error');
                    } else {
                        $(element).closest('.form-group').addClass('has-error');
                    }
                },
                unhighlight: function (element) {
                    if ($(element).hasClass('select2-hidden-accessible')) {
                        $(element).first().parent().removeClass('has-error');
                    } if ($(element).is('.required.chosen-select')) {
                        $(element).siblings(".chosen-container").removeClass('has-error');
                    } else {
                        $(element).closest('.form-group').removeClass('has-error');
                    }
                },
                errorElement: 'span',
                errorClass: 'help-block',
                errorPlacement: function (error, element) {
                    if (element.hasClass('select2-hidden-accessible')) {
                        error.insertAfter(element.next('span'));
                    } else if ($(element).is('.required.chosen-select')) {
                        error.insertAfter($(element).siblings('.chosen-container'));
                    } else if (element.parent('.input-group').length) {
                        error.insertAfter(element.parent());
                    } else {
                        error.insertAfter(element);
                    }
                },
                ignore: ".ignore, :hidden:not(.chosen-select)",

                onfocusout: function (element) {
                    $(element).valid();
                }
            });
        },
        crearReto: function (objReto) {
            try {
                if (this.validate.form()) {
                    try {
                        toastr.clear();
                        if (document.querySelector('#fileArchivo').files.length > 0) {
                            if (document.querySelector('#fileArchivo').files[0].size > 104857600) {
                                Utilities.Notification.Toastr("El tamaño supera el limite de 10 MB permitido!.", "Archivo:", Obj.Resources.ToastType.Warning, Obj.Resources.ToastPosition.Top_Right);
                                return;
                            }
                        }

                        Master.Utilidades.ActivarDesactivarLoading(true);

                        const formData = new FormData();
                        let parametros = {
                            nombre: $('[id$=txtNombreReto]').val(),
                            descripcion: $('[id$=txtDescripcionReto]').val(),
                            urlAdjunto: document.querySelector('#fileArchivo').files.length > 0 ? document.querySelector('#fileArchivo').files[0].name : "",
                            puntaje: $("#txtPuntajeReto").data("ionRangeSlider").result.from,
                            intento: $("#txtIntentosReto").data("ionRangeSlider").result.from,
                            publico: $('[id$=chkRetoPublico]').is(':checked'),
                            activo: $('[id$=chkEstado]').is(':checked'),
                            bandera: $('[id$=txtBanderaReto]').val(),
                            nivelReto: {
                                id: $('[id$=cboNivelReto]').val(),
                                tipo: $('[id$=cboNivelReto]').text()
                            },
                            categoria: {
                                id: $('[id$=cboCategoriaReto]').val(),
                                tipo: $('[id$=cboCategoriaReto]').text()
                            },
                            usuario: JSON.parse(localStorage.getItem("U"))
                        };
                        if (document.querySelector('#fileArchivo').files.length > 0) {
                            formData.append('file', $('#fileArchivo')[0].files[0], document.querySelector('#fileArchivo').files[0].name);
                        }
                        parametros = JSON.stringify(parametros);
                        formData.append('objReto', parametros);
                        Master.Utilidades.AplicationRequest.RequestFile("api/v1/reto", "LPmmeC3HXndH", formData, "POST", (res) => {
                            try {
                                if (res) {
                                    Utilities.Notification.Toastr("Haz creado un nuevo reto.", "Felicidades:", Obj.Resources.ToastType.Success, Obj.Resources.ToastPosition.Top_Right);
                                    $("#frmRetos")[0].reset();
                                    $("#chkRetoPublico").prop('checked', false).iCheck('update');
                                    $("#chkEstado").prop('checked', false).iCheck('update');
                                    $("#txtPuntajeReto").data("ionRangeSlider").update({ from: 0 });
                                    $("#txtIntentosReto").data("ionRangeSlider").update({ from: 0 });
                                    $('#cboCategoriaReto').val(null).trigger("chosen:updated");
                                    $('#cboNivelReto').val(null).trigger("chosen:updated");
                                    $('#txtNombreReto').focus();

                                    this.reto = {
                                        id: 0,
                                        nombre: "",
                                        descripcion: "",
                                        urlAdjunto: "",
                                        puntaje: 0,
                                        intento: 0,
                                        publico: false,
                                        activo: false,
                                        bandera: "",
                                        nivelReto: {
                                            id: 0,
                                            nombre: ""
                                        },
                                        categoria: {
                                            id: 0,
                                            nombre: ""
                                        },
                                        usuario: {},
                                        editing: false
                                    };
                                    this.obtenerRetos();
                                }
                            } catch (ex) {
                                Master.Utilidades.ActivarDesactivarLoading(false);
                                Utilities.HandledError(ex, Obj.Resources.ShowBy.MessageBox);
                            }
                            Master.Utilidades.ActivarDesactivarLoading(false);
                        }, Utilities.OnError, undefined);
                    } catch (ex) {
                        Master.Utilidades.ActivarDesactivarLoading(false);
                        Utilities.HandledError(ex, Obj.Resources.ShowBy.MessageBox);
                    }

                }
            } catch (e) {
                console.log(e);
            }
        },
        actualizarReto: function (objReto) {
            if (this.validate.form()) {
                try {
                    toastr.clear();

                    if (document.querySelector('#fileArchivo').files.length > 0) {
                        if (document.querySelector('#fileArchivo').files[0].size > 104857600) {
                            Utilities.Notification.Toastr("El tamaño supera el limite de 10 MB permitido!.", "Archivo:", Obj.Resources.ToastType.Warning, Obj.Resources.ToastPosition.Top_Right);
                            return;
                        }
                    }
                    Master.Utilidades.ActivarDesactivarLoading(true);

                    const formData = new FormData();
                    let parametros = {
                        id: objReto.id,
                        nombre: $('[id$=txtNombreReto]').val(),
                        descripcion: $('[id$=txtDescripcionReto]').val(),
                        urlAdjunto: document.querySelector('#fileArchivo').files.length > 0 ? document.querySelector('#fileArchivo').files[0].name : "",
                        puntaje: $("#txtPuntajeReto").data("ionRangeSlider").result.from,
                        intento: $("#txtIntentosReto").data("ionRangeSlider").result.from,
                        publico: $('[id$=chkRetoPublico]').is(':checked'),
                        activo: $('[id$=chkEstado]').is(':checked'),
                        bandera: $('[id$=txtBanderaReto]').val(),
                        nivelReto: {
                            id: $('[id$=cboNivelReto]').val(),
                            tipo: $('[id$=cboNivelReto]').text()
                        },
                        categoria: {
                            id: $('[id$=cboCategoriaReto]').val(),
                            tipo: $('[id$=cboCategoriaReto]').text()
                        },
                        usuario: JSON.parse(localStorage.getItem("U"))
                    };
                    if (document.querySelector('#fileArchivo').files.length > 0) {
                        formData.append('file', $('#fileArchivo')[0].files[0], document.querySelector('#fileArchivo').files[0].name);
                    }
                    parametros = JSON.stringify(parametros);
                    formData.append('objReto', parametros);
                    Master.Utilidades.AplicationRequest.RequestFile("api/v1/reto", "432eJuTZ7IK4", formData, "PUT", (res) => {
                        try {
                            if (res) {
                                Utilities.Notification.Toastr(res.StatusMessage.Mensaje, res.StatusMessage.Titulo, Obj.Resources.ToastType.Success, Obj.Resources.ToastPosition.Top_Right);
                                $("#frmRetos")[0].reset();
                                $("#chkRetoPublico").prop('checked', false).iCheck('update');
                                $("#chkEstado").prop('checked', false).iCheck('update');
                                $("#txtPuntajeReto").data("ionRangeSlider").update({ from: 0 });
                                $("#txtIntentosReto").data("ionRangeSlider").update({ from: 0 });
                                $('#cboCategoriaReto').val(null).trigger("chosen:updated");
                                $('#cboNivelReto').val(null).trigger("chosen:updated");
                                $('#txtNombreReto').focus();

                                this.reto = {
                                    id: 0,
                                    nombre: "",
                                    descripcion: "",
                                    urlAdjunto: "",
                                    puntaje: 0,
                                    intento: 0,
                                    publico: false,
                                    activo: false,
                                    bandera: "",
                                    nivelReto: {
                                        id: 0,
                                        nombre: ""
                                    },
                                    categoria: {
                                        id: 0,
                                        nombre: ""
                                    },
                                    usuario: {},
                                    editing: false
                                };
                                this.obtenerRetos();
                            }
                        } catch (ex) {
                            Master.Utilidades.ActivarDesactivarLoading(false);
                            Utilities.HandledError(ex, Obj.Resources.ShowBy.MessageBox);
                        }
                        Master.Utilidades.ActivarDesactivarLoading(false);
                    }, Utilities.OnError, undefined);
                } catch (ex) {
                    Master.Utilidades.ActivarDesactivarLoading(false);
                    Utilities.HandledError(ex, Obj.Resources.ShowBy.MessageBox);
                }
            }
        },
        cancelarReto: function () {
            this.reto = {
                id: 0,
                nombre: "",
                descripcion: "",
                urlAdjunto: "",
                puntaje: 0,
                intento: 0,
                publico: false,
                activo: false,
                bandera: "",
                nivelReto: {
                    id: 0,
                    nombre: ""
                },
                categoria: {
                    id: 0,
                    nombre: ""
                },
                usuario: {},
                editing: false
            };
            $("#frmRetos")[0].reset();
            $("#chkRetoPublico").prop('checked', false).iCheck('update');
            $("#chkEstado").prop('checked', false).iCheck('update');
            $("#txtPuntajeReto").data("ionRangeSlider").update({ from: 0 });
            $("#txtIntentosReto").data("ionRangeSlider").update({ from: 0 });
            $('#cboCategoriaReto').val(null).trigger("chosen:updated");
            $('#cboNivelReto').val(null).trigger("chosen:updated");
        },
        obtenerRetos: function () {
            Master.Utilidades.ActivarDesactivarLoading(true);
            let objUsuario = JSON.parse(localStorage.getItem("U"));

            Master.Utilidades.AplicationRequest.RequestFile("api/v1/reto", `Mwe1vKXk3xsm/${objUsuario ? objUsuario.id : 0}`, {}, "POST", (res) => {
                try {
                    if (res) {
                        let list = JSON.parse(res.Json).map(function (reto) {
                            reto.editing = false;
                            return reto;
                        });
                        this.retos = list;
                        Master.Utilidades.ActivarDesactivarLoading(false);
                    }
                } catch (ex) {
                    Master.Utilidades.ActivarDesactivarLoading(false);
                    Utilities.HandledError(ex, Obj.Resources.ShowBy.MessageBox);
                }
                Master.Utilidades.ActivarDesactivarLoading(false);
            }, Utilities.OnError, undefined);
        },
        editarReto: function (objReto) {
            try {
                objReto.editing = true;
                this.reto = objReto;
                $('#txtNombreReto').focus().select();
                $("#chkRetoPublico").prop('checked', objReto.publico).iCheck('update');
                $("#chkEstado").prop('checked', objReto.activo).iCheck('update');
                $("#txtPuntajeReto").data("ionRangeSlider").update({ from: objReto.intento });
                $("#txtIntentosReto").data("ionRangeSlider").update({ from: objReto.puntaje });
                $('#cboCategoriaReto').val(objReto.categoria.id).trigger("chosen:updated");
                $('#cboNivelReto').val(objReto.nivelReto.id).trigger("chosen:updated");
                $('.fileinput-filename').val(objReto.urlAdjunto);
                $('#tabCrearModificar').tab('show');
            } catch (ex) {
                Utilities.HandledError(ex, Obj.Resources.ShowBy.MessageBox);
            }
        }
    }
});