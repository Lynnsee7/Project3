
var ue ;

ManageObj.doAdd = function() {
	ManageObj.addWindow = new Ext.Window({
				maximized : true,
				collapsible : false,
				autoScroll:true,
				modal : true,
				frame : true,
				border : true,
				title : '新增数据',
				labelAlign : 'center',
				buttonAlign : 'center',
				//width : Math.floor( document.body.clientWidth * 0.65 ) ,
				//height : Math.floor( document.body.clientHeight * 0.95 ) ,
				closable : true,
				closeAction : 'close',
				resizable : false,
				layout : 'fit',
				buttons : [{
							text : '提交',
							handler : function() {
								ManageObj.doAddSubmit();
							}
						}, {
							text : '清空',
							handler : function() {
								ManageObj.operationFormPan.getForm().reset();
							}
						}, {
							text : '返回',
							handler : function() {
								ManageObj.addWindow.close();
							}
						}],
				items : ManageObj.getOperationFormPan()
			});
	ManageObj.addWindow.show();
	
	var xqDiv = document.getElementById("xqDiv") ;
	var xqForm = document.createElement("form");
	var xqScript = document.createElement("script");
	xqScript.setAttribute("id","editor");
	xqScript.setAttribute("type","text/plain");
	xqScript.setAttribute("style","width:100%;height:400px;");
	xqForm.appendChild(xqScript);
	xqDiv.appendChild(xqForm);
	
	if( ue != null ){
		UE.delEditor('editor');
	}
	ue = UE.getEditor('editor');
}

ManageObj.doAddSubmit = function() {
	/* Ext表单验证 */
	if (!ManageObj.operationFormPan.getForm().isValid()) {
		Ext.MessageBox.alert(WARRING_WIN_TITLE, "输入项有误！请修改红色线提示处！");
		return;
	}
	
var con = ue.getContent() ;
	
	
	/* form表单提交 */
	ManageObj.operationFormPan.getForm().submit({
		waitMsg : '数据提交中......',
		method : 'post',
		url : '/WEB-ROOT/app/xinxifabuguanli/xinxifabu.do?flag=doAddSubmit&erjiguanlianzd=' + erjiguanlianzd,
		params : {
			xiangqingmiaoshu : con
		},
		success : function(form, action) {
			Ext.MessageBox.show({
				title : WARRING_WIN_TITLE,
				msg : action.result.msg,
				buttons : Ext.MessageBox.OK,
				fn : function(){
					window.location.href = "/WEB-ROOT/app/xinxifabuguanli/xinxifabu.do?m=xinxifabu" ;
					
				},
				icon : Ext.MessageBox.INFO
			});
		},
		failure : function(form, action) {
			Ext.MessageBox.alert(WARRING_WIN_TITLE, action.result.msg);
		}
	});
}
