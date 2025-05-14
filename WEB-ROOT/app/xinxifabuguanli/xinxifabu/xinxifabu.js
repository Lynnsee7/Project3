var ManageObj = function() {
	/* 搜索面板 */
	ManageObj.searchForm = null;

	/* 新增或编辑操作面板 */
	ManageObj.operationFormPan = null;

	/* 上传附件form */
	ManageObj.uploadForm = null;

	/* 数据列表 */
	ManageObj.dataGridPan = null;

	/* DataStore */
	ManageObj.dataStore = null;

	/* Pic Store */
	ManageObj.picStore = null;

	/* viewport */
	ManageObj.viewport = null;

	/* 新增窗口 */
	ManageObj.addWindow = null;

	/* 编辑窗口 */
	ManageObj.updateWindow = null;

	/* 图片窗口 */
	ManageObj.picWindow = null;

	/* 上传窗口 */
	ManageObj.uploadWindow = null;

	ManageObj.echartsWindow = null;

	/* 右键事件 */
	ManageObj.rightClick = null;

	/* 右键选中行号 */
	ManageObj.rightMenuClickRow = null;

	/* 未修改之前的附件路径 */
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

/* 初始化用户界面 */
ManageObj.init = function() {
	/* 必须要加上这一句，否则没有报错提示信息 */
	Ext.QuickTips.init();
	ManageObj.initSearchForm();
	ManageObj.initDataGridPan();
	ManageObj.loadData();
	ManageObj.initViewport();
}

/* 初始化搜索表单 */
ManageObj.initSearchForm = function() {
	/* 初始化搜索表单 */
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
			title: (SEARCHFORM_STYLE == '1') ? null : '查询条件',
			anchor: '100%',
			layout: 'column',
			labelSeparator: '：',
			labelAlign: 'right',
			items: [{
				columnWidth: SearColWid,
				layout: 'form',
				border: false,
				items: [
					{
						xtype: 'textfield',
						fieldLabel: '名称标题',
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
						fieldLabel: '所属分类',
						name: 'suoshufenleiSearch',
						id: 'suoshufenleiSearch',
						anchor: '100%'
					}]
			}
			]
		}],
		buttons: [

			{
				text: '新增',
				hidden: ((R == "y") ? true : ((BUTTON_PLACE == "0") ? false : true)),
				handler: function() {
					ManageObj.doAdd();
				}
			},


			{
				text: '删除',
				hidden: ((R == "y") ? true : ((BUTTON_PLACE == "0") ? false : true)),
				handler: function() {
					ManageObj.doDeleOrUnDele(null, 1);
				}
			},

			{
				text: '查询',
				handler: function() {
					ManageObj.doSearch();
				}
			}, {
				text: '清空',
				handler: function() {
					ManageObj.searchForm.getForm().reset();
				}
			}


			,
			{
				text: '数据统计',
				hidden: (SP == "y") ? true : ((R == "n") ? true : false),
				handler: function() {
					ManageObj.doEcharts(1);
				}
			}


			/*
			, {
				text : '导出Excel',
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

/* 初始化数据列表 */
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
		displayMsg : '当前第{0}到{1}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共{2}条记录',
		emptyMsg : "没有找到任何记录！",
		displayInfo : false
	});
	*/
	pagingBar = new Ext.PagingToolbar({
		pageSize: GLOBAL_MAX_PAGE_SIZE,
		store: ManageObj.dataStore,
		displayMsg: '当前第{0}到{1}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共{2}条记录',
		emptyMsg: "没有找到任何记录！",
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
				header: '<font color="blue">标题</font>',
				width: 50,
				align: 'center',
				sortable: true,
				dataIndex: 'mingchenbiaoti'
			},
			{
				header: '<font color="blue">所属分类</font>',
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
				header: '<font color="blue">发布人</font>',
				width: 60,
				align: 'center',
				sortable: true,
				hidden: true,
				dataIndex: 'faburen'
			},
			{
				header: '<font color="blue">发布时间</font>',
				width: 60,
				align: 'center',
				sortable: true,
				hidden: true,
				dataIndex: 'fabushijian'
			},
			{
				header: '<font color="blue">详情描述</font>',
				width: 60,
				align: 'center',
				sortable: true,
				hidden: true,
				dataIndex: 'xiangqingmiaoshu'
			},
			{
				header: '<font color="blue">审批状态</font>',
				width: 50,
				align: 'center',
				sortable: true,
				hidden: true,
				dataIndex: 'shenpi'
			},

			{
				header: "<font color='blue'>操作</font>",
				width: 110,
				align: 'center',
				sortable: false,
				renderer: ManageObj.operatorRenderer,
				dataIndex: 'oper'
			}],
		sm: sm,
		viewConfig: {
			forceFit: true,
			columnsText: '显示列',
			sortAscText: '升序',
			sortDescText: '降序'
		},
		stripeRows: true,
		enableColumnHide: false,
		enableColumnMove: false,
		columnLines: true,
		enableHdMenu: false,
		tbar: [

			{
				text: '新增数据',
				hidden: ((R == "y") ? true : ((BUTTON_PLACE == "1") ? false : true)),
				handler: function() {
					ManageObj.doAdd();
				},
				icon: add_operation_icon_path
			},


			{
				text: '删除数据',
				hidden: ((R == "y") ? true : ((BUTTON_PLACE == "1") ? false : true)),
				handler: function() {
					ManageObj.doDeleOrUnDele(null, 1);
				},
				icon: delete_operation_icon_path
			},
			/*
			{
				text : '导出Excel',
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
				text : '显示全部',
				handler : function() {
					ManageObj.searchForm.getForm().reset();
					ManageObj.doSearch();
				},
				icon : DISPLAY_ALL_ICON_PATH
			},
			*/
		]
	});

	/* 右键弹出菜单 */
	//ManageObj.dataGridPan.addListener('rowcontextmenu', ManageObj.rightClickFn);
}

