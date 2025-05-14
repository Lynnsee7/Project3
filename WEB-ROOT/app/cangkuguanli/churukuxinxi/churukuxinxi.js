var ManageObj = function() {
	/* ������� */
	ManageObj.searchForm = null;

	/* ������༭������� */
	ManageObj.operationFormPan = null;

	/* �����б� */
	ManageObj.dataGridPan = null;

	/* DataStore */
	ManageObj.dataStore = null;

	/* viewport */
	ManageObj.viewport = null;

	/* �������� */
	ManageObj.addWindow = null;

	/* �༭���� */
	ManageObj.updateWindow = null;

	/* �Ҽ��¼� */
	ManageObj.rightClick = null;

	/* �Ҽ�ѡ���к� */
	ManageObj.rightMenuClickRow = null;

	/* δ�޸�֮ǰ�ĸ���·�� */
	ManageObj.oldAttach = null;


	ManageObj.huohaoGuanLianStore = new Ext.data.JsonStore({
		url: '/WEB-ROOT/app/cangkuguanli/churukuxinxi.do',
		baseParams: {
			flag: 'doGuanLian',
			guanLianBiao: 'caigouxinxi',
			guanLianZiDuan: 'huohao'
		},
		root: 'root',
		totalProperty: 'totalProperty',
		fields: ['huohao']
	});

	ManageObj.baocuncangkuGuanLianStore = new Ext.data.JsonStore({
		url: '/WEB-ROOT/app/cangkuguanli/churukuxinxi.do',
		baseParams: {
			flag: 'doGuanLian',
			guanLianBiao: 'cangkuxinxi',
			guanLianZiDuan: 'cangkumingcheng'
		},
		root: 'root',
		totalProperty: 'totalProperty',
		fields: ['cangkumingcheng']
	});




	ManageObj.init();
}

/* ��ʼ���û����� */
ManageObj.init = function() {
	/* ����Ҫ������һ�䣬����û�б�����ʾ��Ϣ */
	Ext.QuickTips.init();
	ManageObj.initSearchForm();
	ManageObj.initDataGridPan();
	ManageObj.loadData();
	ManageObj.initViewport();
}

/* ��ʼ�������� */
ManageObj.initSearchForm = function() {
	/* ��ʼ�������� */
	ManageObj.searchForm = new Ext.FormPanel({
		id: 'mySearchForm',
		labelAlign: 'left',
		buttonAlign: 'center',
		bodyStyle: 'padding:0px;',
		frame: true,
		border: false,
		labelWidth: 75,
		items: [{
			// xtype : 'fieldset',
			// title : '��ѯ����',
			anchor: '100%',
			layout: 'column',
			labelSeparator: '��',
			labelAlign: 'right',
			items: [{
				columnWidth: .2,
				layout: 'form',
				border: false,
				items: [
					{
						xtype: 'datefield',
						format: 'Y-m-d',
						fieldLabel: '����ʱ��',
						name: 'itimeStartSearch',
						id: 'itimeStartSearch',
						invalidText: '���ڸ�ʽ����ȷ��ӦΪyyyy-mm-dd',
						anchor: '100%'
					}, {
						xtype: 'textfield',
						fieldLabel: '����',
						name: 'huohaoSearch',
						id: 'huohaoSearch',
						anchor: '100%'
					}]
			}
				,
			{
				columnWidth: .2,
				layout: 'form',
				border: false,
				items: [
					{
						xtype: 'datefield',
						format: 'Y-m-d',
						fieldLabel: '��',
						name: 'itimeEndSearch',
						id: 'itimeEndSearch',
						invalidText: '���ڸ�ʽ����ȷ��ӦΪyyyy-mm-dd',
						anchor: '100%'
					}, {
						xtype: 'datefield',
						format: 'Y-m-d',
						fieldLabel: '���ʱ��',
						name: 'rukushijianSearch',
						id: 'rukushijianSearch',
						anchor: '100%'
					}]
			}
				,
			{
				columnWidth: .2,
				layout: 'form',
				border: false,
				items: [
					{
						xtype: 'textfield',
						fieldLabel: '����ֿ�',
						name: 'baocuncangkuSearch',
						id: 'baocuncangkuSearch',
						anchor: '100%'
					}, {
						xtype: 'datefield',
						format: 'Y-m-d',
						fieldLabel: '����ʱ��',
						name: 'chukushijianSearch',
						id: 'chukushijianSearch',
						anchor: '100%'
					}]
			}
				,
			{
				columnWidth: .2,
				layout: 'form',
				border: false,
				items: [
					{
						xtype: 'textfield',
						fieldLabel: '��������',
						name: 'baocunxiangqingSearch',
						id: 'baocunxiangqingSearch',
						anchor: '100%'
					}, {
						xtype: 'datefield',
						format: 'Y-m-d',
						fieldLabel: '��������',
						name: 'shengchanriqiSearch',
						id: 'shengchanriqiSearch',
						anchor: '100%'
					}]
			}
				,
			{
				columnWidth: .2,
				layout: 'form',
				border: false,
				items: [
					{
						xtype: 'datefield',
						format: 'Y-m-d',
						fieldLabel: '������',
						name: 'baozhiqiSearch',
						id: 'baozhiqiSearch',
						anchor: '100%'
					}]
			}
			]
		}],
		buttons: [{
			text: '��ѯ',
			handler: function() {
				ManageObj.doSearch();
			}
		}, {
			text: '���',
			handler: function() {
				ManageObj.searchForm.getForm().reset();
			}
		}]
	});
}

