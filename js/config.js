/* HASC Van Tracker — SETTINGS
 * Edit this file to change locations, vans, staff PINs, missed reasons, or the roster.
 * Keep every quote, comma and bracket. After saving, reload the app to check it still opens.
 */
const LOCATIONS=['East 14th Day Hab','East 35th Day Hab','NYA Day Hab'];
// Staff list: each PIN loads that matron's name, location and van automatically.
// Demo staff for testing only. Replace with the real staff list before use.
const EMPLOYEES=[
  {pin:'1111',name:'Demo Staff One',  loc:'East 14th Day Hab',van:'VAN-12'},
  {pin:'2222',name:'Demo Staff Two',  loc:'East 35th Day Hab',van:'VAN-07'},
  {pin:'1234',name:'Demo Staff Three',loc:'NYA Day Hab',      van:'VAN-21'}
];
const VANS=['VAN-12','VAN-07','VAN-21'];
const REASONS=['absent','refused','notReady','other'];

// Individuals on the van. Loaded automatically after the PIN, for that matron's location and van.
// Demo roster is generated at runtime. No individual names are stored in this file.
// Later this can be replaced with a real roster source (for example Supabase).
function loadRoster(loc,van){return Array.from({length:8},(_,i)=>({id:'demo-'+(i+1),num:String(i+1).padStart(2,'0'),pickup:null,reason:null,pickupTime:null,amDrop:false,amDropTime:null,dropoff:false,dropoffTime:null}));}