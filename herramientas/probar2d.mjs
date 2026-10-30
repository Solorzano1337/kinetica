// Uso: desde la raíz del repositorio, con un servidor local encendido:
//   python3 -m http.server 8000
//   node herramientas/probar2d.mjs [ancho] [alto] [etiqueta]
// Las capturas quedan en herramientas/capturas/. Imprime ERRORS [] si no hubo errores de consola.
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
const BASE = process.env.BASE || 'http://localhost:8000';
mkdirSync('herramientas/capturas', {recursive:true});
const launchOpts = process.env.CHROME ? {executablePath: process.env.CHROME} : {};
const [w,h,tag] = [+process.argv[2]||1280, +process.argv[3]||800, process.argv[4]||'d'];
const b = await chromium.launch(launchOpts);
const p = await b.newPage({viewport:{width:w,height:h}});
const errs=[]; p.on('pageerror',e=>errs.push('PAGEERR '+e.message)); p.on('console',m=>{if(m.type()==='error' && !/Failed to load resource/.test(m.text()))errs.push(m.text())});
await p.goto(BASE + '/2d/index.html'); await p.waitForTimeout(600);
const shot = async n => p.screenshot({path:`herramientas/capturas/${tag}-${n}.png`});
const W = ms => p.waitForTimeout(ms);
await shot('01desk');
await shot('00cmds'); await p.click('#cmdGo'); await W(1800); await shot('01desk');
await p.click('[data-start]'); await W(2600); await shot('02enter'); await W(2200); await shot('02enter2'); await W(2400);
await p.click('[data-skip]'); await W(300);
await p.click('.pc[data-i="2"]'); await p.click('#selOk'); await W(400);
for(const l of ['M','A','R','Í','A']) { await p.keyboard.press(l==='Í'?'i':l.toLowerCase()); await W(40); }
await shot('03name'); await p.click('#nmOk'); await W(900); await shot('03equip');
await p.click('#eqWatch'); await W(1500); await shot('03equip2'); await W(2000); await shot('03equip3');
await p.click('#eqGo'); await W(500); await shot('04map');
await p.click('#openCase'); await W(400); await shot('05sensitive'); await p.click('#sOk'); await W(800); await p.click('[data-skip]'); await W(500);
await W(700); await shot('07explore1');
await p.keyboard.down('ArrowLeft'); await W(900); await p.keyboard.up('ArrowLeft'); await p.keyboard.down('ArrowUp'); await W(500); await p.keyboard.up('ArrowUp'); await W(200); await shot('07move');
await p.click('#watchBtn'); await W(400); await shot('07radar'); await p.click('#modal .sheet-h [data-close]'); await W(300);
async function explore(n){
  // try locked NPC first
  await p.click('.hs[data-id="npc-des"]'); await W(1100); if(n===1) await shot('npc-locked'); await p.click('#modal [data-close]'); await W(200);
  const ids = await p.$$eval('.hs:not(.npc)', a=>a.map(x=>x.dataset.id));
  for(const id of ids){
    await p.click(`.hs[data-id="${id}"]`); await W(1100);
    await p.click('#doScan'); await W(1500);
    await p.click('#modal .sheet-f [data-close]'); await W(250);
  }
  await W(300); await shot(`explore${n}done`);
  await p.click('.hs[data-id="npc-repo"]'); await W(1100); if(n===1) await shot('npc-repo'); await p.click('#npcGo'); await W(500);
  for(const f of await p.$$('.file')) { await f.click(); await W(80); }
  await shot(`repo${n}`);
  await p.click('#backZone'); await W(600);
  await p.click('.hs[data-id="npc-des"]'); await W(1100); if(n===1) await shot('npc-des'); await p.click('#npcGo'); await W(500);
}
await explore(1);
await W(500); await shot('10game1');
await p.click('[data-guide="game1"]'); await W(300); await p.click('#gMore'); await W(200); await shot('10guide'); await p.click('#modal .sheet-h [data-close]'); await W(200);
for(let guard=0; guard<300; guard++){
  const f = await p.$('.frag'); if(!f) break;
  const id = await f.getAttribute('data-i');
  for(const c of ['inseg','inst','socio','none']){
    const still = await p.$(`.frag[data-i="${id}"]`); if(!still) break;
    if(!(await still.evaluate(e=>e.classList.contains('sel')))) await still.click({force:true});
    await W(60); await p.click(`.bin[data-c="${c}"]`); await W(60);
  }
}
await W(1200); await p.click('#modal [data-close]'); await W(800); await shot('12explore2');
await explore(2);
const valid = {"Lideresa comunal":1,"Biólogo de campo":1,"Pescador artesanal":1,"Informe del vivero · LAST 2023":1};
for(let i=0;i<20;i++){
  const who = await p.$eval('.tcard .who', e=>e.textContent).catch(()=>null); if(!who) break;
  await p.click(`[data-v="${valid[who]?1:0}"]`); await W(120);
  const last = (await p.$eval('#nx', e=>e.textContent)).includes('resultado');
  await p.click('#nx'); await W(200); if(last) break;
}
await W(800); await p.click('#modal [data-close]'); await W(1200); await p.click('[data-skip]'); await W(500);
await p.click('#modal [data-close]'); await W(5500); await p.click('#toG3'); await W(400);
for(const a of [2,1,3,2,2]){ await p.click(`.opt[data-k="${a}"]`); await W(150); await p.click('#qn'); await W(300); }
await W(800); await shot('badge3'); await p.click('#modal [data-close]'); await W(900); await shot('15explore3');
await explore(3);
await shot('16game4');
await p.click('#tHint'); await W(200); await shot('18hint');
for(let k=0;k<2;k++){ for(const i of [0,1,2]){ await p.click(`.tc[data-i="${i}"]`); await W(60);} await p.click('#tVer'); await W(300); if(k===0) await shot('19triok'); await p.click('#tNext'); await W(400); }
await p.click('#vo .opt[data-k="2"]'); await W(300); await shot('19verdict'); await p.click('#tNext'); await W(500); await shot('20write');
await p.fill('#wTxt','Siempre entran carros.'); await p.dispatchEvent('#wTxt','input'); await p.click('#wCheck'); await W(300); await shot('20writefail');
await p.click('#wModel'); await W(200); await p.click('#wUse'); await W(200); await p.click('#wCheck'); await W(300); await shot('20writeok');
await p.click('#wDone'); await W(900);
await shot('21badge4');
await p.click('#modal [data-close]'); await W(1200); await shot('22grado'); await p.click('[data-skip]'); await W(600);
await p.fill('#cName','Alonso Solórzano'); await W(200); await shot('23cred');
await p.click('#modal [data-close]'); await W(600); await shot('24gracias');
await p.click('#gA'); await W(400); await shot('25auto');
for(let i=0;i<8;i++){ await p.click('#ao .opt[data-k="0"]'); await W(120); await p.click('#aN'); await W(200); }
await W(300); await shot('26autores'); await p.click('#aEnd'); await W(500); await shot('26end');
await p.click('#hBrand'); await W(300); await shot('27menu');
await p.click('#kmW'); await W(300); await shot('28watch');
console.log('ERRORS', JSON.stringify(errs));
await b.close();