/* ��ʼ�������б� */
ManageObj.initDataGridPan = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();

	ManageObj.dataStore = new Ext.data.JsonStore({
		root: 'root',
		totalProperty: 'totalProperty',
		remoteSort: true,
		fields: ['huohao', 'rukushijian', 'baocuncangku', 'chukushijian', 'baocunxiangqing', 'shengchanriqi', 'baozhiqi', 'id', 'itime', 'detail', 'deleteFlag', 'fuJian'],
		proxy: new Ext.data.HttpProxy({
			url: '/WEB-ROOT/app/cangkuguanli/churukuxinxi.do',
			method: 'POST'
		}),
		baseParams: {
			flag: 'getJsonStore',
			deleteFlagSearch: 0,
			r: R
		},
		listeners: {
			load: function loadCallBack(store, records, options) {
				ManageObj.doTongJi();
			}
		}
	});

	pagingBar = new Ext.ux.MyPagingToolbar({
		pageSize: GLOBAL_MAX_PAGE_SIZE,
		store: ManageObj.dataStore,
		displayMsg: '��ǰ��{0}��{1}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��{2}����¼',
		emptyMsg: "û���ҵ��κμ�¼��",
		displayInfo: true
	});

	ManageObj.dataGridPan = new Ext.grid.GridPanel({
		id: 'getTask',
		store: ManageObj.dataStore,
		loadMask: true,
		bbar: pagingBar,
		columns: [{
				header: '<font color="blue">����</font>',
				width: 60,
				align: 'center',
				sortable: true,
				dataIndex: 'huohao'
			}
			, {
				header: '<font color="blue">���ʱ��</font>',
				width: 60,
				align: 'center',
				sortable: true,
				dataIndex: 'rukushijian'
			}
			, {
				header: '<font color="blue">����ֿ�</font>',
				width: 60,
				align: 'center',
				sortable: true,
				dataIndex: 'baocuncangku'
			}
			, {
				header: '<font color="blue">����ʱ��</font>',
				width: 60,
				align: 'center',
				sortable: true,
				dataIndex: 'chukushijian'
			}
			, {
				header: '<font color="blue">��������</font>',
				width: 60,
				align: 'center',
				sortable: true,
				dataIndex: 'baocunxiangqing'
			}
			, {
				header: '<font color="blue">��������</font>',
				width: 60,
				align: 'center',
				sortable: true,
				dataIndex: 'shengchanriqi'
			}
			, {
				header: '<font color="blue">������</font>',
				width: 60,
				align: 'center',
				sortable: true,
				dataIndex: 'baozhiqi'
			}
			, {
				header: "<font color='blue'>����</font>",
				width: 100,
				align: 'center',
				sortable: false,
				renderer: ManageObj.operatorRenderer,
				dataIndex: 'oper'
			}],
		sm: sm,
		viewConfig: {
			forceFit: true,
			columnsText: '��ʾ��',
			sortAscText: '����',
			sortDescText: '����'
		},
		stripeRows: true,
		tbar: ['-', {
			xtype: (R == "y") ? 'hidden' : 'splitbutton',
			text: '&nbsp;����ά��',
			icon: MANAGE_ICON_PATH,
			menu: [{
				text: '������',
				handler: function() {
					ManageObj.doAdd();
				},
				icon: ADD_OPERATION_ICON_PATH
			}, {
				text: 'ɾ����',
				handler: function() {
					ManageObj.doDeleOrUnDele(null, 1)
				},
				icon: LOCK_OPERATION_ICON_PATH
			}]
		}, '-', {
				text: '��ʾȫ��',
				handler: function() {
					ManageObj.searchForm.getForm().reset();
					ManageObj.doSearch();
				},
				icon: DISPLAY_ALL_ICON_PATH
			}, '-', {
				text: '����Excel',
				xtype: 'button',
				handler: function() {
					ManageObj.doExportExcel();
				},
				icon: EXPORT_EXCEL_ICON_PATH
			}, '->', {
				xtype: 'label',
				html: '<font id="tongJiFont"></font>'
			}]
	});

	/* �Ҽ������˵� */
	//ManageObj.dataGridPan.addListener('rowcontextmenu', ManageObj.rightClickFn);
}

