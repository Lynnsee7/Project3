ManageObj = function() {
	/* 搜索面板 */
	ManageObj.searchForm = null;

	/* viewport */
	ManageObj.viewport = null;

	/* 登录页面方案 */
	ManageObj.loginPageStyleStore = new Ext.data.SimpleStore({
		id : 0,
		fields : [ 'loginPageStyleId', 'loginPageStyleText' ],
		data : [ [ '1', '方案一' ], [ '2', '方案二' ], [ '3', '方案三' ], [ '4', '方案四' ] ]
	});

	/* 主题方案 */
	ManageObj.systemSkinStore = new Ext.data.SimpleStore({
		id : 0,
		fields : [ 'systemSkinId', 'systemSkinText' ],
		data : [ [ '', '默认主题' ], [ 'xtheme-gray-extend.css', '主题一' ], [ 'xtheme-green.css', '主题二' ], [ 'xtheme-olive.css', '主题三' ], [ 'xtheme-slickness2.css', '主题四' ], [ 'xtheme-purple.css', '主题五' ],[ 'xtheme-slate.css', '主题六' ]]
	});
	
	/* 上部面板是否显示 */
	ManageObj.topPanDisplayStore = new Ext.data.SimpleStore({
		id : 0,
		fields : [ 'topPanDisplayId', 'topPanDisplayText' ],
		data : [ [ '1', '显示' ], [ '0', '隐藏' ]]
	});
	
	/* 下部面板是否显示 */
	ManageObj.southPanDisplayStore = new Ext.data.SimpleStore({
		id : 0,
		fields : [ 'southPanDisplayId', 'southPanDisplayText' ],
		data : [ [ '1', '显示' ], [ '0', '隐藏' ]]
	});
	
	/* 菜单显示方位 */
	ManageObj.menuRegionStore = new Ext.data.SimpleStore({
		id : 0,
		fields : [ 'menuRegionId', 'menuRegionText' ],
		data : [ [ '1', '左边' ], [ '2', '右边' ]]
	});
	
	/* 菜单折叠 */
	ManageObj.menuCollapseStore = new Ext.data.SimpleStore({
		id : 0,
		fields : [ 'menuCollapseId', 'menuCollapseText' ],
		data : [ [ '1', '可折叠' ], [ '0', '不可折叠' ]]
	});
	
	/* 菜单动态效果 */
	ManageObj.menuAnimateStore = new Ext.data.SimpleStore({
		id : 0,
		fields : [ 'menuAnimateId', 'menuAnimateText' ],
		data : [ [ '1', '使用' ], [ '0', '不使用' ]]
	});
	
	/* 菜单背景色 */
	ManageObj.menuBackgroundStore = new Ext.data.SimpleStore({
		id : 0,
		fields : [ 'menuBackgroundId', 'menuBackgroundText' ],
		data : [ [ '1', '使用' ], [ '0', '不使用' ]]
	});
	
	/* 注册新用户审批 */
	ManageObj.isApproveStore = new Ext.data.SimpleStore({
		id : 0,
		fields : [ 'isApproveId', 'isApproveText' ],
		data : [ [ '0', '不需要' ], [ '1', '需要' ]]
	});
	
	
	ManageObj.init();
};

/* 初始化组织界面 */
ManageObj.init = function() {
	/* 必须要加上这一句，否则没有报错提示信息 */
	Ext.QuickTips.init();
	ManageObj.loadData();
};

