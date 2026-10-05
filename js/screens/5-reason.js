/* HASC Van Tracker — SCREEN 5: Why not? (missed reason) */
SCREENS.reason=reasonHTML;

function reasonHTML(){
  const p=find(cur);
  return '<div class="bar">'+backBtn('toPU')+'<div class="count">'+pname(p)+'</div></div>'+
    '<div class="wq grow" style="display:flex;align-items:center;justify-content:center">'+esc(t('qWhy'))+'</div>'+
    '<div class="reasons">'+REASONS.map(r=>'<button class="rs" data-act="reason" data-r="'+r+'">'+esc(t(r))+'</button>').join('')+'</div>';
}

ACTIONS.reason=b=>{const p=find(cur);p.pickup='missed';p.reason=b.dataset.r;p.pickupTime=clock();p.dropoff=false;p.dropoffTime=null;save();afterPU();};
ACTIONS.toPU=b=>go('pu');