/* �Ҽ���Ӧ�¼� */
ManageObj.rightClickFn = function(grid, rowIndex, e) {
	e.preventDefault();
	ManageObj.rightMenuClickRow = rowIndex;

	/* ������в˵��� */
	if (ManageObj.rightClick != null) {
		ManageObj.rightClick.removeAll();
	}
	/* �����˵� */
	ManageObj.rightClick = new Ext.menu.Menu({
		id: 'rightClickCont',
		items: [{
			id: 'rMenu3',
			text: '������',
			icon: RIGHT_CLICK_ADD_OPERATION_ICON_PATH,
			handler: function() {
				ManageObj.doAdd();
			}
		}, {
			id: 'rMenu1',
			text: '�����',
			icon: VIEW_OPERATION_ICON_PATH,
			handler: function() {
				ManageObj.update(ManageObj.rightMenuClickRow, "view");
			}
		}, {
			id: 'rMenu2',
			text: '�༭��',
			icon: EDIT_OPERATION_ICON_PATH,
			handler: function() {
				ManageObj.update(ManageObj.rightMenuClickRow, "update");
			}
		}]
	});

	/* ��ǰѡ����״̬ */
	var nowSelectedRowStutas = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('deleteFlag');
	var nowSelectedRowId = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('id');
	var nowStutasStr = "ɾ����";
	var nowIcon = LOCK_OPERATION_ICON_PATH;
	var nowOption = 1;
	/* ���ݵ�ǰѡ���е�״̬����̬����ɾ����ⶳ�˵��� */
	var menuItem = new Ext.menu.Item({
		text: nowStutasStr,
		icon: nowIcon,
		handler: function() {
			ManageObj.doDeleOrUnDele(nowSelectedRowId, nowOption);
		}
	});
	ManageObj.rightClick.add(menuItem);
	ManageObj.rightClick.showAt(e.getXY());
}

/* ��ʼ��viewport */
ManageObj.initViewport = function() {
	ManageObj.viewport = new Ext.Viewport({
		id: 'viewport',
		layout: 'border',
		border: false,
		frame: false,
		items: [{
			id: 'west-panel',
			layout: 'fit',
			split: false,
			collapsible: true,
			collapsed: false,
			title: ' ',
			autoScroll: false,
			border: false,
			region: 'north',
			height: 145,
			items: [ManageObj.searchForm]
		}, {
			id: 'gridViewItem',
			layout: 'fit',
			split: false,
			border: false,
			autoScroll: true,
			region: 'center',
			items: [ManageObj.dataGridPan]
		}]
	});
}

/* �������� */
ManageObj.loadData = function() {
	ManageObj.dataStore.load({
		params: {
			start: 0,
			limit: GLOBAL_MAX_PAGE_SIZE
		}
	});
}

/* ������Renderer */
ManageObj.operatorRenderer = function(id, cellmeta, record, rowIndex, columnIndex, store) {
	var returnStr = "<a href=\"#\" onclick=\"ManageObj.update(" + rowIndex + ",'view');\">���</a>";
	if (R == "n") {
		returnStr += "&nbsp;|&nbsp;<a href=\"#\" onclick=\"ManageObj.update(" + rowIndex + ",'update');\">�༭</a>";
		returnStr += "&nbsp;|&nbsp;<a href=\"#\" onclick=\"ManageObj.doDeleOrUnDele('" + record.data['id'] + "','1');\">ɾ��</a>";
	}
	if (SP == "y") {
		returnStr += "&nbsp;|&nbsp;<a href=\"#\" onclick=\"ManageObj.doShenPi('" + record.data['id'] + "','����ͨ��');\">����ͨ��</a>";
		returnStr += "&nbsp;|&nbsp;<a href=\"#\" onclick=\"ManageObj.doShenPi('" + record.data['id'] + "','��������');\">��������</a>";
	}
	return returnStr;
}

