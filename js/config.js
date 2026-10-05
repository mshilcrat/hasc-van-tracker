/* HASC Van Tracker — SETTINGS
 * Edit this file to change locations, vans, staff PINs, missed reasons, or the roster.
 * Keep every quote, comma and bracket. After saving, reload the app to check it still opens.
 */
const LOCATIONS=['East 14th Day Hab','East 35th Day Hab','NYA Day Hab'];
// Demo employees for testing only. Replace with the real staff list (PIN + name) before use.
const EMPLOYEES=[{pin:'1111',name:'Demo Staff One'},{pin:'2222',name:'Demo Staff Two'},{pin:'1234',name:'Demo Staff Three'}];
const VANS=['VAN-12','VAN-07','VAN-21'];
const REASONS=['absent','refused','notReady','other'];

// Demo roster is generated at runtime. No individual names are stored in this file.
function loadRoster(){return Array.from({length:8},(_,i)=>({id:'demo-'+(i+1),num:String(i+1).padStart(2,'0'),pickup:null,reason:null,pickupTime:null,dropoff:false,dropoffTime:null}));}