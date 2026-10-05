/* HASC Van Tracker — SCREEN 9: Daily Van Sheet and printing */
SCREENS.sheet=sheetHTML;

function sheetHTML(){
  const n=P().length,pending=puPending().length,dp=doPending().length;
  let banner;
  if(pending)banner='<div class="banner p">'+esc(t('inProgPU',{n:pending,total:n}))+'</div>';
  else if(dp)banner='<div class="banner p">'+esc(t('inProgDO',{n:dp}))+'</div>';
  else banner='<div class="banner c">'+esc(t('complete'))+'</div>';
  const rows=P().map(p=>{
    let pu,dr,drT='';
    if(p.pickup==='picked')pu='<div class="s t">'+esc(t('pickedUp'))+'</div>';
    else if(p.pickup==='missed')pu='<div class="s y">'+esc(t('missed'))+' · '+esc(t(p.reason))+'</div>';
    else pu='<div class="s y">'+esc(t('notRecorded'))+'</div>';
    if(p.pickup==='missed')dr='<div class="s m">'+esc(t('na'))+'</div>';
    else if(p.dropoff){dr='<div class="s t">'+esc(t('droppedOff'))+'</div>';drT=p.dropoffTime;}
    else dr='<div class="s m">—</div>';
    return '<div class="tr"><div class="n">'+pname(p)+'</div><div>'+pu+'<div class="tm">'+esc(p.pickupTime||'')+'</div></div><div>'+dr+'<div class="tm">'+esc(drT)+'</div></div></div>';
  }).join('');
  const prow=P().map(p=>{
    let pu,dr,drT='';
    if(p.pickup==='picked')pu=t('pickedUp');else if(p.pickup==='missed')pu=t('missed')+' · '+t(p.reason);else pu=t('notRecorded');
    if(p.pickup==='missed')dr=t('na');else if(p.dropoff){dr=t('droppedOff');drT=p.dropoffTime;}else dr='—';
    return '<tr><td><b>'+pname(p)+'</b></td><td>'+esc(pu)+'</td><td>'+esc(p.pickupTime||'—')+'</td><td>'+esc(dr)+'</td><td>'+esc(drT||'—')+'</td></tr>';
  }).join('');
  const statusTxt=pending?t('inProgPU',{n:pending,total:n}):(dp?t('inProgDO',{n:dp}):t('complete'));
  const psheet='<div class="psheet"><div class="ph"><div class="brandrow">'+LOGO+'<div class="appname">'+esc(t('dailySheet'))+'</div></div><div class="pdate">'+esc(dateLong)+'</div></div>'+
    '<table class="pinfo"><tr><th>'+esc(t('location'))+'</th><td>'+esc(settings.loc)+'</td><th>'+esc(t('vehicle'))+'</th><td>'+esc(settings.van)+'</td></tr>'+
    '<tr><th>'+esc(t('date'))+'</th><td>'+esc(dateShort)+'</td><th>'+esc(t('recordedBy'))+'</th><td>'+esc(settings.staff||'—')+'</td></tr>'+
    '<tr><th>'+esc(t('status'))+'</th><td colspan="3">'+esc(statusTxt)+'</td></tr></table>'+
    '<table class="ptbl"><thead><tr><th>'+esc(t('individual'))+'</th><th>'+esc(t('pickupCol'))+'</th><th>'+esc(t('time'))+'</th><th>'+esc(t('dropoffCol'))+'</th><th>'+esc(t('time'))+'</th></tr></thead><tbody>'+prow+'</tbody></table>'+
    '<div class="psig"><div><div class="sl"></div>'+esc(t('staffSig'))+'</div><div><div class="sl"></div>'+esc(t('date'))+'</div>'+
    '<div><div class="sl"></div>'+esc(t('managerSig'))+'</div><div><div class="sl"></div>'+esc(t('date'))+'</div></div></div>';
  const pvbar='<div class="pvbar"><div>'+esc(t('pvMsg'))+'</div><button class="btn-out" data-act="pvClose" style="align-self:flex-start">'+esc(t('close'))+'</button></div>';
  return pvbar+psheet+'<div class="scr"><div class="sheet-h">'+backBtn('home')+'<div></div></div>'+
    '<div class="h2">'+esc(t('dailySheet'))+'</div>'+
    '<div class="info"><div><div class="k">'+esc(t('location'))+'</div><div class="v">'+esc(settings.loc)+'</div></div>'+
    '<div><div class="k">'+esc(t('vehicle'))+'</div><div class="v">'+esc(settings.van)+'</div></div>'+
    '<div><div class="k">'+esc(t('date'))+'</div><div class="v">'+esc(dateShort)+'</div></div>'+
    '<div><div class="k">'+esc(t('recordedBy'))+'</div><div class="v">'+esc(settings.staff||'—')+'</div></div></div>'+
    banner+
    '<div class="tbl"><div class="tr th"><div>'+esc(t('individual'))+'</div><div>'+esc(t('pickupCol'))+'</div><div>'+esc(t('dropoffCol'))+'</div></div>'+rows+'</div>'+
    '<div class="sig">'+esc(t('managerSig'))+'<div class="sigline"></div></div>'+
    '<button class="big yes noprint" data-act="print"><span class="bi">'+I.printer+'</span>'+esc(t('printBtn'))+'</button></div>';
}

ACTIONS.print=b=>{
  let fired=false;const on=()=>{fired=true;};
  window.addEventListener('beforeprint',on);
  try{window.print();}catch(err){}
  setTimeout(()=>{window.removeEventListener('beforeprint',on);if(!fired){pvOpen=true;render();}},700);
};
ACTIONS.pvClose=b=>{pvOpen=false;render();};