/* 初始化搜索表单 */
ManageObj.initSearchForm = function() {
	ManageObj.searchForm = new Ext.FormPanel({
		id : 'mySearchForm',
		labelAlign : 'left',
		buttonAlign : 'center',
		bodyStyle : 'padding:1px;',
		frame : true,
		border : false,
		labelWidth : 90,
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
					xtype : 'hidden',
					name : 'id',
					id : 'id',
					anchor : '98%'
				} ]
			},{
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'textfield',
					fieldLabel : '系统名称',
					name : 'systemName',
					id : 'systemName',
					anchor : '98%'
				} ]
			}, {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'textfield',
					fieldLabel : '页脚',
					name : 'systemDesigner',
					id : 'systemDesigner',
					anchor : '98%'
				} ]
			}, {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'combo',
					fieldLabel : '登陆主题',
					store : ManageObj.loginPageStyleStore,
					valueField : "loginPageStyleId",
					displayField : "loginPageStyleText",
					mode : 'local',
					forceSelection : true,
					hiddenName : 'loginPageStyleHidden',
					editable : false,
					triggerAction : 'all',
					name : 'loginPageStyle',
					id : 'loginPageStyle',
					anchor : '98%',
					value : ''
				} ]
			}, {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'combo',
					fieldLabel : '系统主题',
					store : ManageObj.systemSkinStore,
					valueField : "systemSkinId",
					displayField : "systemSkinText",
					mode : 'local',
					forceSelection : true,
					hiddenName : 'systemSkinHidden',
					editable : false,
					triggerAction : 'all',
					name : 'systemSkin',
					id : 'systemSkin',
					anchor : '98%',
					value : ''
				} ]
			}, {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'combo',
					fieldLabel : '网站上部面板',
					store : ManageObj.topPanDisplayStore,
					valueField : "topPanDisplayId",
					displayField : "topPanDisplayText",
					mode : 'local',
					forceSelection : true,
					hiddenName : 'topPanDisplayHidden',
					editable : false,
					triggerAction : 'all',
					name : 'topPanDisplay',
					id : 'topPanDisplay',
					anchor : '98%',
					value : ''
				} ]
			}, {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'combo',
					fieldLabel : '网站下部面板',
					store : ManageObj.southPanDisplayStore,
					valueField : "southPanDisplayId",
					displayField : "southPanDisplayText",
					mode : 'local',
					forceSelection : true,
					hiddenName : 'southPanDisplayHidden',
					editable : false,
					triggerAction : 'all',
					name : 'southPanDisplay',
					id : 'southPanDisplay',
					anchor : '98%',
					value : ''
				} ]
			} , {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'combo',
					fieldLabel : '菜单方位',
					store : ManageObj.menuRegionStore,
					valueField : "menuRegionId",
					displayField : "menuRegionText",
					mode : 'local',
					forceSelection : true,
					hiddenName : 'menuRegionHidden',
					editable : false,
					triggerAction : 'all',
					name : 'menuRegion',
					id : 'menuRegion',
					anchor : '98%',
					value : ''
				} ]
			} , {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'combo',
					fieldLabel : '菜单折叠',
					store : ManageObj.menuCollapseStore,
					valueField : "menuCollapseId",
					displayField : "menuCollapseText",
					mode : 'local',
					forceSelection : true,
					hiddenName : 'menuCollapseHidden',
					editable : false,
					triggerAction : 'all',
					name : 'menuCollapse',
					id : 'menuCollapse',
					anchor : '98%',
					value : ''
				} ]
			}, {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'combo',
					fieldLabel : '菜单动态',
					store : ManageObj.menuAnimateStore,
					valueField : "menuAnimateId",
					displayField : "menuAnimateText",
					mode : 'local',
					forceSelection : true,
					hiddenName : 'menuAnimateHidden',
					editable : false,
					triggerAction : 'all',
					name : 'menuAnimate',
					id : 'menuAnimate',
					anchor : '98%',
					value : ''
				} ]
			}, {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'combo',
					fieldLabel : '菜单背景',
					store : ManageObj.menuBackgroundStore,
					valueField : "menuBackgroundId",
					displayField : "menuBackgroundText",
					mode : 'local',
					forceSelection : true,
					hiddenName : 'menuBackgroundHidden',
					editable : false,
					triggerAction : 'all',
					name : 'menuBackground',
					id : 'menuBackground',
					anchor : '98%',
					value : ''
				} ]
			}, {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'combo',
					fieldLabel : '注册后审批',
					store : ManageObj.isApproveStore,
					valueField : "isApproveId",
					displayField : "isApproveText",
					mode : 'local',
					forceSelection : true,
					hiddenName : 'isApproveHidden',
					editable : false,
					triggerAction : 'all',
					name : 'isApprove',
					id : 'isApprove',
					anchor : '98%',
					value : ''
				} ]
			}]  
		} ],
		buttons : [ {
			text : '保存',
			handler : function() {
				ManageObj.doSave();
			}
		}, {
			text : '重置',
			handler : function() {
				ManageObj.searchForm.getForm().reset();
			}
		} ]
	});
};

/* 初始化viewport */
ManageObj.initViewport = function() {
	ManageObj.viewport = new Ext.Viewport({
		id : 'viewport',
		layout : 'border',
		border : false,
		frame : false,
		items : [ {
			id : 'west-panel',
			layout : 'fit',
			split : false,
			autoScroll : false,
			border : false,
			region : 'center',
			items : [ ManageObj.searchForm ]
		} ]
	});
};

