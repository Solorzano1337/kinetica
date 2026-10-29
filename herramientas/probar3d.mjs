// Uso: desde la raíz del repositorio, con un servidor local encendido:
//   python3 -m http.server 8000
//   node herramientas/probar3d.mjs [ancho] [alto] [etiqueta]
// Las capturas quedan en herramientas/capturas/. Imprime ERRORS [] si no hubo errores de consola.
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
const BASE = process.env.BASE || 'http://localhost:8000';
mkdirSync('herramientas/capturas', {recursive:true});
const launchOpts = process.env.CHROME ? {executablePath: process.env.CHROME} : {};
const [w,h,tag,touch] = [+process.argv[2]||1280, +process.argv[3]||800, process.argv[4]||'d', process.argv[5]==='touch'];
const b = await chromium.launch({...launchOpts, args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const ctx = await b.newContext({viewport:{width:w,height:h}, hasTouch:touch, isMobile:touch});
const p = await ctx.newPage();
const errs=[]; p.on('pageerror',e=>errs.push('PAGEERR '+e.message)); p.on('console',m=>{if(m.type()==='error' && !/Failed to load resource/.test(m.text()))errs.push(m.text())});
await p.goto(BASE + '/3d/index.html'); await p.waitForTimeout(3500);
const shot = async n => p.screenshot({path:`herramientas/capturas/3d-${tag}-${n}.png`});
const W = ms => p.waitForTimeout(ms);
await shot('01start');
await p.click('.pc[data-i="1"]'); await p.click('#goIn'); await W(1500); await shot('02world');
if(!touch){ await p.keyboard.down('w'); await W(1800); await p.keyboard.up('w'); await W(600); await shot('03walk'); }
const spots = {lideresa:[-6.4,8], herramientas:[-12.2,20], lora:[14.3,12.3], rotulo:[-2.4,22.6], periodico:[6.6,2.2], perro:[9,28.6]};
// try locked NPC
await p.evaluate(()=>window.__k3d.tp(7.2,17)); await W(700); await shot('04nearrepo');
console.log('near', await p.evaluate(()=>window.__k3d.near()));
if(touch) await p.click('#actBtn'); else await p.keyboard.press('e'); await W(500); await shot('05locked'); await p.click('#modal [data-close]'); await W(300);
let k=0;
for(const [id,[x,z]] of Object.entries(spots)){
  await p.evaluate(([x,z])=>window.__k3d.tp(x,z), [x,z]); await W(600);
  const n = await p.evaluate(()=>window.__k3d.near());
  if(n!==id) console.log('NEAR MISMATCH', id, n);
  if(k===0) await shot('06nearlid');
  if(touch) await p.click('#actBtn'); else await p.keyboard.press('e');
  await W(500); await p.click('#doScan'); await W(1500); if(k===0) await shot('07scan');
  await p.click('#modal .sheet-f [data-close]'); await W(300); k++;
}
await W(500); await shot('08allclues');
await p.evaluate(()=>window.__k3d.tp(7.2,17)); await W(600);
if(touch) await p.click('#actBtn'); else await p.keyboard.press('e'); await W(400); await p.click('#npcGo'); await W(500);
for(const f of await p.$$('.file')) { await f.click(); await W(60); }
await shot('09repo'); await p.click('#backZone'); await W(600);
await p.evaluate(()=>window.__k3d.tp(-4,-12.2)); await W(700); await shot('10agent');
if(touch) await p.click('#actBtn'); else await p.keyboard.press('e'); await W(400); await p.click('#npcGo'); await W(600); await shot('11game1');
for(let guard=0; guard<300; guard++){
  const f = await p.$('.frag'); if(!f) break;
  const id = await f.getAttribute('data-i');
  for(const c of ['inseg','inst','socio','none']){
    const still = await p.$(`.frag[data-i="${id}"]`); if(!still) break;
    if(!(await still.evaluate(e=>e.classList.contains('sel')))) await still.click({force:true});
    await W(40); await p.click(`.bin[data-c="${c}"]`); await W(40);
  }
}
await W(1200); await shot('12badge'); await p.click('#modal [data-close]'); await W(600); await shot('13fin');
await p.click('#fBack'); await W(800); await shot('14back');
console.log('ERRORS', JSON.stringify(errs));
await b.close();
