(function (code) {
    code(window.jQuery, window, document);
}(function ($, window, document) {
    $(function () {
        //#region Variables
        var _context = { name: "login", description: "Controlador para la página de login que permite a autenticación para acceso al sistema" };
        var _resources = Obj.Resources;
        var _ajaxRequest = Obj.gabrielaRequest;

        // #endregion

        //#region DOM de los Controles Kendo
        //#region Formulario de login
        var txtUsuario = $('[id$=txtUsuario]');
        txtUsuario.focus();
        var txtContrasena = $('[id$=txtContrasena]');
        var btnlogin = $('[id$=btnlogin]');
        // #endregion
        // #endregion
        //#region Evento de Escucha

        btnlogin.on("click", function (e) {
            if (validator.form()) {
                toastr.clear();
                try {
                    Master.Utilidades.ActivarDesactivarLoading(true);
                    var parametros = { nickName: txtUsuario.val(), contrasena: txtContrasena.val() };

                    _ajaxRequest("xPHz7QalQ3LM", parametros, function (res) {
                        try {
                            if (!$.isNullOrEmpty(res)) {
                                localStorage.setItem("U", res.Json);
                                location.href = "Principal.aspx";
                            } else {

                                Master.Utilidades.ActivarDesactivarLoading(false);
                                Utilities.Notification.Toastr("El usuario o contraseña son incorrectos", "Acceso denegado: ", _resources.ToastType.Error, null);
                            }

                        } catch (ex) {
                            Master.Utilidades.ActivarDesactivarLoading(false);
                            Utilities.HandledError(ex, _resources.ShowBy.Toastr);
                        }
                    }, Utilities.OnError);
                } catch (ex) {
                    Master.Utilidades.ActivarDesactivarLoading(false);
                    Utilities.HandledError(ex, _resources.ShowBy.Toastr);
                }
            }
            //});
        });
        //#endregion

        //#region validacion
        var validator = $('form').validate({
            debug: true,
            rules: {
                txtUsuario: {
                    required: true
                },
                txtContrasena: {
                    required: true
                }
            },
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            errorElement: 'span',
            errorClass: 'help-block',
            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            }
        });
        //#endregion
    });
}));