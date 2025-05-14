package app.sysManage.setting;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Scanner;
import java.util.Set;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibatis.sqlmap.client.SqlMapClient;

import app.pub.database.IbatisUtil;
import app.pub.database.SqlTool;
import app.pub.sysInfo.SysInfo;

public class OrderTool {
	
	
	
	public static ArrayList orderByRecommend(SqlMapClient sqlMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		Connection conn = null ;
		
		try {
			conn = sqlMap.getCurrentConnection() ;
			ArrayList allRecommend = new ArrayList() ;
			ArrayList returnList = new ArrayList() ;
			
			//获取资讯浏览用户总量
			int N = 0 ;
			String sql = "select user_acct , count(*)  from xinxifabu_view group by user_acct " ;
			ArrayList al= SqlTool.getMultDoc(sql, conn);
			if( al != null && al.size() > 0 ) {
				N = al.size() ;
			}
			
			if( N != 0 ) {
				int[][] sparseMatrix = new int[N][N];
				// 建立用户稀疏矩阵，用于用户相似度计算【相似度矩阵】
				Map<String, Integer> userItemLength = new HashMap<>();
				// 存储每一个用户对应的不同资讯总数 
				Map<String, Set<String>> itemUserCollection = new HashMap<>();
				// 建立资讯到用户的倒排表 
				Set<String> items = new HashSet<>();
				// 辅助存储资讯集合
				Map<String, Integer> userID = new HashMap<>();
				// 辅助存储每一个用户的用户ID映射
				Map<Integer, String> idUser = new HashMap<>();
				
				//得到所有用户的浏览情况
				sql = "select user_acct ,item_id from xinxifabu_view order by user_acct , item_id " ;
				al = SqlTool.getMultDoc(sql, conn);
				
				String[] userViewStrList = new String[ N ];
				for( int i = 0 ; i < userViewStrList.length ; i ++ ) {
					userViewStrList[ i ] = "" ;
				}
				String firstUserAcct = ((Properties)(al.get(0))).getProperty("user_acct").toString();
				int index = 0 ;
				for( int i = 0 ; i < al.size() ; i ++ ) {
					String nowUser =  ((Properties)(al.get(i))).getProperty("user_acct").toString();
					String nowItem =  ((Properties)(al.get(i))).getProperty("item_id").toString();
					if( firstUserAcct.equals(nowUser) ) {
						if( userViewStrList[ index ].equals("") ) {
							userViewStrList[ index ] = nowUser + " " + nowItem ;
						}else {
							userViewStrList[ index ] = userViewStrList[ index ] + " " + nowItem ;
						}
					}else {
						index ++ ;
						firstUserAcct = nowUser ;
						i -- ;
					}
				}
				
				for (int i = 0; i < N; i++) {
					// 依次处理N个用户 输入数据 以空格间隔
					String[] user_item = userViewStrList[ i ].split(" ");
					int length = user_item.length;
					userItemLength.put(user_item[0], length - 1);
					userID.put(user_item[0], i);
					// 用户ID与稀疏矩阵建立对应关系
					idUser.put(i, user_item[0]);
					// 建立资讯--用户倒排表
					for (int j = 1; j < length; j++) {
						if (items.contains(user_item[j])) {
							// 如果已经包含对应的资讯--用户映射，直接添加对应的用户
							itemUserCollection.get(user_item[j]).add(user_item[0]);
						} else {
							// 否则创建对应资讯--用户集合映射
							items.add(user_item[j]);
							itemUserCollection.put(user_item[j], new HashSet<String>());
							// 创建资讯--用户倒排关系
							itemUserCollection.get(user_item[j]).add(user_item[0]);
						}
					}
				}
				
				System.out.println( "\n\n\n\n资讯浏览情况汇总：" + itemUserCollection.toString());
				
				// 计算相似度矩阵【稀疏】
				Set<Entry<String, Set<String>>> entrySet = itemUserCollection.entrySet();
				Iterator<Entry<String, Set<String>>> iterator = entrySet.iterator();
				while (iterator.hasNext()) {
					Set<String> commonUsers = iterator.next().getValue();
					for (String user_u : commonUsers) {
						for (String user_v : commonUsers) {
							if (user_u.equals(user_v)) {
								continue;
							}
							// 计算用户u与用户v都有正反馈的相关资讯总数
							sparseMatrix[userID.get(user_u)][userID.get(user_v)] += 1;
						}
					}
				}
				System.out.println( "\n相似度矩阵【稀疏】 : " + userItemLength.toString());
				
				//得到推荐人帐号
				String recommendUser = SysInfo.getLoginUserAcct4Front(request, response);
				
				System.out.println();
				
				// 计算用户之间的相似度【余弦相似性】
				if( userID == null || userID.isEmpty() || userID.size() == 0 || userID.get(recommendUser) == null ) {
					System.out.println( "该用户没有浏览记录，无法推荐！" );
					return null;
				}
				int recommendUserId = userID.get(recommendUser);
				for (int j = 0; j < sparseMatrix.length; j++) {
					if (j != recommendUserId) {
						System.out.println( "推荐人和" + idUser.get(j) + "的相似度：" + sparseMatrix[recommendUserId][j] / Math.sqrt(userItemLength.get(idUser.get(recommendUserId)) * userItemLength.get(idUser.get(j))));
					}
				}
				
				System.out.println();
				
				// 计算指定用户recommendUser的资讯推荐度
				for (String item : items) {
					// 遍历每一条资讯
					Set<String> users = itemUserCollection.get(item);
					// 得到浏览当前资讯的所有用户集合
					if (!users.contains(recommendUser)) {
						// 如果被推荐用户没有浏览当前资讯，则进行推荐度计算
						double itemRecommendDegree = 0.0;
						for (String user : users) {
							// 推荐度计算
							itemRecommendDegree += sparseMatrix[userID.get(recommendUser)][userID.get(user)] / Math.sqrt(userItemLength.get(recommendUser) * userItemLength.get(user));
						}
						System.out.println("ID=" + item + "的资讯，其推荐值为： " +  itemRecommendDegree);
						HashMap map = new HashMap();
						map.put("id", item);
						map.put("degree", itemRecommendDegree);
						allRecommend.add(map);
					}
				}
				
				
				//冒泡法排序
				for( int i = 1 ; i < allRecommend.size() ; i ++ ) {
					for( int j = i ; j > 0 ; j -- ) {
						float degree_2 =  Float.parseFloat( ((HashMap)(allRecommend.get(j))).get("degree").toString() ) ;
						String item_2 = ((HashMap)(allRecommend.get(j))).get("id").toString() ;
						
						float degree_1 =  Float.parseFloat( ((HashMap)(allRecommend.get(j - 1))).get("degree").toString() ) ;
						String item_1 = ((HashMap)(allRecommend.get(j - 1))).get("id").toString() ;
						if( degree_2 > degree_1 ) {
							((HashMap)(allRecommend.get(j))).put("id", item_1);
							((HashMap)(allRecommend.get(j))).put("degree", degree_1);
							((HashMap)(allRecommend.get(j-1))).put("id", item_2);
							((HashMap)(allRecommend.get(j-1))).put("degree", degree_2);
						}
					}
				}
				
				System.out.println( "\n排序后汇总为====" + allRecommend );
				
				//根据id获取所有资讯信息
				String ids = "" ;
				if( allRecommend != null && allRecommend.size() > 0 ) {
					for( int i = 0 ; i < allRecommend.size() ; i ++ ) {
						ids = ids + "," + ((HashMap)(allRecommend.get(i))).get("id").toString() ;
					}
					ids = ids.substring( 1 );
					
					sql = "select distinct id,mingchenbiaoti,suoshufenlei,miaoshuyi_d,miaoshuer_d,miaoshusan_d,miaoshusi_d,miaoshuwu_d,miaoshuyi,miaoshuer,miaoshusan,miaoshusi,miaoshuwu,faburen,fabushijian,xiangqingmiaoshu,tuPian,substring(fuJian,instr(fuJian,'/UploadFile')) as fuJian,attr1  " +
						  "from xinxifabu " +
						  "where id in ( " + ids + " ) ";
					returnList = SqlTool.getMultDoc(sql, sqlMap.getCurrentConnection());
					
					if (returnList != null && returnList.size() > 0) {
						for (int j = 0; j < returnList.size(); j++) {
							Properties tpMap = ((Properties) (returnList.get(j)));
							HashMap<String, Object> tpWhere = new HashMap<String, Object>();
							if (tpMap.get("tuPian") != null && !tpMap.get("tuPian").equals("")) {
								tpWhere.put("tuPianIndex", tpMap.get("tuPian").toString());
								List tpList = IbatisUtil.queryForList(sqlMap, request, response, tpWhere, "Util.selecteTuPianList");
								tpMap.put("tpList", tpList);
							}
						}
					}
				}
			}
			
			return returnList;
		
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception("推荐排序出错！");
		} finally {
			// 如果输出流不为空，关闭输出流
			if (conn != null) {
				//conn.close();
			}
		}
	}
	
	

