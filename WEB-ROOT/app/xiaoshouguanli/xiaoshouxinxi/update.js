/**
 * 编辑
 * @param {} rowIndex: 编辑行的行号
 * @param {} flag：操作标识（'update'为编辑；'view'为浏览）
 */
ManageObj.update = function(rowIndex,flag) {
	var titleInfo = ( flag != "" && flag == "update" ) ? "编辑" : "浏览" ;
	ManageObj.updateWindow = new Ext.Window({
		// maximized : true,
		collapsible : true,
		autoScroll:true,
		modal : true,
		frame : true,
		border : true,
		title : titleInfo + '系统表单',
		labelAlign : 'center',
		buttonAlign : 'center',
		width : Math.floor( document.body.clientWidth * 0.95 ) ,
		height : Math.floor( document.body.clientHeight * 0.8 ) ,
		closable : true,
		closeAction : 'close',
		resizable : false,
		layout : 'fit',
		items : ManageObj.getOperationFormPan(rowIndex,flag)
	});
	
	if( flag != null && flag == "update" ){
		ManageObj.updateWindow.addButton("保存",function(){
			ManageObj.doUpdateSubmit(rowIndex);
		});
	}
	
	ManageObj.updateWindow.addButton("返回",function(){
		ManageObj.updateWindow.close();
	});
	
	ManageObj.updateWindow.show();
	var x = ManageObj.updateWindow.getPosition( false )[0] ;
	var y = Math.floor( ( RIGHT_SIDE_PAGE_HEIGHT - ManageObj.updateWindow.getHeight() ) / 2 ) ;
	ManageObj.updateWindow.setPosition( x , y );
}

ManageObj.doUpdateSubmit = function(rowIndex) {
	/* Ext表单验证 */
	if (!ManageObj.operationFormPan.getForm().isValid()) {
		Ext.MessageBox.alert(WARRING_WIN_TITLE, "输入项有误！请修改红色线提示处！");
		return;
	}
	
	var productJsonData = "[";
	for (var i = 0, len = ManageObj.detailDataStore.getCount(); i < len; i++) {
		var ss = Ext.util.JSON.encode(ManageObj.detailDataStore.getAt(i).data);
		if (i == 0){
			productJsonData = productJsonData + ss;
		}else{
			productJsonData = productJsonData + "," + ss;
		}
	}
	productJsonData = productJsonData + "]";
	
	/* form表单提交 */
	ManageObj.operationFormPan.getForm().submit({
		waitMsg : '数据提交中......',
		method : 'post',
		url : '/WEB-ROOT/app/xiaoshouguanli/xiaoshouxinxi.do' ,
	      params : {
			flag : 'doUpdateSubmit',
			json : productJsonData,
			id: ManageObj.dataGridPan.getStore().getAt(rowIndex).get('id'),
			xiaofeijineHi : document.getElementById("zongji").innerHTML
		},
		success : function(form, action) {
			Ext.MessageBox.show({
				title : WARRING_WIN_TITLE,
				msg : action.result.msg,
				buttons : Ext.MessageBox.OK,
				fn : function(){
					ManageObj.updateWindow.close();
					ManageObj.dataStore.reload();
				},
				icon : Ext.MessageBox.INFO
			});
		},
		failure : function(form, action) {
			Ext.MessageBox.alert(WARRING_WIN_TITLE, action.result.msg);
		}
	});
}
