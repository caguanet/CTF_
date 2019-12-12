//$(document).ajaxStart(function () { Pace.restart(); });
$(document).ready(function () {
    //$.fn.select2.defaults.set("theme", "bootstrap");
    kendo.culture("es-CO");
    $.isNullOrEmpty = function (args) { return (typeof args === 'undefined' || args === null || args === "" || /^\s+$/.test(args)) ? true : false; };
    $.isText = function (args) { return (!$.isNullOrEmpty(args) && /^[ A-ZÑa-zñáéíóúÁÉÍÓÚ]*$/.test(args)) ? true : false; };
    $.isAlphanumeric = function (args) { return (!$.isNullOrEmpty(args) && /^[ 0-9A-ZÑa-zñáéíóúÁÉÍÓÚ]*$/.test(args)) ? true : false; };
    $.isNumeric = function (args) { return (!$.isNullOrEmpty(args) && /^[0-9]*$/.test(args)) ? true : false; };
    $.isEmail = function (args) { return (!$.isNullOrEmpty(args) && /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(args)) ? true : false; };
    $.isCompanyName = function (args) { return (!$.isNullOrEmpty(args) && /^[ A-ZÑa-zñáéíóúÁÉÍÓÚ,.-]*$/.test(args)) ? true : false; };
    $.isAddress = function (args) { return (!$.isNullOrEmpty(args) && /^[ 0-9A-ZÑa-zñáéíóúÁÉÍÓÚ#_:,.-]*$/.test(args)) ? true : false; };
    $.fn.onEnter = function (func) {
        this.bind('keypress', function (e) {
            if (e.keyCode === 13) func.apply(this, [e]);
        });
        return this;
    };
    $.fn.selectRange = function (start, end) {
        if (!end) end = start;
        return this.each(function () {
            if (this.setSelectionRange) {
                this.focus();
                this.setSelectionRange(start, end);
            } else if (this.createTextRange) {
                var range = this.createTextRange();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', start);
                range.select();
            }
        });
    };

    //<---administrar fechas en español--->
    moment().format();
    moment.locale('es');

    String.prototype.toCapitalize = function (all) {
        /// <param name="all" type="Boolean">Indica si aplica a todas las palabras o solo para la primera de la cadena.</param>
        var str = this.trim();
        if (all) {
            return str.split(' ').map(function (e) { return e.toCapitalize(); }).join(' ');
        } else {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }
    String.prototype.getLongDateString = function () {
        /// <summary>Convierte la fecha en formato long a date.</summary>
        var s = this;
        var t = +s.substring(0, s.length - 4);
        var e = Date.UTC(1601, 0, 1);
        var dt = new Date(e + t);
        return dt;
    }
    String.format = function () {
        var s = arguments[0];
        for (var i = 0; i < arguments.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, arguments[i + 1]);
        }
        return s;
    }
    Array.prototype.clone = function () {
        /// <summary>Crea un clón (copia) del objeto.</summary>
        if ($.isPlainObject(this)) {
            return jQuery.extend(true, {}, this);
        } else if ($.isArray(this)) {
            return this.slice();
        } else {
            return null
        }
    };
});

var Obj = new Object();
// Objetos con las propiedades de los tipos de propiedades que se agregan a la clase Utilities para su control general.
Obj.Resources = {
    warning: { icon: "fa fa-exclamation-triangle", type: "warning" },
    danger: { icon: "fa fa-thumbs-o-down", type: "danger" },
    success: { icon: "fa fa-thumbs-o-up", type: "success" },
    info: { icon: "fa fa-info-circle", type: "info" },
    iconDocument: {
        pdf: "fa fa-file-pdf-o",
        doc: "fa fa-file-word-o",
        ppt: "fa fa-file-powerpoint-o",
        xsl: "fa fa-file-excel-o",
        text: "fa fa-file-text-o",
        img: "fa fa-file-image-o",
        zip: "fa fa-file-archive-o",
        file: "fa fa-file-o",
        audio: "fa fa-file-audio-o",
        video: "fa fa-file-video-o",
        code: "fa fa-file-code-o"
    },
    MessageBoxButton: {
        None: "none",
        Ok: "ok",
        OkCancel: "okcancel",
        YesNo: "yesno",
        SaveCancel: "savecancel",
        ContinueCancel: "continuecancel"
    },
    MessageBoxType: {
        None: "none",
        Load: "load",
        Warning: "warning",
        Information: "info",
        Error: "danger",
        Success: "success",
        Question: "question",
        HtmlGeneric: "html",
        Generic: "generic",
    },
    ToastType: {
        Warning: "warning",
        Information: "info",
        Error: "error",
        Success: "success",
    },
    ToastPosition: {
        Top_Right: "toast-top-right",
        Bottom_Right: "toast-bottom-right",
        Bottom_Left: "toast-bottom-left",
        Top_Left: "toast-top-left",
        Top_Full_Width: "toast-top-full-width",
        Bottom_Full_Width: "toast-bottom-full-width",
        Top_Center: "toast-top-center",
        Bottom_Center: "toast-top-center",
    },
    Control: {
        Dropdownlist: function () {
            this.type = "dropdownlist",
                this.kendoType = "kendoDropDownList",
                this.element = null,
                this.attributes = {
                    optionLabel: null,
                    filter: null,
                    dataTextField: null,
                    dataValueField: null,
                    dataSource: [],
                    suggest: false,
                    enabled: false,
                    index: 0,
                    change: null,
                }
        },
        MultiSelect: function () {
            this.type = "MultiSelect",
                this.kendoType = "kendoMultiSelect",
                this.element = null,
                this.attributes = {
                    placeholder: null,
                    filter: null,
                    autoClose: true,
                    dataTextField: null,
                    dataValueField: null,
                    dataSource: [],
                    suggest: false,
                    enabled: false,
                }
        },
        AutoComplete: function () {
            this.type = "AutoComplete",
                this.kendoType = "kendoAutoComplete",
                this.element = null,
                this.attributes = {
                    template: null,
                    minLength: 3,
                    height: 250,
                    placeholder: null,
                    filter: null,
                    select: null,
                    delay: 250,
                    dataSource:
                    {
                        serverFiltering: true,
                        serverPaging: true,
                        pageSize: 20,
                        transport:
                        {
                            read:
                            {
                                url: null,
                                data: function (option) {
                                    return { Param: option.filter.filters[0].value }
                                },
                                error: function (jqXHR, exception) {
                                    Master.Utilidades.ActivarDesactivarLoading(false);
                                    Utilities.HandledError(jqXHR, 4);
                                },
                                contentType: 'application/json; charset=utf-8',
                                type: 'POST',
                                dataType: 'json',
                            },
                            parameterMap: function (options) {
                                return kendo.stringify(options);
                            }
                        },
                        schema:
                        {
                            data: function (data) {
                                var tempo = (typeof data.d) == 'string' ? $.parseJSON(data.d).response : data.d;
                                if (tempo) {
                                    return tempo;
                                } else {
                                    return "";
                                }
                            }
                        },
                        error: function (ex) {
                            Utilities.HandledError(ex, 3);
                        },
                    },
                }
        },
        MoneyTextBox: function () {
            this.type = "moneytextbox",
                this.kendoType = "kendoNumericTextBox",
                this.element = null,
                this.attributes = {
                    format: "c",
                    spinners: true,
                    step: 0.01,
                    decimals: 2,
                    value: "",
                    min: 0,
                    max: 999999999999.99,
                    placeholder: null,
                    maxlength: null,
                }
        },
        NumericTextBox: function () {
            this.type = "numerictextbox",
                this.kendoType = "kendoNumericTextBox",
                this.element = null,
                this.attributes = {
                    spinners: false,
                    step: 1,
                    format: "0",
                    decimals: 0,
                    value: "",
                    min: 0,
                    placeholder: null,
                    maxlength: null
                }
        },
        DatePicker: function () {
            this.type = "datepicker",
                this.kendoType = "kendoDatePicker",
                this.element = null,
                this.attributes = {
                    change: null,
                    culture: "es-CO",
                    format: "dd/MM/yyyy",
                    value: "",
                    placeholder: null,
                    min: new Date(1950, 0, 1),
                    max: Date(2099, 11, 31),
                }
        },
        Grid: function () {
            this.type = "grid",
                this.kendoType = "kendoGrid",
                this.element = null,
                this.attributes = {
                    change: null,
                    sortable: true,
                    scrollable: true,
                    groupable: true,
                    selectable: "row",
                    filterable: false,
                    reorderable: true,
                    resizable: true,
                    detailTemplate: null,
                    editable: null,
                    toolbar: null,
                    dataSource: {
                        data: null,
                        pageSize: 10,
                    },
                    pageable: true,
                    columns: [],
                    edit: null,
                    save: null,
                    cancel: null,
                }
        },
        Listview: function () {
            this.type = "listview",
                this.kendoType = "kendoListView",
                this.element = null,
                this.attributes = {
                    change: null,
                    template: null,
                    altTemplate: null,
                    navigatable: true,
                    dataSource: {
                        data: null,
                        pageSize: 10,
                    },
                }
        },

        Window: function () {
            this.type = "window",
                this.kendoType = "kendoWindow",
                this.element = null,
                this.attributes = {
                    title: "",
                    modal: true,
                    visible: false,
                    resizable: false,
                    minWidth: 320,
                    maxWidth: 1100,
                    minHeight: 100,
                    pinned: true,
                    scrollable: false,
                    animation: {
                        open: false,
                        close: false
                    },
                    close: null,
                    actions: {}
                }
        },
    },
    ShowBy: {
        None: 0,
        Console: 1,
        Alert: 2,
        MessageBox: 3,
        Toastr: 4
    }
};
var Utilities = (function () {
    var _context = { name: "Utilities", description: "Controlador para los métodos Utilitarios del Aplicativo." };
    var _application = { name: "Aplicación web Gabriela Michel", description: "Aplicacion Web que permite la gestión de procesos juridicos." };
    var _resources = Obj.Resources;
    var load = $('#loader-wrapper');

    var _notification = {
        Alert: function (_message, _title, _type) {
            /// <summary>Función para crear una notificación de tipo alerta flotante.</summary>
            /// <param name="_message" type="String">Mensaje para la alerta.</param>
            /// <param name="_title" type="String" optional="true">Texto que representa un titulo que acompaña al mensaje de la alerta.</param>
            /// <param name="_type" type="Object">Objeto que debe incluir el icono y el tipo de alerta que se desea mostrar.</param>
            _nameFn = "Notification.Alert";
            try {
                if (!$.isNullOrEmpty(_message)) {
                    if ($.isPlainObject(_type) && _type.hasOwnProperty("icon") && _type.hasOwnProperty("type")) {
                        _title = (!$.isNullOrEmpty(_title)) ? "<strong>" + _title + "</strong> " : null;
                        //$.notifyClose();
                        $.notify({ icon: _type.icon, title: _title, message: _message }, {
                            element: 'body', position: null, type: _type.type, allow_dismiss: true, newest_on_top: true,
                            placement: { from: "top", align: "right" },
                            offset: 10, spacing: 10, z_index: 9000, delay: 5000, timer: 1000,
                            mouse_over: 'pause', animate: {
                                enter: 'animated bounceIn',
                                exit: 'animated bounceOut'
                            },
                            template: '<div data-notify="container" class="col-xs-11 col-md-5 alert alert-{0}" role="alert"><button type="button" class="close" aria-hidden="true" data-notify="dismiss"><i class="fa fa-times-circle"></i></button><span data-notify="icon"></span> <span data-notify="title">{1}</span><span data-notify="message">{2}</span><a data-notify="dismiss" data-notify="url"></a></div>'
                        });
                    } else {
                        throw new FaultException(_context, _nameFn, "Para visualizar la alerta deseada, se requiere el tipo un tipo de alerta que la identifique.", _resources.warning, true);
                    }
                } else {
                    throw new FaultException(_context, _nameFn, "El mensaje para la alerta que no debe ser vacio.", _resources.warning, true);
                }
            } catch (ex) {
                throw ex;
            }
        },
        Toastr: function (_message, _title, _type, _position) {
            /// <summary>Función para crear una notificación de tipo alerta flotante.</summary>
            /// <param name="_message" type="String">Mensaje para la alerta.</param>
            /// <param name="_title" type="String" optional="true">Texto que representa un titulo que acompaña al mensaje de la alerta.</param>
            /// <param name="_type" type="Resources.ToastrType">Objeto que define que tipo de alerta que se desea mostrar.</param>
            /// <param name="_position" type="ObStringject" >Objeto que define en que posición se desea mostrar la alerta.</param>
            _nameFn = "Notification.Toastr";
            try {
                if (!$.isNullOrEmpty(_message)) {
                    _title = (!$.isNullOrEmpty(_title)) ? "<strong>" + _title + "</strong> " : null;

                    toastr.options = {
                        "closeButton": true,
                        "debug": false,
                        "progressBar": false,
                        "positionClass": _position || "toast-top-full-width",
                        "onclick": null,
                        "showDuration": "400",
                        "hideDuration": "0",
                        "timeOut": "0",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    };
                    toastr[_type](_message, _title);
                } else {
                    throw new FaultException(_context, _nameFn, "El mensaje para la alerta que no debe ser vacio.", _resources.warning, true);
                }
            } catch (ex) {
                throw ex;
            }
        },
        MessageBox: {
            Show: function (_message, _title, _buttons, _type, _onSuccess, _onCancel, _imageUrl) {
                /// <summary>Función que muestra un mensaje a modo de notificación.</summary>
                /// <param name="_message" type="String">Texto que representa la información que se desea mostrar en el mensaje.</param>
                /// <param name="_title" type="String">Texto que representa un titulo que acompaña al mensaje..</param>
                /// <param name="_buttons" type="Resources.MessageBoxButton">Objeto que representa el tipo de botón que se incluirá en el mensaje.</param>
                /// <param name="_type" type="Resources.MessageBoxType">Objeto que representa el tipo de mensaje que se desea desplegar.</param>
                /// <param name="_onSuccess" type="Function" Optional="true">Función a ejecutar en caso de recibir una respuesta de a tipo 'Aceptar'.</param>
                /// <param name="_onCancel" type="Function" Optional="true">Función a ejecutar en caso de recibir una respuesta de a tipo 'Cancelar'.</param>
                /// <param name="_imageUrl" type="String" Optional="true">Ruta de la imagen para el mensaje en caso de elegir como tipo: Resources.MessageBoxButton.Generic</param>
                try {
                    _message = _message || "Información del Aplicativo.";
                    _title = _title || "Gabriela Michel";
                    var configuration = {
                        title: _title,
                        text: _message,
                        confirmButtonText: "Aceptar",
                        cancelButtonText: "Cancelar",
                        allowEscapeKey: true,
                        allowOutsideClick: true,
                        animation: null,
                        html: _message
                    };
                    switch (_type) {
                        case "load":
                            configuration.type = null;
                            configuration.allowEscapeKey = false;
                            configuration.allowOutsideClick = false;
                            break;
                        case "warning":
                            configuration.type = _type;
                            break;
                        case "info":
                            configuration.type = _type;
                            break;
                        case "danger":
                            configuration.type = "error";
                            break;
                        case "success":
                            configuration.type = _type;
                            break;
                        case "question":
                            configuration.imageUrl = Utilities.GetPathRaiz() + "/img/sistema/ic_help_outline_black_48px.svg";
                            break;
                        case "html":
                            configuration.type = null;
                            break;
                        case "generic":
                            if (!$.isNullOrEmpty(_imageUrl)) {
                                configuration.imageUrl = _imageUrl;
                            } else {
                                configuration.type = null;
                            }
                            break;
                        default:
                            configuration.type = null,
                                configuration.timer = 5000;
                            break;
                    };
                    switch (_buttons) {
                        case "ok":
                            configuration.showConfirmButton = true;
                            configuration.showCancelButton = false;
                            if ($.isFunction(_onSuccess)) {
                                configuration.allowEscapeKey = false;
                                configuration.allowOutsideClick = false;
                            } else {
                                configuration.allowEscapeKey = true;
                                configuration.allowOutsideClick = true
                            }
                            break;
                        case "okcancel":
                            configuration.showConfirmButton = true;
                            configuration.showCancelButton = true;
                            configuration.allowEscapeKey = false;
                            configuration.allowOutsideClick = false;
                            configuration.closeOnConfirm = ($.isFunction(_onSuccess)) ? false : true;
                            configuration.closeOnCancel = ($.isFunction(_onCancel)) ? false : true;
                            break;
                        case "yesno":
                            configuration.showConfirmButton = true;
                            configuration.showCancelButton = true;
                            configuration.confirmButtonText = "Si";
                            configuration.cancelButtonText = "No";
                            configuration.allowEscapeKey = false;
                            configuration.allowOutsideClick = false;
                            configuration.closeOnConfirm = ($.isFunction(_onSuccess)) ? false : true;
                            configuration.closeOnCancel = ($.isFunction(_onCancel)) ? false : true;
                            break;
                        case "savecancel":
                            configuration.showConfirmButton = true;
                            configuration.showCancelButton = true;
                            configuration.confirmButtonText = "Guardar";
                            configuration.allowEscapeKey = false;
                            configuration.allowOutsideClick = false;
                            configuration.closeOnConfirm = ($.isFunction(_onSuccess)) ? false : true;
                            configuration.closeOnCancel = ($.isFunction(_onCancel)) ? false : true;
                            break;
                        case "continuecancel":
                            configuration.showConfirmButton = true;
                            configuration.showCancelButton = true;
                            configuration.confirmButtonText = "Continuar";
                            configuration.allowEscapeKey = false;
                            configuration.allowOutsideClick = false;
                            configuration.closeOnConfirm = ($.isFunction(_onSuccess)) ? false : true;
                            configuration.closeOnCancel = ($.isFunction(_onCancel)) ? false : true;
                            break;
                        default:
                            configuration.showConfirmButton = false;
                            configuration.showCancelButton = false;
                            break;
                    };
                    window.onkeydown = null;
                    window.onfocus = null;
                    switch (_buttons) {
                        case "ok":
                            swal(configuration, function (args) {
                                if (args) {
                                    if ($.isFunction(_onSuccess)) {
                                        _onSuccess();
                                    }
                                } else {
                                    if ($.isFunction(_onCancel)) {
                                        _onCancel();
                                    }
                                }
                            });
                            break;
                        case "okcancel":
                            swal(configuration, function (args) {
                                if (args) {
                                    if ($.isFunction(_onSuccess)) {
                                        _onSuccess();
                                    }
                                } else {
                                    if ($.isFunction(_onCancel)) {
                                        _onCancel();
                                    }
                                }
                            });
                            break;
                        case "yesno":
                            swal(configuration, function (args) {
                                if (args) {
                                    if ($.isFunction(_onSuccess)) {
                                        _onSuccess();
                                    }
                                } else {
                                    if ($.isFunction(_onCancel)) {
                                        _onCancel();
                                    }
                                }
                            });
                            break;
                        case "savecancel":
                            swal(configuration, function (args) {
                                if (args) {
                                    if ($.isFunction(_onSuccess)) {
                                        _onSuccess();
                                    }
                                } else {
                                    if ($.isFunction(_onCancel)) {
                                        _onCancel();
                                    }
                                }
                            });
                            break;
                        case "continuecancel":
                            swal(configuration, function (args) {
                                if (args) {
                                    if ($.isFunction(_onSuccess)) {
                                        _onSuccess();
                                    }
                                } else {
                                    if ($.isFunction(_onCancel)) {
                                        _onCancel();
                                    }
                                }
                            });
                            break;
                        default:
                            swal(configuration);
                            break;
                    };
                } catch (ex) {
                    throw ex;
                }
            },
            Close: function () {
                /// <summary>Función que cierra el mensaje a modo de notificación.</summary>
                try {
                    swal.close();
                } catch (ex) {
                    throw ex;
                }
            }
        }
    };

    var _getParametroURL = function (_param) {
        /// <summary>Función para obtener el parametro que viene incluido en la url.</summary>
        /// <param name="_param" type="String">Identificador del parametro.</param>
        /// <return>Cadena de texto con el valor asignado al parametro en la url</return>
        _nameFn = "GetParametroURL";
        try {
            if (!$.isNullOrEmpty(_param)) {
                return decodeURIComponent((new RegExp('[?|&]' + _param + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
            } else {
                return null;
            }
        } catch (ex) {
            throw ex;
        }
    };

    var _getPathRaiz = function () {
        /// <summary>Función para obtener la raíz del sevidor del sitio.</summary>
        /// <return>Cadena de texto con la raíz del sitio</return>
        try {
            var dominio = location.pathname.split("/")[1];
            if (dominio.toLowerCase().indexOf(".aspx") > 0) {
                return location.protocol + "//" + location.host + "/";
            }
            return location.protocol + "//" + [location.host, location.pathname.split("/")[1]].join("/") + "/";
        } catch (ex) {
            throw ex;
        }
    };
    var _getPathRaizSinHost = function () {
        /// <summary>Función para obtener la raíz del sevidor del sitio.</summary>
        /// <return>Cadena de texto con la raíz del sitio</return>
        try {
            var dominio = location.pathname.split("/")[1];
            if (dominio.toLowerCase().indexOf(".aspx") > 0) {
                return "";
            }
            return dominio.length > 0 ? "/" + [location.pathname.split("/")[1]].join("/") + "/" : "/";
        } catch (ex) {
            throw ex;
        }
    };
    var _getPathRaizSinProtocol = function () {
        /// <summary>Función para obtener la raíz del sevidor del sitio.</summary>
        /// <return>Cadena de texto con la raíz del sitio</return>
        try {
            var dominio = location.pathname.split("/")[1];
            if (dominio.toLowerCase().indexOf(".aspx") > 0) {
                return location.host + "/";
            }
            return [location.host, location.pathname.split("/")[1]].join("/") + "/";
        } catch (ex) {
            throw ex;
        }
    };
    var _addPageLoaded = function (_function) {
        /// <summary>Función para registrar una función o método en el cargue inicial de la página.</summary>
        /// <param name="_function" type="Function">Función a registrar.</param>
        try {
            if (_function instanceof Function) {
                //Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(_function)
                if (document.addEventListener) {
                    window.addEventListener('load', _function, false);
                } else {
                    window.attachEvent('onload', _function);
                }
            } else {
                console.log("No fue posible registrar la función requerida: " + JSON.stringify(_function));
            }
        } catch (ex) {
            throw ex;
        }
    };

    var _removePageLoaded = function (_function) {
        /// <summary>Función para eliminar una función o método del cargue inicial de la página.</summary>
        /// <param name="_function" type="Function">Función a eliminar.</param>
        try {
            if (_function instanceof Function) {
                //Sys.WebForms.PageRequestManager.getInstance().remove_pageLoaded(_function)
                if (document.addEventListener) {
                    window.addEventListener('load', _function, false);
                } else {
                    window.attachEvent('onload', _function);
                }
            } else {
                console.log("No fue posible remover la función requerida: " + JSON.stringify(_function));
            }
        } catch (ex) {
            throw ex;
        }
    };
    var _CargarSelect2 = (_control, _json, _text, _id, _selecionar = null) => {
        try {
            _selecionar = _selecionar || 0;
            _control.find('option').remove();
            _control.append('<option></option>');
            $.each(_json, function (key, value) {
                _control.append('<option value="' + value[_id] + '">' + value[_text] + '</option>');
            });
            if (_selecionar > 0) {
                _control.val(_selecionar).change();
            }
        } catch (ex) {
            Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
        }
    };
    var _CargarChosen = (_control, _json, _text, _id, _selecionar = null) => {
        try {
            _selecionar = _selecionar || 0;
            _control.find('option').remove();
            _control.append('<option></option>');
            $.each(_json, function (key, value) {
                _control.append('<option value="' + value[_id] + '">' + value[_text] + '</option>');
            });
            if (_selecionar) {
                _control.val(_selecionar);
            }
            _control.trigger("chosen:updated");
        } catch (ex) {
            Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
        }
    };

    var _addEventListener = function (_control, _event, _function) {
        /// <summary>Función para agregar un evento a un elemento.</summary>
        /// <param name="_control" type="Object">Elemento al cual se le agregará el evento.</param>
        /// <param name="_event" type="String">Nombre del evento.</param>
        /// <param name="_function" type="Function">Función a ejecutar por el evento.</param>
        var _nameFn = "AddEventListener";
        try {
            if (!$.isEmptyObject(_control) && typeof _control === "object") {
                if (!$.isNullOrEmpty(_event)) {
                    _control.bind(_event, _function);
                } else {
                    throw new FaultException(_context, _nameFn, "No es posible agregar el evento al control deseado, ya que el identificador del evento recibido no es válido.", _resources.warning, true);
                }
            } else {
                throw new FaultException(_context, _nameFn, "No es posible agregar el evento al control deseado, ya que el control no es válido.", _resources.warning, true);
            }
        } catch (ex) {
            throw ex;
        }
    };

    var _removeEventListener = function (_control, _event) {
        /// <summary>Función para quitar un evento a un elemento.</summary>
        /// <param name="_control" type="Object">Elemento al cual se le quitará el evento.</param>
        /// <param name="_event" type="String">Nombre del evento.</param>
        var _nameFn = "RemoveEventListener";
        try {
            if (!$.isEmptyObject(_control) && typeof _control === "object") {
                if (!$.isNullOrEmpty(_event)) {
                    _control.unbind(_event);
                } else {
                    throw new FaultException(_context, _nameFn, "No es posible quitar el evento al control deseado, ya que el identificador del evento recibido no es válido.", _resources.warning, true);
                }
            } else {
                throw new FaultException(_context, _nameFn, "No es posible quitar el evento al control deseado, ya que el control no es válido.", _resources.warning, true);
            }
        }
        catch (ex) {
            throw ex;
        }
    };

    var _handledError = function (_error, _showby) {
        /// <summary>Función para mostrar los mensajes de alerta para los errores controlados y no controlados.</summary>
        /// <param name="_error" type="Object">La instancia del error ya sea de tipo FaultException o Error.</param>
        /// <param name="_showby" type="Resources.ShowBy" optional="true">Valor que define la modalidad para mostrar la información del error en presentación. Si no se define un tipo, por defectose muestra en consola.</param>
        var _nameFn = "HandledError";
        try {
            var _description = "Ha ocurrido un error inesperado en el Aplicativo";
            if (_error instanceof FaultException) {
                var defaultError = "Se ha presentado una incosistencia en el Aplicativo. <i><strong>Proceso: </strong> " + _error.function + " | <strong>Inconsistencia: </strong>" + _error.message + " | <strong>Clase:</strong> " + _error.class.name + "</i>. <br /><br />Si este mensaje sigue persistiendo, por favor comuníquese con el administrador.";
                switch (_showby) {
                    case 0: //return
                        return defaultError;
                    case 1: //console
                        console.log("Se ha presentado una incosistencia en el Aplicativo. Proceso: " + _error.function + " | Inconsistencia: " + _error.message + " | Clase: " + _error.class.name);
                        break;
                    case 2: //alert
                        _notification.Alert(defaultError.replace(/(<br \/>)/g, ""), null, _error.type);
                        break;
                    case 3: //messagebox
                        _notification.MessageBox.Show(defaultError, "Inconsistencia en el Aplicativo", _resources.MessageBoxButton.Ok, _error.type.type);
                        break;
                    case 4: //toastr
                        _notification.Toastr(defaultError.replace(/(<br \/>)/g, ""), null, _resources.ToastType.Error, _resources.ToastPosition.Top_Right);
                        break;
                    default:
                        console.log("Se ha presentado una incosistencia en el Aplicativo. Proceso: " + _error.function + " | Inconsistencia: " + _error.message + " | Clase: " + _error.class.name);
                        break;
                }
            } else if (_error instanceof Error) {
                let defaultError = "Se ha presentado un error inesperado en el Aplicativo. <i><strong>Error: </strong>" + _error.message + "</i>. <br /><br />Si este mensaje sigue persistiendo, por favor comuníquese con el administrador.";
                switch (_showby) {
                    case 0: //return
                        return defaultError;
                    case 1: //console
                        console.log("Se ha presentado un error inesperado en el Aplicativo. Error: " + _error.message);
                        break;
                    case 2: //alert
                        _notification.Alert(defaultError.replace(/(<br \/>)/g, ""), null, _resources.danger);
                        break;
                    case 3: //messagebox
                        _notification.MessageBox.Show(defaultError, "Error en el Aplicativo", _resources.MessageBoxButton.Ok, _resources.MessageBoxType.Error);
                        break;
                    case 4: //toastr
                        _notification.Toastr(defaultError.replace(/(<br \/>)/g, ""), null, _resources.ToastType.Error, _resources.ToastPosition.Top_Right);
                        break;

                    default:
                        console.log("Se ha presentado un error inesperado en el Aplicativo. Error: " + _error.message);
                        break;
                }
            } else if (_error.hasOwnProperty("statusText")) {
                let defaultError = `Algo fallo. <i><strong>Error: </strong> ${_error.StatusMessage.Mensaje} </i>. <br /><br />Si este mensaje sigue persistiendo, por favor comuníquese con el administrador.`;
                if (_error.status === 0) {
                    return swal('Algo Falló', "No está conectado Compruebe la red", 'error').then(function () {
                        window.location.reload();
                    });
                } else if (_error.status === 404) {
                    location.href = Utilities.GetParametroURL()+ "/ErrorPages/404.aspx";
                } else if (_error.status === 500) {
                    location.href = Utilities.GetParametroURL() +"/ErrorPages/500.aspx";
                } else if (_error.status === 408) {
                    return swal({
                        title: 'Su sesión ha expirado',
                        html: "Le informamos que se detecto un largo período de inactividad, por lo tanto el sistema cerró su sesión.</br> Por favor ingrese su usuario y clave nuevamente.",
                        type: 'info'
                    }).then(function () {
                        location.href = 'login.aspx';
                    });
                } else if (_error.status === 418) {
                    defaultError = String.format(defaultError, _error.StatusMessage.Mensaje);
                    _notification.Toastr(defaultError.replace(/(<br \/>)/g, ""), null, _resources.ToastType.Error, _resources.ToastPosition.Top_Right);
                    return false;
                } else if (_error.status === 419) {
                    defaultError = `Proceso de validación no satisfactorio. <i> ${_error.StatusMessage.Mensaje} </i>. <br /><br />Por favor verifiquelo.`;
                    _notification.Toastr(defaultError.replace(/(<br \/>)/g, ""), null, _resources.ToastType.Warning, _resources.ToastPosition.Top_Right);
                    return false;
                } else if (exception === 'parsererror') {
                    return swal('Algo Falló', "La solicitud de casteo a JSON falló", 'error');
                } else if (exception === 'timeout') {
                    return swal('Algo Falló', "Se excedio el tiempo de espera de la operación", 'error');
                } else if (exception === 'abort') {
                    return swal('Algo Falló', "La petición Ajax fue abortada", 'error');
                } else {
                    return swal('Algo Falló', "Error no capturado </br>" + jqXHR.responseText, 'error');
                }
                switch (_showby) {
                    case 0: //return
                        return defaultError;
                    case 1: //console
                        console.log("Se ha presentado un error inesperado en el Aplicativo. Error: " + _error.StatusMessage.Mensaje);
                        break;
                    case 2: //alert
                        _notification.Alert(defaultError.replace(/(<br \/>)/g, ""), null, _resources.danger);
                        break;
                    case 3: //messagebox
                        _notification.MessageBox.Show(defaultError, "Error en el Aplicativo", _resources.MessageBoxButton.Ok, _resources.MessageBoxType.Error);
                        break;
                    case 4: //toastr
                        _notification.Toastr(defaultError.replace(/(<br \/>)/g, ""), null, _resources.ToastType.Error, _resources.ToastPosition.Top_Right);
                        break;
                    default:
                        console.log("Se ha presentado un error inesperado en el Aplicativo. Error: " + _error.StatusMessage.Mensaje);
                        break;
                }
            } else if (_error.hasOwnProperty("EstatusCode")) {
                let defaultError = "Algo fallo. <i><strong>Error: </strong> {0} </i>. <br /><br />Si este mensaje sigue persistiendo, por favor comuníquese con el administrador.";
                if (_error.status === 0) {
                    return swal('Algo Falló', "No está conectado Compruebe la red", 'error').then(function () {
                        window.location.reload();
                    });
                } else if (_error.EstatusCode === 404) {
                    location.href = Utilities.GetParametroURL() +"/ErrorPages/404.aspx";
                } else if (_error.EstatusCode === 500) {
                    location.href = Utilities.GetParametroURL() + "/ErrorPages/500.aspx";
                } else if (_error.EstatusCode === 408) {
                    return swal({
                        title: 'Su sesión ha expirado',
                        html: "Le informamos que se detecto un largo período de inactividad, por lo tanto el sistema cerró su sesión.</br> Por favor ingrese su usuario y clave nuevamente.",
                        type: 'info'
                    }).then(function () {
                        location.href = 'login.aspx';
                    });
                } else if (_error.EstatusCode === 418) {
                    defaultError = String.format(defaultError, _error.StatusMessage.Mensaje);
                    _notification.Toastr(defaultError.replace(/(<br \/>)/g, ""), null, _resources.ToastType.Error, _resources.ToastPosition.Top_Right);
                    return false;
                } else if (_error.EstatusCode === 419) {
                    defaultError = `Proceso de validación no satisfactorio. <i> ${_error.StatusMessage.Mensaje} </i>. <br /><br />Por favor verifiquelo.`;
                    _notification.Toastr(defaultError.replace(/(<br \/>)/g, ""), null, _resources.ToastType.Warning, _resources.ToastPosition.Top_Right);
                    return false;
                } else if (exception === 'parsererror') {
                    return swal('Algo Falló', "La solicitud de casteo a JSON falló", 'error');
                } else if (exception === 'timeout') {
                    return swal('Algo Falló', "Se excedio el tiempo de espera de la operación", 'error');
                } else if (exception === 'abort') {
                    return swal('Algo Falló', "La petición Ajax fue abortada", 'error');
                } else {
                    return swal('Algo Falló', "Error no capturado </br>" + jqXHR.responseText, 'error');
                }
                switch (_showby) {
                    case 0: //return
                        return defaultError;
                    case 1: //console
                        console.log("Se ha presentado un error inesperado en el Aplicativo. Error: " + _error.StatusMessage.Mensaje);
                        break;
                    case 2: //alert
                        _notification.Alert(defaultError.replace(/(<br \/>)/g, ""), null, _resources.danger);
                        break;
                    case 3: //messagebox
                        _notification.MessageBox.Show(defaultError, "Error en el Aplicativo", _resources.MessageBoxButton.Ok, _resources.MessageBoxType.Error);
                        break;
                    case 4: //toastr
                        _notification.Toastr(defaultError.replace(/(<br \/>)/g, ""), null, _resources.ToastType.Error, _resources.ToastPosition.Top_Right);
                        break;
                    default:
                        console.log("Se ha presentado un error inesperado en el Aplicativo. Error: " + _error.statusText);
                        break;
                }
            }
        } catch (ex) {
            console.log("Ha ocurrido un error inesperado en el Aplicativo desde el método: " + _nameFn + ". [Error: " + ex.message + ", Clase: " + _context.name + "]");
        } finally {
            Master.Utilidades.ActivarDesactivarLoading(false);
        }
    };

    var _createControlKendo = function (_control) {
        /// <summary>Función Crear un control de Kendo.</summary>
        /// <param name="_control" type="Object">Objeto con todas las propiedades para construir el control incluyendo el elemento sobre el cual contruirá.</param>
        /// <return type="Object">Data completa sobre el control.</return>
        var _nameFn = "CreateControlKendo";
        try {
            if (typeof _control.element === "object" && $.isEmptyObject(_control.element) && _control[0] === undefined) {
                throw new FaultException(_context, _nameFn, "No es posible llevar a cabo la construcción del control, ya que el control recibido no es válido.", _resources.danger, true);
            } else if ($.isNullOrEmpty(_control.type)) {
                throw new FaultException(_context, _nameFn, "No es posible llevar a cabo la construcción del control, ya que no fue posible identificar el <strong>tipo de control</strong> deseado.", _resources.danger, true);
            } else if ($.isEmptyObject(_control.attributes) || !$.isPlainObject(_control.attributes) || Object.keys(_control.attributes).length === 0) {
                throw new FaultException(_context, _nameFn, "No es posible llevar a cabo la construcción del control ya que no se recibieron las respectivas propiedades para crearlo.", _resources.danger, true);
            } else {
                switch (_control.type.toLowerCase()) {
                    case "dropdownlist":
                        return _control.element.kendoDropDownList(_control.attributes).data(_control.kendoType);
                    case "multiselect":
                        return _control.element.kendoMultiSelect(_control.attributes).data(_control.kendoType);
                    case "autocomplete":
                        return _control.element.kendoAutoComplete(_control.attributes).data(_control.kendoType);
                    case "listview":
                        return _control.element.kendoListView(_control.attributes).data(_control.kendoType);
                    case "grid":
                        return _control.element.kendoGrid(_control.attributes).data(_control.kendoType);
                    case "datepicker":
                        if (!$.isNullOrEmpty(_control.attributes.placeholder)) {
                            _control.element.attr('placeholder', _control.attributes.placeholder);
                        }
                        return _control.element.kendoDatePicker(_control.attributes).data(_control.kendoType);
                    case "moneytextbox":
                        _control.element.attr('maxlength', _control.attributes.maxlength);
                        return _control.element.kendoNumericTextBox(_control.attributes).data(_control.kendoType);
                    case "numerictextbox":
                        _control.element.attr('maxlength', _control.attributes.maxlength);
                        return _control.element.kendoNumericTextBox(_control.attributes).data(_control.kendoType);
                    case "window":
                        return _control.element.kendoWindow(_control.attributes).data(_control.kendoType);
                    default:
                        throw new FaultException(_context, _nameFn, "No se encontró el tipo de control solicitado: <strong>" + _control.type + "</strong>.", _resources.danger, true);
                }
            }
        } catch (ex) {
            throw ex
        }
    };

    var _createElement = function (_elementType, _attribute) {
        /// <summary>Función Crear un elemento de html.</summary>
        /// <param name="_elementType" type="String">Cadena de texto con el tipo o identificador del elemento.</param>
        /// <param name="_attribute" type="Object" optional="true">Objeto con los atributos para el elemento.</param>
        /// <return type="Object">Data del elemento.</return>
        var _nameFn = "CreateElement";
        try {
            if ($.isNullOrEmpty(_elementType)) {
                throw new FaultException(_context, _nameFn, "No es posible crear el elemento ya que se requiere el identificador del tipo de elemento.", _resources.danger, true);
            } else {
                element = document.createElement(_elementType);
                if (!$.isEmptyObject(_attribute) && _attribute.length > 0) {
                    $.each(_attribute, function (index, attr) {
                        element.setAttribute(attr.name, attr.value)
                    });
                }
                return element;
            }
        } catch (ex) {
            throw ex;
        }
    };

    var _setDataSourceSelect = function (_collection, _select) {
        /// <summary>Función que actualiza el dataSource de un control kendoDropDownList kendoMultiSelect.</summary>
        /// <param name="_collection" type="Object">Colección de registros.</param>
        /// <param name="_select" type="Object">Control kendoGrid.</param>
        try {
            var datasource = new kendo.data.DataSource({ data: ($.isEmptyObject(_collection) ? [] : _collection) });
            datasource.read();
            _select.setDataSource(datasource);
            _select.refresh();
            return _select;
        } catch (ex) {
            throw ex;
        }
    };

    var _setDataSourceGrid = function (_collection, _grid) {
        /// <summary>Función que actualiza el dataSource de un control kendoGrid.</summary>
        /// <param name="_collection" type="Object">Colección de registros.</param>
        /// <param name="_grid" type="Object">Control kendoGrid.</param>
        try {
            var dataSource = new kendo.data.DataSource({
                data: ($.isEmptyObject(_collection) ? [] : _collection),
                pageSize: 10
            });
            dataSource.read();
            _grid.setDataSource(dataSource);
            _grid.dataSource.read();
            _grid.refresh();
            return _grid;
        } catch (ex) {
            throw ex;
        }
    };

    var _onError = function (args) {
        try {
            console.log(args);
        } catch (ex) {
            throw ex;
        } finally {
            Master.Utilidades.ActivarDesactivarLoading(false);
        }
    };

    var _getNamePage = function () {
        /// <summary>Función que retorna el nombre de la Página actual.</summary>
        /// <return type="String">Nombre de la Página.</return>
        try {
            var sPath = window.location.pathname;
            var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
            return sPage;
        } catch (ex) {
            throw ex;
        }
    };

    var _stringToBoolean = function (string) {
        /// <summary>Función que convierte una cadena de texto a booleas si aplica.</summary>
        /// <return type="Boolean">Indicador resultante.</return>
        try {
            switch (string.toLowerCase()) {
                case "true": case "yes": case "1": return true;
                case "false": case "no": case "0": case null: return false;
                default: return Boolean(string);
            }
        } catch (ex) {
            throw ex;
        }
    };

    var _resetForm = function (_form) {
        /// <summary>Función reestablece los campos que esten marcados con error.</summary>
        /// <param name="_form" type="Object">Cadena de texto que recibe el nombe del elemento que contiene los controles.</param>
        try {
            if (!$.isNullOrEmpty(_form)) {
                $("#" + _form + " div[class*='has-error']").removeClass("has-error");
            }
        } catch (ex) {
            throw ex;
        }
    };

    var _loading = {
        Show: function () {
            load.fadeIn("slow");
            $("body").addClass("stop-scrolling");
        },
        Hide: function () {
            $("body").removeClass("stop-scrolling");
            load.fadeOut("slow");
        }
    };

    var _getTimeDiff = function (_earlierDate, _laterDate) {
        /// <summary>Función obtener la diferencia entre fechas.</summary>
        /// <param name="_earlierDate" type="Date">Fecha anterior.</param>
        /// <param name="_laterDate" type="Date">Fecha posterior.</param>
        /// <return type="Object">Objeto con los días, meses, horas y segundos.</return>
        try {
            var oDiff = new Object();
            var nTotalDiff = _laterDate.getTime() - _earlierDate.getTime();
            oDiff.days = Math.floor(nTotalDiff / 1000 / 60 / 60 / 24);
            nTotalDiff -= oDiff.days * 1000 * 60 * 60 * 24;
            oDiff.hours = Math.floor(nTotalDiff / 1000 / 60 / 60);
            nTotalDiff -= oDiff.hours * 1000 * 60 * 60;
            oDiff.minutes = Math.floor(nTotalDiff / 1000 / 60);
            nTotalDiff -= oDiff.minutes * 1000 * 60;
            oDiff.seconds = Math.floor(nTotalDiff / 1000);
            return oDiff;
        } catch (ex) {
            throw ex;
        }
    }

    return {
        Application: _application,
        Notification: _notification,
        GetParametroURL: _getParametroURL,
        GetPathRaiz: _getPathRaiz,
        GetPathRaizSinHost: _getPathRaizSinHost,
        GetPathRaizSinProtocol: _getPathRaizSinProtocol,
        AddPageLoaded: _addPageLoaded,
        AddEventListener: _addEventListener,
        RemoveEventListener: _removeEventListener,
        HandledError: _handledError,
        CreateControlKendo: _createControlKendo,
        CreateElement: _createElement,
        SetDataSourceSelect: _setDataSourceSelect,
        SetDataSourceGrid: _setDataSourceGrid,
        GetNamePage: _getNamePage,
        StringToBoolean: _stringToBoolean,
        ResetForm: _resetForm,
        OnError: _onError,
        Loading: _loading,
        GetTimeDiff: _getTimeDiff,
        CagarSelect2: _CargarSelect2,
        CargarChosen: _CargarChosen
    };
})();

Obj.Unscramble = function () {
    /// <summary>Función que sirve para enmascarar el nombre del llamado gabrielaRequest.</summary>
    var reqName = {
        g8: 'a1', //ga
        b9: 'r2', //br
        i10: 'e3', //ie
        l11: 'a4', //la
        R12: 'e5', //Re
        q13: 'u6', //qu
        e14: 's7', //es
        t15: '' //t
    }
    var requestString = '';
    for (var property in reqName) {
        if (reqName.hasOwnProperty(property)) {
            requestString += property.charAt(0).toString() + reqName[property].charAt(0).toString();
        }
    }
    return requestString;
};

Obj[Obj.Unscramble()] = function (action, json, ok, error) {
    /// <summary>Función que sirve para realizar un llamado de objeto xhr(XMLHttpRequest) o más conocodo como Ajax Callback.</summary>
    /// <param name="action" type="string">El nombre del método web.</param>
    /// <param name="json" type="object">El objeto con los parámetros del método.</param>
    /// <param name="ok" type="function">La función a ejecutar si el llamado es exitoso, con un único parámetro que es la respuesta del servidor</param>
    /// <param name="error" type="function">La función de respuesta del servidor si el llamado tiene un error de petición o excepción no controlada.</param>
    /// <returns type="object">No retorna ningún elemento, si se asigna a una variable u objeto, la función es replicada a éste.</returns>
    try {
        var locationPath = '';
        var isAsync = true;
        locationPath = `${Utilities.GetNamePage()}/${action}`;
        var settings = {
            data: json,
            method: action
        };

        let parametros = JSON.stringify(json);
        $.ajax({
            type: 'POST',
            url: locationPath,
            dataType: 'json',
            async: isAsync,
            contentType: "application/json; charset=utf-8",
            data: parametros,
            success: function (retrieved) {
                var response = (typeof retrieved.d) === 'string' ? $.parseJSON(retrieved.d) : retrieved.d;

                if (response.EstatusCode !== undefined && response.EstatusCode === 200) {
                    if ($.isFunction(ok)) {
                        ok(typeof response === 'string' ? $.parseJSON(response) : response, settings);
                    }
                } if (response.status !== undefined && response.status === 200) {
                    if ($.isFunction(ok)) {
                        ok(typeof response.response === 'string' ? $.parseJSON(response.response) : response.response, settings);
                    }
                } else {
                    Master.Utilidades.ActivarDesactivarLoading(false);
                    Utilities.HandledError(response, 4);
                }
            },
            error: function (jqXHR, exception) {
                Master.Utilidades.ActivarDesactivarLoading(false);
                Utilities.HandledError(jqXHR, 4);
            }
        });
    } catch (ex) {
        throw ex;
    }
};

Obj.DisposeUtilities = function () {
    /// <summary>Función que sirve para limpiar los objetos y funciones generales de los archivos Javascript.</summary>
    delete Obj.gabrielaRequest;
    delete Obj.Unscramble;
    delete Obj.Resources;
    SwitchPassword = undefined;
    try {
        delete Obj.DisposeUtilities;
    } catch (ex) {
        DisposeUtilities();
    }
}

function FaultException(_class, _function, _message, _type, _isControlled) {
    /// <summary>Función que se creará como tipo de error para manejar las excepciones controladas.</summary>
    /// <param name="_application" type="Object">Objeto con los datos de la aplicación.</param>
    /// <param name="_class" type="String">Cadena de texto de texto con el nombre de la clase donde se controló el error.</param>
    /// <param name="_function" type="String">Cadena de texto de texto con el nombre de la método donde se controló el error.</param>
    /// <param name="_message" type="String">Cadena de texto con el mensaje del error.</param>
    /// <param name="_type" type="Object">Objeto con los datos del tipo de error</param>
    /// <param name="_isControlled" type="Boolean">Indicador que se usa para definir si el error es controlado, por defecto es false.</param>
    this.name = "FaultException";
    this.message = _message || "";
    this.application = Utilities.Application || null;
    this.class = _class || "";
    this.function = _function || "";
    this.type = _type || null;
    this.isControlled = _isControlled || false;
};
FaultException.prototype = new Error;

Utilities.AddPageLoaded(function () {
    $(document).on('mouseenter', '[data-tooltip="true"]', function () {
        $(this).tooltip('show');
    });

    $(document).on('mouseleave', '[data-tooltip="true"]', function () {
        $(this).tooltip('hide');
    });

    $(document).on('input', "[data-type='number']", function (e) {
        e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
    });

    $(document).on('input', "[data-type='email']", function (e) {
        if (!$.isNullOrEmpty(e.currentTarget.value)) {
            (!$.isEmail(e.currentTarget.value)) ? $(e.currentTarget.parentNode).addClass("has-error") : $(e.currentTarget.parentNode).removeClass("has-error");
        } else {
            $(e.currentTarget.parentNode).removeClass("has-error");
        }
    });

    $(document).on('input', "[data-type='text']", function (e) {
        if (!$.isNullOrEmpty(e.currentTarget.value)) {
            (!$.isText(e.currentTarget.value)) ? $(e.currentTarget.parentNode).closest("span.form-control, div.form-control").addClass("has-error") : $(e.currentTarget.parentNode).closest("span.form-control, div.form-control").removeClass("has-error");
            (!$.isText(e.currentTarget.value)) ? $(e.currentTarget.parentNode).addClass("has-error") : $(e.currentTarget.parentNode).removeClass("has-error");
        } else {
            $(e.currentTarget.parentNode).closest("span.form-control, div.form-control").removeClass("has-error")
            $(e.currentTarget.parentNode).removeClass("has-error");
        }
    });

    $(document).on('input', "[data-type='company-name']", function (e) {
        if (!$.isNullOrEmpty(e.currentTarget.value)) {
            (!$.isCompanyName(e.currentTarget.value)) ? $(e.currentTarget.parentNode).addClass("has-error") : $(e.currentTarget.parentNode).removeClass("has-error");
        } else {
            $(e.currentTarget.parentNode).removeClass("has-error");
        }
    });

    $(document).on('input', "[data-type='address']", function (e) {
        if (!$.isNullOrEmpty(e.currentTarget.value)) {
            (!$.isAddress(e.currentTarget.value)) ? $(e.currentTarget.parentNode).addClass("has-error") : $(e.currentTarget.parentNode).removeClass("has-error");
        } else {
            $(e.currentTarget.parentNode).removeClass("has-error");
        }
    });
    $(document).on('focus', 'input', function (e) {
        $(e.currentTarget.parentNode).closest("span.form-control, div.form-control").addClass("span-form-control-focus");
    });
    $(document).on('blur', 'input', function (e) {
        $(e.currentTarget.parentNode).closest("span.form-control, div.form-control").removeClass("span-form-control-focus");
    });

    $(document).on('keypress', "[data-type='price-format']", function (e) {
        var num = e.currentTarget.value.replace(/\./g, '').replace(/\,/g, '').replace(/\$/g, '').replace(' ', '');
    });

    $(document).on('custom', "[data-checkbox='true']", function (e) {
        var data = $(this).data();
        var input = Utilities.CreateElement("input", [{ name: "id", value: data.idcontrol }, { name: "type", value: "checkbox" }]);
        if (!$.isNullOrEmpty(data.tabindex)) {
            input.tabIndex = data.tabindex
        }
        input.checked = (data.checked) ? true : false;
        input.disabled = (data.enable) ? false : true;
        var label = Utilities.CreateElement("label", [{ name: "for", value: data.labelfor }]);
        if (data.labelname && !$.isNullOrEmpty(data.labelname)) {
            label.innerHTML = data.labelname;
        }
        this.appendChild(input);
        this.appendChild(label);
        var attributes = $.extend({}, this.attributes)
        for (var i = 0; i < attributes.length; i++) {
            if (/^data-/.test(attributes[i].name)) {
                this.removeAttribute(attributes[i].name);
            }
        }
    });
    $("[data-checkbox='true']").trigger("custom");

    //Obj.DisposeUtilities();
});
$(document).ready(function () {
    /// Agrego metodo a validate jquery
    $.validator.addMethod("valueNotEquals", function (value, element, arg) {
        return arg !== value;
    }, "El valor no es igual al argumento");
    $.validator.addMethod("time24", function (value, element) {
        return /^([01]?[0-9]|2[0-3])(:[0-5][0-9]){1}$/.test(value);
    }, "Formato de Hora invalido.");
    var curDate;
    $.validator.addMethod("minDate", function (value, element) {
        try {
            _ajaxRequest("Inicio/Default.aspx/_SerOOOyAeeIKOO", {}, function (res) {
                try {
                    curDate = kendo.parseDate(res);
                    var inputDate = new Date(value);
                    if (inputDate >= curDate)
                        return true;
                    return false;
                } catch (ex) {
                    Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
                }
            }, Utilities.OnError);
        } catch (ex) {
            Utilities.HandledError(ex, _resources.ShowBy.MessageBox);
        }
    }, "La fecha debe ser mayor o igual a " + moment(curDate).format("DD/MM/YYYY"));
});



var Master = {

    Utilidades: {
        /** @description Permite activar o desactivar el loading. 
         * @param {boolean} mostrar variable que determina si se muestra o no el loading.
         * @param {string} contenedor Selector de la etiqueta que va a contener el loading.
         */
        ActivarDesactivarLoading: (mostrar = true, contenedor = null) => {
            if (!mostrar)
                $(contenedor !== null ? `${contenedor}` : "body").children(`.loader-wrapper`).fadeOut('slow');
            else
                $(contenedor !== null ? `${contenedor}` : "body").children(`.loader-wrapper`).fadeIn('slow');
        },
        AplicationRequest: {
            RequestFile: (controlador, action, formData, methodType = 'POST', ok, error, always) => {
                try {
                    var settings = {
                        data: formData,
                        controlador: controlador,
                        method: action
                    };

                    $.ajax({
                        url: locationPath = `${Utilities.GetPathRaiz()}${controlador}/${action}`,
                        data: formData,
                        type: methodType,
                        cache: false,
                        contentType: false,
                        processData: false
                    }).done(function (retrieved) {
                        try {
                            var response = typeof retrieved === 'string' ? $.parseJSON(retrieved) : retrieved;
                            if (response.EstatusCode === 200) {
                                if ($.isFunction(ok)) {
                                    ok(response, settings);
                                }
                            } else {
                                Master.Utilidades.ActivarDesactivarLoading(false);
                                Utilities.HandledError(response, 4);
                            }

                        } catch (e) {
                            Master.Utilidades.ActivarDesactivarLoading(false);
                            Utilities.HandledError(e, 4);
                        }

                    }).fail(function (jqXHR) {
                        console.log(jqXHR);
                        Master.Utilidades.ActivarDesactivarLoading(false);
                        Utilities.HandledError(jqXHR, 4);
                    }).always(function (e) {
                        if (always !== undefined) {
                            always(e);
                        }
                    });


                } catch (e) {
                    Utilities.HandledError(e, 4);
                }
            },
            RequestJson: (controlador, action, parametros, methodType = 'POST', ok, error, always) => {
                try {
                    var settings = {
                        data: parametros,
                        controlador: controlador,
                        method: action
                    };

                    $.ajax({
                        url: locationPath = `${Utilities.GetPathRaiz()}${controlador}/${action}`,
                        type: methodType,
                        dataType: 'json',
                        async: true,
                        contentType: "application/json; charset=utf-8",
                        data: parametros
                    }).done(function (retrieved) {
                        try {
                            var response = typeof retrieved === 'string' ? $.parseJSON(retrieved) : retrieved;
                            if (response.EstatusCode === 200) {
                                if ($.isFunction(ok)) {
                                    ok(response, settings);
                                }
                            } else {
                                Master.Utilidades.ActivarDesactivarLoading(false);
                                Utilities.HandledError(response, 4);
                            }

                        } catch (e) {
                            Master.Utilidades.ActivarDesactivarLoading(false);
                            Utilities.HandledError(e, 4);
                        }

                    }).fail(function (jqXHR) {
                        console.log(jqXHR);
                        Master.Utilidades.ActivarDesactivarLoading(false);
                        Utilities.HandledError(jqXHR, 4);
                    }).always(function (e) {
                        if (always !== undefined) {
                            always(e);
                        }
                    });


                } catch (e) {
                    Utilities.HandledError(e, 4);
                }
            }

        }
    },
    ToolAplication: {
        Guid: () => {
            s4: () => {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            };
            return `${s4()}-${s4()}-${s4()}-${s4()}-${s4()}-${s4()}-${s4()}-${s4()}`;
        },
        InicializarComponentes: (selector = "body") => {
            let todos = document.querySelectorAll(selector);
            if (todos) {
                todos.forEach(function (elemento, indice, arreglo) {
                    console.log(elemento);
                    var elements = elemento.querySelectorAll(".clearAuto");
                    elements.forEach((campo) => {
                        switch (campo.type) {
                            case "checkbox":
                                $(campo).prop('checked', false).iCheck('update');
                                break;
                            case "radio":
                                campo.checked = false;
                                break;
                            case "number":
                                $(campo).data("ionRangeSlider").reset();
                                break;
                            case "select-one":
                                $(campo).val('').trigger("chosen:updated");
                                break;
                            default:
                        }
                    });
                });

            }

        },


    }

};

//Activar/Desactivar Loading


