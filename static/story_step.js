// ===== Elements shared
const muteToggle = document.getElementById("muteToggle");
function speak(text){
  if (!text) return;
  if (muteToggle && muteToggle.checked) return;
  try { speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(text)); } catch {}
}
function norm(s){ return (s||"").toLowerCase().replace(/\s+/g," ").trim(); }
function show(el){ el.classList.remove("hidden"); el.scrollIntoView({behavior:"smooth", block:"start"}); }
function hide(el){ el.classList.add("hidden"); }
function stripNum(s){ return (s||"").replace(/^\d+\)\s?/, ""); }
function setBar(el, labelEl, v){ el.style.width = v+"%"; labelEl.textContent = v+"%"; }

// ===== Role step
const roleStep = document.getElementById("roleStep");
const rolePatient = document.getElementById("rolePatient");
const roleCaregiver = document.getElementById("roleCaregiver");

// ===== Patient name + notifications + code
const nameStep = document.getElementById("nameStep");
const patientNameInput = document.getElementById("patientName");
const nameContinue = document.getElementById("nameContinue");
const nameInfo = document.getElementById("nameInfo");
const codeBox = document.getElementById("codeBox");
const codeValue = document.getElementById("codeValue");
const patientNotice = document.getElementById("patientNotice");
const backToRole1 = document.getElementById("backToRole1");

// ===== Patient Q&A
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const summaryCard = document.getElementById("summaryCard");

const q1Label = document.getElementById("q1Label");
const q2Label = document.getElementById("q2Label");
const q3Label = document.getElementById("q3Label");

const ans1 = document.getElementById("ans1");
const ans2 = document.getElementById("ans2");
const ans3 = document.getElementById("ans3");

const next1 = document.getElementById("next1");
const next2 = document.getElementById("next2");
const finish = document.getElementById("finish");
const restart = document.getElementById("restart");
const summaryBox = document.getElementById("summaryBox");

// Patient test charts
const progressWrap = document.getElementById("progressWrap");
const progressNote = document.getElementById("progressNote");
const lastAnswers = document.getElementById("lastAnswers");
const deltaSummary = document.getElementById("deltaSummary");
const bar1Prev = document.getElementById("bar1Prev");
const bar2Prev = document.getElementById("bar2Prev");
const bar3Prev = document.getElementById("bar3Prev");
const barTPrev = document.getElementById("barTPrev");
const bar1PrevV = document.getElementById("bar1PrevV");
const bar2PrevV = document.getElementById("bar2PrevV");
const bar3PrevV = document.getElementById("bar3PrevV");
const barTPrevV = document.getElementById("barTPrevV");
const bar1Now = document.getElementById("bar1Now");
const bar2Now = document.getElementById("bar2Now");
const bar3Now = document.getElementById("bar3Now");
const barTNow = document.getElementById("barTNow");
const bar1NowV = document.getElementById("bar1NowV");
const bar2NowV = document.getElementById("bar2NowV");
const bar3NowV = document.getElementById("bar3NowV");
const barTNowV = document.getElementById("barTNowV");

// ===== Caregiver login + panel
const cgLogin = document.getElementById("cgLogin");
const cgName = document.getElementById("cgName");
const cgPatientName = document.getElementById("cgPatientName");
const cgCode = document.getElementById("cgCode");
const cgEnter = document.getElementById("cgEnter");
const backToRole2 = document.getElementById("backToRole2");
const cgInfo = document.getElementById("cgInfo");

const cgPanel = document.getElementById("cgPanel");
const cgPatientHeader = document.getElementById("cgPatientHeader");
const cgPrevT = document.getElementById("cgPrevT");
const cgPrevTv = document.getElementById("cgPrevTv");
const cgNowT = document.getElementById("cgNowT");
const cgNowTv = document.getElementById("cgNowTv");
const cgNote = document.getElementById("cgNote");
const cgDelta = document.getElementById("cgDelta");
const cgSuggest = document.getElementById("cgSuggest");
const cgSend = document.getElementById("cgSend");
const cgSendInfo = document.getElementById("cgSendInfo");

