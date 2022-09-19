sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/demo/basicTemplate/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, formatter,Filter,FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.controller.Master", {

		formatter: formatter,

		onInit: function () {
			
		},
		onPress: function (oEvent) {
			// $(".list1>ul").empty()

			let oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			let aLists = this.getOwnerComponent().getModel().getProperty("/lists");

			let bindingContext = oItem.getBindingContext()
			
			let path = bindingContext.getPath()
			let obj = bindingContext.getModel().getProperty(path)
						
			// let index = aPages.findIndex(el => el.name===oItem.mProperties.title)
			oRouter.navTo("game", {
				gameId:obj.id
			});
		
			
		},
		onSearch:function (oEvent) {
			let aFilter = [];
			let sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("name", FilterOperator.Contains,sQuery));
			}
			
			let oList = this.byId("masterMenu");
			let oBinding = oList.getBinding("items");
			
			oBinding.filter(aFilter)
		},
		//click handler for hidden Cup Icon
		onGameEndPress:function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("gameEnd");
		}
	});
});