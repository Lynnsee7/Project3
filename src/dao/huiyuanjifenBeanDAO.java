package dao;

import bean.huiyuanjifenBean;
import bean.huiyuanjifenBeanExample;
import java.util.List;

public interface huiyuanjifenBeanDAO {
    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table huiyuanjifen
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int countByExample(huiyuanjifenBeanExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table huiyuanjifen
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int deleteByExample(huiyuanjifenBeanExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table huiyuanjifen
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table huiyuanjifen
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    void insert(huiyuanjifenBean record);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table huiyuanjifen
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    void insertSelective(huiyuanjifenBean record);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table huiyuanjifen
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    List<huiyuanjifenBean> selectByExample(huiyuanjifenBeanExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table huiyuanjifen
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    huiyuanjifenBean selectByPrimaryKey(Integer id);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table huiyuanjifen
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int updateByExampleSelective(huiyuanjifenBean record, huiyuanjifenBeanExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table huiyuanjifen
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int updateByExample(huiyuanjifenBean record, huiyuanjifenBeanExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table huiyuanjifen
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int updateByPrimaryKeySelective(huiyuanjifenBean record);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table huiyuanjifen
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int updateByPrimaryKey(huiyuanjifenBean record);
}