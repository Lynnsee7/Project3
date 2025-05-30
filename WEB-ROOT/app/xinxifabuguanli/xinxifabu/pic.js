ManageObj.doPic = function( flag , id ) {
	var leftPan = new Ext.Panel({
		frame : true,
		border : true,
		width : Math.floor( document.body.clientWidth * 0.95 * 0.5 ) ,
		height : Math.floor( document.body.clientHeight * 0.9 ) ,
		resizable : false,
		layout : 'fit',
		region : 'west',
		html:'<img id="showPic" style="margin-left:10px" src="" width="'+Math.floor( document.body.clientWidth * 0.95 * 0.5 - 40) +'" height="'+Math.floor( document.body.clientHeight * 0.95 - 40 )+'">'
	});
	
	var sm = new Ext.grid.CheckboxSelectionModel();
    sm.singleSelect = true ;
    
	ManageObj.picStore = new Ext.data.JsonStore({
		root : 'root',
		totalProperty : 'totalProperty',
		remoteSort : true,
		fields : [ 'id', 'picName', 'picPath' ],
		proxy : new Ext.data.HttpProxy({
			url : '/WEB-ROOT/app/xinxifabuguanli/xinxifabu.do',
			method : 'POST'
		}),
		baseParams : {
			flag : 'getPicJsonStore',
			id : id
		},
		autoLoad: true,
		listeners:{
			"load":function( store,records,o ){
				if( records != null && records.length > 0 ){
					var record=records[0];
					var picPath = record.get('picPath');
					picPath = picPath.substring( picPath.indexOf('/UploadFile') );
					document.all.showPic.src = picPath ;
				}
			}
		}
	});

	var pagingBar = new Ext.ux.MyPagingToolbar({
		pageSize : GLOBAL_MAX_PAGE_SIZE,
		store : ManageObj.picStore,
		displayMsg : '当前第{0}到{1}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共{2}条记录',
		emptyMsg : "没有找到任何记录！",
		displayInfo : true
	});

	var picGridPan = new Ext.grid.GridPanel({
		maximized : true,
		region : 'center',
		store : ManageObj.picStore,
		loadMask : true,
		bbar : pagingBar,
		border:true,
		frame:true,
		width:Math.floor( document.body.clientWidth * 0.95 * 0.6 ) - 15,
		height : Math.floor( document.body.clientHeight * 0.9 ) - 55,
		columns : [ sm, {
			header : '<font color="blue">图片名称</font>',
			align : 'center',
			dataIndex : 'picName'
		}],
		sm : sm,
		viewConfig : {
			forceFit : true,
			columnsText : '显示列',
			sortAscText : '升序',
			sortDescText : '降序'
		},
		stripeRows : true,
		tbar : [ {
				text : '新增图片',
				hidden : ((flag == "update") ? false : true),
				handler : function() {
					ManageObj.doAddPic( id );
				},
				icon : ADD_OPERATION_ICON_PATH
			},{
				text : '删除图片',
				hidden : ((flag == "update") ? false : true),
				handler : function() {
					ManageObj.doDelePic( picGridPan );
				},
				icon : LOCK_OPERATION_ICON_PATH
			}],
		listeners:{
			"rowclick":function( grid, rowIndex, columnIndex, e ){
				var record=grid.getSelectionModel().getSelected();
				var picPath = record.get('picPath');
				picPath = picPath.substring( picPath.indexOf('/UploadFile') );
				document.all.showPic.src = picPath ;
			}
		}
	});
	
	ManageObj.picWindow = new Ext.Window({
		maximized : true,
		autoScroll:true,
		modal : true,
		frame : true,
		border : true,
		title : '图片管理',
		labelAlign : 'center',
		buttonAlign : 'center',
		width : Math.floor( document.body.clientWidth * 0.95 ) ,
		height : Math.floor( document.body.clientHeight * 0.95 ) ,
		closable : true,
		closeAction : 'close',
		resizable : false,
		layout : 'border',
		items : [leftPan,picGridPan],
		tbar : [

			{
				text : '大图模式',
				handler : function() {
					picGridPan.hide();
					leftPan.setWidth(  Math.floor( document.body.clientWidth ) ) ;
					document.all.showPic.style.width = "100%";
					document.all.showPic.style.height = "100%";
				}
			},
			{
				text : '列表模式',
				handler : function() {
					picGridPan.show();
					leftPan.setWidth(  Math.floor( document.body.clientWidth * 0.95 * 0.5 ) ) ;
					document.all.showPic.style.width = Math.floor( document.body.clientWidth * 0.95 * 0.5 - 40);
					document.all.showPic.style.height = Math.floor( document.body.clientHeight * 0.95 - 40 );
				}
			}
		]
	});
			
	ManageObj.picWindow.addButton("返回",function(){
		ManageObj.picWindow.close();
	});
	
	ManageObj.picWindow.show();
	
	//var x = ManageObj.picWindow.getPosition( false )[0] ;
	//var y = Math.floor( ( RIGHT_SIDE_PAGE_HEIGHT - ManageObj.picWindow.getHeight() ) / 2 ) ;
	//ManageObj.picWindow.setPosition( x , y );
};

