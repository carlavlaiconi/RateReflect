sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("ratereflect.controller.Feedback", {
            onInit: function () {

                // Create a JSON model for your view
            var oViewModel = new JSONModel();
            this.getView().setModel(oViewModel, "viewModel");

            // Create an OData model
            // 
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("Feedback").attachPatternMatched(this._onObjectMatched, this);
            // Apply filter
            var oFilter = new Filter("Feedback_ID", FilterOperator.EQ, 12);

            // Fetch filtered data
  

                // var oRouter = this.getOwnerComponent().getRouter();
                // oRouter.getRoute("Feedback").attachPatternMatched(this._onObjectMatched, this);
            },
            onSelectChange: function (oEvent) {
                var selectedItem = oEvent.getParameter("selectedItem");
                var selectedKey = selectedItem.getKey();
                var selectedText = selectedItem.getText();
          
                // Handle the selected item
              },
            
            onProfilePress: function() {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("UserInfo"); // "secondPage" is the name of the route defined in manifest.json
              },

            // onAfterRendering: function(){
            //     this.getView().setBusy(false);
            // },
            _onObjectMatched: async function(oEvent){
                var oArgs = oEvent.getParameter("arguments");
                var oView = this.getView();
           
                var oODataModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_RATEREFLECT_SRV/");
                var oFilter = new Filter("Feedback_ID", FilterOperator.EQ, oArgs.fb_id);
                oODataModel.read("/FeedbacksSet", {
                 filters: [oFilter],
                success: function (oData) {
                    // Populate the JSON model with filtered data
                    // if (oData && oData.results && oData.results.length > 0) {
                    //     // Populate the JSON model with filtered data
                    //     oViewModel.setProperty("/FeedbacksSet", oData.results);
                    //   }
                    oView.getModel("viewModel").setData({ FeedbacksSet: oData.results });
                },
                error: function (oError) {
                    // Handle errors
                }
        });
            }
        });
    });