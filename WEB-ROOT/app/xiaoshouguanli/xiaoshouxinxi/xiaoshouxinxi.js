var ManageObj = function() {
	/* ������� */
	ManageObj.searchForm = null;

	/* ������༭������� */
	ManageObj.operationFormPan = null;

	/* �����б� */
	ManageObj.dataGridPan = null;

	/* DataStore */
	ManageObj.dataStore = null;

	/* ��ϸ�����б� */
	ManageObj.detailDataGridPan = null;

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

	ManageObj.xiaoshoudanhao4up = "" ;
	
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
		id : 'mySearchForm',
		labelAlign : 'left',
		buttonAlign : 'center',
		bodyStyle : 'padding:0px;',
		frame : true,
		border : false,
		labelWidth : 75,
		items : [ {
			// xtype : 'fieldset',
			// title : '��ѯ����',
			anchor : '100%',
			layout : 'column',
			labelSeparator : '��',
			labelAlign : 'right',
			items : [ {
				columnWidth : .2,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'datefield',
					format : 'Y-m-d',
					fieldLabel : '����ʱ��',
					name : 'itimeStartSearch',
					id : 'itimeStartSearch',
					invalidText : '���ڸ�ʽ����ȷ��ӦΪyyyy-mm-dd',
					anchor : '100%'
				}, {
					xtype : 'textfield',
					fieldLabel : '���۵���',
					name : 'xiaoshoudanhaoSearch',
					id : 'xiaoshoudanhaoSearch',
					anchor : '100%'
				} ]
			}, {
				columnWidth : .2,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'datefield',
					format : 'Y-m-d',
					fieldLabel : '��',
					name : 'itimeEndSearch',
					id : 'itimeEndSearch',
					invalidText : '���ڸ�ʽ����ȷ��ӦΪyyyy-mm-dd',
					anchor : '100%'
				} ]
			}, {
				columnWidth : .2,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'textfield',
					fieldLabel : '������',
					name : 'jingshourenSearch',
					id : 'jingshourenSearch',
					anchor : '100%'
				} ]
			}, {
				columnWidth : .2,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'textfield',
					fieldLabel : '���ѽ��',
					name : 'xiaofeijineSearch',
					id : 'xiaofeijineSearch',
					anchor : '100%'
				} ]
			}, {
				columnWidth : .2,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'textfield',
					fieldLabel : '��Ա���',
					name : 'huiyuanbianhaoSearch',
					id : 'huiyuanbianhaoSearch',
					anchor : '100%'
				} ]
			} ]
		} ],
		buttons : [ {
			text : '��ѯ',
			handler : function() {
				ManageObj.doSearch();
			}
		}, {
			text : '���',
			handler : function() {
				ManageObj.searchForm.getForm().reset();
			}
		} ]
	});
}

