package app.caiwuguanli.xiaoshoutubiaotongji;

import java.io.PrintWriter;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.axis.CategoryAxis;
import org.jfree.chart.axis.NumberAxis;
import org.jfree.chart.labels.ItemLabelAnchor;
import org.jfree.chart.labels.ItemLabelPosition;
import org.jfree.chart.labels.StandardCategoryItemLabelGenerator;
import org.jfree.chart.plot.CategoryPlot;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.chart.renderer.category.BarRenderer3D;
import org.jfree.chart.servlet.ServletUtilities;
import org.jfree.chart.title.TextTitle;
import org.jfree.data.category.DefaultCategoryDataset;
import org.jfree.ui.TextAnchor;
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

import java.awt.Color;
import java.awt.Font;
import java.io.ByteArrayOutputStream;
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

public class Xiaoshoutubiaotongji extends BaseFormController {

	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView modelAndView = null;
		SqlMapClient sqlMap = null;
		try {
			sqlMap = DBUtils.getSqlMap(this.getClass());
			sqlMap.startTransaction();
			String flag = request.getParameter("flag");
			System.out.println("flag====" + flag);
			// ��ȡ�б�����
			if (flag != null && flag.equals("getJsonStore")) {
				modelAndView = doGetJsonStore(sqlMap, request, response);
			} // ������¼
			else if (flag != null && flag.equals("doAddSubmit")) {
				modelAndView = doAdd(sqlMap, request, response);
			} // �޸ļ�¼
			else if (flag != null && flag.equals("doUpdateSubmit")) {
				modelAndView = doUpdate(sqlMap, request, response);
			} // ɾ����ⶳ��¼
			else if (flag != null && flag.equals("doDeleOrUnDele")) {
				modelAndView = doDeleOrUnDele(sqlMap, request, response);
			} // ����excel
			else if (flag != null && flag.equals("doExportExcel")) {
				modelAndView = doExportExcel(sqlMap, request, response);
			} // �ֶ�ͳ��
			else if (flag != null && flag.equals("doTongJi")) {
				modelAndView = doTongJi(sqlMap, request, response);
			} // �����ֶ�
			else if (flag != null && flag.equals("doGuanLian")) {
				modelAndView = doGuanLian(sqlMap, request, response);
			} // ����
			else if (flag != null && flag.equals("doShenPi")) {
				modelAndView = doShenPi(sqlMap, request, response);
			} else {
				HashMap<Object, Object> resultMap = new HashMap<Object, Object>();
                String graphURL = drawXYLineChart(sqlMap, request, response);
				resultMap.put("graphURL", graphURL);
				return toFinish("/WEB-ROOT/app/caiwuguanli/xiaoshoutubiaotongji/xiaoshoutubiaotongji.jsp", resultMap, request, response);
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
			String tongjishijianSearch = request.getParameter("tongjishijianSearch");
			if (tongjishijianSearch != null && !tongjishijianSearch.equals("")) {
				where.put("tongjishijianSearch", tongjishijianSearch);
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

			String json = IbatisUtil.queryForPage(sqlMap, request, response, where, "Xiaoshoutubiaotongji.selecteList");
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
			String tongjishijian = request.getParameter("tongjishijian");
			where.put("tongjishijian", tongjishijian);
			String detail = request.getParameter("detail");
			where.put("detail", detail);

			sqlMap.insert("Xiaoshoutubiaotongji.insertObj", where);
			pw.write("{success:true,msg:'���������ɹ���'}");

		} catch (Exception e) {
			pw.write("{success:false,msg:'��������ʧ�ܣ�'}");
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
			// ����ϴ��ļ���Ϊ���ĵ�����
			upload.setHeaderEncoding("gb2312");

			HashMap<String, Object> whereMap = new HashMap<String, Object>();
			whereMap.put("operatorId", SysInfo.getLoginUserId(request, response));

			List fileItems = upload.parseRequest(request);
			Iterator iter = fileItems.iterator();
			int i = 0;
			int j = 0;

			while (iter.hasNext()) {
				FileItem item = (FileItem) iter.next();
				/* ���ļ��� */
				if (item.isFormField()) {

					i++;
				} /* �ļ��� */
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

			sqlMap.insert("Xiaoshoutubiaotongji.insertObj", whereMap);

			/* �������ı��ύ���������� ContentTypeΪtext/html */
			response.setContentType("text/html");
			pw.write("{success:true,msg:'���������ɹ���'}");

		} catch (Exception e) {
			e.printStackTrace();
			try {
				pw.write("{success:false,msg:'" + e.getMessage() + "'}");
			} catch (Exception e1) {
				throw new Exception("��������ʧ��");
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
			String tongjishijian = request.getParameter("tongjishijian");
			where.put("tongjishijian", tongjishijian);
			String id = request.getParameter("id");
			where.put("id", id);
			String detail = request.getParameter("detail");
			where.put("detail", detail);

			sqlMap.update("Xiaoshoutubiaotongji.updateObj", where);
			pw.write("{success:true,msg:'�޸ı��ɹ���'}");

		} catch (Exception e) {
			pw.write("{success:false,msg:'�޸ı�ʧ�ܣ�'}");
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
			// ����ϴ��ļ���Ϊ���ĵ�����
			upload.setHeaderEncoding("gb2312");

			String id = request.getParameter("id");
			String isChangeAttach = request.getParameter("isChangeAttach");
			HashMap<String, Object> whereMap = new HashMap<String, Object>();
			whereMap.put("operatorId", SysInfo.getLoginUserId(request, response));

			List fileItems = upload.parseRequest(request);
			Iterator iter = fileItems.iterator();
			int i = 0;
			int j = 0;

			while (iter.hasNext()) {
				FileItem item = (FileItem) iter.next();
				/* ���ļ��� */
				if (item.isFormField()) {

					i++;
				} /* �ļ��� */
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
			sqlMap.update("Xiaoshoutubiaotongji.updateObj", whereMap);

			/* �������ı��ύ���������� ContentTypeΪtext/html */
			response.setContentType("text/html");
			pw.write("{success:true,msg:'�޸Ĳ����ɹ���'}");

		} catch (Exception e) {
			e.printStackTrace();
			try {
				pw.write("{success:false,msg:'" + e.getMessage() + "'}");
			} catch (Exception e1) {
				throw new Exception("��������ʧ��");
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
			info = (deleteFlag.equals("0")) ? "�ⶳ" : "ɾ��";
			response.setCharacterEncoding("utf-8");
			pw = response.getWriter();
			HashMap<String, Object> where = new HashMap<String, Object>();
			where.put("deleteFlag", deleteFlag);
			where.put("id", id);
			sqlMap.delete("Xiaoshoutubiaotongji.doDeleOrUnDele", where);

			pw.write("{success:true,msg:'" + info + "���ɹ���'}");
			Logger logger = Logger.getLogger(this.getClass().getName());
		} catch (Exception e) {
			pw.write("{success:false,msg:'" + info + "��ʧ�ܣ�'}");
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
			sqlMap.delete("Xiaoshoutubiaotongji.doShenPi", where);

			pw.write("{success:true,msg:'�����ɹ���'}");
			Logger logger = Logger.getLogger(this.getClass().getName());
		} catch (Exception e) {
			pw.write("{success:false,msg:'����ʧ�ܣ�'}");
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
				/* ��ȡͳ���ֶ� */
				String descTabSql = "select column_name as Field , data_type , column_comment as columnComment ," + "SUBSTRING(column_type,INSTR(column_type,'(') + 1,( INSTR(column_type,')') - INSTR(column_type,'(') ) -1  ) as column_type," + "b.tongji "
						+ "from information_schema.columns a,table_tongji b " + "where a.table_schema='" + Global.DATABASE_NAME + "'  and " + "a.table_name='" + m + "' and  " + "a.column_name <>'id' and " + "a.column_name <>'itime' and " + "a.column_name <>'detail' and "
						+ "a.column_name <>'deleteFlag' and " + "a.column_name <>'operatorId' and " + "a.table_name=b.table_name and " + "a.column_name=b.field_name ";
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
								msg = columnComment + "��" + zongshu + "  ";
							} else {
								msg = msg + " ��" + columnComment + "��" + zongshu + "  ";
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
			// ���ݲ�ѯ�����õ������
			HashMap<String, Object> where = new HashMap<String, Object>();
			List<Object> listInfo = sqlMap.queryForList("Xiaoshoutubiaotongji.selecteList", where);

			// ����responseΪ����ģʽ
			Date local = new Date();
			SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
			String finalStr = df.format(local);
			response.reset();
			response.setContentType("application/x-excel;charset=gb2312");
			String filename = new String((new String(finalStr + ".xls")).getBytes("GBK"), "ISO8859-1");
			response.setHeader("Content-Disposition", "attachement; filename=\"" + filename + "\"");
			response.setLocale(Locale.CHINA);
			os = response.getOutputStream();

			// ����������
			wwb = Workbook.createWorkbook(os);
			WritableSheet ws = wwb.createSheet("ͳ��", 0);

			if (listInfo != null && listInfo.size() > 0) {
				int colSize = ((HashMap) (listInfo.get(0))).size();
				for (int i = 0; i < colSize; i++) {
					ws.setColumnView(i + 1, 25);
				}
			}

			// �ػ湤����
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

		// ����
		Label tableHead = new Label(1, 1, "ͳ��Excel", wcfFC);
		ws.addCell(tableHead);
		ws.mergeCells(1, 1, colSize - 1, 1);

		// ��ͷ(�к�,�к� ,���� )
		Label label_0 = new Label(1, 3, "ͳ��ʱ��", wcfFC5);
		ws.addCell(label_0);
		Label label_1 = new Label(2, 3, "Id", wcfFC5);
		ws.addCell(label_1);
		Label label_2 = new Label(3, 3, "����ʱ��", wcfFC5);
		ws.addCell(label_2);
		Label label_3 = new Label(4, 3, "��ע", wcfFC5);
		ws.addCell(label_3);

		// ����
		for (int i = 0; i < al.size(); i++) {
			String tongjishijian = ((HashMap) (al.get(i))).get("tongjishijian").toString();
			label_0 = new Label(1, i + 4, tongjishijian, wcfF4);
			ws.addCell(label_0);
			String id = ((HashMap) (al.get(i))).get("id").toString();
			label_1 = new Label(2, i + 4, id, wcfF4);
			ws.addCell(label_1);
			String itime = ((HashMap) (al.get(i))).get("itime").toString();
			label_2 = new Label(3, i + 4, itime, wcfF4);
			ws.addCell(label_2);
			String detail = ((HashMap) (al.get(i))).get("detail").toString();
			label_3 = new Label(4, i + 4, detail, wcfF4);
			ws.addCell(label_3);
		}

		return ws;
	}
	
	public String drawXYLineChart(SqlMapClient sqlMap,HttpServletRequest request, HttpServletResponse response) {
		String filename = "";

		String graphURL = "";
		PrintWriter pw = null;
		try {
			
			HashMap where = new HashMap();
			List al = IbatisUtil.queryForList(sqlMap, request, response, where, "Xiaoshouxinxi.selecteList1");
			
			JFreeChart chart = null;
			
			DefaultCategoryDataset result = new DefaultCategoryDataset();
			for (int i = 0; i <  al.size(); i++) {
				String pinglungeshu = ((HashMap)(al.get(i))).get("shuliang").toString();
				String xiaoshoushijian = ((HashMap)(al.get(i))).get("caigouriqi").toString();
				result.addValue(Double.parseDouble(pinglungeshu), xiaoshoushijian, "�������");
			}
			
		
			chart = ChartFactory.createBarChart3D("����ͳ��", "ͼ��", "������", result, PlotOrientation.VERTICAL, true, false, false);
			
			TextTitle text = new TextTitle("����ͳ��ͼ");
			text.setPaint(new Color(102, 102, 102));
			chart.setTitle(text);
			
			CategoryPlot plot = chart.getCategoryPlot();
			// �������񱳾���ɫ
			plot.setBackgroundPaint(Color.white);
			// ��������������ɫ
			plot.setDomainGridlinePaint(Color.pink);
			// �������������ɫ
			plot.setRangeGridlinePaint(new Color(221,221,221));
			// ��ʾÿ��������ֵ�����޸ĸ���ֵ����������
			BarRenderer3D renderer = new BarRenderer3D();
			renderer.setBaseOutlinePaint(Color.BLACK);
			renderer.setItemLabelGenerator(new StandardCategoryItemLabelGenerator());
			renderer.setBaseItemLabelsVisible(true);
			// Ĭ�ϵ�������ʾ�������У�ͨ����������ɵ������ֵ���ʾ
			// ע�⣺�˾�ܹؼ������޴˾䣬�����ֵ���ʾ�ᱻ���ǣ���������û����ʾ����������
			// renderer.setBasePositiveItemLabelPosition(new
			// ItemLabelPosition(ItemLabelAnchor.OUTSIDE12,
			// TextAnchor.BASELINE_LEFT));
			// renderer.setItemLabelAnchorOffset(10D);
			// ������ʾ��������
			renderer.setPositiveItemLabelPosition(new ItemLabelPosition(ItemLabelAnchor.OUTSIDE12, TextAnchor.BASELINE_LEFT));
			renderer.setItemLabelAnchorOffset(10d);
			renderer.setItemLabelsVisible(true);

			//renderer.setMaxBarWidth(0.05); // ���Ŀ��
			renderer.setSeriesPaint(0, new Color(0, 191, 255));// ������ɫ
			// �������Ӹ߶�
			renderer.setMinimumBarLength(0.2);
			// �������ӱ߿���ɫ
			//renderer.setBaseOutlinePaint(new Color(221,221,221));
			// �������ӱ߿�ɼ�
			//renderer.setDrawBarOutline(true);
			// ��������͸����
			plot.setForegroundAlpha(0.65f);

			NumberAxis numberaxis = (NumberAxis) plot.getRangeAxis();
			numberaxis.setStandardTickUnits(NumberAxis.createIntegerTickUnits());
			// ���ñ��������
			String fontB = "����";
			// �������������Ƶ�����
			numberaxis.setLabelFont(new Font(fontB, Font.PLAIN, 16));
			// ��������������ʾ����������
			numberaxis.setTickLabelFont(new Font(fontB, Font.PLAIN, 13));
			// ���ú��������Ƶ�����
			CategoryAxis categoryaxis = plot.getDomainAxis();
			categoryaxis.setLabelFont(new Font(fontB, Font.PLAIN, 12));
			// ���ú���������ʾ����ҵ�����������
			categoryaxis.setTickLabelFont(new Font(fontB, Font.PLAIN, 12));

			// ����ÿ��������������ƽ������֮�����
			// renderer.setItemMargin(0.0);
			plot.setRenderer(renderer);
			
			chart.getLegend().setItemFont(new Font("SimSun", 0, 12));
			
			int width = 880;//����ͼƬ�Ŀ�
			int height = 380;//����ͼƬ�ĸ�

			ByteArrayOutputStream bis = new ByteArrayOutputStream();
			pw = new PrintWriter(bis);
			filename = ServletUtilities.saveChartAsPNG(chart, width, height, null, request.getSession(false));
			graphURL = request.getContextPath() + "/servlet/displayChart?filename=" + filename;
			System.out.println("graphURL====" + graphURL);
			return graphURL;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (pw != null) {
				pw.close();
			}
		}
		return null;
	}

}