ManageObj.doShenPi = function(id, zhuangtai) {
	Ext.MessageBox.confirm('��ܰ���ѣ�', 'ȷ����Ҫ�ύ��¼��',
		function(info) {
			if (info == "yes") {
				Ext.Ajax.request({
					waitMsg: '�����ύ��......',
					url: '/WEB-ROOT/app/cangkuguanli/churukuxinxi.do',
					method: 'POST',
					success: function(response, options) {
						var responseArray = Ext.util.JSON.decode(response.responseText);
						Ext.MessageBox.show({
							title: '��ܰ���ѣ�',
							msg: responseArray.msg,
							buttons: Ext.MessageBox.OK,
							fn: function() {
								ManageObj.dataStore.reload();
							},
							icon: Ext.MessageBox.INFO
						});
					},
					failure: function(response, options) {
						Ext.MessageBox.alert('��ܰ���ѣ�', responseArray.msg);
					},
					params: {
						flag: "doShenPi",
						id: id,
						zhuangtai: zhuangtai
					}
				});
			}
		});
}

/* ��ѯ */
ManageObj.doSearch = function() {
	//������Ϸ��Ե��ж�
	var itimeStartSearch = document.all.itimeStartSearch.value;
	var itimeEndSearch = document.all.itimeEndSearch.value;

	if (itimeStartSearch != "" && itimeEndSearch != "") {
		if (itimeStartSearch > itimeEndSearch) {
			Ext.MessageBox.alert(WARRING_WIN_TITLE, "������ʼʱ�䲻�ܴ��ڲ�������ʱ�䣡");
			return;
		}
	}

	ManageObj.dataStore.baseParams.huohaoSearch = document.all.huohaoSearch.value;
	ManageObj.dataStore.baseParams.rukushijianSearch = document.all.rukushijianSearch.value;
	ManageObj.dataStore.baseParams.baocuncangkuSearch = document.all.baocuncangkuSearch.value;
	ManageObj.dataStore.baseParams.chukushijianSearch = document.all.chukushijianSearch.value;
	ManageObj.dataStore.baseParams.baocunxiangqingSearch = document.all.baocunxiangqingSearch.value;
	ManageObj.dataStore.baseParams.shengchanriqiSearch = document.all.shengchanriqiSearch.value;
	ManageObj.dataStore.baseParams.baozhiqiSearch = document.all.baozhiqiSearch.value;

	ManageObj.dataStore.baseParams.itimeStartSearch = itimeStartSearch;
	ManageObj.dataStore.baseParams.itimeEndSearch = itimeEndSearch;


	ManageObj.dataStore.load({
		params: {
			start: 0,
			limit: GLOBAL_MAX_PAGE_SIZE
		}
	});

}

