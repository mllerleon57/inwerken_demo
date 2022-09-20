sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/demo/basicTemplate/model/formatter"],
  function (Controller, formatter) {
    "use strict";

    return Controller.extend("sap.ui.demo.basicTemplate.controller.Main", {
      formatter: formatter,

      onInit: function () {},
      sendMail: function () {
        const mailAdress = this.byId("mailInput").getValue();
        sap.m.URLHelper.triggerEmail(mailAdress, "Hier sind Deine Infos der Inwerken AG, schön dass du bei uns warst!", "Infos")

		sap.m.MessageToast("Vielen Dank, wir haben Dir eine E-Mail mit allen Informationen gesendet!")
		this.byId("mailInput").setValue("")
      },
    });
  }
);
