package dao;

import bean.user_infoBean;
import bean.user_infoBeanExample;
import java.util.List;

public interface user_infoBeanDAO {
    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table user_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int countByExample(user_infoBeanExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table user_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int deleteByExample(user_infoBeanExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table user_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table user_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    void insert(user_infoBean record);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table user_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    void insertSelective(user_infoBean record);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table user_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    List<user_infoBean> selectByExample(user_infoBeanExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table user_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    user_infoBean selectByPrimaryKey(Integer id);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table user_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int updateByExampleSelective(user_infoBean record, user_infoBeanExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table user_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int updateByExample(user_infoBean record, user_infoBeanExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table user_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int updateByPrimaryKeySelective(user_infoBean record);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table user_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    int updateByPrimaryKey(user_infoBean record);
}