/* ��ʼ�������б� */
ManageObj.initDataGridPan = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();

	ManageObj.dataStore = new Ext.data.JsonStore({
		root : 'root',
		totalProperty : 'totalProperty',
		remoteSort : true,
		fields : [ 'xiaoshoudanhao', 'jingshouren', 'xiaofeijine', 'huiyuanbianhao', 'id', 'itime', 'detail', 'deleteFlag' ],
		proxy : new Ext.data.HttpProxy({
			url : '/WEB-ROOT/app/xiaoshouguanli/xiaoshouxinxi.do',
			method : 'POST'
		}),
		baseParams : {
			flag : 'getJsonStore',
			deleteFlagSearch : 0,
			r : R
		},
		listeners : {
			load : function loadCallBack(store, records, options) {
				ManageObj.doTongJi();
			}
		}
	});

	pagingBar = new Ext.ux.MyPagingToolbar({
		pageSize : GLOBAL_MAX_PAGE_SIZE,
		store : ManageObj.dataStore,
		displayMsg : '��ǰ��{0}��{1}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��{2}����¼',
		emptyMsg : "û���ҵ��κμ�¼��",
		displayInfo : true
	});

	ManageObj.dataGridPan = new Ext.grid.GridPanel({
		id : 'getTask',
		store : ManageObj.dataStore,
		loadMask : true,
		bbar : pagingBar,
		columns : [ {
			header : '<font color="blue">���۵���</font>',
			width : 60,
			align : 'center',
			sortable : true,
			dataIndex : 'xiaoshoudanhao'
		}, {
			header : '<font color="blue">������</font>',
			width : 60,
			align : 'center',
			sortable : true,
			dataIndex : 'jingshouren'
		}, {
			header : '<font color="blue">��Ա���</font>',
			width : 60,
			align : 'center',
			sortable : true,
			dataIndex : 'huiyuanbianhao'
		}, {
			header : '<font color="blue">���ѽ��</font>',
			width : 60,
			align : 'center',
			sortable : true,
			dataIndex : 'xiaofeijine'
		}, {
			header : '<font color="blue">����ʱ��</font>',
			width : 60,
			align : 'center',
			sortable : true,
			dataIndex : 'itime'
		}, {
			header : "<font color='blue'>����</font>",
			width : 100,
			align : 'center',
			sortable : false,
			renderer : ManageObj.operatorRenderer,
			dataIndex : 'oper'
		} ],
		sm : sm,
		viewConfig : {
			forceFit : true,
			columnsText : '��ʾ��',
			sortAscText : '����',
			sortDescText : '����'
		},
		stripeRows : true,
		tbar : [ '-', {
			xtype : (R == "y") ? 'hidden' : 'splitbutton',
			text : '&nbsp;����ά��',
			icon : MANAGE_ICON_PATH,
			menu : [ {
				text : '������',
				handler : function() {
					ManageObj.doAdd();
				},
				icon : ADD_OPERATION_ICON_PATH
			} ]
		}, '-', {
			text : '��ʾȫ��',
			handler : function() {
				ManageObj.searchForm.getForm().reset();
				ManageObj.doSearch();
			},
			icon : DISPLAY_ALL_ICON_PATH
		}, '-', {
			text : '����Excel',
			xtype : 'button',
			handler : function() {
				ManageObj.doExportExcel();
			},
			icon : EXPORT_EXCEL_ICON_PATH
		}, '->', {
			xtype : 'label',
			html : '<font id="tongJiFont"></font>'
		} ]

	});

	/* �Ҽ������˵� */
	// ManageObj.dataGridPan.addListener('rowcontextmenu',
	// ManageObj.rightClickFn);
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
		id : 'rightClickCont',
		items : [ {
			id : 'rMenu3',
			text : '������',
			icon : RIGHT_CLICK_ADD_OPERATION_ICON_PATH,
			handler : function() {
				ManageObj.doAdd();
			}
		}, {
			id : 'rMenu1',
			text : '�����',
			icon : VIEW_OPERATION_ICON_PATH,
			handler : function() {
				ManageObj.update(ManageObj.rightMenuClickRow, "view");
			}
		}, {
			id : 'rMenu2',
			text : '�༭��',
			icon : EDIT_OPERATION_ICON_PATH,
			handler : function() {
				ManageObj.update(ManageObj.rightMenuClickRow, "update");
			}
		} ]
	});

	/* ��ǰѡ����״̬ */
	var nowSelectedRowStutas = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('deleteFlag');
	var nowSelectedRowId = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('id');
	var nowStutasStr = "ɾ����";
	var nowIcon = LOCK_OPERATION_ICON_PATH;
	var nowOption = 1;
	/* ���ݵ�ǰѡ���е�״̬����̬����ɾ����ⶳ�˵��� */
	var menuItem = new Ext.menu.Item({
		text : nowStutasStr,
		icon : nowIcon,
		handler : function() {
			ManageObj.doDeleOrUnDele(nowSelectedRowId, nowOption);
		}
	});
	ManageObj.rightClick.add(menuItem);
	ManageObj.rightClick.showAt(e.getXY());
}

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
			collapsible : true,
			collapsed : false,
			title : ' ',
			autoScroll : false,
			border : false,
			region : 'north',
			height : 145,
			items : [ ManageObj.searchForm ]
		}, {
			id : 'gridViewItem',
			layout : 'fit',
			split : false,
			border : false,
			autoScroll : true,
			region : 'center',
			items : [ ManageObj.dataGridPan ]
		} ]
	});
}

/* �������� */
ManageObj.loadData = function() {
	ManageObj.dataStore.load({
		params : {
			start : 0,
			limit : GLOBAL_MAX_PAGE_SIZE
		}
	});
}

