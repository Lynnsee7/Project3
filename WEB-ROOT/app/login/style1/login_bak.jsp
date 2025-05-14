<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%
	//String cookieName = Global.PROJECT_COOKIE_NAME;
	String cookieName = "PM_COOKIE";
	
%>
<html>  
	<head>
		<title>Login</title>
		<link rel="Shortcut Icon" href="/WEB-ROOT/skin/images/app/favicon.ico" type="image/x-icon" />
		<link rel="stylesheet" type="text/css" href="/WEB-ROOT/skin/css/ext-all.css" />
		<script type="text/javascript" src="/WEB-ROOT/skin/js/ext3.0.0/ext-base.js"></script>
		<script type="text/javascript" src="/WEB-ROOT/skin/js/ext3.0.0/ext-all.js"></script>
		
		<script type="text/javascript">
			var win = null;
			Ext.QuickTips.init();
			LoginWindow=Ext.extend(Ext.Window,{
				title : '登陆系统',
				width : 265,
				autoHeight:true,
				collapsible : false,
				resizable : false ,
				defaults : {border : true},
				buttonAlign : 'center',
				createFormPanel :function() {
					return new Ext.form.FormPanel( {
						bodyStyle : 'padding-top:6px',
						defaultType : 'textfield',
						labelAlign : 'right',
						labelWidth : 55,
						labelPad : 0,
						frame : true,
						autoHeight:true,
						defaults : {allowBlank : false,width : 158},
							items : [
										{
											cls : 'user',
											name : 'userAcct',
											fieldLabel : '帐号',
											blankText : '帐号不能为空'
										}, 
										{
											cls : 'key',
											name : 'userPass',
											fieldLabel : '密码',
											blankText : '密码不能为空',
											inputType : 'password'
										}, 
										{
											cls : 'key',
											name:'randCode',
											id:'randCode',
											fieldLabel:'验证码',
											width:80,
											allowBlank : true
										}
										/*
										,
										{
							                fieldLabel: '',
							                xtype:'checkbox',
							                labelSeparator: '',
							                boxLabel: '保存帐号',
							                name: 'acctBox'
							            }, {
							                fieldLabel: '',
							                xtype:'checkbox',
							                labelSeparator: '',
							                boxLabel: '保存密码',
							                name: 'passwordBox'
							            }
							            */
								]
					});
				},                    
				login:function() {
					//alert(document.getElementsByName('userAcct')[0].value);
					
					win.hide();
					this.fp.form.submit({
					waitMsg : '正在登录......',
					url : '/login.do?flag=doLogin',
					success : function(form, action) {
						win.close();
						window.location.href = '/WEB-ROOT/app/index.do';
					},
					failure : function(form, action) {
						win.show();
						Ext.MessageBox.alert('温馨提醒！', '密码或账号不正确，请重新输入！');
					}
				});
					
				},
				initComponent : function(){
					LoginWindow.superclass.initComponent.call(this);
					this.fp=this.createFormPanel();
					this.add(this.fp);
					this.addButton('登陆',this.login,this);
					this.addButton('重置', function(){this.fp.form.reset();},this);
					this.addButton('取消', function(){this.close();},this);
				}
			});
			
			
       		Ext.onReady(function(){
				win = new LoginWindow();
				win.show();
				var bd = Ext.getDom('randCode');
				var bd2 = Ext.get(bd.parentNode);
				bd2.createChild(
				[{ 
					 tag: 'span',
					 html: ' <a href="javascript:reloadcode();">'
 				 },
 				 {
					 tag: 'img', 
					 src: '/WEB-ROOT/app/login/image.jsp',
					 id: 'safecode',
					 align:'absbottom'
				 }]
			    );
			    var cookieStr = getCookie("<%=cookieName%>");
			    if(cookieStr && cookieStr.length != ""){
					 var temp = cookieStr.split("|");
					 document.all.userAcct.value = temp[0] ;
					 document.all.userPass.value = temp[1] ;
				}
		    });
		    
		    //刷新验证码函数
		    function reloadcode(){
				 var verify = document.getElementById('safecode');
				 verify.setAttribute('src', '/WEB-ROOT/app/login/image.jsp?' + Math.random());
			}
			
		    //处理键盘事件
			document.onkeypress =  function(){
				if(event.keyCode == 13){
					win.login();
				}
			}
			
			//处理用户cookie
			function getCookie(objName){
			   var arrStr = document.cookie.split("; ");
			   for(var i = 0;i < arrStr.length;i ++){
			   	  var temp = arrStr[i].split("=");
			      if(temp[0] == objName) 
			      return unescape(temp[1]);
			   }
			}
	</script>
	</head>

	<body>

	</body>
</html>