/* 初始化数据 */
ManageObj.loadData = function() {
	var nowStore = new Ext.data.JsonStore({
		root : 'root',
		totalProperty : 'totalProperty',
		remoteSort : true,
		fields : [ 'id', 'systemName', 'systemDesigner', 'loginPageStyle', 'systemSkin','systemSkinName' ,'topPanDisplay' , 'southPanDisplay','menuRegion' , 'menuCollapse' , 'menuAnimate','menuBackground','isApprove'],
		proxy : new Ext.data.HttpProxy({
			url :  GLOBAL_APP_NAME + '/WEB-ROOT/app/sysManage/setting.do',
			method : 'POST'
		}),
		baseParams : {
			flag : 'getJsonStore',
			start : 0,
			limit : GLOBAL_MAX_PAGE_SIZE
		},
		listeners : {
			load : function loadCallBack(store, records, options) {
				ManageObj.initSearchForm();
				ManageObj.initViewport();
				store.each(function(record) {
					document.all.id.value = record.get('id');
					document.all.systemName.value = record.get('systemName');
					document.all.systemDesigner.value = record.get('systemDesigner');
					
					document.all.loginPageStyle.value = ManageObj.loginPageStyleStore.getById( Number(record.get('loginPageStyle')) ).get('loginPageStyleText') ; 
					document.all.loginPageStyleHidden.value =  record.get('loginPageStyle');
					
					document.all.systemSkin.value =  record.get('systemSkinName');
					document.all.systemSkinHidden.value =  record.get('systemSkin');
					document.all.topPanDisplay.value = ManageObj.topPanDisplayStore.getById( Number(record.get('topPanDisplay')) ).get('topPanDisplayText') ;
					document.all.topPanDisplayHidden.value =  record.get('topPanDisplay');
					document.all.southPanDisplay.value = ManageObj.southPanDisplayStore.getById( Number(record.get('southPanDisplay')) ).get('southPanDisplayText') ;
					document.all.southPanDisplayHidden.value =  record.get('southPanDisplay');
					document.all.menuRegion.value = ManageObj.menuRegionStore.getById( Number(record.get('menuRegion')) ).get('menuRegionText') ;
					document.all.menuRegionHidden.value =  record.get('menuRegion');
					document.all.menuCollapse.value = ManageObj.menuCollapseStore.getById( Number(record.get('menuCollapse')) ).get('menuCollapseText') ;
					document.all.menuCollapseHidden.value =  record.get('menuCollapse');
					document.all.menuAnimate.value = ManageObj.menuAnimateStore.getById( Number(record.get('menuAnimate')) ).get('menuAnimateText') ;
					document.all.menuAnimateHidden.value =  record.get('menuAnimate');
					document.all.menuBackground.value = ManageObj.menuBackgroundStore.getById( Number(record.get('menuBackground')) ).get('menuBackgroundText') ;
					document.all.menuBackgroundHidden.value =  record.get('menuBackground');
					
					document.all.isApprove.value = ManageObj.isApproveStore.getById( Number(record.get('isApprove')) ).get('isApproveText') ;
					document.all.isApproveHidden.value =  record.get('isApprove');
					
				});
			}
		},
		autoLoad : true
	});
};

ManageObj.doSave = function() {
	/* Ext表单验证 */
	if (!ManageObj.searchForm.getForm().isValid()) {
		Ext.MessageBox.alert(WARRING_WIN_TITLE, "输入项有误！请修改红色线提示处！");
		return;
	}
	
	/* form表单提交 */
	ManageObj.searchForm.getForm().submit({
		waitMsg : '数据提交中......',
		method : 'post',
		url : GLOBAL_APP_NAME+ '/WEB-ROOT/app/sysManage/setting.do?flag=doUpdateSubmit' + 
			 '&id=' +document.all.id.value + "&systemSkinName=" + document.all.systemSkin.value,
		success : function(form, action) {
			Ext.MessageBox.show({
						title : WARRING_WIN_TITLE,
						msg : "系统设置成功，请重新登录！",
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
		},
		failure : function(form, action) {
			Ext.MessageBox.alert(WARRING_WIN_TITLE, action.result.msg);
		}
	});
}
