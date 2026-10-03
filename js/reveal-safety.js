(() => {
  let observer;

  function activate(root=document){
    const nodes=[...root.querySelectorAll('.v3-reveal')];
    if(!nodes.length) return;

    if(!('IntersectionObserver' in window)){
      nodes.forEach(el=>el.classList.add('is-visible'));
      return;
    }

    if(!observer){
      observer=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },{threshold:.04,rootMargin:'0px 0px 80px 0px'});
    }

    nodes.forEach(el=>{
      if(el.classList.contains('is-visible')) return;
      observer.observe(el);
    });

    // Safety net: never leave content in the current viewport invisible,
    // while preserving the progressive reveal for sections further down the page.
    window.setTimeout(()=>{
      nodes.forEach(el=>{
        if(el.classList.contains('is-visible')) return;
        const rect=el.getBoundingClientRect();
        const nearViewport=rect.top<=window.innerHeight*1.15 && rect.bottom>=-120;
        if(nearViewport) el.classList.add('is-visible');
      });
    },1400);
  }

  function refresh(){
    requestAnimationFrame(()=>activate());
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',refresh,{once:true});
  else refresh();

  document.addEventListener('rb:content-upgraded',refresh);
  document.addEventListener('rb:langchange',refresh);
  window.addEventListener('load',refresh,{once:true});
})();