package dao;

import bean.lanmuguanliBean;
import bean.lanmuguanliBeanExample;
import java.util.List;

public interface lanmuguanliBeanDAO {
    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table lanmuguanli
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int countByExample(lanmuguanliBeanExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table lanmuguanli
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int deleteByExample(lanmuguanliBeanExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table lanmuguanli
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table lanmuguanli
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    void insert(lanmuguanliBean record);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table lanmuguanli
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    void insertSelective(lanmuguanliBean record);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table lanmuguanli
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    List<lanmuguanliBean> selectByExample(lanmuguanliBeanExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table lanmuguanli
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    lanmuguanliBean selectByPrimaryKey(Integer id);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table lanmuguanli
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int updateByExampleSelective(lanmuguanliBean record, lanmuguanliBeanExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table lanmuguanli
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int updateByExample(lanmuguanliBean record, lanmuguanliBeanExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table lanmuguanli
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int updateByPrimaryKeySelective(lanmuguanliBean record);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table lanmuguanli
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int updateByPrimaryKey(lanmuguanliBean record);
}