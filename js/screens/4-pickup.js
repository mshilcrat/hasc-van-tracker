/* HASC Van Tracker — SCREEN 4: Morning pick-up (one person at a time) */
SCREENS.pu=puHTML;

function puHTML(){
  const p=find(cur),list=P(),i=list.indexOf(p)+1;
  return '<div class="bar">'+backBtn('home')+'<div class="count">'+esc(t('ofN',{i:i,n:list.length}))+'</div></div>'+
    dotsHTML(list,p.id,false)+
    '<div class="who grow"><div class="pname">'+pname(p)+'</div>'+
    (p.pickup?'<div class="now">'+esc(t('current',{s:statusText(p)}))+'</div>':'')+
    '<div class="q">'+esc(t('qPick'))+'</div></div>'+
    '<div class="acts"><button class="big yes" data-act="pick"><span class="bi">'+I.check+'</span>'+esc(t('yesVan'))+'</button>'+
    '<button class="big no" data-act="miss"><span class="bi">'+I.x+'</span>'+esc(t('noVan'))+'</button></div>';
}

ACTIONS.pick=b=>{const p=find(cur);p.pickup='picked';p.reason=null;p.pickupTime=clock();save();afterPU();};
ACTIONS.miss=b=>go('reason');