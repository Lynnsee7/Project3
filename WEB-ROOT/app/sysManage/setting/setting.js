ManageObj = function() {
	/* ������� */
	ManageObj.searchForm = null;

	/* viewport */
	ManageObj.viewport = null;

	/* ��¼ҳ�淽�� */
	ManageObj.loginPageStyleStore = new Ext.data.SimpleStore({
		id : 0,
		fields : [ 'loginPageStyleId', 'loginPageStyleText' ],
		data : [ [ '1', '����һ' ], [ '2', '������' ], [ '3', '������' ], [ '4', '������' ] ]
	});

	/* ���ⷽ�� */
	ManageObj.systemSkinStore = new Ext.data.SimpleStore({
		id : 0,
		fields : [ 'systemSkinId', 'systemSkinText' ],
		data : [ [ '', 'Ĭ������' ], [ 'xtheme-gray-extend.css', '����һ' ], [ 'xtheme-green.css', '�����' ], [ 'xtheme-olive.css', '������' ], [ 'xtheme-slickness2.css', '������' ], [ 'xtheme-purple.css', '������' ],[ 'xtheme-slate.css', '������' ]]
	});
	
	/* �ϲ�����Ƿ���ʾ */
	ManageObj.topPanDisplayStore = new Ext.data.SimpleStore({
		id : 0,
		fields : [ 'topPanDisplayId', 'topPanDisplayText' ],
		data : [ [ '1', '��ʾ' ], [ '0', '����' ]]
	});
	
	/* �²�����Ƿ���ʾ */
	ManageObj.southPanDisplayStore = new Ext.data.SimpleStore({
		id : 0,
		fields : [ 'southPanDisplayId', 'southPanDisplayText' ],
		data : [ [ '1', '��ʾ' ], [ '0', '����' ]]
	});
	
	/* �˵���ʾ��λ */
	ManageObj.menuRegionStore = new Ext.data.SimpleStore({
		id : 0,
		fields : [ 'menuRegionId', 'menuRegionText' ],
		data : [ [ '1', '���' ], [ '2', '�ұ�' ]]
	});
	
	/* �˵��۵� */
	ManageObj.menuCollapseStore = new Ext.data.SimpleStore({
		id : 0,
		fields : [ 'menuCollapseId', 'menuCollapseText' ],
		data : [ [ '1', '���۵�' ], [ '0', '�����۵�' ]]
	});
	
	/* �˵���̬Ч�� */
	ManageObj.menuAnimateStore = new Ext.data.SimpleStore({
		id : 0,
		fields : [ 'menuAnimateId', 'menuAnimateText' ],
		data : [ [ '1', 'ʹ��' ], [ '0', '��ʹ��' ]]
	});
	
	/* �˵�����ɫ */
	ManageObj.menuBackgroundStore = new Ext.data.SimpleStore({
		id : 0,
		fields : [ 'menuBackgroundId', 'menuBackgroundText' ],
		data : [ [ '1', 'ʹ��' ], [ '0', '��ʹ��' ]]
	});
	
	/* ע�����û����� */
	ManageObj.isApproveStore = new Ext.data.SimpleStore({
		id : 0,
		fields : [ 'isApproveId', 'isApproveText' ],
		data : [ [ '0', '����Ҫ' ], [ '1', '��Ҫ' ]]
	});
	
	
	ManageObj.init();
};

/* ��ʼ����֯���� */
ManageObj.init = function() {
	/* ����Ҫ������һ�䣬����û�б�����ʾ��Ϣ */
	Ext.QuickTips.init();
	ManageObj.loadData();
};

/* ��ʼ�������� */
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
			labelSeparator : '��',
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
					fieldLabel : 'ϵͳ����',
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
					fieldLabel : 'ҳ��',
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
					fieldLabel : '��½����',
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
					fieldLabel : 'ϵͳ����',
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
					fieldLabel : '��վ�ϲ����',
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
					fieldLabel : '��վ�²����',
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
					fieldLabel : '�˵���λ',
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
					fieldLabel : '�˵��۵�',
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
					fieldLabel : '�˵���̬',
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
					fieldLabel : '�˵�����',
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
					fieldLabel : 'ע�������',
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
			text : '����',
			handler : function() {
				ManageObj.doSave();
			}
		}, {
			text : '����',
			handler : function() {
				ManageObj.searchForm.getForm().reset();
			}
		} ]
	});
};

/* ��ʼ��viewport */
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

/* ��ʼ������ */
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
	/* Ext����֤ */
	if (!ManageObj.searchForm.getForm().isValid()) {
		Ext.MessageBox.alert(WARRING_WIN_TITLE, "�������������޸ĺ�ɫ����ʾ����");
		return;
	}
	
	/* form���ύ */
	ManageObj.searchForm.getForm().submit({
		waitMsg : '�����ύ��......',
		method : 'post',
		url : GLOBAL_APP_NAME+ '/WEB-ROOT/app/sysManage/setting.do?flag=doUpdateSubmit' + 
			 '&id=' +document.all.id.value + "&systemSkinName=" + document.all.systemSkin.value,
		success : function(form, action) {
			Ext.MessageBox.show({
						title : WARRING_WIN_TITLE,
						msg : "ϵͳ���óɹ��������µ�¼��",
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
		},
		failure : function(form, action) {
			Ext.MessageBox.alert(WARRING_WIN_TITLE, action.result.msg);
		}
	});
}
