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
            },
            onLoginPress: function () {
                var oUser = this.getView().byId("Login_email").getValue();  //get input value data in oUser variable 
                var oPwd = this.getView().byId("Login_password").getValue();    //get input value data in oPwd variable
                this._getUserDetails(oUser, oPwd).then(function (oData) {
                    console.log(oData);
                    if (oData.results.length) {
                        var oODataJSONModel = new JSONModel(oData.results);
                        this.getView().setModel(oODataJSONModel, "userLoggedModel");
                        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                        oRouter.navTo("UserStart"); // "secondPage" is the name of the route defined in manifest.json
                    } else {
                        alert("Wrong Credentials");
                    }
                }.bind(this)).catch(function (oError) {

                    console.log(oError)

                }.bind(this));

            },
            _getUserDetails: function (oUser, oPwd) {
                var oModel = this.getOwnerComponent().getModel();
                var aFilters = [];
                aFilters.push(new Filter({
                    filters: [
                        new Filter("Email", FilterOperator.EQ, String(oUser).toUpperCase()),
                        new Filter("Password", FilterOperator.EQ, String(oPwd))
                    ],
                    and: true
                }));
                return new Promise((resolve, reject) => {
                    oModel.read("/Users", {
                        filters: aFilters,
                        success: function (oData, oResponse) {
                            // var oODataJSONModel = new sap.ui.model.json.JSONModel();
                            // oODataJSONModel.setData ({ modelData : oData.results});
                            // alert(JSON.stringify(oData));
                            resolve(oData);
                        },
                        error: function (oError) {
                            reject(oError);
                        }
                    })
                })
            }
        });
    });
