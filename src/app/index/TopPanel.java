package app.index;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import app.pub.base.BaseFormController;
import app.pub.database.DBUtils;

import com.ibatis.sqlmap.client.SqlMapClient;

public class TopPanel extends BaseFormController {
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView modelAndView = null;
		SqlMapClient sqlMap = null;
		try {
			return toFinish("/WEB-ROOT/app/index/style1/topPanel.jsp", null, request, response);
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