/* ������Renderer */
ManageObj.operatorRenderer = function(id, cellmeta, record, rowIndex, columnIndex, store) {
	var returnStr = "<a href=\"#\" onclick=\"ManageObj.update(" + rowIndex + ",'view');\">���</a>";
	if (R == "n") {
		returnStr += "&nbsp;|&nbsp;<a href=\"#\" onclick=\"ManageObj.update(" + rowIndex + ",'update');\">�༭</a>";
		returnStr += "&nbsp;|&nbsp;<a href=\"#\" onclick=\"ManageObj.doDeleOrUnDele('" + record.data['id'] + "','1');\">ɾ��</a>";
		returnStr += "&nbsp;|&nbsp;<a href=\"#\" onclick=\"ManageObj.doDeleOrUnDele('" + record.data['id'] + "','1');\">�˻�</a>";
	}
	if (SP == "y") {
		returnStr += "&nbsp;|&nbsp;<a href=\"#\" onclick=\"ManageObj.doShenPi('" + record.data['id'] + "','����ͨ��');\">����ͨ��</a>";
		returnStr += "&nbsp;|&nbsp;<a href=\"#\" onclick=\"ManageObj.doShenPi('" + record.data['id'] + "','��������');\">��������</a>";
	}
	return returnStr;
}

ManageObj.doShenPi = function(id, zhuangtai) {
	Ext.MessageBox.confirm('��ܰ���ѣ�', 'ȷ����Ҫ�ύ��¼��', function(info) {
		if (info == "yes") {
			Ext.Ajax.request({
				waitMsg : '�����ύ��......',
				url : '/WEB-ROOT/app/xiaoshouguanli/xiaoshouxinxi.do',
				method : 'POST',
				success : function(response, options) {
					var responseArray = Ext.util.JSON.decode(response.responseText);
					Ext.MessageBox.show({
						title : '��ܰ���ѣ�',
						msg : responseArray.msg,
						buttons : Ext.MessageBox.OK,
						fn : function() {
							ManageObj.dataStore.reload();
						},
						icon : Ext.MessageBox.INFO
					});
				},
				failure : function(response, options) {
					Ext.MessageBox.alert('��ܰ���ѣ�', responseArray.msg);
				},
				params : {
					flag : "doShenPi",
					id : id,
					zhuangtai : zhuangtai
				}
			});
		}
	});
}

/* ��ѯ */
ManageObj.doSearch = function() {
	// ������Ϸ��Ե��ж�
	var itimeStartSearch = document.all.itimeStartSearch.value;
	var itimeEndSearch = document.all.itimeEndSearch.value;

	if (itimeStartSearch != "" && itimeEndSearch != "") {
		if (itimeStartSearch > itimeEndSearch) {
			Ext.MessageBox.alert(WARRING_WIN_TITLE, "������ʼʱ�䲻�ܴ��ڲ�������ʱ�䣡");
			return;
		}
	}

	ManageObj.dataStore.baseParams.xiaoshoudanhaoSearch = document.all.xiaoshoudanhaoSearch.value;
	ManageObj.dataStore.baseParams.jingshourenSearch = document.all.jingshourenSearch.value;
	ManageObj.dataStore.baseParams.xiaofeijineSearch = document.all.xiaofeijineSearch.value;
	ManageObj.dataStore.baseParams.huiyuanbianhaoSearch = document.all.huiyuanbianhaoSearch.value;

	ManageObj.dataStore.baseParams.itimeStartSearch = itimeStartSearch;
	ManageObj.dataStore.baseParams.itimeEndSearch = itimeEndSearch;

	ManageObj.dataStore.load({
		params : {
			start : 0,
			limit : GLOBAL_MAX_PAGE_SIZE
		}
	});

};

