(function(){
  var views=['accueil','particuliers','entreprises','contact'];
  var top=document.querySelector('.top'),drawer=document.querySelector('.drawer');
  var titles={accueil:'Yurday · Journées sur mesure à Paris',particuliers:'Offrir une journée · Yurday',entreprises:'Séminaires et événements d’entreprise · Yurday',contact:'Nous écrire · Yurday'};

  function show(hash){
    var id=(hash||'').replace('#',''),target=null;
    if(views.indexOf(id)===-1){
      var el=id?document.getElementById(id):null;
      if(el){var v=el.closest('.view');if(v){target=el;id=v.dataset.view;}}
      if(views.indexOf(id)===-1)id='accueil';
    }
    document.querySelectorAll('.view').forEach(function(v){v.classList.toggle('on',v.dataset.view===id)});
    document.querySelectorAll('[data-nav]').forEach(function(a){a.classList.toggle('on',a.dataset.nav===id)});
    drawer.classList.remove('open');document.title=titles[id];
    if(target)setTimeout(function(){target.scrollIntoView({behavior:'smooth'})},80);else window.scrollTo(0,0);
    setTimeout(observe,60);onScroll();
  }
  window.addEventListener('hashchange',function(){show(location.hash)});

  function onScroll(){top.classList.toggle('solid',window.scrollY>window.innerHeight*0.6);}
  window.addEventListener('scroll',onScroll,{passive:true});
  document.querySelector('.menu-btn').addEventListener('click',function(){drawer.classList.add('open')});
  drawer.querySelector('.close').addEventListener('click',function(){drawer.classList.remove('open')});

  var io='IntersectionObserver' in window?new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12,rootMargin:'0px 0px -5% 0px'}):null;
  function observe(){document.querySelectorAll('.view.on .rv:not(.in),.view.on .reveal:not(.in),footer .rv:not(.in)').forEach(function(el){if(io)io.observe(el);else el.classList.add('in');});}

  /* vidéo */
  var vid=document.querySelector('.hero video');
  if(vid){
    vid.src=(window.innerWidth<900?vid.dataset.sd:vid.dataset.hd)||vid.dataset.sd;
    var pr=vid.play();if(pr&&pr.catch)pr.catch(function(){});
    var pb=document.querySelector('.hero .pause');
    pb.addEventListener('click',function(){if(vid.paused){vid.play();pb.textContent='Pause';}else{vid.pause();pb.textContent='Lecture';}});
  }

  /* galerie */
  document.querySelectorAll('.gallery').forEach(function(s){
    var down=false,x0=0,s0=0;
    s.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;x0=e.clientX;s0=s.scrollLeft;s.classList.add('drag');});
    window.addEventListener('pointermove',function(e){if(down)s.scrollLeft=s0-(e.clientX-x0);});
    window.addEventListener('pointerup',function(){if(down){down=false;s.classList.remove('drag');}});
    var c=document.querySelector('[data-strip="'+s.id+'"]');
    if(c){c.querySelector('.prev').addEventListener('click',function(){s.scrollBy({left:-s.clientWidth*.6,behavior:'smooth'})});
          c.querySelector('.next').addEventListener('click',function(){s.scrollBy({left:s.clientWidth*.6,behavior:'smooth'})});}
  });

  /* avis */
  document.querySelectorAll('.quotes').forEach(function(q){
    var it=q.querySelectorAll('.quote'),dots=q.parentNode.querySelector('.dots'),i=0,t;
    it.forEach(function(_,k){var b=document.createElement('button');b.setAttribute('aria-label','Avis '+(k+1));b.onclick=function(){go(k);rs();};dots.appendChild(b);});
    function go(k){it[i].classList.remove('on');dots.children[i].classList.remove('on');i=k;it[i].classList.add('on');dots.children[i].classList.add('on');}
    function rs(){clearInterval(t);t=setInterval(function(){go((i+1)%it.length)},7000);}
    go(0);rs();
  });

  /* journées */
  document.querySelectorAll('.day').forEach(function(d){
    var imgs=d.querySelectorAll('.frame img'),steps=d.querySelectorAll('.step');
    if(!('IntersectionObserver' in window))return;
    var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){
      var k=[].indexOf.call(steps,e.target);
      steps.forEach(function(s,j){s.classList.toggle('on',j===k)});imgs.forEach(function(m,j){m.classList.toggle('on',j===k)});
    }});},{rootMargin:'-45% 0px -45% 0px'});
    steps.forEach(function(s){o.observe(s)});
  });
  document.querySelectorAll('.tabs button').forEach(function(b){
    b.addEventListener('click',function(){
      document.querySelectorAll('.tabs button').forEach(function(x){x.classList.toggle('on',x===b)});
      document.querySelectorAll('.day').forEach(function(d){d.hidden=d.id!==b.dataset.day});
      document.getElementById('journees').scrollIntoView({behavior:'smooth'});
    });
  });

  /* occasions */
  document.querySelectorAll('.occ').forEach(function(o){
    var lis=o.querySelectorAll('li'),imgs=o.querySelectorAll('.viewer img');
    function act(k){lis.forEach(function(l,j){l.classList.toggle('on',j===k)});imgs.forEach(function(m,j){m.classList.toggle('on',j===k)});}
    lis.forEach(function(l,k){l.addEventListener('mouseenter',function(){if(window.innerWidth>900)act(k)});l.querySelector('button').addEventListener('click',function(){act(k)});});
  });

  /* FAQ */
  document.querySelectorAll('.qa button').forEach(function(b){
    b.addEventListener('click',function(){var qa=b.parentNode,a=qa.querySelector('.a'),op=qa.classList.toggle('open');a.style.maxHeight=op?a.scrollHeight+'px':'0px';b.setAttribute('aria-expanded',op);});
  });

  /* formulaires (Netlify Forms) */
  document.querySelectorAll('form.yd').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var msg=f.querySelector('.form-msg'),btn=f.querySelector('button[type=submit]');btn.disabled=true;btn.style.opacity=.5;
      fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(f)).toString()})
        .then(function(r){if(!r.ok)throw 0;
          msg.innerHTML='<div class="subtitle">Merci. <em>Nous revenons vers vous très vite.</em></div><p>Sous 12 h, entre 9 h et 20 h. Tout ce que vous nous avez confié reste entre nous.</p>';
          msg.classList.add('on');f.querySelectorAll('.f').forEach(function(x){x.style.display='none'});})
        .catch(function(){
          msg.innerHTML='<p>L’envoi n’a pas pu aboutir depuis cette page. Écrivez-nous à <strong>contact@yurday.fr</strong> ou au <strong>+33 7 43 70 39 02</strong>.</p>';
          msg.classList.add('on');btn.disabled=false;btn.style.opacity=1;});
    });
  });

  show(location.hash);
})();