/* 右键响应事件 */
ManageObj.rightClickFn = function(grid, rowIndex, e) {
	e.preventDefault();
	ManageObj.rightMenuClickRow = rowIndex;

	/* 清空所有菜单项 */
	if (ManageObj.rightClick != null) {
		ManageObj.rightClick.removeAll();
	}
	/* 创建菜单 */
	ManageObj.rightClick = new Ext.menu.Menu({
		id: 'rightClickCont',
		items: [{
			id: 'rMenu3',
			text: '新增表单',
			icon: RIGHT_CLICK_ADD_OPERATION_ICON_PATH,
			handler: function() {
				ManageObj.doAdd();
			}
		}, {
			id: 'rMenu1',
			text: '浏览表单',
			icon: VIEW_OPERATION_ICON_PATH,
			handler: function() {
				ManageObj.update(ManageObj.rightMenuClickRow, "view");
			}
		}, {
			id: 'rMenu2',
			text: '编辑表单',
			icon: EDIT_OPERATION_ICON_PATH,
			handler: function() {
				ManageObj.update(ManageObj.rightMenuClickRow, "update");
			}
		}]
	});

	/* 当前选中行状态 */
	var nowSelectedRowStutas = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('deleteFlag');
	var nowSelectedRowId = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('id');
	var nowStutasStr = "删除表单";
	var nowIcon = LOCK_OPERATION_ICON_PATH;
	var nowOption = 1;

	/* 根据当前选中行的状态，动态新增删除或解冻菜单项 */
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

/* 初始化viewport */
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

/* 加载数据 */
ManageObj.loadData = function() {
	ManageObj.dataStore.load({
		params: {
			start: 0,
			limit: GLOBAL_MAX_PAGE_SIZE
		}
	});
}

/* 操作列Renderer */
ManageObj.operatorRenderer = function(id, cellmeta, record, rowIndex, columnIndex, store) {
	var returnStr = "<a href=\"#\" onclick=\"ManageObj.update(" + rowIndex + ",'view');\">";
	if (OP_COL_STYLE == "" || OP_COL_STYLE == "1") {
		returnStr += "浏览</a>";
	} else if (OP_COL_STYLE == "2") {
		returnStr += "<img src='" + OP_COL_VIEW_ICON_S1 + "' width='14' height='14' title='浏览'></a>";
	} else if (OP_COL_STYLE == "3") {
		returnStr += "<img src='" + OP_COL_VIEW_ICON_S2 + "' width='14' height='14' title='浏览'></a>";
	} else if (OP_COL_STYLE == "4") {
		returnStr += "<span class='mylabel mylabel-default radius'>浏览</span></a>";
	} else if (OP_COL_STYLE == "5") {
		returnStr += "<button class='btn btn-xs btn-success' title='浏览'><i class='icon-signin'></i></button></a>";
	} else if (OP_COL_STYLE == "6") {
		returnStr += "<i class='bx bx-search' title='浏览'></i></a>";
	} else if (OP_COL_STYLE == "7") {
		returnStr += "<button type='button' class='myBtn myBtn-pill myBtn-sm myBtn-outline-secondary'>浏览</button></a>";
	} else if (OP_COL_STYLE == "8") {
		returnStr += "<button type='button' class='bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full'>浏览</button></a>";
	} else if (OP_COL_STYLE == "9") {
		returnStr += "<button type='button' class='bg-transparent hover:bg-gray-500 text-gray-dark font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded'>浏览</button></a>";
	} else if (OP_COL_STYLE == "10") {
		returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-success myBtn10-rounded myBtn10-icon' title='浏览'><i class='ti-search'></i></button></a>";
	} else if (OP_COL_STYLE == "11") {
		returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-success myBtn10-fw'>浏览</button></a>";
	} else if (OP_COL_STYLE == "12") {
		returnStr += "<button type='button' class='myBtn10 myBtn10-primary myBtn10-icon-text'><i class='ti-info-alt myBtn10-icon-prepend'></i>浏览</button></a>";
	} else if (OP_COL_STYLE == "13") {
		returnStr += "<button type='button' class='myBtn10 myBtn10-outline-primary myBtn10-icon-text'><i class='ti-zoom-in myBtn10-icon-prepend'></i>浏览</button></a>";
	} else if (OP_COL_STYLE == "14") {
		returnStr += "<button type='button' class='myBtn10 myBtn10-outline-primary myBtn10-rounded myBtn10-icon' title='浏览'><i class='ti-link text-danger'></i></button></a>";
	} else if (OP_COL_STYLE == "15") {
		returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon-text myBtn10-facebook'><i class='ti-search'></i>浏览</button></a>";
	} else if (OP_COL_STYLE == "16") {
		returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon myBtn10-facebook btn-rounded' title='浏览'><i class='ti-search'></i></button></a>";
	}
	
	

	if (R == "n") {

		returnStr = "&nbsp;&nbsp;<a href=\"#\" onclick=\"ManageObj.update(" + rowIndex + ",'update');\">";
		if (OP_COL_STYLE == "" || OP_COL_STYLE == "1") {
			returnStr += "编辑</a>";
		} else if (OP_COL_STYLE == "2") {
			returnStr += "<img src='" + OP_COL_EDIT_ICON_S1 + "' width='14' height='14' title='编辑'></a>";
		} else if (OP_COL_STYLE == "3") {
			returnStr += "<img src='" + OP_COL_EDIT_ICON_S2 + "' width='14' height='14' title='编辑'></a>";
		} else if (OP_COL_STYLE == "4") {
			returnStr += "<span class='mylabel mylabel-success radius'>编辑</span></a>";
		} else if (OP_COL_STYLE == "5") {
			returnStr += "<button class='btn btn-xs btn-warning' title='编辑'><i class='icon-pencil'></i></button></a>";
		} else if (OP_COL_STYLE == "6") {
			returnStr += "<i class='bx bx-edit' title='编辑'></i></a>";
		} else if (OP_COL_STYLE == "7") {
			returnStr += "<button type='button' class='myBtn myBtn-pill myBtn-sm myBtn-outline-info'>编辑</button></a>";
		} else if (OP_COL_STYLE == "8") {
			returnStr += "<button type='button' class='bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full'>编辑</button></a>";
		} else if (OP_COL_STYLE == "9") {
			returnStr += "<button type='button' class='bg-transparent hover:bg-blue-500 text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>编辑</button></a>";
		} else if (OP_COL_STYLE == "10") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-primary myBtn10-rounded myBtn10-icon' title='编辑'><i class='ti-pencil'></i></button></a>";
		} else if (OP_COL_STYLE == "11") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-primary myBtn10-fw'>编辑</button></a>";
		} else if (OP_COL_STYLE == "12") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-warning myBtn10-icon-text'><i class='ti-slice myBtn10-icon-prepend'></i>编辑</button></a>";
		} else if (OP_COL_STYLE == "13") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-outline-success myBtn10-icon-text'><i class='ti-pencil-alt myBtn10-icon-prepend'></i>编辑</button></a>";
		} else if (OP_COL_STYLE == "14") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-outline-success myBtn10-rounded myBtn10-icon' title='编辑'><i class='ti-pencil-alt text-danger'></i></button></a>";
		} else if (OP_COL_STYLE == "15") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon-text myBtn10-youtube'><i class='ti-settings'></i>编辑</button></a>";
		} else if (OP_COL_STYLE == "16") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon myBtn10-youtube btn-rounded' title='编辑'><i class='ti-pencil-alt'></i></button></a>";
		}

		returnStr += "&nbsp;&nbsp;<a href=\"#\" onclick=\"ManageObj.doDeleOrUnDele('" + record.data['id'] + "','1');\">";
		if (OP_COL_STYLE == "" || OP_COL_STYLE == "1") {
			returnStr += "删除</a>";
		} else if (OP_COL_STYLE == "2") {
			returnStr += "<img src='" + OP_COL_DELE_ICON_S1 + "' width='14' height='14' title='删除'></a>";
		} else if (OP_COL_STYLE == "3") {
			returnStr += "<img src='" + OP_COL_DELE_ICON_S2 + "' width='14' height='14' title='删除'></a>";
		} else if (OP_COL_STYLE == "4") {
			returnStr += "<span class='mylabel mylabel-danger radius'>删除</span></a>";
		} else if (OP_COL_STYLE == "5") {
			returnStr += "<button class='btn btn-xs btn-danger' title='删除'><i class='icon-remove'></i></button></a>";
		} else if (OP_COL_STYLE == "6") {
			returnStr += "<i class='bx bx-minus-circle' title='删除'></i></a>";
		} else if (OP_COL_STYLE == "7") {
			returnStr += "<button type='button' class='myBtn myBtn-pill myBtn-sm myBtn-outline-danger'>删除</button></a>";
		} else if (OP_COL_STYLE == "8") {
			returnStr += "<button type='button' class='bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full'>删 除</button></a>";
		} else if (OP_COL_STYLE == "9") {
			returnStr += "<button type='button' class='bg-transparent hover:bg-red-500 text-red-dark font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'>删除</button></a>";
		} else if (OP_COL_STYLE == "10") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-danger myBtn10-rounded myBtn10-icon' title='删除'><i class='ti-trash'></i></button></a>";
		} else if (OP_COL_STYLE == "11") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-danger myBtn10-fw'>删除</button></a>";
		} else if (OP_COL_STYLE == "12") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-danger myBtn10-icon-text'><i class='ti-cut myBtn10-icon-prepend'></i>删除</button></a>";
		} else if (OP_COL_STYLE == "13") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-outline-danger myBtn10-icon-text'><i class='ti-close myBtn10-icon-prepend'></i>删除</button></a>";
		} else if (OP_COL_STYLE == "14") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-outline-danger myBtn10-rounded myBtn10-icon' title='删除'><i class='ti-trash text-danger'></i></button></a>";
		} else if (OP_COL_STYLE == "15") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon-text myBtn10-twitter'><i class='ti-na'></i>删除</button></a>";
		} else if (OP_COL_STYLE == "16") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon myBtn10-twitter btn-rounded' title='删除'><i class='ti-cut'></i></button></a>";
		}
		
		
		
		returnStr += "&nbsp;&nbsp;<a href=\"#\" onclick=\"ManageObj.doPic('update','" + record.data['id'] + "');\">";
		if (OP_COL_STYLE == "" || OP_COL_STYLE == "1") {
			returnStr += "图片</a>";
		} else if (OP_COL_STYLE == "2") {
			returnStr += "<img src='" + OP_COL_PIC_ICON_S1 + "' width='14' height='14' title='图片'></a>";
		} else if (OP_COL_STYLE == "3") {
			returnStr += "<img src='" + OP_COL_PIC_ICON_S2 + "' width='14' height='14' title='图片'></a>";
		} else if (OP_COL_STYLE == "4") {
			returnStr += "<span class='mylabel mylabel-secondary radius'>图片</span></a>";
		} else if (OP_COL_STYLE == "5") {
			returnStr += "<button class='btn btn-xs btn-primary' title='图片'><i class='icon-picture'></i></button></a>";
		} else if (OP_COL_STYLE == "6") {
			returnStr += "<i class='bx bx-photo-album' title='图片'></i></a>";
		} else if (OP_COL_STYLE == "7") {
			returnStr += "<button type='button' class='myBtn myBtn-pill myBtn-sm myBtn-outline-warning'>图片</button></a>";
		} else if (OP_COL_STYLE == "8") {
			returnStr += "<button type='button' class='bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full'>图片</button></a>";
		} else if (OP_COL_STYLE == "9") {
			returnStr += "<button type='button' class='bg-transparent hover:bg-green-500 text-green-dark font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded'>图片</button></a>";
		} else if (OP_COL_STYLE == "10") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-warning myBtn10-rounded myBtn10-icon' title='上传图片'><i class='ti-image'></i></button></a>";
		} else if (OP_COL_STYLE == "11") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-warning myBtn10-fw'>图片</button></a>";
		} else if (OP_COL_STYLE == "12") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-info myBtn10-icon-text'><i class='ti-gallery myBtn10-icon-prepend'></i>图片</button></a>";
		} else if (OP_COL_STYLE == "13") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-outline-info myBtn10-icon-text'><i class='ti-palette myBtn10-icon-prepend'></i>图片</button></a>";
		} else if (OP_COL_STYLE == "14") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-outline-info myBtn10-rounded myBtn10-icon' title='上传图片'><i class='ti-camera text-danger'></i></button></a>";
		} else if (OP_COL_STYLE == "15") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon-text myBtn10-dribbble'><i class='ti-camera'></i>图片</button></a>";
		} else if (OP_COL_STYLE == "16") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon myBtn10-dribbble btn-rounded' title='上传图片'><i class='ti-gallery'></i></button></a>";
		}
		

	} else {
		
		/*
		returnStr += "&nbsp;&nbsp;<a href=\"#\" onclick=\"ManageObj.doPic('view','" + record.data['id'] + "');\">";
		if (OP_COL_STYLE == "" || OP_COL_STYLE == "1") {
			returnStr += "图片</a>";
		} else if (OP_COL_STYLE == "2") {
			returnStr += "<img src='" + OP_COL_PIC_ICON_S1 + "' width='14' height='14' title='图片'></a>";
		} else if (OP_COL_STYLE == "3") {
			returnStr += "<img src='" + OP_COL_PIC_ICON_S2 + "' width='14' height='14' title='图片'></a>";
		} else if (OP_COL_STYLE == "4") {
			returnStr += "<span class='mylabel mylabel-secondary radius'>图片</span></a>";
		} else if (OP_COL_STYLE == "5") {
			returnStr += "<button class='btn btn-xs btn-primary' title='图片'><i class='icon-picture'></i></button></a>";
		} else if (OP_COL_STYLE == "6") {
			returnStr += "<i class='bx bx-photo-album' title='图片'></i></a>";
		} else if (OP_COL_STYLE == "7") {
			returnStr += "<button type='button' class='myBtn myBtn-pill myBtn-sm myBtn-outline-warning'>图片</button></a>";
		} else if (OP_COL_STYLE == "8") {
			returnStr += "<button type='button' class='bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full'>图片</button></a>";
		} else if (OP_COL_STYLE == "9") {
			returnStr += "<button type='button' class='bg-transparent hover:bg-green-500 text-green-dark font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded'>图片</button></a>";
		} else if (OP_COL_STYLE == "10") {
			returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-warning myBtn10-rounded myBtn10-icon'><i class='ti-image'></i></button></a>";
		}
		*/
	
	}

	if (SP == "y") {
		if( record.data['shenpi'] == "待审批" ){
			returnStr += "&nbsp;&nbsp;<a href=\"#\" onclick=\"ManageObj.doShenPi('" + record.data['id'] + "','审批通过');\">";
			if (OP_COL_STYLE == "" || OP_COL_STYLE == "1") {
				returnStr += "通过</a>";
			} else if (OP_COL_STYLE == "2") {
				returnStr += "<img src='" + OP_COL_Y_ICON_S1 + "' width='14' height='14' title='通过'></a>";
			} else if (OP_COL_STYLE == "3") {
				returnStr += "<img src='" + OP_COL_Y_ICON_S2 + "' width='14' height='14' title='通过'></a>";
			} else if (OP_COL_STYLE == "4") {
				returnStr += "<span class='mylabel mylabel-success radius'>通过</span></a>";
			} else if (OP_COL_STYLE == "5") {
				returnStr += "<button class='btn btn-xs btn-success' title='通过'><i class='icon-chevron-up'></i></button></a>";
			} else if (OP_COL_STYLE == "6") {
				returnStr += "<i class='bx bx-check' title='通过'></i></a>";
			} else if (OP_COL_STYLE == "7") {
				returnStr += "<button type='button' class='myBtn myBtn-pill myBtn-sm myBtn-outline-success'>通过</button></a>";
			} else if (OP_COL_STYLE == "8") {
				returnStr += "<button type='button' class='bg-orange-500 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-full'>通过</button></a>";
			} else if (OP_COL_STYLE == "9") {
				returnStr += "<button type='button' class='bg-transparent hover:bg-orange-500 text-orange-dark font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded'>通过</button></a>";
			} else if (OP_COL_STYLE == "10") {
				returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-danger myBtn10-rounded myBtn10-icon' title='审核通过'><i class='ti-check'></i></button></a>";
			} else if (OP_COL_STYLE == "11") {
				returnStr += "<button type='button' class='myBtn10 myBtn10-inverse-danger myBtn10-fw'>通过</button></a>";
			} else if (OP_COL_STYLE == "12") {
				returnStr += "<button type='button' class='myBtn10 myBtn10-success myBtn10-icon-text'><i class='ti-check-box myBtn10-icon-prepend'></i>通过</button></a>";
			} else if (OP_COL_STYLE == "13") {
				returnStr += "<button type='button' class='myBtn10 myBtn10-outline-success myBtn10-icon-text'><i class='ti-face-smile myBtn10-icon-prepend'></i>通过</button></a>";
			} else if (OP_COL_STYLE == "14") {
				returnStr += "<button type='button' class='myBtn10 myBtn10-outline-success myBtn10-rounded myBtn10-icon' title='审核通过'><i class='ti-thumb-up text-danger'></i></button></a>";
			} else if (OP_COL_STYLE == "15") {
				returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon-text myBtn10-google'><i class='ti-check-box'></i>通过</button></a>";
			} else if (OP_COL_STYLE == "16") {
				returnStr += "<button type='button' class='myBtn10 myBtn10-social-icon myBtn10-dribbble btn-rounded' title='审核通过'><i class='ti-check'></i></button></a>";
			}

			/*
			returnStr += "&nbsp;&nbsp;<a href=\"#\" onclick=\"ManageObj.doShenPi('" + record.data['id'] + "','审批驳回');\">";
			if (OP_COL_STYLE == "1") {
				returnStr += "驳回</a>";
			} else if (OP_COL_STYLE == "2") {
				returnStr += "<img src='" + OP_COL_N_ICON_S1 + "' width='14' height='14' title='驳回'></a>";
			} else if (OP_COL_STYLE == "3") {
				returnStr += "<img src='" + OP_COL_N_ICON_S2 + "' width='14' height='14' title='驳回'></a>";
			} else if (OP_COL_STYLE == "4") {
				returnStr += "<span class='mylabel mylabel-danger radius'>驳回</span></a>";
			} else if (OP_COL_STYLE == "5") {
				returnStr += "<button class='btn btn-xs btn-danger' title='驳回'><i class='icon-chevron-down'></i></button></a>";
			} else if (OP_COL_STYLE == "6") {
				returnStr += "<i class='bx bx-lock' title='驳回'></i></a>";
			} else if (OP_COL_STYLE == "7") {
				returnStr += "<button type='button' class='myBtn myBtn-pill myBtn-sm myBtn-outline-dark'>驳回</button></a>";
			}
			
			*/
		}
	}
	return returnStr;
}

