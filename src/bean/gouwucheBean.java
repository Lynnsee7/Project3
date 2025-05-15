package bean;

public class gouwucheBean {
    /**
     * ID
     */
    private Integer id;

    /**
     * 会员编号
     */
    private String huiyuanbianhao;

    /**
     * 货号
     */
    private String huohao;

    /**
     * 商品名称
     */
    private String shangpinmingcheng;

    /**
     * 单价
     */
    private String danjia;

    /**
     * 数量
     */
    private String shuliang;

    /**
     * 小计
     */
    private String xiaoji;

    /**
     * 操作人ID
     */
    private String operatorid;

    /**
     * 操作时间
     */
    private String itime;

    /**
     * 备注
     */
    private String detail;

    /**
     * 删除标识（0：正常；1：删除）
     */
    private Integer deleteflag;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getHuiyuanbianhao() {
        return huiyuanbianhao;
    }

    public void setHuiyuanbianhao(String huiyuanbianhao) {
        this.huiyuanbianhao = huiyuanbianhao;
    }

    public String getHuohao() {
        return huohao;
    }

    public void setHuohao(String huohao) {
        this.huohao = huohao;
    }

    public String getShangpinmingcheng() {
        return shangpinmingcheng;
    }

    public void setShangpinmingcheng(String shangpinmingcheng) {
        this.shangpinmingcheng = shangpinmingcheng;
    }

    public String getDanjia() {
        return danjia;
    }

    public void setDanjia(String danjia) {
        this.danjia = danjia;
    }

    public String getShuliang() {
        return shuliang;
    }

    public void setShuliang(String shuliang) {
        this.shuliang = shuliang;
    }

    public String getXiaoji() {
        return xiaoji;
    }

    public void setXiaoji(String xiaoji) {
        this.xiaoji = xiaoji;
    }

    public String getOperatorid() {
        return operatorid;
    }

    public void setOperatorid(String operatorid) {
        this.operatorid = operatorid;
    }

    public String getItime() {
        return itime;
    }

    public void setItime(String itime) {
        this.itime = itime;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Integer getDeleteflag() {
        return deleteflag;
    }

    public void setDeleteflag(Integer deleteflag) {
        this.deleteflag = deleteflag;
    }
}