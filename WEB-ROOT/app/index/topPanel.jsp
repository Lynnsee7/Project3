<%@ page language="java" import="java.util.*" pageEncoding="GB2312" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="content-type" content="text/html;charset=GB2312">
		<title>northPanel</title>
		<script type="text/javascript" src="/WEB-ROOT/app/skin/js/pub/global/global.js" charset="gb2312"></script>
		<script type="text/javascript">
    		/* 退出 */
    		function doQuit(){
    			window.top.location.href = "/login.do";
    		}
    		
    		function doHome(){
    			window.top.location.href = "/WEB-ROOT/front/index/index.do";
    		}
    		
    		
    		/* 时间初始化 */

			function initTime() {
				var d, s = "今天是";
				d = new Date();
				s += d.getFullYear() + "年";
				s += (d.getMonth() + 1) + "月";
				s += d.getDate() + "日";
				document.getElementById("dateFont").innerHTML = s;
			}
    		
    		function AddFavorite(sURL, sTitle){
			    try{
			        window.external.addFavorite(sURL, sTitle);
			    }catch (e){
			        try{
			            window.sidebar.addPanel(sTitle, sURL, "");
			        }catch (e){
			            alert("加入收藏失败，请使用Ctrl+D进行添加");
			        }
			    }
			}
    		
   		</script>
	</head>

	<body  style="top:0px;margin-top:0px;margin-left:5px" onload="initTime();" style="FILTER:progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#ffffff,endColorStr=#D3E0F2)">
		<table width="100%" border="0">
			<tr>
				<td width="20%"  height="54">
					<b><font size="4" face="微软雅黑">${SYSTEM_NAME}</font></b>
				</td>
				<td width="55%" >
					<img alt="" src="/WEB-ROOT/skin/images/app/group.png" align="middle" >&nbsp;<font size="2" color="#2452B0">${LoginUserAcct},&nbsp;您好！</font><font id="dateFont" size="2" color="#2452B0"></font>
				</td>
				<td width="25%" id="otherFunctionTd" align="right">
					<font size="2">
					<a href="#" style="color:#15428B" onclick="doHome();">返回首页</a>&nbsp;&nbsp;
					<a href="#" style="color:#15428B" onclick="doQuit();">切换用户</a></font>&nbsp;&nbsp;
				</td>
			</tr>
		</table>
	</body>
</html>
