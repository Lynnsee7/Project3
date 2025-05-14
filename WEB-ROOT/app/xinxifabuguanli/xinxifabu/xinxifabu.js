var ManageObj = function() {
	/* ������� */
	ManageObj.searchForm = null;

	/* ������༭������� */
	ManageObj.operationFormPan = null;

	/* �ϴ�����form */
	ManageObj.uploadForm = null;

	/* �����б� */
	ManageObj.dataGridPan = null;

	/* DataStore */
	ManageObj.dataStore = null;

	/* Pic Store */
	ManageObj.picStore = null;

	/* viewport */
	ManageObj.viewport = null;

	/* �������� */
	ManageObj.addWindow = null;

	/* �༭���� */
	ManageObj.updateWindow = null;

	/* ͼƬ���� */
	ManageObj.picWindow = null;

	/* �ϴ����� */
	ManageObj.uploadWindow = null;

	ManageObj.echartsWindow = null;

	/* �Ҽ��¼� */
	ManageObj.rightClick = null;

	/* �Ҽ�ѡ���к� */
	ManageObj.rightMenuClickRow = null;

	/* δ�޸�֮ǰ�ĸ���·�� */
	ManageObj.oldAttach = null;

	ManageObj.suoshufenleiGuanLianStore = new Ext.data.JsonStore({
		url: '/WEB-ROOT/app/xinxifabuguanli/xinxifabu.do',
		baseParams: {
			flag: 'doGuanLian',
			guanLianBiao: 'fenleishezhi',
			guanLianZiDuan: 'fenleimingchen'
		},
		root: 'root',
		totalProperty: 'totalProperty',
		fields: ['fenleimingchen']
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
		frame: (SEARCHFORM_STYLE == '1') ? true : false,
		border: false,
		labelWidth: 95,
		items: [{
			xtype: (SEARCHFORM_STYLE == '1') ? null : 'fieldset',
			title: (SEARCHFORM_STYLE == '1') ? null : '��ѯ����',
			anchor: '100%',
			layout: 'column',
			labelSeparator: '��',
			labelAlign: 'right',
			items: [{
				columnWidth: SearColWid,
				layout: 'form',
				border: false,
				items: [
					{
						xtype: 'textfield',
						fieldLabel: '���Ʊ���',
						name: 'mingchenbiaotiSearch',
						id: 'mingchenbiaotiSearch',
						anchor: '100%'
					}]
			}
				,
			{
				columnWidth: SearColWid,
				layout: 'form',
				border: false,
				items: [
					{
						xtype: 'textfield',
						fieldLabel: '��������',
						name: 'suoshufenleiSearch',
						id: 'suoshufenleiSearch',
						anchor: '100%'
					}]
			}
			]
		}],
		buttons: [

			{
				text: '����',
				hidden: ((R == "y") ? true : ((BUTTON_PLACE == "0") ? false : true)),
				handler: function() {
					ManageObj.doAdd();
				}
			},


			{
				text: 'ɾ��',
				hidden: ((R == "y") ? true : ((BUTTON_PLACE == "0") ? false : true)),
				handler: function() {
					ManageObj.doDeleOrUnDele(null, 1);
				}
			},

			{
				text: '��ѯ',
				handler: function() {
					ManageObj.doSearch();
				}
			}, {
				text: '���',
				handler: function() {
					ManageObj.searchForm.getForm().reset();
				}
			}


			,
			{
				text: '����ͳ��',
				hidden: (SP == "y") ? true : ((R == "n") ? true : false),
				handler: function() {
					ManageObj.doEcharts(1);
				}
			}


			/*
			, {
				text : '����Excel',
				hidden : ( (R == "y") ? true : (   (BUTTON_PLACE == "0") ? false : true )   ),
				xtype : 'button',
				handler : function() {
					ManageObj.doExportExcel();
				}
			} 
			*/
		]
	});
}