/* ��ϸ��� */
ManageObj.initDetailDataGridPan = function(rowIndex, flag,xiaoshoudanhao) {
	var sm = new Ext.grid.CheckboxSelectionModel();

	ManageObj.detailDataStore = new Ext.data.JsonStore({
		root : 'root',
		totalProperty : 'totalProperty',
		remoteSort : true,
		fields : [ 'huohao', 'danjia', 'shuliang', 'xiaoji', 'beizhu' ,'id'],
		proxy : new Ext.data.HttpProxy({
			url : '/WEB-ROOT/app/xiaoshouguanli/xiaoshouxinxi.do',
			method : 'POST'
		}),
		baseParams : {
			flag : 'getDetailJsonStore',
			xiaoshoudanhao : ""
		},
		listeners :{
			"load" :function(){
				ManageObj.xiuGaiZongJi();
			}
		}
	});

	ManageObj.detailDataGridPan = new Ext.grid.EditorGridPanel({
		id : 'detailDataGrid',
		store : ManageObj.detailDataStore,
		loadMask : true,
		// plugins: [rowEditor],
		clicksToEdit : 2,
		frame : true,
		border : true,
		width : Math.floor(document.body.clientWidth * 0.89 * 0.87),
		height : 250,
		columns : [ sm, {
			header : "<font color='blue'>���</font>",
			width : 50,
			align : 'center',
			dataIndex : 'id'
		}, {
			header : "<font color='red'>*</font>&nbsp;<font color='blue'>����</font>",
			width : 120,
			align : 'center',
			dataIndex : 'huohao',
			editor : {
				xtype : 'textfield',
				allowBlank : false,
				listeners :{
					blur:function( o ){
					          ManageObj.chaXunDanJia( o.getRawValue() );
				       }
				}
			}
		}, {
			header : "<font color='red'>*</font>&nbsp;<font color='blue'>����</font>",
			width : 80,
			align : 'center',
			dataIndex : 'shuliang',
			editor : {
				xtype : 'textfield',
				allowBlank : false,
				listeners :{
					blur:function( o ){
					          ManageObj.chaXunDanJia1( o.getRawValue() );
				       }
				}
			}
		}, {
			header : "<font color='blue'>����</font>",
			width : 80,
			align : 'center',
			dataIndex : 'danjia',
			editor : {
				xtype : 'textfield',
				allowBlank : false,
				readOnly:true
			}
		}, {
			header : "<font color='blue'>С��</font>",
			width : 80,
			align : 'center',
			dataIndex : 'xiaoji',
			editor : {
				xtype : 'textfield',
				allowBlank : false,
				readOnly:true
			}
		}, {
			header : "<font color='blue'>��ע</font>",
			width :200,
			align : 'center',
			sortable : true,
			dataIndex : 'beizhu',
			editor : {
				xtype : 'textfield',
				allowBlank : true
			}
		} ],
		sm : sm,
		viewConfig : {
			// forceFit : true,
			columnsText : '��ʾ��',
			sortAscText : '����',
			sortDescText : '����'
		},
		stripeRows : true,
		tbar : [ {
			icon : ADD_OPERATION_ICON_PATH,
			text : '������Ʒ',
			disabled : (flag == "copyadd" || flag == "copyadd_update") ? true : false,
			handler : function() {
				var Plant = ManageObj.detailDataGridPan.getStore().recordType;
				var p = new Plant({
					huohao : '',
					shuliang : '1',
					beizhu : '',
					danjia:'',
					xiaoji:'0'
				});
				ManageObj.detailDataGridPan.stopEditing();
				ManageObj.detailDataStore.insert(ManageObj.detailDataStore.getCount(), p);
				ManageObj.detailDataGridPan.startEditing(0, 0);
			}
		}, {
			ref : '../removeBtn',
			icon : DELETE_OPERATION_ICON_PATH,
			text : 'ɾ����Ʒ',
			disabled : (flag == "copyadd" || flag == "copyadd_update") ? true : false,
			handler : function() {
				Ext.MessageBox.confirm('��ܰ���ѣ�', 'ȷ����Ҫ�ύ��ѡ������', function(info) {
					if (info == "yes") {
						ManageObj.detailDataGridPan.stopEditing();
						var s = ManageObj.detailDataGridPan.getSelectionModel().getSelections();
						for ( var i = 0, r; r = s[i]; i++) {
							ManageObj.detailDataStore.remove(r);
						}
						ManageObj.xiuGaiZongJi();
					}
				});
			}
		},'->','<font size="2" >�ܼƣ�</font><font size="2" id="zongji">0</font>' ]
	});

	ManageObj.detailDataGridPan.getSelectionModel().on('selectionchange', function(sm) {
		if (rowIndex == null) {
			ManageObj.detailDataGridPan.removeBtn.setDisabled(sm.getCount() < 1);
		}
	});
};

