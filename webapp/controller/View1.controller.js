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
                        var userData = new JSONModel(oData.results);
                        // this.setModel(userData, "userDetailsModel");
                        sap.ui.getCore().setModel(userData, "userDetailsModel");

                        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                        var vRole = sap.ui.getCore().getModel("userDetailsModel").getData()[0].Role;
                        switch(vRole){
                            case 2:        //Project manager routing
                                oRouter.navTo("UserStart"); 
                              break;
                            case 3:         //Team manager routing
                                oRouter.navTo("UserStart"); 
                              break;
                            case 1:         // Employee routing 
                                oRouter.navTo("UserStart"); 
                          }

                    } else {
                        MessageBox.error("Wrong Credentials");
                    }
                }.bind(this)).catch(function (oError) {

                    console.log(oError)

                }.bind(this));

            },
            onViewPress: function() {
                var oRouter1 = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter1.navTo("ViewFeedbacks"); // 
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
            },
            onForgotPasswordPress: function () {
                var oUser = this.getView().byId("Login_email").getValue().toUpperCase();
                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/Z_RATEREFLECT_SRV/");
                if(oUser === ""){
                    MessageBox.error("Please put email adress");
                }else{
                    oModel.callFunction("ForgotPassword", // function import name
                                        "POST", // http method
                                        {"Email" : oUser  }, // function import parameters
                                        null,        
                                        function(oData, response) { }, // callback function for success
                                        function(oError){} ); // callback function for error
                    MessageBox.success("The email was sent.")
                }
            }
        });
    });
