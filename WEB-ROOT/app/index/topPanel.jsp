<%@ page language="java" import="java.util.*" pageEncoding="GB2312" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="content-type" content="text/html;charset=GB2312">
		<title>northPanel</title>
		<script type="text/javascript" src="/WEB-ROOT/app/skin/js/pub/global/global.js" charset="gb2312"></script>
		<script type="text/javascript">
    		/* �˳� */
    		function doQuit(){
    			window.top.location.href = "/login.do";
    		}
    		
    		function doHome(){
    			window.top.location.href = "/WEB-ROOT/front/index/index.do";
    		}
    		
    		
    		/* ʱ���ʼ�� */

			function initTime() {
				var d, s = "������";
				d = new Date();
				s += d.getFullYear() + "��";
				s += (d.getMonth() + 1) + "��";
				s += d.getDate() + "��";
				document.getElementById("dateFont").innerHTML = s;
			}
    		
    		function AddFavorite(sURL, sTitle){
			    try{
			        window.external.addFavorite(sURL, sTitle);
			    }catch (e){
			        try{
			            window.sidebar.addPanel(sTitle, sURL, "");
			        }catch (e){
			            alert("�����ղ�ʧ�ܣ���ʹ��Ctrl+D�������");
			        }
			    }
			}
    		
   		</script>
	</head>

	<body  style="top:0px;margin-top:0px;margin-left:5px" onload="initTime();" style="FILTER:progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#ffffff,endColorStr=#D3E0F2)">
		<table width="100%" border="0">
			<tr>
				<td width="20%"  height="54">
					<b><font size="4" face="΢���ź�">${SYSTEM_NAME}</font></b>
				</td>
				<td width="55%" >
					<img alt="" src="/WEB-ROOT/skin/images/app/group.png" align="middle" >&nbsp;<font size="2" color="#2452B0">${LoginUserAcct},&nbsp;���ã�</font><font id="dateFont" size="2" color="#2452B0"></font>
				</td>
				<td width="25%" id="otherFunctionTd" align="right">
					<font size="2">
					<a href="#" style="color:#15428B" onclick="doHome();">������ҳ</a>&nbsp;&nbsp;
					<a href="#" style="color:#15428B" onclick="doQuit();">�л��û�</a></font>&nbsp;&nbsp;
				</td>
			</tr>
		</table>
	</body>
</html>