ManageObj.xiuGaiZongJi = function (){
	var zongji = 0 ;
	var store = ManageObj.detailDataGridPan.getStore();
	if( store != null &&  store.getCount() > 0 ){
		for( var i = 0 ; i <  store.getCount() ; i ++ ){
			var record = store.getAt(i);
			var xiaoji = Number( record.get('xiaoji') );
			zongji = zongji + xiaoji ;
		}
		document.getElementById("zongji").innerHTML = zongji.toFixed(2);
	}	
};

ManageObj.chaXunDanJia = function( huohao ){
	Ext.Ajax.request({
		waitMsg : '���۲�ѯ��......',
		url : '/WEB-ROOT/app/xiaoshouguanli/xiaoshouxinxi.do',
		method : 'POST',
		success : function(response, options) {
			var responseArray = Ext.util.JSON.decode(response.responseText);
			var danjia = responseArray.msg ;
			var s = ManageObj.detailDataGridPan.getSelectionModel().getSelections();
			if (s != null && s.length == 1) {
				var record = s[0];
				 record.set('danjia' , danjia);
				 record.set('xiaoji' , (danjia*record.get('shuliang')).toFixed(2)  );
			}
			ManageObj.xiuGaiZongJi();
		},
		params : {
			flag : "chaXunDanJia",
			huohao : huohao
		}
	});
};

ManageObj.chaXunDanJia1 = function( shuliang ){
	var s = ManageObj.detailDataGridPan.getSelectionModel().getSelections();
	if (s != null && s.length == 1) {
		var record = s[0];
		var danjia = Number( record.get('danjia') );
		 record.set('xiaoji' , (danjia*shuliang).toFixed(2)  );
	}
	ManageObj.xiuGaiZongJi();
};

/* �õ���ӻ�༭��FormPanel */
ManageObj.getOperationFormPan = function(rowIndex, flag) {
	var xiaoshoudanhao = GetTimeIndexNo() ;
	ManageObj.initDetailDataGridPan(rowIndex, flag,xiaoshoudanhao);
	ManageObj.operationFormPan = new Ext.FormPanel({
		id : 'operationFormPan',
		labelAlign : 'left',
		buttonAlign : 'center',
		bodyStyle : 'padding:0px;',
		frame : true,
		border : true,
		labelWidth : 90,
		autoWidth : true,
		autoHeight : true,

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
					xtype : 'textfield',
					fieldLabel : '&nbsp;���۵���',
					name : 'xiaoshoudanhao',
					id : 'xiaoshoudanhao',
					anchor : '95%',
					readOnly : true,
					allowBlank : false,
					value:xiaoshoudanhao
				} ]
			}, {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'textfield',
					fieldLabel : '&nbsp;������',
					name : 'jingshouren',
					id : 'jingshouren',
					anchor : '95%',
					readOnly : true,
					allowBlank : true
				} ]
			}, {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'textfield',
					fieldLabel : '&nbsp;���ѽ��',
					name : 'xiaofeijine',
					id : 'xiaofeijine',
					anchor : '95%',
					readOnly : true,
					value : '0',
					allowBlank : true
				} ]
			}, {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'textfield',
					fieldLabel : '&nbsp;��Ա���',
					name : 'huiyuanbianhao',
					id : 'huiyuanbianhao',
					anchor : '95%',
					allowBlank : true
				} ]
			}, {
				columnWidth : 1,
				layout : 'form',
				border : false,
				style : 'margin-left:97px;margin-bottom:15px;',
				items : [ ManageObj.detailDataGridPan ]
			}, {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'textarea',
					fieldLabel : '��ע',
					name : 'detail',
					id : 'detail',
					anchor : '95%'
				} ]
			} ]
		} ]
	});

	/* ������༭ʱ�е�ǰѡ���кŲ������õ���ǰ�м�¼����Ϣ����ʼ�������� */
	if (rowIndex != null) {
		ManageObj.operationFormPan.findById('xiaoshoudanhao').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('xiaoshoudanhao');
		ManageObj.operationFormPan.findById('jingshouren').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('jingshouren');
		ManageObj.operationFormPan.findById('xiaofeijine').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('xiaofeijine');
		ManageObj.operationFormPan.findById('huiyuanbianhao').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('huiyuanbianhao');

		Ext.getCmp('detail').setValue(ManageObj.dataGridPan.getStore().getAt(rowIndex).get('detail'));
		
		ManageObj.detailDataStore.baseParams.xiaoshoudanhao =  ManageObj.dataGridPan.getStore().getAt(rowIndex).get('xiaoshoudanhao');
		ManageObj.detailDataStore.load({
			params : {
				start : 0,
				limit : GLOBAL_MAX_PAGE_SIZE
			}
		});
	}

	return ManageObj.operationFormPan;
}

