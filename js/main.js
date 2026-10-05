/* HASC Van Tracker — START: connects button taps to the screen files, then shows the first screen. */
app.addEventListener('click',e=>{
  const b=e.target.closest('[data-act]');if(!b)return;
  const fn=ACTIONS[b.dataset.act];
  if(fn)fn(b);
});
render();