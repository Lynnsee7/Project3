package app.caigouguanli.caigouxinxi;

import java.io.PrintWriter;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;

import app.pub.base.BaseFormController;
import app.pub.database.DBUtils;
import app.pub.database.IbatisUtil;
import app.pub.sysInfo.SysInfo;

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

public class Caigouxinxi extends BaseFormController {

	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView modelAndView = null;
		SqlMapClient sqlMap = null;
		try {
			sqlMap = DBUtils.getSqlMap(this.getClass());
			sqlMap.startTransaction();
			String flag = request.getParameter("flag");
			System.out.println("flag====" + flag);
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
			} else {
				HashMap<Object, Object> resultMap = new HashMap<Object, Object>();
				return toFinish("/WEB-ROOT/app/caigouguanli/caigouxinxi/caigouxinxi.jsp", resultMap, request, response);
			}
			sqlMap.commitTransaction();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (sqlMap != null) {
				DBUtils.closeSqlMap(sqlMap, this.getClass());
			}
		}
		return modelAndView;
	}

	public ModelAndView doGetJsonStore(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) {
		PrintWriter pw = null;
		try {
			HashMap<String, Object> where = new HashMap<String, Object>();
			String shangpinmingchengSearch = request.getParameter("shangpinmingchengSearch");
			if (shangpinmingchengSearch != null && !shangpinmingchengSearch.equals("")) {
				where.put("shangpinmingchengSearch", shangpinmingchengSearch);
			}
			String huohaoSearch = request.getParameter("huohaoSearch");
			if (huohaoSearch != null && !huohaoSearch.equals("")) {
				where.put("huohaoSearch", huohaoSearch);
			}
			String shangpinleixingSearch = request.getParameter("shangpinleixingSearch");
			if (shangpinleixingSearch != null && !shangpinleixingSearch.equals("")) {
				where.put("shangpinleixingSearch", shangpinleixingSearch);
			}
			String gongyingshangSearch = request.getParameter("gongyingshangSearch");
			if (gongyingshangSearch != null && !gongyingshangSearch.equals("")) {
				where.put("gongyingshangSearch", gongyingshangSearch);
			}
			String chengyunshangSearch = request.getParameter("chengyunshangSearch");
			if (chengyunshangSearch != null && !chengyunshangSearch.equals("")) {
				where.put("chengyunshangSearch", chengyunshangSearch);
			}
			String danjiaSearch = request.getParameter("danjiaSearch");
			if (danjiaSearch != null && !danjiaSearch.equals("")) {
				where.put("danjiaSearch", danjiaSearch);
			}
			String caigouriqiSearch = request.getParameter("caigouriqiSearch");
			if (caigouriqiSearch != null && !caigouriqiSearch.equals("")) {
				where.put("caigouriqiSearch", caigouriqiSearch);
			}
			String caigourenSearch = request.getParameter("caigourenSearch");
			if (caigourenSearch != null && !caigourenSearch.equals("")) {
				where.put("caigourenSearch", caigourenSearch);
			}
			String shuliangSearch = request.getParameter("shuliangSearch");
			if (shuliangSearch != null && !shuliangSearch.equals("")) {
				where.put("shuliangSearch", shuliangSearch);
			}
			String kucunliangSearch = request.getParameter("kucunliangSearch");
			if (kucunliangSearch != null && !kucunliangSearch.equals("")) {
				where.put("kucunliangSearch", kucunliangSearch);
			}
			String zhuangtaiSearch = request.getParameter("zhuangtaiSearch");
			if (zhuangtaiSearch != null && !zhuangtaiSearch.equals("")) {
				where.put("zhuangtaiSearch", zhuangtaiSearch);
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

			}

			String json = IbatisUtil.queryForPage(sqlMap, request, response, where, "Caigouxinxi.selecteList");
			System.out.println("json====" + json);

			response.setCharacterEncoding("utf-8");
			pw = response.getWriter();
			pw.write(json);
		} catch (NumberFormatException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (pw != null) {
				pw.close();
			}
		}
		return null;
	}

	public ModelAndView doAdd(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		PrintWriter pw = null;
		try {
			response.setCharacterEncoding("utf-8");
			pw = response.getWriter();
			HashMap<String, Object> where = new HashMap<String, Object>();
			where.put("operatorId", SysInfo.getLoginUserId(request, response));

			sqlMap.insert("Caigouxinxi.insertObj", where);
			pw.write("{success:true,msg:'新增操作成功！'}");

		} catch (Exception e) {
			pw.write("{success:false,msg:'新增操作失败！'}");
			e.printStackTrace();
			throw new Exception();
		} finally {
			if (pw != null) {
				pw.close();
			}
		}
		return null;
	}

	public ModelAndView doAddWithAttach(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		PrintWriter pw = null;
		try {
			response.setCharacterEncoding("GB2312");
			pw = response.getWriter();
			DiskFileItemFactory factory = new DiskFileItemFactory();
			factory.setSizeThreshold(4096);
			ServletFileUpload upload = new ServletFileUpload(factory);
			upload.setSizeMax(Global.UPLOAD_FILE_MAX_SIZE);
			// 解决上传文件名为中文的问题
			upload.setHeaderEncoding("gb2312");

			HashMap<String, Object> whereMap = new HashMap<String, Object>();
			whereMap.put("operatorId", SysInfo.getLoginUserId(request, response));

			List fileItems = upload.parseRequest(request);
			Iterator iter = fileItems.iterator();
			int i = 0;
			int j = 0;
			String shuliang = "";
			while (iter.hasNext()) {
				FileItem item = (FileItem) iter.next();
				/* 非文件域 */
				if (item.isFormField()) {
					if (i == 0) {
						whereMap.put("shangpinmingcheng", item.getString("gb2312"));
					} else if (i == 1) {
						whereMap.put("huohao", item.getString("gb2312"));
					} else if (i == 2) {
						whereMap.put("shangpinleixing", item.getString("gb2312"));
					} else if (i == 3) {
						whereMap.put("gongyingshang", item.getString("gb2312"));
					} else if (i == 4) {
						whereMap.put("chengyunshang", item.getString("gb2312"));
					} else if (i == 5) {
						whereMap.put("danjia", item.getString("gb2312"));
					} else if (i == 6) {
						whereMap.put("caigouriqi", item.getString("gb2312"));
					} else if (i == 7) {
						whereMap.put("caigouren", item.getString("gb2312"));
					} else if (i == 8) {
						shuliang = item.getString("gb2312") ;
						whereMap.put("shuliang",shuliang);
					} else if (i == 9) {
						whereMap.put("kucunliang",shuliang);
					} else if (i == 10) {
						whereMap.put("zhuangtai", item.getString("gb2312"));
					} else if (i == 11) {
						whereMap.put("detail", item.getString("gb2312"));
					}

					i++;
				} /* 文件域 */
				else {
					if (j == 0) {
						String filePath = item.getName();
						if (filePath == null || filePath.equals("")) {
							whereMap.put("fuJian", "");
							continue;
						}
						filePath = filePath.substring(filePath.lastIndexOf("\\") + 1);
						String uploadPath = InitSystemConfig.UPLOAD_FILE_PATH + filePath;
						File file = new File(uploadPath);
						item.write(file);
						whereMap.put("fuJian", uploadPath);
					}
					j++;
				}
			}

			sqlMap.insert("Caigouxinxi.insertObj", whereMap);

			/* 带附件的表单提交，必须设置 ContentType为text/html */
			response.setContentType("text/html");
			pw.write("{success:true,msg:'新增操作成功！'}");

		} catch (Exception e) {
			e.printStackTrace();
			try {
				pw.write("{success:false,msg:'" + e.getMessage() + "'}");
			} catch (Exception e1) {
				throw new Exception("新增操作失败");
			}
		} finally {
			if (pw != null) {
				pw.close();
			}
		}

		return null;
	}

	public ModelAndView doUpdate(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		PrintWriter pw = null;
		try {
			response.setCharacterEncoding("utf-8");
			pw = response.getWriter();
			HashMap<String, Object> where = new HashMap<String, Object>();

			sqlMap.update("Caigouxinxi.updateObj", where);
			pw.write("{success:true,msg:'修改表单成功！'}");

		} catch (Exception e) {
			pw.write("{success:false,msg:'修改表单失败！'}");
			e.printStackTrace();
			throw new Exception();
		} finally {
			if (pw != null) {
				pw.close();
			}
		}
		return null;
	}

	public ModelAndView doUpdateWithAttach(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		PrintWriter pw = null;
		try {
			response.setCharacterEncoding("GB2312");
			pw = response.getWriter();
			DiskFileItemFactory factory = new DiskFileItemFactory();
			factory.setSizeThreshold(4096);
			ServletFileUpload upload = new ServletFileUpload(factory);
			upload.setSizeMax(Global.UPLOAD_FILE_MAX_SIZE);
			// 解决上传文件名为中文的问题
			upload.setHeaderEncoding("gb2312");

			String id = request.getParameter("id");
			String isChangeAttach = request.getParameter("isChangeAttach");
			HashMap<String, Object> whereMap = new HashMap<String, Object>();
			whereMap.put("operatorId", SysInfo.getLoginUserId(request, response));

			List fileItems = upload.parseRequest(request);
			Iterator iter = fileItems.iterator();
			int i = 0;
			int j = 0;
			String shuliang = "" ;
			while (iter.hasNext()) {
				FileItem item = (FileItem) iter.next();
				/* 非文件域 */
				if (item.isFormField()) {
					if (i == 0) {
						whereMap.put("shangpinmingcheng", item.getString("gb2312"));
					} else if (i == 1) {
						whereMap.put("huohao", item.getString("gb2312"));
					} else if (i == 2) {
						whereMap.put("shangpinleixing", item.getString("gb2312"));
					} else if (i == 3) {
						whereMap.put("gongyingshang", item.getString("gb2312"));
					} else if (i == 4) {
						whereMap.put("chengyunshang", item.getString("gb2312"));
					} else if (i == 5) {
						whereMap.put("danjia", item.getString("gb2312"));
					} else if (i == 6) {
						whereMap.put("caigouriqi", item.getString("gb2312"));
					} else if (i == 7) {
						whereMap.put("caigouren", item.getString("gb2312"));
					} else if (i == 8) {
						shuliang = item.getString("gb2312") ;
						whereMap.put("shuliang", shuliang);
					} else if (i == 9) {
						whereMap.put("kucunliang",shuliang);
					} else if (i == 10) {
						whereMap.put("zhuangtai", item.getString("gb2312"));
					} else if (i == 11) {
						whereMap.put("detail", item.getString("gb2312"));
					}

					i++;
				} /* 文件域 */
				else {
					if (j == 0) {
						if (isChangeAttach != null && isChangeAttach.equals("1")) {
							String fileName = item.getName();
							if (fileName == null || fileName.equals("")) {
								whereMap.put("fuJian", "");
								continue;
							}
							fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
							String uploadPath = InitSystemConfig.UPLOAD_FILE_PATH + fileName;
							File file = new File(uploadPath);
							item.write(file);
							whereMap.put("fuJian", uploadPath);
						}
					}
					j++;
				}
			}

			whereMap.put("id", id);
			sqlMap.update("Caigouxinxi.updateObj", whereMap);

			/* 带附件的表单提交，必须设置 ContentType为text/html */
			response.setContentType("text/html");
			pw.write("{success:true,msg:'修改操作成功！'}");

		} catch (Exception e) {
			e.printStackTrace();
			try {
				pw.write("{success:false,msg:'" + e.getMessage() + "'}");
			} catch (Exception e1) {
				throw new Exception("新增操作失败");
			}
		} finally {
			if (pw != null) {
				pw.close();
			}
		}

		return null;
	}

	public ModelAndView doDeleOrUnDele(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		PrintWriter pw = null;
		String info = "";
		try {
			String id = request.getParameter("id");
			String deleteFlag = request.getParameter("deleteFlag");
			info = (deleteFlag.equals("0")) ? "解冻" : "删除";
			response.setCharacterEncoding("utf-8");
			pw = response.getWriter();
			HashMap<String, Object> where = new HashMap<String, Object>();
			where.put("deleteFlag", deleteFlag);
			where.put("id", id);
			sqlMap.delete("Caigouxinxi.doDeleOrUnDele", where);

			pw.write("{success:true,msg:'" + info + "表单成功！'}");
			Logger logger = Logger.getLogger(this.getClass().getName());
		} catch (Exception e) {
			pw.write("{success:false,msg:'" + info + "表单失败！'}");
			e.printStackTrace();
			throw new Exception();
		} finally {
			if (pw != null) {
				pw.close();
			}
		}
		return null;
	}

	public ModelAndView doShenPi(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		PrintWriter pw = null;
		String info = "";
		try {
			String id = request.getParameter("id");
			String zhuangtai = request.getParameter("zhuangtai");
			response.setCharacterEncoding("utf-8");
			pw = response.getWriter();
			HashMap<String, Object> where = new HashMap<String, Object>();
			where.put("zhuangtai", zhuangtai);
			where.put("id", id);
			sqlMap.delete("Caigouxinxi.doShenPi", where);

			pw.write("{success:true,msg:'操作成功！'}");
			Logger logger = Logger.getLogger(this.getClass().getName());
		} catch (Exception e) {
			pw.write("{success:false,msg:'操作失败！'}");
			e.printStackTrace();
			throw new Exception();
		} finally {
			if (pw != null) {
				pw.close();
			}
		}
		return null;
	}

	public ModelAndView doTongJi(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		PrintWriter pw = null;
		try {
			response.setCharacterEncoding("utf-8");
			pw = response.getWriter();

			String m = request.getParameter("m");
			System.out.println("m====" + m);
			if (m != null && !m.equals("")) {
				/* 获取统计字段 */
				String descTabSql = "select column_name as Field , data_type , column_comment as columnComment ," + "SUBSTRING(column_type,INSTR(column_type,'(') + 1,( INSTR(column_type,')') - INSTR(column_type,'(') ) -1  ) as column_type," + "b.tongji "
						+ "from information_schema.columns a,table_tongji b " + "where a.table_schema='" + Global.DATABASE_NAME + "'  and " + "a.table_name='" + m + "' and  " + "a.column_name <>'id' and " + "a.column_name <>'itime' and "
						+ "a.column_name <>'detail' and " + "a.column_name <>'deleteFlag' and " + "a.column_name <>'operatorId' and " + "a.table_name=b.table_name and " + "a.column_name=b.field_name ";
				HashMap<String, Object> where = new HashMap<String, Object>();
				where.put("descTabSql", descTabSql);
				List list = IbatisUtil.queryForList(sqlMap, request, response, where, "Util.descTab");

				String msg = "";
				if (list != null && list.size() > 0) {
					for (int i = 0; i < list.size(); i++) {
						String tongji = ((HashMap) (list.get(i))).get("tongji").toString();
						if (tongji.equals("1")) {
							String column_name = ((HashMap) (list.get(i))).get("Field").toString();
							String columnComment = ((HashMap) (list.get(i))).get("columnComment").toString();
							HashMap<String, Object> whereMap = new HashMap<String, Object>();
							whereMap.put("column_name", column_name);
							whereMap.put("table_name", m);

							String r = request.getParameter("r");
							if (r != null && r.equals("n")) {

							}

							float zongshu = Float.parseFloat(sqlMap.queryForObject("Util.selTongJiTab", whereMap).toString());
							if (msg.equals("")) {
								msg = columnComment + "：" + zongshu + "  ";
							} else {
								msg = msg + " ，" + columnComment + "：" + zongshu + "  ";
							}
						}
					}
				}
				pw.write("{success:true,msg:'" + msg + "'}");
			} else {
				pw.write("{success:true,msg:''}");
			}
		} catch (Exception e) {
			pw.write("{success:false,msg:''}");
			e.printStackTrace();
			throw new Exception();
		} finally {
			if (pw != null) {
				pw.close();
			}
		}
		return null;
	}

	public ModelAndView doGuanLian(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		PrintWriter pw = null;
		try {
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

			String json = IbatisUtil.queryForPage(sqlMap, request, response, where, "Util.selecteGuanLianList");
			System.out.println("json====" + json);

			response.setCharacterEncoding("utf-8");
			pw = response.getWriter();
			pw.write(json);
		} catch (NumberFormatException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (pw != null) {
				pw.close();
			}
		}
		return null;
	}

	public static ModelAndView doExportExcel(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		OutputStream os = null;
		WritableWorkbook wwb = null;
		try {
			// 根据查询条件得到结果集
			HashMap<String, Object> where = new HashMap<String, Object>();
			List<Object> listInfo = sqlMap.queryForList("Caigouxinxi.selecteList", where);

			// 设置response为下载模式
			Date local = new Date();
			SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
			String finalStr = df.format(local);
			response.reset();
			response.setContentType("application/x-excel;charset=gb2312");
			String filename = new String((new String(finalStr + ".xls")).getBytes("GBK"), "ISO8859-1");
			response.setHeader("Content-Disposition", "attachement; filename=\"" + filename + "\"");
			response.setLocale(Locale.CHINA);
			os = response.getOutputStream();

			// 创建工作薄
			wwb = Workbook.createWorkbook(os);
			WritableSheet ws = wwb.createSheet("统计", 0);

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
			e.printStackTrace();
			throw new Exception();
		} finally {
			if (wwb != null) {
				wwb.close();
			}
			if (wwb != null) {
				os.close();
			}
		}
		return null;
	}

	public static WritableSheet refreashSheet(List<Object> al, WritableSheet ws) throws Exception {
		WritableFont wfc = new WritableFont(WritableFont.ARIAL, 10, WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
		WritableCellFormat wcfFC = new WritableCellFormat(wfc);
		wcfFC.setBackground(jxl.format.Colour.ICE_BLUE);
		wcfFC.setAlignment(Alignment.CENTRE);
		wcfFC.setBorder(jxl.format.Border.ALL, jxl.format.BorderLineStyle.MEDIUM);

		WritableFont wfc1 = new WritableFont(WritableFont.ARIAL, 10, WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
		WritableCellFormat wcfFC1 = new WritableCellFormat(wfc1);
		wcfFC1.setBackground(jxl.format.Colour.WHITE);
		wcfFC1.setAlignment(Alignment.CENTRE);
		wcfFC1.setBorder(jxl.format.Border.ALL, jxl.format.BorderLineStyle.MEDIUM);

		WritableFont wfc2 = new WritableFont(WritableFont.ARIAL, 10, WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
		WritableCellFormat wcfFC2 = new WritableCellFormat(wfc2);
		wcfFC2.setBackground(jxl.format.Colour.YELLOW);
		wcfFC2.setAlignment(Alignment.CENTRE);
		wcfFC2.setBorder(jxl.format.Border.ALL, jxl.format.BorderLineStyle.MEDIUM);

		WritableFont wfc3 = new WritableFont(WritableFont.ARIAL, 10, WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
		WritableCellFormat wcfFC3 = new WritableCellFormat(wfc3);
		wcfFC3.setBackground(jxl.format.Colour.ICE_BLUE);
		wcfFC3.setAlignment(Alignment.LEFT);
		wcfFC3.setBorder(jxl.format.Border.ALL, jxl.format.BorderLineStyle.MEDIUM);

		WritableFont wf4 = new WritableFont(WritableFont.ARIAL, 10, WritableFont.NO_BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
		WritableCellFormat wcfF4 = new WritableCellFormat(wf4);
		wcfF4.setBackground(jxl.format.Colour.WHITE);
		wcfF4.setAlignment(Alignment.CENTRE);
		wcfF4.setVerticalAlignment(VerticalAlignment.CENTRE);
		wcfF4.setBorder(jxl.format.Border.ALL, jxl.format.BorderLineStyle.MEDIUM);

		WritableFont wfc5 = new WritableFont(WritableFont.ARIAL, 10, WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
		WritableCellFormat wcfFC5 = new WritableCellFormat(wfc5);
		wcfFC5.setBackground(jxl.format.Colour.ORANGE);
		wcfFC5.setAlignment(Alignment.CENTRE);
		wcfFC5.setBorder(jxl.format.Border.ALL, jxl.format.BorderLineStyle.MEDIUM);

		int colSize = ((HashMap) (al.get(0))).size();

		// 标题
		Label tableHead = new Label(1, 1, "统计Excel", wcfFC);
		ws.addCell(tableHead);
		ws.mergeCells(1, 1, colSize - 1, 1);

		// 表头(列号,行号 ,内容 )
		Label label_0 = new Label(1, 3, "商品名称", wcfFC5);
		ws.addCell(label_0);
		Label label_1 = new Label(2, 3, "货号", wcfFC5);
		ws.addCell(label_1);
		Label label_2 = new Label(3, 3, "商品类型", wcfFC5);
		ws.addCell(label_2);
		Label label_3 = new Label(4, 3, "供应商", wcfFC5);
		ws.addCell(label_3);
		Label label_4 = new Label(5, 3, "承运商", wcfFC5);
		ws.addCell(label_4);
		Label label_5 = new Label(6, 3, "采购单价", wcfFC5);
		ws.addCell(label_5);
		Label label_6 = new Label(7, 3, "采购日期", wcfFC5);
		ws.addCell(label_6);
		Label label_7 = new Label(8, 3, "采购人", wcfFC5);
		ws.addCell(label_7);
		Label label_8 = new Label(9, 3, "采购量", wcfFC5);
		ws.addCell(label_8);
		Label label_9 = new Label(10, 3, "库存量", wcfFC5);
		ws.addCell(label_9);
		Label label_10 = new Label(11, 3, "审批状态", wcfFC5);
		ws.addCell(label_10);
		Label label_11 = new Label(12, 3, "Id", wcfFC5);
		ws.addCell(label_11);
		Label label_12 = new Label(13, 3, "创建时间", wcfFC5);
		ws.addCell(label_12);
		Label label_13 = new Label(14, 3, "备注", wcfFC5);
		ws.addCell(label_13);

		// 表体
		for (int i = 0; i < al.size(); i++) {
			String shangpinmingcheng = ((HashMap) (al.get(i))).get("shangpinmingcheng").toString();
			label_0 = new Label(1, i + 4, shangpinmingcheng, wcfF4);
			ws.addCell(label_0);
			String huohao = ((HashMap) (al.get(i))).get("huohao").toString();
			label_1 = new Label(2, i + 4, huohao, wcfF4);
			ws.addCell(label_1);
			String shangpinleixing = ((HashMap) (al.get(i))).get("shangpinleixing").toString();
			label_2 = new Label(3, i + 4, shangpinleixing, wcfF4);
			ws.addCell(label_2);
			String gongyingshang = ((HashMap) (al.get(i))).get("gongyingshang").toString();
			label_3 = new Label(4, i + 4, gongyingshang, wcfF4);
			ws.addCell(label_3);
			String chengyunshang = ((HashMap) (al.get(i))).get("chengyunshang").toString();
			label_4 = new Label(5, i + 4, chengyunshang, wcfF4);
			ws.addCell(label_4);
			String danjia = ((HashMap) (al.get(i))).get("danjia").toString();
			label_5 = new Label(6, i + 4, danjia, wcfF4);
			ws.addCell(label_5);
			String caigouriqi = ((HashMap) (al.get(i))).get("caigouriqi").toString();
			label_6 = new Label(7, i + 4, caigouriqi, wcfF4);
			ws.addCell(label_6);
			String caigouren = ((HashMap) (al.get(i))).get("caigouren").toString();
			label_7 = new Label(8, i + 4, caigouren, wcfF4);
			ws.addCell(label_7);
			String shuliang = ((HashMap) (al.get(i))).get("shuliang").toString();
			label_8 = new Label(9, i + 4, shuliang, wcfF4);
			ws.addCell(label_8);
			String kucunliang = ((HashMap) (al.get(i))).get("kucunliang").toString();
			label_9 = new Label(10, i + 4, kucunliang, wcfF4);
			ws.addCell(label_9);
			String zhuangtai = ((HashMap) (al.get(i))).get("zhuangtai").toString();
			label_10 = new Label(11, i + 4, zhuangtai, wcfF4);
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

}