// ===== Speech (mic) helpers
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
async function ensureMicPermission(){
  if (!navigator.mediaDevices?.getUserMedia) return true;
  try { const s = await navigator.mediaDevices.getUserMedia({audio:true}); s.getTracks().forEach(t=>t.stop()); return true; }
  catch { summaryBox.textContent = "Microphone blocked. Click the lock icon and allow the mic."; return false; }
}
function recordInto(textarea, questionText, stepIndex){
  if (!SR){ alert("Voice input not supported. Try Chrome."); return; }
  ensureMicPermission().then(ok=>{
    if (!ok) return;
    try {
      const rec = new SR(); rec.lang="en-US"; rec.interimResults=false; rec.maxAlternatives=1;
      const old = summaryBox.textContent; summaryBox.textContent="🎤 Listening…";
      rec.onresult = (e)=>{
        summaryBox.textContent = old;
        let t = e.results[0][0].transcript || "";
        if (norm(t)===norm(questionText) || norm(t).startsWith(norm(questionText))){
          summaryBox.textContent="I heard the question instead. Please say your answer."; speak("Please say your answer."); return;
        }
        textarea.value = t; textarea.focus(); textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        speak(`You said: ${t}`);
        if (stepIndex===1){ step1.classList.add("done"); show(step2); speak(stripNum(q2Label.textContent)); ans2.focus(); }
        else if (stepIndex===2){ step2.classList.add("done"); show(step3); speak(stripNum(q3Label.textContent)); ans3.focus(); }
        else if (stepIndex===3){ step3.classList.add("done"); doFinishPatient(); }
      };
      rec.onerror = (e)=>{ let msg="Mic error: "+e.error+". "; if (e.error==="not-allowed") msg+="Allow microphone in site settings."; if (e.error==="no-speech") msg+="I didn't catch that—try again."; if (e.error==="audio-capture") msg+="No mic found."; summaryBox.textContent=msg; };
      rec.start();
    } catch { summaryBox.textContent="Could not start microphone. Check permissions and try again."; }
  });
}

// ===== Storage (patients with sessions, code, suggestions, notifications)
const LS_KEY = "cw_patients";
// { name: { code, sessions:[...], suggestions:[...], notifications:[...] } }

function loadAll(){ try { return JSON.parse(localStorage.getItem(LS_KEY)||"{}"); } catch { return {}; } }
function saveAll(obj){ try { localStorage.setItem(LS_KEY, JSON.stringify(obj)); } catch {} }
function getPatientObj(name, create=false){
  const all = loadAll();
  if (!all[name] && create) all[name] = { code:null, sessions:[], suggestions:[], notifications:[] };
  return all[name] || null;
}
function setPatientObj(name, obj){ const all=loadAll(); all[name]=obj; saveAll(all); }
function ensureCode(name){
  let p = getPatientObj(name, true);
  if (!p.code){
    p.code = String(Math.floor(1000 + Math.random()*9000));
    setPatientObj(name, p);
  }
  return p.code;
}
function saveSession(name, session){
  const p = getPatientObj(name, true);
  p.sessions.push(session);
  p.sessions = p.sessions.slice(-12);
  setPatientObj(name, p);
}
function addSuggestion(name, from, text){
  const p = getPatientObj(name, true);
  p.suggestions.push({ ts: Date.now(), from, text });
  p.notifications.push({ ts: Date.now(), type:"suggestion", from });
  setPatientObj(name, p);
}
function addViewNotification(name, from){
  const p = getPatientObj(name, true);
  p.notifications.push({ ts: Date.now(), type:"view", from });
  setPatientObj(name, p);
}
function lastOfType(name, type){
  const p = getPatientObj(name, false); if (!p) return null;
  for (let i = p.sessions.length-1; i>=0; i--) if (p.sessions[i].type===type) return p.sessions[i];
  return null;
}
function lastRecord(name){ return lastOfType(name, "record"); }
function lastTest(name){ return lastOfType(name, "test"); }

// ===== Mode cadence (ALTERNATE: Record → Test → Record → Test …)
function decideMode(name){
  const p = getPatientObj(name, false);
  if (!p || p.sessions.length === 0) return "record"; // first ever = record
  const last = p.sessions[p.sessions.length - 1];
  return last.type === "record" ? "test" : "record";
}

