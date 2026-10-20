(function(){
  'use strict';
  var sec=document.querySelector('.px'); if(!sec) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var media=sec.querySelector('.px__media'), img=media.querySelector('img');
  var caps=[].slice.call(sec.querySelectorAll('.px-cap'));
  var dots=[].slice.call(sec.querySelectorAll('.px__dots i'));
  var ticking=false, vh=innerHeight, vw=innerWidth, range=0;

  function measure(){
    vh=innerHeight; vw=innerWidth;
    var w=img.getBoundingClientRect().width/(1+(parseFloat(sec.style.getPropertyValue('--p'))||0)*.12);
    // how far the branch can pan sideways so you "travel" along it
    range=Math.max((w*1.12-vw)/2,0)+vw*.03;
  }
  function clamp(x,a,b){return Math.min(b,Math.max(a,x));}

  function update(){
    ticking=false;
    var r=sec.getBoundingClientRect();
    var p=clamp(-r.top/(r.height-vh),0,1);
    sec.style.setProperty('--p',p.toFixed(4));
    media.style.setProperty('--tx',((.5-p)*2*range).toFixed(1)+'px');

    // 3 captions: each owns a third of the scroll, fades in/out at its edges
    var n=caps.length, active=0;
    caps.forEach(function(c,i){
      var a=i/n, b=(i+1)/n, f=.07;
      var o=clamp((p-a)/f,0,1)*clamp((b-p)/f,0,1);
      if(i===0) o=Math.min(1,clamp((b-p)/f,0,1)+ (p<.02?1:0));
      if(i===n-1) o=Math.min(1,clamp((p-a)/f,0,1));
      c.style.opacity=o.toFixed(3);
      c.style.transform='translate3d(0,'+((1-o)*(p<(a+b)/2?24:-24)).toFixed(1)+'px,0)';
      if(p>=a&&p<b) active=i;
    });
    dots.forEach(function(d,i){d.classList.toggle('on',i===active);});
  }
  function req(){ if(!ticking){ticking=true;requestAnimationFrame(update);} }

  addEventListener('scroll',req,{passive:true});
  addEventListener('resize',function(){measure();req();});
  if(img.complete) measure(); else img.addEventListener('load',function(){measure();req();});
  measure(); update();
})();
