package app.test;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.ibatis.sqlmap.client.SqlMapClient;

import app.pub.database.DBUtils;
import app.pub.date.DateUtil;



public class MyTask implements Filter {
	
	public static int kucun_min = 100 ;
	
	public void init(FilterConfig filterConfig) throws ServletException {
		System.out.println("MyServletFilter1 init");
		
		new Timer("timer - " ).schedule(new TimerTask() {
            public void run() {
                doCaiGou();
            }
        }, 4*60*1000 , 30*1000);
		
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		
	}

	public void destroy() {
		
	}
	
	public void doCaiGou() {
		
		
	}
		
}
