sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
	"sap/ui/Device",
	"sap/base/Log"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment, MessageToast, Device, Log) {
        "use strict";

        return Controller.extend("ratereflect.controller.UserStart", {
            onInit: function () {
                var oModel = new JSONModel();
                this.getView().setModel(oModel, "CatalogModel");
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("UserStart").attachPatternMatched(this._onObjectMatched, this);
                var oRouters = sap.ui.core.UIComponent.getRouterFor(this);
                // this.getSplitAppObj().setHomeIcon({
                //     'phone': 'phone-icon.png',
                //     'tablet': 'tablet-icon.png',
                //     'icon': 'desktop.ico'
                // });
                // Device.orientation.attachHandler(this.onOrientationChange, this);
            },

            onProfilePress:function(){
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("UserInfo");
            },
            onFeedbackPress:function(){
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("Feedback");
            },
            _onObjectMatched: async function(){
                var oView = this.getView();
                var obj = oEvent.getParameter("arguments").details;
                // oView.setBusy(true);
                // oView.getModel("CatalogModel").refresh();
                //  oView.byId("idProductsTable").getBinding("items").attachEvent("dataReceived", function(oEvent){
                //      this.getView().setBusy(false);
                //  }.bind(this));
            },
            onExit: function () {
                Device.orientation.detachHandler(this.onOrientationChange, this);
            },
    
            onOrientationChange: function (mParams) {
                var sMsg = "Orientation now is: " + (mParams.landscape ? "Landscape" : "Portrait");
                MessageToast.show(sMsg, { duration: 5000 });
            },
    
            onPressNavToDetail: function () {
                this.getSplitAppObj().to(this.createId("detailDetail"));
            },
    
            onPressDetailBack: function () {
                this.getSplitAppObj().backDetail();
            },
    
            onPressMasterBack: function () {
                this.getSplitAppObj().backMaster();
            },
    
            onPressGoToMaster: function () {
                this.getSplitAppObj().toMaster(this.createId("master2"));
            },
    
            onListItemPress: function (oEvent) {
                var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
                this.getSplitAppObj().toDetail(this.createId(sToPageId));
            },
    
            onPressModeBtn: function (oEvent) {
                var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();
    
                this.getSplitAppObj().setMode(sSplitAppMode);
                MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, { duration: 5000 });
            },
    
            getSplitAppObj: function () {
                var result = this.byId("SplitAppDemo");
                if (!result) {
                    Log.info("SplitApp object can't be found");
                }
                return result;
            }
        });
    });