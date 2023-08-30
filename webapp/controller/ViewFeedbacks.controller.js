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

        return Controller.extend("ratereflect.controller.ViewFeedbacks", {
            _onObjectMatched: async function(){
                var oView = this.getView();
                // oView.setBusy(true);
                // oView.getModel("viewModel").refresh();
                // oView.byId("idProductsTable").getBinding("items").attachEvent("dataReceived", function(oEvent){
                //     this.getView().setBusy(false);
                // }.bind(this));
            },
            onInit: function () {
            // Creating a JSON model for your view
            var oViewModel = new JSONModel();
            this.getView().setModel(oViewModel, "viewModel");
            // Creating an OData model
            var oODataModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_RATEREFLECT_SRV/");
            // Applying filter
            //var oUserId = sap.ui.getCore().getModel("userDetailsModel").getData()[0].User_ID;
            var oUserId =1;
            if(received){
                var oFilter = new Filter("Receiver", FilterOperator.EQ, oUserId);
            }else if(sent){
                var oFilter = new Filter("Sender", FilterOperator.EQ, oUserId);
            }
              
            // Fetching filtered data
            oODataModel.read("/FeedbacksSet", {
                filters: [oFilter],
                success: function (oData, oResponse) {
                    // Populate the JSON model with filtered data
                    oViewModel.setData({ FeedbacksSet: oData.results });
                    //oView.setBusy(false);
                },
                error: function (oError) {
                    // Handle errors
                }
        });
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("ViewFeedbacks").attachPatternMatched(this._onObjectMatched, this);
            },

            onReceivedPress: function () {
                received= true;
                sent = false;
                model.refresh(true);
            },
            onSentPress: function () {
                received= false;
                sent = true;
                model.refresh(true);
            }
    });
});
