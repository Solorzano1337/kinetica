"use strict";
/* =====================================================================
   motor/sonido.js · MÚSICA, EFECTOS Y VOZ
   Todo el sonido se genera en el navegador; no hay archivos de audio.
   ===================================================================== */

/* ============ Audio (música generada + efectos) ============ */
/* A: todo el sonido del juego, generado en el navegador (no hay archivos de audio).
   - master → music (música y mar) y sfx (efectos). Los volúmenes vienen de S.settings.
   - La música arranca con el primer clic (los navegadores no permiten antes).
   - Para cambiar la música: bars (acordes), mel (melodía) y beat() (qué suena en
     cada corchea). Las notas están en números MIDI: 60 = do central. */
const A = {
  ctx:null, master:null, music:null, sfx:null, timer:null, step:0, ocean:null,
  init(){
    if(this.ctx) return;
    const C = window.AudioContext || window.webkitAudioContext; if(!C) return;
    try{
      this.ctx = new C();
      this.master = this.ctx.createGain(); this.master.gain.value = S.settings.vol; this.master.connect(this.ctx.destination);
      this.music = this.ctx.createGain(); this.music.gain.value = S.settings.music ? .5 : 0; this.music.connect(this.master);
      this.sfx = this.ctx.createGain(); this.sfx.gain.value = S.settings.sfx ? .9 : 0; this.sfx.connect(this.master);
      this.lp = this.ctx.createBiquadFilter(); this.lp.type = "lowpass"; this.lp.frequency.value = 4200; this.lp.connect(this.music);
      this.startLoop();
    }catch(e){ this.ctx = null; }
  },
  resume(){ this.init(); if(this.ctx && this.ctx.state === "suspended") this.ctx.resume(); },
  /* Música épica de aventura: ostinato de cuerdas, metales, tambores y melodía heroica (re menor) */
  bars:[{b:38,c:[62,65,69]},{b:34,c:[58,62,65]},{b:41,c:[57,60,65]},{b:36,c:[55,60,64]},{b:38,c:[62,65,69]},{b:34,c:[58,62,65]},{b:36,c:[55,60,64]},{b:33,c:[57,61,64]}],
  mel:[[[0,74,3],[3,69,1],[4,74,2],[6,77,2]],[[0,77,3],[3,76,1],[4,74,4]],[[0,72,3],[3,69,1],[4,72,2],[6,77,2]],[[0,76,6],[6,72,2]],
       [[0,74,3],[3,77,1],[4,81,2],[6,79,2]],[[0,77,3],[3,74,1],[4,70,4]],[[0,72,2],[2,74,2],[4,76,4]],[[0,73,6],[6,69,2]]],
  hz(m){ return 440*Math.pow(2,(m-69)/12); },
  noiseBuf(){ if(this._nb) return this._nb; const n = this.ctx.sampleRate, b = this.ctx.createBuffer(1, n, n), d = b.getChannelData(0); for(let i=0;i<n;i++) d[i] = Math.random()*2-1; return this._nb = b; },
  /* Planificador: cada 60 ms agenda las corcheas que caen en los próximos 0,3 s.
     Así el ritmo no se atrasa aunque el navegador esté ocupado. */
  startLoop(){
    const E = .3; // corchea a 100 ppm
    this.next = this.ctx.currentTime + .1;
    const tick = () => {
      if(!this.ctx) return;
      const now = this.ctx.currentTime;
      if(this.next < now - .5) this.next = now + .05;
      while(this.next < now + .3){ this.beat(this.step, this.next, E); this.next += E; this.step++; }
    };
    this.timer = setInterval(tick, 60);
  },
  /* beat(): decide qué instrumentos suenan en una corchea. Cada frase dura 8
     compases; las frases impares (ph = 1) suman melodía, redoblante y más tambores. */
  beat(step, t, E){
    const e = step % 8, bar = Math.floor(step/8), B = this.bars[bar % 8], ph = Math.floor(bar/8) % 2;
    const pat = [0,12,7,12,0,12,7,12];
    this.str(this.hz(B.b + 12 + pat[e]), t, E*.9);
    if(e === 0){ B.c.forEach(m => this.brass(this.hz(m), t, E*8)); this.str(this.hz(B.b), t, E*8, .05); }
    const hits = ph ? [0,3,4,6] : [0,4];
    if(hits.includes(e)) this.drum(t, e === 0 ? 1 : .6);
    if(ph && (e === 2 || e === 6)) this.snare(t);
    if(ph){ this.mel[bar % 8].forEach(([k, m, l]) => { if(k === e) this.lead(this.hz(m), t, E*l); }); }
    if(bar % 8 === 7 && e === 4) this.swell(t, E*4);
  },
  str(f, t, d, v=.035){
    const o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = "sawtooth"; o.frequency.value = f;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t+.02); g.gain.exponentialRampToValueAtTime(.0001, t+d);
    o.connect(g); g.connect(this.lp); o.start(t); o.stop(t+d+.05);
  },
  brass(f, t, d){
    const f1 = this.ctx.createBiquadFilter(), g = this.ctx.createGain();
    f1.type = "lowpass"; f1.frequency.setValueAtTime(350, t); f1.frequency.linearRampToValueAtTime(1900, t+.35); f1.frequency.linearRampToValueAtTime(900, t+d);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.022, t+.12); g.gain.setValueAtTime(.022, t+d*.8); g.gain.linearRampToValueAtTime(0, t+d);
    [-7,7].forEach(dt => { const o = this.ctx.createOscillator(); o.type = "sawtooth"; o.frequency.value = f; o.detune.value = dt; o.connect(f1); o.start(t); o.stop(t+d+.05); });
    f1.connect(g); g.connect(this.lp);
  },
  lead(f, t, d){
    const o = this.ctx.createOscillator(), o2 = this.ctx.createOscillator(), g = this.ctx.createGain(), lf = this.ctx.createOscillator(), lg = this.ctx.createGain();
    o.type = "square"; o2.type = "triangle"; o.frequency.value = f; o2.frequency.value = f*2;
    lf.frequency.value = 5.5; lg.gain.value = f*.006; lf.connect(lg); lg.connect(o.frequency); lg.connect(o2.frequency);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.03, t+.04); g.gain.setValueAtTime(.03, t+Math.max(.05, d-.08)); g.gain.linearRampToValueAtTime(0, t+d);
    o.connect(g); o2.connect(g); g.connect(this.lp); [o,o2,lf].forEach(x => { x.start(t); x.stop(t+d+.05); });
  },
  drum(t, v){
    const o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(42, t+.45);
    g.gain.setValueAtTime(.32*v, t); g.gain.exponentialRampToValueAtTime(.0001, t+.6);
    o.connect(g); g.connect(this.music); o.start(t); o.stop(t+.65);
    const n = this.ctx.createBufferSource(), nf = this.ctx.createBiquadFilter(), ng = this.ctx.createGain();
    n.buffer = this.noiseBuf(); nf.type = "lowpass"; nf.frequency.value = 600; ng.gain.setValueAtTime(.12*v, t); ng.gain.exponentialRampToValueAtTime(.0001, t+.18);
    n.connect(nf); nf.connect(ng); ng.connect(this.music); n.start(t); n.stop(t+.2);
  },
  snare(t){
    const n = this.ctx.createBufferSource(), nf = this.ctx.createBiquadFilter(), ng = this.ctx.createGain();
    n.buffer = this.noiseBuf(); nf.type = "bandpass"; nf.frequency.value = 2200; nf.Q.value = .8;
    ng.gain.setValueAtTime(.05, t); ng.gain.exponentialRampToValueAtTime(.0001, t+.14);
    n.connect(nf); nf.connect(ng); ng.connect(this.music); n.start(t); n.stop(t+.16);
  },
  swell(t, d){
    const n = this.ctx.createBufferSource(), nf = this.ctx.createBiquadFilter(), ng = this.ctx.createGain();
    n.buffer = this.noiseBuf(); n.loop = true; nf.type = "highpass"; nf.frequency.value = 5000;
    ng.gain.setValueAtTime(0, t); ng.gain.linearRampToValueAtTime(.05, t+d); ng.gain.linearRampToValueAtTime(0, t+d+.25);
    n.connect(nf); nf.connect(ng); ng.connect(this.music); n.start(t); n.stop(t+d+.3);
  },
  /* Ruido de mar filtrado para las escenas de playa (lo activa go()). */
  setOcean(on){
    if(!this.ctx) return;
    if(on && !this.ocean){
      const len = this.ctx.sampleRate*2, buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate), d = buf.getChannelData(0);
      for(let i=0;i<len;i++) d[i] = Math.random()*2-1;
      const src = this.ctx.createBufferSource(); src.buffer = buf; src.loop = true;
      const f = this.ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 500;
      const g = this.ctx.createGain(); g.gain.value = .05;
      const lfo = this.ctx.createOscillator(), lg = this.ctx.createGain(); lfo.frequency.value = .12; lg.gain.value = .04; lfo.connect(lg); lg.connect(g.gain);
      src.connect(f); f.connect(g); g.connect(this.music); src.start(); lfo.start();
      this.ocean = {src, lfo};
    } else if(!on && this.ocean){ try{ this.ocean.src.stop(); this.ocean.lfo.stop(); }catch(e){} this.ocean = null; }
  },
  /* tone(): nota simple para efectos (frecuencia, duración, forma, volumen,
     retraso, deslizamiento). Los efectos de abajo combinan varios tonos. */
  tone(f, d=.15, type="sine", v=.2, when=0, slide){
    if(!this.ctx) return;
    const t = this.ctx.currentTime + when, o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t); if(slide) o.frequency.exponentialRampToValueAtTime(slide, t+d);
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t+d);
    o.connect(g); g.connect(this.sfx); o.start(t); o.stop(t+d+.05);
  },
  click(){ this.tone(900,.05,"square",.05); },
  scan(){ this.tone(300,1.1,"sawtooth",.05,0,1600); this.tone(1200,.12,"sine",.12,1.15); },
  ok(){ this.tone(660,.12,"triangle",.18); this.tone(990,.2,"triangle",.18,.1); },
  bad(){ this.tone(180,.25,"square",.08); },
  buzz(){ for(let i=0;i<5;i++) this.tone(110,.08,"square",.08,i*.12); try{ navigator.vibrate && navigator.vibrate([90,60,90,60,140]); }catch(e){} },
  absorb(){
    if(!this.ctx) return; const t = this.ctx.currentTime;
    const n = this.ctx.createBufferSource(), f = this.ctx.createBiquadFilter(), g = this.ctx.createGain();
    n.buffer = this.noiseBuf(); n.loop = true; f.type = "bandpass"; f.Q.value = 3; f.frequency.setValueAtTime(180, t); f.frequency.exponentialRampToValueAtTime(5200, t+2.6);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.5, t+2.2); g.gain.linearRampToValueAtTime(0, t+2.8);
    n.connect(f); f.connect(g); g.connect(this.sfx); n.start(t); n.stop(t+2.9);
    this.tone(70, 2.6, "sawtooth", .07, 0, 1400); this.tone(1800, .5, "sine", .2, 2.6, 90);
  },
  electric(){
    if(!this.ctx) return; const t = this.ctx.currentTime;
    for(let i=0;i<16;i++){
      const at = t + Math.random()*2.2, n = this.ctx.createBufferSource(), f = this.ctx.createBiquadFilter(), g = this.ctx.createGain();
      n.buffer = this.noiseBuf(); f.type = "highpass"; f.frequency.value = 1500 + Math.random()*4000;
      g.gain.setValueAtTime(.25, at); g.gain.exponentialRampToValueAtTime(.0001, at+.03+Math.random()*.06);
      n.connect(f); f.connect(g); g.connect(this.sfx); n.start(at); n.stop(at+.1);
    }
    this.tone(110, 2.3, "sawtooth", .06, 0, 1300); this.tone(220, 2.3, "square", .025, 0, 2600);
    [784,988,1175,1568].forEach((f,i) => this.tone(f, .4, "triangle", .14, 2.3+i*.09));
  },
  popup(){ this.tone(740,.09,"sine",.15); this.tone(1110,.16,"sine",.13,.09); },
  fanfare(){ [523,659,784,1047].forEach((f,i)=>this.tone(f,.35,"triangle",.16,i*.13)); },
  apply(){
    if(!this.ctx) return;
    this.master.gain.value = S.settings.vol;
    this.music.gain.value = S.settings.music ? .5 : 0;
    this.sfx.gain.value = S.settings.sfx ? .9 : 0;
  }
};

/* ============ Voz (locución) ============ */
/* V: locución con la voz del sistema. Prefiere español de Costa Rica, México o
   Latinoamérica. say(texto, {pitch, rate}) lee en voz alta si la voz está activa. */
const V = {
  voice:null,
  pick(){ try{ const vs = speechSynthesis.getVoices(); this.voice = vs.find(v=>/es[-_](CR|MX|US|419)/i.test(v.lang)) || vs.find(v=>/^es/i.test(v.lang)) || null; }catch(e){} },
  say(text, opt={}){
    if(!S.settings.voice || !("speechSynthesis" in window)) return;
    try{
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text.replace(/[«»]/g,""));
      if(!this.voice) this.pick();
      if(this.voice) u.voice = this.voice;
      u.lang = this.voice ? this.voice.lang : "es-ES";
      u.pitch = opt.pitch ?? 1; u.rate = opt.rate ?? 1;
      speechSynthesis.speak(u);
    }catch(e){}
  },
  stop(){ try{ speechSynthesis.cancel(); }catch(e){} }
};
try{ speechSynthesis.onvoiceschanged = () => V.pick(); }catch(e){}
