/* Translations for UI text and TTS */
const I18N = {
  en: {
    warm1:"Warm-up 1) How was your day?",
    warm2:"Warm-up 2) What stood out today?",
    warm3:"Warm-up 3) Can you tell it briefly?",
    q1:"1) What happened?",
    q2:"2) Where did it happen?",
    q3:"3) Who was with you?",
    cont:"Continue", finish:"Finish", restart:"Start new",
    youSaid:"You said:", heardQuestion:"I heard the question instead. Please say your answer.",
    summaryTitle:"Your short memory", resultsTitle:"Memory check results",
    prevTitle:"Previous test", todayTitle:"Today",
    labWhat:"What", labWhere:"Where", labWho:"Who", labTotal:"Total",
    revealTitle:"Show last record used for comparison",
    compareFirst:"This is your first memory test — we’ll compare next time.",
    improved: d=>`Improved by +${d} pts overall.`,
    worse: d=>`Down ${Math.abs(d)} pts overall.`, nochange:"No change overall.",
    micBlocked:"Microphone blocked. Click the lock icon and allow the mic.",
    micNoSpeech:"I didn't catch that—try again.", micNoMic:"No mic found.",
    pleaseAnswer:"Please say your answer.", promptName:"Type the name and press continue.",
    hiMsg:n=>`Hi ${n}. We’ll start with three short warm-ups, then a quick memory.`,
    backMsg:n=>`Welcome back, ${n}. We’ll do a short recall from last time, then the memory check.`,
    suggTitle:"Suggestions from caregiver",
    translated:"Translated", original:"Original"
  },
  hi: {
    warm1:"वार्म-अप 1) आपका दिन कैसा था?",
    warm2:"वार्म-अप 2) आज सबसे खास क्या रहा?",
    warm3:"वार्म-अप 3) क्या आप संक्षेप में बता सकते हैं?",
    q1:"1) क्या हुआ?", q2:"2) यह कहाँ हुआ?", q3:"3) आपके साथ कौन था?",
    cont:"जारी रखें", finish:"समाप्त करें", restart:"नया शुरू करें",
    youSaid:"आपने कहा:", heardQuestion:"मुझे प्रश्न ही सुनाई दिया। कृपया अपना उत्तर बोलें।",
    summaryTitle:"आपकी छोटी स्मृति", resultsTitle:"मेमोरी जाँच परिणाम",
    prevTitle:"पिछला परीक्षण", todayTitle:"आज",
    labWhat:"क्या", labWhere:"कहाँ", labWho:"कौन", labTotal:"कुल",
    revealTitle:"तुलना के लिए उपयोग किया गया अंतिम रिकॉर्ड दिखाएँ",
    compareFirst:"यह आपका पहला मेमोरी टेस्ट है — अगली बार तुलना करेंगे।",
    improved: d=>`कुल मिलाकर +${d} अंक बेहतर।`,
    worse: d=>`कुल मिलाकर ${Math.abs(d)} अंक कम।`, nochange:"कुल मिलाकर कोई बदलाव नहीं।",
    micBlocked:"माइक्रोफ़ोन ब्लॉक है। लॉक आइकन पर क्लिक करके अनुमति दें।",
    micNoSpeech:"मैंने नहीं सुना—फिर से प्रयास करें।", micNoMic:"माइक्रोफ़ोन नहीं मिला。",
    pleaseAnswer:"कृपया अपना उत्तर बोलें।", promptName:"नाम टाइप करें और आगे बढ़ें。",
    hiMsg:n=>`नमस्ते ${n}। हम तीन छोटे वार्म-अप से शुरू करेंगे, फिर मेमोरी दर्ज करेंगे।`,
    backMsg:n=>`वापसी पर स्वागत है, ${n}। पिछली बार से याद करो, फिर मेमोरी जाँच करेंगे।`,
    suggTitle:"देखभालकर्ता से सुझाव",
    translated:"अनुवाद", original:"मूल"
  },
  es: {
    warm1:"Calentamiento 1) ¿Cómo fue tu día?",
    warm2:"Calentamiento 2) ¿Qué fue lo más destacado de hoy?",
    warm3:"Calentamiento 3) ¿Puedes contarlo brevemente?",
    q1:"1) ¿Qué pasó?", q2:"2) ¿Dónde ocurrió?", q3:"3) ¿Quién estaba contigo?",
    cont:"Continuar", finish:"Finalizar", restart:"Empezar de nuevo",
    youSaid:"Dijiste:", heardQuestion:"Escuché la pregunta. Por favor, di tu respuesta.",
    summaryTitle:"Tu memoria corta", resultsTitle:"Resultados de la prueba de memoria",
    prevTitle:"Prueba anterior", todayTitle:"Hoy",
    labWhat:"Qué", labWhere:"Dónde", labWho:"Quién", labTotal:"Total",
    revealTitle:"Mostrar el último registro usado para la comparación",
    compareFirst:"Esta es tu primera prueba — compararemos la próxima vez.",
    improved:d=>`Mejoró +${d} puntos en total.`,
    worse:d=>`Bajó ${Math.abs(d)} puntos en total.`, nochange:"Sin cambios en total.",
    micBlocked:"Micrófono bloqueado. Permite el micrófono.",
    micNoSpeech:"No te escuché—intenta de nuevo.", micNoMic:"No se encontró micrófono.",
    pleaseAnswer:"Por favor, di tu respuesta.", promptName:"Escribe el nombre y continúa.",
    hiMsg:n=>`Hola ${n}. Empezamos con tres calentamientos y luego una memoria corta.`,
    backMsg:n=>`Bienvenido de nuevo, ${n}. Hagamos un recuerdo y la prueba de memoria.`,
    suggTitle:"Sugerencias del cuidador",
    translated:"Traducido", original:"Original"
  },
  zh: {
    warm1:"热身 1) 今天过得怎么样？",
    warm2:"热身 2) 今天最特别的是什么？",
    warm3:"热身 3) 你能简单说一下吗？",
    q1:"1) 发生了什么？", q2:"2) 在哪里发生的？", q3:"3) 谁和你在一起？",
    cont:"继续", finish:"完成", restart:"重新开始",
    youSaid:"你说：", heardQuestion:"我听到的是问题本身。请说你的答案。",
    summaryTitle:"你的简短记忆", resultsTitle:"记忆检查结果",
    prevTitle:"上次测试", todayTitle:"今天",
    labWhat:"什么", labWhere:"哪里", labWho:"谁", labTotal:"总分",
    revealTitle:"显示用于对比的上次记录",
    compareFirst:"这是你的第一次测试——我们下次再比较。",
    improved:d=>`总分提升 +${d}。`,
    worse:d=>`总分下降 ${Math.abs(d)}。`, nochange:"总分无变化。",
    micBlocked:"麦克风被阻止。请允许使用麦克风。",
    micNoSpeech:"没听清——请再试一次。", micNoMic:"未找到麦克风。",
    pleaseAnswer:"请说出你的答案。", promptName:"输入名字并继续。",
    hiMsg:n=>`你好，${n}。先做三个热身，再记录记忆。`,
    backMsg:n=>`欢迎回来，${n}。先回忆上次，再进行记忆检查。`,
    suggTitle:"护理人员的建议",
    translated:"翻译", original:"原文"
  }
};

