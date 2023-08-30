sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("ratereflect.controller.ViewFeedbacks", {
           
            onInit: function () {
            // Creating a JSON model for your view
            var oViewModel = new JSONModel();
            this.getView().setModel(oViewModel, "viewModel");
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("ViewFeedbacks").attachPatternMatched(this._onObjectMatched, this);
                
            },
            _onObjectMatched: async function(){
                var oView = this.getView();

                var oFilter = new sap.ui.model.Filter({
                    path: "Sender", 
                    operator: 'EQ', 
                    value1: sap.ui.getCore().getModel("userDetailsModel").getData()[0].User_ID 

                }); 
                oView.byId("idProductsTableSent").getBinding("items").filter([oFilter]);

                var oFilter2 = new sap.ui.model.Filter({
                    path: "Receiver", 
                    operator: 'EQ', 
                    value1: sap.ui.getCore().getModel("userDetailsModel").getData()[0].User_ID 
                }); 
                oView.byId("idProductsTableReceived").getBinding("items").filter([oFilter2]);
                oView.getModel().refresh();


            },

            onReceivedPress: function () {
                this.getView().byId("ReceivedFeedbackPanel").setVisible(true);
                this.getView().byId("SentFeedbacksPanel").setVisible(false);
            
            },
            onSentPress: function () {
                this.getView().byId("ReceivedFeedbackPanel").setVisible(false);
                this.getView().byId("SentFeedbacksPanel").setVisible(true);
            },
            selRow: function(oEvent){
                var oClickedItem = oEvent.getSource();
                var sFeedbackID = oClickedItem.getBindingContext().getObject().Feedback_ID;
                var oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("Feedback", {
                        fb_id : sFeedbackID
                    });
                
            }
    });
});