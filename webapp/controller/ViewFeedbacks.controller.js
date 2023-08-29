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

        return Controller.extend("ratereflect.controller.ViewFeedbacks", {
            onInit: function () {

                // Create a JSON model for your view
            var oViewModel = new JSONModel();
            this.getView().setModel(oViewModel, "viewModel");

            // Create an OData model
            var oODataModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_RATEREFLECT_SRV/");

            // Apply filter
            var oFilter = new Filter("Feedback_ID", FilterOperator.EQ, 28);

            // Fetch filtered data
            oODataModel.read("/FeedbacksSet", {
                filters: [oFilter],
                success: function (oData, oResponse) {
                    // Populate the JSON model with filtered data
                    oViewModel.setData({ FeedbacksSet: oData.results });
                },
                error: function (oError) {
                    // Handle errors
                }
        });

                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("ViewFeedbacks").attachPatternMatched(this._onObjectMatched, this);
            },
             _onObjectMatched: async function(){
                 var oView = this.getView();
              //   oView.setBusy(true);
            //     oView.getModel("viewModel").refresh();
            //      oView.byId("idProductsTable").getBinding("items").attachEvent("dataReceived", function(oEvent){
            //          this.getView().setBusy(false);
            //      }.bind(this));
             }
    });
});
