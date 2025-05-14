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
			
			//��ȡ��Ѷ����û�����
			int N = 0 ;
			String sql = "select user_acct , count(*)  from xinxifabu_view group by user_acct " ;
			ArrayList al= SqlTool.getMultDoc(sql, conn);
			if( al != null && al.size() > 0 ) {
				N = al.size() ;
			}
			
			if( N != 0 ) {
				int[][] sparseMatrix = new int[N][N];
				// �����û�ϡ����������û����ƶȼ��㡾���ƶȾ���
				Map<String, Integer> userItemLength = new HashMap<>();
				// �洢ÿһ���û���Ӧ�Ĳ�ͬ��Ѷ���� 
				Map<String, Set<String>> itemUserCollection = new HashMap<>();
				// ������Ѷ���û��ĵ��ű� 
				Set<String> items = new HashSet<>();
				// �����洢��Ѷ����
				Map<String, Integer> userID = new HashMap<>();
				// �����洢ÿһ���û����û�IDӳ��
				Map<Integer, String> idUser = new HashMap<>();
				
				//�õ������û���������
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
					// ���δ���N���û� �������� �Կո���
					String[] user_item = userViewStrList[ i ].split(" ");
					int length = user_item.length;
					userItemLength.put(user_item[0], length - 1);
					userID.put(user_item[0], i);
					// �û�ID��ϡ���������Ӧ��ϵ
					idUser.put(i, user_item[0]);
					// ������Ѷ--�û����ű�
					for (int j = 1; j < length; j++) {
						if (items.contains(user_item[j])) {
							// ����Ѿ�������Ӧ����Ѷ--�û�ӳ�䣬ֱ����Ӷ�Ӧ���û�
							itemUserCollection.get(user_item[j]).add(user_item[0]);
						} else {
							// ���򴴽���Ӧ��Ѷ--�û�����ӳ��
							items.add(user_item[j]);
							itemUserCollection.put(user_item[j], new HashSet<String>());
							// ������Ѷ--�û����Ź�ϵ
							itemUserCollection.get(user_item[j]).add(user_item[0]);
						}
					}
				}
				
				System.out.println( "\n\n\n\n��Ѷ���������ܣ�" + itemUserCollection.toString());
				
				// �������ƶȾ���ϡ�衿
				Set<Entry<String, Set<String>>> entrySet = itemUserCollection.entrySet();
				Iterator<Entry<String, Set<String>>> iterator = entrySet.iterator();
				while (iterator.hasNext()) {
					Set<String> commonUsers = iterator.next().getValue();
					for (String user_u : commonUsers) {
						for (String user_v : commonUsers) {
							if (user_u.equals(user_v)) {
								continue;
							}
							// �����û�u���û�v�����������������Ѷ����
							sparseMatrix[userID.get(user_u)][userID.get(user_v)] += 1;
						}
					}
				}
				System.out.println( "\n���ƶȾ���ϡ�衿 : " + userItemLength.toString());
				
				//�õ��Ƽ����ʺ�
				String recommendUser = SysInfo.getLoginUserAcct4Front(request, response);
				
				System.out.println();
				
				// �����û�֮������ƶȡ����������ԡ�
				if( userID == null || userID.isEmpty() || userID.size() == 0 || userID.get(recommendUser) == null ) {
					System.out.println( "���û�û�������¼���޷��Ƽ���" );
					return null;
				}
				int recommendUserId = userID.get(recommendUser);
				for (int j = 0; j < sparseMatrix.length; j++) {
					if (j != recommendUserId) {
						System.out.println( "�Ƽ��˺�" + idUser.get(j) + "�����ƶȣ�" + sparseMatrix[recommendUserId][j] / Math.sqrt(userItemLength.get(idUser.get(recommendUserId)) * userItemLength.get(idUser.get(j))));
					}
				}
				
				System.out.println();
				
				// ����ָ���û�recommendUser����Ѷ�Ƽ���
				for (String item : items) {
					// ����ÿһ����Ѷ
					Set<String> users = itemUserCollection.get(item);
					// �õ������ǰ��Ѷ�������û�����
					if (!users.contains(recommendUser)) {
						// ������Ƽ��û�û�������ǰ��Ѷ��������Ƽ��ȼ���
						double itemRecommendDegree = 0.0;
						for (String user : users) {
							// �Ƽ��ȼ���
							itemRecommendDegree += sparseMatrix[userID.get(recommendUser)][userID.get(user)] / Math.sqrt(userItemLength.get(recommendUser) * userItemLength.get(user));
						}
						System.out.println("ID=" + item + "����Ѷ�����Ƽ�ֵΪ�� " +  itemRecommendDegree);
						HashMap map = new HashMap();
						map.put("id", item);
						map.put("degree", itemRecommendDegree);
						allRecommend.add(map);
					}
				}
				
				
				//ð�ݷ�����
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
				
				System.out.println( "\n��������Ϊ====" + allRecommend );
				
				//����id��ȡ������Ѷ��Ϣ
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
			throw new Exception("�Ƽ��������");
		} finally {
			// ����������Ϊ�գ��ر������
			if (conn != null) {
				//conn.close();
			}
		}
	}
	
	

	public static void main(String[] args) {
		/**
		 * �����û�-->��Ʒ��Ŀ һ���û���Ӧ�����Ʒ �û�ID ��ƷID����
		  A a b d 
		  B a c 
		  C b e 
		  D c d e
		 */
		Scanner scanner = new Scanner(System.in);
		System.out.println("Input the total users number:");
		// �����û�����
		int N = scanner.nextInt();
		int[][] sparseMatrix = new int[N][N];
		// �����û�ϡ����������û����ƶȼ��㡾���ƶȾ���
		Map<String, Integer> userItemLength = new HashMap<>();
		// �洢ÿһ���û���Ӧ�Ĳ�ͬ��Ʒ���� eg: A 3
		Map<String, Set<String>> itemUserCollection = new HashMap<>();
		// ������Ʒ���û��ĵ��ű� eg: a A B
		Set<String> items = new HashSet<>();
		// �����洢��Ʒ����
		Map<String, Integer> userID = new HashMap<>();
		// �����洢ÿһ���û����û�IDӳ��
		Map<Integer, String> idUser = new HashMap<>();
		// �����洢ÿһ��ID��Ӧ���û�ӳ��
		System.out.println("Input user--items maping infermation:<eg:A a b d>");
		scanner.nextLine();
		for (int i = 0; i < N; i++) {
			// ���δ���N���û� �������� �Կո���
			String[] user_item = scanner.nextLine().split(" ");
			int length = user_item.length;
			userItemLength.put(user_item[0], length - 1);
			// eg: A 3
			userID.put(user_item[0], i);
			// �û�ID��ϡ���������Ӧ��ϵ
			idUser.put(i, user_item[0]);
			// ������Ʒ--�û����ű�
			for (int j = 1; j < length; j++) {
				if (items.contains(user_item[j])) {
					// ����Ѿ�������Ӧ����Ʒ--�û�ӳ�䣬ֱ����Ӷ�Ӧ���û�
					itemUserCollection.get(user_item[j]).add(user_item[0]);
				} else {
					// ���򴴽���Ӧ��Ʒ--�û�����ӳ��
					items.add(user_item[j]);
					itemUserCollection.put(user_item[j], new HashSet<String>());
					// ������Ʒ--�û����Ź�ϵ
					itemUserCollection.get(user_item[j]).add(user_item[0]);
				}
			}
		}
		System.out.println(itemUserCollection.toString());
		// �������ƶȾ���ϡ�衿
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
					// �����û�u���û�v��������������Ʒ����
				}
			}
		}
		System.out.println(userItemLength.toString());
		System.out.println("Input the user for recommendation:<eg:A>");
		String recommendUser = scanner.nextLine();
		System.out.println(userID.get(recommendUser));
		// �����û�֮������ƶȡ����������ԡ�
		int recommendUserId = userID.get(recommendUser);
		for (int j = 0; j < sparseMatrix.length; j++) {
			if (j != recommendUserId) {
				System.out.println(idUser.get(recommendUserId) + "--" + idUser.get(j) + "���ƶ�:" + sparseMatrix[recommendUserId][j] / Math.sqrt(userItemLength.get(idUser.get(recommendUserId)) * userItemLength.get(idUser.get(j))));
			}
		}
		// ����ָ���û�recommendUser����Ʒ�Ƽ���
		for (String item : items) {
			// ����ÿһ����Ʒ
			Set<String> users = itemUserCollection.get(item);
			// �õ�����ǰ��Ʒ�������û�����
			if (!users.contains(recommendUser)) {
				// ������Ƽ��û�û�й���ǰ��Ʒ��������Ƽ��ȼ���
				double itemRecommendDegree = 0.0;
				for (String user : users) {
					// �Ƽ��ȼ���
					itemRecommendDegree += sparseMatrix[userID.get(recommendUser)][userID.get(user)] / Math.sqrt(userItemLength.get(recommendUser) * userItemLength.get(user));
				}
				System.out.println("The item " + item + " for " + recommendUser + "'s recommended degree:" + itemRecommendDegree);
			}
		}
		scanner.close();
	}

}