/* �õ���ӻ�༭��FormPanel */
ManageObj.getOperationFormPan = function(rowIndex, flag) {
	ManageObj.operationFormPan = new Ext.FormPanel({
		id: 'operationFormPan',
		labelAlign: 'left',
		buttonAlign: 'center',
		bodyStyle: 'padding:0px;',
		frame: true,
		border: true,
		labelWidth: 90,
		autoWidth: true,
		autoHeight: true,
		fileUpload: true,
		items: [{
			anchor: '100%',
			layout: 'column',
			labelSeparator: '��',
			labelAlign: 'right',
			items: [{
				columnWidth: 1,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'combo',
					fieldLabel: '<font color="red">*</font>&nbsp;����',
					store: ManageObj.huohaoGuanLianStore,
					valueField: 'huohao',
					displayField: 'huohao',
					mode: 'remote',
					forceSelection: true,
					hiddenName: 'huohaoHidd',
					triggerAction: 'all',
					editable: false,
					name: 'huohao',
					id: 'huohao',
					anchor: '95%',
					allowBlank: false
				}]
			}
				, {
				columnWidth: 1,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'datefield',
					format: 'Y-m-d',
					fieldLabel: '<font color="red">*</font>&nbsp;&nbsp;���ʱ��',
					name: 'rukushijian',
					id: 'rukushijian',
					anchor: '95%',
					allowBlank: false
				}]
			}
				, {
				columnWidth: 1,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'combo',
					fieldLabel: '<font color="red">*</font>&nbsp;����ֿ�',
					store: ManageObj.baocuncangkuGuanLianStore,
					valueField: 'cangkumingcheng',
					displayField: 'cangkumingcheng',
					mode: 'remote',
					forceSelection: true,
					hiddenName: 'baocuncangkuHidd',
					triggerAction: 'all',
					editable: false,
					name: 'baocuncangku',
					id: 'baocuncangku',
					anchor: '95%',
					allowBlank: false
				}]
			}
				, {
				columnWidth: 1,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'datefield',
					format: 'Y-m-d',
					fieldLabel: '����ʱ��',
					name: 'chukushijian',
					id: 'chukushijian',
					anchor: '95%',
					allowBlank: true
				}]
			}
				, {
				columnWidth: 1,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'textfield',
					fieldLabel: '&nbsp;��������',
					name: 'baocunxiangqing',
					id: 'baocunxiangqing',
					anchor: '95%',
					allowBlank: true
				}]
			}
				, {
				columnWidth: 1,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'datefield',
					format: 'Y-m-d',
					fieldLabel: '<font color="red">*</font>&nbsp;&nbsp;��������',
					name: 'shengchanriqi',
					id: 'shengchanriqi',
					anchor: '95%',
					allowBlank: false
				}]
			}
				, {
				columnWidth: 1,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'datefield',
					format: 'Y-m-d',
					fieldLabel: '<font color="red">*</font>&nbsp;&nbsp;������',
					name: 'baozhiqi',
					id: 'baozhiqi',
					anchor: '95%',
					allowBlank: false
				}]
			}
				, {
				columnWidth: 1,
				layout: 'form',
				border: false,
				items: [{
					xtype: (flag == 'view') ? 'label' : 'fileuploadfield',
					style: (flag == 'view') ? 'margin-left:0px;padding-top:3px;padding-bottom:3px;' : 'margin-left:0px;',
					fieldLabel: (flag == 'view') ? '' : '����',
					name: 'fuJian',
					id: 'fuJian',
					anchor: '95%',
					buttonText: '���'
				}]
			}
				, {
				columnWidth: 1,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'textarea',
					fieldLabel: '��ע',
					name: 'detail',
					id: 'detail',
					anchor: '95%'
				}]
			}]
		}]
	});

	/* ������༭ʱ�е�ǰѡ���кŲ������õ���ǰ�м�¼����Ϣ����ʼ�������� */
	if (rowIndex != null) {
		ManageObj.operationFormPan.findById('huohao').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('huohao');
		ManageObj.operationFormPan.findById('rukushijian').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('rukushijian');
		ManageObj.operationFormPan.findById('baocuncangku').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('baocuncangku');
		ManageObj.operationFormPan.findById('chukushijian').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('chukushijian');
		ManageObj.operationFormPan.findById('baocunxiangqing').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('baocunxiangqing');
		ManageObj.operationFormPan.findById('shengchanriqi').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('shengchanriqi');
		ManageObj.operationFormPan.findById('baozhiqi').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('baozhiqi');
		var attachVal = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('fuJian');
		if (flag == 'view') {
			var fileName = attachVal.substring(attachVal.lastIndexOf("/") + 1);
			ManageObj.operationFormPan.findById('fuJian').html = "<a style='padding-left:0px;margin-left:4px;' href=" + attachVal + ">" + fileName + "</a>";
		} else {
			ManageObj.operationFormPan.findById('fuJian').value = attachVal;
		}
		ManageObj.oldAttach = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('fuJian');
		Ext.getCmp('detail').setValue(ManageObj.dataGridPan.getStore().getAt(rowIndex).get('detail'));
	}

	return ManageObj.operationFormPan;
}

/**
 * @param {}  Id
 * @param {} deleteFlag (1:ɾ�� �� 0:�ⶳ)
 * @function ɾ����ⶳ
 */
