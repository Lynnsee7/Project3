/* 页签面板 */
var tabPan;

Ext.onReady(function() {
	//初始化菜单树
	new MenuTree('west','/WEB-ROOT/app/menuTree.do');

	/* 创建页签面板 */
	tabPan = new Ext.TabPanel({
		region : 'center',
		margins : '0 5 0 0',
		deferredRender : false,
		activeTab : 0,
		frame:true,
		border:true,
		enableTabScroll:true,
		items : [{
			id : 'tab_1',
			contentEl : 'center1',
			title : '首页',
			layout : 'fit',
			closable : true,
			autoScroll : true,
			html : "<iframe scrolling=no src='/WEB-ROOT/app/index/home.do' frameborder='0' width='100%' height='100%' ></iframe>"
		}]
	});

	/* 创建top面板 */
	var topPanel = new Ext.Panel({
		hidden:  ( topPanDisplay=="1"?false:true ) ,
		labelAlign : 'right',
		title : '',
		frame : true,
		region : 'north',
		margins : '5 5 5 5',
		layout : 'fit',
		height:70,
		html : "<iframe scrolling=no src='/WEB-ROOT/app/topPanel.do' frameborder='0' width='100%'></iframe>"
	});

	/* 创建south面板 */
	var southPanel = new Ext.Panel({
		hidden:  ( southPanDisplay=="1"?false:true ) ,
		labelAlign : 'right',
		title : '',
		frame : true,
		region : 'south',
		margins : '5 5 5 5',
		layout : 'fit',
		html : '<p align="center">'
				+ '<font size="2">&nbsp;'+ SYSTEM_DESIGNER +'</font>'
				+ '</p>'
	});
	
	/* 创建菜单树面板 */
	var westPanel = new Ext.Panel( {
			region : ( menuRegion == "1" ? 'west' :  'east' ) ,
			id : 'west-panel',
			split : true,
			title : ' ',
			width : 195,
			minSize : 195,
			maxSize : 300,
			collapsible : ( menuCollapse == "1" ?  true : false ) ,  
			frame: ( menuBackground == "1" ? true :false ) ,
			autoScroll : true,
			margins : '0 0 0 5',
			items : [ {
				contentEl : 'west',
				title : '<b></b>',
				border : false,
				iconCls : 'nav'
			} ]
		});
	
	/* 创建viewport面板 */
	var viewport = new Ext.Viewport( {
		layout : 'border',
		items : [ topPanel, southPanel, westPanel, tabPan ]
	});
});

/**
 * @param {}
 *            node : 菜单节点
 * @param {}
 *            event: 事件
 * @description : 新增页签
 */
function doAddTab(node, event) {
	if (!tabPan.getComponent(node.id + '')) {
		tabPan.add({
			id : node.id + '' ,
			title : node.text + '',
			iconCls : 'tabs',
			html : "<iframe id='' src='" +node.attributes.menu_todo + "' frameborder='0' width='100%' style='height:100%'></iframe>",
			closable : true
		}).show();
	} else {
		tabPan.setActiveTab(node.id + '');
	}
}