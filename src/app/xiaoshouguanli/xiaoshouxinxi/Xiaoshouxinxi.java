package app.xiaoshouguanli.xiaoshouxinxi;

import java.io.File;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;

import app.pub.base.BaseFormController;
import app.pub.conf.InitSystemConfig;
import app.pub.database.DBUtils;
import app.pub.database.IbatisUtil;
import app.pub.global.Global;
import app.pub.json.JsonUtil;
import app.pub.sysInfo.SysInfo;

import com.ibatis.sqlmap.client.SqlMapClient;

public class Xiaoshouxinxi extends BaseFormController {

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
			} else if (flag != null && flag.equals("chaXunDanJia")) {
				modelAndView = chaXunDanJia(sqlMap, request, response);
			} else if (flag != null && flag.equals("getDetailJsonStore")) {
				modelAndView = getDetailJsonStore(sqlMap, request, response);
			} else {
				HashMap<Object, Object> resultMap = new HashMap<Object, Object>();
				return toFinish("/WEB-ROOT/app/xiaoshouguanli/xiaoshouxinxi/xiaoshouxinxi.jsp", resultMap, request, response);
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
			String xiaoshoudanhaoSearch = request.getParameter("xiaoshoudanhaoSearch");
			if (xiaoshoudanhaoSearch != null && !xiaoshoudanhaoSearch.equals("")) {
				where.put("xiaoshoudanhaoSearch", xiaoshoudanhaoSearch);
			}
			String jingshourenSearch = request.getParameter("jingshourenSearch");
			if (jingshourenSearch != null && !jingshourenSearch.equals("")) {
				where.put("jingshourenSearch", jingshourenSearch);
			}
			String xiaofeijineSearch = request.getParameter("xiaofeijineSearch");
			if (xiaofeijineSearch != null && !xiaofeijineSearch.equals("")) {
				where.put("xiaofeijineSearch", xiaofeijineSearch);
			}
			String huiyuanbianhaoSearch = request.getParameter("huiyuanbianhaoSearch");
			if (huiyuanbianhaoSearch != null && !huiyuanbianhaoSearch.equals("")) {
				where.put("huiyuanbianhaoSearch", huiyuanbianhaoSearch);
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

			String json = IbatisUtil.queryForPage(sqlMap, request, response, where, "Xiaoshouxinxi.selecteList");
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

	public ModelAndView getDetailJsonStore(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) {
		PrintWriter pw = null;
		try {
			HashMap<String, Object> where = new HashMap<String, Object>();
			String xiaoshoudanhao = request.getParameter("xiaoshoudanhao");
			if (xiaoshoudanhao != null && !xiaoshoudanhao.equals("")) {
				where.put("xiaoshoudanhao", xiaoshoudanhao);
			}
			String json = IbatisUtil.queryForPage(sqlMap, request, response, where, "Xiaoshouxinxi.selecteListDetail");
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
			String xiaoshoudanhao = request.getParameter("xiaoshoudanhao");
			where.put("xiaoshoudanhao", xiaoshoudanhao);
			String jingshouren = SysInfo.getLoginUserAcct(request, response);
			where.put("jingshouren", jingshouren);
			String xiaofeijine = request.getParameter("xiaofeijineHi");
			where.put("xiaofeijine", xiaofeijine);
			String huiyuanbianhao = request.getParameter("huiyuanbianhao");
			where.put("huiyuanbianhao", huiyuanbianhao);
			String detail = request.getParameter("detail");
			where.put("detail", detail);

			String json = request.getParameter("json");
			ArrayList<Map<String, Object>> jsonAl = JsonUtil.formatJson2Map(json);
			if (jsonAl != null && jsonAl.size() > 0) {
				for (int i = 0; i < jsonAl.size(); i++) {
					HashMap<String, Object> innerWhere = new HashMap<String, Object>();
					innerWhere.putAll(jsonAl.get(i));
					innerWhere.put("xiaoshoudanhao", xiaoshoudanhao);

					String huohao = ((Map<String, Object>) (jsonAl.get(i))).get("huohao").toString();
					String shuliang = ((Map<String, Object>) (jsonAl.get(i))).get("shuliang").toString();

					// �õ���ǰ�û��ŵĿ����
					HashMap<String, Object> innerWhere1 = new HashMap<String, Object>();
					innerWhere1.put("huohaoSearch", huohao);
					List list = sqlMap.queryForList("Caigouxinxi.selecteList", innerWhere1);
					float kucun = 0;
					if (list != null && list.size() > 0) {
						kucun = Float.parseFloat(((HashMap) (list.get(0))).get("kucunliang").toString());
					}

					float shuliang_xiugaihou = Float.parseFloat(shuliang);

					if (kucun - shuliang_xiugaihou < 0) {
						throw new Exception("����Ϊ��" + huohao + "�Ŀ�������㣡");
					} else {
						HashMap<String, Object> innerWhere3 = new HashMap<String, Object>();
						innerWhere3.put("shuliang", kucun - shuliang_xiugaihou + "");
						innerWhere3.put("huohao", huohao);
						sqlMap.update("Xiaoshouxinxi.updateKuCun", innerWhere3);
					}

					sqlMap.insert("Xiaoshouxinxi.insertObjDetail", innerWhere);
					
					where.put("huiyuanbianhao", huiyuanbianhao);
					where.put("jifen", Float.parseFloat(xiaofeijine));
					
					sqlMap.update("Huiyuanjifen.updateObj2", where);
					
				}
			}

			sqlMap.insert("Xiaoshouxinxi.insertObj", where);

			pw.write("{success:true,msg:'���������ɹ���'}");

		} catch (Exception e) {
			e.printStackTrace();
			pw.write("{'failure':true,'msg':'" + e.getMessage() + "'}");
			throw new Exception(e.getMessage());
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

			sqlMap.insert("Xiaoshouxinxi.insertObj", whereMap);

			/* �������ı��ύ���������� ContentTypeΪtext/html */
			response.setContentType("text/html");
			pw.write("{success:true,msg:'���������ɹ���'}");

		} catch (Exception e) {
			e.printStackTrace();
			pw.write("{success:false,msg:'" + e.getMessage() + "'}");
			throw new Exception(e.getMessage());
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
			String xiaoshoudanhao = request.getParameter("xiaoshoudanhao");
			where.put("xiaoshoudanhao", xiaoshoudanhao);
			String jingshouren = request.getParameter("jingshouren");
			where.put("jingshouren", jingshouren);
			String xiaofeijine = request.getParameter("xiaofeijineHi");
			where.put("xiaofeijine", xiaofeijine);
			String huiyuanbianhao = request.getParameter("huiyuanbianhao");
			where.put("huiyuanbianhao", huiyuanbianhao);
			String id = request.getParameter("id");
			where.put("id", id);
			String detail = request.getParameter("detail");
			where.put("detail", detail);

			sqlMap.update("Xiaoshouxinxi.updateObj", where);

			String json = request.getParameter("json");
			ArrayList<Map<String, Object>> jsonAl = JsonUtil.formatJson2Map(json);
			if (jsonAl != null && jsonAl.size() > 0) {
				for (int i = 0; i < jsonAl.size(); i++) {
					HashMap<String, Object> innerWhere = new HashMap<String, Object>();
					innerWhere.putAll(jsonAl.get(i));
					innerWhere.put("xiaoshoudanhao", xiaoshoudanhao);

					String mingxiid = ((Map<String, Object>) (jsonAl.get(i))).get("id").toString();
					String huohao = ((Map<String, Object>) (jsonAl.get(i))).get("huohao").toString();
					String shuliang = ((Map<String, Object>) (jsonAl.get(i))).get("shuliang").toString();

					// �õ���ǰ�û��ŵĿ����
					HashMap<String, Object> innerWhere1 = new HashMap<String, Object>();
					innerWhere1.put("huohaoSearch", huohao);
					List list = sqlMap.queryForList("Caigouxinxi.selecteList", innerWhere1);
					float kucun = 0;
					if (list != null && list.size() > 0) {
						kucun = Float.parseFloat(((HashMap) (list.get(0))).get("kucunliang").toString());
					}

					// �õ�����ϸ�޸�ǰ������
					HashMap<String, Object> innerWhere2 = new HashMap<String, Object>();
					innerWhere2.put("id", mingxiid);
					float shuliang_xiugaiqian = 0;
					list = sqlMap.queryForList("Xiaoshouxinxi.selecteListDetail", innerWhere2);
					if (list != null && list.size() > 0) {
						shuliang_xiugaiqian = Float.parseFloat(((HashMap) (list.get(0))).get("shuliang").toString());
					}

					// �жϿ����
					float shuliang_xiugaihou = Float.parseFloat(shuliang);

					if (kucun < (shuliang_xiugaihou - shuliang_xiugaiqian)) {
						throw new Exception("����Ϊ��" + huohao + "�Ŀ�������㣡");
					} else {
						HashMap<String, Object> innerWhere3 = new HashMap<String, Object>();
						innerWhere3.put("shuliang", kucun - (shuliang_xiugaihou - shuliang_xiugaiqian) + "");
						innerWhere3.put("huohao", huohao);
						sqlMap.update("Xiaoshouxinxi.updateKuCun", innerWhere3);
					}

					sqlMap.insert("Xiaoshouxinxi.insertObjDetail", innerWhere);

					sqlMap.delete("Xiaoshouxinxi.shanchumingxi", innerWhere2);
				}
			}

			pw.write("{success:true,msg:'�޸ı��ɹ���'}");

		} catch (Exception e) {
			e.printStackTrace();
			pw.write("{'failure':true,'msg':'" + e.getMessage() + "'}");
			throw new Exception(e.getMessage());
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
			sqlMap.update("Xiaoshouxinxi.updateObj", whereMap);

			/* �������ı��ύ���������� ContentTypeΪtext/html */
			response.setContentType("text/html");
			pw.write("{success:true,msg:'�޸Ĳ����ɹ���'}");

		} catch (Exception e) {
			e.printStackTrace();
			pw.write("{success:false,msg:'" + e.getMessage() + "'}");
			throw new Exception(e.getMessage());
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
			sqlMap.delete("Xiaoshouxinxi.doDeleOrUnDele", where);

			// �޸Ŀ����
			HashMap<String, Object> innerWhere1 = new HashMap<String, Object>();
			innerWhere1.put("id", id);
			List list = sqlMap.queryForList("Xiaoshouxinxi.selecteMingXi", innerWhere1);
			if (list != null && list.size() > 0) {
				for (int i = 0; i < list.size(); i++) {
					String huohao = ((HashMap) (list.get(i))).get("huohao").toString();
					String shuliang = ((HashMap) (list.get(i))).get("shuliang").toString();
					HashMap<String, Object> innerWhere = new HashMap<String, Object>();
					innerWhere.put("shuliang", Float.parseFloat(shuliang));
					innerWhere.put("huohao", huohao);
					sqlMap.update("Xiaoshouxinxi.updateKuCun1", innerWhere);
				}
			}

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
			sqlMap.delete("Xiaoshouxinxi.doShenPi", where);

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

	public ModelAndView chaXunDanJia(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		PrintWriter pw = null;
		String info = "";
		try {
			String huohao = request.getParameter("huohao");
			response.setCharacterEncoding("utf-8");
			pw = response.getWriter();
			HashMap<String, Object> where = new HashMap<String, Object>();
			where.put("huohaoSearch", huohao);
			List list = sqlMap.queryForList("Jiageshezhi.selecteList", where);
			String danJia = "0";
			if (list != null && list.size() > 0) {
				danJia = ((HashMap) (list.get(0))).get("xiaoshoujiage").toString();
			}
			pw.write("{success:true,msg:'" + danJia + "'}");
			Logger logger = Logger.getLogger(this.getClass().getName());
		} catch (Exception e) {
			pw.write("{success:false,msg:'0'}");
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
			List<Object> listInfo = sqlMap.queryForList("Xiaoshouxinxi.selecteList", where);

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
		Label label_0 = new Label(1, 3, "���۵���", wcfFC5);
		ws.addCell(label_0);
		Label label_1 = new Label(2, 3, "������", wcfFC5);
		ws.addCell(label_1);
		Label label_2 = new Label(3, 3, "���ѽ��", wcfFC5);
		ws.addCell(label_2);
		Label label_3 = new Label(4, 3, "��Ա���", wcfFC5);
		ws.addCell(label_3);
		Label label_4 = new Label(5, 3, "Id", wcfFC5);
		ws.addCell(label_4);
		Label label_5 = new Label(6, 3, "����ʱ��", wcfFC5);
		ws.addCell(label_5);
		Label label_6 = new Label(7, 3, "��ע", wcfFC5);
		ws.addCell(label_6);

		// ����
		for (int i = 0; i < al.size(); i++) {
			String xiaoshoudanhao = ((HashMap) (al.get(i))).get("xiaoshoudanhao").toString();
			label_0 = new Label(1, i + 4, xiaoshoudanhao, wcfF4);
			ws.addCell(label_0);
			String jingshouren = ((HashMap) (al.get(i))).get("jingshouren").toString();
			label_1 = new Label(2, i + 4, jingshouren, wcfF4);
			ws.addCell(label_1);
			String xiaofeijine = ((HashMap) (al.get(i))).get("xiaofeijine").toString();
			label_2 = new Label(3, i + 4, xiaofeijine, wcfF4);
			ws.addCell(label_2);
			String huiyuanbianhao = ((HashMap) (al.get(i))).get("huiyuanbianhao").toString();
			label_3 = new Label(4, i + 4, huiyuanbianhao, wcfF4);
			ws.addCell(label_3);
			String id = ((HashMap) (al.get(i))).get("id").toString();
			label_4 = new Label(5, i + 4, id, wcfF4);
			ws.addCell(label_4);
			String itime = ((HashMap) (al.get(i))).get("itime").toString();
			label_5 = new Label(6, i + 4, itime, wcfF4);
			ws.addCell(label_5);
			String detail = ((HashMap) (al.get(i))).get("detail").toString();
			label_6 = new Label(7, i + 4, detail, wcfF4);
			ws.addCell(label_6);
		}

		return ws;
	}

}
