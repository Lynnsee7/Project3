var ManageObj = function() {
	/* 搜索面板 */
	ManageObj.searchForm = null;

	/* 新增或编辑操作面板 */
	ManageObj.operationFormPan = null;

	/* 数据列表 */
	ManageObj.dataGridPan = null;

	/* DataStore */
	ManageObj.dataStore = null;

	/* 详细数据列表 */
	ManageObj.detailDataGridPan = null;

	/* viewport */
	ManageObj.viewport = null;

	/* 新增窗口 */
	ManageObj.addWindow = null;

	/* 编辑窗口 */
	ManageObj.updateWindow = null;

	/* 右键事件 */
	ManageObj.rightClick = null;

	/* 右键选中行号 */
	ManageObj.rightMenuClickRow = null;

	/* 未修改之前的附件路径 */
	ManageObj.oldAttach = null;

	ManageObj.xiaoshoudanhao4up = "" ;
	
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
		id : 'mySearchForm',
		labelAlign : 'left',
		buttonAlign : 'center',
		bodyStyle : 'padding:0px;',
		frame : true,
		border : false,
		labelWidth : 75,
		items : [ {
			// xtype : 'fieldset',
			// title : '查询条件',
			anchor : '100%',
			layout : 'column',
			labelSeparator : '：',
			labelAlign : 'right',
			items : [ {
				columnWidth : .2,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'datefield',
					format : 'Y-m-d',
					fieldLabel : '消费时间',
					name : 'itimeStartSearch',
					id : 'itimeStartSearch',
					invalidText : '日期格式不正确，应为yyyy-mm-dd',
					anchor : '100%'
				}, {
					xtype : 'textfield',
					fieldLabel : '销售单号',
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
					fieldLabel : '至',
					name : 'itimeEndSearch',
					id : 'itimeEndSearch',
					invalidText : '日期格式不正确，应为yyyy-mm-dd',
					anchor : '100%'
				} ]
			}, {
				columnWidth : .2,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'textfield',
					fieldLabel : '经手人',
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
					fieldLabel : '消费金额',
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
					fieldLabel : '会员编号',
					name : 'huiyuanbianhaoSearch',
					id : 'huiyuanbianhaoSearch',
					anchor : '100%'
				} ]
			} ]
		} ],
		buttons : [ {
			text : '查询',
			handler : function() {
				ManageObj.doSearch();
			}
		}, {
			text : '清空',
			handler : function() {
				ManageObj.searchForm.getForm().reset();
			}
		} ]
	});
}