/* ��ʼ�������б� */
ManageObj.initDataGridPan = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();

	ManageObj.dataStore = new Ext.data.JsonStore({
		root: 'root',
		totalProperty: 'totalProperty',
		remoteSort: true,
		fields: ['mingchenbiaoti', 'suoshufenlei', 'miaoshuyi_d', 'miaoshuer_d', 'miaoshusan_d', 'miaoshusi_d', 'miaoshuwu_d', 'miaoshuyi', 'miaoshuer', 'miaoshusan', 'miaoshusi', 'miaoshuwu', 'faburen', 'fabushijian', 'xiangqingmiaoshu', 'shenpi', 'id', 'itime', 'detail', 'deleteFlag', 'erjiguanlianzd', 'attr1', 'attr2', 'attr3', 'attr4', 'attr5', 'fuJian'],
		proxy: new Ext.data.HttpProxy({
			url: '/WEB-ROOT/app/xinxifabuguanli/xinxifabu.do',
			method: 'POST'
		}),
		baseParams: {
			flag: 'getJsonStore',
			deleteFlagSearch: 0,
			r: R,
			erjiguanlianzd: erjiguanlianzd,
			sp: SP
		},
		listeners: {
			load: function loadCallBack(store, records, options) {
				ManageObj.doTongJi();
			}
		}
	});

	/*
	pagingBar = new Ext.ux.MyPagingToolbar({
		pageSize : GLOBAL_MAX_PAGE_SIZE,
		store : ManageObj.dataStore,
		displayMsg : '��ǰ��{0}��{1}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��{2}����¼',
		emptyMsg : "û���ҵ��κμ�¼��",
		displayInfo : false
	});
	*/
	pagingBar = new Ext.PagingToolbar({
		pageSize: GLOBAL_MAX_PAGE_SIZE,
		store: ManageObj.dataStore,
		displayMsg: '��ǰ��{0}��{1}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��{2}����¼',
		emptyMsg: "û���ҵ��κμ�¼��",
		displayInfo: false
	});

	var add_operation_icon_path = ADD_OPERATION_ICON_PATH_S1;
	if (OP_COL_STYLE == "2") {
		add_operation_icon_path = ADD_OPERATION_ICON_PATH_S2;
	} else if (OP_COL_STYLE == "3") {
		add_operation_icon_path = ADD_OPERATION_ICON_PATH_S3;
	} else if (OP_COL_STYLE == "4") {
		add_operation_icon_path = ADD_OPERATION_ICON_PATH_S4;
	} else if (OP_COL_STYLE == "5") {
		add_operation_icon_path = ADD_OPERATION_ICON_PATH_S5;
	}

	var delete_operation_icon_path = DELETE_OPERATION_ICON_PATH_S1;
	if (OP_COL_STYLE == "2") {
		delete_operation_icon_path = DELETE_OPERATION_ICON_PATH_S2;
	} else if (OP_COL_STYLE == "3") {
		delete_operation_icon_path = DELETE_OPERATION_ICON_PATH_S3;
	} else if (OP_COL_STYLE == "4") {
		delete_operation_icon_path = DELETE_OPERATION_ICON_PATH_S4;
	} else if (OP_COL_STYLE == "5") {
		delete_operation_icon_path = DELETE_OPERATION_ICON_PATH_S5;
	}

	var export_excel_icon_path = EXPORT_EXCEL_ICON_PATH_S1;
	if (OP_COL_STYLE == "2") {
		export_excel_icon_path = EXPORT_EXCEL_ICON_PATH_S2;
	} else if (OP_COL_STYLE == "3") {
		export_excel_icon_path = EXPORT_EXCEL_ICON_PATH_S3;
	} else if (OP_COL_STYLE == "4") {
		export_excel_icon_path = EXPORT_EXCEL_ICON_PATH_S4;
	} else if (OP_COL_STYLE == "5") {
		export_excel_icon_path = EXPORT_EXCEL_ICON_PATH_S5;
	}


	ManageObj.dataGridPan = new Ext.grid.GridPanel({
		id: 'getTask',
		//title : '<font id="tongJiFont"></font>',
		store: ManageObj.dataStore,
		loadMask: true,
		bbar: pagingBar,
		columns: [
			/*
			sm,
			*/

			{
				header: '<font color="blue">����</font>',
				width: 50,
				align: 'center',
				sortable: true,
				dataIndex: 'mingchenbiaoti'
			},
			{
				header: '<font color="blue">��������</font>',
				width: 60,
				align: 'center',
				sortable: true,
				hidden: true,
				dataIndex: 'suoshufenlei'
			},
			{
				header: '<font color="blue"></font>',
				width: 60,
				align: 'center',
				sortable: true,
				hidden: true,
				dataIndex: 'miaoshuyi_d'
			},
			{
				header: '<font color="blue"></font>',
				width: 60,
				align: 'center',
				sortable: true,
				hidden: true,
				dataIndex: 'miaoshuer_d'
			},
			{
				header: '<font color="blue"></font>',
				width: 60,
				align: 'center',
				sortable: true,
				hidden: true,
				dataIndex: 'miaoshusan_d'
			},
			{
				header: '<font color="blue"></font>',
				width: 60,
				align: 'center',
				sortable: true,
				hidden: true,
				dataIndex: 'miaoshusi_d'
			},
			{
				header: '<font color="blue"></font>',
				width: 60,
				align: 'center',
				sortable: true,
				hidden: true,
				dataIndex: 'miaoshuwu_d'
			},
			{
				header: '<font color="blue">������</font>',
				width: 60,
				align: 'center',
				sortable: true,
				hidden: true,
				dataIndex: 'faburen'
			},
			{
				header: '<font color="blue">����ʱ��</font>',
				width: 60,
				align: 'center',
				sortable: true,
				hidden: true,
				dataIndex: 'fabushijian'
			},
			{
				header: '<font color="blue">��������</font>',
				width: 60,
				align: 'center',
				sortable: true,
				hidden: true,
				dataIndex: 'xiangqingmiaoshu'
			},
			{
				header: '<font color="blue">����״̬</font>',
				width: 50,
				align: 'center',
				sortable: true,
				hidden: true,
				dataIndex: 'shenpi'
			},

			{
				header: "<font color='blue'>����</font>",
				width: 110,
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
		enableColumnHide: false,
		enableColumnMove: false,
		columnLines: true,
		enableHdMenu: false,
		tbar: [

			{
				text: '��������',
				hidden: ((R == "y") ? true : ((BUTTON_PLACE == "1") ? false : true)),
				handler: function() {
					ManageObj.doAdd();
				},
				icon: add_operation_icon_path
			},


			{
				text: 'ɾ������',
				hidden: ((R == "y") ? true : ((BUTTON_PLACE == "1") ? false : true)),
				handler: function() {
					ManageObj.doDeleOrUnDele(null, 1);
				},
				icon: delete_operation_icon_path
			},
			/*
			{
				text : '����Excel',
				hidden : ( (R == "y") ? true : (   (BUTTON_PLACE == "1") ? false : true  )  ),
				xtype : 'button',
				handler : function() {
					ManageObj.doExportExcel();
				},
				icon : EXPORT_EXCEL_ICON_PATH
			}, 
			*/
			'->', '<font id="tongJiFont"></font>'
			/*
			 {
				text : '��ʾȫ��',
				handler : function() {
					ManageObj.searchForm.getForm().reset();
					ManageObj.doSearch();
				},
				icon : DISPLAY_ALL_ICON_PATH
			},
			*/
		]
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
			collapsible: (SEARCHFORM_STYLE == '1') ? true : false,
			collapsed: (SEARCHFORM_STYLE == '1') ? false : false,
			title: (SEARCHFORM_STYLE == '1') ? ' ' : '',
			autoScroll: false,
			border: false,
			region: ((SEARCH_PLACE == "0") ? 'north' : 'south'),
			height: 145,
			items: [ManageObj.searchForm]
		}, {
			id: 'gridViewItem',
			layout: 'fit',
			split: false,
			border: false,
			autoScroll: false,
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
	var returnStr = "<a href=\"#\" onclick=\"ManageObj.update(" + rowIndex + ",'view');\">";
	if (OP_COL_STYLE == "" || OP_COL_STYLE == "1") {
		returnStr += "���</a>";
	} else if (OP_COL_STYLE == "2") {
		returnStr += "<img src='" + OP_COL_VIEW_ICON_S1 + "' width='14' height='14' title='���'></a>";
	} else if (OP_COL_STYLE == "3") {
		returnStr += "<img src='" + OP_COL_VIEW_ICON_S2 + "' width='14' height='14' title='���'></a>";
	} else if (OP_COL_STYLE == "4") {
		returnStr += "<span class='mylabel mylabel-default radius'>���</span></a>";
	} else if (OP_COL_STYLE == "5") {
		returnStr += "<button class='btn btn-xs btn-success' title='���'><i class='icon-signin'></i></button></a>";
	} else if (OP_COL_STYLE == "6") {
		returnStr += "<i class='bx bx-search' title='���'></i></a>";
	} else if (OP_COL_STYLE == "7") {
		returnStr += "<button type='button' class='myBtn myBtn-pill myBtn-sm myBtn-outline-secondary'>���</button></a>";
	} else if (OP_COL_STYLE == "8") {
		returnStr += "<button type='button' class='bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full'>���</button></a>";
	} else if (OP_COL_STYLE == "9") {
		returnStr += "<button type='button' class='bg-transparent hover:bg-gray-500 text-gray-dark font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded'>���</button></a>";
	} else if (OP_COL_STYLE == "10") {
		returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-success myBtn10-rounded myBtn10-icon' title='���'><i class='ti-search'></i></button></a>";
	} else if (OP_COL_STYLE == "11") {
		returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-success myBtn10-fw'>���</button></a>";
	} else if (OP_COL_STYLE == "12") {
		returnStr += "<button type='button' class='myBtn10 myBtn10-primary myBtn10-icon-text'><i class='ti-info-alt myBtn10-icon-prepend'></i>���</button></a>";
	} else if (OP_COL_STYLE == "13") {
		returnStr += "<button type='button' class='myBtn10 myBtn10-outline-primary myBtn10-icon-text'><i class='ti-zoom-in myBtn10-icon-prepend'></i>���</button></a>";
	} else if (OP_COL_STYLE == "14") {
		returnStr += "<button type='button' class='myBtn10 myBtn10-outline-primary myBtn10-rounded myBtn10-icon' title='���'><i class='ti-link text-danger'></i></button></a>";
	} else if (OP_COL_STYLE == "15") {
		returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon-text myBtn10-facebook'><i class='ti-search'></i>���</button></a>";
	} else if (OP_COL_STYLE == "16") {
		returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon myBtn10-facebook btn-rounded' title='���'><i class='ti-search'></i></button></a>";
	}
	
	

	if (R == "n") {

		returnStr = "&nbsp;&nbsp;<a href=\"#\" onclick=\"ManageObj.update(" + rowIndex + ",'update');\">";
		if (OP_COL_STYLE == "" || OP_COL_STYLE == "1") {
			returnStr += "�༭</a>";
		} else if (OP_COL_STYLE == "2") {
			returnStr += "<img src='" + OP_COL_EDIT_ICON_S1 + "' width='14' height='14' title='�༭'></a>";
		} else if (OP_COL_STYLE == "3") {
			returnStr += "<img src='" + OP_COL_EDIT_ICON_S2 + "' width='14' height='14' title='�༭'></a>";
		} else if (OP_COL_STYLE == "4") {
			returnStr += "<span class='mylabel mylabel-success radius'>�༭</span></a>";
		} else if (OP_COL_STYLE == "5") {
			returnStr += "<button class='btn btn-xs btn-warning' title='�༭'><i class='icon-pencil'></i></button></a>";
		} else if (OP_COL_STYLE == "6") {
			returnStr += "<i class='bx bx-edit' title='�༭'></i></a>";
		} else if (OP_COL_STYLE == "7") {
			returnStr += "<button type='button' class='myBtn myBtn-pill myBtn-sm myBtn-outline-info'>�༭</button></a>";
		} else if (OP_COL_STYLE == "8") {
			returnStr += "<button type='button' class='bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full'>�༭</button></a>";
		} else if (OP_COL_STYLE == "9") {
			returnStr += "<button type='button' class='bg-transparent hover:bg-blue-500 text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>�༭</button></a>";
		} else if (OP_COL_STYLE == "10") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-primary myBtn10-rounded myBtn10-icon' title='�༭'><i class='ti-pencil'></i></button></a>";
		} else if (OP_COL_STYLE == "11") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-primary myBtn10-fw'>�༭</button></a>";
		} else if (OP_COL_STYLE == "12") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-warning myBtn10-icon-text'><i class='ti-slice myBtn10-icon-prepend'></i>�༭</button></a>";
		} else if (OP_COL_STYLE == "13") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-outline-success myBtn10-icon-text'><i class='ti-pencil-alt myBtn10-icon-prepend'></i>�༭</button></a>";
		} else if (OP_COL_STYLE == "14") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-outline-success myBtn10-rounded myBtn10-icon' title='�༭'><i class='ti-pencil-alt text-danger'></i></button></a>";
		} else if (OP_COL_STYLE == "15") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon-text myBtn10-youtube'><i class='ti-settings'></i>�༭</button></a>";
		} else if (OP_COL_STYLE == "16") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon myBtn10-youtube btn-rounded' title='�༭'><i class='ti-pencil-alt'></i></button></a>";
		}

		returnStr += "&nbsp;&nbsp;<a href=\"#\" onclick=\"ManageObj.doDeleOrUnDele('" + record.data['id'] + "','1');\">";
		if (OP_COL_STYLE == "" || OP_COL_STYLE == "1") {
			returnStr += "ɾ��</a>";
		} else if (OP_COL_STYLE == "2") {
			returnStr += "<img src='" + OP_COL_DELE_ICON_S1 + "' width='14' height='14' title='ɾ��'></a>";
		} else if (OP_COL_STYLE == "3") {
			returnStr += "<img src='" + OP_COL_DELE_ICON_S2 + "' width='14' height='14' title='ɾ��'></a>";
		} else if (OP_COL_STYLE == "4") {
			returnStr += "<span class='mylabel mylabel-danger radius'>ɾ��</span></a>";
		} else if (OP_COL_STYLE == "5") {
			returnStr += "<button class='btn btn-xs btn-danger' title='ɾ��'><i class='icon-remove'></i></button></a>";
		} else if (OP_COL_STYLE == "6") {
			returnStr += "<i class='bx bx-minus-circle' title='ɾ��'></i></a>";
		} else if (OP_COL_STYLE == "7") {
			returnStr += "<button type='button' class='myBtn myBtn-pill myBtn-sm myBtn-outline-danger'>ɾ��</button></a>";
		} else if (OP_COL_STYLE == "8") {
			returnStr += "<button type='button' class='bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full'>ɾ ��</button></a>";
		} else if (OP_COL_STYLE == "9") {
			returnStr += "<button type='button' class='bg-transparent hover:bg-red-500 text-red-dark font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'>ɾ��</button></a>";
		} else if (OP_COL_STYLE == "10") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-danger myBtn10-rounded myBtn10-icon' title='ɾ��'><i class='ti-trash'></i></button></a>";
		} else if (OP_COL_STYLE == "11") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-danger myBtn10-fw'>ɾ��</button></a>";
		} else if (OP_COL_STYLE == "12") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-danger myBtn10-icon-text'><i class='ti-cut myBtn10-icon-prepend'></i>ɾ��</button></a>";
		} else if (OP_COL_STYLE == "13") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-outline-danger myBtn10-icon-text'><i class='ti-close myBtn10-icon-prepend'></i>ɾ��</button></a>";
		} else if (OP_COL_STYLE == "14") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-outline-danger myBtn10-rounded myBtn10-icon' title='ɾ��'><i class='ti-trash text-danger'></i></button></a>";
		} else if (OP_COL_STYLE == "15") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon-text myBtn10-twitter'><i class='ti-na'></i>ɾ��</button></a>";
		} else if (OP_COL_STYLE == "16") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon myBtn10-twitter btn-rounded' title='ɾ��'><i class='ti-cut'></i></button></a>";
		}
		
		
		
		returnStr += "&nbsp;&nbsp;<a href=\"#\" onclick=\"ManageObj.doPic('update','" + record.data['id'] + "');\">";
		if (OP_COL_STYLE == "" || OP_COL_STYLE == "1") {
			returnStr += "ͼƬ</a>";
		} else if (OP_COL_STYLE == "2") {
			returnStr += "<img src='" + OP_COL_PIC_ICON_S1 + "' width='14' height='14' title='ͼƬ'></a>";
		} else if (OP_COL_STYLE == "3") {
			returnStr += "<img src='" + OP_COL_PIC_ICON_S2 + "' width='14' height='14' title='ͼƬ'></a>";
		} else if (OP_COL_STYLE == "4") {
			returnStr += "<span class='mylabel mylabel-secondary radius'>ͼƬ</span></a>";
		} else if (OP_COL_STYLE == "5") {
			returnStr += "<button class='btn btn-xs btn-primary' title='ͼƬ'><i class='icon-picture'></i></button></a>";
		} else if (OP_COL_STYLE == "6") {
			returnStr += "<i class='bx bx-photo-album' title='ͼƬ'></i></a>";
		} else if (OP_COL_STYLE == "7") {
			returnStr += "<button type='button' class='myBtn myBtn-pill myBtn-sm myBtn-outline-warning'>ͼƬ</button></a>";
		} else if (OP_COL_STYLE == "8") {
			returnStr += "<button type='button' class='bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full'>ͼƬ</button></a>";
		} else if (OP_COL_STYLE == "9") {
			returnStr += "<button type='button' class='bg-transparent hover:bg-green-500 text-green-dark font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded'>ͼƬ</button></a>";
		} else if (OP_COL_STYLE == "10") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-warning myBtn10-rounded myBtn10-icon' title='�ϴ�ͼƬ'><i class='ti-image'></i></button></a>";
		} else if (OP_COL_STYLE == "11") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-warning myBtn10-fw'>ͼƬ</button></a>";
		} else if (OP_COL_STYLE == "12") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-info myBtn10-icon-text'><i class='ti-gallery myBtn10-icon-prepend'></i>ͼƬ</button></a>";
		} else if (OP_COL_STYLE == "13") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-outline-info myBtn10-icon-text'><i class='ti-palette myBtn10-icon-prepend'></i>ͼƬ</button></a>";
		} else if (OP_COL_STYLE == "14") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-outline-info myBtn10-rounded myBtn10-icon' title='�ϴ�ͼƬ'><i class='ti-camera text-danger'></i></button></a>";
		} else if (OP_COL_STYLE == "15") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon-text myBtn10-dribbble'><i class='ti-camera'></i>ͼƬ</button></a>";
		} else if (OP_COL_STYLE == "16") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon myBtn10-dribbble btn-rounded' title='�ϴ�ͼƬ'><i class='ti-gallery'></i></button></a>";
		}
		

	} else {
		
		/*
		returnStr += "&nbsp;&nbsp;<a href=\"#\" onclick=\"ManageObj.doPic('view','" + record.data['id'] + "');\">";
		if (OP_COL_STYLE == "" || OP_COL_STYLE == "1") {
			returnStr += "ͼƬ</a>";
		} else if (OP_COL_STYLE == "2") {
			returnStr += "<img src='" + OP_COL_PIC_ICON_S1 + "' width='14' height='14' title='ͼƬ'></a>";
		} else if (OP_COL_STYLE == "3") {
			returnStr += "<img src='" + OP_COL_PIC_ICON_S2 + "' width='14' height='14' title='ͼƬ'></a>";
		} else if (OP_COL_STYLE == "4") {
			returnStr += "<span class='mylabel mylabel-secondary radius'>ͼƬ</span></a>";
		} else if (OP_COL_STYLE == "5") {
			returnStr += "<button class='btn btn-xs btn-primary' title='ͼƬ'><i class='icon-picture'></i></button></a>";
		} else if (OP_COL_STYLE == "6") {
			returnStr += "<i class='bx bx-photo-album' title='ͼƬ'></i></a>";
		} else if (OP_COL_STYLE == "7") {
			returnStr += "<button type='button' class='myBtn myBtn-pill myBtn-sm myBtn-outline-warning'>ͼƬ</button></a>";
		} else if (OP_COL_STYLE == "8") {
			returnStr += "<button type='button' class='bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full'>ͼƬ</button></a>";
		} else if (OP_COL_STYLE == "9") {
			returnStr += "<button type='button' class='bg-transparent hover:bg-green-500 text-green-dark font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded'>ͼƬ</button></a>";
		} else if (OP_COL_STYLE == "10") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-warning myBtn10-rounded myBtn10-icon'><i class='ti-image'></i></button></a>";
		}
		*/
	
	}

	if (SP == "y") {
		if( record.data['shenpi'] == "������" ){
			returnStr += "&nbsp;&nbsp;<a href=\"#\" onclick=\"ManageObj.doShenPi('" + record.data['id'] + "','����ͨ��');\">";
			if (OP_COL_STYLE == "" || OP_COL_STYLE == "1") {
				returnStr += "ͨ��</a>";
			} else if (OP_COL_STYLE == "2") {
				returnStr += "<img src='" + OP_COL_Y_ICON_S1 + "' width='14' height='14' title='ͨ��'></a>";
			} else if (OP_COL_STYLE == "3") {
				returnStr += "<img src='" + OP_COL_Y_ICON_S2 + "' width='14' height='14' title='ͨ��'></a>";
			} else if (OP_COL_STYLE == "4") {
				returnStr += "<span class='mylabel mylabel-success radius'>ͨ��</span></a>";
			} else if (OP_COL_STYLE == "5") {
				returnStr += "<button class='btn btn-xs btn-success' title='ͨ��'><i class='icon-chevron-up'></i></button></a>";
			} else if (OP_COL_STYLE == "6") {
				returnStr += "<i class='bx bx-check' title='ͨ��'></i></a>";
			} else if (OP_COL_STYLE == "7") {
				returnStr += "<button type='button' class='myBtn myBtn-pill myBtn-sm myBtn-outline-success'>ͨ��</button></a>";
			} else if (OP_COL_STYLE == "8") {
				returnStr += "<button type='button' class='bg-orange-500 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-full'>ͨ��</button></a>";
			} else if (OP_COL_STYLE == "9") {
				returnStr += "<button type='button' class='bg-transparent hover:bg-orange-500 text-orange-dark font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded'>ͨ��</button></a>";
			} else if (OP_COL_STYLE == "10") {
				returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-danger myBtn10-rounded myBtn10-icon' title='���ͨ��'><i class='ti-check'></i></button></a>";
			} else if (OP_COL_STYLE == "11") {
				returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-danger myBtn10-fw'>ͨ��</button></a>";
			} else if (OP_COL_STYLE == "12") {
				returnStr += "<button type='button' class='myBtn10 myBtn10-success myBtn10-icon-text'><i class='ti-check-box myBtn10-icon-prepend'></i>ͨ��</button></a>";
			} else if (OP_COL_STYLE == "13") {
				returnStr += "<button type='button' class='myBtn10 myBtn10-outline-success myBtn10-icon-text'><i class='ti-face-smile myBtn10-icon-prepend'></i>ͨ��</button></a>";
			} else if (OP_COL_STYLE == "14") {
				returnStr += "<button type='button' class='myBtn10 myBtn10-outline-success myBtn10-rounded myBtn10-icon' title='���ͨ��'><i class='ti-thumb-up text-danger'></i></button></a>";
			} else if (OP_COL_STYLE == "15") {
				returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon-text myBtn10-google'><i class='ti-check-box'></i>ͨ��</button></a>";
			} else if (OP_COL_STYLE == "16") {
				returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon myBtn10-dribbble btn-rounded' title='���ͨ��'><i class='ti-check'></i></button></a>";
			}

			/*
			returnStr += "&nbsp;&nbsp;<a href=\"#\" onclick=\"ManageObj.doShenPi('" + record.data['id'] + "','��������');\">";
			if (OP_COL_STYLE == "1") {
				returnStr += "����</a>";
			} else if (OP_COL_STYLE == "2") {
				returnStr += "<img src='" + OP_COL_N_ICON_S1 + "' width='14' height='14' title='����'></a>";
			} else if (OP_COL_STYLE == "3") {
				returnStr += "<img src='" + OP_COL_N_ICON_S2 + "' width='14' height='14' title='����'></a>";
			} else if (OP_COL_STYLE == "4") {
				returnStr += "<span class='mylabel mylabel-danger radius'>����</span></a>";
			} else if (OP_COL_STYLE == "5") {
				returnStr += "<button class='btn btn-xs btn-danger' title='����'><i class='icon-chevron-down'></i></button></a>";
			} else if (OP_COL_STYLE == "6") {
				returnStr += "<i class='bx bx-lock' title='����'></i></a>";
			} else if (OP_COL_STYLE == "7") {
				returnStr += "<button type='button' class='myBtn myBtn-pill myBtn-sm myBtn-outline-dark'>����</button></a>";
			}
			
			*/
		}
	}
	return returnStr;
}

