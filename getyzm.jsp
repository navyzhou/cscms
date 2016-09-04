<%@ page language="java" import="java.util.*,com.yc.cscms.util.*" pageEncoding="utf-8"%>
<%
  			String addr=request.getParameter("addr");
  			String yzm=request.getParameter("code");
  			MailConnect connect=new MailConnect();
  			String ss=connect.doPost(session.getAttribute("addr").toString(),session.getAttribute("msg").toString(),connect);
  			if(ss.equals("true")){%>RRRRRRRR<%}else{%>W<%}%>