ManageObj.doShenPi = function(id, shenpi) {
	Ext.MessageBox.confirm('温馨提醒！', '确认需要提交记录吗？',
		function(info) {
			if (info == "yes") {
				Ext.Ajax.request({
					waitMsg: '数据提交中......',
					url: '/WEB-ROOT/app/xinxifabuguanli/xinxifabu.do',
					method: 'POST',
					success: function(response, options) {
						var responseArray = Ext.util.JSON.decode(response.responseText);
						Ext.MessageBox.show({
							title: '温馨提醒！',
							msg: responseArray.msg,
							buttons: Ext.MessageBox.OK,
							fn: function() {
								ManageObj.dataStore.reload();
							},
							icon: Ext.MessageBox.INFO
						});
					},
					failure: function(response, options) {
						Ext.MessageBox.alert('温馨提醒！', responseArray.msg);
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

/* 查询 */
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

/* 得到添加或编辑的FormPanel */
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
			labelSeparator: '：',
			labelAlign: 'right',
			items: [{
				columnWidth: OperColWid,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'textfield',
					fieldLabel: '<font color="red">*</font>&nbsp;&nbsp;名称标题',
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
					fieldLabel: '<font color="red">*</font>&nbsp;所属分类',
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
					fieldLabel: '<font color="red">*</font>&nbsp;&nbsp;发布人',
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
					fieldLabel: '<font color="red">*</font>&nbsp;&nbsp;发布时间',
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
					fieldLabel: '<font color="red">*</font>&nbsp;&nbsp;详情内容',
					html: '<br><div id="xqDiv" height="200" width="99%"></div><br>'
				}]

			}
				, {
				columnWidth: 1,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'textfield',
					fieldLabel: '&nbsp;审批状态',
					name: 'shenpi',
					id: 'shenpi',
					anchor: '98%',
					readOnly: true,
					value: '待审批',
					allowBlank: true
				}]
			}
				, {
				columnWidth: 1,
				layout: 'form',
				border: false,
				items: [{
					xtype: 'textfield',
					fieldLabel: '&nbsp;其他',
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
					fieldLabel: '备注',
					name: 'detail',
					id: 'detail',
					anchor: '98%'
				}]
			}]
		}]
	});

	/* 浏览、编辑时有当前选中行号参数，得到当前行记录的信息，初始化输入项 */
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
 * @param {} deleteFlag (1:删除 ； 0:解冻)
 * @function 删除或解冻
 */
