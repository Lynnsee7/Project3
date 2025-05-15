package app.goumaiguanli.gouwuche;

import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
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

public class Gouwuche extends BaseFormController {

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
            } else if (flag != null && flag.equals("doUpdateSubmit")) {
                modelAndView = doUpdate(sqlMap, request, response);
            } else if (flag != null && flag.equals("doDeleOrUnDele")) {
                modelAndView = doDeleOrUnDele(sqlMap, request, response);
            } else if (flag != null && flag.equals("doJieSuan")) {
                modelAndView = doJieSuan(sqlMap, request, response);
            } else {
                HashMap<Object, Object> resultMap = new HashMap<Object, Object>();
                return toFinish("/WEB-ROOT/app/goumaiguanli/gouwuche/gouwuche.jsp", resultMap, request, response);
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

    // 获取购物车列表
    public ModelAndView doGetJsonStore(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) {
        PrintWriter pw = null;
        try {
            HashMap<String, Object> where = new HashMap<String, Object>();
            
            // 获取当前用户的会员编号
            String huiyuanbianhao = SysInfo.getLoginUserAcct(request, response);
            where.put("huiyuanbianhaoSearch", huiyuanbianhao);
            where.put("deleteFlagSearch", 0);

            String json = IbatisUtil.queryForPage(sqlMap, request, response, where, "Gouwuche.selecteList");
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

    // 更新购物车商品数量
    public ModelAndView doUpdate(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
        PrintWriter pw = null;
        try {
            response.setCharacterEncoding("utf-8");
            pw = response.getWriter();
            HashMap<String, Object> where = new HashMap<String, Object>();
            
            String id = request.getParameter("id");
            String shuliang = request.getParameter("shuliang");
            String danjia = request.getParameter("danjia");
            
            // 计算小计
            double xiaoji = Double.parseDouble(danjia) * Double.parseDouble(shuliang);
            
            where.put("id", id);
            where.put("shuliang", shuliang);
            where.put("xiaoji", String.valueOf(xiaoji));
            
            sqlMap.update("Gouwuche.updateObj", where);
            pw.write("{success:true,msg:'更新购物车成功！'}");
            
        } catch (Exception e) {
            pw.write("{success:false,msg:'更新购物车失败！" + e.getMessage() + "'}");
            e.printStackTrace();
            throw new Exception();
        } finally {
            if (pw != null) {
                pw.close();
            }
        }
        return null;
    }

    // 删除购物车商品
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
            sqlMap.delete("Gouwuche.doDeleOrUnDele", where);

            pw.write("{success:true,msg:'" + info + "购物车商品成功！'}");
        } catch (Exception e) {
            pw.write("{success:false,msg:'" + info + "购物车商品失败！'}");
            e.printStackTrace();
            throw new Exception();
        } finally {
            if (pw != null) {
                pw.close();
            }
        }
        return null;
    }

    // 结算购物车
    public ModelAndView doJieSuan(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
        PrintWriter pw = null;
        try {
            response.setCharacterEncoding("utf-8");
            pw = response.getWriter();
            
            // 获取当前用户的会员编号
            String huiyuanbianhao = SysInfo.getLoginUserAcct(request, response);
            
            // 查询购物车商品
            HashMap<String, Object> cartWhere = new HashMap<String, Object>();
            cartWhere.put("huiyuanbianhaoSearch", huiyuanbianhao);
            cartWhere.put("deleteFlagSearch", 0);
            List<Object> cartList = sqlMap.queryForList("Gouwuche.selecteList", cartWhere);
            
            if (cartList != null && cartList.size() > 0) {
                // 创建订单
                SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
                String dingdandanhao = sdf.format(new Date());
                
                // 计算总金额
                double zongjine = 0;
                for (int i = 0; i < cartList.size(); i++) {
                    HashMap cart = (HashMap) cartList.get(i);
                    zongjine += Double.parseDouble(cart.get("xiaoji").toString());
                }
                
                // 创建订单信息
                HashMap<String, Object> orderWhere = new HashMap<String, Object>();
                orderWhere.put("operatorId", SysInfo.getLoginUserId(request, response));
                orderWhere.put("dingdandanhao", dingdandanhao);
                orderWhere.put("huiyuanbianhao", huiyuanbianhao);
                orderWhere.put("xiadanshijian", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
                orderWhere.put("zongjine", String.valueOf(zongjine));
                orderWhere.put("zhifuzhuangtai", "已支付"); // 假设支付已完成
                orderWhere.put("zhifushijian", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
                
                // 插入订单信息
                sqlMap.insert("Dingdanxinxi.insertObj", orderWhere);
                
                // 插入订单明细
                for (int i = 0; i < cartList.size(); i++) {
                    HashMap cart = (HashMap) cartList.get(i);
                    
                    HashMap<String, Object> detailWhere = new HashMap<String, Object>();
                    detailWhere.put("dingdandanhao", dingdandanhao);
                    detailWhere.put("huohao", cart.get("huohao"));
                    detailWhere.put("shangpinmingcheng", cart.get("shangpinmingcheng"));
                    detailWhere.put("shuliang", cart.get("shuliang"));
                    detailWhere.put("danjia", cart.get("danjia"));
                    detailWhere.put("xiaoji", cart.get("xiaoji"));
                    
                    sqlMap.insert("Dingdanxinxi.insertMingxi", detailWhere);
                    
                    // 更新库存
                    HashMap<String, Object> productWhere = new HashMap<String, Object>();
                    productWhere.put("huohao", cart.get("huohao"));
                    List<Object> productList = sqlMap.queryForList("Caigouxinxi.selecteList", productWhere);
                    
                    if (productList != null && productList.size() > 0) {
                        HashMap product = (HashMap) productList.get(0);
                        float kucunliang = Float.parseFloat(product.get("kucunliang").toString());
                        float shuliang = Float.parseFloat(cart.get("shuliang").toString());
                        float newKucunliang = kucunliang - shuliang;
                        
                        HashMap<String, Object> updateWhere = new HashMap<String, Object>();
                        updateWhere.put("id", product.get("id"));
                        updateWhere.put("kucunliang", String.valueOf(newKucunliang));
                        
                        sqlMap.update("Caigouxinxi.updateKucun", updateWhere);
                    }
                    
                    // 删除购物车商品
                    HashMap<String, Object> deleteWhere = new HashMap<String, Object>();
                    deleteWhere.put("deleteFlag", 1);
                    deleteWhere.put("id", cart.get("id"));
                    sqlMap.delete("Gouwuche.doDeleOrUnDele", deleteWhere);
                }
                
                pw.write("{success:true,msg:'订单结算成功！订单号：" + dingdandanhao + "'}");
            } else {
                pw.write("{success:false,msg:'购物车中没有商品！'}");
            }
            
        } catch (Exception e) {
            pw.write("{success:false,msg:'订单结算失败！" + e.getMessage() + "'}");
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