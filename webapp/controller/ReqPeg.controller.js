sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/Sorter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/m/Token"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, Sorter, FilterOperator, JSONModel, MessageBox, Fragment, Token) {
        "use strict";

        return Controller.extend("ratereflect.controller.View1", {
            onInit: function () {
                var oViewModel = new JSONModel();
                this.getView().setModel(oViewModel, "viewModel");
                this.vSender = sap.ui.getCore().getModel("userDetailsModel").getData()[0].Name.toString();
                var oDataModel = new JSONModel({ vSender: this.vSender });
                this.getView().setModel(oDataModel, "data");
            },


        });
    });