/* Speech engine language tags */
const LANG_TAG = { en:"en-US", hi:"hi-IN", es:"es-ES", zh:"zh-CN" };

/* Simple phrase swap for demo translations inside suggestions */
const DEMO_DICT = {
  hi: {"good job":"बहुत अच्छा","try again tomorrow":"कल फिर प्रयास करें","take a short walk":"थोड़ी सैर करें","drink water":"पानी पिएँ","call your friend":"अपने दोस्त को कॉल करें"},
  es: {"good job":"buen trabajo","try again mañana":"inténtalo de nuevo mañana","take a short walk":"da un paseo corto","drink water":"bebe agua","call your friend":"llama a tu amigo"},
  zh: {"good job":"做得好","try again tomorrow":"明天再试","take a short walk":"去散个小步","drink water":"多喝水","call your friend":"给朋友打电话"}
};

/* Replace known phrases for non-English suggestions */
function translateSuggestion(text, targetLang){
  if (!text) return "";
  if (targetLang === "en") return text;
  const dict = DEMO_DICT[targetLang] || {};
  let out = text;
  Object.keys(dict).forEach(ph=>{
    const re = new RegExp(ph.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'ig');
    out = out.replace(re, dict[ph]);
  });
  return out;
}

/* Runtime state */
let currentLang = "en";
let currentVoice = null;

/* Shorthand to get messages for current language */
function T(){ return I18N[currentLang] || I18N.en; }

/* Try to pick a voice that matches the language */
function pickVoiceFor(tag){
  const voices = speechSynthesis.getVoices() || [];
  let v = voices.find(v=>v.lang === tag);
  if (v) return v;
  const pref = tag.split("-")[0];
  v = voices.find(v=>v.lang && v.lang.startsWith(pref));
  return v || null;
}