	public static void main(String[] args) {
		/**
		 * 输入用户-->物品条目 一个用户对应多个物品 用户ID 物品ID集合
		  A a b d 
		  B a c 
		  C b e 
		  D c d e
		 */
		Scanner scanner = new Scanner(System.in);
		System.out.println("Input the total users number:");
		// 输入用户总量
		int N = scanner.nextInt();
		int[][] sparseMatrix = new int[N][N];
		// 建立用户稀疏矩阵，用于用户相似度计算【相似度矩阵】
		Map<String, Integer> userItemLength = new HashMap<>();
		// 存储每一个用户对应的不同物品总数 eg: A 3
		Map<String, Set<String>> itemUserCollection = new HashMap<>();
		// 建立物品到用户的倒排表 eg: a A B
		Set<String> items = new HashSet<>();
		// 辅助存储物品集合
		Map<String, Integer> userID = new HashMap<>();
		// 辅助存储每一个用户的用户ID映射
		Map<Integer, String> idUser = new HashMap<>();
		// 辅助存储每一个ID对应的用户映射
		System.out.println("Input user--items maping infermation:<eg:A a b d>");
		scanner.nextLine();
		for (int i = 0; i < N; i++) {
			// 依次处理N个用户 输入数据 以空格间隔
			String[] user_item = scanner.nextLine().split(" ");
			int length = user_item.length;
			userItemLength.put(user_item[0], length - 1);
			// eg: A 3
			userID.put(user_item[0], i);
			// 用户ID与稀疏矩阵建立对应关系
			idUser.put(i, user_item[0]);
			// 建立物品--用户倒排表
			for (int j = 1; j < length; j++) {
				if (items.contains(user_item[j])) {
					// 如果已经包含对应的物品--用户映射，直接添加对应的用户
					itemUserCollection.get(user_item[j]).add(user_item[0]);
				} else {
					// 否则创建对应物品--用户集合映射
					items.add(user_item[j]);
					itemUserCollection.put(user_item[j], new HashSet<String>());
					// 创建物品--用户倒排关系
					itemUserCollection.get(user_item[j]).add(user_item[0]);
				}
			}
		}
		System.out.println(itemUserCollection.toString());
		// 计算相似度矩阵【稀疏】
		Set<Entry<String, Set<String>>> entrySet = itemUserCollection.entrySet();
		Iterator<Entry<String, Set<String>>> iterator = entrySet.iterator();
		while (iterator.hasNext()) {
			Set<String> commonUsers = iterator.next().getValue();
			for (String user_u : commonUsers) {
				for (String user_v : commonUsers) {
					if (user_u.equals(user_v)) {
						continue;
					}
					sparseMatrix[userID.get(user_u)][userID.get(user_v)] += 1;
					// 计算用户u与用户v都有正反馈的物品总数
				}
			}
		}
		System.out.println(userItemLength.toString());
		System.out.println("Input the user for recommendation:<eg:A>");
		String recommendUser = scanner.nextLine();
		System.out.println(userID.get(recommendUser));
		// 计算用户之间的相似度【余弦相似性】
		int recommendUserId = userID.get(recommendUser);
		for (int j = 0; j < sparseMatrix.length; j++) {
			if (j != recommendUserId) {
				System.out.println(idUser.get(recommendUserId) + "--" + idUser.get(j) + "相似度:" + sparseMatrix[recommendUserId][j] / Math.sqrt(userItemLength.get(idUser.get(recommendUserId)) * userItemLength.get(idUser.get(j))));
			}
		}
		// 计算指定用户recommendUser的物品推荐度
		for (String item : items) {
			// 遍历每一件物品
			Set<String> users = itemUserCollection.get(item);
			// 得到购买当前物品的所有用户集合
			if (!users.contains(recommendUser)) {
				// 如果被推荐用户没有购买当前物品，则进行推荐度计算
				double itemRecommendDegree = 0.0;
				for (String user : users) {
					// 推荐度计算
					itemRecommendDegree += sparseMatrix[userID.get(recommendUser)][userID.get(user)] / Math.sqrt(userItemLength.get(recommendUser) * userItemLength.get(user));
				}
				System.out.println("The item " + item + " for " + recommendUser + "'s recommended degree:" + itemRecommendDegree);
			}
		}
		scanner.close();
	}

}
