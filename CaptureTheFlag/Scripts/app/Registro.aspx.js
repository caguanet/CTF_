$(document).ready(function () {
    //#region Variables
    var _context = { name: "Registro", description: "Controlador para la página que realiza el registro de usuarios" };
    var _resources = Obj.Resources;
    var _ajaxRequest = Obj.gabrielaRequest;
    let validatorFormulario = null;
    // #endregion

    var App = {
        initApp: () => {
            App.ConstruirComponentesIniciales();
            App.CargarComponentesIniciales();
            App.Utilidades.ValidarFormulario();
            App.CargarAccionesBotones();
        },
        ConstruirComponentesIniciales: () => {
            App.Componentes.cboTipoDocumento();
            App.Componentes.CboTipoCarrera();
            App.Componentes.FechaNacimiento();
        },
        CargarAccionesBotones: () => {
            toastr.clear();
            try {
                $('[id$=btnGrabar]').on('click', function () {
                    if (validatorFormulario.form()) {
                        Master.Utilidades.ActivarDesactivarLoading(true);
                        App.Controlador.CrearUsuario();
                    }
                });

            } catch (e) {
                Master.Utilidades.ActivarDesactivarLoading(false);
                Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
            }
            // Botón Crear usuario

        },
        CargarComponentesIniciales: () => {
            App.CargarDataComponentes.CboTipoDocumento();
            App.CargarDataComponentes.CboCarrera();
        },
        CargarDataComponentes: {
            CboTipoDocumento: async (item = null) => {
                try {
                    let dataset = await App.Controlador.TipoDocumento();
                    Utilities.CargarChosen($('[id$=cboTipoDocumento]'), typeof dataset === "undefined" || dataset === null ? [] : dataset, "tipo", "id", item);
                } catch (ex) {
                    Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
                }
            },
            CboCarrera: async (item = null) => {
                try {
                    let dataset = await App.Controlador.Carrera();
                    Utilities.CargarChosen($('[id$=cboCarrera]'), typeof dataset === "undefined" || dataset === null ? [] : dataset, "nombre", "id", item);
                } catch (ex) {
                    Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
                }
            },
        },
        Controlador: {
            TipoDocumento: () => {
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
            Carrera: () => {
                return new Promise(resolve => {
                    try {
                        var parametros = { IdUniversidad: 1 };
                        _ajaxRequest("09Qv0mSmvCZ1", parametros, function (res) {
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
            CrearUsuario: () => {
                    try {
                        var parametros = App.Modelo.Usuario();
                        _ajaxRequest("q0WzHJ6Ei3Xs", { objUsuario: parametros }, function (res) {
                            try {
                                if (res) {
                                    Utilities.Notification.Toastr("ya haces parte de CTF+ !!! ,", "Felicidades, ", _resources.ToastType.Success, Obj.Resources.ToastPosition.Top_Right);
                                    $("#frmRegistro")[0].reset();
                                    Master.ToolAplication.InicializarComponentes("#frmRegistro");
                                    $('#txtNombre').focus();

                                }
                            } catch (ex) {
                                Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
                            }
                            Master.Utilidades.ActivarDesactivarLoading(false);
                        }, Utilities.OnError);
                    } catch (ex) {
                        Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
                    }
            }
        },
        Componentes: {
            cboTipoDocumento: () => {
                if ($('[id$=cboTipoDocumento]')) {
                    $('[id$=cboTipoDocumento]').chosen({
                        no_results_text: "Vaya, ¡nada encontrado!",
                        placeholder_text_single: "Seleccione un tipo de documento",
                        search_contains: true,
                        width: "100%"
                    });
                } else {
                    throw new FaultException(_context, _nameFn, "Se presentó una inconsistencia en la construcción del formulario.", _resources.danger, true);
                }
            },
            CboTipoCarrera: () => {
                if ($('[id$=cboCarrera]')) {
                    $('[id$=cboCarrera]').chosen({
                        no_results_text: "Vaya, ¡nada encontrado!",
                        placeholder_text_single: "Seleccione una carrera",
                        search_contains: true,
                        width: "100%"
                    });
                } else {
                    throw new FaultException(_context, _nameFn, "Se presentó una inconsistencia en la construcción del formulario.", _resources.danger, true);
                }
            },
            FechaNacimiento: () => {
                if ($('[id$=txtFechaNacimiento]')) {
                    $('.txtFechaNacimiento.input-group.date').datepicker({
                        weekStart: 1,
                        todayBtn: "linked",
                        language: "es",
                        locale: 'no',
                        dateFormat: 'dd/mm/yyyy',
                        autoclose: true
                    }).datepicker("update", moment().add(1, 'days').format("DD/MM/YYYY"));
                } else {
                    throw new FaultException(_context, _nameFn, "Se presentó una inconsistencia en la construcción del formulario.", _resources.danger, true);
                }
            },
        },
        Modelo: {
            Usuario: () => {
                try {
                    return {
                        tipoDocumento: {
                            id: $('[id$=cboTipoDocumento]').val(),
                            tipo: $('[id$=cboTipoDocumento]').text()
                        },
                        carrera: {
                            id: $('[id$=cboCarrera]').val(),
                            nombre: $('[id$=cboCarrera]').text()
                        },
                        usuarioIdentificacion: $('[id$=txtIdentificacion]').val(),
                        usuarioNombres: $('[id$=txtNombre]').val(),
                        usuarioApellidos: $('[id$=txtApellido]').val(),
                        usuarioFechaNacimiento: moment($("[id$=txtFechaNacimiento]")).format('X'),
                        usuarioEmail: $('[id$=txtEmail]').val(),
                        usuarioMovil: $('[id$=txtMovil]').val(),
                        usuarioDireccion: $('[id$=txtDireccion]').val(),
                        username: $('[id$=txtNickName]').val(),
                        password: $('[id$=txtPassWord]').val()
                    };

                } catch (ex) {
                    Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
                }
            },

        },
        Utilidades: {
            //#region validacion
            ValidarFormulario: () => {
                validatorFormulario = $('#frmRegistro').validate({
                    debug: true,
                    rules: {
                        txtPassWord2: {
                            equalTo: "#txtPassWord"
                        }
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
