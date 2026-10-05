/* HASC Van Tracker — SCREEN 1: PIN pad */
SCREENS.pin=pinHTML;

function pinHTML(){
  const dots=[0,1,2,3].map(i=>'<span class="pd'+(i<pin.length?' on':'')+'"></span>').join('');
  const keys=['1','2','3','4','5','6','7','8','9'].map(k=>'<button class="key" data-act="key" data-k="'+k+'">'+k+'</button>').join('')+
    '<span></span><button class="key" data-act="key" data-k="0">0</button><button class="key del" data-act="del" aria-label="'+esc(t('del'))+'"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 5H9l-6 7 6 7h12z"/><path d="M12.5 9.5l5 5M17.5 9.5l-5 5"/></svg></button>';
  return ((settings.staff||draft)?'<div class="bar">'+backBtn('pinBack')+'<div></div></div>':'')+
    '<div class="brandrow">'+LOGO+'<div class="appname">'+esc(t('appName'))+'</div></div>'+
    '<div class="pinwrap grow"><div class="h2" style="text-align:center">'+esc(t('enterPin'))+'</div>'+
    '<div class="pindots" role="status" aria-label="'+pin.length+' / 4">'+dots+'</div>'+
    '<div class="pinerr" aria-live="polite">'+(pinErr?esc(t('pinWrong')):'')+'</div></div>'+
    '<div class="keypad">'+keys+'</div>';
}

function pinKey(k){
  if(pin.length>=4)return;
  pin+=k;pinErr=false;
  if(pin.length<4){render();return;}
  const emp=EMPLOYEES.find(x=>x.pin===pin);
  pin='';
  if(emp){if(!draft)draft={loc:settings.loc,van:settings.van,staff:''};draft.staff=emp.name;go('setup');}
  else{pinErr=true;render();}
}

ACTIONS.key=b=>pinKey(b.dataset.k);
ACTIONS.del=b=>{pin=pin.slice(0,-1);pinErr=false;render();};
ACTIONS.toPin=b=>{pin='';pinErr=false;go('pin');};
ACTIONS.pinBack=b=>{pin='';pinErr=false;go(draft?'setup':'home');};

/* Typing digits on a keyboard also works */
document.addEventListener('keydown',e=>{
  if(screen!=='pin')return;
  if(/^[0-9]$/.test(e.key)){pinKey(e.key);e.preventDefault();}
  else if(e.key==='Backspace'){pin=pin.slice(0,-1);pinErr=false;render();e.preventDefault();}
});