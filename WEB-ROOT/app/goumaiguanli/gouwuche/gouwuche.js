var ManageObj = function() {
    /* 搜索面板 */
    ManageObj.searchForm = null;

    /* 数据列表 */
    ManageObj.dataGridPan = null;

    /* DataStore */
    ManageObj.dataStore = null;

    /* viewport */
    ManageObj.viewport = null;

    /* 更新窗口 */
    ManageObj.updateWindow = null;

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
            anchor : '100%',
            layout : 'column',
            labelSeparator : '：',
            labelAlign : 'right',
            items : [ {
                columnWidth : .3,
                layout : 'form',
                border : false,
                items : [
                    {
                        xtype : 'textfield',
                        fieldLabel : '商品名称',
                        name : 'shangpinmingchengSearch',
                        id : 'shangpinmingchengSearch',
                        anchor : '100%'
                    }]
            }]
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
        fields : [ 'shangpinmingcheng', 'huohao', 'danjia', 'shuliang', 'xiaoji', 'id' ],
        proxy : new Ext.data.HttpProxy({
            url : '/WEB-ROOT/app/goumaiguanli/gouwuche.do',
            method : 'POST'
        }),
        baseParams : {
            flag : 'getJsonStore',
            deleteFlagSearch : 0
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
            header : '<font color="blue">商品名称</font>',
            width : 150,
            align : 'center',
            sortable : true,
            dataIndex : 'shangpinmingcheng'
        }, {
            header : '<font color="blue">货号</font>',
            width : 100,
            align : 'center',
            sortable : true,
            dataIndex : 'huohao'
        }, {
            header : '<font color="blue">单价</font>',
            width : 80,
            align : 'center',
            sortable : true,
            dataIndex : 'danjia'
        }, {
            header : '<font color="blue">数量</font>',
            width : 80,
            align : 'center',
            sortable : true,
            dataIndex : 'shuliang'
        }, {
            header : '<font color="blue">小计</font>',
            width : 100,
            align : 'center',
            sortable : true,
            dataIndex : 'xiaoji'
        }, {
            header : "<font color='blue'>操作</font>",
            width : 120,
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
            text : '&nbsp;购物车管理',
            icon : MANAGE_ICON_PATH,
            menu : [ {
                text : '返回商品列表',
                handler : function() {
                    window.location.href = '/WEB-ROOT/app/goumaiguanli/goumaishangpin.do?m=goumaishangpin';
                },
                icon : DISPLAY_ALL_ICON_PATH
            }, {
                text : '清空购物车',
                handler : function() {
                    ManageObj.clearCart();
                },
                icon : LOCK_OPERATION_ICON_PATH
            } ]
        }, '-', {
            text : '结算',
            handler : function() {
                ManageObj.doJieSuan();
            },
            icon : '/WEB-ROOT/skin/images/pay.png'
        }, '->', {
            xtype : 'label',
            html : '<font id="tongJiFont"></font>'
        } ]
    });
}

/* 操作列Renderer */
ManageObj.operatorRenderer = function(id, cellmeta, record, rowIndex, columnIndex, store) {
    var returnStr = "<a href=\"#\" onclick=\"ManageObj.update(" + rowIndex + ",'update');\">编辑</a>";
    returnStr += "&nbsp;|&nbsp;<a href=\"#\" onclick=\"ManageObj.doDeleOrUnDele('" + record.data['id'] + "','1');\">删除</a>";
    return returnStr;
}

