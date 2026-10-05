/* HASC Van Tracker — SCREEN 6: Morning drop-off at Day Hab (one person at a time) */
SCREENS.amDo=amDoHTML;

function amDoHTML(){
  const list=onVan(),p=find(cur),i=list.indexOf(p)+1;
  return '<div class="bar">'+backBtn('home')+'<div class="count">'+esc(t('ofN',{i:i,n:list.length}))+'</div></div>'+
    dotsHTML(list,p.id,'amDrop')+
    '<div class="who grow"><div class="pname">'+pname(p)+'</div>'+
    (p.amDrop?'<div class="now">'+esc(t('current',{s:t('atDayHab')}))+'</div>':'')+
    '<div class="q">'+esc(t('qDropAm'))+'</div></div>'+
    '<div class="acts"><button class="big yes" data-act="amDrop"><span class="bi">'+I.check+'</span>'+esc(t('yesDropAm'))+'</button>'+
    '<button class="big later" data-act="amNotYet">'+esc(t('notYet'))+'</button></div>';
}

ACTIONS.amDrop=b=>{const p=find(cur);p.amDrop=true;p.amDropTime=clock();save();const n=nextAfter(amPending(),cur);if(n)go('amDo',n.id);else go('amDoDone');};
ACTIONS.amNotYet=b=>{const p=find(cur);p.amDrop=false;p.amDropTime=null;save();const others=amPending().filter(q=>q.id!==cur);const n=nextAfter(others,cur);if(n)go('amDo',n.id);else go('amDoDone');};