ManageObj.doShenPi = function(id, shenpi) {
	Ext.MessageBox.confirm('��ܰ���ѣ�', 'ȷ����Ҫ�ύ��¼��',
		function(info) {
			if (info == "yes") {
				Ext.Ajax.request({
					waitMsg: '�����ύ��......',
					url: '/WEB-ROOT/app/xinxifabuguanli/xinxifabu.do',
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
						shenpi: shenpi
					}
				});
			}
		});
}

/* ��ѯ */
ManageObj.doSearch = function() {

	ManageObj.dataStore.baseParams.mingchenbiaotiSearch = document.all.mingchenbiaotiSearch.value;
	ManageObj.dataStore.baseParams.suoshufenleiSearch = document.all.suoshufenleiSearch.value;

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
		labelWidth: 70,
		autoWidth: true,
		autoHeight: true,
		fileUpload: false,
		items: [{
			anchor: '100%',
			layout: 'column',
			labelSeparator: '��',
			labelAlign: 'right',
			items: [{
				columnWidth: OperColWid,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'textfield',
					fieldLabel: '<font color="red">*</font>&nbsp;&nbsp;���Ʊ���',
					name: 'mingchenbiaoti',
					id: 'mingchenbiaoti',
					anchor: '98%',
					allowBlank: false
				}]
			}
				, {
				columnWidth: OperColWid,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'combo',
					fieldLabel: '<font color="red">*</font>&nbsp;��������',
					store: ManageObj.suoshufenleiGuanLianStore,
					valueField: 'fenleimingchen',
					displayField: 'fenleimingchen',
					mode: 'remote',
					forceSelection: false,
					hiddenName: 'suoshufenleiHidd',
					triggerAction: 'all',
					editable: true,
					name: 'suoshufenlei',
					id: 'suoshufenlei',
					anchor: '98%',
					allowBlank: false
				}]
			}
				, {
				columnWidth: OperColWid,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'textfield',
					fieldLabel: '&nbsp;' + (rowIndex == null) ? miaoshu_default_value[0] : ManageObj.dataGridPan.getStore().getAt(rowIndex).get('miaoshuyi_d'),
					name: 'miaoshuyi',
					id: 'miaoshuyi',
					anchor: '98%',
					allowBlank: true
				}, {
					xtype: 'hidden',
					name: 'miaoshuyi_d',
					id: 'miaoshuyi_d',
					value: miaoshu_default_value[0]
				}]
			}
				, {
				columnWidth: OperColWid,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'textfield',
					fieldLabel: '&nbsp;' + (rowIndex == null) ? miaoshu_default_value[1] : ManageObj.dataGridPan.getStore().getAt(rowIndex).get('miaoshuer_d'),
					name: 'miaoshuer',
					id: 'miaoshuer',
					anchor: '98%',
					allowBlank: true
				}, {
					xtype: 'hidden',
					name: 'miaoshuer_d',
					id: 'miaoshuer_d',
					value: miaoshu_default_value[1]
				}]
			}
				, {
				columnWidth: OperColWid,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'textfield',
					fieldLabel: '&nbsp;' + (rowIndex == null) ? miaoshu_default_value[2] : ManageObj.dataGridPan.getStore().getAt(rowIndex).get('miaoshusan_d'),
					name: 'miaoshusan',
					id: 'miaoshusan',
					anchor: '98%',
					allowBlank: true
				}, {
					xtype: 'hidden',
					name: 'miaoshusan_d',
					id: 'miaoshusan_d',
					value: miaoshu_default_value[2]
				}]
			}
				, {
				columnWidth: OperColWid,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'textfield',
					fieldLabel: '&nbsp;' + (rowIndex == null) ? miaoshu_default_value[3] : ManageObj.dataGridPan.getStore().getAt(rowIndex).get('miaoshusi_d'),
					name: 'miaoshusi',
					id: 'miaoshusi',
					anchor: '98%',
					allowBlank: true
				}, {
					xtype: 'hidden',
					name: 'miaoshusi_d',
					id: 'miaoshusi_d',
					value: miaoshu_default_value[3]
				}]
			}
				, {
				columnWidth: OperColWid,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'textfield',
					fieldLabel: '&nbsp;' + (rowIndex == null) ? miaoshu_default_value[4] : ManageObj.dataGridPan.getStore().getAt(rowIndex).get('miaoshuwu_d'),
					name: 'miaoshuwu',
					id: 'miaoshuwu',
					anchor: '98%',
					allowBlank: true
				}, {
					xtype: 'hidden',
					name: 'miaoshuwu_d',
					id: 'miaoshuwu_d',
					value: miaoshu_default_value[4]
				}]
			}
				, {
				columnWidth: OperColWid,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'textfield',
					fieldLabel: '<font color="red">*</font>&nbsp;&nbsp;������',
					name: 'faburen',
					id: 'faburen',
					anchor: '98%',
					readOnly: true,
					value: LoginUserAcct,
					allowBlank: false
				}]
			}
				, {
				columnWidth: OperColWid,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'datefield',
					format: 'Y-m-d',
					fieldLabel: '<font color="red">*</font>&nbsp;&nbsp;����ʱ��',
					name: 'fabushijian',
					id: 'fabushijian',
					anchor: '98%',
					readOnly: true,
					value: GetNowDate(),
					allowBlank: false
				}]
			}
				, {
				columnWidth: 1,
				layout: 'form',
				border: false,
				anchor: '98%',
				items: [{
					fieldLabel: '<font color="red">*</font>&nbsp;&nbsp;��������',
					html: '<br><div id="xqDiv" height="200" width="99%"></div><br>'
				}]

			}
				, {
				columnWidth: 1,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'textfield',
					fieldLabel: '&nbsp;����״̬',
					name: 'shenpi',
					id: 'shenpi',
					anchor: '98%',
					readOnly: true,
					value: '������',
					allowBlank: true
				}]
			}
				, {
				columnWidth: 1,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'textfield',
					fieldLabel: '&nbsp;����',
					name: 'fuJian',
					id: 'fuJian',
					anchor: '98%'
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
					anchor: '98%'
				}]
			}]
		}]
	});

	/* ������༭ʱ�е�ǰѡ���кŲ������õ���ǰ�м�¼����Ϣ����ʼ�������� */
	if (rowIndex != null) {
		ManageObj.operationFormPan.findById('mingchenbiaoti').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('mingchenbiaoti');
		ManageObj.operationFormPan.findById('suoshufenlei').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('suoshufenlei');
		ManageObj.operationFormPan.findById('miaoshuyi').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('miaoshuyi');
		ManageObj.operationFormPan.findById('miaoshuer').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('miaoshuer');
		ManageObj.operationFormPan.findById('miaoshusan').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('miaoshusan');
		ManageObj.operationFormPan.findById('miaoshusi').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('miaoshusi');
		ManageObj.operationFormPan.findById('miaoshuwu').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('miaoshuwu');
		ManageObj.operationFormPan.findById('faburen').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('faburen');
		ManageObj.operationFormPan.findById('fabushijian').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('fabushijian');
		ManageObj.operationFormPan.findById('shenpi').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('shenpi');
		ManageObj.operationFormPan.findById('fuJian').value = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('fuJian');
		
		
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
						url: '/WEB-ROOT/app/xinxifabuguanli/xinxifabu.do',
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
	var url = "/WEB-ROOT/app/xinxifabuguanli/xinxifabu.do?flag=doExportExcel";
	window.open(url);
};