/* 清空购物车 */
ManageObj.clearCart = function() {
    Ext.MessageBox.confirm('警告提示！', '确认要清空购物车吗？',
        function(info) {
            if (info == "yes") {
                var sm = ManageObj.dataGridPan.getSelectionModel();
                var selectedRecords = ManageObj.dataGridPan.getStore().getRange();
                var selectedIds = "";
                
                for (var i = 0; i < selectedRecords.length; i++) {
                    selectedIds += (selectedIds == "") ? (selectedRecords[i].data["id"]) : "," + (selectedRecords[i].data["id"]);
                }
                
                Ext.Ajax.request({
                    waitMsg : '数据提交中......',
                    url : '/WEB-ROOT/app/goumaiguanli/gouwuche.do',
                    method : 'POST',
                    success : function(response, options) {
                        var responseArray = Ext.util.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title : '警告提示！',
                            msg : responseArray.msg,
                            buttons : Ext.MessageBox.OK,
                            fn : function() {
                                ManageObj.dataStore.reload();
                            },
                            icon : Ext.MessageBox.INFO
                        });
                    },
                    failure : function(response, options) {
                        Ext.MessageBox.alert('警告提示！', responseArray.msg);
                    },
                    params : {
                        flag : "doDeleOrUnDele",
                        id : selectedIds,
                        deleteFlag : 1
                    }
                });
            }
        });
}

