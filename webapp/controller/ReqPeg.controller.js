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
                // sap.ui.getCore().getModel("userDetailsModel").getData()[0].Name.toString();
                // sap.ui.getCore().byId("_IDSender").setText(this.vSender)
                // var oDataModel = new JSONModel({ vSender: this.vSender });
                // this.getView().setModel(oDataModel, "data");
            },

            onCreate: function(){
                var oView = this.getView();
                var receiver = oView.byId("_IDGenInput2").getValue();
                if(receiver == ""){
                    MessageBox.error("The reciever doesn't exist");
                }else 
                {
                    var project = oView.byId("_IDGenText1").getValue();
                    var grade1 = oView.byId("_IDGenText4").getValue();
                    var grade2 = oView.byId("_IDGenText7").getValue();
                    var grade3 = oView.byId("_IDGenText10").getValue();
                    var grade4 = oView.byId("_IDGenText13").getValue();
                    var grade5 = oView.byId("_IDGenText16").getValue();
                    var comment1 = oView.byId("_IDGenText5").getValue();
                    var comment2 = oView.byId("_IDGenText8").getValue();
                    var comment3 = oView.byId("_IDGenText11").getValue();
                    var comment4 = oView.byId("_IDGenText14").getValue();
                    var comment5 = oView.byId("_IDGenText17").getValue();

                    var oEntry={};
                    oEntry.Receiver_Name = receiver;
                    oEntry.Project_name = project;
                    oEntry.Rating1 = grade1;
                    oEntry.Comment1 = comment1;
                    oEntry.Rating2 = grade2;
                    oEntry.Comment2 = comment2;
                    oEntry.Rating3 = grade3;
                    oEntry.Comment3 = comment3;
                    oEntry.Rating4 = grade4;
                    oEntry.Comment4 = comment4;
                    oEntry.Rating5 = grade5;
                    oEntry.Comment5 = comment5;
                    oEntry.Sender_Name = sap.ui.getCore().getModel("userDetailsModel").getData()[0].Name.toString();
                    oEntry.FB_Type = "PEG"
                    oEntry.Status = "X"
                    console.log(oEntry);

                    var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/Z_RATEREFLECT_SRV/");
                    oModel.create('/FeedbacksSet', oEntry, null, function(){
                        oView.getModel().refresh();
                        },function(){
                        console.log("no");

                    });

                }
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("UserStart");
            }


        });
    });
