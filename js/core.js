/* HASC Van Tracker — CORE: shared helpers, saved data, icons, and screen switching.
 * Each screen lives in its own file in js/screens/. */
// Stop with a clear message if a settings file is missing or has a typo.
if(typeof I18N==='undefined'||typeof LOCATIONS==='undefined'||typeof VANS==='undefined'||typeof EMPLOYEES==='undefined'||typeof REASONS==='undefined'||typeof loadRoster!=='function'){
  document.getElementById('app').innerHTML='<div style="padding:24px;font-size:18px;font-weight:700">The app could not start. A settings file (js/config.js or js/i18n.js) is missing or has a typo. Undo the last change and try again.</div>';
  throw new Error('Van Tracker: config or translations failed to load');
}
function detectLang(){
  const list=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language||'en'];
  for(const l of list){const p=String(l||'').toLowerCase().split('-')[0];if(I18N[p])return p;}
  return 'en';
}
const LANG=detectLang();document.documentElement.lang=LANG;
function t(k,v){let s=I18N[LANG][k]!==undefined?I18N[LANG][k]:I18N.en[k];if(v)for(const x in v)s=s.split('{'+x+'}').join(v[x]);return s;}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

function store(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
function load(k){try{const r=localStorage.getItem(k);return r?JSON.parse(r):null;}catch(e){return null;}}

const now=new Date();
const dayKey=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
const dateLong=now.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'});
const dateShort=now.toLocaleDateString(undefined,{month:'2-digit',day:'2-digit',year:'numeric'});
const clock=()=>new Date().toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit'});

let settings=load('vt:settings')||{loc:LOCATIONS[0],van:VANS[0],staff:''};
if(LOCATIONS.indexOf(settings.loc)<0)settings.loc=LOCATIONS[0];
if(VANS.indexOf(settings.van)<0)settings.van=VANS[0];

const sessKey=()=>'vt:'+dayKey+':'+settings.loc+':'+settings.van;
let sess;
function openSession(){sess=load(sessKey());if(!sess||!Array.isArray(sess.people))sess={people:loadRoster()};}
function save(){store(sessKey(),sess);}
openSession();

let screen=settings.staff?'home':'pin';
let pin='',pinErr=false;
let cur=null;               // current person id in a flow
let draft=null;             // setup draft
let setupErr=false;
let pvOpen=false;

const P=()=>sess.people;
const find=id=>P().find(p=>p.id===id);
const pname=p=>esc(t('individual'))+' '+p.num;
const onVan=()=>P().filter(p=>p.pickup==='picked');
const puPending=()=>P().filter(p=>!p.pickup);
const doPending=()=>onVan().filter(p=>!p.dropoff);

const I={
  check:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  bigcheck:'<svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  x:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  back:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
  chev:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
  sun:'<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>',
  home:'<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 11L12 4l8.5 7"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/></svg>',
  printer:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/></svg>',
  sheet:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3h7l4 4v14H7z"/><path d="M10 12h6M10 16h6"/></svg>'
};
const LOGO='<img class="logo" src="assets/hasc-logo.png" alt="HASC Center"><span class="bdiv" aria-hidden="true"></span>';

function backBtn(act){return '<button class="back noprint" data-act="'+act+'">'+I.back+esc(t('back'))+'</button>';}
function dotsHTML(list,curId,dropMode){
  return '<div class="dots" aria-hidden="true">'+list.map(p=>{
    let c='dot';
    if(dropMode){if(p.dropoff)c+=' p';}else{if(p.pickup==='picked')c+=' p';else if(p.pickup==='missed')c+=' m';}
    if(p.id===curId)c+=' cur';
    return '<span class="'+c+'"></span>';
  }).join('')+'</div>';
}
function statusText(p){if(p.pickup==='picked')return t('pickedUp');if(p.pickup==='missed')return t('missed')+' · '+t(p.reason);return '';}

/* ---------- screens ---------- */

/* Screen and button registries: each file in js/screens/ adds to these. */
const SCREENS={};   // screen name -> function that returns its HTML
const ACTIONS={};   // button data-act -> function(button)

const app=document.getElementById('app');
function render(){
  if(screen==='setup'&&!draft)draft={loc:settings.loc,van:settings.van,staff:settings.staff};
  app.className='app'+((screen==='pu'||screen==='do'||screen==='reason')?' flow':'');
  if(screen!=='sheet')pvOpen=false;
  document.body.classList.toggle('pv-open',screen==='sheet'&&pvOpen);
  if(typeof SCREENS[screen]!=='function'){
    app.innerHTML='<div style="padding:24px;font-size:18px;font-weight:700">This screen could not load ('+esc(screen)+'). A file in js/screens/ is missing or has a typo. Undo the last change and try again.</div>';
    return;
  }
  app.innerHTML=SCREENS[screen]();
  window.scrollTo(0,0);
}
function go(s,id){screen=s;if(id!==undefined)cur=id;render();}

/* next person after `id` in `list`, wrapping; null if none */
function nextAfter(list,id){
  if(!list.length)return null;
  const all=P(),idx=all.findIndex(p=>p.id===id);
  for(let k=1;k<=all.length;k++){const q=all[(idx+k)%all.length];if(list.indexOf(q)>=0)return q;}
  return null;
}
function afterPU(){const n=nextAfter(puPending(),cur);if(n)go('pu',n.id);else go('puDone');}

/* Buttons used on more than one screen */
ACTIONS.home=b=>go('home');
ACTIONS.sheet=b=>go('sheet');