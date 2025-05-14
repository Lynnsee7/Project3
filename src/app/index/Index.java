package app.index;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.ModelAndView;

import app.pub.base.BaseFormController;
import app.pub.database.DBUtils;
import app.pub.sysInfo.SysInfo;
import app.pub.tree.MenuTree;
import app.sysManage.setting.Setting;

import com.ibatis.sqlmap.client.SqlMapClient;

public class Index extends BaseFormController {
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView modelAndView = null;
		SqlMapClient sqlMap = null;
		try {
			sqlMap = DBUtils.getSqlMap(this.getClass());
			sqlMap.startTransaction();
			
			HashMap<Object, Object> resultMap = Setting.doGetSettingMap(sqlMap, request, response);
			
			String houTaiZhuTi = "" ;
			String houTaiZhuTi4U = "" ;
			//String htzt = "31/index.html";
			//String htzt = "27/index.html";
			String htzt = "59/index.html";
			if( htzt != null && !htzt.equals("") ){
				houTaiZhuTi = htzt ;
			}else{
				String acct = SysInfo.getLoginUserAcct(request, response);
				houTaiZhuTi = resultMap.get("houTaiZhuTi").toString();
				Object houTaiZhuTi4UObj = resultMap.get("houTaiZhuTi4U");
				if( !acct.equals("admin") && houTaiZhuTi4UObj != null ) {
					houTaiZhuTi4U = houTaiZhuTi4UObj.toString();
					if( ! houTaiZhuTi4U.equals("") ) {
						houTaiZhuTi = houTaiZhuTi4U ;
					}
				}
			}
			
			String houTaiZhuTiNo = houTaiZhuTi.substring(0, houTaiZhuTi.indexOf("/"));
			
			HttpSession currentSession = request.getSession(false);
			if( currentSession != null ){
				Object login_user_htzt = currentSession.getAttribute("login_user_htzt");
				if( login_user_htzt != null && !login_user_htzt.toString().equals("") ){
					houTaiZhuTiNo = login_user_htzt.toString();
				}
			}
			
			if( houTaiZhuTiNo.equals("1") ){
				return toFinish("/WEB-ROOT/app/index/style1/index.html", resultMap, request, response);
			}else if( houTaiZhuTiNo.equals("2") ){
				resultMap.put("menuList", MenuTree.getTreeList1(request, response, sqlMap));
				return toFinish("/WEB-ROOT/app/index/style2/index.html", resultMap, request, response);
			}else if( houTaiZhuTiNo.equals("3") ){
				String from = request.getParameter("from") ;
				if( from != null && from.equals("menu") ){
					resultMap.put("menuList", MenuTree.getTreeList2(request, response, sqlMap));
					return toFinish("/WEB-ROOT/app/index/style3/menu.html", resultMap, request, response);
				}
			}else if( houTaiZhuTiNo.equals("4") ){
				String from = request.getParameter("from") ;
				if( from != null && from.equals("menu") ){
					resultMap.put("menuList", MenuTree.getTreeList2(request, response, sqlMap));
					return toFinish("/WEB-ROOT/app/index/style4/files/left.html", resultMap, request, response);
				}
			}else if( houTaiZhuTiNo.equals("5") ){
				resultMap.put("menuList", MenuTree.getTreeList2(request, response, sqlMap));
				return toFinish("/WEB-ROOT/app/index/style5/index.vm", resultMap, request, response);
			}else if( houTaiZhuTiNo.equals("6") ){
				resultMap.put("menuList", MenuTree.getTreeList2(request, response, sqlMap));
				return toFinish("/WEB-ROOT/app/index/style6/html/index.html", resultMap, request, response);
			}else {
				resultMap.put("menuList", MenuTree.getTreeList2(request, response, sqlMap));
				return toFinish("/WEB-ROOT/app/index/style"+houTaiZhuTiNo+"/index.html", resultMap, request, response);
			}
			
			return toFinish("/WEB-ROOT/app/index/style" + houTaiZhuTi, resultMap, request, response);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (sqlMap != null) {
				DBUtils.closeSqlMap(sqlMap, this.getClass());
			}
		}
		return modelAndView;
	}
}