/* Text-to-speech wrapper with mute control */
const muteToggle = document.getElementById("muteToggle");
function speak(text){
  if (!text) return;
  if (muteToggle && muteToggle.checked) return;
  try{
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const tag = LANG_TAG[currentLang] || "en-US";
    if (!currentVoice) currentVoice = pickVoiceFor(tag);
    if (!currentVoice && speechSynthesis.onvoiceschanged === null){
      speechSynthesis.onvoiceschanged = () => { currentVoice = pickVoiceFor(tag); speechSynthesis.onvoiceschanged = null; };
    }
    if (currentVoice) u.voice = currentVoice;
    u.lang = tag;
    speechSynthesis.speak(u);
  }catch{}
}

/* Small helpers for UI state */
function norm(s){ return (s||"").toLowerCase().replace(/\s+/g," ").trim(); }
function show(el){ el.classList.remove("hidden"); el.scrollIntoView({behavior:"smooth", block:"start"}); }
function hide(el){ el.classList.add("hidden"); }
function stripNum(s){ return (s||"").replace(/^\d+\)\s?/, ""); }
function setBar(el, labelEl, v){ el.style.width = v+"%"; labelEl.textContent = v+"%"; }

/* Toast with patient code on first language set */
function showCodeToast(code){
  const t = document.createElement("div");
  t.id = "codeToast";
  Object.assign(t.style, {
    position:"fixed", left:"50%", top:"20px", transform:"translateX(-50%)",
    zIndex:"9999", background:"#111827", color:"#fff",
    padding:"10px 14px", borderRadius:"10px", boxShadow:"0 8px 24px rgba(0,0,0,.25)"
  });
  t.textContent = `Your secret code: ${code}`;
  document.body.appendChild(t);
  setTimeout(()=> t.remove(), 5000);
}

/* Keep suggestions panel near the current step */
function mountSuggestions(beforeEl){
  if (!patientSuggestions || !beforeEl) return;
  patientSuggestions.classList.remove("hidden");
  beforeEl.parentNode.insertBefore(patientSuggestions, beforeEl);
}

/* Cache DOM elements once */
const roleStep = document.getElementById("roleStep");
const rolePatient = document.getElementById("rolePatient");
const roleCaregiver = document.getElementById("roleCaregiver");

const nameStep = document.getElementById("nameStep");
const patientNameInput = document.getElementById("patientName");
const nameContinue = document.getElementById("nameContinue");
const nameInfo = document.getElementById("nameInfo");
const codeBox = document.getElementById("codeBox");
const codeValue = document.getElementById("codeValue");
const patientNotice = document.getElementById("patientNotice");
const patientSuggestions = document.getElementById("patientSuggestions");
const suggestList = document.getElementById("suggestList");
const backToRole1 = document.getElementById("backToRole1");

const langStep = document.getElementById("langStep");
const langBtns = document.querySelectorAll(".langBtn");

const warm1 = document.getElementById("warm1");
const warm2 = document.getElementById("warm2");
const warm3 = document.getElementById("warm3");
const w1Label = document.getElementById("w1Label");
const w2Label = document.getElementById("w2Label");
const w3Label = document.getElementById("w3Label");
const w1 = document.getElementById("w1");
const w2 = document.getElementById("w2");
const w3 = document.getElementById("w3");
const nextW1 = document.getElementById("nextW1");
const nextW2 = document.getElementById("nextW2");
const nextW3 = document.getElementById("nextW3");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const q1Label = document.getElementById("q1Label");
const q2Label = document.getElementById("q2Label");
const q3Label = document.getElementById("q3Label");
const ans1 = document.getElementById("ans1");
const ans2 = document.getElementById("ans2");
const ans3 = document.getElementById("ans3");
const next1 = document.getElementById("next1");
const next2 = document.getElementById("next2");
const finish = document.getElementById("finish");

const summaryCard = document.getElementById("summaryCard");
const summaryTitle = document.getElementById("summaryTitle");
const summaryBox = document.getElementById("summaryBox");
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
const resultsTitle = document.getElementById("resultsTitle");
const prevTitle = document.getElementById("prevTitle");
const todayTitle = document.getElementById("todayTitle");
const labPrevWhat = document.getElementById("labPrevWhat");
const labPrevWhere = document.getElementById("labPrevWhere");
const labPrevWho = document.getElementById("labPrevWho");
const labPrevTotal = document.getElementById("labPrevTotal");
const labNowWhat = document.getElementById("labNowWhat");
const labNowWhere = document.getElementById("labNowWhere");
const labNowWho = document.getElementById("labNowWho");
const labNowTotal = document.getElementById("labNowTotal");
const revealTitle = document.getElementById("revealTitle");
const restart = document.getElementById("restart");

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

