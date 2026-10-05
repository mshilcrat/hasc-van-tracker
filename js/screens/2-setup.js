/* HASC Van Tracker — SCREEN 2: Before you start (name, location, van) */
SCREENS.setup=setupHTML;

function setupHTML(){
  const d=draft;
  const canBack=!!settings.staff;
  return (canBack?'<div class="bar">'+backBtn('home')+'<div></div></div>':'')+
    '<div class="brandrow">'+LOGO+'<div class="appname">'+esc(t('appName'))+'</div></div>'+
    '<div class="h2">'+esc(t('setupTitle'))+'</div>'+
    '<div><div class="lbl">'+esc(t('whoAreYou'))+'</div><div class="where"><div class="w1">'+esc(d.staff)+'</div><button class="btn-out" data-act="toPin">'+esc(t('notYou'))+'</button></div></div>'+
    '<div><div class="lbl">'+esc(t('location'))+'</div><div class="opts">'+LOCATIONS.map(l=>'<button class="opt'+(l===d.loc?' on':'')+'" data-act="pickLoc" data-v="'+esc(l)+'" aria-pressed="'+(l===d.loc)+'"><span>'+esc(l)+'</span>'+(l===d.loc?I.check:'')+'</button>').join('')+'</div></div>'+
    '<div><div class="lbl">'+esc(t('vehicle'))+'</div><div class="opts row">'+VANS.map(v=>'<button class="opt'+(v===d.van?' on':'')+'" data-act="pickVan" data-v="'+esc(v)+'" aria-pressed="'+(v===d.van)+'">'+esc(v)+'</button>').join('')+'</div></div>'+
    '<button class="big yes push" data-act="saveSetup">'+esc(t('save'))+'</button>';
}

ACTIONS.setup=b=>{draft=null;setupErr=false;go('setup');};
ACTIONS.pickLoc=b=>{draft.loc=b.dataset.v;render();};
ACTIONS.pickVan=b=>{draft.van=b.dataset.v;render();};
ACTIONS.saveSetup=b=>{
  const name=(draft.staff||'').trim();
  if(!name){setupErr=true;render();return;}
  settings={loc:draft.loc,van:draft.van,staff:name};store('vt:settings',settings);
  draft=null;setupErr=false;openSession();go('home');
};