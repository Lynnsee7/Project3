package front.index;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.Connection;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.ModelAndView;

import com.ibatis.sqlmap.client.SqlMapClient;

import app.pub.base.BaseFormController;
import app.pub.database.DBUtils;
import app.pub.database.IbatisUtil;
import app.pub.database.SqlTool;
import app.pub.date.DateUtil;
import app.pub.global.Global;
import app.pub.sysInfo.SysInfo;
import app.sysManage.setting.OrderTool;
import app.sysManage.setting.Setting;

/*

xinxifabu:
attr1 ��Ϣ�������
attr2 �����ظ�ԤԼʱ��1Ϊʹ���У����ַ���Ϊδʹ��

wodeyuding:
attr1 ԤԼxinxifabu�е�id��ԤԼ��д��

*/

public class Index extends BaseFormController {
	
	public static String LOG_SUCC_GO2_FRONT = "/login.do?go2=front" ;
	public static String LOG_SUCC_GO2_APP = "/login.do?go2=app" ;
	
	//�Ƿ����ظ�ԤԼ
	public static boolean canRepeat = true ;
	//�Ƿ���Ҫ�黹 : canRepeat=falseʱ��needBack=true
	public static boolean needBack = false ;
	
	//ԤԼ���ͨ�����Ƿ�۳��˻����
	public static boolean deductAccount = false ;
	//�Ƿ��޶���ԤԼʣ����
	public static boolean hasLeft = false ;
	//�����Ƿ�����ظ�ԤԼ
	public static boolean canRepeatPerDay = false ;
	
	
	
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView modelAndView = null;
		SqlMapClient sqlMap = null;
		try {
			sqlMap = DBUtils.getSqlMap(this.getClass());
			sqlMap.startTransaction();
			HashMap<Object, Object> settingMap = Setting.doGetSettingMap(sqlMap, request, response);
			
			
			
			String qianTaiZhuTi = "105/index.html";
			String qianTaiNum = "105";
			
			
			
			String flag = request.getParameter("flag");
			if (flag != null && flag.equals("openMenu")) {
				HashMap<Object, Object> resultMap = new HashMap<Object, Object>();
				
				String login_user_acct = SysInfo.getLoginUserAcct4Front(request, response);
				String menuTable = request.getParameter("menuTable");
				if( menuTable != null && !menuTable.equals("") ){
					resultMap.put("category", getCategory(sqlMap, request, response));
					resultMap.put("daohang", getDaoHang(sqlMap, request, response));
					resultMap.put("field", getField(sqlMap, request, response));
					resultMap.put("menuUrl", getMenuUrl(sqlMap, request, response));
					resultMap.put("login_user_acct", login_user_acct);
					resultMap.put("nowMenuTable", menuTable);
					resultMap.put("lanmu", getLanMu(sqlMap, request, response));
					return toFrontPage("/WEB-ROOT/front/index/index"+qianTaiNum+"/category.html", resultMap, request, response);
				}else{
					resultMap.put("daohang", getDaoHang(sqlMap, request, response));
					resultMap.put("lanmu", getLanMu(sqlMap, request, response));
					resultMap.put("login_user_acct", login_user_acct);
					String artId = request.getParameter("artId");
					resultMap.put("wenzhang", getWenZhangById(artId , sqlMap, request, response));
					return toFrontPage("/WEB-ROOT/front/index/index"+qianTaiNum+"/wenzhang.html", resultMap, request, response);
				}
			}else if (flag != null && flag.equals("category")) {
				String login_user_acct = SysInfo.getLoginUserAcct4Front(request, response);
				String dqfenlei = request.getParameter("fenlei");
				if( dqfenlei == null ){
					dqfenlei = "" ;
				}
				HashMap<Object, Object> resultMap = new HashMap<Object, Object>();
				resultMap.put("fenlei", getFenLei(sqlMap, request, response));
				resultMap.put("lanmu", getLanMu(sqlMap, request, response));
				resultMap.put("getMingChen", getMingChen(sqlMap, request, response));
				resultMap.put("login_user_acct", login_user_acct);
				resultMap.put("getCategory", getCategory(sqlMap, request, response));
				resultMap.put("dqfenlei", dqfenlei);
				
				resultMap.put("systemName", getSystemName(sqlMap, request, response));
				resultMap.put("LOG_SUCC_GO2_FRONT", LOG_SUCC_GO2_FRONT);
				resultMap.put("LOG_SUCC_GO2_APP", LOG_SUCC_GO2_APP);
				resultMap.put("getAllByAttr1", getAllByOrder(sqlMap, request, response));
				
				return toFrontPage("/WEB-ROOT/front/index/index"+qianTaiNum+"/category.html", resultMap, request, response);
			}else if (flag != null && flag.equals("about")) {
				String login_user_acct = SysInfo.getLoginUserAcct4Front(request, response);
				HashMap<Object, Object> resultMap = new HashMap<Object, Object>();
				resultMap.put("fenlei", getFenLei(sqlMap, request, response));
				resultMap.put("lanmu", getLanMu(sqlMap, request, response));
				resultMap.put("getMingChen", getMingChen(sqlMap, request, response));
				resultMap.put("pinglunxinxi", getWoDePingLunXinXi(sqlMap, request, response));
				resultMap.put("login_user_acct", login_user_acct);
				resultMap.put("LOG_SUCC_GO2_FRONT", LOG_SUCC_GO2_FRONT);
				resultMap.put("LOG_SUCC_GO2_APP", LOG_SUCC_GO2_APP);
				resultMap.put("systemName", getSystemName(sqlMap, request, response));
				return toFrontPage("/WEB-ROOT/front/index/index"+qianTaiNum+"/about.html", resultMap, request, response);
			}else if (flag != null && flag.equals("alldoc")) {
				String login_user_acct = SysInfo.getLoginUserAcct4Front(request, response);
				HashMap<Object, Object> resultMap = new HashMap<Object, Object>();
				resultMap.put("fenlei", getFenLei(sqlMap, request, response));
				resultMap.put("lanmu", getLanMu(sqlMap, request, response));
				resultMap.put("getMingChen", getMingChen(sqlMap, request, response));
				resultMap.put("getAllDoc", getAllDoc(sqlMap, request, response));
				resultMap.put("pinglunxinxi", getWoDePingLunXinXi(sqlMap, request, response));
				resultMap.put("login_user_acct", login_user_acct);
				resultMap.put("LOG_SUCC_GO2_FRONT", LOG_SUCC_GO2_FRONT);
				resultMap.put("LOG_SUCC_GO2_APP", LOG_SUCC_GO2_APP);
				resultMap.put("systemName", getSystemName(sqlMap, request, response));
				return toFrontPage("/WEB-ROOT/front/index/index"+qianTaiNum+"/alldoc.html", resultMap, request, response);
			}else if (flag != null && flag.equals("knowledge")) {
				String login_user_acct = SysInfo.getLoginUserAcct4Front(request, response);
				HashMap<Object, Object> resultMap = new HashMap<Object, Object>();
				resultMap.put("fenlei", getFenLei(sqlMap, request, response));
				resultMap.put("lanmu", getLanMu(sqlMap, request, response));
				resultMap.put("getMingChen", getMingChen(sqlMap, request, response));
				resultMap.put("login_user_acct", login_user_acct);
				resultMap.put("LOG_SUCC_GO2_FRONT", LOG_SUCC_GO2_FRONT);
				resultMap.put("LOG_SUCC_GO2_APP", LOG_SUCC_GO2_APP);
				resultMap.put("systemName", getSystemName(sqlMap, request, response));
				return toFrontPage("/WEB-ROOT/front/index/index"+qianTaiNum+"/knowledge.html", resultMap, request, response);
			}else if (flag != null && flag.equals("contact")) {
				String login_user_acct = SysInfo.getLoginUserAcct4Front(request, response);
				HashMap<Object, Object> resultMap = new HashMap<Object, Object>();
				resultMap.put("fenlei", getFenLei(sqlMap, request, response));
				resultMap.put("getMingChen", getMingChen(sqlMap, request, response));
				resultMap.put("lanmu", getLanMu(sqlMap, request, response));
				resultMap.put("login_user_acct", login_user_acct);
				resultMap.put("LOG_SUCC_GO2_FRONT", LOG_SUCC_GO2_FRONT);
				resultMap.put("LOG_SUCC_GO2_APP", LOG_SUCC_GO2_APP);
				resultMap.put("systemName", getSystemName(sqlMap, request, response));
				return toFrontPage("/WEB-ROOT/front/index/index"+qianTaiNum+"/contact.html", resultMap, request, response);
			}else if (flag != null && flag.equals("wenzhang")) {
				String login_user_acct = SysInfo.getLoginUserAcct4Front(request, response);
				HashMap<Object, Object> resultMap = new HashMap<Object, Object>();
				resultMap.put("fenlei", getFenLei(sqlMap, request, response));
				resultMap.put("getMingChen", getMingChen(sqlMap, request, response));
				resultMap.put("lanmu", getLanMu(sqlMap, request, response));
				resultMap.put("login_user_acct", login_user_acct);
				resultMap.put("LOG_SUCC_GO2_FRONT", LOG_SUCC_GO2_FRONT);
				resultMap.put("LOG_SUCC_GO2_APP", LOG_SUCC_GO2_APP);
				resultMap.put("wenzhang", getWenZhang(sqlMap, request, response));
				resultMap.put("systemName", getSystemName(sqlMap, request, response));
				return toFrontPage("/WEB-ROOT/front/index/index"+qianTaiNum+"/wenzhang.html", resultMap, request, response);
			}else if (flag != null && flag.equals("comment")) {
				doComment(sqlMap,request, response);
				return null;
			}else if (flag != null && flag.equals("doShouCang")) {
				doShouCang(sqlMap,request, response);
				return null;
			}else if (flag != null && flag.equals("doDianZan")) {
				doDianZan(sqlMap,request, response);
				return null;
			}else if (flag != null && flag.equals("doYuDing")) {
				PrintWriter pw = null;
				try {
					response.setCharacterEncoding("utf-8");
					pw = response.getWriter();
					String login_user_acct = SysInfo.getLoginUserAcct4Front(request, response);
					if( login_user_acct.equals("guest") ) {
						pw.write("���ȵ�¼��");
					}else {
						doYuDing(sqlMap,request, response);
					}
				}catch (Exception e) {
					pw.write("��ӵ����ﳵʧ�ܣ�" + e.getMessage() + "");
					e.printStackTrace();
					throw new Exception();
				} finally {
					if (pw != null) {
						pw.close();
					}
				}
				return null;
			}else if (flag != null && flag.equals("single")) {
				String login_user_acct = SysInfo.getLoginUserAcct4Front(request, response);
				String dqfenlei = request.getParameter("fenlei");
				if( dqfenlei == null ){
					dqfenlei = "" ;
				}
				String dqmingchenbiaoti = request.getParameter("mingchenbiaoti");
				if( dqmingchenbiaoti == null ){
					dqmingchenbiaoti = "" ;
				}
				
				HashMap<Object, Object> resultMap = new HashMap<Object, Object>();
				resultMap.put("lanmu", getLanMu(sqlMap, request, response));
				resultMap.put("fenlei", getFenLei(sqlMap, request, response));
				resultMap.put("getMingChen", getMingChen(sqlMap, request, response));
				resultMap.put("login_user_acct", login_user_acct);
				resultMap.put("LOG_SUCC_GO2_FRONT", LOG_SUCC_GO2_FRONT);
				resultMap.put("LOG_SUCC_GO2_APP", LOG_SUCC_GO2_APP);
				resultMap.put("single", getSingle(sqlMap, request, response));
				resultMap.put("dqfenlei", dqfenlei);
				resultMap.put("dqmingchenbiaoti", dqmingchenbiaoti);
				resultMap.put("systemName", getSystemName(sqlMap, request, response));
				resultMap.put("hasLeft", hasLeft);
				
				//�������
				doCount(sqlMap, request, response);
				
				resultMap.put("getCategory", getAllByOrder(sqlMap, request, response));
				
				return toFrontPage("/WEB-ROOT/front/index/index"+qianTaiNum+"/single.html", resultMap, request, response);
			}

			else {
				HashMap<Object, Object> resultMap = new HashMap<Object, Object>();
				resultMap.put("lanmu", getLanMu(sqlMap, request, response));
				resultMap.put("fenlei", getFenLei(sqlMap, request, response));
				resultMap.put("getMingChen", getMingChen(sqlMap, request, response));
				resultMap.put("getAll", getAll(sqlMap, request, response));
				resultMap.put("pinglunxinxi", getWoDePingLunXinXi(sqlMap, request, response));
				resultMap.put("systemName", getSystemName(sqlMap, request, response));
				String login_user_acct = "" ;
				HttpSession currentSession = request.getSession(false);
				if (currentSession != null) {
					if( currentSession.getAttribute("login_user_acct") != null ){
						login_user_acct = currentSession.getAttribute("login_user_acct").toString();
					}
				}
				resultMap.put("login_user_acct", login_user_acct);
				
				resultMap.put("LOG_SUCC_GO2_FRONT", LOG_SUCC_GO2_FRONT);
				resultMap.put("LOG_SUCC_GO2_APP", LOG_SUCC_GO2_APP);
				
				return toFrontPage("/WEB-ROOT/front/index/index" + qianTaiZhuTi, resultMap, request, response);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (sqlMap != null) {
				DBUtils.closeSqlMap(sqlMap, this.getClass());
			}
		}
		return modelAndView;
	}