ManageObj.doDeleOrUnDele = function(id, deleteFlag) {
	if (!id) {
		ManageObj.doCheck(deleteFlag);
	} else {
		var infoTmp = (deleteFlag == "0") ? "" : "ɾ��";
		Ext.MessageBox.confirm('��ܰ���ѣ�', 'ȷ����Ҫ' + infoTmp + '��ѡ��¼��',
			function(info) {
				if (info == "yes") {
					Ext.Ajax.request({
						waitMsg: '�����ύ��......',
						url: '/WEB-ROOT/app/cangkuguanli/churukuxinxi.do',
						method: 'POST',
						success: function(response, options) {
							var responseArray = Ext.util.JSON.decode(response.responseText);
							Ext.MessageBox.show({
								title: '��ܰ���ѣ�',
								msg: responseArray.msg,
								buttons: Ext.MessageBox.OK,
								fn: function() {
									ManageObj.dataStore.reload();
								},
								icon: Ext.MessageBox.INFO
							});
						},
						failure: function(response, options) {
							Ext.MessageBox.alert('��ܰ���ѣ�', responseArray.msg);
						},
						params: {
							flag: "doDeleOrUnDele",
							id: id,
							deleteFlag: deleteFlag
						}
					});
				}
			});
	}
}

/**
 * @param {} deleOrUnDele ��1��ɾ�� �� 0���ⶳ��
 * @function �ύɾ����ⶳʱ���ݺϷ�����֤
 */
ManageObj.doCheck = function(deleOrUnDele) {
	var sm = ManageObj.dataGridPan.getSelectionModel();
	var sel = sm.getSelections();
	var selCount = sm.getCount();
	if (selCount == 0) {
		Ext.Msg.show({
			title: '��ܰ��ʾ��',
			buttons: Ext.MessageBox.OK,
			msg: 'û�п����ύ�����ݣ���ѡ��',
			icon: Ext.MessageBox.ERROR
		});
		return;
	}

	/* ѡ���ҿ����ύ�ļ�¼ */
	var selectedRowId = "";
	/* ѡ�е���Ϊ��ɾ��״̬�ļ�¼ */
	var hasDeletedRowId = "";
	/* ѡ�е���Ϊ�ѽⶳ״̬�ļ�¼ */
	var hasUnDeletedRowId = "";
	for (var i = 0; i < selCount; i++) {
		var deleteFlag = sel[i].data["deleteFlag"];
		if (deleOrUnDele == "1") {
			if (deleteFlag == "1") {
				hasDeletedRowId += (hasDeletedRowId == "") ? (i + 1 + "") : "," + (i + 1);
			} else {
				selectedRowId += (selectedRowId == "") ? (sel[i].data["id"]) : "," + (sel[i].data["id"]);
			}
		} else if (deleOrUnDele == "0") {
			if (deleteFlag == "0") {
				hasUnDeletedRowId += (hasUnDeletedRowId == "") ? (i + 1 + "") : "," + (i + 1);
			} else {
				selectedRowId += (selectedRowId == "") ? (sel[i].data["id"] + "") : "," + (sel[i].data["id"]);
			}
		}
	}

	if (hasUnDeletedRowId != "") {
		Ext.Msg.show({
			title: '��ܰ��ʾ��',
			buttons: Ext.MessageBox.OK,
			msg: '��ѡ��ĵ�' + hasUnDeletedRowId + "�е������Ѿ�Ϊ����״̬��������ѡ��",
			icon: Ext.MessageBox.ERROR
		});
		return;
	} else if (hasDeletedRowId != "") {
		Ext.Msg.show({
			title: '��ܰ��ʾ��',
			buttons: Ext.MessageBox.OK,
			msg: '��ѡ��ĵ�' + hasDeletedRowId + "�е������Ѿ���ɾ����������ѡ��",
			icon: Ext.MessageBox.ERROR
		});
		return;
	}

	ManageObj.doDeleOrUnDele(selectedRowId, deleOrUnDele);
};

/* ����Excel */
ManageObj.doExportExcel = function() {
	var url = "/WEB-ROOT/app/cangkuguanli/churukuxinxi.do?flag=doExportExcel";
	window.open(url);
};

/* �ֶ�ͳ�� */
ManageObj.doTongJi = function() {
	Ext.Ajax.request({
		url: '/WEB-ROOT/app/cangkuguanli/churukuxinxi.do',
		method: 'POST',
		success: function(response, options) {
			var responseArray = Ext.util.JSON.decode(response.responseText);
			document.all.tongJiFont.innerHTML = responseArray.msg;
		},
		params: {
			flag: "doTongJi",
			m: M,
			r: R
		}
	});
};