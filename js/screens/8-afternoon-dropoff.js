/* HASC Van Tracker — SCREEN 8: Afternoon drop-off (one person at a time) */
SCREENS.do=doHTML;

function doHTML(){
  const list=onVan(),p=find(cur),i=list.indexOf(p)+1;
  return '<div class="bar">'+backBtn('home')+'<div class="count">'+esc(t('ofN',{i:i,n:list.length}))+'</div></div>'+
    dotsHTML(list,p.id,'dropoff')+
    '<div class="who grow"><div class="pname">'+pname(p)+'</div>'+
    (p.dropoff?'<div class="now">'+esc(t('current',{s:t('droppedOff')}))+'</div>':'')+
    '<div class="q">'+esc(t('qDrop'))+'</div></div>'+
    '<div class="acts"><button class="big yes" data-act="drop"><span class="bi">'+I.check+'</span>'+esc(t('yesDrop'))+'</button>'+
    '<button class="big later" data-act="notYet">'+esc(t('notYet'))+'</button></div>';
}

ACTIONS.drop=b=>{const p=find(cur);p.dropoff=true;p.dropoffTime=clock();save();const n=nextAfter(doPending(),cur);if(n)go('do',n.id);else go('doDone');};
ACTIONS.notYet=b=>{const p=find(cur);p.dropoff=false;p.dropoffTime=null;save();const others=doPending().filter(q=>q.id!==cur);const n=nextAfter(others,cur);if(n)go('do',n.id);else go('doDone');};