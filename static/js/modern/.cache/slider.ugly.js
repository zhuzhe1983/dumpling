(function(e){e.slider=function(t,n){var r={initValue:0,accuracy:1},i=this;i.settings={};var s=e(t),o,u,a,f,l,c,h,p,d,v=!1;i.init=function(){i.settings=e.extend({},r,n),o=e('<div class="complete"></div>'),u=e('<div class="marker"></div>'),o.appendTo(s),u.appendTo(s),v=s.hasClass("vertical"),E(),a=m(i.settings.initValue),b(a),u.on("mousedown",function(e){e.preventDefault(),w(e)}),s.on("mousedown",function(e){e.preventDefault(),w(e)})};var m=function(e){var t=i.settings.accuracy;return t===0?e:e===100?100:(e=Math.floor(e/t)*t+Math.round(e%t/t)*t,e>100?100:e)},g=function(e){var t;return t=e*p,m(t)},y=function(e){return p===0?0:e/p},b=function(e){var t,n;v?(t=y(e)+d,n=f-t,u.css("top",n),o.css("height",t)):(t=y(e),u.css("left",t),o.css("width",t))},w=function(t){e(document).on("mousemove.sliderMarker",function(e){S(e)}),e(document).on("mouseup.sliderMarker",function(){e(document).off("mousemove.sliderMarker"),e(document).off("mouseup.sliderMarker"),s.data("value",a),s.trigger("changed",[a])}),E(),S(t)},E=function(){v?(f=s.height(),l=s.offset().top,d=u.height()):(f=s.width(),l=s.offset().left,d=u.width()),p=100/(f-d),c=d/2,h=f-d/2},S=function(e){var t,n,r;v?t=e.pageY-l:t=e.pageX-l,t<c?t=c:t>h&&(t=h),v?r=f-t-d/2:r=t-d/2,n=g(r),b(n),a=n,s.trigger("change",[a])};i.val=function(e){return typeof e!="undefined"?(a=m(e),b(a),a):a},i.init()},e.fn.slider=function(t){return this.each(function(){if(undefined==e(this).data("slider")){var n=new e.slider(this,t);e(this).data("slider",n)}})}})(jQuery),$(window).ready(function(){var e=$("[data-role=slider], .slider");e.each(function(e,t){var n={};$slider=$(t),n.initValue=$slider.data("paramInitValue"),n.accuracy=$slider.data("paramAccuracy"),$slider.slider(n)})})