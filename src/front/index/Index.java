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
			// ==========Added: 0514
			// 商品列表页面的路由处理
			else if (flag != null && flag.equals("shop")) {
				String login_user_acct = SysInfo.getLoginUserAcct4Front(request, response);
				HashMap<Object, Object> resultMap = new HashMap<Object, Object>();
				resultMap.put("fenlei", getFenLei(sqlMap, request, response));
				resultMap.put("lanmu", getLanMu(sqlMap, request, response));
				resultMap.put("getProducts", getProductsList(sqlMap, request, response));
				resultMap.put("login_user_acct", login_user_acct);
				resultMap.put("LOG_SUCC_GO2_FRONT", LOG_SUCC_GO2_FRONT);
				resultMap.put("LOG_SUCC_GO2_APP", LOG_SUCC_GO2_APP);
				resultMap.put("systemName", getSystemName(sqlMap, request, response));
				return toFrontPage("/WEB-ROOT/front/index/index"+qianTaiNum+"/shop.html", resultMap, request, response);
			}
			// 添加到购物车
			else if (flag != null && flag.equals("addToCart")) {
				addToCart(sqlMap, request, response);
				return null;
			}
			// 购物车页面
			else if (flag != null && flag.equals("cart")) {
				String login_user_acct = SysInfo.getLoginUserAcct4Front(request, response);
				if(login_user_acct.equals("guest")) {
					response.sendRedirect(LOG_SUCC_GO2_FRONT);
					return null;
				}

				HashMap<Object, Object> resultMap = new HashMap<Object, Object>();
				resultMap.put("fenlei", getFenLei(sqlMap, request, response));
				resultMap.put("lanmu", getLanMu(sqlMap, request, response));
				resultMap.put("getCart", getCartItems(sqlMap, request, response));
				resultMap.put("login_user_acct", login_user_acct);
				resultMap.put("LOG_SUCC_GO2_FRONT", LOG_SUCC_GO2_FRONT);
				resultMap.put("LOG_SUCC_GO2_APP", LOG_SUCC_GO2_APP);
				resultMap.put("systemName", getSystemName(sqlMap, request, response));
				return toFrontPage("/WEB-ROOT/front/index/index"+qianTaiNum+"/cart.html", resultMap, request, response);
			}
			// 结算处理
			else if (flag != null && flag.equals("checkout")) {
				processCheckout(sqlMap, request, response);
				return null;
			}
			// 更新购物车
			else if (flag != null && flag.equals("updateCart")) {
				updateCart(sqlMap, request, response);
				return null;
			}
			// 从购物车移除商品
			else if (flag != null && flag.equals("removeFromCart")) {
				removeFromCart(sqlMap, request, response);
				return null;
			}
			// ==========Added: 0514
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

	// ==========Added: 0514
	// 获取商品列表
	public List getProductsList(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			String sql = "select distinct id, shangpinmingcheng, huohao, shangpinleixing, danjia, kucunliang, fuJian " +
					"from caigouxinxi " +
					"where deleteFlag=0 and kucunliang > 0 and zhuangtai='审批通过' " +
					"order by id desc";
			ArrayList list = SqlTool.getMultDoc(sql, sqlMap.getCurrentConnection());

			// 处理商品图片
			if(list != null && list.size() > 0) {
				for(int j = 0; j < list.size(); j++) {
					Properties product = ((Properties)(list.get(j)));
					HashMap<String, Object> imgWhere = new HashMap<String, Object>();

					// 获取商品的销售价格
					String huohao = product.getProperty("huohao");
					String priceSql = "select xiaoshoujiage from jiageshezhi where huohao='"+huohao+"' and deleteFlag=0";
					try {
						Properties priceProps = SqlTool.getSingleDoc(priceSql, sqlMap.getCurrentConnection());
						if(priceProps != null && priceProps.getProperty("xiaoshoujiage") != null) {
							product.put("xiaoshoujiage", priceProps.getProperty("xiaoshoujiage"));
						} else {
							product.put("xiaoshoujiage", product.getProperty("danjia"));
						}
					} catch(Exception e) {
						product.put("xiaoshoujiage", product.getProperty("danjia"));
					}

					// 获取商品图片
					if(product.get("fuJian") != null && !product.get("fuJian").equals("")) {
						imgWhere.put("tuPianIndex", product.get("fuJian").toString());
						List imgList = IbatisUtil.queryForList(sqlMap, request, response, imgWhere, "Util.selecteTuPianList");
						product.put("imgList", imgList);
					} else {
						HashMap m = new HashMap();
						m.put("picPath", "/WEB-ROOT/front/skin/images/product-default.jpg");
						List defaultImgList = new ArrayList();
						defaultImgList.add(m);
						product.put("imgList", defaultImgList);
					}
				}
			}

			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("获取商品列表出错！");
		}
	}

	// 添加到购物车
	public void addToCart(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		PrintWriter pw = null;
		try {
			response.setCharacterEncoding("utf-8");
			pw = response.getWriter();

			String login_user_acct = SysInfo.getLoginUserAcct4Front(request, response);
			if(login_user_acct.equals("guest")) {
				pw.write("请先登录！");
				return;
			}

			String huohao = request.getParameter("huohao");
			String quantity = request.getParameter("quantity");
			if(quantity == null || quantity.equals("")) {
				quantity = "1";
			}

			// 检查库存
			String sql = "select kucunliang, shangpinmingcheng from caigouxinxi where huohao='"+huohao+"' and deleteFlag=0";
			Properties productProps = SqlTool.getSingleDoc(sql, sqlMap.getCurrentConnection());

			if(productProps == null) {
				pw.write("商品不存在！");
				return;
			}

			float kucunliang = Float.parseFloat(productProps.getProperty("kucunliang"));
			float requiredQuantity = Float.parseFloat(quantity);

			if(kucunliang < requiredQuantity) {
				pw.write("库存不足，当前库存: " + kucunliang);
				return;
			}

			// 检查购物车中是否已有此商品
			HttpSession session = request.getSession(true);
			ArrayList<HashMap<String, Object>> cart;

			if(session.getAttribute("cart") == null) {
				cart = new ArrayList<HashMap<String, Object>>();
			} else {
				cart = (ArrayList<HashMap<String, Object>>) session.getAttribute("cart");

				// 检查是否已在购物车中
				for(HashMap<String, Object> item : cart) {
					if(item.get("huohao").equals(huohao)) {
						// 已存在此商品，增加数量
						float currentQty = Float.parseFloat(item.get("quantity").toString());
						float newQty = currentQty + requiredQuantity;

						if(newQty > kucunliang) {
							pw.write("添加失败，超出库存数量");
							return;
						}

						item.put("quantity", String.valueOf(newQty));
						session.setAttribute("cart", cart);
						pw.write("商品数量已更新！");
						return;
					}
				}
			}

			// 获取商品价格
			String priceSql = "select xiaoshoujiage from jiageshezhi where huohao='"+huohao+"' and deleteFlag=0";
			String price = "";
			try {
				Properties priceProps = SqlTool.getSingleDoc(priceSql, sqlMap.getCurrentConnection());
				if(priceProps != null && priceProps.getProperty("xiaoshoujiage") != null) {
					price = priceProps.getProperty("xiaoshoujiage");
				}
			} catch(Exception e) {
				// 如果没有设置销售价格，则使用采购单价
				String danjiaSQL = "select danjia from caigouxinxi where huohao='"+huohao+"' and deleteFlag=0";
				Properties danjiaProps = SqlTool.getSingleDoc(danjiaSQL, sqlMap.getCurrentConnection());
				price = danjiaProps.getProperty("danjia");
			}

			// 添加新商品到购物车
			HashMap<String, Object> newItem = new HashMap<String, Object>();
			newItem.put("huohao", huohao);
			newItem.put("shangpinmingcheng", productProps.getProperty("shangpinmingcheng"));
			newItem.put("quantity", quantity);
			newItem.put("price", price);

			cart.add(newItem);
			session.setAttribute("cart", cart);

			pw.write("商品已添加到购物车！");
		} catch (Exception e) {
			pw.write("添加失败：" + e.getMessage());
			e.printStackTrace();
			throw new Exception();
		} finally {
			if (pw != null) {
				pw.close();
			}
		}
	}

	// 获取购物车内容
	public List getCartItems(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession(false);
		if(session == null || session.getAttribute("cart") == null) {
			return new ArrayList();
		}

		ArrayList<HashMap<String, Object>> cart = (ArrayList<HashMap<String, Object>>) session.getAttribute("cart");
		float totalAmount = 0;

		for(HashMap<String, Object> item : cart) {
			float quantity = Float.parseFloat(item.get("quantity").toString());
			float price = Float.parseFloat(item.get("price").toString());
			float subtotal = quantity * price;

			item.put("subtotal", String.format("%.2f", subtotal));
			totalAmount += subtotal;
		}

		// 将总金额保存到session中，结算时使用
		session.setAttribute("cartTotal", String.format("%.2f", totalAmount));

		return cart;
	}

	// 结算方法
	public void processCheckout(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		PrintWriter pw = null;
		try {
			response.setCharacterEncoding("utf-8");
			pw = response.getWriter();

			String login_user_acct = SysInfo.getLoginUserAcct4Front(request, response);
			if(login_user_acct.equals("guest")) {
				pw.write("请先登录！");
				return;
			}

			HttpSession session = request.getSession(false);
			if(session == null || session.getAttribute("cart") == null ||
					((ArrayList)session.getAttribute("cart")).size() == 0) {
				pw.write("购物车为空！");
				return;
			}

			ArrayList<HashMap<String, Object>> cart = (ArrayList<HashMap<String, Object>>) session.getAttribute("cart");
			String totalAmount = (String) session.getAttribute("cartTotal");

			// 生成销售单号
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
			String xiaoshoudanhao = sdf.format(new Date());

			// 创建销售订单
			HashMap<String, Object> orderMap = new HashMap<String, Object>();
			orderMap.put("xiaoshoudanhao", xiaoshoudanhao);
			orderMap.put("jingshouren", login_user_acct);
			orderMap.put("xiaofeijine", totalAmount);

			// 检查是否是会员
			String memberSql = "select huiyuanbianhao from huiyuanxinxi where huiyuanmingcheng='"+login_user_acct+"' and deleteFlag=0";
			try {
				Properties memberProps = SqlTool.getSingleDoc(memberSql, sqlMap.getCurrentConnection());
				if(memberProps != null && memberProps.getProperty("huiyuanbianhao") != null) {
					orderMap.put("huiyuanbianhao", memberProps.getProperty("huiyuanbianhao"));
				} else {
					orderMap.put("huiyuanbianhao", "");
				}
			} catch(Exception e) {
				orderMap.put("huiyuanbianhao", "");
			}

			orderMap.put("operatorId", SysInfo.getLoginUserId4Front(request, response));
			orderMap.put("itime", DateUtil.getNowTime2());
			orderMap.put("detail", "");

			// 插入销售记录
			sqlMap.insert("Xiaoshouxinxi.insertObj", orderMap);

			// 添加销售明细并减少库存
			for(HashMap<String, Object> item : cart) {
				String huohao = (String) item.get("huohao");
				String quantity = (String) item.get("quantity");
				String price = (String) item.get("price");
				float subtotal = Float.parseFloat(quantity) * Float.parseFloat(price);

				// 使用直接SQL插入销售明细
				String insertDetailSql = "INSERT INTO xiaoshouxinxi_mingxi (xiaoshoudanhao, huohao, shuliang, danjia, xiaoji, beizhu) VALUES " +
						"('" + xiaoshoudanhao + "', '" + huohao + "', '" + quantity + "', '" + price + "', '" +
						String.format("%.2f", subtotal) + "', '')";
				Connection conn = sqlMap.getCurrentConnection();
				SqlTool.updateSQL(insertDetailSql, conn);

				// 减少库存
				String updateSql = "update caigouxinxi set kucunliang=kucunliang-" + quantity +
						" where huohao='" + huohao + "' and deleteFlag=0";
				SqlTool.updateSQL(updateSql, conn);
			}

			// 提交事务
			sqlMap.commitTransaction();

			// 清空购物车
			session.removeAttribute("cart");
			session.removeAttribute("cartTotal");

			pw.write("订单提交成功，订单号：" + xiaoshoudanhao);
		} catch (Exception e) {
			pw.write("订单提交失败：" + e.getMessage());
			e.printStackTrace();
			sqlMap.getCurrentConnection().rollback();
			throw new Exception();
		} finally {
			if (pw != null) {
				pw.close();
			}
		}
	}

	// 更新购物车处理
	public void updateCart(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		PrintWriter pw = null;
		try {
			response.setCharacterEncoding("utf-8");
			pw = response.getWriter();

			String login_user_acct = SysInfo.getLoginUserAcct4Front(request, response);
			if(login_user_acct.equals("guest")) {
				pw.write("请先登录！");
				return;
			}

			String huohao = request.getParameter("huohao");
			String quantity = request.getParameter("quantity");
			if(quantity == null || quantity.equals("") || Integer.parseInt(quantity) <= 0) {
				pw.write("无效的数量");
				return;
			}

			// 检查库存
			String sql = "select kucunliang from caigouxinxi where huohao='"+huohao+"' and deleteFlag=0";
			Properties productProps = SqlTool.getSingleDoc(sql, sqlMap.getCurrentConnection());

			if(productProps == null) {
				pw.write("商品不存在！");
				return;
			}

			float kucunliang = Float.parseFloat(productProps.getProperty("kucunliang"));
			float requiredQuantity = Float.parseFloat(quantity);

			if(kucunliang < requiredQuantity) {
				pw.write("库存不足，当前库存: " + kucunliang);
				return;
			}

			// 更新购物车中的商品数量
			HttpSession session = request.getSession(false);
			if(session == null || session.getAttribute("cart") == null) {
				pw.write("购物车为空！");
				return;
			}

			ArrayList<HashMap<String, Object>> cart = (ArrayList<HashMap<String, Object>>) session.getAttribute("cart");
			boolean found = false;

			for(HashMap<String, Object> item : cart) {
				if(item.get("huohao").equals(huohao)) {
					item.put("quantity", quantity);
					found = true;
					break;
				}
			}

			if(!found) {
				pw.write("商品不在购物车中！");
				return;
			}

			session.setAttribute("cart", cart);
			pw.write("购物车已更新！");
		} catch (Exception e) {
			pw.write("更新失败：" + e.getMessage());
			e.printStackTrace();
			throw new Exception();
		} finally {
			if (pw != null) {
				pw.close();
			}
		}
	}

	// 从购物车中移除商品
	public void removeFromCart(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		PrintWriter pw = null;
		try {
			response.setCharacterEncoding("utf-8");
			pw = response.getWriter();

			String login_user_acct = SysInfo.getLoginUserAcct4Front(request, response);
			if(login_user_acct.equals("guest")) {
				pw.write("请先登录！");
				return;
			}

			String huohao = request.getParameter("huohao");

			HttpSession session = request.getSession(false);
			if(session == null || session.getAttribute("cart") == null) {
				pw.write("购物车为空！");
				return;
			}

			ArrayList<HashMap<String, Object>> cart = (ArrayList<HashMap<String, Object>>) session.getAttribute("cart");

			for(int i = 0; i < cart.size(); i++) {
				if(cart.get(i).get("huohao").equals(huohao)) {
					cart.remove(i);
					break;
				}
			}

			session.setAttribute("cart", cart);
			pw.write("商品已从购物车中移除！");
		} catch (Exception e) {
			pw.write("操作失败：" + e.getMessage());
			e.printStackTrace();
			throw new Exception();
		} finally {
			if (pw != null) {
				pw.close();
			}
		}
	}
	// ==========Added: 0514
	
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
