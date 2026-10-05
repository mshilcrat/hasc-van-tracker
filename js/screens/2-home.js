/* HASC Van Tracker — SCREEN 2: Home */
SCREENS.home=homeHTML;

function taskStatus(done,total){
  if(total>0&&done===total)return '<div class="ts ok">'+esc(t('finished'))+'</div>';
  if(done===0)return '<div class="ts">'+esc(t('start'))+'</div>';
  return '<div class="ts">'+esc(t('doneOf',{d:done,n:total}))+'</div>';
}
function taskBtn(act,icCls,icon,title,status){
  return '<button class="task" data-act="'+act+'"><div class="ic '+icCls+'">'+icon+'</div><div><div class="tt">'+esc(title)+'</div>'+status+'</div><div class="chev">'+I.chev+'</div></button>';
}
function homeHTML(){
  const n=P().length,pd=n-puPending().length;
  const v=onVan().length,am=v-amPending().length,dd=v-doPending().length;
  return '<div class="brandrow">'+LOGO+'<div class="appname">'+esc(t('appName'))+'</div></div>'+
    '<div class="where"><div><div class="w1">'+esc(settings.loc)+'</div><div class="w2">'+esc(settings.van)+' · '+esc(t('recordedBy'))+' '+esc(settings.staff)+'</div></div>'+
    '<button class="btn-out" data-act="toPin">'+esc(t('notYou'))+'</button></div>'+
    '<div class="today">'+esc(dateLong)+'</div>'+
    '<div class="tasks">'+
      taskBtn('startPU','y',I.sun,t('pickup'),taskStatus(pd,n))+
      taskBtn('startAM','t',I.building,t('amDropoff'),taskStatus(am,v))+
      taskBtn('startDO','d',I.home,t('dropoff'),taskStatus(dd,v))+
    '</div>'+
    '<button class="btn-soft push" data-act="sheet">'+I.sheet+esc(t('sheetBtn'))+'</button>';
}

ACTIONS.startPU=b=>{const q=puPending()[0];if(q)go('pu',q.id);else go('puDone');};
ACTIONS.startAM=b=>{if(!onVan().length){go('amDoDone');return;}const q=amPending()[0];if(q)go('amDo',q.id);else go('amDoDone');};
ACTIONS.startDO=b=>{if(!onVan().length){go('doDone');return;}const q=doPending()[0];if(q)go('do',q.id);else go('doDone');};