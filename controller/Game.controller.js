sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/demo/basicTemplate/model/formatter",
    "sap/ui/model/Sorter",
    "sap/ui/model/json/JSONModel",
  ],
  function (Controller, formatter, Sorter, JSONModel) {
    "use strict";
    return Controller.extend("sap.ui.demo.basicTemplate.controller.Game", {
      formatter: formatter,

      onInit: function () {
        //open dialog callback
        this.getOwnerComponent().attachWsCallback((msg) => {
          //continue only if number of used sensors changed
          // if(this.getView().getModel("viewModel").getProperty("/tries")===msg.usedSensors) return false

          // this.getView().getModel("viewModel").setProperty("/tries",msg.usedSensors)

          let modalOn = this.getView()
            .getModel("viewModel")
            .getProperty("/modalOn");
          let kanbanMode = this.getView()
            .getModel("viewModel")
            .getProperty("/kanbanMode");

          //prevent opening modal when modal is already open or where kanban mode is set to off.
          if (modalOn || !kanbanMode) return false;

          //dont know if needed ??
          if (!msg.isBoxEmpty) return false;

          this.onButtonPress();
        });

        this.getOwnerComponent().attachWsCallback((msg) => {
          let modalOn = this.getView()
            .getModel("viewModel")
            .getProperty("/modalOn");
          let kanbanMode = this.getView()
            .getModel("viewModel")
            .getProperty("/kanbanMode");

          if (!modalOn || !kanbanMode) return false;

          if (msg.isBoxEmpty) return false;
          //tu zmienic!
          this._closeModals();
          this.getView().getModel("viewModel").setProperty("/modalOn", false);
        });

        this.oModel = new JSONModel({
          kanbanMode: false,
          solved: 0,
          tries: 6,
          modalOn: false,
          gameMode: "sort",
        });
        this._handleSortableUpdate = this._handleSortableUpdate.bind(this);

        //default setting - changes based on game type
        this._handleGameMode = this._areBoxesInRightOrder;
        this.getView().setModel(this.oModel, "viewModel");
        let oRouter = sap.ui.core.UIComponent.getRouterFor(this);

        this.formatCode = false;

        oRouter
          .getRoute("game")
          .attachPatternMatched(this._onObjectMatched, this);
        this.getOwnerComponent();
      },

      onAfterRendering: function () {
        // this._handleListSorting()
        // $(".h-100>ul").sortable({
        //     connectWith : ".ui-sortable",
        //     update:(event,ui)=>{}
        // }).disableSelection();
      },

      onButtonPress: function () {
        let oView = this.getView();
        let sProperty = this.getView().getBindingContext().getProperty("title");
        let aData = oView.getModel().getData();
        let iIndex = aData.lists.findIndex((el) => el.name === sProperty);

        //checking if solved
        if (this._handleGameMode()) {
          oView.getModel("viewModel").setProperty("/solved", 1);
          oView
            .getModel()
            .setProperty(
              `${this.getView().getBindingContext().getPath()}/solved`,
              true
            );
          this._checkIfAllSolved();
        }

        //checking if kanbanMode is on and if tries === 0
        // if (this._handleKanbanGameOver()) return false

        //checking if other modal is open
        if (oView.getModel("viewModel").getProperty("/modalOn") === true)
          return false;
        //open dialog

        let oDialog =
          oView.getModel("viewModel").getProperty("/kanbanMode") === true
            ? this._openKanabanDialog()
            : this._openStandardDialog();
        oView.getModel("viewModel").setProperty("/modalOn", true);

        //it uses local view model solved property - on route change it resets to unsolved but master list remain solved  !!!!!
        //
        let solved = oView.getModel("viewModel").getProperty("/solved");

        //
        if (solved === 0) {
          oDialog.addStyleClass("unsolved-list");
          oDialog.removeStyleClass("solved-list");
        } else {
          oDialog.addStyleClass("solved-list");
          oDialog.removeStyleClass("unsolved-list");
        }
        oDialog.open();
      },
      _openStandardDialog() {
        let oDialog = this.getView().byId("resultDialog");
        if (!oDialog) {
          // create dialog via fragment factory
          oDialog = sap.ui.xmlfragment(
            this.getView().getId(),
            "sap.ui.demo.basicTemplate.view.ResultDialog",
            this
          );
          this.getView().addDependent(oDialog);
        }
        return oDialog;
      },
      _openKanabanDialog() {
        let oDialog = this.getView().byId("kanbanResultDialog");
        if (!oDialog) {
          // create dialog via fragment factory
          oDialog = sap.ui.xmlfragment(
            this.getView().getId(),
            "sap.ui.demo.basicTemplate.view.KanbanResultDialog",
            this
          );
          this.getView().addDependent(oDialog);
        }
        return oDialog;
      },

      _onObjectMatched: function (oEvent) {
        let path = oEvent.getParameter("arguments").gameId;
        // this.getView().bindElement({
        // 	path: "/"+path,
        // 	model:"lists"
        // });

        $(".list2>ul").empty();

        this.getView().getModel("viewModel").setProperty("/solved", 0);
        var oObjectListItem = new sap.m.ObjectListItem({
          title: "{name}",
          class: "intend_1",
        }).addStyleClass("list-item");

        // oObjectListItem.addStyleClass("intend_1")

        // this.getView().byId("lb1-listUl").bindAggregation("items", "/lists/"+ path + "/data", oObjectListItem)
        this.getView()
          .byId("lb1-listUl")
          .bindElement("/lists/" + path);

        // this.getView().byId("mainGameTitle").bindElement("/lists/"+ path)
        // this.getView().byId("objectHeader1").bindElement("/lists/"+ path)
        this.getView().bindElement("/lists/" + path);

        let gameMode = this.getView()
          .getModel()
          .getProperty(`/lists/${path}/gameMode`);
        this.formatCode = this.getView()
          .getModel()
          .getProperty(`/lists/${path}/formatCode`);

        // this._handleGameMode = gameMode === "sort" ? this._areBoxesInRightOrder : this._areCorrectBoxesSelected

        switch (gameMode) {
          case "sort":
            this._handleGameMode = this._handleSortGameMode;
            break;
          case "select":
            this._handleGameMode = this._handleSelectGameMode;
            break;
          case "sortandorder":
            this._handleGameMode = this._handleSortAndSelectGameMode;
            break;
          case "schaltjahr":
            this._handleGameMode = this._handleSchaltjahrGameMode;
        }
      },
      //resets models
      onDialogReset: function () {
        window.location.reload();
      },

      onDialogPress: function () {
        //add kanban mode handling - handler that fires when kanban mode is on and when dialog is open

        this._closeModals();
        this.getView().getModel("viewModel").setProperty("/modalOn", false);
      },
      //fires when list update starts - i do random sorting of list items here
      onUpdateStarted: function () {
        this._handleListSorting();
      },

      //fires after list received data - only then lists are accessible for JQuery
      onUpdateFinished: function () {
        //temporary solution ?
        $(".h-100>ul")
          .sortable({
            connectWith: ".ui-sortable",
            update: this._handleSortableUpdate,
          })
          .disableSelection();

        //clearing second list

        $(".list2>ul").empty();
      },

      //check if all algorithms are solved - then set allSolved to true
      _checkIfAllSolved: function () {
        let aLists = this.getView().getModel().getData().lists;
        let aUnsolved = aLists.filter((el) => el.solved === false);
        if (aUnsolved.length < 1) {
          this.getView().getModel().setProperty("/allSolved", true);
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.navTo("gameEnd");
        }
      },
      //kanaban mode switch handler
      onSwitchChange: function (oEvent) {
        let state = oEvent.getSource().getProperty("state");
        this.getView().getModel("viewModel").setProperty("/kanbanMode", state);
        console.log(
          this.getView().getModel("viewModel").getProperty("/kanbanMode")
        );
      },

      //solution check for "sort" game mode
      _areBoxesInRightOrder: function () {
        let aData = this.getView().byId("lb1-listUl").getBinding("items").oList;
        const oModel = this.getOwnerComponent().getModel();
        const sortedItems = [
          ...document.querySelectorAll(".list2 .list-item"),
        ].map((el) => el.textContent);

        let result = aData.reduce((acc, el, index) => {
          // let foundIndex = sortedItems.findIndex(element => element === el.name)
          let foundIndex = [];
          for (let [ind, val] of sortedItems.entries()) {
            if (val === el.name) foundIndex.push(ind);
          }

          //if no index - item is correct!
          if (aData[index].order === null) return acc;

          //adding 1 to index because order starts with 1
          let isCorrectOrder = Array.isArray(aData[index].order)
            ? // ? aData[index].order.includes(foundIndex+1)
              //czy to jest okej ???????
              foundIndex.some((el3) => {
                return aData[index].order.includes(el3 + 1);
              })
            : foundIndex.some((el3) => {
                return aData[index].order === el3 + 1;
              });

          if (foundIndex === -1 || !isCorrectOrder) {
            return false;
          }

          return acc;
        }, true);

        return result;
      },

      //solution check for "select" game mode
      _areCorrectBoxesSelected: function () {
        let aData = this.getView().byId("lb1-listUl").getBinding("items").oList;
        const oModel = this.getOwnerComponent().getModel();
        const selectedItems = [
          ...document.querySelectorAll(".list2 .list-item"),
        ].map((el) => el.textContent);

        let trueValues = aData
          .filter((el) => el.correct === true)
          .map((el) => el.name);

        let resultArray = selectedItems.filter((el) => trueValues.includes(el));
        //first check if all true values are selected. second check - if there arent any falsly selected items
        return (
          resultArray.length === trueValues.length &&
          trueValues.length === selectedItems.length
        );
      },

      _handleSelectGameMode: function () {
        const data = this.getView().getBindingContext().getProperty("data")
        const trueValues = data
        .filter((el) => el.correct === true)
        .map((el) => el.name)

        const selectedItems = data
        .filter((el) => el.selected === true)
        .map((el) => el.name)

        const resultArray = selectedItems.filter((el) => trueValues.includes(el));
        
        //first check if all true values are selected. second check - if there arent any falsly selected items
        return (
          resultArray.length === trueValues.length &&
          trueValues.length === selectedItems.length
        );
        // return this._areCorrectBoxesSelected();
      },

      _handleSortGameMode: function () {
        return this._areBoxesInRightOrder();
      },

      _handleSortAndSelectGameMode: function () {
        return this._areBoxesInRightOrder() && this._areCorrectBoxesSelected();
      },

      _handleSchaltjahrGameMode: function () {
        //TODO tu zmienic
        let isCorrect = this._handleSortAndSelectGameMode();
        if (!isCorrect) return false;

        let isLeapYear = this._isYearInputCorrect();
        if (!isLeapYear) {
          this._openWrongYearModal();
          return false;
        }
        return true;
        // return this._areBoxesInRightOrder() && this._areCorrectBoxesSelected() && this._isYearInputCorrect()
      },
      _handleListSorting: function () {
        let oBinding = this.getView().byId("lb1-listUl").getBinding("items");
        let oList = oBinding.oList;
        //array list with length
        // random sort
        //compare
        let randomizedArray = this._shuffleArray(
          oList.map((el, ind) => el.name.toUpperCase())
        );

        let myComparator = (a, b) => {
          return randomizedArray.indexOf(a) > randomizedArray.indexOf(b)
            ? 1
            : -1;
        };
        let oSorter = new Sorter("name");
        oSorter.fnCompare = myComparator;

        oBinding.sort(oSorter);
      },
      _shuffleArray: function (array) {
        var currentIndex = array.length,
          temporaryValue,
          randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      },
      _handleSortableUpdate: function (e, ui) {
        if (!this.formatCode) return true;
      },

      _isYearInputCorrect: function () {
        let year = this.getView().byId("schaltjahrInput").getValue();
        let result = !year
          ? false
          : (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
        return result;
      },
      _openWrongYearModal: function () {
        let oDialog = this.getView().byId("WrongYearDialog");
        if (!oDialog) {
          // create dialog via fragment factory
          oDialog = sap.ui.xmlfragment(
            this.getView().getId(),
            "sap.ui.demo.basicTemplate.view.WrongYearDialog",
            this
          );
          this.getView().addDependent(oDialog);
        }
        this.getView().getModel("viewModel").setProperty("/modalOn", true);
        oDialog.open();
        oDialog.removeStyleClass("solved-list");
        oDialog.removeStyleClass("unsolved-list");

        return oDialog;
      },
      _closeModals: function () {
        let resultDialog = this.getView().byId("resultDialog");
        resultDialog && resultDialog.close();

        let kanbanResultDialog = this.getView().byId("kanbanResultDialog");
        kanbanResultDialog && kanbanResultDialog.close();

        let wrongYearDialog = this.getView().byId("WrongYearDialog");
        wrongYearDialog && wrongYearDialog.close();
      },
      onChange(e) {
        console.log("change");
      },
    });
  }
);
