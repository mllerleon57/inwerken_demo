sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ui/demo/basicTemplate/model/models",
	"sap/ui/model/json/JSONModel"
], function(UIComponent, Device, models,JSONModel) {
	"use strict";

	return UIComponent.extend("sap.ui.demo.basicTemplate.Component", {

		metadata: {
			manifest: "json"
		},
		
		/**
		 * !!!!!!! SAPUI5 bug - lists cannot be same length with drag and drop - or it cuts them, when elements have been dragged !!!!!!!
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			//init msg callbacks array
			// this.wsSensor={cbArray:[]}
			var oData = {
				allSolved:false,
				lists:[
					{
						id:0,
						name:"Algorithmus - Milchreis kochen",
						title:"Milchreis kochen",
						data:[
							{name:"Go_shopping(Milch)",order:[1,2],correct:true},
							{name:"Go_shopping(Milchreis)",order:[1,2],correct:true},
							{name:"Insert(Milch)",order:3,correct:true},
							{name:"Cook(Milch)",order:4,correct:true},
							{name:"Insert(Milchreis)",order:5,correct:true},
							{name:"Cook(Milchreis)",order:6,correct:true},
							{name:"Taste()",order:7,correct:true},
							{name:"Eat()",order:8,correct:true}	
						],
						difficulty:"⭐⭐⭐⭐",
						solved:false,
						gameMode:"sortandorder",
						instruction:"Verschiebe die richtigen Einträge von links nach rechts. Achtung: Die Reihenfolge ist entscheidend!"
					},
					{
						id:1,
						name:"Quiz: Wie werde ich Inwerker/Inwerkerin",
						title:"Wie werde ich Inwerker/Inwerkerin?",
						data:[
							{name:"Take(Bewerbungfoto)",order:1,correct:true},
							{name:"Write(Bewerbung)",order:2,correct:true},
							{name:"Send(Bewerbung)",order:3,correct:true},
							{name:"Wait()",order:[4,6],correct:true},
							{name:"Have(Vorstellungsgespräch)",order:5,correct:true},
							{name:"Wait()",order:[4,6],correct:true},
							{name:"Sign(Vertrag)",order:7,correct:true},
							{name:"Start(Karriere)",order:8,correct:true},
							{name:"Write(Liebesbrief)",order:null,correct:false},
							{name:"Take(Selfie)",order:null,correct:false}
						],
						difficulty:"⭐",
						solved:false,
						gameMode:"sortandorder",
						instruction:"Verschiebe die richtigen Einträge von links nach rechts. Achtung: Die Reihenfolge ist entscheidend!"
					},
					{
						id:2,
						name:"Programmiersprachen",
						title:"Programmiersprache: Ja oder nein?",
						data:[
							{name:"C++",order:1,correct:true},
							{name:"Java",order:2,correct:true},
							{name:"Basic",order:3,correct:true},
							{name:"JavaScript",order:4,correct:true},
							{name:"ABAP",order:5,correct:true},
							{name:"Chinesisch",order:null,correct:false},
							{name:"Suaheli",order:null,correct:false},
						],
						difficulty:"⭐⭐",
						solved:false,
						gameMode:"select",
						instruction:"Kreuze die Einträge an, die eine Programmiersprache sind. (Tipp: Wenn Du nicht weiter kommst, benutze das Ausschlussverfahren)",
						
					},
					{
						id:3,
						name:"Algorithmus - Kanban Bedarfsermittlung",
						title:"Ermittlung von Bedarfen im Kanban System",
						data:[
							{name:"program kanban.",order:1,correct:true},
							{name:"if amount < 3",order:2,correct:true},
							{name:"message('Behälter nachfüllen')",order:3,correct:true,intend:1},
							{name:"endif.",order:4,correct:true},
							{name:"end program kanban.",order:5,correct:true}
						],
						difficulty:"⭐⭐⭐",
						solved:false,
						gameMode:"sortandorder",
						instruction:"Kanban ist eine Methode um Prozesse zu steuern, in diesem Fall das Nachfüllen von Behältern mit Materialien in einer Fabrik. Ein Fabrikarbeiter entnimmt ständig Material aus einem Behälter und du bist dafür zuständig, rechtzeitig für Nachschub zu sorgen. Bringe dafür die Codeschnippsel in die Richtige Reihenfolge.",
						formatCode:true
					},
					{
						id:4,
						name:"Datenbanken",
						title:"Datenbank: Ja oder nein?",
						data:[
							{name:"MySQL ",order:1,correct:true},
							{name:"MongoDB",order:2,correct:true},
							{name:"SAP HANA",order:3,correct:true},
							{name:"Java",order:4,correct:false},
							{name:"C++",order:5,correct:false},
							{name:"Hummus",order:6,correct:false},
						],
						difficulty:"⭐⭐",
						solved:false,
						gameMode:"select",
						instruction:"Kreuze die Einträge an, die eine Programmiersprache sind. (Tipp: Wenn Du nicht weiter kommst, benutze das Ausschlussverfahren).",
					
					},
					// {
					// 	id:5,
					// 	name:"Algorithmus - Schaltjahr",
					// 	title:"Welches Jahr ist ein Schaltjahr?",
					// 	data:[
					// 		{name:"program schaltjahr.",order:1,correct:true},
					// 		{name:"if 4 Teiler von Eingabe",order:2,correct:true},
					// 		{name:"if 100 Teiler von Eingabe",order:3,correct:true,intend:1},
					// 		{name:"if 400 Teiler von Eingabe",order:4,correct:true, intend:2},
					// 		{name:"print(Eingabe ist ein Schaltjahr)",order:5,correct:true,intend:3},
					// 		{name:"else print(Eingabe ist kein Schaltjahr)",order:6,correct:true,intend:2},
					// 		{name:"endif",order:7,correct:true,intend:2},
					// 		{name:"else print(Eingabe ist kein Schaltjahr)",order:8,correct:true,intend:1},
					// 		{name:"endif.",order:9,correct:true,intend:1},
					// 		{name:"else print(Eingabe ist kein Schaltjahr)",order:10,correct:true},
					// 		{name:"endif.",order:11,correct:true},
					// 		{name:"end program schaltjahr.",order:12,correct:true}
					// 	],
					// 	difficulty:"⭐⭐⭐⭐⭐",
					// 	solved:false,
					// 	gameMode:"schaltjahr",
					// 	instruction:"Ein Schaltjahr lässt sich anhand einer Formel ausrechnen. Dazu wirst du in dieser Aufgabe ein Programm schreiben. Die Formel dazu lautet: Ist die Jahreszahl durch vier teilbar, aber nicht durch 100, ist es ein Schaltjahr. 2008 fällt unter diese Regel. Ist die Jahreszahl durch 100 teilbar, aber nicht durch 400, ist es kein Schaltjahr. 2100 wird kein Schaltjahr sein. Ist die Jahreszahl durch 400 teilbar, dann ist es ein Schaltjahr. Deshalb war das Jahr 2000 ein Schaltjahr.",
					// 	formatCode:true
					// }
				]
			}

			//setting JsonModel to external file - make onAfterRendering fire before list is rendered.
			// var oModel = new JSONModel("model/gameData.json");
			var oModel = new JSONModel(oData);
			this.setModel(oModel);		

			this.getRouter().initialize()

			// starting websockets
			// this.startWs()
			// set the device model
			
		},

		//attaches callback to ws.onmessage event
		attachWsCallback(cb){
			// this.wsSensor.cbArray.push(cb) 
			// return this.wsSensor
		},
		// starts ws connection
		startWs(){
			// this.wsSensor.websocket = new WebSocket("ws://10.10.20.100:1880/kola/ws")
			// this.wsSensor.websocket.onopen = () => {
			// 	console.log("WS connection open")
			// }
			// this.wsSensor.websocket.onmessage = msg => {

			// 	this.handleWsMessage(msg)

			// 	this.wsSensor.cbArray.forEach(cb => {
			// 		cb(msg)
			// 	})
			// }
		},
		//transforms ws message. Adds msg.usedSensors - based on allowed sensors list. Sensor is used when it's "down". 
		handleWsMessage:function(incomingMsg){
		// 	let aSensorsUp = []
		// 	let msg = JSON.parse(incomingMsg.data).message.msg
		// 	let aAllowedSensors = ["RFAZ4DQt_0"]
		// 	console.log(msg)

		// 	let aSensors = msg.packetJson.io;
		// 	let sUnit = msg.sourceUnit.js.code

		// 	aSensors.forEach((sensor,index) => {
		// 		let sEntryName = createNameForEntry(sUnit,index)
				
		// 		if(index>1) return

		// 		if(sensor.level === true) {
		// 			handleSensorTrue(sensor,sEntryName)
		// 		} else {
		// 			handleSensorFalse(sensor,sEntryName)
		// 		}
		// 	});


		// 	function handleSensorTrue(oSensor,sEntryName){
		// 		!aSensorsUp.includes(sEntryName) && aAllowedSensors.includes(sEntryName) && aSensorsUp.push(sEntryName) 
		// 	}

		// 	function handleSensorFalse(oSensor,sEntryName){
		// 		aSensorsUp.includes(sEntryName) && aSensorsUp.splice(aSensorsUp.indexOf(sEntryName),1)
		// 	}

		// 	function createNameForEntry(sUnit,iPosition){
		// 		return sUnit+"_"+iPosition
		// 	}
		// 	//tu zmienic
		// 	incomingMsg.isBoxEmpty = aSensorsUp.length === 1; 
		// 	console.log(aSensorsUp)
		// 	return msg
		}
	});
});