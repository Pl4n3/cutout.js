
var Menu={};
(function(Menu) {
  Menu.switchf=undefined;
  Menu.press=undefined;
  Menu.cmenu=undefined;
  var menus,tfid='menutf',mok,mcancel,lsx=0,lsy=0,touchms=[],keym={},gpbum={},gppress=new Array(16);
  Menu.mcontrol=undefined;
  Menu.color='rgba(0,0,0,1)';
  Menu.borderColor='rgba(0,0,0,1)';
  Menu.colPress='rgba(240,240,100,1)';
  Menu.colBg='rgba(0,0,0,0.2)';
  Menu.colOver='rgba(200,200,0,0.2)';
  Menu.pw=0.13;Menu.ph=0.05;Menu.px=1-Menu.pw-0.02;Menu.py=0.02;
  Menu.tafs=0.1;//0.15;
  Menu.recent=[];
  Menu.roots=[];
  Menu.draw=function() {
    if (!menus) return;
    
    var cont=document.body;
    var ccw=cont.clientWidth,cch=cont.clientHeight;
    var cx=Math.floor(Menu.px*ccw+0.5);
    var cy=Math.floor(Menu.py*ccw+0.5);
    var cw=Math.floor(Menu.pw*ccw+0.5);
    var ch=Math.floor(Menu.ph*ccw+0.5);
    var mfs=Math.floor(ch*0.25);
    var padding=Math.floor(0.01*ccw+0.5);
    
    for (var i=0;i<menus.length;i++) {
      var m=menus[i];
      var c=m.c;
      if (!c) {
        c=document.createElement(m.canv?'canvas':'div');
        c.style.position='absolute';
        //c.style.backgroundColor=m.tf?'rgba(100,100,100,0.6)':'rgba(0,0,0,0.2)';
        c.style.backgroundColor=(m.bgcol?m.bgcol:Menu.colBg);
        c.style.color=m.col?m.col:Menu.color;
        if (m.tf) {
          c.style.padding=padding;
        } else {
          
          if (!m.log) {
            c.style.textAlign='center';
            c.style.userSelect='none';
            c.style.MozUserSelect='none';
            c.style.cursor='pointer';
          } else c.style.paddingLeft='2px';
          c.style.spacingTop='10px';
        }
        c.style.borderWidth='1px';
        c.style.borderStyle='solid';
        c.style.borderColor=m.bocol?m.bocol:Menu.borderColor;
        //c.style.boxShadow='3px 3px 10px rgb(34,34,34)';
        if (m.bosh) c.style.boxShadow='4px 4px 15px rgb(34,34,34)';
        if (m.tesh) c.style.textShadow='0px 1px 1px rgb(0,0,0)';
        if (m.padding) c.style.padding=m.padding;
        //if (m.tesh) c.style.textShadow='3px 3px 6px rgb(0,0,0)';
    
        //c.style['user-select']='none';
        //c.style['-moz-user-select']='none';
    
        //c.innerHTML=m.s;//'\u25b2';
        m.c=c;
      }
      c.style.backgroundColor=(m.bgcol?m.bgcol:Menu.colBg);
    
      
      if (!m.shown) {
        document.body.appendChild(c); 
        m.shown=true;
      }
    
    
      if (m.px) {
      //if (m.pw===undefined) m.pw=0.13;
      //if (m.px===undefined) m.px=1-m.pw-0.02;
      //if (m.ph===undefined) m.ph=0.05;
      ////if (m.py===undefined) m.py=0.02+(m.ph+0.01)*i;
      //if (m.py===undefined) m.py=0.02+(m.ph)*i;
        m.cx=Math.floor(m.px*ccw+0.5);
        m.cw=Math.floor(m.pw*ccw+0.5)-padding*2;
        m.ch=Math.floor(m.ph*(m.yvh?cch:ccw)+0.5)-padding*2;
        m.cy=Math.floor(m.py*(m.yvh?cch:ccw)+0.5);if (m.ydown) m.cy=cch-m.cy-m.ch;
      } else {
        m.cx=cx;
        m.cy=cy+i*ch;
        m.cw=cw;
        m.ch=ch-1;
      }
      c.style.left=m.cx;
      c.style.top=m.cy;
      c.style.width=m.cw;
      c.style.height=m.ch;
      c.style.fontSize=Math.floor((m.fs?m.fs:1)*m.ch*0.5);//+'px';//0.7
    
      if (m.tf) {
        var e=document.getElementById(tfid);
        var mco=m.mctrl;
        var file=mco.file;
        var value=(e?e.value:(mco.value?mco.value:(mco.valuef?mco.valuefval:(mco.ms?mco.ms:''))));
        if (mco.co)
          c.innerHTML=m.s+'<br>...';
        else if (mco.ta) {
          //var fs=m.fs?m.fs:1;
          c.innerHTML=m.s+'<br><textarea id="'+tfid+'" '+(mco.wrap?'':'wrap="off" ')+'style="'+(mco.wrap?'':'white-space:nowrap;overflow:auto;')+'font-size:'+c.style.fontSize+'" '+
          'cols='+(mco.tacols?mco.tacols:36)+' rows='+(mco.tarows?mco.tarows:15)+'>'+value+'</textarea>';
          //tacols:36,tarows:15 frueher 20,8
          //'cols='+(mco.tacols?mco.tacols:Math.floor(3/fs+0.5))+' rows='+(mco.tarows?mco.tarows:Math.floor(1.2/fs+0.5))+'>'+value+'</textarea>';
        } else
        c.innerHTML=m.s+'<br><input id="'+tfid+'" type="'+(file?'file':'text')+'" value="'+value+'" style="font-size:'+c.style.fontSize+';" size='+(file?2:15)+'></input>';
      } else if (m.canv) {
        c.width=m.cw;
        c.height=m.ch;
      } else {
        if (m.msf) m.ms=m.msf();
        c.innerHTML=m.s+(m.sub?(m.open?' \u25b2':' \u25bc'):'')
        +(m.ms!==undefined?'<div'+(m.msid?' id="'+m.msid+'"':'')+' style="font-size:'+mfs+';position:absolute;top:'+(ch-2*mfs)+'pt;left:2pt;">'+m.ms+'</div>':'');
      } 
    }
    var e=document.getElementById(tfid);
    if (e) e.focus();
  }
  Menu.search=function(x,y,justreturn) {
    lsx=x;lsy=y;
    var cm=undefined;
    if (!menus) return;
    for (var i=0;i<menus.length;i++) {
      var m=menus[i];
      if (m.tf||m.noinp) continue;
      if (x>=m.cx&&x<m.cx+m.cw&&y>=m.cy&&y<m.cy+m.ch) {
        cm=m;
        break;
      }
    }
    
    if (justreturn) return cm;
    //if (cm) if (cm.noa) {
    //  //cm.on=true;
    //  return cm;
    //}
    
    if (Menu.cmenu!=cm) {
      if (Menu.cmenu) {
        Menu.colorCmenu(true);//cmenu.c.style.backgroundColor=cmenu.bgcol?cmenu.bgcol:'rgba(0,0,0,0.2)';
        if (Menu.cmenu==Menu.press) Menu.cmenu.on=false;
      }
      Menu.cmenu=cm;
      if (Menu.cmenu) {
        Menu.colorCmenu();
        if (Menu.cmenu==Menu.press) Menu.cmenu.on=true;
      }
    }
    
    return cm;
  }
  Menu.colorCmenu=function(notover) {
    if (!Menu.cmenu) return;
    if (!Menu.cmenu.c) return;
    if (notover) Menu.cmenu.c.style.backgroundColor=Menu.cmenu.bgcol?Menu.cmenu.bgcol:Menu.colBg;
    else Menu.cmenu.c.style.backgroundColor=Menu.cmenu==Menu.press?Menu.colPress:Menu.colOver;
  }
  function mCloseAll(a) {
    for (var i=0;i<a.length;i++) {
      var mh=a[i];
      if (mh.sub) { mh.open=false;mCloseAll(mh.sub); }
    }
  }
  Menu.remove=function() {
    //Paint.stacktrace();
    if (!menus) return;
    for (var h=0;h<menus.length;h++) {
      var mh=menus[h],c=mh.c;
      document.body.removeChild(c);
      mh.shown=false; 
    }
  }
  Menu.seta=function(a) {
    Menu.remove();
    menus=a.concat([]);
    Menu.draw();
  }
  Menu.checkAddRecent=function(m) {
    if (!m.r) return false;
    if (Menu.recent.indexOf(m)==-1) {
      m.ms='recent';
      Menu.recent.push(m);
      m.bgcol='rgba(0,100,200,0.3)';
      return true;
    }
    return false;
  }
  Menu.action=function() {
    var m=Menu.cmenu;
    var a=m.a?m.a:m.s;
    
    var tf=document.getElementById(tfid);
    
    
    Menu.remove();
    /*
    if (m.r) {
      if (Menu.recent.indexOf(m)==-1) {
        m.ms='recent';
        Menu.recent.push(m);
        m.bgcol='rgba(0,100,200,0.3)';
      }
    }
    */
    Menu.checkAddRecent(m);
    //vvvvv
    if (m.autovalm) {
      var am=m.autovalm;
      //am.s=a;
      if (am.lskey) localStorage[am.lskey]=a;
      if (am.setfunc) am.setfunc(a);
    } 
    
    if (m==mok) {
      if (Menu.mcontrol.setfunc) {
        Menu.mcontrol.setfunc(tf?tf.value:undefined);
        if (Menu.mcontrol.lskey) localStorage[Menu.mcontrol.lskey]=tf?tf.value:undefined;
      }
      else alert('Menu.action '+tf.value);
    }
    if (m==mcancel) {
      if (Menu.mcontrol.cancelf) Menu.mcontrol.cancelf();
    }
    if (Menu.switchf) Menu.switchf(m,a);
    Menu.mcontrol=undefined;
    //^^^^
    
    if (m.doctrl) {
      var skip=false;
      if (m.valuef) {
        m.valuefval=m.valuef();
        if (m.valuefval===undefined) skip=true;
      }
      if (!skip) {
        if (!mok) {
          mok={s:'Ok'};
          mcancel={s:'Cancel'};
        }
        if (m.close) {
          menus=[mcancel];mcancel.s='Close';
        } else menus=[mok,mcancel]
        menus.push({s:m.doctrl,px:0.32,py:0.02,pw:1-0.49,ph:(m.ta?0.44:0.14),tf:1,fs:(m.mcfs?m.mcfs:(m.ta?Menu.tafs:0.75)),mctrl:m});
        Menu.mcontrol=m;
      }
    } else if (m.sub) {
      if (m.open) {
        m.open=false;
        menus=Menu.roots.concat(Menu.recent);
        mCloseAll(menus);
      } else {
        m.open=true;
        menus=[m].concat(m.sub);
        if (m.autoval) for (var i=0;i<m.sub.length;i++) m.sub[i].autovalm=m;
      }
    } else if (!m.stay) {
      //var ah=;
      //if (Menu.dynf) {
      //  var a2=Menu.dynf();
      //  if (a2) ah=ah.concat(a2);
      //}
    
      menus=Menu.roots.concat(Menu.recent);
      //for (var i=0;i<menus.length;i++) {
      //  var mh=menus[i];
      //  if (mh.sub) mh.open=false;
      //}
      mCloseAll(menus);
    }
    
    //----
    
    
    Menu.draw();
    Menu.search(lsx,lsy);
  }
  Menu.initLoad=function(a) {
    for (var i=0;i<a.length;i++) {
      var m=a[i];
      if (m.lskey) {
        var v=localStorage[m.lskey];
        if (!(v===undefined)) {
          //alert(v);
          if (m.setfunc) m.setfunc(v);
        }
      }
      if (m.keys) for (var h=0;h<m.keys.length;h++) keym[m.keys[h]]=m;
      if (m.gpbu) for (var h=0;h<m.gpbu.length;h++) gpbum[m.gpbu[h]]=m;
      if (m.sub) Menu.initLoad(m.sub);
    }
  }
  Menu.init=function(a) {
    Menu.initLoad(a);
    Menu.roots=a;
    menus=a.concat(Menu.recent);
  }
  Menu.mouseUp=function() {
    if (Menu.press) if (Menu.cmenu==Menu.press) {
      Menu.action();
      Menu.press.on=false;
      Menu.press=undefined;
      Menu.colorCmenu();
      return true;
    }
    return false;
  }
  Menu.mouseDown=function() {
    if (Menu.cmenu) {
      //menuAction();
      //cmenu.c.style.backgroundColor='rgba(230,230,0,0.7)';
      Menu.press=Menu.cmenu;
      Menu.press.on=true;
      Menu.colorCmenu();
      return true;
    }
    return false;
  }
  Menu.touchStart=function(x,y,multiple) {
    var cm=Menu.search(x,y,multiple);
    if (cm) {
      Menu.cmenu=cm;
      Menu.press=cm;
      Menu.press.on=true;//touchms.push(Menu.press);
      Menu.colorCmenu();
      //menuAction();
      return true;
    }
    return false;
  }
  Menu.touchEnd=function() {
    if (Menu.press) {
      if (Menu.cmenu==Menu.press) Menu.action();
      Menu.press.on=false;
      Menu.press=undefined;
      Menu.colorCmenu(true);
      return true;
    }
    //for (var h=0;h<touchms.length;h++) {
    //  touchms[h].on=false;
    //}
    //touchms=[];
    return false;
  }
  Menu.keyDown=function(ev) {
    var kc=ev.keyCode;
    var m=keym[kc];if (m) { m.on=true;if (m.c) m.c.style.backgroundColor=Menu.colOver; }
    //alert(kc);
  }
  Menu.keyUp=function(ev) {
    var kc=ev.keyCode;
    var m=keym[kc];if (m) { m.on=false;if (m.c) m.c.style.backgroundColor=m.bgcol?m.bgcol:Menu.colBg; }
  }
  Menu.gamepad=function() {
    var gp=navigator.webkitGetGamepads && navigator.webkitGetGamepads()[0];
    if (!gp) return;
    //if (gp.buttons[0]) alert(32);
    for (var h=gppress.length-1;h>=0;h--) {
      var v=gp.buttons[h];
      if (v^gppress[h]) {
        gppress[h]=v;
        var m=gpbum[h];
        if (m) { m.on=v;if (m.c) m.c.style.backgroundColor=v?Menu.colOver:(m.bgcol?m.bgcol:Menu.colBg); }
      }
    }
    
    /*
    if (gamepad) {
      var on,ch=false,gmi=0.3;
      on=gamepad.axes[0]<-gmi;if (mLeft.on!=on) {mLeft.on=on;ch=true;}
      on=gamepad.axes[0]>gmi;if (mRight.on!=on) {mRight.on=on;ch=true;}
      on=gamepad.axes[1]>gmi;if (mBack.on!=on) {mBack.on=on;ch=true;}
      on=gamepad.axes[1]<-gmi;if (mFront.on!=on) {mFront.on=on;ch=true;}
      //setDebug(gamepad.axes[2]);
      on=gamepad.axes[2]<-gmi;if (mtLeft.on!=on) {mtLeft.on=on;ch=true;};//sometimes doesnt happens...log('left'+on);}
      on=gamepad.axes[2]>gmi;if (mtRight.on!=on) {mtRight.on=on;ch=true;}
      
      for (var h=gppress.length-1;h>=0;h--) {
        gpchange[h]=gamepad.buttons[h]^gppress[h];
        gppress[h]=gamepad.buttons[h];
      }
      
      on=gamepad.buttons[0]||gamepad.buttons[5];if (Menu.cmenu) on=false;
      if (mAction.on!=on) {mAction.on=on;ch=true;}
      
      if (gpchange[13]||gpchange[12]) {
        if (gppress[13]||gppress[12]) {
          if (Menu.cmenu) 
            Menu.buWalk(gppress[12]?-1:1);
          else 
            changeEyemd(gppress[12]);
        }
      }
      if (gpchange[9]&&gppress[9]) Menu.buToggle();
      if (Menu.cmenu&&gpchange[0]&&gppress[0]) Menu.buPress();
      
      if (ch) mColors();
    }
    */
  }
  Menu.ms=function(m,s) {
    m.ms=s;
    if (m.msid) {
      var e=document.getElementById(m.msid);
      if (e) e.innerHTML=s;
    }
  }
  /*
  Menu.setRoots=function(m) {
    menuroots=m;
    //menus=a.concat([]);
  }
  */
  Menu.setMenus=function(m) {
    menus=m;
  }
  Menu.getMenus=function() {
    return menus;
  }
  /*
  Menu.setMenuroots=function(a) {
    menuroots=a;
  }
  */
  //----funcs for keyboard/gamepad
  Menu.buToggle=function() {
    if (Menu.cmenu) {
      Menu.colorCmenu(true);
      Menu.cmenu=undefined;
    } else {
      Menu.cmenu=menus[0];
      Menu.colorCmenu();
    }
  }
  Menu.buPress=function() {
    var wassub=Menu.cmenu.sub;
    Menu.press=Menu.cmenu;
    Menu.action();
    Menu.press=undefined;
    if (wassub) {
      Menu.cmenu=menus[0];
      Menu.colorCmenu();
    }
  }
  Menu.buWalk=function(d) {
    var i=menus.indexOf(Menu.cmenu);
    //log(i+' '+ma.length);
    if (menus.length>1) {
      Menu.colorCmenu(true);
      Menu.cmenu=menus[(i+d+menus.length)%menus.length];
      Menu.colorCmenu();
    }
  }
}
)(Menu);

//--
//fr o,2
//fr o,2,14
//fr o,2,15
//fr o,2,26
//fr p,42,56
//fr x,compile.cmd,copyto D:/tools/Dropbox/Public
