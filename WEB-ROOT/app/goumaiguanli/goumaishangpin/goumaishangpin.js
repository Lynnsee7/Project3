var ManageObj = function() {
    /* 搜索面板 */
    ManageObj.searchForm = null;

    /* 数据列表 */
    ManageObj.dataGridPan = null;

    /* DataStore */
    ManageObj.dataStore = null;

    /* viewport */
    ManageObj.viewport = null;

    /* 购物车数量 */
    ManageObj.cartCount = 0;

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
            }, {
                columnWidth : .3,
                layout : 'form',
                border : false,
                items : [
                    {
                        xtype : 'textfield',
                        fieldLabel : '货号',
                        name : 'huohaoSearch',
                        id : 'huohaoSearch',
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
        fields : [ 'shangpinmingcheng', 'huohao', 'shangpinleixing', 'danjia', 'kucunliang', 'id' ],
        proxy : new Ext.data.HttpProxy({
            url : '/WEB-ROOT/app/goumaiguanli/goumaishangpin.do',
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
            header : '<font color="blue">商品类型</font>',
            width : 100,
            align : 'center',
            sortable : true,
            dataIndex : 'shangpinleixing'
        }, {
            header : '<font color="blue">销售价格</font>',
            width : 80,
            align : 'center,
            	header : '<font color="blue">销售价格</font>',
                width : 80,
                align : 'center',
                sortable : true,
                dataIndex : 'xiaoshoujiage',
                renderer: function(value, metadata, record) {
                    // 从价格设置表获取销售价格
                    var huohao = record.get('huohao');
                    var price = "获取中...";
                    
                    Ext.Ajax.request({
                        url: '/WEB-ROOT/app/xiaoshouguanli/jiageshezhi.do',
                        method: 'POST',
                        async: false,
                        params: {
                            flag: 'getPrice',
                            huohao: huohao
                        },
                        success: function(response) {
                            var data = Ext.util.JSON.decode(response.responseText);
                            if(data.success) {
                                price = data.price;
                            }
                        }
                    });
                    
                    return price;
                }
            }, {
                header : '<font color="blue">库存量</font>',
                width : 80,
                align : 'center',
                sortable : true,
                dataIndex : 'kucunliang'
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
                text : '显示全部',
                handler : function() {
                    ManageObj.searchForm.getForm().reset();
                    ManageObj.doSearch();
                },
                icon : DISPLAY_ALL_ICON_PATH
            }, '-', {
                text : '购物车',
                handler : function() {
                    // 打开购物车页面
                    window.location.href = '/WEB-ROOT/app/goumaiguanli/gouwuche.do?m=gouwuche';
                },
                icon : '/WEB-ROOT/skin/images/cart.png'
            } ]
        });
    }

    /* 操作列Renderer */
    ManageObj.operatorRenderer = function(id, cellmeta, record, rowIndex, columnIndex, store) {
        var returnStr = "<a href=\"#\" onclick=\"ManageObj.addToCart(" + rowIndex + ");\">加入购物车</a>";
        return returnStr;
    }

    /* 加入购物车 */
    ManageObj.addToCart = function(rowIndex) {
        Ext.MessageBox.prompt('数量', '请输入购买数量：', function(btn, text) {
            if (btn == 'ok') {
                var shuliang = parseInt(text);
                if (isNaN(shuliang) || shuliang <= 0) {
                    Ext.MessageBox.alert('警告提示！', '请输入有效的数量！');
                    return;
                }
                
                var huohao = ManageObj.dataGridPan.getStore().getAt(rowIndex).get('huohao');
                var kucunliang = parseInt(ManageObj.dataGridPan.getStore().getAt(rowIndex).get('kucunliang'));
                
                if (shuliang > kucunliang) {
                    Ext.MessageBox.alert('警告提示！', '购买数量不能超过库存量！');
                    return;
                }
                
                Ext.Ajax.request({
                    url : '/WEB-ROOT/app/goumaiguanli/goumaishangpin.do',
                    method : 'POST',
                    params : {
                        flag : 'addToCart',
                        huohao : huohao,
                        shuliang : shuliang
                    },
                    success : function(response, options) {
                        var responseArray = Ext.util.JSON.decode(response.responseText);
                        if (responseArray.success) {
                            Ext.MessageBox.show({
                                title : '操作提示！',
                                msg : responseArray.msg,
                                buttons : Ext.MessageBox.OK,
                                icon : Ext.MessageBox.INFO
                            });
                            
                            // 更新购物车数量
                            ManageObj.cartCount++;
                        } else {
                            Ext.MessageBox.alert('操作提示！', responseArray.msg);
                        }
                    },
                    failure : function(response, options) {
                        Ext.MessageBox.alert('操作提示！', '添加购物车失败！');
                    }
                });
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
    }

    /* 查询 */
    ManageObj.doSearch = function() {
        ManageObj.dataStore.baseParams.shangpinmingchengSearch = document.all.shangpinmingchengSearch.value;
        ManageObj.dataStore.baseParams.huohaoSearch = document.all.huohaoSearch.value;

        ManageObj.dataStore.load({
            params : {
                start : 0,
                limit : GLOBAL_MAX_PAGE_SIZE
            }
        });
    }