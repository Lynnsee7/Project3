package app.goumaiguanli.goumaishangpin;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import app.pub.base.BaseFormController;
import app.pub.database.DBUtils;
import app.pub.database.IbatisUtil;
import app.pub.sysInfo.SysInfo;

import com.ibatis.sqlmap.client.SqlMapClient;

public class Goumaishangpin extends BaseFormController {

    public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
        ModelAndView modelAndView = null;
        SqlMapClient sqlMap = null;
        try {
            sqlMap = DBUtils.getSqlMap(this.getClass());
            sqlMap.startTransaction();
            String flag = request.getParameter("flag");
            System.out.println("flag====" + flag);
            
            if (flag != null && flag.equals("getJsonStore")) {
                modelAndView = doGetJsonStore(sqlMap, request, response);
            } else if (flag != null && flag.equals("addToCart")) {
                modelAndView = addToCart(sqlMap, request, response);
            } else {
                HashMap<Object, Object> resultMap = new HashMap<Object, Object>();
                return toFinish("/WEB-ROOT/app/goumaiguanli/goumaishangpin/goumaishangpin.jsp", resultMap, request, response);
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

    // ��ȡ��Ʒ�б�
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

            where.put("deleteFlagSearch", 0);
            where.put("kucunliangSearch", ">0"); // ֻ��ʾ�п�����Ʒ

            String json = IbatisUtil.queryForPage(sqlMap, request, response, where, "Caigouxinxi.selecteList");
            System.out.println("json====" + json);

            response.setCharacterEncoding("utf-8");
            pw = response.getWriter();
            pw.write(json);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (pw != null) {
                pw.close();
            }
        }
        return null;
    }

    // �����Ʒ�����ﳵ
    public ModelAndView addToCart(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
        PrintWriter pw = null;
        try {
            response.setCharacterEncoding("utf-8");
            pw = response.getWriter();
            HashMap<String, Object> where = new HashMap<String, Object>();
            where.put("operatorId", SysInfo.getLoginUserId(request, response));
            
            String huohao = request.getParameter("huohao");
            String shuliang = request.getParameter("shuliang");
            
            // ��ȡ��Ʒ��Ϣ
            HashMap<String, Object> productWhere = new HashMap<String, Object>();
            productWhere.put("huohao", huohao);
            List<Object> productList = sqlMap.queryForList("Caigouxinxi.selecteList", productWhere);
            
            if (productList != null && productList.size() > 0) {
                HashMap product = (HashMap) productList.get(0);
                
                where.put("huiyuanbianhao", SysInfo.getLoginUserAcct(request, response));
                where.put("huohao", huohao);
                where.put("shangpinmingcheng", product.get("shangpinmingcheng"));
                
                // ��jiageshezhi���ȡ���ۼ۸�
                HashMap<String, Object> priceWhere = new HashMap<String, Object>();
                priceWhere.put("huohao", huohao);
                List<Object> priceList = sqlMap.queryForList("Jiageshezhi.selecteList", priceWhere);
                String danjia = "0";
                if (priceList != null && priceList.size() > 0) {
                    danjia = ((HashMap) priceList.get(0)).get("xiaoshoujiage").toString();
                }
                
                where.put("danjia", danjia);
                where.put("shuliang", shuliang);
                
                // ����С��
                double xiaoji = Double.parseDouble(danjia) * Double.parseDouble(shuliang);
                where.put("xiaoji", String.valueOf(xiaoji));
                
                // ��鹺�ﳵ���Ƿ����д���Ʒ
                HashMap<String, Object> cartWhere = new HashMap<String, Object>();
                cartWhere.put("huiyuanbianhao", SysInfo.getLoginUserAcct(request, response));
                cartWhere.put("huohao", huohao);
                cartWhere.put("deleteFlag", 0);
                
                List<Object> cartList = sqlMap.queryForList("Gouwuche.selecteList", cartWhere);
                if (cartList != null && cartList.size() > 0) {
                    // ���¹��ﳵ��������Ʒ������
                    HashMap cart = (HashMap) cartList.get(0);
                    int oldShuliang = Integer.parseInt(cart.get("shuliang").toString());
                    int newShuliang = oldShuliang + Integer.parseInt(shuliang);
                    double newXiaoji = Double.parseDouble(danjia) * newShuliang;
                    
                    HashMap<String, Object> updateWhere = new HashMap<String, Object>();
                    updateWhere.put("id", cart.get("id"));
                    updateWhere.put("shuliang", String.valueOf(newShuliang));
                    updateWhere.put("xiaoji", String.valueOf(newXiaoji));
                    
                    sqlMap.update("Gouwuche.updateObj", updateWhere);
                } else {
                    // �������Ʒ�����ﳵ
                    sqlMap.insert("Gouwuche.insertObj", where);
                }
                
                pw.write("{success:true,msg:'��Ʒ����ӵ����ﳵ��'}");
            } else {
                pw.write("{success:false,msg:'δ�ҵ���Ʒ��Ϣ��'}");
            }
        } catch (Exception e) {
            pw.write("{success:false,msg:'��ӹ��ﳵʧ�ܣ�" + e.getMessage() + "'}");
            e.printStackTrace();
            throw new Exception();
        } finally {
            if (pw != null) {
                pw.close();
            }
        }
        return null;
    }
}