/* Speech recognition setup per step */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
async function ensureMicPermission(){
  if (!navigator.mediaDevices?.getUserMedia) return true;
  try { const s = await navigator.mediaDevices.getUserMedia({audio:true}); s.getTracks().forEach(t=>t.stop()); return true; }
  catch { summaryBox.textContent = T().micBlocked; return false; }
}

/* Record answer and auto-advance on result */
function recordInto(textarea, questionText, stepIndex){
  if (!SR){ alert("Voice input not supported. Try Chrome."); return; }
  ensureMicPermission().then(ok=>{
    if (!ok) return;
    try{
      const rec = new SR();
      rec.lang = LANG_TAG[currentLang] || "en-US";
      rec.interimResults=false; rec.maxAlternatives=1;
      const old = summaryBox.textContent; summaryBox.textContent="🎤 Listening…";
      rec.onresult = (e)=>{
        summaryBox.textContent = old;
        let t = e.results[0][0].transcript || "";
        if (norm(t)===norm(questionText) || norm(t).startsWith(norm(questionText))){
          summaryBox.textContent=T().heardQuestion; speak(T().pleaseAnswer); return;
        }
        textarea.value = t; textarea.focus(); textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        speak(`${T().youSaid} ${t}`);

        // Navigate to next step after successful capture
        if (stepIndex==="w1"){ renderPatientSuggestions(currentName); mountSuggestions(warm2); show(warm2); speak(stripNum(w2Label.textContent)); w2.focus(); }
        else if (stepIndex==="w2"){ renderPatientSuggestions(currentName); mountSuggestions(warm3); show(warm3); speak(stripNum(w3Label.textContent)); w3.focus(); }
        else if (stepIndex==="w3"){ renderPatientSuggestions(currentName); mountSuggestions(step1); show(step1); speak(stripNum(q1Label.textContent)); ans1.focus(); }
        else if (stepIndex===1){ step1.classList.add("done"); renderPatientSuggestions(currentName); mountSuggestions(step2); show(step2); speak(stripNum(q2Label.textContent)); ans2.focus(); }
        else if (stepIndex===2){ step2.classList.add("done"); renderPatientSuggestions(currentName); mountSuggestions(step3); show(step3); speak(stripNum(q3Label.textContent)); ans3.focus(); }
        else if (stepIndex===3){ step3.classList.add("done"); doFinishPatient(); }
      };
      rec.onerror = (e)=>{
        let msg="Mic error: "+e.error+". ";
        if (e.error==="not-allowed") msg+=T().micBlocked;
        if (e.error==="no-speech") msg+=T().micNoSpeech;
        if (e.error==="audio-capture") msg+=T().micNoMic;
        summaryBox.textContent=msg;
      };
      rec.start();
    }catch{ summaryBox.textContent="Could not start microphone. Check permissions and try again."; }
  });
}

/* Local storage for patient sessions */
const LS_KEY = "cw_patients";
function loadAll(){ try { return JSON.parse(localStorage.getItem(LS_KEY)||"{}"); } catch { return {}; } }
function saveAll(obj){ try { localStorage.setItem(LS_KEY, JSON.stringify(obj)); } catch {} }

/* Get or create patient container */
function getPatientObj(name, create=false){
  const all = loadAll();
  if (!all[name] && create) all[name] = { code:null, language:null, sessions:[], suggestions:[], notifications:[] };
  return all[name] || null;
}
function setPatientObj(name, obj){ const all=loadAll(); all[name]=obj; saveAll(all); }

/* Assign secret code if missing */
function ensureCode(name){
  const p = getPatientObj(name, true);
  if (!p.code){ p.code = String(Math.floor(1000 + Math.random()*9000)); setPatientObj(name, p); }
  return p.code;
}

/* Append a session and keep last 12 */
function saveSession(name, session){
  const p = getPatientObj(name, true);
  p.sessions.push(session);
  p.sessions = p.sessions.slice(-12);
  setPatientObj(name, p);
}

