<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		${PubMata}
		${PubTitle}
		${PubJS}
		<script type="text/javascript" src="/WEB-ROOT/app/xiaoshouguanli/jiageshezhi/jiageshezhi.js" charset="gb2312"></script>
		<script type="text/javascript" src="/WEB-ROOT/app/xiaoshouguanli/jiageshezhi/add.js" charset="gb2312"></script>
		<script type="text/javascript" src="/WEB-ROOT/app/xiaoshouguanli/jiageshezhi/update.js" charset="gb2312"></script>
		<link rel='stylesheet' type='text/css' href='/WEB-ROOT/skin/css/file-upload.css' />
<script type='text/javascript' src='/WEB-ROOT/skin/js/ext3.0.0/ux/FileUploadField.js'></script>

		<style type="text/css">
	        .x-grid3-row-over .x-grid3-cell-inner {
	            font-weight: bold;
	        }
	    </style>
	    
		<script type="text/javascript">
		        var R = "${R}";
		        var M = "${M}";
		        var SP = "${SP}";
				Ext.onReady(function(){
					var mo = new ManageObj();
				});
		</script>
	</head>
	<body>
		
	</body>
</html>
