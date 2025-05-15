/*
Navicat MySQL Data Transfer

Source Server         : 1
Source Server Version : 50511
Source Host           : localhost:3307
Source Database       : chaoshiguanli

Target Server Type    : MYSQL
Target Server Version : 50511
File Encoding         : 65001

Date: 2025-05-15 08:25:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `baosunxinxi`
-- ----------------------------
DROP TABLE IF EXISTS `baosunxinxi`;
CREATE TABLE `baosunxinxi` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `huohao` varchar(50) DEFAULT NULL COMMENT '货号',
  `baosunriqi` varchar(50) DEFAULT NULL COMMENT '报损日期',
  `baosunshuoming` varchar(200) DEFAULT NULL COMMENT '报损说明',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of baosunxinxi
-- ----------------------------
INSERT INTO `baosunxinxi` VALUES ('1', 'SP-00001', '2025-03-23', '已过期', '1', '2025-03-23 14:01:47 ', '', '0');

-- ----------------------------
-- Table structure for `caigoutubiaotongji`
-- ----------------------------
DROP TABLE IF EXISTS `caigoutubiaotongji`;
CREATE TABLE `caigoutubiaotongji` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `tongjishijian` varchar(50) DEFAULT NULL COMMENT '统计时间',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of caigoutubiaotongji
-- ----------------------------

-- ----------------------------
-- Table structure for `caigouxinxi`
-- ----------------------------
DROP TABLE IF EXISTS `caigouxinxi`;
CREATE TABLE `caigouxinxi` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `shangpinmingcheng` varchar(50) DEFAULT NULL COMMENT '商品名称',
  `huohao` varchar(50) DEFAULT NULL COMMENT '货号',
  `shangpinleixing` varchar(50) DEFAULT NULL COMMENT '商品类型',
  `gongyingshang` varchar(50) DEFAULT NULL COMMENT '供应商',
  `chengyunshang` varchar(50) DEFAULT NULL COMMENT '承运商',
  `danjia` varchar(50) DEFAULT NULL COMMENT '采购单价',
  `caigouriqi` varchar(50) DEFAULT NULL COMMENT '采购日期',
  `caigouren` varchar(50) DEFAULT NULL COMMENT '采购人',
  `shuliang` varchar(50) DEFAULT NULL COMMENT '采购量',
  `kucunliang` varchar(50) DEFAULT NULL COMMENT '库存量',
  `zhuangtai` varchar(50) DEFAULT NULL COMMENT '审批状态',
  `fuJian` varchar(200) DEFAULT NULL COMMENT '附件路径',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of caigouxinxi
-- ----------------------------
INSERT INTO `caigouxinxi` VALUES ('1', '冰红茶', 'SP-00001', '食品', '统一集团', '蚂蚁商运', '2.8', '2025-02-23', '王经理', '1000', '650', '审批通过', 'E:/java/IDE/MyEclipse/10.0/workspace_stef/ChaoShiGuanLi/UploadFile/i.txt', '1', '2025-02-23 13:09:38 ', '《采购单》，见附件 。 ', '0');
INSERT INTO `caigouxinxi` VALUES ('2', '蓝月亮洗衣液', 'RH-00001', '日化用品', '蓝月亮实业集团', '蚂蚁商运', '15', '2025-03-23', '王经理', '200', '200', '审批通过', '', '1', '2025-03-23 13:09:45 ', '', '0');
INSERT INTO `caigouxinxi` VALUES ('3', '康师傅方便面', 'SP-00002', '食品', '统一集团', '蚂蚁商运', '2.5', '2025-03-23', '王经理', '200', '200.0', '审批通过', '', '1', '2025-03-30 18:18:08 ', '', '0');
INSERT INTO `caigouxinxi` VALUES ('4', '黑人牙膏', 'DG-00002', '日化用品', '统一集团', '顺丰物流', '10.5', '2025-03-23', '王', '1000', '990.0', '审批通过', '', '1', '2025-03-23 20:12:49 ', '', '0');
INSERT INTO `caigouxinxi` VALUES ('5', '苹果', 'efsrdg', '生鲜蔬果', '统一集团', '顺丰物流', '100', '2023-12-02', 'admin', '200', '200', '未审批', '', '1', '2025-03-30 20:00:19 ', '', '0');
INSERT INTO `caigouxinxi` VALUES ('6', 'DSF', 'SFFS', '生鲜蔬果', '统一集团', '顺丰物流', '10', '2002-02-11', 'admin', '1000', '1000', '未审批', '', '1', '2025-04-01 14:00:49 ', '', '1');
INSERT INTO `caigouxinxi` VALUES ('7', '人员', '852', '日化用品', '统一集团', '顺丰物流', '524', '2002-03-31', '784', '85', '85', '未审批', '', '1', '2025-04-19 07:44:15 ', '', '1');
INSERT INTO `caigouxinxi` VALUES ('8', '香蕉', 'sferdg', '生鲜蔬果', '统一集团', '蚂蚁商运', '5', '2025-04-10', 'admin', '99', '99', '未审批', '', '1', '2025-04-19 15:31:05 ', '', '1');
INSERT INTO `caigouxinxi` VALUES ('9', 'fghj', '86532', '生鲜蔬果', '统一集团', '顺丰物流', '10', '2025-05-10', '52', '100', '100', '未审批', '', '1', '2025-05-13 20:28:12 ', '', '0');

-- ----------------------------
-- Table structure for `cangkuxinxi`
-- ----------------------------
DROP TABLE IF EXISTS `cangkuxinxi`;
CREATE TABLE `cangkuxinxi` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `cangkumingcheng` varchar(50) DEFAULT NULL COMMENT '仓库名称',
  `xiujianshijian` varchar(50) DEFAULT NULL COMMENT '修建时间',
  `rongji` varchar(50) DEFAULT NULL COMMENT '容积',
  `shiyonglv` varchar(50) DEFAULT NULL COMMENT '使用率',
  `suozaiweizhi` varchar(50) DEFAULT NULL COMMENT '所在位置',
  `xiangguanpeizhi` varchar(50) DEFAULT NULL COMMENT '相关配置',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cangkuxinxi
-- ----------------------------
INSERT INTO `cangkuxinxi` VALUES ('1', '仓库一', '2025-03-23', '1000', '85', '超市第一库房', '空调', '1', '2025-03-23 10:03:20 ', '', '0');

-- ----------------------------
-- Table structure for `chengyunshangxinxi`
-- ----------------------------
DROP TABLE IF EXISTS `chengyunshangxinxi`;
CREATE TABLE `chengyunshangxinxi` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `chengyunshangmingcheng` varchar(50) DEFAULT NULL COMMENT '承运商名称',
  `chengyunleixing` varchar(50) DEFAULT NULL COMMENT '承运类型',
  `chexing` varchar(50) DEFAULT NULL COMMENT '车型',
  `dizhi` varchar(50) DEFAULT NULL COMMENT '地址',
  `lianxiren` varchar(50) DEFAULT NULL COMMENT '联系人',
  `lianxidianhua` varchar(50) DEFAULT NULL COMMENT '联系电话',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chengyunshangxinxi
-- ----------------------------
INSERT INTO `chengyunshangxinxi` VALUES ('1', '蚂蚁商运', '批量', '大型', '上海浦东', '赵先生', '15678986656', '1', '2025-03-23 09:26:47 ', '', '0');
INSERT INTO `chengyunshangxinxi` VALUES ('2', '顺丰物流', '批量', '卡车，集装箱', '北京', '赵经理', '13434892312', '1', '2025-03-23 20:07:24 ', '', '0');

-- ----------------------------
-- Table structure for `churukuxinxi`
-- ----------------------------
DROP TABLE IF EXISTS `churukuxinxi`;
CREATE TABLE `churukuxinxi` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `huohao` varchar(50) DEFAULT NULL COMMENT '货号',
  `rukushijian` varchar(50) DEFAULT NULL COMMENT '入库时间',
  `baocuncangku` varchar(50) DEFAULT NULL COMMENT '保存仓库',
  `chukushijian` varchar(50) DEFAULT NULL COMMENT '出库时间',
  `baocunxiangqing` varchar(200) DEFAULT NULL COMMENT '保存详情',
  `shengchanriqi` varchar(50) DEFAULT NULL COMMENT '生产日期',
  `baozhiqi` varchar(50) DEFAULT NULL COMMENT '保质期',
  `fuJian` varchar(200) DEFAULT NULL COMMENT '附件路径',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of churukuxinxi
-- ----------------------------

-- ----------------------------
-- Table structure for `dingdanxinxi`
-- ----------------------------
DROP TABLE IF EXISTS `dingdanxinxi`;
CREATE TABLE `dingdanxinxi` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `dingdandanhao` varchar(50) DEFAULT NULL COMMENT '订单单号',
  `yonghuming` varchar(50) DEFAULT NULL COMMENT '用户名',
  `xiaofeizonge` decimal(10,2) DEFAULT NULL COMMENT '消费总额',
  `zhifufangshi` varchar(50) DEFAULT NULL COMMENT '支付方式',
  `zhuangtai` varchar(50) DEFAULT NULL COMMENT '订单状态',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dingdanxinxi
-- ----------------------------

-- ----------------------------
-- Table structure for `dingdanxinxi_mingxi`
-- ----------------------------
DROP TABLE IF EXISTS `dingdanxinxi_mingxi`;
CREATE TABLE `dingdanxinxi_mingxi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dingdandanhao` varchar(50) DEFAULT NULL,
  `huohao` varchar(50) DEFAULT NULL,
  `shangpinmingcheng` varchar(50) DEFAULT NULL,
  `shuliang` varchar(50) DEFAULT NULL,
  `danjia` varchar(50) DEFAULT NULL,
  `xiaoji` varchar(50) DEFAULT NULL,
  `beizhu` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dingdanxinxi_mingxi
-- ----------------------------

-- ----------------------------
-- Table structure for `fenleishezhi`
-- ----------------------------
DROP TABLE IF EXISTS `fenleishezhi`;
CREATE TABLE `fenleishezhi` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `fenleimingchen` varchar(50) DEFAULT NULL COMMENT '分类名称',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  `attr1` varchar(100) DEFAULT NULL COMMENT '扩展字段1',
  `attr2` varchar(100) DEFAULT NULL COMMENT '扩展字段2',
  `attr3` varchar(100) DEFAULT NULL COMMENT '扩展字段3',
  `attr4` varchar(100) DEFAULT NULL COMMENT '扩展字段4',
  `attr5` varchar(100) DEFAULT NULL COMMENT '扩展字段5',
  `erjiguanlianzd` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fenleishezhi
-- ----------------------------
INSERT INTO `fenleishezhi` VALUES ('1', '新闻资讯', '1', '2025-03-20 10:53:19', '', '0', null, null, null, null, null, '');
INSERT INTO `fenleishezhi` VALUES ('2', '购物须知', '1', '2025-03-20 10:53:19', '', '0', null, null, null, null, null, '');
INSERT INTO `fenleishezhi` VALUES ('3', '最新好货', '1', '2025-03-20 10:53:19', '', '0', null, null, null, null, null, '');
INSERT INTO `fenleishezhi` VALUES ('4', '通知公告', '1', '2025-03-20 10:53:19', '', '0', null, null, null, null, null, '');

-- ----------------------------
-- Table structure for `gongyingshangxinxi`
-- ----------------------------
DROP TABLE IF EXISTS `gongyingshangxinxi`;
CREATE TABLE `gongyingshangxinxi` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `gongyingshangmingcheng` varchar(50) DEFAULT NULL COMMENT '供应商名称',
  `dizhi` varchar(50) DEFAULT NULL COMMENT '地址',
  `lianxiren` varchar(50) DEFAULT NULL COMMENT '联系人',
  `gonghuozhouqi` varchar(50) DEFAULT NULL COMMENT '供货周期',
  `lianxidianhua` varchar(50) DEFAULT NULL COMMENT '联系电话',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gongyingshangxinxi
-- ----------------------------
INSERT INTO `gongyingshangxinxi` VALUES ('1', '统一集团', '台北市', '王晓旭', '食品', '13099887888', '1', '2025-03-23 22:10:52 ', '', '0');

-- ----------------------------
-- Table structure for `gouwuche`
-- ----------------------------
DROP TABLE IF EXISTS `gouwuche`;
CREATE TABLE `gouwuche` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `yonghuming` varchar(50) DEFAULT NULL COMMENT '用户名',
  `huohao` varchar(50) DEFAULT NULL COMMENT '货号',
  `shangpinmingcheng` varchar(50) DEFAULT NULL COMMENT '商品名称',
  `shuliang` int(11) DEFAULT NULL COMMENT '数量',
  `danjia` decimal(10,2) DEFAULT NULL COMMENT '单价',
  `xiaoji` decimal(10,2) DEFAULT NULL COMMENT '小计',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gouwuche
-- ----------------------------

-- ----------------------------
-- Table structure for `huiyuanjifen`
-- ----------------------------
DROP TABLE IF EXISTS `huiyuanjifen`;
CREATE TABLE `huiyuanjifen` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `huiyuanmingcheng` varchar(50) DEFAULT NULL COMMENT '会员名称',
  `huiyuanjifen` varchar(50) DEFAULT NULL COMMENT '会员积分',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of huiyuanjifen
-- ----------------------------
INSERT INTO `huiyuanjifen` VALUES ('2', '13000000000', '200.5', '1', '2025-03-23 14:44:15 ', '', '0');
INSERT INTO `huiyuanjifen` VALUES ('3', '13000000001', '25', '1', '2025-03-23 14:55:02 ', '', '0');

-- ----------------------------
-- Table structure for `huiyuanxinxi`
-- ----------------------------
DROP TABLE IF EXISTS `huiyuanxinxi`;
CREATE TABLE `huiyuanxinxi` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `huiyuanmingcheng` varchar(50) DEFAULT NULL COMMENT '会员名称',
  `huiyuanbianhao` varchar(50) DEFAULT NULL COMMENT '会员编号',
  `lianxidianhua` varchar(50) DEFAULT NULL COMMENT '联系电话',
  `fuJian` varchar(200) DEFAULT NULL COMMENT '附件路径',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  `zhuangtai` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of huiyuanxinxi
-- ----------------------------
INSERT INTO `huiyuanxinxi` VALUES ('3', 'rtyuikl', '100', '1308425255445', '', '1', '2025-05-13 20:26:24 ', '', '0', null);
INSERT INTO `huiyuanxinxi` VALUES ('4', '13987658908', '13987658908', '13987658908', '', '1', '2025-03-26 10:25:14 ', '', '0', null);

-- ----------------------------
-- Table structure for `jiageshezhi`
-- ----------------------------
DROP TABLE IF EXISTS `jiageshezhi`;
CREATE TABLE `jiageshezhi` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `huohao` varchar(50) DEFAULT NULL COMMENT '货号',
  `xiaoshoujiage` varchar(50) DEFAULT NULL COMMENT '销售价格',
  `shezhiriqi` varchar(50) DEFAULT NULL COMMENT '设置日期',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jiageshezhi
-- ----------------------------
INSERT INTO `jiageshezhi` VALUES ('1', 'SP-00001', '3.5', '2025-03-23', '1', '2025-03-23 09:33:31 ', '', '0');
INSERT INTO `jiageshezhi` VALUES ('2', 'SP-00002', '4', '2025-03-23', '1', '2025-03-23 09:33:36 ', '', '0');
INSERT INTO `jiageshezhi` VALUES ('3', 'RH-00001', '18', '2025-03-23', '1', '2025-03-23 09:33:40 ', '', '0');
INSERT INTO `jiageshezhi` VALUES ('4', 'DG-00002', '20', '2025-03-23', '1', '2025-03-30 18:23:46 ', '', '0');
INSERT INTO `jiageshezhi` VALUES ('5', 'efsrdg', '150', '2023-12-23', '1', '2025-04-01 14:01:20 ', '', '0');

-- ----------------------------
-- Table structure for `jifenduihuan`
-- ----------------------------
DROP TABLE IF EXISTS `jifenduihuan`;
CREATE TABLE `jifenduihuan` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `huiyuanhao` varchar(50) DEFAULT NULL COMMENT '会员号',
  `duihuanwupin` varchar(50) DEFAULT NULL COMMENT '兑换物品',
  `duihuanriqi` varchar(50) DEFAULT NULL COMMENT '兑换日期',
  `shiyongjifen` varchar(50) DEFAULT NULL COMMENT '使用积分',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jifenduihuan
-- ----------------------------
INSERT INTO `jifenduihuan` VALUES ('7', '13987658908', '抽纸', '2025-03-23', '10', '1', '2025-03-23 23:42:02 ', '', '0');

-- ----------------------------
-- Table structure for `lanmuguanli`
-- ----------------------------
DROP TABLE IF EXISTS `lanmuguanli`;
CREATE TABLE `lanmuguanli` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `lanmumingcheng` varchar(100) DEFAULT NULL COMMENT '栏目名称',
  `chuangjianren` varchar(20) DEFAULT NULL COMMENT '创建人',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lanmuguanli
-- ----------------------------
INSERT INTO `lanmuguanli` VALUES ('1', '网站公告', 'admin', '1', '2025-03-20 10:53:19', '', '0');
INSERT INTO `lanmuguanli` VALUES ('2', '活动促销', 'admin', '1', '2025-03-20 10:53:19', '', '0');
INSERT INTO `lanmuguanli` VALUES ('3', '店长推荐', 'admin', '1', '2025-03-20 10:53:19', '', '0');
INSERT INTO `lanmuguanli` VALUES ('4', '团购信息', 'admin', '1', '2025-03-20 10:53:19', '', '0');

-- ----------------------------
-- Table structure for `menu_info`
-- ----------------------------
DROP TABLE IF EXISTS `menu_info`;
CREATE TABLE `menu_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(50) NOT NULL COMMENT '菜单名称',
  `menu_ename` varchar(50) DEFAULT NULL,
  `f_id` int(11) NOT NULL DEFAULT '0' COMMENT '父级菜单ID（fid为0表示为根节点）',
  `menu_todo` varchar(256) DEFAULT NULL COMMENT '菜单url',
  `menu_status` int(1) NOT NULL DEFAULT '1' COMMENT '菜单状态（1：正常； 0 ：非正常）',
  `menu_type` int(1) NOT NULL DEFAULT '1' COMMENT '菜单类型（0：系统菜单 ； 1：自定义普通菜单 ; 2 :自定义浏览菜单；3 :自定义审批菜单 ; 4:复制新增菜单）',
  `menu_index` int(11) DEFAULT '0' COMMENT '菜单显示序列',
  `menu_table` varchar(50) DEFAULT NULL COMMENT '菜单对应数据库表',
  `view_menu` int(1) NOT NULL DEFAULT '0' COMMENT '是否有浏览菜单（0：无 ； 1：有）',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `data_right` int(2) DEFAULT '0' COMMENT '数据权限（0：都可见；1：仅自己可见；2：自己和管理员可见）',
  `export_excel` int(1) DEFAULT '0' COMMENT '是否需要导出excel（0：不需要；1：需要）',
  `fuJian` int(1) DEFAULT '0' COMMENT '是否需要附件（0：不需要；1：需要）',
  `frontS` int(1) DEFAULT '0',
  `shenpi` int(1) DEFAULT '0' COMMENT '审批（0：无审批 ； 1：有审批）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1040 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu_info
-- ----------------------------
INSERT INTO `menu_info` VALUES ('1', '系统用户管理', 'sysManage', '0', '/WEB-ROOT/app/sysManage/', '1', '0', '12', null, '0', '1', '0', '0', '0', '0', '0');
INSERT INTO `menu_info` VALUES ('2', '用户管理', 'systemUserManage', '1', '/WEB-ROOT/app/sysManage/systemUserManage.do', '1', '0', '1', 'user_info', '0', '1', '0', '0', '0', '0', '0');
INSERT INTO `menu_info` VALUES ('15', '平台公告管理', 'wangzhanguanli', '0', '/WEB-ROOT/app/wangzhanguanli/', '1', '1', '11', null, '0', '', null, null, null, '0', '0');
INSERT INTO `menu_info` VALUES ('16', '栏目管理', 'lanmuguanli', '15', '/WEB-ROOT/app/wangzhanguanli/lanmuguanli.do?m=lanmuguanli', '1', '1', '0', 'lanmuguanli', '0', '', '0', '0', '0', '0', '0');
INSERT INTO `menu_info` VALUES ('17', '公告发布管理', 'wenzhangguanli', '15', '/WEB-ROOT/app/wangzhanguanli/wenzhangguanli.do?m=wenzhangguanli', '1', '1', '0', 'wenzhangguanli', '0', '', '0', '0', '0', '0', '0');
INSERT INTO `menu_info` VALUES ('41', '供应商管理', 'gongyingshangguanli', '0', '/WEB-ROOT/app/gongyingshangguanli/', '0', '1', '3', null, '0', '', null, null, null, '0', null);
INSERT INTO `menu_info` VALUES ('44', '承运商管理', 'chengyunshangguanli', '0', '/WEB-ROOT/app/chengyunshangguanli/', '0', '1', '2', null, '0', '', null, null, null, '0', null);
INSERT INTO `menu_info` VALUES ('47', '承运商浏览', 'chengyunshangxinxi', '44', '/WEB-ROOT/app/chengyunshangguanli/chengyunshangxinxi.do?r=y&m=chengyunshangxinxi', '1', '2', '0', 'chengyunshangxinxi', '1', '', '0', '1', '0', '1', '0');
INSERT INTO `menu_info` VALUES ('48', '承运商信息', 'chengyunshangxinxi', '44', '/WEB-ROOT/app/chengyunshangguanli/chengyunshangxinxi.do?m=chengyunshangxinxi', '1', '1', '0', 'chengyunshangxinxi', '1', '', '0', '1', '0', '0', '0');
INSERT INTO `menu_info` VALUES ('49', '基本参数设置', 'jibencanshu', '0', '/WEB-ROOT/app/jibencanshu/', '1', '1', '0', null, '0', '', null, null, null, '0', null);
INSERT INTO `menu_info` VALUES ('50', '商品类型', 'shangpinleixing', '49', '/WEB-ROOT/app/jibencanshu/shangpinleixing.do?m=shangpinleixing', '1', '1', '0', 'shangpinleixing', '0', '', '0', '0', '0', '0', '0');
INSERT INTO `menu_info` VALUES ('51', '进货信息管理', 'caigouguanli', '0', '/WEB-ROOT/app/caigouguanli/', '1', '1', '4', null, '0', '', null, null, null, '0', null);
INSERT INTO `menu_info` VALUES ('58', '订单信息管理', 'xiaoshouguanli', '0', '/WEB-ROOT/app/xiaoshouguanli/', '1', '1', '6', null, '0', '', null, null, null, '0', null);
INSERT INTO `menu_info` VALUES ('66', '价格设置', 'jiageshezhi', '58', '/WEB-ROOT/app/xiaoshouguanli/jiageshezhi.do?m=jiageshezhi', '1', '1', '0', 'jiageshezhi', '0', '', '0', '0', '0', '0', '0');
INSERT INTO `menu_info` VALUES ('69', '订单报表统计', 'xiaoshouxinxi', '90', '/WEB-ROOT/app/xiaoshouguanli/xiaoshouxinxi.do?r=y&m=xiaoshouxinxi', '1', '2', '0', 'xiaoshouxinxi', '1', '', '0', '1', '0', '0', '0');
INSERT INTO `menu_info` VALUES ('70', '订单信息', 'xiaoshouxinxi', '58', '/WEB-ROOT/app/xiaoshouguanli/xiaoshouxinxi.do?m=xiaoshouxinxi', '1', '1', '0', 'xiaoshouxinxi', '1', '', '0', '1', '0', '0', '0');
INSERT INTO `menu_info` VALUES ('80', '会员信息管理', 'huiyuanguanli', '0', '/WEB-ROOT/app/huiyuanguanli/', '1', '1', '7', null, '0', '', null, null, null, '0', null);
INSERT INTO `menu_info` VALUES ('81', '会员信息浏览', 'huiyuanxinxi', '80', '/WEB-ROOT/app/huiyuanguanli/huiyuanxinxi.do?r=y&m=huiyuanxinxi', '0', '2', '0', 'huiyuanxinxi', '1', '', '0', '0', '1', '1', '0');
INSERT INTO `menu_info` VALUES ('82', '会员信息审批', 'huiyuanxinxi', '80', '/WEB-ROOT/app/huiyuanguanli/huiyuanxinxi.do?r=y&m=huiyuanxinxi&sp=1', '0', '3', '0', 'huiyuanxinxi', '1', '', '0', '0', '1', '0', '1');
INSERT INTO `menu_info` VALUES ('83', '会员信息', 'huiyuanxinxi', '80', '/WEB-ROOT/app/huiyuanguanli/huiyuanxinxi.do?m=huiyuanxinxi', '1', '1', '0', 'huiyuanxinxi', '1', '', '0', '0', '1', '0', '1');
INSERT INTO `menu_info` VALUES ('84', '库存信息', 'caigouxinxi', '100', '/WEB-ROOT/app/caigouguanli/caigouxinxi.do?r=y&m=caigouxinxi', '1', '2', '0', 'caigouxinxi', '1', '', '0', '1', '1', '0', '0');
INSERT INTO `menu_info` VALUES ('85', '进货审批', 'caigouxinxi', '51', '/WEB-ROOT/app/caigouguanli/caigouxinxi.do?r=y&m=caigouxinxi&sp=1', '0', '3', '2', 'caigouxinxi', '1', '', '0', '1', '1', '0', '1');
INSERT INTO `menu_info` VALUES ('86', '进货信息', 'caigouxinxi', '51', '/WEB-ROOT/app/caigouguanli/caigouxinxi.do?m=caigouxinxi', '1', '1', '1', 'caigouxinxi', '1', '', '0', '1', '1', '0', '1');
INSERT INTO `menu_info` VALUES ('87', '员工信息管理', 'renliziyuanguanli', '0', '/WEB-ROOT/app/renliziyuanguanli/', '1', '1', '9', null, '0', '', null, null, null, '0', null);
INSERT INTO `menu_info` VALUES ('88', '员工浏览', 'neibuyuangongguanli', '87', '/WEB-ROOT/app/renliziyuanguanli/neibuyuangongguanli.do?r=y&m=neibuyuangongguanli', '0', '2', '0', 'neibuyuangongguanli', '1', '', '0', '1', '0', '1', '0');
INSERT INTO `menu_info` VALUES ('89', '员工资料', 'neibuyuangongguanli', '87', '/WEB-ROOT/app/renliziyuanguanli/neibuyuangongguanli.do?m=neibuyuangongguanli', '1', '1', '0', 'neibuyuangongguanli', '1', '', '0', '1', '0', '0', '0');
INSERT INTO `menu_info` VALUES ('90', '统计报表管理', 'caiwuguanli', '0', '/WEB-ROOT/app/caiwuguanli/', '1', '1', '10', null, '0', '', null, null, null, '0', null);
INSERT INTO `menu_info` VALUES ('100', '库存信息管理', 'kucunguanli', '0', '/WEB-ROOT/app/kucunguanli/', '1', '1', '4', null, '0', '', null, null, null, '0', null);
INSERT INTO `menu_info` VALUES ('101', '采购图表统计', 'caigoutubiaotongji', '90', '/WEB-ROOT/app/caiwuguanli/caigoutubiaotongji.do?m=caigoutubiaotongji', '1', '1', '0', 'caigoutubiaotongji', '0', '', '0', '0', '0', '0', '0');
INSERT INTO `menu_info` VALUES ('102', '销售图表统计', 'xiaoshoutubiaotongji', '90', '/WEB-ROOT/app/caiwuguanli/xiaoshoutubiaotongji.do?m=xiaoshoutubiaotongji', '1', '1', '0', 'xiaoshoutubiaotongji', '0', '', '0', '0', '0', '0', '0');
INSERT INTO `menu_info` VALUES ('104', '供应商浏览', 'gongyingshangxinxi', '41', '/WEB-ROOT/app/gongyingshangguanli/gongyingshangxinxi.do?r=y&m=gongyingshangxinxi', '0', '2', '0', 'gongyingshangxinxi', '1', '', '0', '1', '0', '0', '0');
INSERT INTO `menu_info` VALUES ('105', '供应商信息', 'gongyingshangxinxi', '41', '/WEB-ROOT/app/gongyingshangguanli/gongyingshangxinxi.do?m=gongyingshangxinxi', '1', '1', '0', 'gongyingshangxinxi', '1', '', '0', '1', '0', '0', '0');
INSERT INTO `menu_info` VALUES ('107', '仓库信息管理', 'cangkuguanli', '0', '/WEB-ROOT/app/cangkuguanli/', '1', '1', '8', null, '0', '', null, null, null, '0', null);
INSERT INTO `menu_info` VALUES ('108', '仓库浏览', 'cangkuxinxi', '107', '/WEB-ROOT/app/cangkuguanli/cangkuxinxi.do?r=y&m=cangkuxinxi', '0', '2', '2', 'cangkuxinxi', '1', '', '2', '1', '0', '0', '0');
INSERT INTO `menu_info` VALUES ('109', '仓库信息', 'cangkuxinxi', '107', '/WEB-ROOT/app/cangkuguanli/cangkuxinxi.do?m=cangkuxinxi', '1', '1', '1', 'cangkuxinxi', '1', '', '2', '1', '0', '0', '0');
INSERT INTO `menu_info` VALUES ('110', '出入库浏览', 'churukuxinxi', '107', '/WEB-ROOT/app/cangkuguanli/churukuxinxi.do?r=y&m=churukuxinxi', '0', '2', '4', 'churukuxinxi', '1', '', '0', '1', '1', '0', '0');
INSERT INTO `menu_info` VALUES ('111', '出入库信息', 'churukuxinxi', '107', '/WEB-ROOT/app/cangkuguanli/churukuxinxi.do?m=churukuxinxi', '0', '1', '3', 'churukuxinxi', '1', '', '0', '1', '1', '0', '0');
INSERT INTO `menu_info` VALUES ('200', '购买管理', 'goumaiguanli', '0', '/WEB-ROOT/app/goumaiguanli/', '1', '1', '4', null, '0', '', null, null, null, '0', null);
INSERT INTO `menu_info` VALUES ('201', '购买商品', 'goumaishangpin', '200', '/WEB-ROOT/app/goumaiguanli/goumaishangpin.do?m=goumaishangpin', '1', '1', '0', 'goumaishangpin', '0', '', '0', '0', '0', '0', '0');
INSERT INTO `menu_info` VALUES ('202', '购物车', 'gouwuche', '200', '/WEB-ROOT/app/goumaiguanli/gouwuche.do?m=gouwuche', '1', '1', '0', 'gouwuche', '0', '', '0', '0', '0', '0', '0');
INSERT INTO `menu_info` VALUES ('1030', '资讯信息管理', 'xinxifabuguanli', '0', '/WEB-ROOT/app/xinxifabuguanli/', '1', '1', '2', 'xinxifabuguanli', '0', null, null, null, null, '0', null);
INSERT INTO `menu_info` VALUES ('1031', '资讯信息发布', 'xinxifabu', '1030', '/WEB-ROOT/app/xinxifabuguanli/xinxifabu.do?m=xinxifabu', '1', '1', '0', 'xinxifabu', '1', null, '2', '0', '0', '0', '0');

-- ----------------------------
-- Table structure for `neibuyuangongguanli`
-- ----------------------------
DROP TABLE IF EXISTS `neibuyuangongguanli`;
CREATE TABLE `neibuyuangongguanli` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `yuangongxingming` varchar(50) DEFAULT NULL COMMENT '员工姓名',
  `yuangonggonghao` varchar(50) DEFAULT NULL COMMENT '员工工号',
  `ruzhishijian` varchar(50) DEFAULT NULL COMMENT '入职时间',
  `jiatingzhuzhi` varchar(100) DEFAULT NULL COMMENT '家庭住址',
  `lianxidianhua` varchar(50) DEFAULT NULL COMMENT '联系电话',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of neibuyuangongguanli
-- ----------------------------
INSERT INTO `neibuyuangongguanli` VALUES ('1', '李华', '00001', '2025-03-23', '北京', '13099998888', '1', '2025-03-28 13:42:18 ', '', '0');

-- ----------------------------
-- Table structure for `organize_info`
-- ----------------------------
DROP TABLE IF EXISTS `organize_info`;
CREATE TABLE `organize_info` (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `orgName` varchar(50) NOT NULL COMMENT '组织名称',
  `fID` int(11) NOT NULL DEFAULT '0' COMMENT '父组织编号',
  `authorizeNum` int(11) DEFAULT '-1' COMMENT '编制人数（-1为无限制）',
  `startTime` varchar(19) NOT NULL COMMENT '生效开始时间',
  `endTime` datetime DEFAULT NULL COMMENT '作废时间',
  `orgManager` int(11) DEFAULT NULL COMMENT '组织负责人编号',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) NOT NULL DEFAULT '0' COMMENT '删除表示（0：正常；1：作废）',
  `fName` varchar(50) DEFAULT NULL COMMENT '父组织名称',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of organize_info
-- ----------------------------
INSERT INTO `organize_info` VALUES ('1', '财务部', '0', '1', '2025-03-23 14:13:11', null, '1', '财务部门', '0', '组织结构树');
INSERT INTO `organize_info` VALUES ('2', '人力部', '0', '2', '2025-03-23 14:15:52', null, '1', '人力资源部门：分管人事，后勤。', '0', '组织结构树');

-- ----------------------------
-- Table structure for `shangpinleixing`
-- ----------------------------
DROP TABLE IF EXISTS `shangpinleixing`;
CREATE TABLE `shangpinleixing` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `shangpinleixing` varchar(50) DEFAULT NULL COMMENT '商品类型',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shangpinleixing
-- ----------------------------
INSERT INTO `shangpinleixing` VALUES ('1', '食品副食', '1', '2025-03-23 22:10:40 ', '', '0');
INSERT INTO `shangpinleixing` VALUES ('2', '日化用品', '1', '2025-03-23 22:10:42 ', '', '0');
INSERT INTO `shangpinleixing` VALUES ('3', '家用电器', '1', '2025-03-23 22:10:44 ', '', '0');
INSERT INTO `shangpinleixing` VALUES ('4', '服装鞋袜', '1', '2025-03-23 22:10:46 ', '', '0');
INSERT INTO `shangpinleixing` VALUES ('5', '生鲜蔬果', '1', '2025-03-28 13:13:36 ', '', '0');
INSERT INTO `shangpinleixing` VALUES ('6', '肉类', '1', '2025-04-01 12:43:04 ', '', '0');

-- ----------------------------
-- Table structure for `shouyehuandengpian`
-- ----------------------------
DROP TABLE IF EXISTS `shouyehuandengpian`;
CREATE TABLE `shouyehuandengpian` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `tupianmingcheng` varchar(100) DEFAULT NULL COMMENT '图片名称',
  `tupianbianhao` varchar(300) DEFAULT NULL COMMENT '图片编号',
  `changd` varchar(10) DEFAULT NULL COMMENT '长度',
  `kuandu` varchar(10) DEFAULT NULL COMMENT '宽度',
  `fuJian` varchar(200) DEFAULT NULL COMMENT '附件路径',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shouyehuandengpian
-- ----------------------------

-- ----------------------------
-- Table structure for `system_info`
-- ----------------------------
DROP TABLE IF EXISTS `system_info`;
CREATE TABLE `system_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `systemName` varchar(100) NOT NULL DEFAULT '后台管理系统' COMMENT '系统名称',
  `systemDesigner` varchar(50) NOT NULL DEFAULT '***' COMMENT '设计人名称',
  `loginPageStyle` varchar(50) NOT NULL DEFAULT '方案一' COMMENT '登陆界面样式',
  `systemSkin` varchar(80) NOT NULL DEFAULT '' COMMENT '系统主题皮肤',
  `systemSkinName` varchar(50) NOT NULL DEFAULT '默认主题' COMMENT '系统主题皮肤名称',
  `topPanDisplay` varchar(1) NOT NULL DEFAULT '1' COMMENT '上部面板是否显示（1：显示 ； 0：不显示）',
  `southPanDisplay` varchar(1) NOT NULL DEFAULT '1' COMMENT '下部面板是否显示（1：显示 ； 0：不显示）',
  `menuRegion` varchar(1) NOT NULL DEFAULT '1' COMMENT '菜单显示方位（1：左边 ； 2：右边）',
  `menuCollapse` varchar(1) NOT NULL DEFAULT '1' COMMENT '菜单折叠（1：折叠 ； 0：不折叠）',
  `menuAnimate` varchar(1) NOT NULL DEFAULT '1' COMMENT '菜单动态效果（1：使用 ； 0：不使用）',
  `menuBackground` varchar(1) NOT NULL DEFAULT '0' COMMENT '菜单背景色（1：使用；0：不使用）',
  `isApprove` varchar(1) NOT NULL DEFAULT '0' COMMENT '注册后审批（0：不需要； 1：需要）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of system_info
-- ----------------------------
INSERT INTO `system_info` VALUES ('1', '超市库存销售管理系统', '超市库存销售管理系统', '113', 'xtheme-gray-extend.css', '36', '1', '1', '1', '1', '1', '0', '0');

-- ----------------------------
-- Table structure for `table_guanlian`
-- ----------------------------
DROP TABLE IF EXISTS `table_guanlian`;
CREATE TABLE `table_guanlian` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `table_name` varchar(100) NOT NULL COMMENT '当前表',
  `field_name` varchar(50) NOT NULL COMMENT '本表字段名称',
  `guanlianbiao` varchar(100) DEFAULT NULL COMMENT '关联表名称',
  `guanlianziduan` varchar(50) DEFAULT NULL COMMENT '关联表字段',
  `guanlian` int(1) NOT NULL DEFAULT '0' COMMENT '是否需要关联（0：不需要； 1：需要）',
  `bitian` int(1) NOT NULL DEFAULT '1' COMMENT '是否必填（0：不必填； 1：必填）',
  `zhidu` int(1) NOT NULL DEFAULT '0' COMMENT '是否只读（0：不只读； 1：只读）',
  `morenzhi` varchar(50) DEFAULT NULL COMMENT '默认值',
  `ziduanleixing` varchar(50) DEFAULT 'varchar' COMMENT '字段类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_guanlian
-- ----------------------------
INSERT INTO `table_guanlian` VALUES ('4', 'lanmuguanli', 'lanmumingcheng', '', '', '0', '1', '0', '', null);
INSERT INTO `table_guanlian` VALUES ('5', 'lanmuguanli', 'chuangjianren', '', '', '0', '1', '0', '', null);
INSERT INTO `table_guanlian` VALUES ('6', 'wenzhangguanli', 'wenzhangbiaoti', '', '', '0', '1', '0', '', null);
INSERT INTO `table_guanlian` VALUES ('7', 'wenzhangguanli', 'fubiaoti', '', '', '0', '1', '0', '', null);
INSERT INTO `table_guanlian` VALUES ('8', 'wenzhangguanli', 'zhengwen', '', '', '0', '1', '0', '', null);
INSERT INTO `table_guanlian` VALUES ('9', 'wenzhangguanli', 'luokuan', '', '', '0', '1', '0', '', null);
INSERT INTO `table_guanlian` VALUES ('10', 'wenzhangguanli', 'suoshulanmu', 'lanmuguanli', 'lanmumingcheng', '1', '1', '0', '', null);
INSERT INTO `table_guanlian` VALUES ('13', 'shouyehuandengpian', 'tupianmingcheng', '', '', '0', '1', '0', '', null);
INSERT INTO `table_guanlian` VALUES ('14', 'shouyehuandengpian', 'tupianbianhao', '', '', '0', '1', '0', '', null);
INSERT INTO `table_guanlian` VALUES ('15', 'shouyehuandengpian', 'changd', '', '', '0', '1', '0', '', null);
INSERT INTO `table_guanlian` VALUES ('16', 'shouyehuandengpian', 'kuandu', '', '', '0', '1', '0', '', null);
INSERT INTO `table_guanlian` VALUES ('35', 'chengyunshangxinxi', 'chengyunshangmingcheng', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('36', 'chengyunshangxinxi', 'chengyunleixing', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('37', 'chengyunshangxinxi', 'chexing', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('38', 'chengyunshangxinxi', 'dizhi', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('39', 'chengyunshangxinxi', 'lianxiren', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('40', 'chengyunshangxinxi', 'lianxidianhua', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('41', 'shangpinleixing', 'shangpinleixing', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('76', 'jiageshezhi', 'huohao', 'caigouxinxi', 'huohao', '1', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('77', 'jiageshezhi', 'xiaoshoujiage', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('78', 'jiageshezhi', 'shezhiriqi', '', '', '0', '1', '0', '', 'date');
INSERT INTO `table_guanlian` VALUES ('82', 'xiaoshouxinxi', 'xiaoshoudanhao', '', '', '0', '1', '1', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('83', 'xiaoshouxinxi', 'jingshouren', '', '', '0', '0', '1', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('84', 'xiaoshouxinxi', 'xiaofeijine', '', '', '0', '0', '1', '0', 'varchar');
INSERT INTO `table_guanlian` VALUES ('85', 'xiaoshouxinxi', 'huiyuanbianhao', '', '', '0', '0', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('115', 'huiyuanxinxi', 'huiyuanmingcheng', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('116', 'huiyuanxinxi', 'huiyuanbianhao', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('117', 'huiyuanxinxi', 'lianxidianhua', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('118', 'caigouxinxi', 'shangpinmingcheng', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('119', 'caigouxinxi', 'huohao', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('120', 'caigouxinxi', 'shangpinleixing', 'shangpinleixing', 'shangpinleixing', '1', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('121', 'caigouxinxi', 'gongyingshang', 'gongyingshangxinxi', 'gongyingshangmingcheng', '1', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('122', 'caigouxinxi', 'chengyunshang', 'chengyunshangxinxi', 'chengyunshangmingcheng', '1', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('123', 'caigouxinxi', 'danjia', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('124', 'caigouxinxi', 'caigouriqi', '', '', '0', '1', '0', '', 'date');
INSERT INTO `table_guanlian` VALUES ('125', 'caigouxinxi', 'caigouren', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('126', 'caigouxinxi', 'shuliang', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('127', 'caigouxinxi', 'kucunliang', '', '', '0', '0', '1', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('128', 'caigouxinxi', 'zhuangtai', '', '', '0', '1', '1', '未审批', 'varchar');
INSERT INTO `table_guanlian` VALUES ('129', 'neibuyuangongguanli', 'yuangongxingming', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('130', 'neibuyuangongguanli', 'yuangonggonghao', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('131', 'neibuyuangongguanli', 'ruzhishijian', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('132', 'neibuyuangongguanli', 'jiatingzhuzhi', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('133', 'neibuyuangongguanli', 'lianxidianhua', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('134', 'huiyuanjifen', 'huiyuanmingcheng', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('135', 'huiyuanjifen', 'huiyuanjifen', '', '', '0', '1', '0', '0', 'varchar');
INSERT INTO `table_guanlian` VALUES ('136', 'caigoutubiaotongji', 'tongjishijian', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('137', 'xiaoshoutubiaotongji', 'tongjishijian', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('139', 'gongyingshangxinxi', 'gongyingshangmingcheng', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('140', 'gongyingshangxinxi', 'dizhi', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('141', 'gongyingshangxinxi', 'lianxiren', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('142', 'gongyingshangxinxi', 'gonghuozhouqi', '', '', '0', '0', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('143', 'gongyingshangxinxi', 'lianxidianhua', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('144', 'zidongcaigoudan', 'shangpinmingcheng', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('145', 'zidongcaigoudan', 'huohao', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('146', 'zidongcaigoudan', 'shangpinleixing', 'shangpinleixing', 'shangpinleixing', '1', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('147', 'zidongcaigoudan', 'gongyingshang', 'gongyingshangxinxi', 'gongyingshangmingcheng', '1', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('148', 'zidongcaigoudan', 'chengyunshang', 'chengyunshangxinxi', 'chengyunshangmingcheng', '1', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('149', 'zidongcaigoudan', 'danjia', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('150', 'zidongcaigoudan', 'caigouriqi', '', '', '0', '1', '0', '', 'date');
INSERT INTO `table_guanlian` VALUES ('151', 'zidongcaigoudan', 'caigouren', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('152', 'zidongcaigoudan', 'shuliang', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('153', 'zidongcaigoudan', 'kucunliang', '', '', '0', '0', '1', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('154', 'cangkuxinxi', 'cangkumingcheng', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('155', 'cangkuxinxi', 'xiujianshijian', '', '', '0', '1', '0', '', 'date');
INSERT INTO `table_guanlian` VALUES ('156', 'cangkuxinxi', 'rongji', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('157', 'cangkuxinxi', 'shiyonglv', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('158', 'cangkuxinxi', 'suozaiweizhi', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('159', 'cangkuxinxi', 'xiangguanpeizhi', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('160', 'churukuxinxi', 'huohao', 'caigouxinxi', 'huohao', '1', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('161', 'churukuxinxi', 'rukushijian', '', '', '0', '1', '0', '', 'date');
INSERT INTO `table_guanlian` VALUES ('162', 'churukuxinxi', 'baocuncangku', 'cangkuxinxi', 'cangkumingcheng', '1', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('163', 'churukuxinxi', 'chukushijian', '', '', '0', '1', '0', '', 'date');
INSERT INTO `table_guanlian` VALUES ('164', 'churukuxinxi', 'baocunxiangqing', '', '', '0', '0', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('165', 'churukuxinxi', 'shengchanriqi', '', '', '0', '1', '0', '', 'date');
INSERT INTO `table_guanlian` VALUES ('166', 'churukuxinxi', 'baozhiqi', '', '', '0', '1', '0', '', 'date');
INSERT INTO `table_guanlian` VALUES ('167', 'baosunxinxi', 'huohao', 'caigouxinxi', 'huohao', '1', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('168', 'baosunxinxi', 'baosunriqi', '', '', '0', '1', '0', '', 'date');
INSERT INTO `table_guanlian` VALUES ('169', 'baosunxinxi', 'baosunshuoming', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('170', 'jifenduihuan', 'huiyuanhao', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('171', 'jifenduihuan', 'duihuanwupin', '', '', '0', '1', '0', '', 'varchar');
INSERT INTO `table_guanlian` VALUES ('172', 'jifenduihuan', 'duihuanriqi', '', '', '0', '1', '0', '', 'date');
INSERT INTO `table_guanlian` VALUES ('173', 'jifenduihuan', 'shiyongjifen', '', '', '0', '1', '0', '', 'varchar');

-- ----------------------------
-- Table structure for `table_pic`
-- ----------------------------
DROP TABLE IF EXISTS `table_pic`;
CREATE TABLE `table_pic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `picName` varchar(100) DEFAULT NULL COMMENT '图片名称',
  `picPath` varchar(200) DEFAULT NULL COMMENT '图片路径',
  `itime` varchar(20) DEFAULT NULL COMMENT '上传时间',
  `operatorId` varchar(11) DEFAULT NULL COMMENT '上传人ID',
  `detail` varchar(500) DEFAULT NULL COMMENT '备注',
  `tuPianIndex` varchar(50) NOT NULL COMMENT '图片所属记录ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_pic
-- ----------------------------
INSERT INTO `table_pic` VALUES ('43', '11823.jpg', 'E:/java/ide/myeclipse/workspace/XinWenMenHuWang/UploadFile/202112160918375/11823.jpg', '2025-03-20 10:53:19', '1', null, '202112160918375');
INSERT INTO `table_pic` VALUES ('46', '1230.jpg', 'E:/java/ide/myeclipse/workspace/XinWenMenHuWang/UploadFile/202210202220264/1230.jpg', '2025-03-20 10:53:19', '1', null, '202210202220264');
INSERT INTO `table_pic` VALUES ('47', '1134531.jpg', 'E:/java/ide/myeclipse/workspace/ChaoShiGuanLi/UploadFile/202405201101121/1134531.jpg', '2025-03-20 10:53:19', '1', null, '202405201101121');
INSERT INTO `table_pic` VALUES ('48', '2w1.jpg', 'E:/java/ide/myeclipse/workspace/ChaoShiGuanLi/UploadFile/202405201202094/2w1.jpg', '2025-03-20 10:53:19', '1', null, '202405201202094');
INSERT INTO `table_pic` VALUES ('53', 'food.jpg', 'D:/java/tomcat/webapps/ROOT/UploadFile/202503301551506/food.jpg', '2025-03-30 16:21:07 ', '1', null, '202503301551506');

-- ----------------------------
-- Table structure for `table_tongji`
-- ----------------------------
DROP TABLE IF EXISTS `table_tongji`;
CREATE TABLE `table_tongji` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `table_name` varchar(30) NOT NULL DEFAULT '' COMMENT '表名称',
  `field_name` varchar(30) NOT NULL DEFAULT '' COMMENT '字段名称',
  `tongji` varchar(1) NOT NULL DEFAULT '0' COMMENT '是否需要统计（0：不需要； 1：需要）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_tongji
-- ----------------------------
INSERT INTO `table_tongji` VALUES ('4', 'lanmuguanli', 'lanmumingcheng', '0');
INSERT INTO `table_tongji` VALUES ('5', 'lanmuguanli', 'chuangjianren', '0');
INSERT INTO `table_tongji` VALUES ('6', 'wenzhangguanli', 'wenzhangbiaoti', '0');
INSERT INTO `table_tongji` VALUES ('7', 'wenzhangguanli', 'fubiaoti', '0');
INSERT INTO `table_tongji` VALUES ('8', 'wenzhangguanli', 'zhengwen', '0');
INSERT INTO `table_tongji` VALUES ('9', 'wenzhangguanli', 'luokuan', '0');
INSERT INTO `table_tongji` VALUES ('10', 'wenzhangguanli', 'suoshulanmu', '0');
INSERT INTO `table_tongji` VALUES ('13', 'shouyehuandengpian', 'tupianmingcheng', '0');
INSERT INTO `table_tongji` VALUES ('14', 'shouyehuandengpian', 'tupianbianhao', '0');
INSERT INTO `table_tongji` VALUES ('15', 'shouyehuandengpian', 'changd', '0');
INSERT INTO `table_tongji` VALUES ('16', 'shouyehuandengpian', 'kuandu', '0');
INSERT INTO `table_tongji` VALUES ('35', 'chengyunshangxinxi', 'chengyunshangmingcheng', '0');
INSERT INTO `table_tongji` VALUES ('36', 'chengyunshangxinxi', 'chengyunleixing', '0');
INSERT INTO `table_tongji` VALUES ('37', 'chengyunshangxinxi', 'chexing', '0');
INSERT INTO `table_tongji` VALUES ('38', 'chengyunshangxinxi', 'dizhi', '0');
INSERT INTO `table_tongji` VALUES ('39', 'chengyunshangxinxi', 'lianxiren', '0');
INSERT INTO `table_tongji` VALUES ('40', 'chengyunshangxinxi', 'lianxidianhua', '0');
INSERT INTO `table_tongji` VALUES ('41', 'shangpinleixing', 'shangpinleixing', '0');
INSERT INTO `table_tongji` VALUES ('76', 'jiageshezhi', 'huohao', '0');
INSERT INTO `table_tongji` VALUES ('77', 'jiageshezhi', 'xiaoshoujiage', '0');
INSERT INTO `table_tongji` VALUES ('78', 'jiageshezhi', 'shezhiriqi', '0');
INSERT INTO `table_tongji` VALUES ('82', 'xiaoshouxinxi', 'xiaoshoudanhao', '0');
INSERT INTO `table_tongji` VALUES ('83', 'xiaoshouxinxi', 'jingshouren', '0');
INSERT INTO `table_tongji` VALUES ('84', 'xiaoshouxinxi', 'xiaofeijine', '1');
INSERT INTO `table_tongji` VALUES ('85', 'xiaoshouxinxi', 'huiyuanbianhao', '0');
INSERT INTO `table_tongji` VALUES ('115', 'huiyuanxinxi', 'huiyuanmingcheng', '0');
INSERT INTO `table_tongji` VALUES ('116', 'huiyuanxinxi', 'huiyuanbianhao', '0');
INSERT INTO `table_tongji` VALUES ('117', 'huiyuanxinxi', 'lianxidianhua', '0');
INSERT INTO `table_tongji` VALUES ('118', 'caigouxinxi', 'shangpinmingcheng', '0');
INSERT INTO `table_tongji` VALUES ('119', 'caigouxinxi', 'huohao', '0');
INSERT INTO `table_tongji` VALUES ('120', 'caigouxinxi', 'shangpinleixing', '0');
INSERT INTO `table_tongji` VALUES ('121', 'caigouxinxi', 'gongyingshang', '0');
INSERT INTO `table_tongji` VALUES ('122', 'caigouxinxi', 'chengyunshang', '0');
INSERT INTO `table_tongji` VALUES ('123', 'caigouxinxi', 'danjia', '0');
INSERT INTO `table_tongji` VALUES ('124', 'caigouxinxi', 'caigouriqi', '0');
INSERT INTO `table_tongji` VALUES ('125', 'caigouxinxi', 'caigouren', '0');
INSERT INTO `table_tongji` VALUES ('126', 'caigouxinxi', 'shuliang', '1');
INSERT INTO `table_tongji` VALUES ('127', 'caigouxinxi', 'kucunliang', '1');
INSERT INTO `table_tongji` VALUES ('128', 'caigouxinxi', 'zhuangtai', '0');
INSERT INTO `table_tongji` VALUES ('129', 'neibuyuangongguanli', 'yuangongxingming', '0');
INSERT INTO `table_tongji` VALUES ('130', 'neibuyuangongguanli', 'yuangonggonghao', '0');
INSERT INTO `table_tongji` VALUES ('131', 'neibuyuangongguanli', 'ruzhishijian', '0');
INSERT INTO `table_tongji` VALUES ('132', 'neibuyuangongguanli', 'jiatingzhuzhi', '0');
INSERT INTO `table_tongji` VALUES ('133', 'neibuyuangongguanli', 'lianxidianhua', '0');
INSERT INTO `table_tongji` VALUES ('134', 'huiyuanjifen', 'huiyuanmingcheng', '0');
INSERT INTO `table_tongji` VALUES ('135', 'huiyuanjifen', 'huiyuanjifen', '0');
INSERT INTO `table_tongji` VALUES ('136', 'caigoutubiaotongji', 'tongjishijian', '0');
INSERT INTO `table_tongji` VALUES ('137', 'xiaoshoutubiaotongji', 'tongjishijian', '0');
INSERT INTO `table_tongji` VALUES ('139', 'gongyingshangxinxi', 'gongyingshangmingcheng', '0');
INSERT INTO `table_tongji` VALUES ('140', 'gongyingshangxinxi', 'dizhi', '0');
INSERT INTO `table_tongji` VALUES ('141', 'gongyingshangxinxi', 'lianxiren', '0');
INSERT INTO `table_tongji` VALUES ('142', 'gongyingshangxinxi', 'gonghuozhouqi', '0');
INSERT INTO `table_tongji` VALUES ('143', 'gongyingshangxinxi', 'lianxidianhua', '0');
INSERT INTO `table_tongji` VALUES ('144', 'zidongcaigoudan', 'shangpinmingcheng', '0');
INSERT INTO `table_tongji` VALUES ('145', 'zidongcaigoudan', 'huohao', '0');
INSERT INTO `table_tongji` VALUES ('146', 'zidongcaigoudan', 'shangpinleixing', '0');
INSERT INTO `table_tongji` VALUES ('147', 'zidongcaigoudan', 'gongyingshang', '0');
INSERT INTO `table_tongji` VALUES ('148', 'zidongcaigoudan', 'chengyunshang', '0');
INSERT INTO `table_tongji` VALUES ('149', 'zidongcaigoudan', 'danjia', '0');
INSERT INTO `table_tongji` VALUES ('150', 'zidongcaigoudan', 'caigouriqi', '0');
INSERT INTO `table_tongji` VALUES ('151', 'zidongcaigoudan', 'caigouren', '0');
INSERT INTO `table_tongji` VALUES ('152', 'zidongcaigoudan', 'shuliang', '1');
INSERT INTO `table_tongji` VALUES ('153', 'zidongcaigoudan', 'kucunliang', '1');
INSERT INTO `table_tongji` VALUES ('154', 'cangkuxinxi', 'cangkumingcheng', '0');
INSERT INTO `table_tongji` VALUES ('155', 'cangkuxinxi', 'xiujianshijian', '0');
INSERT INTO `table_tongji` VALUES ('156', 'cangkuxinxi', 'rongji', '0');
INSERT INTO `table_tongji` VALUES ('157', 'cangkuxinxi', 'shiyonglv', '0');
INSERT INTO `table_tongji` VALUES ('158', 'cangkuxinxi', 'suozaiweizhi', '0');
INSERT INTO `table_tongji` VALUES ('159', 'cangkuxinxi', 'xiangguanpeizhi', '0');
INSERT INTO `table_tongji` VALUES ('160', 'churukuxinxi', 'huohao', '0');
INSERT INTO `table_tongji` VALUES ('161', 'churukuxinxi', 'rukushijian', '0');
INSERT INTO `table_tongji` VALUES ('162', 'churukuxinxi', 'baocuncangku', '0');
INSERT INTO `table_tongji` VALUES ('163', 'churukuxinxi', 'chukushijian', '0');
INSERT INTO `table_tongji` VALUES ('164', 'churukuxinxi', 'baocunxiangqing', '0');
INSERT INTO `table_tongji` VALUES ('165', 'churukuxinxi', 'shengchanriqi', '0');
INSERT INTO `table_tongji` VALUES ('166', 'churukuxinxi', 'baozhiqi', '0');
INSERT INTO `table_tongji` VALUES ('167', 'baosunxinxi', 'huohao', '0');
INSERT INTO `table_tongji` VALUES ('168', 'baosunxinxi', 'baosunriqi', '0');
INSERT INTO `table_tongji` VALUES ('169', 'baosunxinxi', 'baosunshuoming', '0');
INSERT INTO `table_tongji` VALUES ('170', 'jifenduihuan', 'huiyuanhao', '0');
INSERT INTO `table_tongji` VALUES ('171', 'jifenduihuan', 'duihuanwupin', '0');
INSERT INTO `table_tongji` VALUES ('172', 'jifenduihuan', 'duihuanriqi', '0');
INSERT INTO `table_tongji` VALUES ('173', 'jifenduihuan', 'shiyongjifen', '0');

-- ----------------------------
-- Table structure for `user_info`
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `userAcct` varchar(50) NOT NULL COMMENT '用户帐号',
  `userPass` varchar(50) NOT NULL COMMENT '用户密码',
  `deleteFlag` int(1) NOT NULL DEFAULT '0' COMMENT '删除标识（0：正常 ； 1：删除）',
  `userName` varchar(50) NOT NULL COMMENT '用户名称',
  `userType` int(1) NOT NULL DEFAULT '2' COMMENT '用户类型（1：系统管理员；2：普通用户）',
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '状态（0：未审批；1：审批通过）',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('1', 'admin', '2A3FEAC13FC7F6BB', '0', '系统管理员', '1', '1');
INSERT INTO `user_info` VALUES ('2', 'yuangong1', 'C6DCF9C3673B51E2', '0', 'yuangong1', '3', '1');
INSERT INTO `user_info` VALUES ('3', 'jym', '8EAD4225E1C88631F41581515A2C7EE6', '1', 'jym', '1', '1');
INSERT INTO `user_info` VALUES ('4', 'csyg', '049A4CE17FCDEA8C', '1', 'csyg', '2', '1');
INSERT INTO `user_info` VALUES ('5', '789', 'F4109DE3F98D34CA', '1', 'yuangong2', '1', '1');
INSERT INTO `user_info` VALUES ('6', '959034', '2A3FEAC13FC7F6BB', '1', 'admins', '2', '1');
INSERT INTO `user_info` VALUES ('7', 'admins', '2A3FEAC13FC7F6BB', '1', 'admins', '2', '1');
INSERT INTO `user_info` VALUES ('8', '274674', '2A3FEAC13FC7F6BB', '1', 'admin', '2', '1');
INSERT INTO `user_info` VALUES ('9', 'yonghu', 'F4109DE3F98D34CA', '0', 'yonghu', '2', '1');

-- ----------------------------
-- Table structure for `user_info_detail`
-- ----------------------------
DROP TABLE IF EXISTS `user_info_detail`;
CREATE TABLE `user_info_detail` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `userSex` varchar(1) DEFAULT NULL COMMENT '用户性别',
  `userAge` int(3) DEFAULT NULL COMMENT '用户年龄',
  `registerTime` varchar(10) DEFAULT NULL COMMENT '注册时间',
  `userId` int(11) DEFAULT NULL,
  `userPhone` varchar(20) DEFAULT NULL COMMENT '用户电话',
  `userName` varchar(50) DEFAULT NULL COMMENT '用户名称',
  `userDetail` varchar(2000) DEFAULT NULL COMMENT '用户备注',
  `userDoc` varchar(200) DEFAULT NULL COMMENT '用户附件',
  `danwei` varchar(50) DEFAULT NULL,
  `bumen` varchar(50) DEFAULT NULL,
  `zhiwei` varchar(60) DEFAULT NULL,
  `idcard` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info_detail
-- ----------------------------
INSERT INTO `user_info_detail` VALUES ('1', '男', '22', '2025-03-20', '1', '13517263258', '系统管理员', '本系统的超级管理员，拥有最大权限', '', '无', '无', '无', '110***************');
INSERT INTO `user_info_detail` VALUES ('12', '男', '20', '2025-03-26', '2', '', 'yuangong1', '', '', null, '', '', '');
INSERT INTO `user_info_detail` VALUES ('13', '男', null, '2025-03-30', '3', '', 'jym', '', '', null, '', '', '');
INSERT INTO `user_info_detail` VALUES ('14', '男', null, '2025-03-30', '4', '', 'csyg', '', '', null, '', '', '');
INSERT INTO `user_info_detail` VALUES ('15', '男', null, '2025-03-30', '5', '', 'yuangong2', '', '', null, '', '', '');
INSERT INTO `user_info_detail` VALUES ('16', '男', null, '2025-04-17', '6', '', 'admins', '', '', null, '', '', '');
INSERT INTO `user_info_detail` VALUES ('17', '男', null, '2025-04-17', '7', '', 'admins', '', '', null, '', '', '');
INSERT INTO `user_info_detail` VALUES ('18', '', null, '2025-04-19', '8', '', 'admin', '', '', null, null, null, null);
INSERT INTO `user_info_detail` VALUES ('19', '男', null, '2025-05-12', '9', '', 'yonghu', '', '', null, '', '', '');

-- ----------------------------
-- Table structure for `user_menu`
-- ----------------------------
DROP TABLE IF EXISTS `user_menu`;
CREATE TABLE `user_menu` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户ID',
  `menu_id` int(11) NOT NULL DEFAULT '0' COMMENT '菜单ID',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1121 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_menu
-- ----------------------------
INSERT INTO `user_menu` VALUES ('820', '3', '24');
INSERT INTO `user_menu` VALUES ('821', '3', '20');
INSERT INTO `user_menu` VALUES ('822', '3', '25');
INSERT INTO `user_menu` VALUES ('938', '5', '84');
INSERT INTO `user_menu` VALUES ('939', '5', '51');
INSERT INTO `user_menu` VALUES ('940', '5', '85');
INSERT INTO `user_menu` VALUES ('941', '5', '86');
INSERT INTO `user_menu` VALUES ('945', '6', '92');
INSERT INTO `user_menu` VALUES ('946', '6', '91');
INSERT INTO `user_menu` VALUES ('1022', '8', '85');
INSERT INTO `user_menu` VALUES ('1023', '8', '51');
INSERT INTO `user_menu` VALUES ('1024', '8', '86');
INSERT INTO `user_menu` VALUES ('1039', '7', '85');
INSERT INTO `user_menu` VALUES ('1040', '7', '51');
INSERT INTO `user_menu` VALUES ('1041', '7', '86');
INSERT INTO `user_menu` VALUES ('1042', '7', '84');
INSERT INTO `user_menu` VALUES ('1043', '7', '100');
INSERT INTO `user_menu` VALUES ('1044', '9', '86');
INSERT INTO `user_menu` VALUES ('1045', '9', '51');
INSERT INTO `user_menu` VALUES ('1046', '10', '70');
INSERT INTO `user_menu` VALUES ('1047', '10', '58');
INSERT INTO `user_menu` VALUES ('1073', '1', '2');
INSERT INTO `user_menu` VALUES ('1074', '1', '1');
INSERT INTO `user_menu` VALUES ('1075', '1', '105');
INSERT INTO `user_menu` VALUES ('1076', '1', '41');
INSERT INTO `user_menu` VALUES ('1077', '1', '50');
INSERT INTO `user_menu` VALUES ('1078', '1', '49');
INSERT INTO `user_menu` VALUES ('1079', '1', '85');
INSERT INTO `user_menu` VALUES ('1080', '1', '51');
INSERT INTO `user_menu` VALUES ('1081', '1', '86');
INSERT INTO `user_menu` VALUES ('1082', '1', '66');
INSERT INTO `user_menu` VALUES ('1083', '1', '58');
INSERT INTO `user_menu` VALUES ('1084', '1', '70');
INSERT INTO `user_menu` VALUES ('1085', '1', '83');
INSERT INTO `user_menu` VALUES ('1086', '1', '80');
INSERT INTO `user_menu` VALUES ('1087', '1', '89');
INSERT INTO `user_menu` VALUES ('1088', '1', '87');
INSERT INTO `user_menu` VALUES ('1089', '1', '69');
INSERT INTO `user_menu` VALUES ('1090', '1', '90');
INSERT INTO `user_menu` VALUES ('1091', '1', '101');
INSERT INTO `user_menu` VALUES ('1092', '1', '102');
INSERT INTO `user_menu` VALUES ('1093', '1', '84');
INSERT INTO `user_menu` VALUES ('1094', '1', '100');
INSERT INTO `user_menu` VALUES ('1095', '1', '109');
INSERT INTO `user_menu` VALUES ('1096', '1', '107');
INSERT INTO `user_menu` VALUES ('1097', '1', '1031');
INSERT INTO `user_menu` VALUES ('1098', '1', '1030');
INSERT INTO `user_menu` VALUES ('1099', '11', '85');
INSERT INTO `user_menu` VALUES ('1100', '11', '51');
INSERT INTO `user_menu` VALUES ('1101', '11', '86');
INSERT INTO `user_menu` VALUES ('1102', '11', '66');
INSERT INTO `user_menu` VALUES ('1103', '11', '58');
INSERT INTO `user_menu` VALUES ('1104', '11', '70');
INSERT INTO `user_menu` VALUES ('1105', '2', '17');
INSERT INTO `user_menu` VALUES ('1106', '2', '15');
INSERT INTO `user_menu` VALUES ('1107', '2', '70');
INSERT INTO `user_menu` VALUES ('1108', '2', '58');
INSERT INTO `user_menu` VALUES ('1109', '2', '1031');
INSERT INTO `user_menu` VALUES ('1110', '2', '1030');
INSERT INTO `user_menu` VALUES ('1111', '4', '86');
INSERT INTO `user_menu` VALUES ('1112', '4', '51');
INSERT INTO `user_menu` VALUES ('1113', '4', '66');
INSERT INTO `user_menu` VALUES ('1114', '4', '58');
INSERT INTO `user_menu` VALUES ('1115', '4', '70');
INSERT INTO `user_menu` VALUES ('1116', '9', '1038');
INSERT INTO `user_menu` VALUES ('1117', '9', '1039');
INSERT INTO `user_menu` VALUES ('1118', '9', '200');
INSERT INTO `user_menu` VALUES ('1119', '9', '201');
INSERT INTO `user_menu` VALUES ('1120', '9', '202');

-- ----------------------------
-- Table structure for `wenzhangguanli`
-- ----------------------------
DROP TABLE IF EXISTS `wenzhangguanli`;
CREATE TABLE `wenzhangguanli` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `wenzhangbiaoti` varchar(100) DEFAULT NULL COMMENT '文章标题',
  `fubiaoti` varchar(100) DEFAULT NULL COMMENT '副标题',
  `zhengwen` varchar(2000) DEFAULT NULL COMMENT '正文',
  `luokuan` varchar(200) DEFAULT NULL COMMENT '落款',
  `suoshulanmu` varchar(100) DEFAULT NULL COMMENT '所属栏目',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wenzhangguanli
-- ----------------------------
INSERT INTO `wenzhangguanli` VALUES ('1', '网站正式上线', '----热烈庆祝网站开通！', '本网站于2013-01-01正式开通啦，欢迎大家访问！', '站长：***', '网站公告', '1', '2025-03-20 10:53:19', '', '0');
INSERT INTO `wenzhangguanli` VALUES ('2', '网站访问量超10000', '可喜可贺！', '本网站访问量超100000人/次，可喜可贺！', 'admin', '活动促销', '1', '2025-03-20 10:53:19', '', '0');
INSERT INTO `wenzhangguanli` VALUES ('3', '网站计划融资1000W', '信息爆炸啦。', '本网站计划融资100W美元，或国际风投商关注。', 'admin', '店长推荐', '1', '2025-03-20 10:53:19', '', '0');
INSERT INTO `wenzhangguanli` VALUES ('5', '使用手册', '使用手册', '使用手册', '使用手册', '团购信息', '1', '2025-03-20 10:53:19', '使用手册', '1');

-- ----------------------------
-- Table structure for `wodepinglunxinxi`
-- ----------------------------
DROP TABLE IF EXISTS `wodepinglunxinxi`;
CREATE TABLE `wodepinglunxinxi` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `pinglunid` varchar(50) DEFAULT NULL COMMENT '评论ID',
  `pinglunbiaoti` varchar(50) DEFAULT NULL COMMENT '评论标题',
  `pingfendengji` varchar(50) DEFAULT NULL COMMENT '评分等级',
  `pinglunnarong` varchar(2000) DEFAULT NULL COMMENT '评论内容',
  `pinglunren` varchar(50) DEFAULT NULL COMMENT '评论人',
  `pinglunshijian` varchar(50) DEFAULT NULL COMMENT '评论时间',
  `fuJian` varchar(200) DEFAULT NULL COMMENT '附件路径',
  `tuPian` varchar(200) DEFAULT NULL COMMENT '图片ID',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  `attr1` varchar(100) DEFAULT NULL COMMENT '扩展字段1',
  `attr2` varchar(100) DEFAULT NULL COMMENT '扩展字段2',
  `attr3` varchar(100) DEFAULT NULL COMMENT '扩展字段3',
  `attr4` varchar(100) DEFAULT NULL COMMENT '扩展字段4',
  `attr5` varchar(100) DEFAULT NULL COMMENT '扩展字段5',
  `erjiguanlianzd` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wodepinglunxinxi
-- ----------------------------
INSERT INTO `wodepinglunxinxi` VALUES ('7', '订单', null, null, '订单', 'guest', '2025-03-20 11:43:47', null, null, '-1', '2025-03-20 11:43:47', null, '0', null, null, null, null, null, null);
INSERT INTO `wodepinglunxinxi` VALUES ('8', '康师傅被传全线涨价', null, null, '谢谢分享', 'admin', '2025-03-20 11:43:47', null, null, '1', '2025-03-20 11:43:47', null, '0', null, null, null, null, null, null);

-- ----------------------------
-- Table structure for `xiaoshoutubiaotongji`
-- ----------------------------
DROP TABLE IF EXISTS `xiaoshoutubiaotongji`;
CREATE TABLE `xiaoshoutubiaotongji` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `tongjishijian` varchar(50) DEFAULT NULL COMMENT '统计时间',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xiaoshoutubiaotongji
-- ----------------------------

-- ----------------------------
-- Table structure for `xiaoshouxinxi`
-- ----------------------------
DROP TABLE IF EXISTS `xiaoshouxinxi`;
CREATE TABLE `xiaoshouxinxi` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `xiaoshoudanhao` varchar(50) DEFAULT NULL COMMENT '销售单号',
  `jingshouren` varchar(50) DEFAULT NULL COMMENT '经手人',
  `xiaofeijine` varchar(50) DEFAULT NULL COMMENT '消费金额',
  `huiyuanbianhao` varchar(50) DEFAULT NULL COMMENT '会员编号',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xiaoshouxinxi
-- ----------------------------
INSERT INTO `xiaoshouxinxi` VALUES ('1', '20240229200859', 'admin', '407.50', '', '1', '2025-03-30 19:20:44 ', '', '0');
INSERT INTO `xiaoshouxinxi` VALUES ('2', '20240317200659', 'admin', '350.00', '', '1', '2025-03-30 19:20:58 ', '', '0');
INSERT INTO `xiaoshouxinxi` VALUES ('3', '20240318115415', 'admin', '35.00', '78452', '1', '2025-04-18 13:43:07 ', '', '0');
INSERT INTO `xiaoshouxinxi` VALUES ('4', '20240321233047', 'admin', '350.00', '13987658908', '1', '2025-03-30 19:21:26 ', '', '0');
INSERT INTO `xiaoshouxinxi` VALUES ('5', '20240321233137', 'admin', '7.00', '13987658908', '1', '2025-03-23 23:31:50 ', '', '1');
INSERT INTO `xiaoshouxinxi` VALUES ('6', '20250328132258', 'yuangong1', '3.50', 'ghgj', '2', '2025-03-28 13:23:52 ', '', '1');
INSERT INTO `xiaoshouxinxi` VALUES ('7', '20250328133017', 'admin', '1500.00', '', '1', '2025-03-30 19:21:35 ', '', '0');
INSERT INTO `xiaoshouxinxi` VALUES ('8', '20250330182150', 'admin', '0.00', '', '1', '2025-03-30 18:22:49 ', '', '1');
INSERT INTO `xiaoshouxinxi` VALUES ('9', '20250330182559', 'admin', '200.00', '', '1', '2025-03-30 18:26:20 ', '', '1');
INSERT INTO `xiaoshouxinxi` VALUES ('10', '20250330183137', 'admin', '23.50', '', '1', '2025-03-30 19:21:42 ', '', '1');
INSERT INTO `xiaoshouxinxi` VALUES ('11', '20250330195934', 'csyg', '150.00', '', '4', '2025-03-30 19:59:44 ', '', '0');
INSERT INTO `xiaoshouxinxi` VALUES ('12', '20250401140314', 'admin', '200.00', '', '1', '2025-04-01 14:03:36 ', '', '1');
INSERT INTO `xiaoshouxinxi` VALUES ('13', '20250401140517', 'yuangong1', '200.00', '', '2', '2025-05-14 20:57:13 ', '', '0');

-- ----------------------------
-- Table structure for `xiaoshouxinxi_mingxi`
-- ----------------------------
DROP TABLE IF EXISTS `xiaoshouxinxi_mingxi`;
CREATE TABLE `xiaoshouxinxi_mingxi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `xiaoshoudanhao` varchar(50) DEFAULT NULL,
  `huohao` varchar(50) DEFAULT NULL,
  `shuliang` varchar(50) DEFAULT NULL,
  `danjia` varchar(50) DEFAULT NULL,
  `xiaoji` varchar(50) DEFAULT NULL,
  `beizhu` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xiaoshouxinxi_mingxi
-- ----------------------------
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('7', '20240321233137', 'SP-00001', '2', '3.5', '7.00', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('8', '20240322212140', 'SP-00001', '1', '3.5', '3.50', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('9', '20240322214513', 'SP-00001', '2', '3.5', '7.00', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('10', '20240410144406', 'SP-00001', '1', '3.5', '3.50', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('11', '20240410145324', 'SP-00001', '10', '3.5', '35.00', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('12', '20240416141008', 'SP-00001', '10', '3.5', '35.00', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('13', '20240416141503', 'SP-00001', '10', '3.5', '35.00', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('14', '20240426104624', 'SP-00001', '105', '3.5', '367.50', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('15', '20240426104624', 'SP-00002', '1', '4', '4.00', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('20', '20250328132258', 'SP-00001', '1', '3.5', '3.50', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('26', '20250330182150', 'DG-00002', '10', '0', '0.00', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('31', '20250330182559', 'DG-00002', '10', '20', '200.00', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('42', '20240229200859', 'SP-00002', '101', '4', '404.00', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('43', '20240229200859', 'SP-00001', '1', '3.5', '3.50', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('44', '20240317200659', 'SP-00001', '100', '3.5', '350.00', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('46', '20240321233047', 'SP-00001', '100', '3.5', '350.00', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('47', '20250328133017', 'efsrdg', '100', '15', '1500.00', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('48', '20250330183137', 'DG-00002', '1', '20', '20.00', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('49', '20250330183137', 'SP-00001', '1', '3.5', '3.50', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('51', '20250330195934', 'efsrdg', '10', '15', '150.00', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('52', '20250401140314', 'DG-00002', '10', '20', '200.00', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('54', '20240318115415', 'SP-00001', '10', '3.5', '35.00', '');
INSERT INTO `xiaoshouxinxi_mingxi` VALUES ('56', '20250401140517', 'DG-00002', '10', '20', '200.00', '');

-- ----------------------------
-- Table structure for `xinxifabu`
-- ----------------------------
DROP TABLE IF EXISTS `xinxifabu`;
CREATE TABLE `xinxifabu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `mingchenbiaoti` varchar(200) DEFAULT NULL COMMENT '名称标题',
  `suoshufenlei` varchar(200) DEFAULT NULL COMMENT '所属分类',
  `miaoshuyi_d` varchar(30) DEFAULT NULL COMMENT '相关描述名称',
  `miaoshuyi` varchar(200) DEFAULT NULL COMMENT '描述一',
  `miaoshuer_d` varchar(30) DEFAULT NULL COMMENT '相关描述名称',
  `miaoshuer` varchar(200) DEFAULT NULL COMMENT '描述二',
  `miaoshusan_d` varchar(30) DEFAULT NULL COMMENT '相关描述名称',
  `miaoshusan` varchar(200) DEFAULT NULL COMMENT '描述三',
  `miaoshusi_d` varchar(30) DEFAULT NULL COMMENT '相关描述名称',
  `miaoshusi` varchar(200) DEFAULT NULL COMMENT '描述四',
  `miaoshuwu_d` varchar(30) DEFAULT NULL COMMENT '相关描述名称',
  `miaoshuwu` varchar(200) DEFAULT NULL COMMENT '描述五',
  `faburen` varchar(50) DEFAULT NULL COMMENT '发布人',
  `fabushijian` varchar(50) DEFAULT NULL COMMENT '发布时间',
  `xiangqingmiaoshu` longtext COMMENT '详情描述',
  `shenpi` varchar(50) DEFAULT NULL COMMENT '审批状态',
  `fuJian` varchar(200) DEFAULT NULL COMMENT '附件路径',
  `tuPian` varchar(200) DEFAULT NULL COMMENT '图片ID',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  `attr1` varchar(100) DEFAULT NULL COMMENT '扩展字段1',
  `attr2` varchar(100) DEFAULT NULL COMMENT '扩展字段2',
  `attr3` varchar(100) DEFAULT NULL COMMENT '扩展字段3',
  `attr4` varchar(100) DEFAULT NULL COMMENT '扩展字段4',
  `attr5` varchar(100) DEFAULT NULL COMMENT '扩展字段5',
  `erjiguanlianzd` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xinxifabu
-- ----------------------------
INSERT INTO `xinxifabu` VALUES ('5', '康师傅被传全线涨价', '新闻资讯', '信息来源', '腾讯网', '推荐指数', '5星', '责任编辑', '小超', '是否原创', '否', '其他', '', 'admin', '2025-03-20', '<p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">“康师傅方便面即将全线涨价”的消息传出。康师傅淘宝、京东官方旗舰店客服人员回应称，目前尚未接到相关通知。截至发稿，时代财经暂未从康师傅方面得到回应。</p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">不过，时代财经从一位据称是康师傅业务员的人士处了解到，康师傅袋装和经典桶方便面确实存在涨价动作。据其对了解，目前公司内部还没有正式公告发出，但是有了大致的方向，“袋装面建议零售价由2.8元提升至3元，经典桶由4.5元提升至5元。目前先让下游零售商提升售价，供货价过段时间才会调整。”</p><p style=\"margin-top: 1em; margin-bottom: 1em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2em; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-align: center;\"><img src=\"https://res.jnnews.tv/a/10001/202405/26ffa9d7c5043e5319e55260a870b018.jpeg\" data-mce-src=\"https://res.jnnews.tv/a/10001/202405/26ffa9d7c5043e5319e55260a870b018.jpeg\" data-origin-src=\"https://res.jnnews.tv/a/10001/202405/26ffa9d7c5043e5319e55260a870b018.jpeg\" data-mce-attachid=\"5138585\" data-mce-alias=\"e2e88ec0e3d2aea42bc5dac1206da0d0.jpeg\" style=\"vertical-align: top; border: none; max-width: 640px;\"/></p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-align: center;\">图片来源：受访者供图</p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">郑嵘在某二线城市经营着一家超市，他告诉时代财经，目前，康师傅全新包装方便面已经上市。</p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">据他介绍，一周前进货的康师傅袋装方便面已经更换了包装，在原来的包装基础上加印“升级啦，鸡蛋和面更爽滑，蔬菜加量更有料”的标语，包装的左下角也打上了“建议零售价3.0元”的字样。而此前，康师傅袋装和桶装面在其超市里的售价分别为2.8元和4.5元。</p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">今年一季度，康师傅已经对旗下1L装饮料进行提价，目前郑嵘压缩自己的利润空间仍维持原价销售，但他表示，如果厂商对方便面涨价，他也会跟涨，“因为利润太低了”。</p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\"><strong style=\"margin: 0px; padding: 0px;\">临期换新增多，方便面卖不动了？</strong></p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">近年来，康师傅的业绩压力越来越大。财报数据显示，康师傅控股（00322.HK）2021年-2023年的营收增速分别为9.56%、6.26%和2.16%。</p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">2023年，随着消费者居家时间减少，对方便面的刚性需求降低，方便面巨头的业绩受到影响。尽管康师傅控股2023年收益同比上升2.16%至804.18亿元，但这主要来自饮品业务收益5.39%的同比增长，其方便面业务收益同比下滑2.84%。</p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">另一行业巨头统一也遇到类似情况，在2023年全年收益提升的背景下，统一企业中国（00220.HK）食品业务录得10.6%的降幅，其中方便面收益缩水超10亿元。</p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">方便面“卖不动了”这一认知在终端感受尤为明显。郑嵘理货的时候就发现，自家超市内方便面临期的情况越来越普遍。一般情况下，销量出现持续下滑时，商家往往会做出两个选择，一是通过降价刺激销量，二是通过涨价提升忠实消费人群的客单价。而眼下，康师傅更倾向于后者。</p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">此外，康师傅方便面涨价的另一原因或是为了弥补售后压力增大带来的成本增加。据上述业务员介绍，康师傅免费为商家提供临期方便面换新的售后服务，这一服务自2023年以来需求量增大。</p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">该业务员表示，康师傅方便面涨价的原因一方面是对标行业同系列产品，今麦郎、白象的桶面都是5元或以上；另一方面就是公司的费用增加，尤其是更换临期产品带来的较大售后压力。2023年，康师傅分销成本为178.83亿元，上年同期为168.10亿元。</p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">据郑嵘回忆，此前自己店里几乎没有康师傅方便面过期退换的情况，但是从去年开始，经常出现临期需要换货，“目前方便面销量下滑，基本每个店都有过期退换的情况发生，换货量还不小，这会给品牌带来较高的成本。”</p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\"><strong style=\"margin: 0px; padding: 0px;\">康师傅涨价后，渠道转投娃哈哈们</strong></p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">近年来，康师傅已经多次对方便面价格做出调整。</p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">2021年，康师傅对旗下20%的方便面产品进行提价；2022年，其对袋装、5袋装、经典桶和mini杯进行调价，袋装方便面由2.5元上涨至2.8元，5袋装由12.5元上涨至14元，经典桶由4元涨至4.5元，mini杯由3元涨至3.5元。同年，康师傅方便面收益同比上升4.17%。</p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">2023年，康师傅对饮料业务“故技重施”。去年11月，一张康师傅对茶/果汁涨价的告知函在网络流出，彼时康师傅客服回应，这是出于原材料、用工成本上涨等原因。今年一季度，康师傅正式对旗下1L装茶/果汁饮料提价，包括冰红茶、绿茶、茉莉蜜茶等，零售价由4元涨至5元，并推出新包装，瓶身同样印上“建议零售价5.0元”的字样。</p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">这一方面能够提升企业毛利，另一方面也在短期内对企业库存的消耗起到推动作用。郑嵘告诉时代财经，去年年底其就从经销商处得知康师傅1L瓶装饮料涨价的消息，他也因此加大进货量，多囤了上百件。</p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">不过，为了稳住顾客，郑嵘超市的康师傅1L装饮料的销售价仍然维持在4元/瓶。他表示，之前1L冰红茶一瓶能赚1块多，但是一件（12瓶）的进货价由35.36元涨至40元、甚至41元后，利润几乎可以忽略不计，“现在都太卷了，只能压缩自己的利润空间。”</p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">但他也提及，后续超市进货会向娃哈哈、统一等未涨价的品牌倾斜。同样的情况也发生在量贩零食渠道，除了经营超市，郑嵘也是量贩零食品牌零食很忙的加盟商。他透露，今年2月前后，零食很忙系统也因进货价上涨，下架了康师傅1L瓶装饮料。</p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">郑嵘表示，如果这次康师傅方便面进价上涨，超市零售价也会跟涨，因为一包方便面的利润只有5毛钱。</p><p style=\"margin-top: 2em; margin-bottom: 2em; padding: 0px; font-variant-numeric: normal; font-variant-east-asian: normal; font-stretch: normal; font-size: 18px; line-height: 2; font-family: 微软雅黑; color: rgb(15, 15, 15); white-space: normal; background-color: rgb(255, 255, 255); text-indent: 2em; text-align: justify;\">康师傅的涨价行为显然会带来消费者、经销商和零售商对康师傅新价格体系的重新审视，而他们也将视自己的利益投出一票。</p><p><br/></p>', '审批通过', '', '202405201101121', '1', '2025-03-20 11:43:47', '', '0', '23', null, null, null, null, '');
INSERT INTO `xinxifabu` VALUES ('6', '逛超市切记“5不买”', '购物须知', '信息来源', '超市内容', '推荐指数', '5星', '责任编辑', '小超', '是否原创', '是', '其他', '', 'admin', '2025-03-20', '<p><span class=\"bjh-p\" style=\"overflow-y: auto; max-width: 100%;\">走进超市，每个走道都像是个宝藏地图，让人忍不住想一探究竟。谁能抵挡那些大喇叭广播的“今日特价”和满眼的“买一送一”呢？但别忘了，这些诱人的标签背后，其实是超市精心设计的战术，让你不知不觉中就多拿几样，特别是那些他们急着要清掉的货。</span></p><p><span class=\"bjh-p\" style=\"overflow-y: auto; max-width: 100%;\"><br/></span></p><p><img src=\"https://pics3.baidu.com/feed/810a19d8bc3eb135b27e043360f649deff1f44f7.jpeg@f_auto?token=2e2200d489d54c22a71dab37e59e22d5\" width=\"640\" class=\"_1g4Ex _1i_Oe\" style=\"border: 1px solid rgba(0, 0, 0, 0.05); width: 699.812px; border-radius: 13px;\"/></p><p><br/></p><p><span class=\"bjh-p\" style=\"overflow-y: auto; max-width: 100%;\">超市的折扣游戏，其实是个双刃剑。我们都爱好事，尤其是感觉自己捡到便宜货的时候，那满满的成就感啊！但你有没有想过，为什么那些商品总是在打折？其实，这里面有很多小动作和计算，目的就是要让你的购物车和花费齐飞。</span></p><p><span class=\"bjh-p\" style=\"overflow-y: auto; max-width: 100%;\"><br/></span></p><p><img src=\"https://pics0.baidu.com/feed/2f738bd4b31c87012a27657fe2977f220508ff89.jpeg@f_auto?token=fc6ba87b5a00512e64231249c298d03b\" width=\"640\" class=\"_1g4Ex _1i_Oe\" style=\"border: 1px solid rgba(0, 0, 0, 0.05); width: 699.812px; border-radius: 13px;\"/></p><p><br/></p><p><span class=\"bjh-p\" style=\"overflow-y: auto; max-width: 100%;\">不过，话说回来，我这有个小道消息，来自超市的幕后英雄们——很多那些“看起来很划算”的商品，实际上可能是个坑。这些信息不是空穴来风，而是真真切切的小秘密。接下来，我会透露给你“5不买”的秘诀，教你在这些看似诱人的折扣前，怎样才能聪明选择，保护好自己的钱包。因为，有时候那些便宜货背后其实是个让你花更多的陷阱。</span></p><p><br/></p>', '审批通过', '', '202405201202094', '1', '2025-03-23 19:05:30 ', '', '0', '8', null, null, null, null, '');
INSERT INTO `xinxifabu` VALUES ('7', '美味烧烤，全场优惠', '购物须知', '信息来源', '', '推荐指数', '', '责任编辑', '', '是否原创', '', '其他', '', 'admin', '2025-03-30', '<p>特色烤肉，美味可口</p><p><img src=\"http://localhost/UploadFile/202503301551506/food.jpg\"/></p>', '审批通过', '', '202503301551506', '1', '2025-03-30 16:26:05 ', '', '0', '1', null, null, null, null, '');
INSERT INTO `xinxifabu` VALUES ('8', 'HFG', 'HFTGMK', '信息来源', '', '推荐指数', '', '责任编辑', '', '是否原创', '', '其他', '', 'yuangong1', '2025-03-30', '', '待审批', '', null, '2', '2025-03-30 19:54:13 ', '', '0', null, null, null, null, null, '');

-- ----------------------------
-- Table structure for `xinxifabu_view`
-- ----------------------------
DROP TABLE IF EXISTS `xinxifabu_view`;
CREATE TABLE `xinxifabu_view` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_acct` varchar(50) DEFAULT NULL,
  `item_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xinxifabu_view
-- ----------------------------
INSERT INTO `xinxifabu_view` VALUES ('13', '3333', '8');
INSERT INTO `xinxifabu_view` VALUES ('14', 'admin', '6');
INSERT INTO `xinxifabu_view` VALUES ('15', 'admin', '8');
INSERT INTO `xinxifabu_view` VALUES ('16', '1111', '6');
INSERT INTO `xinxifabu_view` VALUES ('17', '1111', '8');
INSERT INTO `xinxifabu_view` VALUES ('18', 'admin', '10');
INSERT INTO `xinxifabu_view` VALUES ('19', '1111', '10');
INSERT INTO `xinxifabu_view` VALUES ('20', 'admin', '11');
INSERT INTO `xinxifabu_view` VALUES ('21', 'admin', '9');
INSERT INTO `xinxifabu_view` VALUES ('22', '1111', '11');
INSERT INTO `xinxifabu_view` VALUES ('23', '1111', '9');
INSERT INTO `xinxifabu_view` VALUES ('24', 'admin', '1');
INSERT INTO `xinxifabu_view` VALUES ('25', 'admin', '2');
INSERT INTO `xinxifabu_view` VALUES ('26', '1111', '2');
INSERT INTO `xinxifabu_view` VALUES ('27', 'admin', '3');
INSERT INTO `xinxifabu_view` VALUES ('28', '1111', '1');
INSERT INTO `xinxifabu_view` VALUES ('29', 'admin', '5');
INSERT INTO `xinxifabu_view` VALUES ('30', 'admin', '7');
INSERT INTO `xinxifabu_view` VALUES ('31', 'yonghu', '5');

-- ----------------------------
-- Table structure for `zidongcaigoudan`
-- ----------------------------
DROP TABLE IF EXISTS `zidongcaigoudan`;
CREATE TABLE `zidongcaigoudan` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `shangpinmingcheng` varchar(50) DEFAULT NULL COMMENT '商品名称',
  `huohao` varchar(50) DEFAULT NULL COMMENT '货号',
  `shangpinleixing` varchar(50) DEFAULT NULL COMMENT '商品类型',
  `gongyingshang` varchar(50) DEFAULT NULL COMMENT '供应商',
  `chengyunshang` varchar(50) DEFAULT NULL COMMENT '承运商',
  `danjia` varchar(50) DEFAULT NULL COMMENT '采购单价',
  `caigouriqi` varchar(50) DEFAULT NULL COMMENT '采购日期',
  `caigouren` varchar(50) DEFAULT NULL COMMENT '采购人',
  `shuliang` varchar(50) DEFAULT NULL COMMENT '采购量',
  `kucunliang` varchar(50) DEFAULT NULL COMMENT '库存量',
  `operatorId` varchar(20) DEFAULT NULL COMMENT '操作人ID',
  `itime` varchar(20) DEFAULT NULL COMMENT '操作时间',
  `detail` varchar(1000) DEFAULT NULL COMMENT '备注',
  `deleteFlag` int(1) DEFAULT '0' COMMENT '删除标识（0：正常；1：删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zidongcaigoudan
-- ----------------------------