	public List getDaoHang(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			String sql = "select distinct menu_name,menu_table,menu_todo " +
					   "from menu_info " +
					   "where frontS=1 ";
			ArrayList list = SqlTool.getMultDoc(sql, sqlMap.getCurrentConnection());
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("��ȡ�����˵�����");
		}
	}
	
	public List getWenZhang(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			String id = request.getParameter("id");
			String sql = "select wenzhangbiaoti,fubiaoti,zhengwen,luokuan,itime, '' as fuJian " +
					     "from wenzhangguanli " +
					     "where id=" + id + " "  ;
			ArrayList list = SqlTool.getMultDoc(sql, sqlMap.getCurrentConnection());
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("��ȡ�����˵�����");
		}
	}
	
	public List getWenZhangById(String id , SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			String sql = "select wenzhangbiaoti,fubiaoti,zhengwen,luokuan,itime " +
					"from wenzhangguanli " +
					"where id=" + id + " "  ;
			ArrayList list = SqlTool.getMultDoc(sql, sqlMap.getCurrentConnection());
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("��ȡ�����˵�����");
		}
	}
	
	
	public static List getLanMu(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			String sql = "select distinct lanmumingcheng " +
					   "from lanmuguanli " +
					   "where deleteFlag=0 limit 0,4 ";
			ArrayList list = SqlTool.getMultDoc(sql, sqlMap.getCurrentConnection());
			ArrayList returnList = new ArrayList();
			if( list != null && list.size() > 0 ){
				for( int i = 0 ; i < list.size() ; i ++ ){
					HashMap map = new HashMap();
					String lanmumingcheng = ((Properties)(list.get(i))).getProperty("lanmumingcheng");
					map.put("lanmumingcheng", lanmumingcheng);
					sql = "select id,wenzhangbiaoti,fubiaoti,zhengwen,luokuan,itime " +
						  "from wenzhangguanli " +
						  "where suoshulanmu='" + lanmumingcheng + "' and deleteFlag=0 limit 0,3"  ;
					ArrayList wenzhang = SqlTool.getMultDoc(sql, sqlMap.getCurrentConnection());
					map.put("wenzhang", wenzhang);
					returnList.add(map);
				}
			}
			return returnList;
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("��ȡ��Ŀ��Ϣ����");
		}
	}
	
	
	
	public List getField(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			String menuTable = request.getParameter("menuTable");
			String sql = "select distinct a.column_comment,a.column_name as eName " +
					   "from information_schema.columns a ,menu_info b " +
					   "where a.table_schema='"+Global.DATABASE_NAME+"' and a.table_name='"+menuTable+"' " +
					   "and a.table_name=b.menu_table and POSITION('�������' IN b.menu_name)=0 " +
					   "and a.column_comment <> 'ɾ����ʶ��0��������1��ɾ����' " +
					   "and a.column_comment <> 'Id' " +
					   "and a.column_comment <> '������ID' " +
					   "and a.column_comment <> '����·��' " +
					   "and a.column_comment <> '��ע' " +
					   "and a.column_comment <> '����ʱ��'   ";
			ArrayList list = SqlTool.getMultDoc(sql, sqlMap.getCurrentConnection());
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("��ȡ��˵��������ҳ����Ϣ����");
		}
	}
	
	public String getMenuUrl(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String menuUrl = "" ;
		try {
			String menuTable = request.getParameter("menuTable");
			String sql = "select a.menu_todo " +
					   "from  menu_info a " +
					   "where a.menu_ename='" + menuTable + "' and a.frontS=1 ";
			ArrayList list = SqlTool.getMultDoc(sql, sqlMap.getCurrentConnection());
			if( list != null && list.size() > 0 ){
				menuUrl = ((Properties)(list.get(0))).getProperty("menu_todo");
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("��ȡ�˵�URL����");
		}
		return menuUrl;
	}
	
	
	public List getFenLei(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			String sql = "select distinct fenleimingchen " +
					"from fenleishezhi " +
					"where deleteFlag=0 ";
			ArrayList list = SqlTool.getMultDoc(sql, sqlMap.getCurrentConnection());
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("��ȡ������");
		}
	}
	
	public List getMingChen(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			String sql = "select distinct mingchenbiaoti " +
					 	 "from xinxifabu " +
					 	 "where deleteFlag=0 and shenpi='����ͨ��' " ;
			ArrayList list = SqlTool.getMultDoc(sql, sqlMap.getCurrentConnection());
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("��ȡ�������");
		}
	}
	
	public List getAllDoc(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			String sql = "select distinct yishengxingming,yishengid,zhichen,xueli,shanchang,congyijingli,gerenxiangqing,tuPian " +
					"from yishengjibenxinxi " +
					"where deleteFlag=0  " ;
			ArrayList list = SqlTool.getMultDoc(sql, sqlMap.getCurrentConnection());
			
			if( list != null && list.size() > 0 ){
				for( int j = 0 ; j < list.size() ; j ++ ){
					Properties tpMap = ((Properties) (list.get(j)));
					HashMap<String, Object> tpWhere = new HashMap<String, Object>();
					if( tpMap.get("tuPian") != null && !tpMap.get("tuPian").equals("") ){
						tpWhere.put("tuPianIndex", tpMap.get("tuPian").toString());
						List tpList = IbatisUtil.queryForList(sqlMap, request, response, tpWhere, "Util.selecteTuPianList");
						tpMap.put("tpList", tpList);
					}else {
						HashMap m = new HashMap();
						m.put("picPath", "/WEB-ROOT/front/skin/images/moren.jpg");
						List morenList = new ArrayList();
						morenList.add(m);
						tpMap.put("tpList", morenList);
					}
				}
			}
			
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("��ȡ����ҽ������");
		}
	}
	
	public List getAll(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			String where = "" ;
			// ����Ϊ�����ظ�Ԥ���� ������ʾ����
			if( ! canRepeat ) {
				where = " and (attr2<>1 or  ISNULL(attr2)) " ;
			}
			String sql = "select distinct id,mingchenbiaoti,suoshufenlei,miaoshuyi,miaoshuer,miaoshusan,miaoshusi,miaoshuwu,miaoshuyi_d,miaoshuer_d,miaoshusan_d,miaoshusi_d,miaoshuwu_d,faburen,fabushijian,xiangqingmiaoshu,tuPian,substring(fuJian,instr(fuJian,'/UploadFile')) as fuJian ,attr1 " +
						 "from xinxifabu " +
						 "where deleteFlag=0 and shenpi='����ͨ��' " + where + 
						 "order by id desc ";
			ArrayList list = SqlTool.getMultDoc(sql, sqlMap.getCurrentConnection());
			
			if( list != null && list.size() > 0 ){
				for( int j = 0 ; j < list.size() ; j ++ ){
					Properties tpMap = ((Properties) (list.get(j)));
					HashMap<String, Object> tpWhere = new HashMap<String, Object>();
					if( tpMap.get("tuPian") != null && !tpMap.get("tuPian").equals("") ){
						tpWhere.put("tuPianIndex", tpMap.get("tuPian").toString());
						List tpList = IbatisUtil.queryForList(sqlMap, request, response, tpWhere, "Util.selecteTuPianList");
						tpMap.put("tpList", tpList);
					}else {
						HashMap m = new HashMap();
						m.put("picPath", "/WEB-ROOT/front/skin/images/moren.jpg");
						List morenList = new ArrayList();
						morenList.add(m);
						tpMap.put("tpList", morenList);
					}
				}
			}
			
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("��ȡ��ҳ��Ƶ����");
		}
	}
	
	public List getSingle(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			String id = request.getParameter("id");
			String and = "" ;
			if( id != null && !id.equals("")){
				and = " and t1.id='"+id+"' " ;
			}
			
			String where = "" ;
			// ����Ϊ�����ظ�Ԥ���� ������ʾ����
			if( ! canRepeat ) {
				where = " and (t1.attr2<>1 or  ISNULL(t1.attr2)) " ;
			}
			
			String sql = "select distinct t1.id,t1.mingchenbiaoti,t1.suoshufenlei,t1.miaoshuyi_d,t1.miaoshuer_d,t1.miaoshusan_d,t1.miaoshusi_d,t1.miaoshuwu_d,t1.miaoshuyi,t1.miaoshuer,t1.miaoshusan,t1.miaoshusi,t1.miaoshuwu,t1.faburen,t1.fabushijian,t1.xiangqingmiaoshu,t1.tuPian,substring(t1.fuJian,instr(t1.fuJian,'/UploadFile')) as fuJian,t1.attr1,t1.attr2  " +
					 "from xinxifabu t1  " +
					 "where t1.deleteFlag=0 and t1.shenpi='����ͨ��' " + and + where + 
					 "order by t1.id desc ";
			ArrayList list = SqlTool.getMultDoc(sql, sqlMap.getCurrentConnection());
			
			if( list != null && list.size() > 0 ){
				for( int j = 0 ; j < list.size() ; j ++ ){
					Properties tpMap = ((Properties) (list.get(j)));
					HashMap<String, Object> tpWhere = new HashMap<String, Object>();
					if( tpMap.get("tuPian") != null && !tpMap.get("tuPian").equals("") ){
						tpWhere.put("tuPianIndex", tpMap.get("tuPian").toString());
						List tpList = IbatisUtil.queryForList(sqlMap, request, response, tpWhere, "Util.selecteTuPianList");
						tpMap.put("tpList", tpList);
					}else {
						HashMap m = new HashMap();
						m.put("picPath", "/WEB-ROOT/front/skin/images/moren.jpg");
						List morenList = new ArrayList();
						morenList.add(m);
						tpMap.put("tpList", morenList);
					}
					tpWhere.put("pinglunid", tpMap.get("mingchenbiaoti").toString());
					List plList = IbatisUtil.queryForList(sqlMap, request, response, tpWhere, "Util.selectPinLun");
					tpMap.put("plList", plList);
					
				}
			}
			
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("��ȡĳ����Ϣ����");
		}
	}
	
	
	public List getCategory(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			String fenlei = request.getParameter("fenlei");
			String mingchenbiaoti = request.getParameter("mingchenbiaoti");
			String o = request.getParameter("o");
			String and = "" ;
			String orderBy = "order by id desc " ;
			if( fenlei != null && !fenlei.equals("")){
				and = " and suoshufenlei='"+fenlei+"' " ;
			}
			if( mingchenbiaoti != null && !mingchenbiaoti.equals("")){
				and += " and mingchenbiaoti like '%"+mingchenbiaoti+"%' " ;
			}
			if( o != null && !o.equals("")){
				orderBy = "order by " + o + " desc ";
			}
			
			String where = "" ;
			// ����Ϊ�����ظ�Ԥ���� ������ʾ����
			if( ! canRepeat ) {
				where = " and (attr2<>1 or  ISNULL(attr2)) " ;
			}
			
			String sql = "select distinct id,mingchenbiaoti,suoshufenlei,miaoshuyi_d,miaoshuer_d,miaoshusan_d,miaoshusi_d,miaoshuwu_d,miaoshuyi,miaoshuer,miaoshusan,miaoshusi,miaoshuwu,faburen,fabushijian,xiangqingmiaoshu,tuPian,substring(fuJian,instr(fuJian,'/UploadFile')) as fuJian,attr1  " +
						 "from xinxifabu " +
						 "where deleteFlag=0 and shenpi='����ͨ��'  " + and + where + 
						 orderBy;
			ArrayList list = SqlTool.getMultDoc(sql, sqlMap.getCurrentConnection());
			
			if( list != null && list.size() > 0 ){
				for( int j = 0 ; j < list.size() ; j ++ ){
					Properties tpMap = ((Properties) (list.get(j)));
					HashMap<String, Object> tpWhere = new HashMap<String, Object>();
					if( tpMap.get("tuPian") != null && !tpMap.get("tuPian").equals("") ){
						tpWhere.put("tuPianIndex", tpMap.get("tuPian").toString());
						List tpList = IbatisUtil.queryForList(sqlMap, request, response, tpWhere, "Util.selecteTuPianList");
						tpMap.put("tpList", tpList);
					}else {
						HashMap m = new HashMap();
						m.put("picPath", "/WEB-ROOT/front/skin/images/moren.jpg");
						List morenList = new ArrayList();
						morenList.add(m);
						tpMap.put("tpList", morenList);
					}
				}
			}
			
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("��ȡ��Ϣ����");
		}
	}