/* �ֶ�ͳ�� */
ManageObj.doTongJi = function() {
	Ext.Ajax.request({
		url: '/WEB-ROOT/app/xinxifabuguanli/xinxifabu.do',
		method: 'POST',
		success: function(response, options) {
			var responseArray = Ext.util.JSON.decode(response.responseText);
			document.all.tongJiFont.innerHTML = responseArray.msg;
		},
		params: {
			flag: "doTongJi",
			m: M,
			r: R,
			erjiguanlianzd: erjiguanlianzd
		}
	});
};


ManageObj.doEcharts = function(t) {
	ManageObj.echartsWindow = new Ext.Window({
		maximized: true,
		collapsible: false,
		autoScroll: true,
		modal: true,
		frame: true,
		border: true,
		labelAlign: 'center',
		buttonAlign: 'center',
		//width : Math.floor( document.body.clientWidth * 0.95 ) ,
		//height : Math.floor( document.body.clientHeight * 0.95 ) ,
		closable: true,
		closeAction: 'close',
		resizable: false,
		layout: 'fit',
		buttons: [{
			text: '����',
			handler: function() {
				ManageObj.echartsWindow.close();
			}
		}],
		html: "<iframe scrolling=no src='/WEB-ROOT/app/xinxifabuguanli/xinxifabu.do?flag=doEcharts&t=" + t + "' frameborder='0' width='100%' height='100%' ></iframe>"
	});
	ManageObj.echartsWindow.show();
};

