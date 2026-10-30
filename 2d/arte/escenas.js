"use strict";
/* =====================================================================
   arte/escenas.js · LAS TRES ZONAS PARA EXPLORAR
   Dibujo, elementos investigables y posición de cada personaje.
   Lo que dicen los personajes está en contenido/dialogos.js.
   ===================================================================== */

/* SCENES: las tres zonas para explorar (comunidad, playa, final).
   Cada zona tiene:
   - zone, title, intro: textos del encabezado.
   - start: posición inicial del personaje (x, y en 1600 × 900).
   - svg(): el dibujo de fondo.
   - spots: elementos investigables {id, x, y, label, kind}; id = clave en CLUES.
   - repo / des: la archivista (abre la biblioteca) y el agente de desafío.
   - chat: dos personas que conversan solas (no se pueden tocar). */
const SCENES = {
  comunidad:{
    zone:"Moín, Limón · Comunidad", title:"Exploración de la comunidad",
    intro:"Caminos de lastre y casas de madera sobre pilotes. Tocá a las personas, animales y objetos marcados para investigarlos con el reloj.",
    start:[800, 880], music:false,
    svg(){ return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id="skyC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34436e"/><stop offset=".55" stop-color="#e98a5c"/><stop offset="1" stop-color="#f8c77f"/></linearGradient>
      <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5b7f35"/><stop offset="1" stop-color="#36541f"/></linearGradient></defs>
      <rect width="1600" height="900" fill="url(#skyC)"/>
      <circle cx="1180" cy="330" r="70" fill="#ffd89a" opacity=".85"/>
      <path d="M0 420 Q200 330 420 390 T 860 370 T 1300 380 T 1600 360 V 520 H0z" fill="#2f5144"/>
      <path d="M0 470 Q300 420 640 455 T 1600 440 V 560 H0z" fill="#3c6449"/>
      ${palm(90,520,.9,"#24533f")}${palm(1540,520,.85,"#24533f")}${palm(620,480,.6,"#2a5a45")}
      <rect y="500" width="1600" height="400" fill="url(#grass)"/>
      <path d="M720 900 C 760 760 900 700 1100 660 S 1420 600 1600 590 L1600 640 C 1430 650 1200 700 1080 740 S 880 830 880 900z" fill="#b48553"/>
      <path d="M760 900 C 800 790 920 730 1110 690" stroke="#9a6e43" stroke-width="3" stroke-dasharray="14 18" fill="none"/>
      ${house(180,330,300,190,"#3aa7a3","#8e9aa6",{porch:true,stilt:70})}
      ${house(680,400,170,110,"#e07a8f","#7d8792",{stilt:50})}
      ${house(980,360,270,170,"#e9c46a","#8e9aa6",{sign:"PULPERÍA",stilt:56})}
      <rect x="1040" y="596" width="150" height="12" rx="3" fill="#6b4226"/><rect x="1050" y="608" width="10" height="30" fill="#5a3d27"/><rect x="1170" y="608" width="10" height="30" fill="#5a3d27"/>
      <g transform="translate(1100 590) rotate(-6)"><rect x="-26" y="-14" width="52" height="16" fill="#f1ead6" stroke="#9b927d"/><line x1="-20" y1="-9" x2="18" y2="-9" stroke="#333" stroke-width="2"/><line x1="-20" y1="-4" x2="10" y2="-4" stroke="#777" stroke-width="2"/></g>
      <path d="M1380 620 C 1370 520 1390 420 1376 300" stroke="#5b3b25" stroke-width="30" fill="none"/>
      <path d="M1378 380 C 1330 340 1300 320 1270 300" stroke="#5b3b25" stroke-width="12" fill="none"/>
      <g fill="#2d6a4f"><circle cx="1380" cy="230" r="110"/><circle cx="1270" cy="260" r="80"/><circle cx="1480" cy="270" r="85"/><circle cx="1360" cy="150" r="70"/></g>
      <g fill="#40916c" opacity=".8"><circle cx="1330" cy="210" r="50"/><circle cx="1440" cy="220" r="45"/></g>
      <g transform="translate(1300 300)"><path d="M-30 6 q 20 4 30 -4" stroke="#5b3b25" stroke-width="6" fill="none"/><ellipse cx="0" cy="-20" rx="15" ry="24" fill="#3aa64a"/><circle cx="4" cy="-46" r="13" fill="#3aa64a"/><circle cx="8" cy="-52" r="6" fill="#e63946"/><circle cx="10" cy="-42" r="5" fill="#ffd166"/><circle cx="9" cy="-47" r="2.2" fill="#111"/><path d="M15 -45 q8 2 4 8" fill="#ddd"/><path d="M-6 2 l-8 22 10 -6z" fill="#2b7a37"/><path d="M-10 -24 q-10 10 -4 20" stroke="#1f6fb2" stroke-width="5" fill="none"/></g>
      <g transform="translate(800 0)"><rect x="-6" y="520" width="12" height="130" fill="#6c6c6c"/><rect x="-110" y="440" width="220" height="96" rx="6" fill="#f7f3e6" stroke="#2b5a3f" stroke-width="6"/>
        <text x="0" y="474" text-anchor="middle" font-family="Chakra Petch,sans-serif" font-weight="700" font-size="18" fill="#2b5a3f">PROHIBIDA LA</text>
        <text x="0" y="496" text-anchor="middle" font-family="Chakra Petch,sans-serif" font-weight="700" font-size="16" fill="#2b5a3f">EXTRACCIÓN DE HUEVOS</text>
        <text x="0" y="518" text-anchor="middle" font-family="Chakra Petch,sans-serif" font-weight="700" font-size="16" fill="#2b5a3f">DE TORTUGA</text>
        <path d="M-96 450 L 96 528 M 94 452 L -92 526" stroke="#e01e37" stroke-width="13" stroke-linecap="round" opacity=".92"/></g>
      <g transform="translate(560 740)"><ellipse cx="20" cy="10" rx="120" ry="20" fill="#000" opacity=".2"/><ellipse cx="-60" cy="-20" rx="70" ry="45" fill="#2f5c2a"/><path d="M-20 -6 c 10 -30 50 -40 70 -20 c 10 20 -10 30 -40 30z" fill="#9c7a4b"/><path d="M40 -10 c 12 -22 50 -26 60 -6 c 4 14 -14 22 -44 20z" fill="#8a6a3e"/><line x1="-30" y1="0" x2="60" y2="-70" stroke="#7a5230" stroke-width="7"/><path d="M52 -82 l22 -6 6 22 -20 6z" fill="#8f9aa3"/><rect x="70" y="-4" width="42" height="14" rx="5" fill="#222"/><circle cx="114" cy="3" r="8" fill="#e63946"/><line x1="-40" y1="10" x2="40" y2="-14" stroke="#aaa" stroke-width="5"/></g>
      <g transform="translate(1500 0)"><rect x="-70" y="560" width="14" height="140" fill="#5a3d27"/><rect x="60" y="560" width="14" height="140" fill="#5a3d27"/><rect x="-80" y="548" width="164" height="34" fill="#2a9d8f"/><text x="2" y="572" text-anchor="middle" font-family="Chakra Petch,sans-serif" font-weight="700" font-size="20" fill="#fff">MOÍN</text></g>
      <g transform="translate(1440 735)"><ellipse cx="0" cy="8" rx="44" ry="8" fill="#000" opacity=".25"/><ellipse cx="0" cy="-22" rx="38" ry="20" fill="#a0652f"/><rect x="-30" y="-12" width="8" height="22" fill="#8a5426"/><rect x="20" y="-12" width="8" height="22" fill="#8a5426"/><circle cx="34" cy="-44" r="16" fill="#a0652f"/><path d="M28 -58 l-6 -14 12 8z" fill="#7a4a20"/><ellipse cx="48" cy="-40" rx="9" ry="6" fill="#c08048"/><circle cx="54" cy="-42" r="3" fill="#111"/><circle cx="38" cy="-48" r="2.5" fill="#111"/><path d="M-36 -28 q-18 -14 -10 -30" stroke="#a0652f" stroke-width="7" fill="none"/></g>
      ${person(1228,662,{skin:"#9b6a4a",shirt:"#d1495b",pants:"#2b2d42",s:.8,hair:'<path d="M-22 -164 q22 -24 44 0 v6 h-44z" fill="#2b1d14"/>'})}
      ${person(1300,656,{skin:"#c68e64",shirt:"#4a7c59",pants:"#6c584c",s:.8,hair:'<path d="M-24 -160 q 24 -30 48 0 q 0 -16 -24 -18 q -24 2 -24 18z" fill="#cfcfcf"/>'})}
      ${person(335,520,{skin:"#8a5a3c",shirt:"#7b2d8b",pants:"#2b2d42",s:.95,hair:'<path d="M-24 -160 q 24 -30 48 0 q 0 -20 -24 -22 q -24 2 -24 22z" fill="#e9b949"/><path d="M-24 -158 h48 v8 h-48z" fill="#d1495b"/>'})}
    </svg>`; },
    spots:[
      {id:"lideresa", x:335, y:362, label:"Lideresa comunal", kind:"talk"},
      {id:"herramientas", x:570, y:705, label:"Herramientas abandonadas", kind:"scan"},
      {id:"lora", x:1302, y:260, label:"Lora parlanchina", kind:"ear"},
      {id:"rotulo", x:800, y:408, label:"Rótulo vandalizado", kind:"scan"},
      {id:"periodico", x:1100, y:580, label:"Periódico comunitario", kind:"read"},
      {id:"perro", x:1450, y:690, label:"Perro guardián", kind:"scan"}
    ],
    chat:{a:{x:1228, y:520, name:DIALOGOS.comunidad.conversacion.a}, b:{x:1300, y:514, name:DIALOGOS.comunidad.conversacion.b}, lines:DIALOGOS.comunidad.conversacion.lineas},
    repo:{key:"repo1", x:1080, y:690, fx:1080, fy:862, label:"Archivista de Kinética",
      hello:DIALOGOS.comunidad.archivista.saludo, locked:DIALOGOS.comunidad.archivista.bloqueado},
    des:{game:"game1", num:1, x:190, y:690, fx:190, fy:852, label:"Agente de desafío", name:"La codificación de hallazgos",
      phrase:DIALOGOS.comunidad.agente.frase, locked:DIALOGOS.comunidad.agente.bloqueado}
  },
  playa:{
    zone:"Moín, Limón · Playa (día)", title:"Exploración en la playa",
    intro:"La marea baja dejó la arena marcada. Al fondo, las grúas del puerto. Revisá lo que dejó la noche.",
    start:[760, 880], music:true,
    svg(){ return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id="skyB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fa3d1"/><stop offset="1" stop-color="#cdeefa"/></linearGradient>
      <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c6e9e"/><stop offset="1" stop-color="#2aa198"/></linearGradient>
      <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9bf8c"/><stop offset="1" stop-color="#f2dfb3"/></linearGradient></defs>
      <rect width="1600" height="900" fill="url(#skyB)"/>
      <circle cx="260" cy="120" r="56" fill="#fff6c8"/>
      <g fill="#fff" opacity=".85"><ellipse cx="700" cy="140" rx="110" ry="28"/><ellipse cx="770" cy="120" rx="70" ry="30"/><ellipse cx="1250" cy="90" rx="90" ry="22"/></g>
      <rect y="330" width="1600" height="190" fill="url(#sea)"/>
      <g stroke="#3d4a55" stroke-width="7" fill="none"><path d="M1180 330 v-110 h70 v110 M1180 236 h-60 M1250 236 h20"/><path d="M1320 330 v-120 h70 v120 M1320 226 h-60"/><path d="M1460 330 v-104 h64 v104 M1460 240 h-56"/></g>
      <rect x="1100" y="318" width="500" height="14" fill="#3d4a55"/>
      <g fill="#c0392b"><rect x="1140" y="300" width="40" height="18"/><rect x="1270" y="300" width="40" height="18" fill="#2a6f97"/><rect x="1400" y="300" width="40" height="18" fill="#e9c46a"/></g>
      ${palm(110,560,1.1,"#2a6b45")}${palm(260,520,.8,"#2f7a4f")}
      <g stroke="#fff" stroke-opacity=".7" stroke-width="4" fill="none"><path d="M0 470 q 60 -14 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0"/><path d="M0 410 q 80 -10 160 0 t 160 0 t 160 0 t 160 0 t 160 0 t 160 0 t 160 0 t 160 0 t 160 0 t 160 0" stroke-opacity=".4"/></g>
      <path d="M0 500 Q 400 470 800 500 T 1600 490 V 900 H0z" fill="url(#sand)"/>
      <path d="M0 500 Q 400 470 800 500 T 1600 490 V 520 Q 1200 540 800 525 T 0 528z" fill="#bfa070" opacity=".6"/>
      <g transform="translate(250 600)"><rect x="-90" y="-60" width="200" height="90" fill="none" stroke="#7a5230" stroke-width="4"/><g stroke="#7a5230" stroke-width="2" opacity=".7">${Array.from({length:11},(_,i)=>`<line x1="${-90+i*20}" y1="-60" x2="${-90+i*20}" y2="30"/>`).join("")}</g><rect x="-50" y="-96" width="120" height="30" fill="#2a9d8f"/><text x="10" y="-74" text-anchor="middle" font-family="Chakra Petch,sans-serif" font-weight="700" font-size="18" fill="#fff">VIVERO</text></g>
      <g stroke="#9c8358" stroke-width="10" fill="none" stroke-dasharray="8 10" opacity=".75"><path d="M1600 650 C 1350 700 1250 760 1050 790 S 700 860 560 900"/><path d="M1600 700 C 1370 740 1270 805 1070 835 S 760 900 700 920"/></g>
      <g transform="translate(1185 805) rotate(-20)"><ellipse cx="0" cy="0" rx="12" ry="15" fill="#3b3a2c"/><circle cx="0" cy="-18" r="6" fill="#3b3a2c"/><path d="M-10 -6 l-14 -8 M10 -6 l14 -8 M-8 10 l-10 8 M8 10 l10 8" stroke="#3b3a2c" stroke-width="5" stroke-linecap="round"/></g>
      <g transform="translate(930 720)"><ellipse cx="0" cy="0" rx="90" ry="26" fill="#a98a57"/><ellipse cx="0" cy="-4" rx="60" ry="16" fill="#7c6440"/>
        <g fill="#fbf7ee">${[[-70,10],[-50,22],[-20,26],[30,24],[60,14],[80,0],[-84,-6],[40,-28]].map(([a,b])=>`<path d="M${a} ${b} q 8 -10 14 0 q -7 -4 -14 0z"/>`).join("")}</g></g>
      ${vulture(860,705,1)}${vulture(1010,700,.9)}${vulture(960,742,1.05)}
      <g stroke="#1b1b1b" stroke-width="6" fill="none" stroke-linecap="round"><path d="M860 220 q 20 -16 40 0 q 20 -16 40 0"/><path d="M990 170 q 16 -12 32 0 q 16 -12 32 0"/></g>
      <g transform="translate(1380 0)"><rect x="-6" y="560" width="12" height="120" fill="#5f6b73"/><rect x="-130" y="430" width="260" height="140" rx="8" fill="#1b4965" stroke="#f4f1e8" stroke-width="5"/>
        <text x="0" y="470" text-anchor="middle" font-family="Chakra Petch,sans-serif" font-weight="700" font-size="24" fill="#ffd166">ZONA PROTEGIDA</text>
        <text x="0" y="502" text-anchor="middle" font-family="Chakra Petch,sans-serif" font-weight="600" font-size="16" fill="#fff">PROHIBIDA LA EXTRACCIÓN</text>
        <text x="0" y="524" text-anchor="middle" font-family="Chakra Petch,sans-serif" font-weight="600" font-size="16" fill="#fff">DE HUEVOS DE TORTUGA</text>
        <path d="M-40 548 q 40 -24 80 0 q -40 14 -80 0z" fill="#52b788"/></g>
      ${person(500,640,{skin:"#c68e64",shirt:"#2a9d8f",pants:"#6c584c",s:1,hair:'<path d="M-30 -160 h60 v6 h-60z M-20 -160 q 20 -26 40 0z" fill="#d4a373"/>',extra:'<rect x="24" y="-112" width="26" height="34" rx="3" fill="#f4f1e8" stroke="#555" stroke-width="2" transform="rotate(-8 30 -100)"/>'})}
      ${person(588,648,{skin:"#7a4b2f",shirt:"#e9c46a",pants:"#264653",s:.95,hair:'<path d="M-32 -158 h64 v8 h-64z M-20 -158 q20 -24 40 0z" fill="#c9a66b"/>'})}
      <g transform="translate(700 716)"><ellipse cx="0" cy="6" rx="58" ry="9" fill="#000" opacity=".2"/><rect x="-46" y="-40" width="92" height="44" fill="#8a5a33" stroke="#5a3d27" stroke-width="3"/><line x1="-46" y1="-20" x2="46" y2="-20" stroke="#5a3d27" stroke-width="2"/><g transform="translate(0 -44) rotate(-4)"><path d="M-38 0 L0 -6 L38 0 L38 -26 L0 -32 L-38 -26z" fill="#f4f1e8" stroke="#555" stroke-width="2"/><line x1="0" y1="-6" x2="0" y2="-32" stroke="#555" stroke-width="2"/><g stroke="#2a6f97" stroke-width="2">${[-12,-17,-22].map(y=>`<line x1="-32" y1="${y}" x2="-6" y2="${y-3}"/><line x1="6" y1="${y-3}" x2="32" y2="${y}"/>`).join("")}</g></g></g>
    </svg>`; },
    spots:[
      {id:"biologo", x:700, y:640, label:"Bitácora del biólogo", kind:"read"},
      {id:"zopilotes", x:935, y:640, label:"Aves carroñeras", kind:"scan"},
      {id:"huellas", x:1190, y:770, label:"Huellas de vehículos", kind:"scan"},
      {id:"letrero", x:1380, y:398, label:"Letrero informativo", kind:"scan"}
    ],
    chat:{a:{x:500, y:462, name:DIALOGOS.playa.conversacion.a}, b:{x:588, y:480, name:DIALOGOS.playa.conversacion.b}, lines:DIALOGOS.playa.conversacion.lineas},
    repo:{key:"repo2", x:380, y:700, fx:380, fy:862, label:"Archivista de Kinética",
      hello:DIALOGOS.playa.archivista.saludo, locked:DIALOGOS.playa.archivista.bloqueado},
    des:{game:"game2", num:2, x:1480, y:710, fx:1480, fy:872, label:"Agente de desafío", name:"El radar de la información",
      phrase:DIALOGOS.playa.agente.frase, locked:DIALOGOS.playa.agente.bloqueado}
  },
  final:{
    zone:"Moín, Limón · Playa (final, de noche)", title:"Exploración en la playa (final)",
    intro:"Cae la noche y es temporada de anidación. Lo que pase en esta arena en las próximas horas cierra el caso.",
    start:[760, 880], music:true,
    svg(){
      const stars = Array.from({length:80},(_,i)=>`<circle cx="${(i*997)%1600}" cy="${(i*613)%300}" r="${i%7===0?2.2:1.2}" fill="#fff" opacity="${.35+((i*37)%60)/100}"/>`).join("");
      return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id="skyN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#040b1a"/><stop offset="1" stop-color="#1a3460"/></linearGradient>
      <linearGradient id="seaN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a2238"/><stop offset="1" stop-color="#103a55"/></linearGradient>
      <linearGradient id="sandN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b3a4f"/><stop offset="1" stop-color="#5a5470"/></linearGradient></defs>
      <rect width="1600" height="900" fill="url(#skyN)"/>${stars}
      <circle cx="1300" cy="120" r="70" fill="#f4f1de" opacity=".1"/><circle cx="1300" cy="120" r="40" fill="#f4f1de"/>
      <rect y="330" width="1600" height="190" fill="url(#seaN)"/>
      <g fill="#f4f1de" opacity=".35"><rect x="1250" y="350" width="100" height="4"/><rect x="1270" y="372" width="70" height="3"/><rect x="1240" y="398" width="120" height="3"/><rect x="1280" y="430" width="50" height="3"/></g>
      <g stroke="#1b2733" stroke-width="7" fill="none"><path d="M1040 330 v-110 h70 v110 M1040 236 h-60"/><path d="M180 330 v-100 h60 v100 M180 244 h-50"/></g>
      <rect x="960" y="318" width="200" height="14" fill="#1b2733"/><rect x="120" y="318" width="160" height="14" fill="#1b2733"/>
      <g fill="#ffcf70">${[[1040,218],[1110,218],[985,236],[180,228],[240,228],[1000,320],[1130,320],[150,320]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4"/>`).join("")}</g>
      <g stroke="#9fc5e8" stroke-opacity=".25" stroke-width="3" fill="none"><path d="M0 470 q 60 -14 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0"/></g>
      <path d="M0 500 Q 400 470 800 500 T 1600 490 V 900 H0z" fill="url(#sandN)"/>
      <g transform="translate(250 600)"><rect x="-90" y="-60" width="200" height="90" fill="none" stroke="#7d6a52" stroke-width="4"/><g stroke="#7d6a52" stroke-width="2" opacity=".7">${Array.from({length:11},(_,i)=>`<line x1="${-90+i*20}" y1="-60" x2="${-90+i*20}" y2="30"/>`).join("")}</g><rect x="-50" y="-96" width="120" height="30" fill="#1f6f66"/><text x="10" y="-74" text-anchor="middle" font-family="Chakra Petch,sans-serif" font-weight="700" font-size="18" fill="#dff">VIVERO</text></g>
      <circle cx="372" cy="560" r="46" fill="#ff3b3b" opacity=".16"/>
      ${person(330,640,{skin:"#a86f4c",shirt:"#2a9d8f",pants:"#2b2d42",s:.95,hair:'<path d="M-24 -162 q 24 -28 48 0 v 18 h-6 v-10 h-36 v10 h-6z" fill="#1b1b1b"/>',extra:'<rect x="30" y="-104" width="10" height="20" rx="3" fill="#333"/><circle cx="35" cy="-108" r="6" fill="#ff3b3b"/>'})}
      <g transform="translate(800 700)">
        <ellipse cx="60" cy="16" rx="150" ry="34" fill="#2c2a3b"/>
        <path d="M-60 6 C -120 36 -180 56 -215 40 C -175 26 -125 4 -78 -12z" fill="#161b25"/>
        <path d="M-60 -34 C -120 -64 -175 -86 -210 -74 C -170 -58 -122 -40 -78 -22z" fill="#161b25"/>
        <ellipse cx="10" cy="-12" rx="110" ry="58" fill="#1f2430"/>
        <g stroke="#384054" stroke-width="3" fill="none"><path d="M-90 -40 Q 10 -66 115 -28"/><path d="M-100 -12 Q 10 -28 120 -10"/><path d="M-92 18 Q 10 12 115 8"/></g>
        <g fill="#c9d3e6" opacity=".55">${Array.from({length:22},(_,i)=>`<circle cx="${(i*37)%90-70}" cy="${(i*23)%40-30}" r="1.8"/>`).join("")}</g>
        <ellipse cx="-118" cy="-14" rx="30" ry="24" fill="#262b38"/><circle cx="-132" cy="-20" r="3" fill="#0b0d12"/>
        <g fill="#f3efe6">${[[150,14],[162,22],[170,10],[156,30],[176,26]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7"/>`).join("")}</g>
      </g>
      <g transform="translate(100 0)"><line x1="-40" y1="560" x2="-46" y2="640" stroke="#5f6b73" stroke-width="6"/><line x1="40" y1="560" x2="46" y2="640" stroke="#5f6b73" stroke-width="6"/><rect x="-60" y="468" width="120" height="94" rx="4" fill="#e8eef0" stroke="#5f6b73" stroke-width="5"/><g stroke="#1d8d55" stroke-width="3">${Array.from({length:9},(_,k)=>`<line x1="${-48+k*9}" y1="484" x2="${-48+k*9}" y2="504"/>`).join("")}<line x1="-50" y1="488" x2="30" y2="500"/></g><g stroke="#33475b" stroke-width="3"><line x1="-48" y1="522" x2="44" y2="522"/><line x1="-48" y1="536" x2="30" y2="536"/><line x1="-48" y1="550" x2="38" y2="550"/></g></g>
      <g transform="translate(1262 640)"><ellipse cx="0" cy="6" rx="60" ry="10" fill="#000" opacity=".25"/><rect x="-46" y="-50" width="92" height="54" rx="6" fill="#2a6f97"/><rect x="-46" y="-58" width="92" height="14" rx="4" fill="#f4f1e8"/><rect x="-36" y="-86" width="26" height="30" rx="4" fill="#222"/><line x1="-16" y1="-86" x2="-12" y2="-114" stroke="#222" stroke-width="3"/><circle cx="-23" cy="-76" r="5" fill="#3df58e"/><g transform="translate(18 -68) rotate(-8)"><rect x="-20" y="-26" width="40" height="30" rx="3" fill="#8a5a33"/><rect x="-16" y="-22" width="32" height="24" fill="#f4f1e8"/><line x1="-12" y1="-14" x2="12" y2="-14" stroke="#555" stroke-width="2"/><line x1="-12" y1="-8" x2="10" y2="-8" stroke="#555" stroke-width="2"/></g></g>
      ${person(440,652,{skin:"#7a5236",shirt:"#1d3557",pants:"#14213d",s:.95,hair:'<path d="M-26 -160 h52 v-10 q -26 -18 -52 0z" fill="#0d1b2a"/><rect x="-30" y="-162" width="60" height="6" fill="#0d1b2a"/>',extra:'<rect x="-18" y="-118" width="36" height="10" fill="#e9c46a" opacity=".85"/><rect x="28" y="-104" width="10" height="22" rx="3" fill="#ddd"/>'})}
      <g transform="translate(1470 770)"><ellipse cx="0" cy="6" rx="70" ry="12" fill="#000" opacity=".25"/><rect x="-50" y="-66" width="100" height="66" rx="6" fill="#6c6f7d"/><rect x="-38" y="-56" width="76" height="40" rx="3" fill="#b8962e" opacity=".85"/><g stroke="#3b2f10" stroke-width="2"><line x1="-28" y1="-44" x2="28" y2="-44"/><line x1="-22" y1="-34" x2="22" y2="-34"/><line x1="-26" y1="-24" x2="26" y2="-24"/></g>
        <g>${[[-58,0,"#e76f51"],[-44,6,"#f4a261"],[58,2,"#e9c46a"],[46,8,"#e76f51"]].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="7" fill="${c}" opacity=".7"/>`).join("")}</g></g>
    </svg>`; },
    spots:[
      {id:"voluntaria", x:100, y:500, label:"Pizarra del vivero", kind:"read"},
      {id:"tortuga", x:790, y:585, label:"Tortuga baula desovando", kind:"scan"},
      {id:"patrulla", x:1262, y:556, label:"Acta de patrullaje", kind:"scan"},
      {id:"placa", x:1470, y:650, label:"Placa en memoria", kind:"read"}
    ],
    chat:{a:{x:330, y:472, name:DIALOGOS.final.conversacion.a}, b:{x:440, y:486, name:DIALOGOS.final.conversacion.b}, lines:DIALOGOS.final.conversacion.lineas},
    repo:{key:"repo4", x:560, y:700, fx:560, fy:866, label:"Archivista de Kinética",
      hello:DIALOGOS.final.archivista.saludo, locked:DIALOGOS.final.archivista.bloqueado},
    des:{game:"game4", num:4, x:1060, y:712, fx:1060, fy:876, label:"Agente de desafío", name:"Triangulando la realidad",
      phrase:DIALOGOS.final.agente.frase, locked:DIALOGOS.final.agente.bloqueado}
  }
};