ManageObj.doDeleOrUnDele = function(id, deleteFlag) {
	if (!id) {
		ManageObj.doCheck(deleteFlag);
	} else {
		var infoTmp = (deleteFlag == "0") ? "" : "删除";
		Ext.MessageBox.confirm('温馨提醒！', '确认需要' + infoTmp + '所选记录吗？',
			function(info) {
				if (info == "yes") {
					Ext.Ajax.request({
						waitMsg: '数据提交中......',
						url: '/WEB-ROOT/app/xinxifabuguanli/xinxifabu.do',
						method: 'POST',
						success: function(response, options) {
							var responseArray = Ext.util.JSON.decode(response.responseText);
							Ext.MessageBox.show({
								title: '温馨提醒！',
								msg: responseArray.msg,
								buttons: Ext.MessageBox.OK,
								fn: function() {
									ManageObj.dataStore.reload();
								},
								icon: Ext.MessageBox.INFO
							});
						},
						failure: function(response, options) {
							Ext.MessageBox.alert('温馨提醒！', responseArray.msg);
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
 * @param {} deleOrUnDele （1：删除 ； 0：解冻）
 * @function 提交删除或解冻时数据合法性验证
 */
ManageObj.doCheck = function(deleOrUnDele) {
	var sm = ManageObj.dataGridPan.getSelectionModel();
	var sel = sm.getSelections();
	var selCount = sm.getCount();
	if (selCount == 0) {
		Ext.Msg.show({
			title: '温馨提示！',
			buttons: Ext.MessageBox.OK,
			msg: '没有可以提交的数据，请选择！',
			icon: Ext.MessageBox.ERROR
		});
		return;
	}

	/* 选中且可以提交的记录 */
	var selectedRowId = "";
	/* 选中的且为已删除状态的记录 */
	var hasDeletedRowId = "";
	/* 选中的且为已解冻状态的记录 */
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
			title: '温馨提示！',
			buttons: Ext.MessageBox.OK,
			msg: '您选择的第' + hasUnDeletedRowId + "行的数据已经为正常状态，请重新选择！",
			icon: Ext.MessageBox.ERROR
		});
		return;
	} else if (hasDeletedRowId != "") {
		Ext.Msg.show({
			title: '温馨提示！',
			buttons: Ext.MessageBox.OK,
			msg: '您选择的第' + hasDeletedRowId + "行的数据已经被删除，请重新选择！",
			icon: Ext.MessageBox.ERROR
		});
		return;
	}

	ManageObj.doDeleOrUnDele(selectedRowId, deleOrUnDele);
};

/* 导出Excel */
ManageObj.doExportExcel = function() {
	var url = "/WEB-ROOT/app/xinxifabuguanli/xinxifabu.do?flag=doExportExcel";
	window.open(url);
};

/* 字段统计 */
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
			text: '返回',
			handler: function() {
				ManageObj.echartsWindow.close();
			}
		}],
		html: "<iframe scrolling=no src='/WEB-ROOT/app/xinxifabuguanli/xinxifabu.do?flag=doEcharts&t=" + t + "' frameborder='0' width='100%' height='100%' ></iframe>"
	});
	ManageObj.echartsWindow.show();
};

