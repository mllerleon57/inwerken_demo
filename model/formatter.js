sap.ui.define([], function () {
	"use strict";
	return {
		gameMode: function (sValue) {
			
			
			if(sValue === "select") return "Select"
			if(sValue === "sortandorder") return "Sort"
			if(sValue === "schaltjahr") return "Schaltjahr"

		}

	};
});