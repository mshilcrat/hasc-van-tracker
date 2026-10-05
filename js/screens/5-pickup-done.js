/* HASC Van Tracker — SCREEN 5: Pick-up finished */
SCREENS.puDone=puDoneHTML;

function puDoneHTML(){
  const picked=onVan().length,missed=P().filter(p=>p.pickup==='missed').length;
  return '<div class="badge">'+I.bigcheck+'</div><div class="dt">'+esc(t('puFinished'))+'</div>'+
    '<div class="tiles"><div class="tile t"><div class="n">'+picked+'</div><div class="l">'+esc(t('lblOnVan'))+'</div></div>'+
    '<div class="tile y"><div class="n">'+missed+'</div><div class="l">'+esc(t('lblNotComing'))+'</div></div></div>'+
    '<div class="hint">'+esc(t('tapToChange'))+'</div>'+
    '<div class="people">'+P().map(p=>{
      const c=p.pickup==='picked'?'<span class="chip t">'+esc(t('pickedUp'))+'</span>':'<span class="chip y">'+esc(t('missed'))+'</span>';
      return '<button class="prow" data-act="editPU" data-id="'+p.id+'"><span>'+pname(p)+'</span>'+c+'</button>';
    }).join('')+'</div>'+
    '<button class="big yes push" data-act="sheet">'+esc(t('sheetBtn'))+'</button>'+
    '<button class="big later" data-act="home">'+esc(t('home'))+'</button>';
}

ACTIONS.editPU=b=>go('pu',b.dataset.id);