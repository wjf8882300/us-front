!function(e){e.fn.ligerResizable=function(t){return e.ligerui.run.call(this,"ligerResizable",arguments,{idAttrName:"ligeruiresizableid",hasElement:!1,propertyToElemnt:"target"})},e.fn.ligerGetResizableManager=function(){return e.ligerui.run.call(this,"ligerGetResizableManager",arguments,{idAttrName:"ligeruiresizableid",hasElement:!1,propertyToElemnt:"target"})},e.ligerDefaults.Resizable={handles:"n, e, s, w, ne, se, sw, nw",maxWidth:2e3,maxHeight:2e3,minWidth:20,minHeight:20,scope:3,animate:!1,onStartResize:function(e){},onResize:function(e){},onStopResize:function(e){},onEndResize:null},e.ligerui.controls.Resizable=function(t){e.ligerui.controls.Resizable.base.constructor.call(this,null,t)},e.ligerui.controls.Resizable.ligerExtend(e.ligerui.core.UIComponent,{__getType:function(){return"Resizable"},__idPrev:function(){return"Resizable"},_render:function(){var t=this,r=this.options;t.target=e(r.target),t.set(r),t.target.mousemove(function(i){if(!r.disabled&&(t.dir=t._getDir(i),t.dir?t.target.css("cursor",t.dir+"-resize"):t.target.css("cursor").indexOf("-resize")>0&&t.target.css("cursor","default"),r.target.ligeruidragid)){var n=e.ligerui.get(r.target.ligeruidragid);n&&t.dir?n.set("disabled",!0):n&&n.set("disabled",!1)}}).mousedown(function(e){r.disabled||t.dir&&t._start(e)})},_rendered:function(){this.options.target.ligeruiresizableid=this.id},_getDir:function(t){var r=this,i=this.options,n="",s=r.target.offset(),a=r.target.width(),o=r.target.height(),l=i.scope,u=t.pageX||t.screenX,c=t.pageY||t.screenY;return c>=s.top&&c<s.top+l?n+="n":c<=s.top+o&&c>s.top+o-l&&(n+="s"),u>=s.left&&u<s.left+l?n+="w":u<=s.left+a&&u>s.left+a-l&&(n+="e"),"all"==i.handles||""==n?n:-1!=e.inArray(n,r.handles)?n:""},_setHandles:function(e){e&&(this.handles=e.replace(/(\s*)/g,"").split(","))},_createProxy:function(){var t=this;t.proxy=e('<div class="l-resizable"></div>'),t.proxy.width(t.target.width()).height(t.target.height()),t.proxy.attr("resizableid",t.id).appendTo("body")},_removeProxy:function(){var e=this;e.proxy&&(e.proxy.remove(),e.proxy=null)},_start:function(t){var r=this;this.options;r._createProxy(),r.proxy.css({left:r.target.offset().left,top:r.target.offset().top,position:"absolute"}),r.current={dir:r.dir,left:r.target.offset().left,top:r.target.offset().top,startX:t.pageX||t.screenX,startY:t.pageY||t.clientY,width:r.target.width(),height:r.target.height()},e(document).bind("selectstart.resizable",function(){return!1}),e(document).bind("mouseup.resizable",function(){r._stop.apply(r,arguments)}),e(document).bind("mousemove.resizable",function(){r._drag.apply(r,arguments)}),r.proxy.show(),r.trigger("startResize",[r.current,t])},changeBy:{t:["n","ne","nw"],l:["w","sw","nw"],w:["w","sw","nw","e","ne","se"],h:["n","ne","nw","s","se","sw"]},_drag:function(e){var t=this;this.options;if(t.current&&t.proxy){t.proxy.css("cursor",""==t.current.dir?"default":t.current.dir+"-resize");var r=e.pageX||e.screenX,i=e.pageY||e.screenY;t.current.diffX=r-t.current.startX,t.current.diffY=i-t.current.startY,t._applyResize(t.proxy),t.trigger("resize",[t.current,e])}},_stop:function(t){var r=this;this.options;r.hasBind("stopResize")?0!=r.trigger("stopResize",[r.current,t])&&r._applyResize():r._applyResize(),r._removeProxy(),r.trigger("endResize",[r.current,t]),e(document).unbind("selectstart.resizable"),e(document).unbind("mousemove.resizable"),e(document).unbind("mouseup.resizable")},_applyResize:function(t){var r=this,i=this.options,n={left:r.current.left,top:r.current.top,width:r.current.width,height:r.current.height},s=!1;t||(t=r.target,s=!0,isNaN(parseInt(r.target.css("top")))?n.top=0:n.top=parseInt(r.target.css("top")),isNaN(parseInt(r.target.css("left")))?n.left=0:n.left=parseInt(r.target.css("left"))),e.inArray(r.current.dir,r.changeBy.l)>-1?(n.left+=r.current.diffX,r.current.diffLeft=r.current.diffX):s&&delete n.left,e.inArray(r.current.dir,r.changeBy.t)>-1?(n.top+=r.current.diffY,r.current.diffTop=r.current.diffY):s&&delete n.top,e.inArray(r.current.dir,r.changeBy.w)>-1?(n.width+=(-1==r.current.dir.indexOf("w")?1:-1)*r.current.diffX,r.current.newWidth=n.width):s&&delete n.width,e.inArray(r.current.dir,r.changeBy.h)>-1?(n.height+=(-1==r.current.dir.indexOf("n")?1:-1)*r.current.diffY,r.current.newHeight=n.height):s&&delete n.height,s&&i.animate?t.animate(n):t.css(n)}})}(jQuery);