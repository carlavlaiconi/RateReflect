sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment) {
        "use strict";

        return Controller.extend("ratereflect.controller.UserStart", {
            onInit: function () {
                var oModel = new JSONModel();
                this.getView().setModel(oModel, "CatalogModel");

                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("UserStart").attachPatternMatched(this._onObjectMatched, this);
            },

            onProfilePress:function(){
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("UserInfo");
            },
            _onObjectMatched: async function(){
                var oView = this.getView();
                oView.setBusy(true);
                oView.getModel("CatalogModel").refresh();
                 oView.byId("idProductsTable").getBinding("items").attachEvent("dataReceived", function(oEvent){
                     this.getView().setBusy(false);
                 }.bind(this));
            }
        });
    });