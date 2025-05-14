package app.xinxifabuguanli.xinxifabu;

import java.io.PrintWriter;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import app.pub.base.BaseFormController;
import app.pub.database.DBUtils;
import app.pub.database.IbatisUtil;
import app.pub.sysInfo.SysInfo;
import app.pub.date.DateUtil;

import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.Colour;
import jxl.format.UnderlineStyle;
import jxl.format.VerticalAlignment;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

import java.io.File;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import app.pub.global.Global;
import app.pub.conf.InitSystemConfig;

import com.ibatis.sqlmap.client.SqlMapClient;

public class Xinxifabu extends BaseFormController {
	// 业务处理方法
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 定义Spring , ModelAndView对象
		ModelAndView modelAndView = null;
		SqlMapClient sqlMap = null;
		try {
			// 创建链接
			sqlMap = DBUtils.getSqlMap(this.getClass());

			// 启动事务
			sqlMap.startTransaction();

			// 获取当前操作标识
			String flag = request.getParameter("flag");

			// 获取列表数据
			if (flag != null && flag.equals("getJsonStore")) {
				modelAndView = doGetJsonStore(sqlMap, request, response);
			}// 新增记录
			else if (flag != null && flag.equals("doAddSubmit")) {
				modelAndView = doAddWithAttach(sqlMap, request, response);
			}// 修改记录
			else if (flag != null && flag.equals("doUpdateSubmit")) {
				modelAndView = doUpdateWithAttach(sqlMap, request, response);
			}// 删除或解冻记录
			else if (flag != null && flag.equals("doDeleOrUnDele")) {
				modelAndView = doDeleOrUnDele(sqlMap, request, response);
			}// 导出excel
			else if (flag != null && flag.equals("doExportExcel")) {
				modelAndView = doExportExcel(sqlMap, request, response);
			}// 字段统计
			else if (flag != null && flag.equals("doTongJi")) {
				modelAndView = doTongJi(sqlMap, request, response);
			}// 关联字段
			else if (flag != null && flag.equals("doGuanLian")) {
				modelAndView = doGuanLian(sqlMap, request, response);
			}// 审批
			else if (flag != null && flag.equals("doShenPi")) {
				modelAndView = doShenPi(sqlMap, request, response);
			}// 上传图片
			else if (flag != null && flag.equals("doAddPicSubmit")) {
				modelAndView = doAddPicSubmit(sqlMap, request, response);
			}// 获取图片数据
			else if (flag != null && flag.equals("getPicJsonStore")) {
				modelAndView = doGetPicJsonStore(sqlMap, request, response);
			}// 删除图片
			else if (flag != null && flag.equals("doDelePic")) {
				modelAndView = doDelePic(sqlMap, request, response);
			}// 数据统计分析
			else if (flag != null && flag.equals("doEcharts")) {
				String t = request.getParameter("t");
				HashMap<Object, Object> resultMap = null ;
				if( t.equals("1")) {
					resultMap = doEcharts1(sqlMap, request, response);
				}
				return toFinish("/WEB-ROOT/app/xinxifabuguanli/xinxifabu/echarts"+t+".html", resultMap, request, response);
			}
			else {
				HashMap<Object, Object> resultMap = new HashMap<Object, Object>();
				return toFinish("/WEB-ROOT/app/xinxifabuguanli/xinxifabu/xinxifabu.jsp", resultMap, request, response);
			}
			// 提交数据库
			sqlMap.commitTransaction();
		} catch (Exception e) {
			// 打印错误堆栈信息
			e.printStackTrace();
		} finally {
			// 如果输出流不为空，关闭sqlMap
			if (sqlMap != null) {
				DBUtils.closeSqlMap(sqlMap, this.getClass());
			}
		}
		return modelAndView;
	}

	// 得到查询数据
	public ModelAndView doGetJsonStore(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) {
		// 定义输出流变量
		PrintWriter pw = null;
		try {
			// 设置查询条件
			HashMap<String, Object> where = new HashMap<String, Object>();
			String mingchenbiaotiSearch = request.getParameter("mingchenbiaotiSearch");
			if (mingchenbiaotiSearch != null && !mingchenbiaotiSearch.equals("")) {
				where.put("mingchenbiaotiSearch", mingchenbiaotiSearch);
			}
			String suoshufenleiSearch = request.getParameter("suoshufenleiSearch");
			if (suoshufenleiSearch != null && !suoshufenleiSearch.equals("")) {
				where.put("suoshufenleiSearch", suoshufenleiSearch);
			}
			String miaoshuyiSearch = request.getParameter("miaoshuyiSearch");
			if (miaoshuyiSearch != null && !miaoshuyiSearch.equals("")) {
				where.put("miaoshuyiSearch", miaoshuyiSearch);
			}
			String miaoshuerSearch = request.getParameter("miaoshuerSearch");
			if (miaoshuerSearch != null && !miaoshuerSearch.equals("")) {
				where.put("miaoshuerSearch", miaoshuerSearch);
			}
			String miaoshusanSearch = request.getParameter("miaoshusanSearch");
			if (miaoshusanSearch != null && !miaoshusanSearch.equals("")) {
				where.put("miaoshusanSearch", miaoshusanSearch);
			}
			String miaoshusiSearch = request.getParameter("miaoshusiSearch");
			if (miaoshusiSearch != null && !miaoshusiSearch.equals("")) {
				where.put("miaoshusiSearch", miaoshusiSearch);
			}
			String miaoshuwuSearch = request.getParameter("miaoshuwuSearch");
			if (miaoshuwuSearch != null && !miaoshuwuSearch.equals("")) {
				where.put("miaoshuwuSearch", miaoshuwuSearch);
			}
			String faburenSearch = request.getParameter("faburenSearch");
			if (faburenSearch != null && !faburenSearch.equals("")) {
				where.put("faburenSearch", faburenSearch);
			}
			String fabushijianSearch = request.getParameter("fabushijianSearch");
			if (fabushijianSearch != null && !fabushijianSearch.equals("")) {
				where.put("fabushijianSearch", fabushijianSearch);
			}
			String xiangqingmiaoshuSearch = request.getParameter("xiangqingmiaoshuSearch");
			if (xiangqingmiaoshuSearch != null && !xiangqingmiaoshuSearch.equals("")) {
				where.put("xiangqingmiaoshuSearch", xiangqingmiaoshuSearch);
			}
			String shenpiSearch = request.getParameter("shenpiSearch");
			if (shenpiSearch != null && !shenpiSearch.equals("")) {
				where.put("shenpiSearch", shenpiSearch);
			}
			String idSearch = request.getParameter("idSearch");
			if (idSearch != null && !idSearch.equals("")) {
				where.put("idSearch", idSearch);
			}
			String itimeSearch = request.getParameter("itimeSearch");
			if (itimeSearch != null && !itimeSearch.equals("")) {
				where.put("itimeSearch", itimeSearch);
			}
			String detailSearch = request.getParameter("detailSearch");
			if (detailSearch != null && !detailSearch.equals("")) {
				where.put("detailSearch", detailSearch);
			}
			String deleteFlagSearch = request.getParameter("deleteFlagSearch");
			if (deleteFlagSearch != null && !deleteFlagSearch.equals("")) {
				where.put("deleteFlagSearch", deleteFlagSearch);
			}
			String erjiguanlianzdSearch = request.getParameter("erjiguanlianzdSearch");
			if (erjiguanlianzdSearch != null && !erjiguanlianzdSearch.equals("")) {
				where.put("erjiguanlianzdSearch", erjiguanlianzdSearch);
			}
			String attr1Search = request.getParameter("attr1Search");
			if (attr1Search != null && !attr1Search.equals("")) {
				where.put("attr1Search", attr1Search);
			}
			String attr2Search = request.getParameter("attr2Search");
			if (attr2Search != null && !attr2Search.equals("")) {
				where.put("attr2Search", attr2Search);
			}
			String attr3Search = request.getParameter("attr3Search");
			if (attr3Search != null && !attr3Search.equals("")) {
				where.put("attr3Search", attr3Search);
			}
			String attr4Search = request.getParameter("attr4Search");
			if (attr4Search != null && !attr4Search.equals("")) {
				where.put("attr4Search", attr4Search);
			}
			String attr5Search = request.getParameter("attr5Search");
			if (attr5Search != null && !attr5Search.equals("")) {
				where.put("attr5Search", attr5Search);
			}

			// 设置时间
			String itimeStartSearch = request.getParameter("itimeStartSearch");
			if (itimeStartSearch != null && !itimeStartSearch.equals("")) {
				where.put("itimeStartSearch", itimeStartSearch + " 00:00:00");
			}
			String itimeEndSearch = request.getParameter("itimeEndSearch");
			if (itimeEndSearch != null && !itimeEndSearch.equals("")) {
				where.put("itimeEndSearch", itimeEndSearch + " 23:59:59");
			}

			String r = request.getParameter("r");
			if (r != null && r.equals("n")) {

				if (!SysInfo.getLoginUserType(request, response).equals("1")) {
					where.put("dataRight", "  a.operatorId='" + SysInfo.getLoginUserId(request, response) + "'  ");
				}

			}

			String erjiguanlianzd = request.getParameter("erjiguanlianzd");
			if (erjiguanlianzd != null && !erjiguanlianzd.equals("")) {
				where.put("erjiguanlianzd", erjiguanlianzd);
			}

			// 根据查询条件获取数据
			String json = IbatisUtil.queryForPage(sqlMap, request, response, where, "Xinxifabu.selecteList");

			// 设置编码集为utf8
			response.setCharacterEncoding("utf-8");

			// 获取输出流
			pw = response.getWriter();

			// 向前台输出数据
			pw.write(json);
		} catch (Exception e) {
			// 出错则抛出异常
			e.printStackTrace();
		} finally {
			// 如果输出流不为空，关闭输出流
			if (pw != null) {
				pw.close();
			}
		}
		return null;
	}

	// 新增数据
	public ModelAndView doAdd(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 定义输出流变量
		PrintWriter pw = null;
		try {
			// 设置编码为utf8
			response.setCharacterEncoding("utf-8");

			// 初始化输出流
			pw = response.getWriter();

			// 设置条件
			HashMap<String, Object> where = new HashMap<String, Object>();
			where.put("operatorId", SysInfo.getLoginUserId(request, response));

			// 向数据库新增数据
			sqlMap.insert("Xinxifabu.insertObj", where);

			// 新增成功后提示
			pw.write("{success:true,msg:'新增操作成功！'}");

		} catch (Exception e) {
			// 新增失败后提示
			pw.write("{success:false,msg:'" + e.getMessage() + "'}");

			// 打印错误堆栈信息
			e.printStackTrace();

			// 抛出异常
			throw new Exception();
		} finally {
			// 如果输出流不为空，关闭输出流
			if (pw != null) {
				pw.close();
			}
		}
		return null;
	}

	// 新增上传数据方法
	public ModelAndView doAddWithAttach(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 定义输出流变量
		PrintWriter pw = null;
		try {
			// 设置编码为GB2312，防止中文乱码。
			response.setCharacterEncoding("utf-8");
			
			
			// 初始化输出流
			pw = response.getWriter();
			
			// 设置条件
			HashMap<String, Object> whereMap = new HashMap<String, Object>();
			whereMap.put("operatorId", SysInfo.getLoginUserId(request, response));

			// 获取表单提交对象
			whereMap.put("mingchenbiaoti", request.getParameter("mingchenbiaoti"));
			whereMap.put("suoshufenlei", request.getParameter("suoshufenleiHidd"));
			whereMap.put("miaoshuyi", request.getParameter("miaoshuyi"));
			whereMap.put("miaoshuer", request.getParameter("miaoshuer"));
			whereMap.put("miaoshusan", request.getParameter("miaoshusan"));
			whereMap.put("miaoshusi", request.getParameter("miaoshusi"));
			whereMap.put("miaoshuwu", request.getParameter("miaoshuwu"));
			whereMap.put("miaoshuyi_d", request.getParameter("miaoshuyi_d"));
			whereMap.put("miaoshuer_d", request.getParameter("miaoshuer_d"));
			whereMap.put("miaoshusan_d", request.getParameter("miaoshusan_d"));
			whereMap.put("miaoshusi_d", request.getParameter("miaoshusi_d"));
			whereMap.put("miaoshuwu_d", request.getParameter("miaoshuwu_d"));
			String faburen = request.getParameter("faburen") ;
			whereMap.put("faburen", faburen);
			if( faburen != null && faburen.equals("admin") ) {
				whereMap.put("shenpi", "审批通过");
			}else {
				whereMap.put("shenpi", "待审批");
			}
			
			whereMap.put("fabushijian", request.getParameter("fabushijian"));
			whereMap.put("xiangqingmiaoshu", request.getParameter("xiangqingmiaoshu"));
			
			whereMap.put("detail", request.getParameter("detail"));
			whereMap.put("erjiguanlianzd", request.getParameter("erjiguanlianzd"));
			
			
			whereMap.put("fuJian", "");
			
						
			// 新增数据
			sqlMap.insert("Xinxifabu.insertObj", whereMap);
			
			// 提示操作成功
			pw.write("{success:true,msg:'新增操作成功！'}");

		} catch (Exception e) {
			// 打印错误堆栈
			e.printStackTrace();
			try {
				// 向前台显示操作失败信息
				pw.write("{success:false,msg:'" + e.getMessage() + "'}");
			} catch (Exception e1) {
				throw new Exception("新增操作失败");
			}
		} finally {
			// 如果输出流不为空，关闭输出流
			if (pw != null) {
				pw.close();
			}
		}

		return null;
	}

	// 修改数据方法
	public ModelAndView doUpdate(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 定义输出流变量
		PrintWriter pw = null;
		try {
			// 设置编码为utf8
			response.setCharacterEncoding("utf-8");

			// 初始化输出流
			pw = response.getWriter();

			// 设置条件
			HashMap<String, Object> where = new HashMap<String, Object>();

			// 向数据库提交修改数据
			sqlMap.update("Xinxifabu.updateObj", where);

			// 提示操作成功
			pw.write("{success:true,msg:'修改表单成功！'}");

		} catch (Exception e) {
			// 向前台显示操作失败信息
			pw.write("{success:false,msg:'" + e.getMessage() + "'}");
			e.printStackTrace();
			throw new Exception();
		} finally {
			// 如果输出流不为空，关闭输出流
			if (pw != null) {
				pw.close();
			}
		}
		return null;
	}

	// 修改附件的方法
	public ModelAndView doUpdateWithAttach(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 定义输出流变量
		PrintWriter pw = null;
		try {
			// 设置编码为GB2312，防止中文乱码。
			response.setCharacterEncoding("utf-8");
			
			
			// 初始化输出流
			pw = response.getWriter();
			
			// 获取数据ID
			String id = request.getParameter("id");

			// 判断附件是否被修改
			String isChangeAttach = request.getParameter("isChangeAttach");

			// 设置条件
			HashMap<String, Object> whereMap = new HashMap<String, Object>();
			whereMap.put("operatorId", SysInfo.getLoginUserId(request, response));
			whereMap.put("mingchenbiaoti", request.getParameter("mingchenbiaoti"));
			whereMap.put("suoshufenlei", request.getParameter("suoshufenleiHidd"));
			whereMap.put("miaoshuyi", request.getParameter("miaoshuyi"));
			whereMap.put("miaoshuer", request.getParameter("miaoshuer"));
			whereMap.put("miaoshusan", request.getParameter("miaoshusan"));
			whereMap.put("miaoshusi", request.getParameter("miaoshusi"));
			whereMap.put("miaoshuwu", request.getParameter("miaoshuwu"));
			whereMap.put("faburen", request.getParameter("faburen"));
			whereMap.put("fabushijian", request.getParameter("fabushijian"));
			whereMap.put("xiangqingmiaoshu", request.getParameter("xiangqingmiaoshu"));
			whereMap.put("detail", request.getParameter("detail"));
			whereMap.put("erjiguanlianzd", request.getParameter("erjiguanlianzd"));
			
			
			whereMap.put("fuJian", "");

			// 设置需要修改数据的ID
			whereMap.put("id", id);

			// 向数据库提交修改信息
			sqlMap.update("Xinxifabu.updateObj", whereMap);

			// 修改成功提示
			pw.write("{success:true,msg:'修改操作成功！'}");

		} catch (Exception e) {
			// 打印错误堆栈
			e.printStackTrace();
			try {
				// 向前台显示操作失败信息
				pw.write("{success:false,msg:'" + e.getMessage() + "'}");
			} catch (Exception e1) {
				throw new Exception("新增操作失败");
			}
		} finally {
			// 如果输出流不为空，关闭输出流
			if (pw != null) {
				pw.close();
			}
		}

		return null;
	}

	// 删除数据方法
	public ModelAndView doDeleOrUnDele(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 定义输出流变量
		PrintWriter pw = null;
		String info = "";
		try {
			// 获取需要删除数据的ID
			String id = request.getParameter("id");

			// 获取删除标识
			String deleteFlag = request.getParameter("deleteFlag");
			info = (deleteFlag.equals("0")) ? "解冻" : "删除";

			// 设置编码为utf8
			response.setCharacterEncoding("utf-8");

			// 初始化输出流
			pw = response.getWriter();

			// 设置删除的条件
			HashMap<String, Object> where = new HashMap<String, Object>();
			where.put("deleteFlag", deleteFlag);
			where.put("id", id);

			// 向数据库提交删除数据
			sqlMap.update("Xinxifabu.doDeleOrUnDele", where);

			// 操作成功提示
			pw.write("{success:true,msg:'" + info + "表单成功！'}");

		} catch (Exception e) {
			// 操作失败提示
			pw.write("{success:false,msg:'" + info + "表单失败！'}");

			// 打印错误堆栈信息
			e.printStackTrace();

			// 抛出异常
			throw new Exception();
		} finally {
			// 如果输出流不为空，关闭输出流
			if (pw != null) {
				pw.close();
			}
		}
		return null;
	}

	// 审批方法
	public ModelAndView doShenPi(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 定义输出流变量
		PrintWriter pw = null;
		String info = "";
		try {
			// 获取需要审批信息的ID
			String id = request.getParameter("id");

			// 获取需要审批信息的状态
			String shenpi = request.getParameter("shenpi");

			// 设置编码为utf8
			response.setCharacterEncoding("utf-8");

			// 初始化输出流
			pw = response.getWriter();

			// 设置条件
			HashMap<String, Object> where = new HashMap<String, Object>();
			where.put("shenpi", shenpi);
			where.put("id", id);

			// 向数据库提交审批信息
			sqlMap.update("Xinxifabu.doShenPi", where);

			// 操作成功后提示
			pw.write("{success:true,msg:'操作成功！'}");

		} catch (Exception e) {
			// 操作失败后提示
			pw.write("{success:false,msg:'操作失败！'}");

			// 打印错误堆栈信息
			e.printStackTrace();

			// 抛出异常
			throw new Exception();
		} finally {
			// 如果输出流不为空，关闭输出流
			if (pw != null) {
				pw.close();
			}
		}
		return null;
	}

	// 统计方法
	public ModelAndView doTongJi(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 定义输出流变量
		PrintWriter pw = null;
		try {
			// 设置编码为utf8
			response.setCharacterEncoding("utf-8");

			// 初始化输出流
			pw = response.getWriter();

			String m = request.getParameter("m");
			if (m != null && !m.equals("")) {
				/* 获取统计字段 */
				String descTabSql = "select column_name as Field , data_type , column_comment as columnComment ," + "SUBSTRING(column_type,INSTR(column_type,'(') + 1,( INSTR(column_type,')') - INSTR(column_type,'(') ) -1  ) as column_type," + "b.tongji "
						+ "from information_schema.columns a,table_tongji b " + "where a.table_schema='" + Global.DATABASE_NAME + "'  and " + "a.table_name='" + m + "' and  " + "a.column_name <>'id' and " + "a.column_name <>'itime' and " + "a.column_name <>'detail' and "
						+ "a.column_name <>'deleteFlag' and " + "a.column_name <>'operatorId' and " + "a.table_name=b.table_name and " + "a.column_name=b.field_name ";

				// 设置统计条件
				HashMap<String, Object> where = new HashMap<String, Object>();
				where.put("descTabSql", descTabSql);

				// 获取统计数据
				List list = IbatisUtil.queryForList(sqlMap, request, response, where, "Util.descTab");

				// 解析统计数据值
				String msg = "";
				if (list != null && list.size() > 0) {
					for (int i = 0; i < list.size(); i++) {
						String tongji = ((HashMap) (list.get(i))).get("tongji").toString();
						if (tongji.equals("1")) {
							String column_name = ((HashMap) (list.get(i))).get("Field").toString();
							String columnComment = ((HashMap) (list.get(i))).get("columnComment").toString();
							// 设置统计条件
							HashMap<String, Object> whereMap = new HashMap<String, Object>();
							whereMap.put("column_name", column_name);
							whereMap.put("table_name", m);

							String r = request.getParameter("r");
							if (r != null && r.equals("n")) {

								if (!SysInfo.getLoginUserType(request, response).equals("1")) {
									whereMap.put("dataRight", "  operatorId='" + SysInfo.getLoginUserId(request, response) + "' ");
								}

							}
							String erjiguanlianzd = request.getParameter("erjiguanlianzd");
							if (erjiguanlianzd != null && !erjiguanlianzd.equals("")) {
								whereMap.put("erjiguanlianzd", erjiguanlianzd);
							}
							// 设置统计结果信息
							float zongshu = Float.parseFloat(sqlMap.queryForObject("Util.selTongJiTab", whereMap).toString());
							if (msg.equals("")) {
								msg = columnComment + "：" + zongshu + "  ";
							} else {
								msg = msg + " ，" + columnComment + "：" + zongshu + "  ";
							}
						}
					}
				}
				// 向前台输出统计结果信息
				pw.write("{success:true,msg:'" + msg + "'}");
			} else {
				// 向前台输出统计结果信息
				pw.write("{success:true,msg:''}");
			}
		} catch (Exception e) {
			// 向前台输出统计结果信息
			pw.write("{success:false,msg:''}");

			// 打印错误堆栈信息
			e.printStackTrace();

			// 出错则抛出异常
			throw new Exception();
		} finally {
			// 如果输出流不为空，关闭输出流
			if (pw != null) {
				pw.close();
			}
		}
		return null;
	}

	public ModelAndView doGuanLian(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 定义输出流变量
		PrintWriter pw = null;
		try {
			// 设置关联条件
			HashMap<String, Object> where = new HashMap<String, Object>();
			String guanLianBiao = request.getParameter("guanLianBiao");
			if (guanLianBiao != null && !guanLianBiao.equals("")) {
				where.put("guanLianBiao", guanLianBiao);
			}
			String guanLianZiDuan = request.getParameter("guanLianZiDuan");
			if (guanLianZiDuan != null && !guanLianZiDuan.equals("")) {
				where.put("guanLianZiDuan", guanLianZiDuan);
			}
			where.put("deleteFlag", 0);

			// 得到数据
			String json = IbatisUtil.queryForPage(sqlMap, request, response, where, "Util.selecteGuanLianList");

			// 设置编码为utf8
			response.setCharacterEncoding("utf-8");

			// 初始化输出流
			pw = response.getWriter();

			// 向前台输出信息
			pw.write(json);
		} catch (Exception e) {
			// 打印错误堆栈信息
			e.printStackTrace();
		} finally {
			// 如果输出流不为空，关闭输出流
			if (pw != null) {
				pw.close();
			}
		}
		return null;
	}

	public static ModelAndView doExportExcel(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 定义输出流
		OutputStream os = null;
		// 定义excel输出流
		WritableWorkbook wwb = null;
		try {
			// 根据查询条件得到结果集
			HashMap<String, Object> where = new HashMap<String, Object>();
			List<Object> listInfo = sqlMap.queryForList("Xinxifabu.selecteList", where);

			// 设置response为下载模式
			Date local = new Date();

			// 格式化当前时间作为文件名
			SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
			String finalStr = df.format(local);

			// 重置response
			response.reset();

			// 设置表头为application/x-excel;charset=gb2312
			response.setContentType("application/x-excel;charset=gb2312");

			// 设置导出excel文件的文件名
			String filename = new String((new String(finalStr + ".xls")).getBytes("GBK"), "ISO8859-1");

			// 设置输出为下载模式
			response.setHeader("Content-Disposition", "attachement; filename=\"" + filename + "\"");

			// 设置本地化语言为china
			response.setLocale(Locale.CHINA);

			// 获取输出流
			os = response.getOutputStream();

			// 创建工作薄
			wwb = Workbook.createWorkbook(os);
			WritableSheet ws = wwb.createSheet("统计", 0);

			// 设置列宽
			if (listInfo != null && listInfo.size() > 0) {
				int colSize = ((HashMap) (listInfo.get(0))).size();
				for (int i = 0; i < colSize; i++) {
					ws.setColumnView(i + 1, 25);
				}
			}

			// 重绘工作薄
			ws = refreashSheet(listInfo, ws);
			wwb.write();
		} catch (Exception e) {
			// 打印错误堆栈信息
			e.printStackTrace();

			// 抛出异常
			throw new Exception();
		} finally {
			// 如果输出流不为空，关闭输出流
			if (wwb != null) {
				wwb.close();
			}
			// 如果输出流不为空，关闭输出流
			if (wwb != null) {
				os.close();
			}
		}
		return null;
	}

	public static WritableSheet refreashSheet(List<Object> al, WritableSheet ws) throws Exception {
		// 样式1
		WritableFont wfc = new WritableFont(WritableFont.ARIAL, 10, WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
		WritableCellFormat wcfFC = new WritableCellFormat(wfc);
		// 设置背景为蓝色
		wcfFC.setBackground(jxl.format.Colour.ICE_BLUE);
		// 设置对齐方式为居中对齐
		wcfFC.setAlignment(Alignment.CENTRE);
		// 设置边框样式
		wcfFC.setBorder(jxl.format.Border.ALL, jxl.format.BorderLineStyle.MEDIUM);

		// 样式2
		WritableFont wfc1 = new WritableFont(WritableFont.ARIAL, 10, WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
		WritableCellFormat wcfFC1 = new WritableCellFormat(wfc1);
		// 设置背景为白色
		wcfFC1.setBackground(jxl.format.Colour.WHITE);
		// 设置对齐方式为居中对齐
		wcfFC1.setAlignment(Alignment.CENTRE);
		// 设置边框样式
		wcfFC1.setBorder(jxl.format.Border.ALL, jxl.format.BorderLineStyle.MEDIUM);

		// 样式3
		WritableFont wfc2 = new WritableFont(WritableFont.ARIAL, 10, WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
		WritableCellFormat wcfFC2 = new WritableCellFormat(wfc2);
		// 设置背景为黄色
		wcfFC2.setBackground(jxl.format.Colour.YELLOW);
		// 设置对齐方式为居中对齐
		wcfFC2.setAlignment(Alignment.CENTRE);
		// 设置边框样式
		wcfFC2.setBorder(jxl.format.Border.ALL, jxl.format.BorderLineStyle.MEDIUM);

		// 样式4
		WritableFont wfc3 = new WritableFont(WritableFont.ARIAL, 10, WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
		WritableCellFormat wcfFC3 = new WritableCellFormat(wfc3);
		// 设置背景为蓝色
		wcfFC3.setBackground(jxl.format.Colour.ICE_BLUE);
		// 设置对齐方式为居左对齐
		wcfFC3.setAlignment(Alignment.LEFT);
		// 设置边框样式
		wcfFC3.setBorder(jxl.format.Border.ALL, jxl.format.BorderLineStyle.MEDIUM);

		// 样式5
		WritableFont wf4 = new WritableFont(WritableFont.ARIAL, 10, WritableFont.NO_BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
		WritableCellFormat wcfF4 = new WritableCellFormat(wf4);
		// 设置背景为白色
		wcfF4.setBackground(jxl.format.Colour.WHITE);
		// 设置对齐方式为居中对齐
		wcfF4.setAlignment(Alignment.CENTRE);
		// 设置对齐方式为居中对齐
		wcfF4.setVerticalAlignment(VerticalAlignment.CENTRE);
		// 设置边框样式
		wcfF4.setBorder(jxl.format.Border.ALL, jxl.format.BorderLineStyle.MEDIUM);

		// 样式6
		WritableFont wfc5 = new WritableFont(WritableFont.ARIAL, 10, WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
		WritableCellFormat wcfFC5 = new WritableCellFormat(wfc5);
		// 设置背景为橙色
		wcfFC5.setBackground(jxl.format.Colour.ORANGE);
		// 设置对齐方式为居中对齐
		wcfFC5.setAlignment(Alignment.CENTRE);
		// 设置边框样式
		wcfFC5.setBorder(jxl.format.Border.ALL, jxl.format.BorderLineStyle.MEDIUM);

		// 定义列宽
		int colSize = ((HashMap) (al.get(0))).size();

		// 设置标题样式
		Label tableHead = new Label(1, 1, "统计Excel", wcfFC);
		ws.addCell(tableHead);
		ws.mergeCells(1, 1, colSize - 3, 1);

		// 设置表头(列号,行号 ,内容 )
		Label label_0 = new Label(1, 3, "名称标题", wcfFC5);
		ws.addCell(label_0);
		Label label_1 = new Label(2, 3, "所属分类", wcfFC5);
		ws.addCell(label_1);
		Label label_2 = new Label(3, 3, "描述一", wcfFC5);
		ws.addCell(label_2);
		Label label_3 = new Label(4, 3, "描述二", wcfFC5);
		ws.addCell(label_3);
		Label label_4 = new Label(5, 3, "描述三", wcfFC5);
		ws.addCell(label_4);
		Label label_5 = new Label(6, 3, "描述四", wcfFC5);
		ws.addCell(label_5);
		Label label_6 = new Label(7, 3, "描述五", wcfFC5);
		ws.addCell(label_6);
		Label label_7 = new Label(8, 3, "发布人", wcfFC5);
		ws.addCell(label_7);
		Label label_8 = new Label(9, 3, "发布时间", wcfFC5);
		ws.addCell(label_8);
		Label label_9 = new Label(10, 3, "详情描述", wcfFC5);
		ws.addCell(label_9);
		Label label_10 = new Label(11, 3, "审批状态", wcfFC5);
		ws.addCell(label_10);
		Label label_11 = new Label(12, 3, "Id", wcfFC5);
		ws.addCell(label_11);
		Label label_12 = new Label(13, 3, "创建时间", wcfFC5);
		ws.addCell(label_12);
		Label label_13 = new Label(14, 3, "备注", wcfFC5);
		ws.addCell(label_13);

		// 设置表体
		for (int i = 0; i < al.size(); i++) {
			String mingchenbiaoti = ((HashMap) (al.get(i))).get("mingchenbiaoti").toString();
			label_0 = new Label(1, i + 4, mingchenbiaoti, wcfF4);
			ws.addCell(label_0);
			String suoshufenlei = ((HashMap) (al.get(i))).get("suoshufenlei").toString();
			label_1 = new Label(2, i + 4, suoshufenlei, wcfF4);
			ws.addCell(label_1);
			String miaoshuyi = ((HashMap) (al.get(i))).get("miaoshuyi").toString();
			label_2 = new Label(3, i + 4, miaoshuyi, wcfF4);
			ws.addCell(label_2);
			String miaoshuer = ((HashMap) (al.get(i))).get("miaoshuer").toString();
			label_3 = new Label(4, i + 4, miaoshuer, wcfF4);
			ws.addCell(label_3);
			String miaoshusan = ((HashMap) (al.get(i))).get("miaoshusan").toString();
			label_4 = new Label(5, i + 4, miaoshusan, wcfF4);
			ws.addCell(label_4);
			String miaoshusi = ((HashMap) (al.get(i))).get("miaoshusi").toString();
			label_5 = new Label(6, i + 4, miaoshusi, wcfF4);
			ws.addCell(label_5);
			String miaoshuwu = ((HashMap) (al.get(i))).get("miaoshuwu").toString();
			label_6 = new Label(7, i + 4, miaoshuwu, wcfF4);
			ws.addCell(label_6);
			String faburen = ((HashMap) (al.get(i))).get("faburen").toString();
			label_7 = new Label(8, i + 4, faburen, wcfF4);
			ws.addCell(label_7);
			String fabushijian = ((HashMap) (al.get(i))).get("fabushijian").toString();
			label_8 = new Label(9, i + 4, fabushijian, wcfF4);
			ws.addCell(label_8);
			String xiangqingmiaoshu = ((HashMap) (al.get(i))).get("xiangqingmiaoshu").toString();
			label_9 = new Label(10, i + 4, xiangqingmiaoshu, wcfF4);
			ws.addCell(label_9);
			String shenpi = ((HashMap) (al.get(i))).get("shenpi").toString();
			label_10 = new Label(11, i + 4, shenpi, wcfF4);
			ws.addCell(label_10);
			String id = ((HashMap) (al.get(i))).get("id").toString();
			label_11 = new Label(12, i + 4, id, wcfF4);
			ws.addCell(label_11);
			String itime = ((HashMap) (al.get(i))).get("itime").toString();
			label_12 = new Label(13, i + 4, itime, wcfF4);
			ws.addCell(label_12);
			String detail = ((HashMap) (al.get(i))).get("detail").toString();
			label_13 = new Label(14, i + 4, detail, wcfF4);
			ws.addCell(label_13);
		}

		return ws;
	}

	public ModelAndView doAddPicSubmit(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 定义输出流变量
		PrintWriter pw = null;
		try {
			// 设置编码为GB2312
			response.setCharacterEncoding("GB2312");

			// 初始化输出流
			pw = response.getWriter();

			// 获取DiskFileItemFactory对象
			DiskFileItemFactory factory = new DiskFileItemFactory();

			// 设置缓冲区大小为4096k
			factory.setSizeThreshold(4096);

			// 定义上传对象
			ServletFileUpload upload = new ServletFileUpload(factory);

			// 设置上传最大限制
			upload.setSizeMax(Global.UPLOAD_FILE_MAX_SIZE);

			// 解决上传文件名为中文的问题
			upload.setHeaderEncoding("gb2312");

			// 获取ID
			String id = request.getParameter("id");

			// 设置图片ID
			HashMap<String, Object> whereMap = new HashMap<String, Object>();
			whereMap.put("id", id);
			String tuPianIndex = "";

			// 查询图片信息
			List list = sqlMap.queryForList("Xinxifabu.getTuPianIndex", whereMap);
			if (list != null && list.size() > 0) {
				if (list.get(0) != null) {
					tuPianIndex = ((HashMap) (list.get(0))).get("tuPian").toString();
				}
			}

			// 创建文件夹，并上传图片
			if (tuPianIndex.equals("")) {
				tuPianIndex = DateUtil.parse(new Date(), "yyyyMMddHHmmss") + (int) (Math.random() * 10);
				whereMap.put("tuPianIndex", tuPianIndex);
				sqlMap.update("Xinxifabu.updateTuPianIndex", whereMap);
				File f = new File(InitSystemConfig.UPLOAD_FILE_PATH + tuPianIndex);
				f.mkdir();
			}

			// 得到表单提交数据
			List fileItems = upload.parseRequest(request);
			Iterator iter = fileItems.iterator();

			whereMap.clear();
			while (iter.hasNext()) {
				FileItem item = (FileItem) iter.next();
				/* 文件域 */
				if (!item.isFormField()) {
					// 获取文件名称
					String filePath = item.getName();
					filePath = filePath.substring(filePath.lastIndexOf("\\") + 1);
					whereMap.put("picName", filePath);

					// 获取文件路径
					String uploadPath = InitSystemConfig.UPLOAD_FILE_PATH + tuPianIndex + "/" + filePath;
					whereMap.put("picPath", uploadPath);

					// 文件不存在，则新增
					if (!new File(uploadPath).exists()) {
						whereMap.put("operatorId", SysInfo.getLoginUserId(request, response));
						whereMap.put("tuPianIndex", tuPianIndex);
						sqlMap.insert("Xinxifabu.insertTuPian", whereMap);
					}

					// 创建文件上传
					File file = new File(uploadPath);
					item.write(file);

				}
			}

			/* 带附件的表单提交，必须设置 ContentType为text/html */
			response.setContentType("text/html");

			// 提示操作成功
			pw.write("{success:true,msg:'新增图片成功！'}");

		} catch (Exception e) {
			// 打印错误堆栈
			e.printStackTrace();
			try {
				// 向前台显示操作失败信息
				pw.write("{success:false,msg:'" + e.getMessage() + "'}");
			} catch (Exception e1) {
				// 抛出错误异常
				throw new Exception("新增图片失败");
			}
		} finally {
			// 如果输出流不为空，关闭输出流
			if (pw != null) {
				pw.close();
			}
		}

		return null;
	}

	public ModelAndView doGetPicJsonStore(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) {
		// 定义输出流变量
		PrintWriter pw = null;
		try {
			// 设置查询图片条件
			HashMap<String, Object> where = new HashMap<String, Object>();
			String id = request.getParameter("id");
			if (id != null && !id.equals("")) {
				where.put("id", id);
			}

			// 得到查询图片结果信息
			String json = IbatisUtil.queryForPage(sqlMap, request, response, where, "Xinxifabu.selectePicList");

			// 设置编码为utf8
			response.setCharacterEncoding("utf-8");

			// 初始化输出流
			pw = response.getWriter();

			// 向前台输出结果
			pw.write(json);
		} catch (Exception e) {
			// 打印错误堆栈信息
			e.printStackTrace();
		} finally {
			// 如果输出流不为空，关闭输出流
			if (pw != null) {
				pw.close();
			}
		}
		return null;
	}

	public ModelAndView doDelePic(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 定义输出流变量
		PrintWriter pw = null;
		try {
			// 设置需要删除图片的ID
			String id = request.getParameter("id");

			// 获取图片的路径
			String picPath = request.getParameter("picPath");

			// 设置编码为utf8
			response.setCharacterEncoding("utf-8");

			// 初始化输出流
			pw = response.getWriter();

			// 设置删除条件
			HashMap<String, Object> where = new HashMap<String, Object>();
			where.put("id", id);

			// 向数据库提交删除信息
			sqlMap.delete("Xinxifabu.doDelePic", where);

			// 将文件删除
			File f = new File(picPath);
			if (f.exists()) {
				f.delete();
			}

			// 操作成功提示
			pw.write("{success:true,msg:'删除图片成功！'}");
		} catch (Exception e) {
			// 操作失败提示
			pw.write("{success:false,msg:'删除图片失败！'}");

			// 打印错误堆栈信息
			e.printStackTrace();

			// 出错则抛出异常
			throw new Exception();
		} finally {
			// 如果输出流不为空，关闭输出流
			if (pw != null) {
				pw.close();
			}
		}
		return null;
	}
	
	public HashMap<Object, Object> doEcharts1(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 定义输出流变量
		HashMap<Object, Object> resultMap = new HashMap<Object, Object>();
		try {
			// 设置编码为utf8
			response.setCharacterEncoding("utf-8");
			
			HashMap<String, Object> where = new HashMap<String, Object>();
			where.put("shenpi", "审批通过");
			
			List selectEchartsAllDingDanData = sqlMap.queryForList("Util.selectEchartsAllDingDanData", where);
			List selectEchartsAllDingDanSuoShuFenLei = sqlMap.queryForList("Util.selectEchartsAllDingDanSuoShuFenLei", where);
			List selectEchartsAllDingDanShiJian = sqlMap.queryForList("Util.selectEchartsAllDingDanShiJian", where);
			
			resultMap.put("dingDanData", selectEchartsAllDingDanData);
			resultMap.put("shijian", selectEchartsAllDingDanShiJian);
			resultMap.put("suoShuFenLei", selectEchartsAllDingDanSuoShuFenLei);
			
			
		} catch (Exception e) {
			// 打印错误堆栈信息
			e.printStackTrace();
			
			// 出错则抛出异常
			throw new Exception("获取统计需要返回的数据出错！");
		} 
		return resultMap;
	}
}