// Added ==============================================================
	public void submitOrder(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		PrintWriter pw = null;
		try {
			response.setCharacterEncoding("utf-8");
			pw = response.getWriter();

			// 获取当前登录用户
			String login_user_acct = SysInfo.getLoginUserAcct4Front(request, response);
			if(login_user_acct.equals("guest")) {
				pw.write("请先登录！");
				return;
			}

			// 查询用户购物车信息
			HashMap<String, Object> where = new HashMap<String, Object>();
			where.put("yonghuming", login_user_acct);
			List gouwucheList = sqlMap.queryForList("Gouwuche.selecteList", where);

			if(gouwucheList == null || gouwucheList.size() == 0) {
				pw.write("购物车为空！");
				return;
			}

			// 生成订单号
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
			String dingdandanhao = sdf.format(new Date());

			// 计算总金额
			double zonge = 0;
			for(int i = 0; i < gouwucheList.size(); i++) {
				HashMap item = (HashMap)gouwucheList.get(i);
				zonge += Double.parseDouble(item.get("xiaoji").toString());
			}

			// 创建订单
			where.clear();
			where.put("dingdandanhao", dingdandanhao);
			where.put("yonghuming", login_user_acct);
			where.put("xiaofeizonge", String.valueOf(zonge));
			where.put("zhifufangshi", "在线支付");
			where.put("zhuangtai", "已支付");
			where.put("operatorId", SysInfo.getLoginUserId4Front(request, response));
			where.put("itime", DateUtil.getNowTime());

			sqlMap.insert("Dingdanxinxi.insertObj", where);

			// 创建订单明细
			for(int i = 0; i < gouwucheList.size(); i++) {
				HashMap item = (HashMap)gouwucheList.get(i);

				where.clear();
				where.put("dingdandanhao", dingdandanhao);
				where.put("huohao", item.get("huohao").toString());
				where.put("shangpinmingcheng", item.get("shangpinmingcheng").toString());
				where.put("shuliang", item.get("shuliang").toString());
				where.put("danjia", item.get("danjia").toString());
				where.put("xiaoji", item.get("xiaoji").toString());

				sqlMap.insert("Dingdanxinxi_mingxi.insertObj", where);

				// 更新商品库存
				String huohao = item.get("huohao").toString();
				String shuliang = item.get("shuliang").toString();

				where.clear();
				where.put("huohao", huohao);
				List caigouxinxiList = sqlMap.queryForList("Caigouxinxi.selecteList", where);

				if(caigouxinxiList != null && caigouxinxiList.size() > 0) {
					double kucunliang = Double.parseDouble(((HashMap)caigouxinxiList.get(0)).get("kucunliang").toString());
					double newKucunliang = kucunliang - Double.parseDouble(shuliang);

					where.clear();
					where.put("huohao", huohao);
					where.put("kucunliang", String.valueOf(newKucunliang));

					sqlMap.update("Caigouxinxi.updateKucun", where);
				}
			}

			// 清空购物车
			where.clear();
			where.put("yonghuming", login_user_acct);
			sqlMap.delete("Gouwuche.deleteByUser", where);

			sqlMap.commitTransaction();
			pw.write("订单提交成功！订单号：" + dingdandanhao);
		} catch (Exception e) {
			pw.write("订单提交失败！" + e.getMessage());
			e.printStackTrace();
			throw new Exception();
		} finally {
			if (pw != null) {
				pw.close();
			}
		}
	}
	public void addToCart(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		PrintWriter pw = null;
		try {
			response.setCharacterEncoding("utf-8");
			pw = response.getWriter();

			// 获取当前登录用户
			String login_user_acct = SysInfo.getLoginUserAcct4Front(request, response);
			if(login_user_acct.equals("guest")) {
				pw.write("请先登录！");
				return;
			}

			// 获取商品信息
			String huohao = request.getParameter("huohao");
			String shuliang = request.getParameter("shuliang");
			if(shuliang == null || shuliang.equals("")) {
				shuliang = "1"; // 默认数量为1
			}

			// 查询商品信息
			HashMap<String, Object> where = new HashMap<String, Object>();
			where.put("huohao", huohao);
			List caigouxinxiList = sqlMap.queryForList("Caigouxinxi.selecteList", where);

			if(caigouxinxiList == null || caigouxinxiList.size() == 0) {
				pw.write("商品不存在！");
				return;
			}

			// 获取商品价格
			where.clear();
			where.put("huohao", huohao);
			List jiagelist = sqlMap.queryForList("Jiageshezhi.selecteList", where);

			if(jiagelist == null || jiagelist.size() == 0) {
				pw.write("商品价格未设置！");
				return;
			}

			String danjia = ((HashMap)jiagelist.get(0)).get("xiaoshoujiage").toString();
			double xiaoji = Double.parseDouble(danjia) * Integer.parseInt(shuliang);

			// 查询购物车中是否已存在该商品
			where.clear();
			where.put("huohao", huohao);
			where.put("yonghuming", login_user_acct);
			List gouwucheList = sqlMap.queryForList("Gouwuche.selecteList", where);

			if(gouwucheList != null && gouwucheList.size() > 0) {
				// 已存在，更新数量
				int oldShuliang = Integer.parseInt(((HashMap)gouwucheList.get(0)).get("shuliang").toString());
				int newShuliang = oldShuliang + Integer.parseInt(shuliang);
				double newXiaoji = Double.parseDouble(danjia) * newShuliang;

				where.clear();
				where.put("id", ((HashMap)gouwucheList.get(0)).get("id").toString());
				where.put("shuliang", String.valueOf(newShuliang));
				where.put("xiaoji", String.valueOf(newXiaoji));

				sqlMap.update("Gouwuche.updateObj", where);
			} else {
				// 不存在，新增记录
				where.clear();
				where.put("yonghuming", login_user_acct);
				where.put("huohao", huohao);
				where.put("shangpinmingcheng", ((HashMap)caigouxinxiList.get(0)).get("shangpinmingcheng").toString());
				where.put("shuliang", shuliang);
				where.put("danjia", danjia);
				where.put("xiaoji", String.valueOf(xiaoji));
				where.put("operatorId", SysInfo.getLoginUserId4Front(request, response));
				where.put("itime", DateUtil.getNowTime());

				sqlMap.insert("Gouwuche.insertObj", where);
			}

			sqlMap.commitTransaction();
			pw.write("添加到购物车成功！");
		} catch (Exception e) {
			pw.write("添加到购物车失败！" + e.getMessage());
			e.printStackTrace();
			throw new Exception();
		} finally {
			if (pw != null) {
				pw.close();
			}
		}
	}