ManageObj.doAddPic = function( id ){
	ManageObj.uploadForm = new Ext.FormPanel({
		fileUpload : true,
		id : 'uploadForm',
		labelAlign : 'left',
		buttonAlign : 'center',
		bodyStyle : 'padding:0px;',
		frame : true,
		border : false,
		labelWidth : 75,
		items : [ {
			anchor : '100%',
			layout : 'column',
			labelSeparator : '：',
			labelAlign : 'right',
			items : [ {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'textfield',
					fieldLabel : '图片名称',
					name : 'uploadPicName',
					id : 'uploadPicName',
					anchor : '95%',
					allowBlank : false
				} ]
			}, {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'fileuploadfield',
					fieldLabel : '图片路径',
					name : 'uploadPicPath',
					id : 'uploadPicPath',
					anchor : '95%',
					buttonText : '浏览',
					allowBlank : false
				} ]
			}]
		} ]
	});
	
	ManageObj.uploadWindow = new Ext.Window({
		autoScroll:true,
		modal : true,
		frame : true,
		border : true,
		title : '上传管理',
		labelAlign : 'center',
		buttonAlign : 'center',
		width : Math.floor( document.body.clientWidth * 0.65 ) ,
		height : Math.floor( document.body.clientHeight * 0.3 ) ,
		closable : true,
		closeAction : 'close',
		resizable : false,
		layout : 'fit',
		items:[ManageObj.uploadForm]
	});
	
	ManageObj.uploadWindow.addButton("提交",function(){
		ManageObj.doAddPicSubmit( id );
	});
	
	ManageObj.uploadWindow.addButton("返回",function(){
		ManageObj.uploadWindow.close();
	});
	
	ManageObj.uploadWindow.show();
};

ManageObj.doDelePic = function( picGridPan ){
	var sm = picGridPan.getSelectionModel();
	var sel = sm.getSelections();
	var selCount = sm.getCount();
	if (selCount == 0) {
		Ext.Msg.show({
			title : '温馨提示！',
			buttons : Ext.MessageBox.OK,
			msg : '没有可以删除的图片，请选择！',
			icon : Ext.MessageBox.ERROR
		});
		return;
	}
	
	var id = sel[0].data["id"];
	var picPath = sel[0].data["picPath"];
	
	Ext.MessageBox.confirm('温馨提醒！', '确认需要删除所选图片吗？', function(info) {
		if (info == "yes") {
			Ext.Ajax.request({
				waitMsg : '数据提交中......',
				url : '/WEB-ROOT/app/xinxifabuguanli/xinxifabu.do',
				method : 'POST',
				success : function(response, options) {
					var responseArray = Ext.util.JSON.decode(response.responseText);
					Ext.MessageBox.show({
						title : '温馨提醒！',
						msg : responseArray.msg,
						buttons : Ext.MessageBox.OK,
						fn : function() {
							ManageObj.picStore.reload();
						},
						icon : Ext.MessageBox.INFO
					});
				},
				failure : function(response, options) {
					Ext.MessageBox.alert('温馨提醒！', responseArray.msg);
				},
				params : {
					flag : "doDelePic",
					id : id,
					picPath : picPath
				}
			});
		}
	});
	
};


ManageObj.doAddPicSubmit = function( id ) {
	/* Ext表单验证 */
	if (!ManageObj.uploadForm.getForm().isValid()) {
		Ext.MessageBox.alert(WARRING_WIN_TITLE, "输入项有误！请修改红色线提示处！");
		return;
	}
	
	/* form表单提交 */
	ManageObj.uploadForm.getForm().submit({
		waitMsg : '数据提交中......',
		method : 'post',
		url : '/WEB-ROOT/app/xinxifabuguanli/xinxifabu.do?flag=doAddPicSubmit&id=' + id,
		success : function(form, action) {
			Ext.MessageBox.show({
				title : WARRING_WIN_TITLE,
				msg : action.result.msg,
				buttons : Ext.MessageBox.OK,
				fn : function(){
					ManageObj.uploadWindow.close();
					ManageObj.picStore.reload();
				},
				icon : Ext.MessageBox.INFO
			});
		},
		failure : function(form, action) {
			Ext.MessageBox.alert(WARRING_WIN_TITLE, action.result.msg);
		}
	});
};