/* 初始化数据列表 */
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
		displayMsg : '当前第{0}到{1}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共{2}条记录',
		emptyMsg : "没有找到任何记录！",
		displayInfo : true
	});

	ManageObj.dataGridPan = new Ext.grid.GridPanel({
		id : 'getTask',
		store : ManageObj.dataStore,
		loadMask : true,
		bbar : pagingBar,
		columns : [ {
			header : '<font color="blue">销售单号</font>',
			width : 60,
			align : 'center',
			sortable : true,
			dataIndex : 'xiaoshoudanhao'
		}, {
			header : '<font color="blue">经手人</font>',
			width : 60,
			align : 'center',
			sortable : true,
			dataIndex : 'jingshouren'
		}, {
			header : '<font color="blue">会员编号</font>',
			width : 60,
			align : 'center',
			sortable : true,
			dataIndex : 'huiyuanbianhao'
		}, {
			header : '<font color="blue">消费金额</font>',
			width : 60,
			align : 'center',
			sortable : true,
			dataIndex : 'xiaofeijine'
		}, {
			header : '<font color="blue">消费时间</font>',
			width : 60,
			align : 'center',
			sortable : true,
			dataIndex : 'itime'
		}, {
			header : "<font color='blue'>操作</font>",
			width : 100,
			align : 'center',
			sortable : false,
			renderer : ManageObj.operatorRenderer,
			dataIndex : 'oper'
		} ],
		sm : sm,
		viewConfig : {
			forceFit : true,
			columnsText : '显示列',
			sortAscText : '升序',
			sortDescText : '降序'
		},
		stripeRows : true,
		tbar : [ '-', {
			xtype : (R == "y") ? 'hidden' : 'splitbutton',
			text : '&nbsp;数据维护',
			icon : MANAGE_ICON_PATH,
			menu : [ {
				text : '新增表单',
				handler : function() {
					ManageObj.doAdd();
				},
				icon : ADD_OPERATION_ICON_PATH
			} ]
		}, '-', {
			text : '显示全部',
			handler : function() {
				ManageObj.searchForm.getForm().reset();
				ManageObj.doSearch();
			},
			icon : DISPLAY_ALL_ICON_PATH
		}, '-', {
			text : '导出Excel',
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

	/* 右键弹出菜单 */
	// ManageObj.dataGridPan.addListener('rowcontextmenu',
	// ManageObj.rightClickFn);
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
		id : 'rightClickCont',
		items : [ {
			id : 'rMenu3',
			text : '新增表单',
			icon : RIGHT_CLICK_ADD_OPERATION_ICON_PATH,
			handler : function() {
				ManageObj.doAdd();
			}
		}, {
			id : 'rMenu1',
			text : '浏览表单',
			icon : VIEW_OPERATION_ICON_PATH,
			handler : function() {
				ManageObj.update(ManageObj.rightMenuClickRow, "view");
			}
		}, {
			id : 'rMenu2',
			text : '编辑表单',
			icon : EDIT_OPERATION_ICON_PATH,
			handler : function() {
				ManageObj.update(ManageObj.rightMenuClickRow, "update");
			}
		} ]
	});

	/* 当前选中行状态 */
	var nowSelectedRowStutas = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('deleteFlag');
	var nowSelectedRowId = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('id');
	var nowStutasStr = "删除表单";
	var nowIcon = LOCK_OPERATION_ICON_PATH;
	var nowOption = 1;
	/* 根据当前选中行的状态，动态新增删除或解冻菜单项 */
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

/* 加载数据 */
ManageObj.loadData = function() {
	ManageObj.dataStore.load({
		params : {
			start : 0,
			limit : GLOBAL_MAX_PAGE_SIZE
		}
	});
}

/* 操作列Renderer */
ManageObj.operatorRenderer = function(id, cellmeta, record, rowIndex, columnIndex, store) {
	var returnStr = "<a href=\"#\" onclick=\"ManageObj.update(" + rowIndex + ",'view');\">浏览</a>";
	if (R == "n") {
		returnStr += "&nbsp;|&nbsp;<a href=\"#\" onclick=\"ManageObj.update(" + rowIndex + ",'update');\">编辑</a>";
		returnStr += "&nbsp;|&nbsp;<a href=\"#\" onclick=\"ManageObj.doDeleOrUnDele('" + record.data['id'] + "','1');\">删除</a>";
		returnStr += "&nbsp;|&nbsp;<a href=\"#\" onclick=\"ManageObj.doDeleOrUnDele('" + record.data['id'] + "','1');\">退货</a>";
	}
	if (SP == "y") {
		returnStr += "&nbsp;|&nbsp;<a href=\"#\" onclick=\"ManageObj.doShenPi('" + record.data['id'] + "','审批通过');\">审批通过</a>";
		returnStr += "&nbsp;|&nbsp;<a href=\"#\" onclick=\"ManageObj.doShenPi('" + record.data['id'] + "','审批驳回');\">审批驳回</a>";
	}
	return returnStr;
}

ManageObj.doShenPi = function(id, zhuangtai) {
	Ext.MessageBox.confirm('温馨提醒！', '确认需要提交记录吗？', function(info) {
		if (info == "yes") {
			Ext.Ajax.request({
				waitMsg : '数据提交中......',
				url : '/WEB-ROOT/app/xiaoshouguanli/xiaoshouxinxi.do',
				method : 'POST',
				success : function(response, options) {
					var responseArray = Ext.util.JSON.decode(response.responseText);
					Ext.MessageBox.show({
						title : '温馨提醒！',
						msg : responseArray.msg,
						buttons : Ext.MessageBox.OK,
						fn : function() {
							ManageObj.dataStore.reload();
						},
						icon : Ext.MessageBox.INFO
					});
				},
				failure : function(response, options) {
					Ext.MessageBox.alert('温馨提醒！', responseArray.msg);
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

/* 查询 */
ManageObj.doSearch = function() {
	// 输入项合法性的判断
	var itimeStartSearch = document.all.itimeStartSearch.value;
	var itimeEndSearch = document.all.itimeEndSearch.value;

	if (itimeStartSearch != "" && itimeEndSearch != "") {
		if (itimeStartSearch > itimeEndSearch) {
			Ext.MessageBox.alert(WARRING_WIN_TITLE, "操作开始时间不能大于操作结束时间！");
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

/* 明细表格 */
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
			header : "<font color='blue'>序号</font>",
			width : 50,
			align : 'center',
			dataIndex : 'id'
		}, {
			header : "<font color='red'>*</font>&nbsp;<font color='blue'>货号</font>",
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
			header : "<font color='red'>*</font>&nbsp;<font color='blue'>数量</font>",
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
			header : "<font color='blue'>单价</font>",
			width : 80,
			align : 'center',
			dataIndex : 'danjia',
			editor : {
				xtype : 'textfield',
				allowBlank : false,
				readOnly:true
			}
		}, {
			header : "<font color='blue'>小计</font>",
			width : 80,
			align : 'center',
			dataIndex : 'xiaoji',
			editor : {
				xtype : 'textfield',
				allowBlank : false,
				readOnly:true
			}
		}, {
			header : "<font color='blue'>备注</font>",
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
			columnsText : '显示列',
			sortAscText : '升序',
			sortDescText : '降序'
		},
		stripeRows : true,
		tbar : [ {
			icon : ADD_OPERATION_ICON_PATH,
			text : '新增商品',
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
			text : '删除商品',
			disabled : (flag == "copyadd" || flag == "copyadd_update") ? true : false,
			handler : function() {
				Ext.MessageBox.confirm('温馨提醒！', '确认需要提交所选数据吗？', function(info) {
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
		},'->','<font size="2" >总计：</font><font size="2" id="zongji">0</font>' ]
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
		waitMsg : '单价查询中......',
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

/* 得到添加或编辑的FormPanel */
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
			labelSeparator : '：',
			labelAlign : 'right',
			items : [ {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'textfield',
					fieldLabel : '&nbsp;销售单号',
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
					fieldLabel : '&nbsp;经手人',
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
					fieldLabel : '&nbsp;消费金额',
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
					fieldLabel : '&nbsp;会员编号',
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
					fieldLabel : '备注',
					name : 'detail',
					id : 'detail',
					anchor : '95%'
				} ]
			} ]
		} ]
	});

	/* 浏览、编辑时有当前选中行号参数，得到当前行记录的信息，初始化输入项 */
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
 *                deleteFlag (1:删除 ； 0:解冻)
 * @function 删除或解冻
 */
ManageObj.doDeleOrUnDele = function(id, deleteFlag) {
	if (!id) {
		ManageObj.doCheck(deleteFlag);
	} else {
		var infoTmp = (deleteFlag == "0") ? "" : "删除";
		Ext.MessageBox.confirm('温馨提醒！', '确认需要' + infoTmp + '所选记录吗？', function(info) {
			if (info == "yes") {
				Ext.Ajax.request({
					waitMsg : '数据提交中......',
					url : '/WEB-ROOT/app/xiaoshouguanli/xiaoshouxinxi.do',
					method : 'POST',
					success : function(response, options) {
						var responseArray = Ext.util.JSON.decode(response.responseText);
						Ext.MessageBox.show({
							title : '温馨提醒！',
							msg : responseArray.msg,
							buttons : Ext.MessageBox.OK,
							fn : function() {
								ManageObj.dataStore.reload();
							},
							icon : Ext.MessageBox.INFO
						});
					},
					failure : function(response, options) {
						Ext.MessageBox.alert('温馨提醒！', responseArray.msg);
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
 *                deleOrUnDele （1：删除 ； 0：解冻）
 * @function 提交删除或解冻时数据合法性验证
 */
ManageObj.doCheck = function(deleOrUnDele) {
	var sm = ManageObj.dataGridPan.getSelectionModel();
	var sel = sm.getSelections();
	var selCount = sm.getCount();
	if (selCount == 0) {
		Ext.Msg.show({
			title : '温馨提示！',
			buttons : Ext.MessageBox.OK,
			msg : '没有可以提交的数据，请选择！',
			icon : Ext.MessageBox.ERROR
		});
		return;
	}

	/* 选中且可以提交的记录 */
	var selectedRowId = "";
	/* 选中的且为已删除状态的记录 */
	var hasDeletedRowId = "";
	/* 选中的且为已解冻状态的记录 */
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
			title : '温馨提示！',
			buttons : Ext.MessageBox.OK,
			msg : '您选择的第' + hasUnDeletedRowId + "行的数据已经为正常状态，请重新选择！",
			icon : Ext.MessageBox.ERROR
		});
		return;
	} else if (hasDeletedRowId != "") {
		Ext.Msg.show({
			title : '温馨提示！',
			buttons : Ext.MessageBox.OK,
			msg : '您选择的第' + hasDeletedRowId + "行的数据已经被删除，请重新选择！",
			icon : Ext.MessageBox.ERROR
		});
		return;
	}

	ManageObj.doDeleOrUnDele(selectedRowId, deleOrUnDele);
};

/* 导出Excel */
ManageObj.doExportExcel = function() {
	var url = "/WEB-ROOT/app/xiaoshouguanli/xiaoshouxinxi.do?flag=doExportExcel";
	window.open(url);
};

/* 字段统计 */
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
