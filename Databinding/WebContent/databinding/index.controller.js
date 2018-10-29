sap.ui.controller("databinding.index", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf databinding.index
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf databinding.index
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf databinding.index
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf databinding.index
*/
//	onExit: function() {
//
//	}
	createFunction: function(){
		var oCreateDialog = new sap.m.Dialog();
		oCreateDialog.setTitle("Create New Product");
		
		var oTableCount = sap.ui.getCore().byId('table').getBinding('items').getLength()
		
		var oSimpleForm = new sap.ui.layout.form.SimpleForm({
			maxContainerCols: 2,
			content: [
				new sap.m.Label({text: "product ID"}),
				new sap.m.Input({value: oTableCount,
								editabled: false}),
				
				new sap.m.Label({text: "Product Name"}),
				new sap.m.Input({value: ""}),
				
				new sap.m.Label({text: "Product Description"}),
				new sap.m.Input({value: ""}),
				
				new sap.m.Label({text: "Rating"}),
				new sap.m.RatingIndicator({value: 0}),
				
				new sap.m.Label({text: "Price"}),
				new sap.m.Input({value: ""})
			]
		});
		oCreateDialog.addContent(oSimpleForm);
		oCreateDialog.addButton(
				new sap.m.Button({
					text: "Save",
					icon: "sap-icon://save",
					press: function(){
						var content = oSimpleForm.getContent();
						var oEntry = {
								"odata.type":"ODataDemo.FeaturedProduct",
								"ID":content[1].getValue(),
								"Name":content[3].getValue(),
								"Description":content[5].getValue(),
								"ReleaseDate":"1982-12-31T00:00:00",
								"DiscountedDate":null,
								"Rating":content[7].getValue(),
								"Price":content[9].getValue(),
								
						}
						
						$.ajax({
							type: "POST",
							url: 'proxy/http/services.odata.org/V3/(S(javsoqela2hqsduwyhasapr2))/OData/OData.svc/Products',
							dataType: "json",
							data: JSON.stringify(oEntry),
							contentType:"application/json",
							success: function(){
								sap.m.MessageToast.show("Product Added Successfully");
								oCreateDialog.close();
								sap.ui.getCore().byId("table").getModel().refresh(true);
							},
							error: function(){
								new sap.m.MessageToast.show("Error while adding product");
							}
						})
					}
				})
		)
		oCreateDialog.open();
	}

});