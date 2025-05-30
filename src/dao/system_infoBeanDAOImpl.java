package dao;

import bean.system_infoBean;
import bean.system_infoBeanExample;
import java.util.List;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

public class system_infoBeanDAOImpl extends SqlMapClientDaoSupport implements system_infoBeanDAO {

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table system_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    public system_infoBeanDAOImpl() {
        super();
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table system_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    public int countByExample(system_infoBeanExample example) {
        Integer count = (Integer)  getSqlMapClientTemplate().queryForObject("system_info.ibatorgenerated_countByExample", example);
        return count;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table system_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    public int deleteByExample(system_infoBeanExample example) {
        int rows = getSqlMapClientTemplate().delete("system_info.ibatorgenerated_deleteByExample", example);
        return rows;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table system_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    public int deleteByPrimaryKey(Integer id) {
        system_infoBean key = new system_infoBean();
        key.setId(id);
        int rows = getSqlMapClientTemplate().delete("system_info.ibatorgenerated_deleteByPrimaryKey", key);
        return rows;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table system_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    public void insert(system_infoBean record) {
        getSqlMapClientTemplate().insert("system_info.ibatorgenerated_insert", record);
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table system_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    public void insertSelective(system_infoBean record) {
        getSqlMapClientTemplate().insert("system_info.ibatorgenerated_insertSelective", record);
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table system_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    @SuppressWarnings("unchecked")
    public List<system_infoBean> selectByExample(system_infoBeanExample example) {
        List<system_infoBean> list = getSqlMapClientTemplate().queryForList("system_info.ibatorgenerated_selectByExample", example);
        return list;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table system_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    public system_infoBean selectByPrimaryKey(Integer id) {
        system_infoBean key = new system_infoBean();
        key.setId(id);
        system_infoBean record = (system_infoBean) getSqlMapClientTemplate().queryForObject("system_info.ibatorgenerated_selectByPrimaryKey", key);
        return record;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table system_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    public int updateByExampleSelective(system_infoBean record, system_infoBeanExample example) {
        UpdateByExampleParms parms = new UpdateByExampleParms(record, example);
        int rows = getSqlMapClientTemplate().update("system_info.ibatorgenerated_updateByExampleSelective", parms);
        return rows;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table system_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    public int updateByExample(system_infoBean record, system_infoBeanExample example) {
        UpdateByExampleParms parms = new UpdateByExampleParms(record, example);
        int rows = getSqlMapClientTemplate().update("system_info.ibatorgenerated_updateByExample", parms);
        return rows;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table system_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    public int updateByPrimaryKeySelective(system_infoBean record) {
        int rows = getSqlMapClientTemplate().update("system_info.ibatorgenerated_updateByPrimaryKeySelective", record);
        return rows;
    }

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table system_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    public int updateByPrimaryKey(system_infoBean record) {
        int rows = getSqlMapClientTemplate().update("system_info.ibatorgenerated_updateByPrimaryKey", record);
        return rows;
    }

    /**
     * This class was generated by Apache iBATIS ibator.
     * This class corresponds to the database table system_info
     *
     * @ibatorgenerated Wed Apr 04 09:32:08 CST 2018
     */
    private static class UpdateByExampleParms extends system_infoBeanExample {
        private Object record;

        public UpdateByExampleParms(Object record, system_infoBeanExample example) {
            super(example);
            this.record = record;
        }

        public Object getRecord() {
            return record;
        }
    }
}