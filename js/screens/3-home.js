/* HASC Van Tracker — SCREEN 3: Home */
SCREENS.home=homeHTML;

function homeHTML(){
  const n=P().length,pd=n-puPending().length;
  const v=onVan().length,dd=v-doPending().length;
  const puStatus=pd===0?'<div class="ts">'+esc(t('start'))+'</div>':(pd===n?'<div class="ts ok">'+esc(t('finished'))+'</div>':'<div class="ts">'+esc(t('doneOf',{d:pd,n:n}))+'</div>');
  const doStatus=(v>0&&dd===v)?'<div class="ts ok">'+esc(t('finished'))+'</div>':(dd===0?'<div class="ts">'+esc(t('start'))+'</div>':'<div class="ts">'+esc(t('doneOf',{d:dd,n:v}))+'</div>');
  return '<div class="brandrow">'+LOGO+'<div class="appname">'+esc(t('appName'))+'</div></div>'+
    '<div class="where"><div><div class="w1">'+esc(settings.loc)+'</div><div class="w2">'+esc(settings.van)+' · '+esc(t('recordedBy'))+' '+esc(settings.staff)+'</div></div>'+
    '<button class="btn-out" data-act="setup">'+esc(t('change'))+'</button></div>'+
    '<div class="today">'+esc(dateLong)+'</div>'+
    '<div class="tasks"><button class="task" data-act="startPU"><div class="ic y">'+I.sun+'</div><div><div class="tt">'+esc(t('pickup'))+'</div>'+puStatus+'</div><div class="chev">'+I.chev+'</div></button>'+
    '<button class="task" data-act="startDO"><div class="ic t">'+I.home+'</div><div><div class="tt">'+esc(t('dropoff'))+'</div>'+doStatus+'</div><div class="chev">'+I.chev+'</div></button></div>'+
    '<button class="btn-soft push" data-act="sheet">'+I.sheet+esc(t('sheetBtn'))+'</button>';
}

ACTIONS.startPU=b=>{const q=puPending()[0];if(q)go('pu',q.id);else go('puDone');};
ACTIONS.startDO=b=>{if(!onVan().length){go('doDone');return;}const q=doPending()[0];if(q)go('do',q.id);else go('doDone');};