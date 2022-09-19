sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/demo/basicTemplate/model/formatter"
], function(Controller, formatter) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.controller.Main", {

		formatter: formatter,
        //controller for "ws - no credits left" event
		onInit: function () {
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			
			oRouter.getRoute("gameEnd").attachPatternMatched(this._onObjectMatched, this);   
        },
        onRestart:function(){
            window.location.reload();
        },
        _onObjectMatched:function(oEvent){
            
            let solved = this.getView().getModel().getProperty("/allSolved")
            if (solved===false){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("main");
            }

        }
    });
    
});