/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

jQuery.cookie=function(e,i,o){if(void 0===i){var r=null;if(document.cookie&&""!=document.cookie)for(var n=document.cookie.split(";"),t=0;t<n.length;t++){var p=jQuery.trim(n[t]);if(p.substring(0,e.length+1)==e+"="){r=decodeURIComponent(p.substring(e.length+1));break}}return r}o=o||{},null===i&&(i="",o.expires=-1);var s="";if(o.expires&&("number"==typeof o.expires||o.expires.toUTCString)){var u;"number"==typeof o.expires?(u=new Date,u.setTime(u.getTime()+24*o.expires*60*60*1e3)):u=o.expires,s="; expires="+u.toUTCString()}var a=o.path?"; path="+o.path:"",c=o.domain?"; domain="+o.domain:"",m=o.secure?"; secure":"";document.cookie=[e,"=",encodeURIComponent(i),s,a,c,m].join("")};