// ===== Similarity
function wordsSet(s){ return new Set((s||"").toLowerCase().match(/[a-z0-9']+/g)||[]); }
function overlapPct(a,b){
  const A=wordsSet(a), B=wordsSet(b);
  if (A.size===0 && B.size===0) return 100;
  if (A.size===0 || B.size===0) return 0;
  let inter=0; for (const w of A) if (B.has(w)) inter++;
  const union = new Set([...A,...B]).size;
  return Math.round((inter/union)*100);
}

// ===== Patient role flow
let currentName=null, mode="record", compareRecord=null;

rolePatient.onclick = () => {
  hide(roleStep);
  show(nameStep);
  patientNameInput.focus();
};
roleCaregiver.onclick = () => {
  hide(roleStep);
  show(cgLogin);
  cgName.focus();
};
backToRole1.onclick = () => {
  show(roleStep);
  hide(nameStep); hide(step1); hide(step2); hide(step3); hide(summaryCard);
};
backToRole2.onclick = () => {
  show(roleStep);
  hide(cgLogin); hide(cgPanel);
};

nameContinue.onclick = () => {
  const name = (patientNameInput.value||"").trim();
  if (!name){ nameInfo.textContent="Please type a name."; return; }
  currentName = name;

  // code (always show it)
  const code = ensureCode(name);
  codeValue.textContent = code; show(codeBox);

  // latest patient notification (if any)
  const p = getPatientObj(name, true);
  if (p.notifications.length){
    const n = p.notifications[p.notifications.length-1];
    const when = new Date(n.ts).toLocaleString();
    patientNotice.innerHTML = `Notice: Caregiver <b>${n.from || "unknown"}</b> ${n.type==="view"?"viewed your progress":"sent a suggestion"} on ${when}.`;
    show(patientNotice);
  } else hide(patientNotice);

  // decide mode + labels
  mode = decideMode(name);
  setLabels(mode);
  if (mode==="record"){
    nameInfo.textContent = `Hi ${name}. We'll record today's memory.`;
    compareRecord = null;
  } else {
    compareRecord = lastRecord(name);
    if (!compareRecord){
      mode="record"; setLabels(mode);
      nameInfo.textContent = `Hi ${name}. Let's record today's memory.`;
    } else {
      nameInfo.textContent = `Welcome back, ${name}. We'll do a quick memory check from your last record.`;
    }
  }

  show(step1); speak(stripNum(q1Label.textContent)); ans1.focus();
};

const DEFAULT_LABELS = {
  q1: "1) What happened?",
  q2: "2) Where did it happen?",
  q3: "3) Who was with you?"
};
const RECALL_LABELS = {
  q1: "1) What happened last time?",
  q2: "2) Where were you last time?",
  q3: "3) Who was with you last time?"
};
function setLabels(m){
  if (m==="test"){
    q1Label.textContent = RECALL_LABELS.q1;
    q2Label.textContent = RECALL_LABELS.q2;
    q3Label.textContent = RECALL_LABELS.q3;
  } else {
    q1Label.textContent = DEFAULT_LABELS.q1;
    q2Label.textContent = DEFAULT_LABELS.q2;
    q3Label.textContent = DEFAULT_LABELS.q3;
  }
}

// next buttons
next1.onclick = () => { if (ans1.value.trim()) step1.classList.add("done"); show(step2); speak(stripNum(q2Label.textContent)); ans2.focus(); };
next2.onclick = () => { if (ans2.value.trim()) step2.classList.add("done"); show(step3); speak(stripNum(q3Label.textContent)); ans3.focus(); };
finish.onclick = () => { step3.classList.add("done"); doFinishPatient(); };

// patient finish
function doFinishPatient(){
  const a1 = ans1.value.trim(), a2 = ans2.value.trim(), a3 = ans3.value.trim();
  let text = [a1,a2,a3].filter(Boolean).join(" ");
  if (text){ text = text.charAt(0).toUpperCase()+text.slice(1); if (!/[.!?]$/.test(text)) text+="."; }
  else { text = "Thanks. Your memory is saved."; }
  show(summaryCard); summaryBox.textContent=text; speak(text);

  if (mode==="test" && compareRecord){
    // today scores
    const p1 = overlapPct(a1, compareRecord.a1);
    const p2 = overlapPct(a2, compareRecord.a2);
    const p3 = overlapPct(a3, compareRecord.a3);
    const total = Math.round((p1+p2+p3)/3);

    const prevTest = lastTest(currentName);
    const prevTotal = prevTest?.stotal ?? 0;

    show(progressWrap);
    setBar(bar1Now, bar1NowV, p1);
    setBar(bar2Now, bar2NowV, p2);
    setBar(bar3Now, bar3NowV, p3);
    setBar(barTNow, barTNowV, total);

    setBar(bar1Prev, bar1PrevV, prevTest?.s1 ?? 0);
    setBar(bar2Prev, bar2PrevV, prevTest?.s2 ?? 0);
    setBar(bar3Prev, bar3PrevV, prevTest?.s3 ?? 0);
    setBar(barTPrev, barTPrevV, prevTotal);

    const diff = total - prevTotal;
    deltaSummary.textContent = prevTest
      ? (diff>0 ? `Improved by +${diff} pts overall.` : diff<0 ? `Down ${Math.abs(diff)} pts overall.` : `No change overall.`)
      : `This is your first memory test — we’ll compare next time.`;

    const dtr = new Date(compareRecord.ts);
    progressNote.textContent = `Compared with your last record on ${dtr.toLocaleDateString()} ${dtr.toLocaleTimeString()}.`;
    lastAnswers.textContent = `Record used — What: "${compareRecord.a1 || "-"}", Where: "${compareRecord.a2 || "-"}", Who: "${compareRecord.a3 || "-"}".`;

    // save test
    saveSession(currentName, { ts: Date.now(), type:"test", a1,a2,a3, record_ts: compareRecord.ts, s1:p1, s2:p2, s3:p3, stotal: total });
  } else {
    hide(progressWrap); deltaSummary.textContent="";
    saveSession(currentName, { ts: Date.now(), type:"record", a1,a2,a3 });
  }
}

// restart -> back to name step
restart.onclick = () => {
  [ans1,ans2,ans3].forEach(t=>t.value="");
  [step1,step2,step3].forEach(s=>s.classList.remove("done"));
  hide(summaryCard); hide(step1); hide(step2); hide(step3);
  show(nameStep); patientNameInput.focus(); speak("Type the name and press continue.");
};

// Mics
document.getElementById("mic1").onclick = () => recordInto(ans1, stripNum(q1Label.textContent), 1);
document.getElementById("mic2").onclick = () => recordInto(ans2, stripNum(q2Label.textContent), 2);
document.getElementById("mic3").onclick = () => recordInto(ans3, stripNum(q3Label.textContent), 3);

// ===== Caregiver flow
cgEnter.onclick = () => {
  const caregiver = (cgName.value||"").trim();
  const pname = (cgPatientName.value||"").trim();
  const code = (cgCode.value||"").trim();

  if (!caregiver || !pname || !code){ cgInfo.textContent="Please fill all fields."; return; }

  const p = getPatientObj(pname, false);
  if (!p){ cgInfo.textContent="Patient not found."; return; }
  if (p.code !== code){ cgInfo.textContent="Code does not match."; return; }

  // success → notify patient and open dashboard
  addViewNotification(pname, caregiver);

  hide(cgLogin); show(cgPanel);
  cgPatientHeader.innerHTML = `Viewing <b>${pname}</b>. Code verified.`;
  renderCgProgress(pname);
  cgSendInfo.textContent = "";
};

function renderCgProgress(pname){
  const p = getPatientObj(pname,false); if (!p) return;
  // latest and previous tests
  let latest=null, previous=null;
  for (let i=p.sessions.length-1;i>=0;i--){
    if (p.sessions[i].type==="test"){
      if (!latest){ latest=p.sessions[i]; continue; }
      previous = p.sessions[i]; break;
    }
  }

  const prevTotal = previous?.stotal ?? 0;
  const nowTotal  = latest?.stotal ?? 0;

  cgPrevT.style.width = prevTotal + "%"; cgPrevTv.textContent = prevTotal + "%";
  cgNowT.style.width  = nowTotal  + "%"; cgNowTv.textContent  = nowTotal  + "%";

  if (latest){
    const d = nowTotal - prevTotal;
    cgDelta.textContent = previous
      ? (d>0 ? `Improved by +${d} pts overall.` : d<0 ? `Down ${Math.abs(d)} pts overall.` : `No change overall.`)
      : `Only one test so far. Next test will compute a trend.`;
    const when = new Date(latest.ts).toLocaleString();
    cgNote.textContent = `Latest test on ${when}.`;
  } else {
    cgDelta.textContent = "No memory tests yet. Ask the patient to complete at least one test.";
    cgNote.textContent = "";
  }
}

// Caregiver sends suggestion
cgSend.onclick = () => {
  const caregiver = (cgName.value||"").trim();
  const pname = (cgPatientName.value||"").trim();
  const text = (cgSuggest.value||"").trim();
  if (!text){ cgSendInfo.textContent = "Type a short suggestion first."; return; }
  addSuggestion(pname, caregiver, text);
  cgSendInfo.textContent = "Suggestion sent to patient.";
  cgSuggest.value = "";
};

// ===== Initial state
window.addEventListener("load", () => {
  show(roleStep);
  hide(nameStep); hide(step1); hide(step2); hide(step3); hide(summaryCard);
  hide(cgLogin); hide(cgPanel);
});
