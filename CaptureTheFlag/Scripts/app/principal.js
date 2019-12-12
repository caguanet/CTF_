new Vue({
    el: "#app",
    data() {
        return {
            findName: '',
            retos: [],
            search: "",
            topDiez: [],
            topDiezTemp: []

        };
    },
    mounted: function () {
        this.obtenerRetos();
        this.obtenerTopDiez();
        //var _this = this;
        //_this.client = _this.$root.getClient();

        //_this.client.on('recibe', (res) => {
        //    console.log("sensores recibidos");
        //    if (_this.sensores !== res) {
        //        console.log(res);
        //        _this.sensores = res;

        //    }
        //});

        //_this.client.emit('list', '');

    },
    computed: {
        filteredNames() {
            let filter = new RegExp(this.findName, 'i');
            return this.retos.filter(el => el.reto.nombre.match(filter) || el.reto.categoria.nombre.match(filter) || el.reto.nivelReto.nombre.match(filter) || el.reto.usuario.username.match(filter) || el.reto.usuario.usuarioNombres.match(filter) || el.reto.puntaje.toString().match(filter));
        }
    },
    methods: {
        enviarBandera: function (idReto) {
            if ($(`#frmFlag${idReto}`).valid()) {

                try {
                    let objUsuario = JSON.parse(localStorage.getItem("U"));
                    let bandera = $(`#txtbandera${idReto}`).val();
                    Master.Utilidades.AplicationRequest.RequestFile("api/v1/reto", `GlYsUZOhOak2/${idReto}/${objUsuario.id}?bandera=${bandera}`, {}, "POST", (res) => {
                        try {
                            if (res) {

                                if (res.Json === "true") {
                                    Utilities.Notification.Toastr(res.StatusMessage.Mensaje, res.StatusMessage.Titulo, Obj.Resources.ToastType.Success, Obj.Resources.ToastPosition.Top_Right);
                                    $(`#frmFlag${idReto}`)[0].reset();
                                    this.obtenerRetos();

                                } else {
                                    Utilities.Notification.Toastr(res.StatusMessage.Mensaje, res.StatusMessage.Titulo, Obj.Resources.ToastType.Information, Obj.Resources.ToastPosition.Top_Right);

                                }
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
        obtenerRetos: function () {
            Master.Utilidades.ActivarDesactivarLoading(true);
            let objUsuario = JSON.parse(localStorage.getItem("U"));

            Master.Utilidades.AplicationRequest.RequestJson("api/v1/reto", `1MfQ68eKWXxr/${objUsuario ? objUsuario.id : 0}`, {}, "GET", (res) => {
                try {
                    if (res) {
                        let list = JSON.parse(res.Json).map(function (reto) {
                            reto.usuarioActual = JSON.parse(localStorage.getItem("U"));
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
        obtenerTopDiez: function () {
            try {
                Master.Utilidades.ActivarDesactivarLoading(true);

                Master.Utilidades.AplicationRequest.RequestFile("api/v1/reto", 'ROfFBwG6IDUA', {}, "POST", (res) => {
                    try {
                        if (res) {
                            let list = JSON.parse(res.Json).map(function (reto) {
                                reto.editing = false;
                                return reto;
                            });
                            this.topDiez = list;
                            Master.Utilidades.ActivarDesactivarLoading(false);
                        }
                    } catch (ex) {
                        Master.Utilidades.ActivarDesactivarLoading(false);
                        Utilities.HandledError(ex, Obj.Resources.ShowBy.MessageBox);
                    }
                    Master.Utilidades.ActivarDesactivarLoading(false);
                }, Utilities.OnError, undefined);

                var url = 'ws://' + Utilities.GetPathRaizSinProtocol() + "HadSocket.ashx";


                var ws = new WebSocket(url);


                ws.onopen = function (e) {
                    console.log("Se conecto websocket: ");
                };
                var vm = this;
                ws.onmessage = function (e) {
                    console.log("Se recibe Mensage: ");
                    vm.topDiez = [];
                    JSON.parse(JSON.parse(e.data)).forEach(function (reto) {
                        reto.editing = false;
                        vm.topDiez.push(reto);
                    });

                };

                ws.onclose = function () {
                    console.log("Se cerró websocket: ");
                };

                ws.onerror = function (e) {
                    console.log("Error en websocket: " + e);
                };

            } catch (e) {
                console.log(e);
            }
        }

    }
});
$(document).ready(function () {
    //#region Variables
    var _context = { name: "Retos", description: "Controlador para la página que realiza la solución de un reto" };
    var _resources = Obj.Resources;
    var _ajaxRequest = Obj.gabrielaRequest;

    // #endregion
    var App = {
        initApp: () => {
            App.Utilidades.ValidarFormulario();
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
