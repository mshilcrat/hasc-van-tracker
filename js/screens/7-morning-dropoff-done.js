/* HASC Van Tracker — SCREEN 7: Morning drop-off finished */
SCREENS.amDoDone=amDoDoneHTML;

function amDoDoneHTML(){
  const list=onVan();
  if(!list.length)return '<div class="bar">'+backBtn('home')+'<div></div></div><div class="people grow" style="display:flex;align-items:center;justify-content:center"><div class="empty">'+esc(t('noneOnVan'))+'</div></div><button class="big yes push" data-act="home">'+esc(t('home'))+'</button>';
  const dropped=list.filter(p=>p.amDrop).length,waiting=list.length-dropped;
  return '<div class="badge">'+I.bigcheck+'</div><div class="dt">'+esc(t('amDoFinished'))+'</div>'+
    '<div class="tiles"><div class="tile t"><div class="n">'+dropped+'</div><div class="l">'+esc(t('atDayHab'))+'</div></div>'+
    '<div class="tile y"><div class="n">'+waiting+'</div><div class="l">'+esc(t('lblWaiting'))+'</div></div></div>'+
    '<div class="hint">'+esc(t('tapToChange'))+'</div>'+
    '<div class="people">'+list.map(p=>{
      const c=p.amDrop?'<span class="chip t">'+esc(t('atDayHab'))+'</span>':'<span class="chip y">'+esc(t('waiting'))+'</span>';
      return '<button class="prow" data-act="editAM" data-id="'+p.id+'"><span>'+pname(p)+'</span>'+c+'</button>';
    }).join('')+'</div>'+
    '<button class="big yes" data-act="sheet">'+esc(t('sheetBtn'))+'</button>'+
    '<button class="big later" data-act="home">'+esc(t('home'))+'</button>';
}

ACTIONS.editAM=b=>go('amDo',b.dataset.id);