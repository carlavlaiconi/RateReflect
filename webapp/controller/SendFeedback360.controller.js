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

            var oViewModel = new JSONModel();
            this.getView().setModel(oViewModel, "viewModel");

            var oODataModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_RATEREFLECT_SRV/");
            var oFilter = new Filter("Feedback_ID", FilterOperator.EQ, 28);
            oODataModel.read("/FeedbacksSet", {
                filters: [oFilter],
                success: function (oData, oResponse) {
                    if (oData && oData.results && oData.results.length > 0) {
                        oViewModel.setProperty("/FeedbacksSet", oData.results);
                      }
                    oViewModel.setData({ FeedbacksSet: oData.results });
                },
                error: function (oError) {
                }
        });

                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("Feedback").attachPatternMatched(this._onObjectMatched, this);
            }
            
        });
    });