//	Added==============================================================
	public void doComment(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		// �������������
		PrintWriter pw = null;
		try {
			// ���ñ���Ϊutf8
			response.setCharacterEncoding("utf-8");
			
			// ��ʼ�������
			pw = response.getWriter();
			
			HashMap<String, Object> where = new HashMap<String, Object>();
			where.put("operatorId", SysInfo.getLoginUserId4Front(request, response));
			
			String pinglunid = request.getParameter("pinglunid");
			String pinglunnarong = request.getParameter("comments");
			
			where.put("pinglunid", pinglunid);
			where.put("pinglunnarong", pinglunnarong);
			where.put("pinglunren", SysInfo.getLoginUserAcct4Front(request, response));
			where.put("pinglunshijian", DateUtil.getNowTime2() );
			
			// �����ݿ���������
			sqlMap.insert("Wodepinglunxinxi.insertObj", where);
			sqlMap.commitTransaction();
			
			// �����ɹ�����ʾ
			pw.write("���۳ɹ���");
			
		} catch (Exception e) {
			// ����ʧ�ܺ���ʾ
			pw.write("����ʧ�ܣ�" + e.getMessage() + "");
			
			// ��ӡ�����ջ��Ϣ
			e.printStackTrace();
			
			// �׳��쳣
			throw new Exception();
		} finally {
			// ����������Ϊ�գ��ر������
			if (pw != null) {
				pw.close();
			}
		}
	}

	public void doShouCang(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		// �������������
		PrintWriter pw = null;
		try {
			// ���ñ���Ϊutf8
			response.setCharacterEncoding("utf-8");
			
			// ��ʼ�������
			pw = response.getWriter();
			
			HashMap<String, Object> where = new HashMap<String, Object>();
			
			String id = request.getParameter("id");
			where.put("id", id);
			List list = sqlMap.queryForList("Xinxifabu.selecteList", where);
			
			where.clear();
			where.put("operatorId", SysInfo.getLoginUserId4Front(request, response));
			String biaotimingchen = ((HashMap)(list.get(0))).get("mingchenbiaoti").toString();
			where.put("biaotimingchen", biaotimingchen);
			String suoshufenlei = ((HashMap)(list.get(0))).get("suoshufenlei").toString();
			where.put("suoshufenlei", suoshufenlei);
			
			String xiangximiaoshu = "" ;
			ServletInputStream inputStream = null ;
			BufferedReader br = null ;
			try {
				inputStream = request.getInputStream();
				br = new BufferedReader(new InputStreamReader(inputStream));
				String line = "";
				StringBuilder sb = new StringBuilder();
				while ((line = br.readLine()) != null) {
				    sb.append(line);
				}
				String url = sb.toString();
				xiangximiaoshu = url.split("url=")[1];
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if( inputStream != null ) {
					inputStream.close();
				}
				if( br != null ) {
					br.close();
				}
			}
			
			where.put("xiangximiaoshu", xiangximiaoshu);
			String shoucangshijian = DateUtil.getNowTime();
			where.put("shoucangshijian", shoucangshijian);

			// �����ݿ���������
			sqlMap.insert("Wodeshoucang.insertObj", where);
			sqlMap.commitTransaction();
			
			// �����ɹ�����ʾ
			pw.write("�ղسɹ���");
			
		} catch (Exception e) {
			// ����ʧ�ܺ���ʾ
			pw.write("�ղ�ʧ�ܣ�" + e.getMessage() + "");
			
			// ��ӡ�����ջ��Ϣ
			e.printStackTrace();
			
			// �׳��쳣
			throw new Exception();
		} finally {
			// ����������Ϊ�գ��ر������
			if (pw != null) {
				pw.close();
			}
		}
	}
	
	public void doDianZan(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		// �������������
		PrintWriter pw = null;
		try {
			// ���ñ���Ϊutf8
			response.setCharacterEncoding("utf-8");
			
			// ��ʼ�������
			pw = response.getWriter();
			
			HashMap<String, Object> where = new HashMap<String, Object>();
			
			String id = request.getParameter("id");
			where.put("id", id);
			List list = sqlMap.queryForList("Xinxifabu.selecteList", where);
			
			where.clear();
			where.put("operatorId", SysInfo.getLoginUserId4Front(request, response));
			String dianzanbiaoti = ((HashMap)(list.get(0))).get("mingchenbiaoti").toString();
			where.put("dianzanbiaoti", dianzanbiaoti);
			
			
			String dianzannarong = "" ;
			ServletInputStream inputStream = null ;
			BufferedReader br = null ;
			try {
				inputStream = request.getInputStream();
				br = new BufferedReader(new InputStreamReader(inputStream));
				String line = "";
				StringBuilder sb = new StringBuilder();
				while ((line = br.readLine()) != null) {
				    sb.append(line);
				}
				String url = sb.toString();
				dianzannarong = url.split("url=")[1];
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if( inputStream != null ) {
					inputStream.close();
				}
				if( br != null ) {
					br.close();
				}
			}
			
			where.put("dianzannarong", dianzannarong);
			String dianzanshijian = DateUtil.getNowTime();
			where.put("dianzanshijian", dianzanshijian);

			// �����ݿ���������
			sqlMap.insert("Wodedianzan.insertObj", where);
			sqlMap.commitTransaction();
			
			// �����ɹ�����ʾ
			pw.write("���޳ɹ���");
			
		} catch (Exception e) {
			// ����ʧ�ܺ���ʾ
			pw.write("����ʧ�ܣ�" + e.getMessage() + "");
			
			// ��ӡ�����ջ��Ϣ
			e.printStackTrace();
			
			// �׳��쳣
			throw new Exception();
		} finally {
			// ����������Ϊ�գ��ر������
			if (pw != null) {
				pw.close();
			}
		}
	}
	
	public ModelAndView doYuDing(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		// �������������
		PrintWriter pw = null;
		try {
			// ���ñ���Ϊutf8
			response.setCharacterEncoding("utf-8");
			
			// ��ʼ�������
			pw = response.getWriter();
			
			HashMap<String, Object> where = new HashMap<String, Object>();
			String id = request.getParameter("id");
			where.put("id", id);
			List list = sqlMap.queryForList("Xinxifabu.selecteList", where);
			String mingchenbiaoti = ((HashMap)(list.get(0))).get("mingchenbiaoti").toString() ;
			
			//ͬһ��ԤԼ�ˣ��Ƿ�����ͬһ�죬ԤԼͬһ��
			if( !canRepeatPerDay ) {
				where.clear();
				where.put("operatorAcct", SysInfo.getLoginUserAcct4Front(request, response));
				where.put("yudingmingchen", mingchenbiaoti );
				where.put("yudingshijian", DateUtil.parse(new Date(), "yyyy-MM-dd"));
				List yuYuelist = sqlMap.queryForList("Util.selecteChongFuYuYue", where);
				if ( yuYuelist != null && yuYuelist.size() > 0 ) {
					throw new Exception("����ʧ�ܣ������ظ��ύ��");
				}
			}
			
			
			where.clear();
			where.put("operatorId", SysInfo.getLoginUserId4Front(request, response));
			
			SimpleDateFormat sdf = new SimpleDateFormat();
			sdf.applyPattern("yyyyMMddHHmmss");
			String strDate = sdf.format(new Date());
			
			where.put("yudingdanhao", strDate);
			
			String suoshufenlei = "" ;
			String fabushijian = "" ;
			String miaoshuer = "" ;
			if( list != null && list.size() > 0 ) {
				mingchenbiaoti = ((HashMap)(list.get(0))).get("mingchenbiaoti").toString() ;
				suoshufenlei = ((HashMap)(list.get(0))).get("suoshufenlei").toString() ;
				fabushijian = ((HashMap)(list.get(0))).get("fabushijian").toString() ;
				miaoshuer = ((HashMap)(list.get(0))).get("miaoshuer").toString() ;
				where.put("yudingmingchen", mingchenbiaoti );
			}
			
			where.put("yudingren", SysInfo.getLoginUserAcct4Front(request, response));
			String yudingshijian = DateUtil.parse(new Date(), "yyyy-MM-dd HH:mm:ss");
			where.put("yudingshijian", yudingshijian);
			where.put("yudingmiaoshu", "�����ɹ���������Աȷ�ϣ�" );
			where.put("shenpi", "������");
			where.put("detail", "");
			where.put("attr1", id);

			// �����ݿ���������
			sqlMap.insert("Wodeyuding.insertObj", where);
			
			
			
			
			
			// �����ظ�Ԥ���ģ��޸�Ԥ��״̬Ϊ��Ԥ��
			if( ! canRepeat ) {
				where.clear();
				where.put("mingchenbiaoti", mingchenbiaoti);
				where.put("attr2", "1");
				sqlMap.update("Xinxifabu.doYiYuDing", where);
			}
			else {
				//�����ظ�Ԥ���������˿�ԤԼʣ���� ��Ҫ����Ԥ��ʣ����-1
				if( hasLeft ) {
					where.clear();
					where.put("id", id);
					sqlMap.update("Xinxifabu.doCutDownShengYu", where);
				}
			}
			
			//�����Ҫ�۳��˻�
			if( Index.deductAccount ) {
				//�ж��˻����
				//��ȡ���
				where.clear();
				where.put("operatorId", SysInfo.getLoginUserId(request, response));
				Object ob = sqlMap.queryForObject("Gerenzhanghuxinxi.yue", where);
				float yue = Float.parseFloat(ob.toString());
				
				//��ȡ��Ҫ�ɷѽ��
				String miaoshusan = ((HashMap)(list.get(0))).get("miaoshusan").toString() ;
				float feiyong = Float.parseFloat( miaoshusan);
				
				if( yue >= feiyong ) {
					//���������ϸ
					where.clear();
					where.put("operatorId", SysInfo.getLoginUserId(request, response));
					where.put("attr1", SysInfo.getLoginUserAcct(request, response));
					where.put("feiyongjine", -feiyong);
					String feiyongshuoming = "�ɷѣ�" + (-feiyong);
					where.put("feiyongshuoming", feiyongshuoming);
					String fashengriqi = DateUtil.parse(new Date(), "yyyy-MM-dd");
					where.put("fashengriqi", fashengriqi);
					String detail = request.getParameter("detail");
					where.put("detail", detail);
					String erjiguanlianzd = request.getParameter("erjiguanlianzd");
					where.put("erjiguanlianzd", erjiguanlianzd);

					// �����ݿ���������
					sqlMap.insert("Gerenzhanghuxinxi.insertObj", where);
				}else {
					throw new Exception("����ʧ�ܣ����㣬���ֵ��");
				}
			}

			sqlMap.commitTransaction();
			
			// �����ɹ�����ʾ
			pw.write("�����ɹ���");
			
		} catch (Exception e) {
			// ����ʧ�ܺ���ʾ
			pw.write( e.getMessage() );
			
			// ��ӡ�����ջ��Ϣ
			e.printStackTrace();
			
			// �׳��쳣
			throw new Exception( e.getMessage() );
		} finally {
			// ����������Ϊ�գ��ر������
			if (pw != null) {
				pw.close();
			}
		}
		return null;
	}
	
	public List getWoDePingLunXinXi(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			String sql = "select distinct pinglunbiaoti,pinglunnarong,pinglunren,pinglunshijian  " +
						 "from wodepinglunxinxi " +
						 "where deleteFlag=0  " + 
						 "order by id desc ";
			ArrayList list = SqlTool.getMultDoc(sql, sqlMap.getCurrentConnection());
			
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("��ȡ������Ϣ����");
		}
	}
	
	
	public void doCount(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Connection conn = null ;
		try {
			String id = request.getParameter("id");
			
			//�����������
			String sql = "update xinxifabu " +
						 "set attr1=IFNULL(attr1,0)+1 " +
						 "where id=" + id ;
			conn = sqlMap.getCurrentConnection() ;
			SqlTool.updateSQL(sql, conn);
			
			String userAcct = SysInfo.getLoginUserAcct4Front(request, response);
			if( !userAcct.equals("guest") ) {
				String itemId = request.getParameter("id"); 
				
				//�����Ϣ�����
				sql = "select count(*) as shuliang " + 
				      "from xinxifabu_view " + 
					  "where user_acct='" + userAcct + "' and item_id='" + itemId + "' ";
				Properties p = SqlTool.getSingleDoc(sql, conn) ;
				String shuliang = p.getProperty("shuliang");
				if( shuliang != null && shuliang.equals("0") ) {
					sql = "insert into xinxifabu_view( user_acct , item_id ) values ('" + userAcct + "' , '" + itemId + "') " ;
					SqlTool.updateSQL(sql, conn);
				}
			}
			
			
			conn.commit();
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("��������");
		}finally {
			// ����������Ϊ�գ��ر������
			if (conn != null) {
				//conn.close();
			}
		}
	}
	
	
	public String getSystemName(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String systenName = "" ;
		try {
			String sql = "select a.systemName " +
					     "from  system_info a " +
					     "where 1=1 ";
			ArrayList list = SqlTool.getMultDoc(sql, sqlMap.getCurrentConnection());
			if( list != null && list.size() > 0 ){
				systenName = ((Properties)(list.get(0))).getProperty("systemName");
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("��ȡ��Ŀ���Ƴ���");
		}
		return systenName;
	}
	
	
	/* �Ƽ���Ϣ */
	public List getAllByOrder(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			ArrayList list = null;
			//�õ��Ƽ����ʺ�
			String recommendUser = SysInfo.getLoginUserAcct4Front(request, response);
			if( recommendUser != null && recommendUser.equals("guest") ) {
				System.out.println( "\norderbyattr1\n" );
				list = orderByAttr1( sqlMap,  request,  response) ;
			}else {
				
				System.out.println( "\norderbyrecommend\n" );
				list = OrderTool.orderByRecommend( sqlMap,  request,  response) ;
				
				
				//list = orderByAttr1( sqlMap,  request,  response) ;
			}
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("��ȡ�Ƽ���Ϣ����");
		}
		
	}
	
	public ArrayList orderByAttr1(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			String fenlei = request.getParameter("fenlei");
			String and = "" ;
			if( fenlei != null && !fenlei.equals("")){
				and = " and suoshufenlei='"+fenlei+"' " ;
			}
			//����attr1���е�������
			String sql = "select distinct id,mingchenbiaoti,suoshufenlei,miaoshuyi_d,miaoshuer_d,miaoshusan_d,miaoshusi_d,miaoshuwu_d,miaoshuyi,miaoshuer,miaoshusan,miaoshusi,miaoshuwu,faburen,fabushijian,xiangqingmiaoshu,tuPian,substring(fuJian,instr(fuJian,'/UploadFile')) as fuJian,attr1  " +
						 "from xinxifabu " +
						 "where deleteFlag=0 and shenpi='����ͨ��'  " + and +
						 "order by attr1+0 desc ";
			ArrayList list = SqlTool.getMultDoc(sql, sqlMap.getCurrentConnection());
			
			if( list != null && list.size() > 0 ){
				for( int j = 0 ; j < list.size() ; j ++ ){
					Properties tpMap = ((Properties) (list.get(j)));
					HashMap<String, Object> tpWhere = new HashMap<String, Object>();
					if( tpMap.get("tuPian") != null && !tpMap.get("tuPian").equals("") ){
						tpWhere.put("tuPianIndex", tpMap.get("tuPian").toString());
						List tpList = IbatisUtil.queryForList(sqlMap, request, response, tpWhere, "Util.selecteTuPianList");
						tpMap.put("tpList", tpList);
					}
				}
			}
			
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("��ȡ��Ϣ������������");
		}
	}
	
	
}
