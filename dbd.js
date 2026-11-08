/* MATT'S WORLD — Poradniki DBD. Dane statyczne, bez Supabase. */
(()=>{'use strict';
const maps={
'MacMillan Estate':['Coal Tower','Groaning Storehouse','Ironworks of Misery','Shelter Woods','Suffocation Pit'],
'Autohaven Wreckers':['Azarov’s Resting Place','Blood Lodge','Gas Heaven','Wretched Shop','Wreckers’ Yard'],
'Coldwind Farm':['Fractured Cowshed','Rancid Abattoir','Rotten Fields','Thompson House','Torment Creek'],
'Crotus Prenn Asylum':['Disturbed Ward','Father Campbell’s Chapel'],
'Haddonfield':['Lampkin Lane'],
'Backwater Swamp':['The Pale Rose','Grim Pantry'],
'Léry’s Memorial Institute':['Treatment Theatre'],
'Red Forest':['Mother’s Dwelling','Temple of Purgation'],
'Springwood':['Badham Preschool I','Badham Preschool II','Badham Preschool III','Badham Preschool IV','Badham Preschool V'],
'Gideon Meat Plant':['The Game'],
'Yamaoka Estate':['Family Residence','Sanctum of Wrath'],
'Ormond':['Mount Ormond Resort','Ormond Lake Mine'],
'Hawkins National Laboratory':['The Underground Complex'],
'Grave of Glenvale':['Dead Dawg Saloon'],
'Silent Hill':['Midwich Elementary School'],
'Raccoon City':['Raccoon City Police Station East Wing','Raccoon City Police Station West Wing'],
'Forsaken Boneyard':['Eyrie of Crows'],
'Withered Isle':['Garden of Joy'],
'The Decimated Borgo':['Shattered Square'],
'Dvarka Deepwood':['Toba Landing','Nostromo Wreckage'],
'Greenville Square':['Greenville Square'],
'Forgotten Ruins':['Forgotten Ruins']};
const $=s=>document.querySelector(s);
function card(title,body,id){return `<section class="dbd-panel" id="${id}"><h2>${title}</h2>${body}</section>`}
function external(url,label){return `<a class="dbd-button" target="_blank" rel="noopener noreferrer" href="${url}">${label} ↗</a>`}
// Obrazy ładowane bezpośrednio z oficjalnej Wiki DBD (bez lokalnych kopii).
// Wiki może zmienić sposób serwowania plików; wtedy obraz pokaże komunikat zastępczy.
const perkLibrary={
 dejaVu:['Deja Vu','Déjà Vu','Ogólny','Pokazuje aury trzech generatorów tworzących tzw. trójgen i zapewnia niewielką premię do szybkości ich naprawy.'],
 kindred:['Kindred','Pokrewieństwo','Ogólny','Gdy ktoś wisi na haku, ujawnia aury ocalałych oraz killera w pobliżu haka.'],
 wellMakeIt:["We'll Make It",'Damy radę','Ogólny','Po zdjęciu ocalałego z haka przez pewien czas znacznie szybciej leczysz innych ocalałych.'],
 decisiveStrike:['Decisive Strike','Ostateczny cios','Perk ogólny (wcześniej Laurie Strode)','Po zdjęciu z haka, jeśli killer ponownie Cię dopadnie i podniesie, możesz wyrwać się z jego chwytu dzięki trafionemu testowi umiejętności (skill check), o ile spełnione są warunki aktywacji perka.'],
 wereGonnaLiveForever:["We're Gonna Live Forever",'Będziemy żyć wiecznie','David King','Przyspiesza leczenie powalonych sojuszników i zapewnia im ochronę po podniesieniu.'],
 unbreakable:['Unbreakable','Niezłomny','Bill Overbeck','Przyspiesza podnoszenie się ze stanu umierania i pozwala raz samodzielnie wstać.'],
 borrowedTime:['Borrowed Time','Pożyczony czas','Bill Overbeck','Wydłuża ochronę i premię do prędkości uratowanego z haka ocalałego.'],
 deadHard:['Dead Hard','Hart ducha','David King','Po odhaczeniu umożliwia krótką ochronę przed ciosem, jeśli prawidłowo wyczujesz moment.'],
 adrenaline:['Adrenaline','Adrenalina','Meg Thomas','Po zasileniu bram zapewnia leczenie o jeden stan i krótki zastrzyk prędkości.'],
 windowsOfOpportunity:['Windows of Opportunity','Ostatnia szansa','Kate Denson','Pokazuje aury pobliskich okien i palet, dzięki czemu łatwiej zaplanować trasę ucieczki. Sam perk nie przyspiesza przeskoków.'],
 lithe:['Lithe','Gibkość','Feng Min','Zapewnia krótkie przyspieszenie po szybkim przeskoku przez okno lub paletę.'],
 finesse:['Finesse','Finezja','Lara Croft','Przy pełnym zdrowiu przyspiesza szybki przeskok, jeśli perk nie jest na odnowieniu. Nie nakłada statusu Exhausted (Wyczerpanie).'],
 alert:['Alert','Czujność','Feng Min','Pokazuje aurę killera, gdy niszczy paletę lub ścianę albo uszkadza generator.'],
 fiveMovesAhead:['Five Moves Ahead','Pięć ruchów naprzód','Kwon Tae-young','Pokazuje pobliskie palety i pomaga szybciej odzyskać kontrolę po przeskoczeniu palety.'],
 resurgence:['Resurgence','Odrodzenie','Jill Valentine','Po zdjęciu z haka otrzymujesz dużą część postępu leczenia, co znacznie ułatwia szybki powrót do gry.'],
 distortion:['Distortion','Zakłócenie','Jeff Johansen','Pomaga ukrywać aurę przed umiejętnościami killera, zużywając dostępne żetony.'],
 lethalPursuer:['Lethal Pursuer','Śmiertelny pościg','Nemesis','Na początku meczu pokazuje aury ocalałych i wydłuża inne efekty ujawniania aur.'],
 nowhereToHide:['Nowhere to Hide','Nie ma gdzie się ukryć','The Knight (Rycerz)','Po uszkodzeniu generatora pokazuje aury pobliskich ocalałych w zasięgu killera.'],
 scourgeHookPainResonance:['Scourge Hook: Pain Resonance','Hak plagi: rezonans bólu','The Artist (Artystka)','Pierwsze zawieszenie każdego ocalałego na haku plagi powoduje regres najbardziej zaawansowanego generatora.'],
 popGoesTheWeasel:['Pop Goes the Weasel','Entliczek-pentliczek','The Clown (Klaun)','Po zawieszeniu ocalałego pozwala mocniej cofnąć postęp generatora przy jego uszkodzeniu.']
};
const buildPerks={starter:['dejaVu','kindred','wellMakeIt','decisiveStrike'],premium:['windowsOfOpportunity','lithe','finesse','alert'],killer:['lethalPursuer','nowhereToHide','scourgeHookPainResonance','popGoesTheWeasel']};
function perkSources(id){if(id==='fiveMovesAhead')return ['pictures/dbd-perk-five-moves-ahead.png'];const filename='IconPerks_'+id+'.png';const wiki='https://deadbydaylight.wiki.gg/wiki/Special:Redirect/file/'+encodeURIComponent(filename);return [wiki,'https://images.weserv.nl/?url='+encodeURIComponent(wiki)+'&w=256&output=png','https://deadbydaylight.fandom.com/wiki/Special:Redirect/file/'+encodeURIComponent(filename)];}
function perkCard(id){const [en,pl,owner,info]=perkLibrary[id];const sources=perkSources(id);return `<article class="dbd-perk-item"><a class="dbd-perk-image" href="https://deadbydaylight.wiki.gg/wiki/${encodeURIComponent(en.replaceAll(' ','_'))}" target="_blank" rel="noopener noreferrer" aria-label="Sprawdź ${en} na Wiki"><img loading="lazy" src="${sources[0]}" data-sources='${JSON.stringify(sources)}' data-source-index="0" alt="Ikona ${en}" referrerpolicy="no-referrer"><span class="dbd-perk-fallback" style="display:none">✦<small>${en}</small></span></a><div class="dbd-perk-copy"><strong>${en}</strong><span>(${pl})</span><span class="dbd-perk-owner">Od: ${owner}</span><small>${info}</small></div></article>`}
function build(id,title,desc){return `<article class="dbd-build"><div class="dbd-build-head"><h4>${title}</h4><span>4 PERKI</span></div><div class="dbd-perk-set">${buildPerks[id].map(perkCard).join('')}</div><p class="dbd-build-summary">${desc}</p></article>`}
function extraPerks(ids){return `<div class="dbd-perk-set dbd-perk-extras">${ids.map(perkCard).join('')}</div>`}
function character(name,filename,perk){return `<article class="dbd-character"><div class="dbd-character-photo"><img src="pictures/${filename}" loading="lazy" alt="${name}"></div><div class="dbd-character-details"><strong>${name}</strong><small>${perk}</small></div></article>`}
// Zamiast pustych obrazów próbujemy kolejnego adresu, a następnie pokazujemy nazwę.
document.addEventListener('error',event=>{
 const img=event.target;
 if(!(img instanceof HTMLImageElement)||!img.matches('.dbd-perk-image img'))return;
 let sources;try{sources=JSON.parse(img.dataset.sources||'[]')}catch{return}
 const next=(Number(img.dataset.sourceIndex)||0)+1;
 if(next<sources.length){img.dataset.sourceIndex=String(next);img.src=sources[next];return}
 img.style.display='none';const fallback=img.nextElementSibling;if(fallback)fallback.style.display='flex';
},true);
function render(el){if(!el)return;
el.innerHTML=`<div class="container dbd-guide"><header class="dbd-hero"><span>PORADNIKI / DEAD BY DAYLIGHT</span><h1>PRZEŻYJ DŁUŻEJ.<br><em>GRAJ MĄDRZEJ.</em></h1><p>Buildy, perki, sekrety map, punkty krwi i komunikacja zegarowa. Przewodnik społeczności MATT'S WORLD.</p></header>
<nav class="dbd-toc" aria-label="Spis treści"><a href="#dbd-addons">BUILDY</a><a href="#dbd-perks">PERKI</a><a href="#dbd-reshade">RESHade</a><a href="#dbd-nightlight">NIGHTLIGHT</a><a href="#dbd-bp">BP I RESET</a><a href="#dbd-hatch">HATCH</a><a href="#dbd-trivia">CIEKAWOSTKI</a><a href="#dbd-clock">SYSTEM ZEGAROWY</a><a href="#dbd-queue">DBDQUEUE</a></nav>
${card('01 / Polecane add-ony i buildy',`<p>Sprawdź aktualne zestawy i dodatki dla killerów i survivorów przygotowane przez Otzdarvę. Opisy i efekty add-onów zmieniają się z aktualizacjami gry, dlatego kierujemy do aktualizowanego źródła.</p>${external('https://otzdarva.com/','OTZDARVA — BUILDS & ADD-ONS')}`,'dbd-addons')}
${card('02 / Jakie perki polecamy?',`<div class="dbd-sub"><div class="dbd-section-label">01 / DLA POCZĄTKUJĄCYCH</div><h3>Startowy zestaw perków</h3><p>Na początek polecamy cztery perki, które pomogą Ci zrozumieć umiejscowienie generatorów, ratowanie drużyny i bezpieczną grę. <b>Decisive Strike</b> jest obecnie dostępny jako perk ogólny (wcześniej należał do Laurie Strode).</p>${build('starter','Zestaw startowy','Zestaw dla początkujących: orientacja na mapie, ratowanie drużyny, szybkie leczenie i ochrona przed tunelowaniem.')}<h4 class="dbd-mini-heading">Alternatywne polecane perki</h4>${extraPerks(['wereGonnaLiveForever','unbreakable','borrowedTime','deadHard','adrenaline'])}<p class="dbd-note"><b>Dead Hard</b> warto wybrać dopiero wtedy, gdy nauczysz się odpowiednio wyczuwać ataki killera.</p></div>
<div class="dbd-sub"><div class="dbd-section-label">02 / ROZBUDOWA KONTA</div><h3>Jakie postacie kupić pod perki?</h3><p><b>Na sam start</b> polecamy trzy postacie: Feng Min, Larę Croft i Kate Denson. Następnie możesz rozważyć Kwon Tae-younga, Jill Valentine i Jeffa Johansena.</p><h4 class="dbd-mini-heading">Kup na początek</h4><div class="dbd-character-grid">${character('Feng Min','dbd-character-feng.png','Lithe · Alert')}${character('Lara Croft','dbd-character-lara.png','Finesse')}${character('Kate Denson','dbd-character-kate.png','Windows of Opportunity')}</div><h4 class="dbd-mini-heading">W dalszej kolejności</h4><div class="dbd-character-grid">${character('Kwon Tae-young','dbd-character-kwon.png','Five Moves Ahead')}${character('Jill Valentine','dbd-character-jill.png','Resurgence')}${character('Jeff Johansen','dbd-character-jeff.png','Distortion')}</div>${build('premium','Zestaw startowy premium','Mobilność, orientacja podczas pościgu i lepsza kontrola sytuacji.')}<h4 class="dbd-mini-heading">Alternatywne perki z kolejnych postaci</h4>${extraPerks(['fiveMovesAhead','resurgence','distortion'])}</div>
<div class="dbd-sub"><div class="dbd-section-label">03 / CO DALEJ?</div><h3>Znajdź swój własny build</h3><p>To propozycje przede wszystkim dla nowych graczy. Warto testować również inne perki i dobrać zestaw do własnego stylu gry. Gdy opanujesz podstawy, sięgnij po bardziej zaawansowane kombinacje — celowo nie opisujemy ich wszystkich na początku.</p>${external('https://www.dbdbuilds.com/tiers','ZOBACZ TIER LISTĘ PERKÓW')}</div>
<div class="dbd-sub"><div class="dbd-section-label">04 / KILLER</div><h3>Uniwersalne perki dla killera</h3>${build('killer','Zestaw uniwersalny killera','')}<p class="dbd-note">Są to perki uniwersalne, a nie zestaw przygotowany pod konkretnego killera. Nie zawsze będą najlepszym wyborem, ale warto je odblokować i wypróbować, szczególnie na początku.</p></div>`,'dbd-perks')}
${card('03 / ReShade',`<p>Instrukcja instalacji i konfiguracji — <b>w przygotowaniu</b>. Dostępne już pliki konfiguracyjne możesz znaleźć w sekcji „Do pobrania”.</p><a class="dbd-button" href="#/viewer/downloads">DO POBRANIA →</a>`,'dbd-reshade')}
${card('04 / NightLight',`<p>Instrukcja obsługi NightLight — <b>w przygotowaniu</b>. Dodamy tu konfigurację, statystyki i przykłady zastosowania.</p>`,'dbd-nightlight')}
${card('Reset wbitej rangi killera i surva',`<div class="dbd-bp-img"><img src="pictures/dbd-bp-ranks.webp" loading="lazy" alt="Tabela nagród BP za rangi: I–IV, od Iridescent do Ash"></div><p class="dbd-note">Reset rangi następuje <b>13. dnia każdego miesiąca</b>. Nagrody za osiągniętą rangę są przyznawane oddzielnie dla survivora i killera.</p>`,'dbd-bp')}
${card('06 / Gdzie respi się Hatch?',`<p>Hatch pojawia się w <b>losowym, wyznaczonym podczas generowania mapy miejscu</b> i otwiera się, gdy pozostanie tylko jeden żywy survivor. Nie ma gwarantowanego miejsca na każdej mapie.</p><div class="dbd-two"><div><h3>Main building</h3><p><b>Annotated Blueprint</b> zwiększa szansę pojawienia się hatcha w głównym budynku lub jego pobliżu, jeśli mapa ma taki obszar.</p></div><div><h3>Killer Shack</h3><p><b>Vigo’s Blueprint</b> zwiększa szansę pojawienia się hatcha w shacku lub obok niego, jeśli mapa posiada shack.</p></div></div><p>Wybierz mapę w systemie zegarowym poniżej, aby poznać jej nazwę i nauczyć się komunikacji położenia. To nie jest mapa gwarantowanych spawnów hatcha.</p>${external('https://deadbydaylight.wiki.gg/wiki/Hatch','ZASADY HATCHA — WIKI')}`,'dbd-hatch')}
${card('07 / Ciekawostki',`<div class="dbd-sub"><h3>Nostromo — Keycard (Karta dostępu)</h3><p>Znajdź ciało astronauty i podnieś kartę. Następnie użyj jej przy terminalu obok Mess Hall. Sekwencja hackowania to <b>lewo → dół → góra → prawo</b>. Otworzysz tajne pomieszczenie ze skrzynią.</p>${external('https://deadbydaylight.wiki.gg/wiki/Keycard','SZCZEGÓŁY')}</div><div class="dbd-sub"><h3>Midwich — sekretna komnata w wieży</h3><p>Napraw generator w <b>laboratorium chemicznym</b>, a potem generator w <b>sali muzycznej</b>. Gdy rozpocznie się <b>Endgame Collapse</b>, drzwi pod wieżą zegarową otworzą ukryte pomieszczenie ze skrzynią.</p>${external('https://deadbydaylight.wiki.gg/wiki/Midwich_Elementary_School','SZCZEGÓŁY')}</div><div class="dbd-sub"><h3>Yamaoka — ukryty pingwin</h3><p>W społeczności DBD krąży ciekawostka o małym pingwinie na mapie Yamaoka. Lokalizacja i wygląd wymagają jeszcze potwierdzonego materiału; nie dodajemy niezweryfikowanego zdjęcia.</p></div>`,'dbd-trivia')}
${card('08 / System zegarowy — Callouts',`<p>Komunikacja „na zegar”: <b>12</b> oznacza górę mapy, <b>3</b> prawą stronę, <b>6</b> dół, a <b>9</b> lewą. Wybierz mapę i obracaj oznaczenia. Lista i tarcza działają <b>lokalnie, bez Supabase</b>.</p><div class="dbd-clock-tools"><label>Mapa <select id="dbd-map"></select></label><button id="dbd-rotate" type="button">↻ OBRÓĆ O 90°</button><button id="dbd-reset" type="button">RESET</button></div><div class="dbd-clock-layout"><div class="dbd-clock-face" id="dbd-clock-face"><div class="dbd-clock-ring" id="dbd-clock-ring"></div><span class="dbd-clock-center" id="dbd-clock-center">WYBIERZ MAPĘ</span></div><div class="dbd-clock-info"><h3 id="dbd-map-name">—</h3><p id="dbd-map-realm"></p><p>Przykład: „Killer na godzinie 2, blisko maina”. Orientację zegara ustalcie przed meczem, bo obrót mapy zmienia kierunki.</p><p class="dbd-note">To autorska, uproszczona tarcza do ćwiczenia calloutów, a nie kopia map graficznych Hensa. Nie pokazuje układu budynków ani spawnów.</p>${external('https://hens333.com/callouts','MAPY I UKŁADY HENSA')}</div></div>`,'dbd-clock')}
${card('09 / DBDQueue — kolejki w Europie',`<p>Sprawdź orientacyjne czasy oczekiwania na mecz dla <b>Frankfurtu (eu-central-1)</b> lub <b>Dublina (eu-west-1)</b>. Dane zależą od trybu, pory dnia i MMR.</p><div class="dbd-two"><div><h3>Frankfurt — EU Central</h3><p>Najczęściej przydatny region dla graczy w Polsce.</p></div><div><h3>Dublin — EU West</h3><p>Alternatywny region europejski.</p></div></div>${external('https://www.deadbyqueue.com/','SPRAWDŹ AKTUALNE KOLEJKI')}<p class="dbd-note">Przycisk otwiera aktualne dane na stronie dostawcy. Nie wyświetlamy niezweryfikowanych czasów jako „na żywo” i nie pobieramy danych bez udokumentowanego, dostępnego API.</p>`,'dbd-queue')}
<footer class="dbd-guide-footer">MATT'S WORLD · PORADNIKI DBD · Materiał społecznościowy, niezwiązany oficjalnie z Behaviour Interactive.</footer></div>`;
// Siedem kategorii: pokazujemy wyłącznie treści wybranej kategorii.
const guideRoot=el.querySelector('.dbd-guide');
const oldToc=guideRoot.querySelector('.dbd-toc');
if(oldToc)oldToc.remove();
const categories=[
 {id:'perks',title:'Perki & addony',detail:'Buildy, perki i tier lista',icon:'✦',sections:['dbd-addons','dbd-perks']},
 {id:'software',title:'Pomocnicze oprogramowanie',detail:'ReShade i NightLight',icon:'⚙',sections:['dbd-reshade','dbd-nightlight']},
 {id:'bp',title:'Nagrody za wbitą rangę',detail:'Nagrody i reset rang',icon:'◆',sections:['dbd-bp']},
 {id:'hatch',title:'Hatch',detail:'Gdzie szukać włazu?',icon:'⌖',sections:['dbd-hatch']},
 {id:'clock',title:'System zegarowy',detail:'Callouty i mapy',icon:'◷',sections:['dbd-clock']},
 {id:'trivia',title:'Ciekawostki',detail:'Sekrety map DBD',icon:'✧',sections:['dbd-trivia']},
 {id:'queue',title:'Kolejki w DBD',detail:'Sprawdź kolejki w Europie',icon:'☷',sections:['dbd-queue']}
];
const menu=document.createElement('nav');menu.className='dbd-category-menu';menu.setAttribute('aria-label','Kategorie poradnika Dead by Daylight');
const content=document.createElement('div');content.className='dbd-category-content';content.hidden=true;
const toolbar=document.createElement('div');toolbar.className='dbd-category-toolbar';
const back=document.createElement('button');back.type='button';back.className='dbd-category-back';back.textContent='← WSZYSTKIE KATEGORIE';
const currentTitle=document.createElement('h2');currentTitle.className='dbd-category-current';
toolbar.append(back,currentTitle);content.append(toolbar);
const panels=new Map([...guideRoot.querySelectorAll('.dbd-panel')].map(panel=>[panel.id,panel]));
const groups=new Map();
for(const category of categories){
 const button=document.createElement('button');button.type='button';button.className='dbd-category-tile';button.setAttribute('aria-controls','dbd-category-'+category.id);
 const icon=document.createElement('span');icon.className='dbd-category-icon';icon.setAttribute('aria-hidden','true');icon.textContent=category.icon;
 const copy=document.createElement('span');copy.className='dbd-category-tile-copy';
 const heading=document.createElement('strong');heading.textContent=category.title;
 const detail=document.createElement('small');detail.textContent=category.detail;
 const arrow=document.createElement('span');arrow.className='dbd-category-arrow';arrow.textContent='→';arrow.setAttribute('aria-hidden','true');
 copy.append(heading,detail);button.append(icon,copy,arrow);menu.append(button);
 const group=document.createElement('div');group.className='dbd-category-group';group.id='dbd-category-'+category.id;group.hidden=true;
 category.sections.forEach(id=>{const panel=panels.get(id);if(panel)group.append(panel)});
 content.append(group);groups.set(category.id,group);
 button.addEventListener('click',()=>showCategory(category.id));
}
const footer=guideRoot.querySelector('.dbd-guide-footer');
if(footer)guideRoot.insertBefore(menu,footer);else guideRoot.append(menu);
if(footer)guideRoot.insertBefore(content,footer);else guideRoot.append(content);
function showCategory(id){
 const category=categories.find(item=>item.id===id);
 menu.hidden=!!category;content.hidden=!category;
 for(const [key,group] of groups)group.hidden=key!==id;
 if(category){currentTitle.textContent=category.title;content.scrollIntoView({block:'start',behavior:'smooth'});}
 else {menu.scrollIntoView({block:'start',behavior:'smooth'});}
}
back.addEventListener('click',()=>showCategory(null));
// Umożliwiamy otwarcie konkretnej sekcji z odnośnika wewnętrznego.
const requested=window.location.hash.match(/dbd-(?:addons|perks|reshade|nightlight|bp|hatch|clock|trivia|queue)/)?.[0];
if(requested){const found=categories.find(category=>category.sections.includes(requested));if(found)showCategory(found.id)}
const sel=$('#dbd-map'),ring=$('#dbd-clock-ring'); if(!sel||!ring)return;
const all=Object.entries(maps).flatMap(([realm,names])=>names.map(name=>({realm,name})));
all.forEach((m,i)=>{const o=document.createElement('option');o.value=String(i);o.textContent=`${m.realm} — ${m.name}`;sel.appendChild(o)});
let turn=0;const update=()=>{const m=all[+sel.value]||all[0];$('#dbd-map-name').textContent=m.name;$('#dbd-map-realm').textContent=m.realm;$('#dbd-clock-center').textContent=m.name;ring.innerHTML='';for(let n=1;n<=12;n++){const d=document.createElement('span');const rad=((n-3)*30+turn)*Math.PI/180;d.className='dbd-hour';d.style.left=(50+42*Math.cos(rad))+'%';d.style.top=(50+42*Math.sin(rad))+'%';d.textContent=n;ring.appendChild(d)}};
sel.addEventListener('change',()=>{turn=0;update()});$('#dbd-rotate').addEventListener('click',()=>{turn=(turn+90)%360;update()});$('#dbd-reset').addEventListener('click',()=>{turn=0;update()});update();
}
window.MattDBDGuide={render};
})();