/**
 * @param {}
 *                Id
 * @param {}
 *                deleteFlag (1:ɾ�� �� 0:�ⶳ)
 * @function ɾ����ⶳ
 */
ManageObj.doDeleOrUnDele = function(id, deleteFlag) {
	if (!id) {
		ManageObj.doCheck(deleteFlag);
	} else {
		var infoTmp = (deleteFlag == "0") ? "" : "ɾ��";
		Ext.MessageBox.confirm('��ܰ���ѣ�', 'ȷ����Ҫ' + infoTmp + '��ѡ��¼��', function(info) {
			if (info == "yes") {
				Ext.Ajax.request({
					waitMsg : '�����ύ��......',
					url : '/WEB-ROOT/app/xiaoshouguanli/xiaoshouxinxi.do',
					method : 'POST',
					success : function(response, options) {
						var responseArray = Ext.util.JSON.decode(response.responseText);
						Ext.MessageBox.show({
							title : '��ܰ���ѣ�',
							msg : responseArray.msg,
							buttons : Ext.MessageBox.OK,
							fn : function() {
								ManageObj.dataStore.reload();
							},
							icon : Ext.MessageBox.INFO
						});
					},
					failure : function(response, options) {
						Ext.MessageBox.alert('��ܰ���ѣ�', responseArray.msg);
					},
					params : {
						flag : "doDeleOrUnDele",
						id : id,
						deleteFlag : deleteFlag
					}
				});
			}
		});
	}
}

/**
 * @param {}
 *                deleOrUnDele ��1��ɾ�� �� 0���ⶳ��
 * @function �ύɾ����ⶳʱ���ݺϷ�����֤
 */
ManageObj.doCheck = function(deleOrUnDele) {
	var sm = ManageObj.dataGridPan.getSelectionModel();
	var sel = sm.getSelections();
	var selCount = sm.getCount();
	if (selCount == 0) {
		Ext.Msg.show({
			title : '��ܰ��ʾ��',
			buttons : Ext.MessageBox.OK,
			msg : 'û�п����ύ�����ݣ���ѡ��',
			icon : Ext.MessageBox.ERROR
		});
		return;
	}

	/* ѡ���ҿ����ύ�ļ�¼ */
	var selectedRowId = "";
	/* ѡ�е���Ϊ��ɾ��״̬�ļ�¼ */
	var hasDeletedRowId = "";
	/* ѡ�е���Ϊ�ѽⶳ״̬�ļ�¼ */
	var hasUnDeletedRowId = "";
	for ( var i = 0; i < selCount; i++) {
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
			title : '��ܰ��ʾ��',
			buttons : Ext.MessageBox.OK,
			msg : '��ѡ��ĵ�' + hasUnDeletedRowId + "�е������Ѿ�Ϊ����״̬��������ѡ��",
			icon : Ext.MessageBox.ERROR
		});
		return;
	} else if (hasDeletedRowId != "") {
		Ext.Msg.show({
			title : '��ܰ��ʾ��',
			buttons : Ext.MessageBox.OK,
			msg : '��ѡ��ĵ�' + hasDeletedRowId + "�е������Ѿ���ɾ����������ѡ��",
			icon : Ext.MessageBox.ERROR
		});
		return;
	}

	ManageObj.doDeleOrUnDele(selectedRowId, deleOrUnDele);
};

/* ����Excel */
ManageObj.doExportExcel = function() {
	var url = "/WEB-ROOT/app/xiaoshouguanli/xiaoshouxinxi.do?flag=doExportExcel";
	window.open(url);
};

/* �ֶ�ͳ�� */
ManageObj.doTongJi = function() {
	Ext.Ajax.request({
		url : '/WEB-ROOT/app/xiaoshouguanli/xiaoshouxinxi.do',
		method : 'POST',
		success : function(response, options) {
			var responseArray = Ext.util.JSON.decode(response.responseText);
			document.all.tongJiFont.innerHTML = responseArray.msg;
		},
		params : {
			flag : "doTongJi",
			m : M,
			r : R
		}
	});
};
