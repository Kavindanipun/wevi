(function(){
  'use strict';
  var sec=document.querySelector('.sc'); if(!sec) return;
  var reveal=sec.querySelectorAll('.sc-reveal');

  function show(){ sec.classList.add('is-in'); reveal.forEach(function(e){e.classList.add('is-visible');}); }

  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){
      if(en[0].isIntersecting){ show(); io.disconnect(); }
    },{threshold:.15});
    io.observe(sec);
  } else { show(); }

  // dim the other cards while one is hovered
  var cards=sec.querySelectorAll('.sc-card'), row=sec.querySelector('.sc__row');
  if(row && window.matchMedia('(hover: hover)').matches){
    cards.forEach(function(c){
      c.addEventListener('mouseenter',function(){
        cards.forEach(function(o){ if(o!==c) o.style.filter='brightness(.93) saturate(.9)'; });
      });
    });
    row.addEventListener('mouseleave',function(){ cards.forEach(function(o){o.style.filter='';}); });
  }
})();
