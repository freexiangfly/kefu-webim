!function(window,undefined){"use strict";var message,iframe,iframeId,curChannel,curUser,initdata,eTitle=document.title,iframePosition={x:10,y:10},_startPosition={x:0,y:0},shadow=document.createElement("div"),newTitle="-新消息提醒  ",titleST=0,getConfig=function(key){var that;if(key){for(var scripts=document.scripts,s=0,l=scripts.length;l>s;s++)if(scripts[s].src&&0<scripts[s].src.indexOf(key)){that=scripts[s].src;break}}else that=location.href;var obj={};if(!that)return{str:"",json:obj,domain:""};var tmp,idx=that.indexOf("?"),sIdx=that.indexOf("//")>-1?that.indexOf("//"):0,domain=that.slice(sIdx,that.indexOf("/",sIdx+2)),arr=that.slice(idx+1).split("&");obj.src=that.slice(0,idx);for(var i=0,l=arr.length;l>i;i++)tmp=arr[i].split("="),obj[tmp[0]]=tmp.length>1?tmp[1]:"";return{str:that,json:obj,domain:domain+"/"}},config=getConfig("easemob.js");config.json.hide="false"==config.json.hide?!1:config.json.hide;var open=function(){message.listenToIframe(function(msg){var user,channel,group,msgDetail="新消息提醒";if(msg.indexOf("setuser")>-1&&(user=msg.split("@").length>0?msg.split("@")[1]:"",msg=msg.split("@").length>0?msg.split("@")[0]:""),msg.indexOf("notify")>-1&&(msgDetail=msg.slice(6),msg="notify"),msg.indexOf("dragready")>-1){var pos=msg.slice(9);_startPosition.x=isNaN(Number(pos.split("&")[0]))?0:Number(pos.split("&")[0]),_startPosition.y=isNaN(Number(pos.split("&")[1]))?0:Number(pos.split("&")[1]),msg="dragready"}if(msg.indexOf("setchannel")>-1&&(channel=msg.split("@").length>0?msg.split("@")[1]:"",msg=msg.split("@").length>0?msg.split("@")[0]:""),msg.indexOf("setgroupuser")>-1){var idx=msg.indexOf("@emgroupuser@");user=msg.slice(13,idx),group=unescape(msg.slice(idx+13)),msg="setgroupuser"}switch(msg){case"msgPrompt":var p,tArr=(eTitle+newTitle).split("");clearInterval(titleST),titleST=setInterval(function(){p=tArr.shift(),document.title=p+Array.prototype.join.call(tArr,""),tArr.push(p)},360);break;case"notify":notify(config.domain+"webim/resources/notify.png","新消息",msgDetail);break;case"recoveryTitle":clearInterval(titleST),document.title=eTitle;break;case"showChat":iframe.style.width="400px",iframe.style.height="500px",iframe.style.right=iframePosition.x+"px",iframe.style.bottom=iframePosition.y+"px",iframe.style.cssText+="box-shadow: 0 4px 8px rgba(0,0,0,.2);border-radius: 4px;border: 1px solid #ccc\\9;";break;case"minChat":_st&&clearTimeout(_st),iframe.style.boxShadow="none",iframe.style.borderRadius="4px;",iframe.style.left="auto",iframe.style.right="-5px",iframe.style.top="auto",iframe.style.bottom="10px",iframe.style.border="none",config.json.hide?(iframe.style.width="12px",iframe.style.height="12px"):(iframe.style.height="37px",iframe.style.width="102px");break;case"setuser":Emc.setcookie("emKefuUser",user);break;case"setgroupuser":Emc.setcookie(group,user);break;case"setchannel":Emc.setcookie("emKefuChannel",channel);break;case"dragready":shadow.style.display="block",iframe.style.display="none",EasemobWidget.utils.on(document,"mousemove",_move);break;case"dragend":_moveend()}}),window.easemobIM=function(group){if(EasemobWidget.utils.isMobile){var i=document.getElementById(iframeId),a=window.event.srcElement||window.event.target;group?(a.setAttribute("href",i.getAttribute("src")+"&emgroup="+escape(group)),a.setAttribute("target","_blank")):(a.setAttribute("href",i.getAttribute("src")),a.setAttribute("target","_blank"))}else if(group){var groupUser=Emc.getcookie(group);message.sendToIframe("emgroup@"+groupUser+"@emgroupuser@"+escape(group))}else message.sendToIframe("imclick")}},appendIframe=function(){if(iframe=/MSIE (6|7|8)/.test(navigator.userAgent)?document.createElement('<iframe name="'+(new Date).getTime()+'">'):document.createElement("iframe"),iframeId="EasemobIframe"+(new Date).getTime(),iframe.id=iframeId,iframe.name=(new Date).getTime(),iframe.frameBorder=0,iframe.allowTransparency="true",iframe.style.cssText="            z-index:16777269;            overflow:hidden;            position:fixed;            bottom:10px;            right:-5px;            border:none;            width:400px;            height:0;            display:none;            transition:all .01s;",shadow.style.cssText="            display:none;            cursor:move;            z-index:16777270;            position:fixed;            bottom:10px;            right:10px;            border:none;            width:400px;            height:500px;            border-radius:4px;            box-shadow: 0 4px 8px rgba(0,0,0,.2);            border-radius: 4px;",shadow.style.background="url("+config.domain+"webim/resources/drag.png) no-repeat",initdata="initdata:"+config.domain+"webim/im.html?tenantId="+config.json.tenantId+(config.json.hide?"&hide=true":"")+(config.json.color?"&color="+config.json.color:"")+(config.json.preview?"&preview="+config.json.preview:"")+(curChannel?"&c="+curChannel:"")+(curUser?"&u="+curUser:"")+"&time="+(new Date).getTime(),iframe.src=config.domain+"webim/im.html?tenantId="+config.json.tenantId,config.json.hide?(iframe.style.height="12px",iframe.style.width="12px"):(iframe.style.height="37px",iframe.style.width="100px"),EasemobWidget.utils.isMobile&&(iframe.style.cssText+="left:0;bottom:0",iframe.style.width="100%"),config.json&&config.json.preview){var curDom=document.getElementById(config.json.previewid);curDom?curDom.appendChild(iframe):document.body.appendChild(iframe)}else document.body.appendChild(shadow),document.body.appendChild(iframe);iframe.readyState?iframe.onreadystatechange=function(){("loaded"==iframe.readyState||"complete"==iframe.readyState)&&(this.style.display="block",message=new EmMessage(iframeId),open(),message.sendToIframe(initdata))}:iframe.onload=function(){this.style.display="block",message=new EmMessage(iframeId),open(),message.sendToIframe(initdata)}},script=document.createElement("script");script.src=config.domain+"webim/easemob.utils.js",(document.head||document.getElementsByTagName("head")[0]).appendChild(script),script.readyState?script.onreadystatechange=function(){("loaded"==script.readyState||"complete"==script.readyState)&&ready()}:script.onload=function(){ready()};var ready=function(){curUser=Emc.getcookie("emKefuUser"),curChannel=Emc.getcookie("emKefuChannel"),appendIframe(),EasemobWidget.utils.on(shadow,"mouseup",_moveend),resize()},_st=0,_move=function(e){var _width=(window.event||e,document.documentElement.clientWidth),_height=document.documentElement.clientHeight,_x=_width-e.clientX-400+_startPosition.x,_y=_height-e.clientY-500+_startPosition.y;e.clientX-_startPosition.x<=0?_x=_width-400:e.clientX+400-_startPosition.x>=_width&&(_x=0),e.clientY-_startPosition.y<=0?_y=_height-500:e.clientY+500-_startPosition.y>=_height&&(_y=0),shadow.style.right=_x+"px",shadow.style.bottom=_y+"px",iframePosition={x:_x,y:_y},clearTimeout(_st),_st=setTimeout(_moveend,500)},_moveend=function(){EasemobWidget.utils.remove(document,"mousemove",_move),iframe.style.right=iframePosition.x+"px",iframe.style.bottom=iframePosition.y+"px",shadow.style.display="none",iframe.style.display="block",message.sendToIframe("dragend")},resize=function(){EasemobWidget.utils.on(window,"resize",function(){var _width=document.documentElement.clientWidth,_height=document.documentElement.clientHeight,_right=Number(iframe.style.right.slice(0,-2)),_bottom=Number(iframe.style.bottom.slice(0,-2));400>_width?(iframe.style.left="auto",iframe.style.right=0):400>_width-_right?(iframe.style.right=_width-400+"px",iframe.style.left=0):iframe.style.left="auto",500>_height?(iframe.style.top="auto",iframe.style.bottom=0):500>_height-_bottom?(iframe.style.bottom=_height-500+"px",iframe.style.top=0):iframe.style.top="auto"})},notify=function(img,title,content){img=img||"",title=title||"",content=content||"";try{if(window.Notification)if("granted"===Notification.permission){var notification=new Notification(title,{icon:img,body:content});setTimeout(function(){notification.close()},3e3)}else Notification.requestPermission()}catch(e){}}}(window,void 0);