/* Caregiver actions */
function addSuggestion(name, from, text){
  const p = getPatientObj(name, true);
  p.suggestions.push({ ts: Date.now(), from, text, lang:"en" });
  p.notifications.push({ ts: Date.now(), type:"suggestion", from });
  setPatientObj(name, p);
}
function addViewNotification(name, from){
  const p = getPatientObj(name, true);
  p.notifications.push({ ts: Date.now(), type:"view", from });
  setPatientObj(name, p);
}

/* Helpers to find last record/test */
function lastOfType(name, type){
  const p = getPatientObj(name, false); if (!p) return null;
  for (let i=p.sessions.length-1;i>=0;i--) if (p.sessions[i].type===type) return p.sessions[i];
  return null;
}
function lastRecord(name){ return lastOfType(name, "record"); }
function lastTest(name){ return lastOfType(name, "test"); }

/* Decide next mode based on last session */
function decideMode(name){
  const p = getPatientObj(name, false);
  if (!p || p.sessions.length===0) return "record";
  const last = p.sessions[p.sessions.length-1];
  return last.type === "record" ? "test" : "record";
}

/* Token overlap scoring for answers */
function wordsSet(s){ return new Set((s||"").toLowerCase().match(/[a-z0-9']+/g)||[]); }
function overlapPct(a,b){
  const A=wordsSet(a), B=wordsSet(b);
  if (A.size===0 && B.size===0) return 100;
  if (A.size===0 || B.size===0) return 0;
  let inter=0; for (const w of A) if (B.has(w)) inter++;
  const union = new Set([...A,...B]).size;
  return Math.round((inter/union)*100);
}

/* Active session state */
let currentName=null, mode="record", compareRecord=null;

/* Apply translation strings to UI */
function applyTranslations(){
  const t = T();
  w1Label.textContent=t.warm1; w2Label.textContent=t.warm2; w3Label.textContent=t.warm3;
  q1Label.textContent=t.q1; q2Label.textContent=t.q2; q3Label.textContent=t.q3;
  nextW1.textContent=t.cont; nextW2.textContent=t.cont; nextW3.textContent=t.cont;
  next1.textContent=t.cont; next2.textContent=t.cont; finish.textContent=t.finish; restart.textContent=t.restart;
  summaryTitle.textContent=t.summaryTitle;
  resultsTitle.textContent=t.resultsTitle; prevTitle.textContent=t.prevTitle; todayTitle.textContent=t.todayTitle;
  labPrevWhat.textContent=t.labWhat; labPrevWhere.textContent=t.labWhere; labPrevWho.textContent=t.labWho; labPrevTotal.textContent=t.labTotal;
  labNowWhat.textContent=t.labWhat; labNowWhere.textContent=t.labWhere; labNowWho.textContent=t.labWho; labNowTotal.textContent=t.labTotal;
  revealTitle.textContent=t.revealTitle;
  const suggHeader = patientSuggestions.querySelector("h3");
  if (suggHeader) suggHeader.textContent = t.suggTitle;
}

/* Alternate labels when doing recall (test mode) */
const RECALL_LABELS = {
  w1: { en:"Warm-up 1) How was your day last time?", hi:"वार्म-अप 1) पिछली बार आपका दिन कैसा था?", es:"Calentamiento 1) ¿Cómo fue tu día la última vez?", zh:"热身 1) 上次你的一天怎么样？" },
  w2: { en:"Warm-up 2) What stood out last time?", hi:"वार्म-अप 2) पिछली बार सबसे खास क्या था?", es:"Calentamiento 2) ¿Qué fue lo más destacado la última vez?", zh:"热身 2) 上次最特别的是什么？" },
  w3: { en:"Warm-up 3) Can you tell it briefly, from last time?", hi:"वार्म-अप 3) पिछली बार की बात संक्षेप में बताएँ?", es:"Calentamiento 3) ¿Puedes contarlo brevemente de la última vez?", zh:"热身 3) 你能简要说一下上次的吗？" },
  q1: { en:"1) What happened last time?", hi:"1) पिछली बार क्या हुआ था?", es:"1) ¿Qué pasó la última vez?", zh:"1) 上次发生了什么？" },
  q2: { en:"2) Where were you last time?", hi:"2) पिछली बार आप कहाँ थे?", es:"2) ¿Dónde estabas la última vez?", zh:"2) 上次你在哪里？" },
  q3: { en:"3) Who was with you last time?", hi:"3) पिछली बार आपके साथ कौन था?", es:"3) ¿Quién estaba contigo la última vez?", zh:"3) 上次谁和你在一起？" }
};

/* Swap labels based on mode */
function setLabels(m){
  if (m==="test"){
    w1Label.textContent = RECALL_LABELS.w1[currentLang];
    w2Label.textContent = RECALL_LABELS.w2[currentLang];
    w3Label.textContent = RECALL_LABELS.w3[currentLang];
    q1Label.textContent = RECALL_LABELS.q1[currentLang];
    q2Label.textContent = RECALL_LABELS.q2[currentLang];
    q3Label.textContent = RECALL_LABELS.q3[currentLang];
  } else {
    applyTranslations();
  }
}

/* Role toggles */
rolePatient.onclick = () => { hide(roleStep); show(nameStep); patientNameInput.focus(); };
roleCaregiver.onclick = () => { hide(roleStep); show(cgLogin); cgName.focus(); };
backToRole1.onclick = () => {
  show(roleStep);
  hide(nameStep); hide(langStep); hide(warm1); hide(warm2); hide(warm3); hide(step1); hide(step2); hide(step3); hide(summaryCard);
};
backToRole2.onclick = () => { show(roleStep); hide(cgLogin); hide(cgPanel); };

/* Render recent suggestions from caregiver */
function renderPatientSuggestions(name){
  const p = getPatientObj(name, true);
  suggestList.innerHTML = "";
  if (!p.suggestions.length){ hide(patientSuggestions); return; }
  const t = T();
  const items = p.suggestions.slice(-5).map(s=>{
    const when = new Date(s.ts).toLocaleString();
    const translated = (p.language && p.language !== "en") ? translateSuggestion(s.text, p.language) : s.text;
    const needsLabel = (p.language && p.language !== s.lang);
    return `
      <li>
        ${needsLabel ? `<div><b>${t.translated}:</b> ${translated}</div><div class="hint"><b>${t.original}:</b> ${s.text}</div>` : `${s.text}`}
        <div class="hint">(${when} — ${s.from || "Caregiver"})</div>
      </li>`;
  }).join("");
  suggestList.innerHTML = items;
  show(patientSuggestions);
}

/* Start patient flow after name and language are set */
function startPatientFlow(){
  const t=T();
  mode = decideMode(currentName);
  setLabels(mode);
  renderPatientSuggestions(currentName);
  mountSuggestions(warm1);
  nameInfo.textContent = (mode==="record") ? t.hiMsg(currentName) : t.backMsg(currentName);
  hide(nameStep); show(warm1); speak(stripNum(w1Label.textContent)); w1.focus();
}

/* Handle name input and code setup */
nameContinue.onclick = () => {
  const name = (patientNameInput.value||"").trim();
  if (!name){ nameInfo.textContent="Please type a name."; return; }
  currentName = name;

  const code = ensureCode(name);
  codeValue.textContent = code; show(codeBox);

  const p = getPatientObj(name, true);

  // Remember if we should toast the code after language selection
  window.__pendingCode = code;
  window.__needsToast = !p.language;

  // Apply saved language if any
  currentLang = p.language || currentLang;
  currentVoice = null;
  applyTranslations();
  renderPatientSuggestions(name);

  // Show last caregiver activity if available
  if (p.notifications.length){
    const n = p.notifications[p.notifications.length-1];
    const when = new Date(n.ts).toLocaleString();
    patientNotice.innerHTML = `Notice: Caregiver <b>${n.from || "unknown"}</b> ${n.type==="view"?"viewed your progress":"sent a suggestion"} on ${when}.`;
    show(patientNotice);
  } else { hide(patientNotice); }

  if (!p.language){ hide(nameStep); show(langStep); return; }
  startPatientFlow();
};

/* Language picker events */
const changeLangBtn = document.getElementById("changeLang");
if (changeLangBtn){ changeLangBtn.onclick = () => { hide(nameStep); show(langStep); }; }

langBtns.forEach(btn=>{
  btn.onclick = () => {
    currentLang = btn.dataset.lang || "en";
    currentVoice = null;
    applyTranslations();

    if (currentName){
      const p = getPatientObj(currentName, true);
      p.language = currentLang; setPatientObj(currentName, p);

      if (window.__needsToast && window.__pendingCode){
        showCodeToast(window.__pendingCode);
        speak(`Your code is ${window.__pendingCode}`);
      }

      hide(langStep);
      startPatientFlow();
    } else {
      hide(langStep); hide(roleStep);
      show(nameStep);
      nameInfo.textContent = T().promptName;
      speak(T().promptName);
    }
  };
});

/* Warm-ups and questions: advance and keep suggestions visible */
nextW1.onclick = () => {
  if (w1.value.trim()) warm1.classList.add("done");
  renderPatientSuggestions(currentName); mountSuggestions(warm2);
  show(warm2); speak(stripNum(w2Label.textContent)); w2.focus();
};
nextW2.onclick = () => {
  if (w2.value.trim()) warm2.classList.add("done");
  renderPatientSuggestions(currentName); mountSuggestions(warm3);
  show(warm3); speak(stripNum(w3Label.textContent)); w3.focus();
};
nextW3.onclick = () => {
  if (w3.value.trim()) warm3.classList.add("done");
  renderPatientSuggestions(currentName); mountSuggestions(step1);
  show(step1); speak(stripNum(q1Label.textContent)); ans1.focus();
};

next1.onclick = () => {
  if (ans1.value.trim()) step1.classList.add("done");
  renderPatientSuggestions(currentName); mountSuggestions(step2);
  show(step2); speak(stripNum(q2Label.textContent)); ans2.focus();
};
next2.onclick = () => {
  if (ans2.value.trim()) step2.classList.add("done");
  renderPatientSuggestions(currentName); mountSuggestions(step3);
  show(step3); speak(stripNum(q3Label.textContent)); ans3.focus();
};
finish.onclick = () => { step3.classList.add("done"); doFinishPatient(); };

/* Finalize session: save, score, and show charts if test */
function doFinishPatient(){
  const aW1 = w1.value.trim(), aW2 = w2.value.trim(), aW3 = w3.value.trim();
  const a1 = ans1.value.trim(), a2 = ans2.value.trim(), a3 = ans3.value.trim();

  // Build one summary line
  const parts = [];
  if (aW1) parts.push(aW1); if (aW2) parts.push(aW2); if (aW3) parts.push(aW3);
  if (a1||a2||a3) parts.push([a1,a2,a3].filter(Boolean).join(" "));
  let text = parts.filter(Boolean).join(". ");
  if (text){ text = text.charAt(0).toUpperCase()+text.slice(1); if (!/[.!?]$/.test(text)) text+="."; }
  else { text = "Thanks. Your memory is saved."; }

  // Show summary
  show(summaryCard);
  summaryTitle.textContent=T().summaryTitle;
  summaryBox.textContent=text;
  speak(text);

  // Keep suggestions visible at the end
  renderPatientSuggestions(currentName);
  mountSuggestions(summaryCard);

  // On test, compute overlap vs last record and show charts
  if (mode==="test"){
    compareRecord = lastRecord(currentName);
    if (!compareRecord){
      saveSession(currentName, { ts:Date.now(), type:"record", w1:aW1, w2:aW2, w3:aW3, a1,a2,a3 });
      return;
    }

    const p1 = overlapPct(a1, compareRecord.a1);
    const p2 = overlapPct(a2, compareRecord.a2);
    const p3 = overlapPct(a3, compareRecord.a3);
    const total = Math.round((p1+p2+p3)/3);

    const prevTest = lastTest(currentName);
    const prevTotal = prevTest?.stotal ?? 0;

    // Populate charts
    show(progressWrap);
    resultsTitle.textContent=T().resultsTitle; prevTitle.textContent=T().prevTitle; todayTitle.textContent=T().todayTitle;
    labPrevWhat.textContent=T().labWhat; labPrevWhere.textContent=T().labWhere; labPrevWho.textContent=T().labWho; labPrevTotal.textContent=T().labTotal;
    labNowWhat.textContent=T().labWhat; labNowWhere.textContent=T().labWhere; labNowWho.textContent=T().labWho; labNowTotal.textContent=T().labTotal;
    revealTitle.textContent=T().revealTitle;

    setBar(bar1Now, bar1NowV, p1); setBar(bar2Now, bar2NowV, p2); setBar(bar3Now, bar3NowV, p3); setBar(barTNow, barTNowV, total);
    setBar(bar1Prev, bar1PrevV, prevTest?.s1 ?? 0); setBar(bar2Prev, bar2PrevV, prevTest?.s2 ?? 0); setBar(bar3Prev, bar3PrevV, prevTest?.s3 ?? 0); setBar(barTPrev, barTPrevV, prevTotal);

    const diff = total - prevTotal;
    deltaSummary.textContent = prevTest ? (diff>0? T().improved(diff) : diff<0? T().worse(diff) : T().nochange) : T().compareFirst;

    const dtr = new Date(compareRecord.ts);
    progressNote.textContent = `Compared with your last record on ${dtr.toLocaleDateString()} ${dtr.toLocaleTimeString()}.`;
    lastAnswers.textContent = `Record used — What: "${compareRecord.a1 || "-"}", Where: "${compareRecord.a2 || "-"}", Who: "${compareRecord.a3 || "-"}".`;

    // Save test session
    saveSession(currentName, { ts:Date.now(), type:"test", w1:aW1, w2:aW2, w3:aW3, a1,a2,a3, record_ts:compareRecord.ts, s1:p1, s2:p2, s3:p3, stotal:total });
  } else {
    // First-time record session
    hide(progressWrap); deltaSummary.textContent="";
    saveSession(currentName, { ts:Date.now(), type:"record", w1:aW1, w2:aW2, w3:aW3, a1,a2,a3 });
  }
}

/* Reset UI to start state */
restart.onclick = () => {
  [w1,w2,w3,ans1,ans2,ans3].forEach(t=>t.value="");
  [warm1,warm2,warm3,step1,step2,step3].forEach(s=>s.classList.remove("done"));
  hide(summaryCard); hide(warm1); hide(warm2); hide(warm3); hide(step1); hide(step2); hide(step3);
  show(nameStep); patientNameInput.focus(); speak(T().promptName);
};

/* Mic buttons hook into recorder */
document.getElementById("micW1").onclick = () => recordInto(w1, stripNum(w1Label.textContent), "w1");
document.getElementById("micW2").onclick = () => recordInto(w2, stripNum(w2Label.textContent), "w2");
document.getElementById("micW3").onclick = () => recordInto(w3, stripNum(w3Label.textContent), "w3");
document.getElementById("mic1").onclick = () => recordInto(ans1, stripNum(q1Label.textContent), 1);
document.getElementById("mic2").onclick = () => recordInto(ans2, stripNum(q2Label.textContent), 2);
document.getElementById("mic3").onclick = () => recordInto(ans3, stripNum(q3Label.textContent), 3);

/* Caregiver login and dashboard */
cgEnter.onclick = () => {
  const caregiver = (cgName.value||"").trim();
  const pname = (cgPatientName.value||"").trim();
  const code = (cgCode.value||"").trim();
  if (!caregiver || !pname || !code){ cgInfo.textContent="Please fill all fields."; return; }
  const p = getPatientObj(pname, false);
  if (!p){ cgInfo.textContent="Patient not found."; return; }
  if (p.code !== code){ cgInfo.textContent="Code does not match."; return; }
  addViewNotification(pname, caregiver);
  hide(cgLogin); show(cgPanel);
  cgPatientHeader.innerHTML = `Viewing <b>${pname}</b>. Code verified.`;
  renderCgProgress(pname);
  cgSendInfo.textContent = "";
};

/* Compute caregiver progress bars from last two tests */
function renderCgProgress(pname){
  const p = getPatientObj(pname,false); if (!p) return;
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
    cgDelta.textContent = previous ? (d>0? `Improved by +${d} pts overall.` : d<0? `Down ${Math.abs(d)} pts overall.` : `No change overall.`) : `Only one test so far. Next test will compute a trend.`;
    const when = new Date(latest.ts).toLocaleString();
    cgNote.textContent = `Latest test on ${when}.`;
  } else {
    cgDelta.textContent = "No memory tests yet. Ask the patient to complete at least one test.";
    cgNote.textContent = "";
  }
}

/* Caregiver sends a suggestion to patient timeline */
cgSend.onclick = () => {
  const caregiver = (cgName.value||"").trim();
  const pname = (cgPatientName.value||"").trim();
  const text = (cgSuggest.value||"").trim();
  if (!text){ cgSendInfo.textContent = "Type a short suggestion first."; return; }
  addSuggestion(pname, caregiver, text);
  cgSendInfo.textContent = "Suggestion sent to patient.";
  cgSuggest.value = "";

  // If patient screen is open in same device, update immediately
  if (currentName && norm(currentName) === norm(pname)) {
    renderPatientSuggestions(pname);
    const firstVisible = [warm1,warm2,warm3,step1,step2,step3,summaryCard].find(el => el && !el.classList.contains("hidden"));
    if (firstVisible) mountSuggestions(firstVisible);
  }
};

/* Initial screen */
window.addEventListener("load", () => {
  speechSynthesis.getVoices(); // warms up voice list in some browsers
  show(roleStep);
  hide(nameStep); hide(langStep); hide(warm1); hide(warm2); hide(warm3);
  hide(step1); hide(step2); hide(step3); hide(summaryCard);
  hide(cgLogin); hide(cgPanel);
});
