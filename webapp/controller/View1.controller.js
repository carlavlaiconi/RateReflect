sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("ratereflect.controller.View1", {
            onInit: function () {

            },
            onLoginPress: function() {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("UserStart"); // "secondPage" is the name of the route defined in manifest.json
              }

        });
    });
