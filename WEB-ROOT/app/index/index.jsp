<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		${PubMata}
		${PubTitle}
		${PubJS}
		<script type="text/javascript">
			var SYSTEM_NAME = '${SYSTEM_NAME}';
			var SYSTEM_DESIGNER = '${SYSTEM_DESIGNER}';
			var topPanDisplay = '${ResultMap.topPanDisplay}';  
			var southPanDisplay = '${ResultMap.southPanDisplay}';  
			var menuRegion = '${ResultMap.menuRegion}';  
			var menuCollapse = '${ResultMap.menuCollapse}';  
			var animate =  '${ResultMap.menuAnimate}';  
			var menuBackground =  '${ResultMap.menuBackground}';  
		</script>
		<script type="text/javascript" src="/WEB-ROOT/skin/js/pub/tree/MenuTree.js" charset="gb2312"></script>
		<script type="text/javascript" src="/WEB-ROOT/app/index/index.js" charset="gb2312"></script>
	</head>
	<body>
		<div id="west" class="x-hide-display"
			 style="width: 100%; height: 100%; overflow: auto; scrollbar-track-color: #BAD0EE; scrollbar-face-color: #BAD0EE">
		</div>
		<div id="center1" class="x-hide-display">
		</div>
	</body>
</html>
