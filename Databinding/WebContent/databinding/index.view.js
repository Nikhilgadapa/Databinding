sap.ui.jsview("databinding.index", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf firstproject.shelltutorial
	*/ 
	getControllerName : function() {
		return "databinding.index";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf firstproject.shelltutorial
	*/ 
	onInit: function(){
		var oModel = new sap.ui.model.odata.ODataModel("proxy/http/services.odata.org/V3/(S(javsoqela2hqsduwyhasapr2))/OData/OData.svc/", false);
		
		oModel.oHeaders = {
				"DataServiceVersion":"3.0",
				"MaxDataServiceVersion":"3.0"
		}
		
		sap.ui.getCore().setModel(oModel);
	},
	createContent : function(oController) {
		var oModel = new sap.ui.model.odata.ODataModel("proxy/http/services.odata.org/V3/(S(javsoqela2hqsduwyhasapr2))/OData/OData.svc/", false);
		
		oModel.oHeaders = {
				"DataServiceVersion":"3.0",
				"MaxDataServiceVersion":"3.0"
		};
		var oTable = new sap.m.Table("table",{
			headerText: "Product List",
			columns : [new sap.m.Column({
							header: [new sap.m.Label({text: "Product ID"})]
							}),
					   new sap.m.Column({
						 header: [new sap.m.Label({text: "Product Name"})]  
					   }),
					   new sap.m.Column({
						   header: [new sap.m.Label({text: "Description"})]
					   }),
					   new sap.m.Column({
						   header: [new sap.m.Label({text: "Rating"})]
					   }),
					   new sap.m.Column({
						   header: [new sap.m.Label({text: "Price"})]
					   })
					  ]
		});
		
		oTable.setMode(sap.m.ListMode.SingleSelectMaster);
		oTable.bindItems("/Products", new sap.m.ColumnListItem("listItem",{
			cells: [
				new sap.m.Text({text: "{ID}"}),
				new sap.m.Text({text: "{Name}"}),
				new sap.m.Text({text: "{Description}"}),
				new sap.m.RatingIndicator({value: "{Rating}"}),
				new sap.m.Text({text: "{Price}"})
			]
		}));
		oTable.setModel(oModel);
		
		var oPage = new sap.m.Page({
			title: "Demo Test",
			content:[oTable],
			footer: [sap.m.Bar({
				design: sap.m.BarDesign.Footer,
				contentRight: [new sap.m.Button({
					icon: "sap-icon://create",
					text: "Create",
					type: sap.m.ButtonType.Accept,
					press: oController.createFunction
					}),
					new sap.m.Button({
						icon:"sap-icon://edit",
						text:"Edit",
						
					}),
					new sap.m.Button({
						icon:"sap-icon://delete",
						text:"Delete",
						type:sap.m.ButtonType.Reject
					})
				]
			})]
		});
		return oPage;
		
	}
	
	

});