/* 删除购物车商品 */
ManageObj.doDeleOrUnDele = function(id, deleteFlag) {
    var infoTmp = (deleteFlag == "0") ? "" : "删除";
    Ext.MessageBox.confirm('警告提示！', '确认需要' + infoTmp + '所选记录吗？',
        function(info) {
            if (info == "yes") {
                Ext.Ajax.request({
                    waitMsg : '数据提交中......',
                    url : '/WEB-ROOT/app/goumaiguanli/gouwuche.do',
                    method : 'POST',
                    success : function(response, options) {
                        var responseArray = Ext.util.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title : '警告提示！',
                            msg : responseArray.msg,
                            buttons : Ext.MessageBox.OK,
                            fn : function() {
                                ManageObj.dataStore.reload();
                            },
                            icon : Ext.MessageBox.INFO
                        });
                    },
                    failure : function(response, options) {
                        Ext.MessageBox.alert('警告提示！', responseArray.msg);
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

/* 结算 */
ManageObj.doJieSuan = function() {
    if (ManageObj.dataStore.getCount() == 0) {
        Ext.MessageBox.alert('警告提示！', '购物车中没有商品！');
        return;
    }
    
    Ext.MessageBox.confirm('结算确认', '确认要结算购物车吗？',
        function(info) {
            if (info == "yes") {
                Ext.Ajax.request({
                    waitMsg : '数据提交中......',
                    url : '/WEB-ROOT/app/goumaiguanli/gouwuche.do',
                    method : 'POST',
                    success : function(response, options) {
                        var responseArray = Ext.util.JSON.decode(response.responseText);
                        if (responseArray.success) {
                            Ext.MessageBox.show({
                                title : '结算成功',
                                msg : responseArray.msg,
                                buttons : Ext.MessageBox.OK,
                                fn : function() {
                                    ManageObj.dataStore.reload();
                                },
                                icon : Ext.MessageBox.INFO
                            });
                        } else {
                            Ext.MessageBox.alert('结算失败', responseArray.msg);
                        }
                    },
                    failure : function(response, options) {
                        Ext.MessageBox.alert('结算失败', '结算过程发生错误！');
                    },
                    params : {
                        flag : "doJieSuan"
                    }
                });
            }
        }
    );
}

/* 更新购物车商品 */
ManageObj.update = function(rowIndex, flag) {
    var titleInfo = (flag != "" && flag == "update") ? "编辑" : "查看";
    ManageObj.updateWindow = new Ext.Window({
        collapsible : true,
        autoScroll : true,
        modal : true,
        frame : true,
        border : true,
        title : titleInfo + '购物车商品',
        labelAlign : 'center',
        buttonAlign : 'center',
        width : 400,
        height : 300,
        closable : true,
        closeAction : 'close',
        resizable : false,
        layout : 'fit',
        items : ManageObj.getOperationFormPan(rowIndex, flag)
    });
    
    if (flag != null && flag == "update") {
        ManageObj.updateWindow.addButton("保存", function() {
            ManageObj.doUpdateSubmit(rowIndex);
        });
    }
    
    ManageObj.updateWindow.addButton("返回", function() {
        ManageObj.updateWindow.close();
    });
    
    ManageObj.updateWindow.show();
}

/* 获取编辑表单 */
ManageObj.getOperationFormPan = function(rowIndex, flag) {
    ManageObj.operationFormPan = new Ext.FormPanel({
        id : 'operationFormPan',
        labelAlign : 'left',
        buttonAlign : 'center',
        bodyStyle : 'padding:10px;',
        frame : true,
        border : true,
        labelWidth : 90,
        autoWidth : true,
        autoHeight : true,
        items : [{
            xtype : 'textfield',
            fieldLabel : '商品名称',
            name : 'shangpinmingcheng',
            id : 'shangpinmingcheng',
            anchor : '95%',
            readOnly : true
        }, {
            xtype : 'textfield',
            fieldLabel : '货号',
            name : 'huohao',
            id : 'huohao',
            anchor : '95%',
            readOnly : true
        }, {
            xtype : 'textfield',
            fieldLabel : '单价',
            name : 'danjia',
            id : 'danjia',
            anchor : '95%',
            readOnly : true
        }, {
            xtype : 'numberfield',
            fieldLabel : '<font color="red">*</font>&nbsp;&nbsp;数量',
            name : 'shuliang',
            id : 'shuliang',
            anchor : '95%',
            allowBlank : false,
            minValue : 1
        }]
    });

    /* 初始化表单数据 */
    if (rowIndex != null) {
        ManageObj.operationFormPan.findById('shangpinmingcheng').setValue(ManageObj.dataGridPan.getStore().getAt(rowIndex).get('shangpinmingcheng'));
        ManageObj.operationFormPan.findById('huohao').setValue(ManageObj.dataGridPan.getStore().getAt(rowIndex).get('huohao'));
        ManageObj.operationFormPan.findById('danjia').setValue(ManageObj.dataGridPan.getStore().getAt(rowIndex).get('danjia'));
        ManageObj.operationFormPan.findById('shuliang').setValue(ManageObj.dataGridPan.getStore().getAt(rowIndex).get('shuliang'));
    }

    return ManageObj.operationFormPan;
}

/* 提交更新 */
ManageObj.doUpdateSubmit = function(rowIndex) {
    /* Ext表单验证 */
    if (!ManageObj.operationFormPan.getForm().isValid()) {
        Ext.MessageBox.alert(WARRING_WIN_TITLE, "输入项有误！请修改红色线提示处！");
        return;
    }
    
    /* 获取表单数据 */
    var id = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('id');
    var shuliang = ManageObj.operationFormPan.findById('shuliang').getValue();
    var danjia = ManageObj.operationFormPan.findById('danjia').getValue();
    
    /* 提交更新 */
    Ext.Ajax.request({
        waitMsg : '数据提交中......',
        url : '/WEB-ROOT/app/goumaiguanli/gouwuche.do',
        method : 'POST',
        success : function(response, options) {
            var responseArray = Ext.util.JSON.decode(response.responseText);
            Ext.MessageBox.show({
                title : '警告提示！',
                msg : responseArray.msg,
                buttons : Ext.MessageBox.OK,
                fn : function() {
                    ManageObj.updateWindow.close();
                    ManageObj.dataStore.reload();
                },
                icon : Ext.MessageBox.INFO
            });
        },
        failure : function(response, options) {
            Ext.MessageBox.alert('警告提示！', "更新失败！");
        },
        params : {
            flag : "doUpdateSubmit",
            id : id,
            shuliang : shuliang,
            danjia : danjia
        }
    });
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
            height : 120,
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
    
    // 计算购物车总金额
    ManageObj.calculateTotal();
}

/* 计算购物车总金额 */
ManageObj.calculateTotal = function() {
    ManageObj.dataStore.on('load', function() {
        var total = 0;
        for (var i = 0; i < ManageObj.dataStore.getCount(); i++) {
            total += parseFloat(ManageObj.dataStore.getAt(i).get('xiaoji'));
        }
        document.getElementById('tongJiFont').innerHTML = "购物车总金额：" + total.toFixed(2) + " 元";
    });
}

/* 查询 */
ManageObj.doSearch = function() {
    ManageObj.dataStore.baseParams.shangpinmingchengSearch = document.all.shangpinmingchengSearch.value;

    ManageObj.dataStore.load({
        params : {
            start : 0,
            limit : GLOBAL_MAX_PAGE_SIZE
        }
    });
}