sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel, Filter, FilterOperator) {
        "use strict";
        var received= true;
        var sent = false;
        var oUserId = 3;

        return Controller.extend("ratereflect.controller.ViewFeedbacks", {
            _onObjectMatched: async function(){
                var oView = this.getView();
                // oView.setBusy(true);
                // oView.getModel("viewModel").refresh();
                // oView.byId("idProductsTable").getBinding("items").attachEvent("dataReceived", function(oEvent){
                //     this.getView().setBusy(false);
                // }.bind(this));

                var oFilter = new sap.ui.model.Filter({
                    path: "Sender", 
                    operator: 'EQ', 
                    value1: oUserId 
                }); 
                oView.byId("idProductsTableSent").getBinding("items").filter([oFilter]);

                var oFilter2 = new sap.ui.model.Filter({
                    path: "Receive", 
                    operator: 'EQ', 
                    value1: oUserId 
                }); 
                oView.byId("idProductsTableReceived").getBinding("items").filter([oFilter2]);


                oView.getModel().refresh();


            },
            onInit: function () {
            // Creating a JSON model for your view
            var oViewModel = new JSONModel();
            this.getView().setModel(oViewModel, "viewModel");
            // Creating an OData model
            var oODataModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_RATEREFLECT_SRV/");
            // Applying filter
            //var oUserId = sap.ui.getCore().getModel("userDetailsModel").getData()[0].User_ID;
            //var oUserId = 3;
            // Fetching filtered data
            // oODataModel.read("/FeedbacksSet", {
            //     filters: [oFilter],
            //     success: function (oData, oResponse) {
            //         // Populate the JSON model with filtered data
            //         oViewModel.setData({ FeedbacksSet: oData.results });
            //         //oView.setBusy(false);
            //     },
            //     error: function (oError) {
            //         // Handle errors
            //     }
            //});
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("ViewFeedbacks").attachPatternMatched(this._onObjectMatched, this);
            },

            onReceivedPress: function () {
                this.getView().byId("ReceivedFeedbackPanel").setVisible(true);
                this.getView().byId("SentFeedbacksPanel").setVisible(false);
            
            },
            onSentPress: function () {
                this.getView().byId("ReceivedFeedbackPanel").setVisible(false);
                this.getView().byId("SentFeedbacksPanel").setVisible(true);
            }
    });
});
