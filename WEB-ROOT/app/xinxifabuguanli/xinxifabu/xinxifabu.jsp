<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		${PubMata}
		${PubTitle}
		${PubJS}
		<script type="text/javascript" src="/WEB-ROOT/app/xinxifabuguanli/xinxifabu/xinxifabu.js" charset="gb2312"></script>
		<script type="text/javascript" src="/WEB-ROOT/app/xinxifabuguanli/xinxifabu/add.js" charset="gb2312"></script>
		<script type="text/javascript" src="/WEB-ROOT/app/xinxifabuguanli/xinxifabu/update.js" charset="gb2312"></script>
		<script type="text/javascript" src="/WEB-ROOT/app/xinxifabuguanli/xinxifabu/pic.js" charset="gb2312"></script>
		<link rel='stylesheet' type='text/css' href='/WEB-ROOT/skin/css/file-upload.css' />
		<script type='text/javascript' src='/WEB-ROOT/skin/js/ext3.0.0/ux/FileUploadField.js'></script>
		
		<script type="text/javascript" charset="gb2312" src="/WEB-ROOT/skin/js/ueditor/ueditor.config.js"></script>
		<script type="text/javascript" charset="gb2312" src="/WEB-ROOT/skin/js/ueditor/ueditor.all.min.js"> </script>
		<script type="text/javascript" charset="gb2312" src="/WEB-ROOT/skin/js/ueditor/lang/zh-cn/zh-cn.js"></script>
		
		<!-- OP_COL_STYLE=5 -->
		<link rel='stylesheet' type='text/css' href='/WEB-ROOT/skin/css/bootstrap_my.css' />
		
		<!-- OP_COL_STYLE=6 -->
		<link href="/WEB-ROOT/skin/css/boxicons.min.css" rel="stylesheet">
		
		<!-- OP_COL_STYLE=7 -->
		<link href="/WEB-ROOT/skin/css/opStyle7.css" rel="stylesheet">
		
		<!-- OP_COL_STYLE=8 , 9 -->
		<link href="/WEB-ROOT/skin/css/opStyle8.css" rel="stylesheet">
		
		<!-- OP_COL_STYLE=10 -->
		<link href="/WEB-ROOT/skin/css/opStyle10.css" rel="stylesheet">
		<link href="/WEB-ROOT/skin/font/ti-icons/css/themify-icons.css" rel="stylesheet">
		
		
		
		<style type="text/css">
	        .x-grid3-row-over .x-grid3-cell-inner {
	            font-weight: bold;
	        }
	    </style>
	    <style type="text/css">
	   		 *{font-family:Î¢ÈíÑÅºÚ ;}
		</style>
		<script type="text/javascript">
		        var R = "${R}";
		        var M = "${M}";
		        var SP = "${SP}";
		        var BUTTON_PLACE = "1";
		        var LoginUserAcct = "${LoginUserAcct}";
		        var LoginUserName = "${LoginUserName}";
		        var SEARCH_PLACE = "0";
		        var SEARCHFORM_STYLE = "1";
		        var erjiguanlianzd = "${erjiguanlianzd}";
		        var OP_COL_STYLE = "${OP_COL_STYLE}";
				Ext.onReady(function(){
					var mo = new ManageObj();
				});
		</script>
	</head>
	<body>
		
	</body>
</html>
