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

const hatchLocations=[{"realm":"Autohaven Wreckers","maps":[{"name":"Azarov’s Resting Place","shack":[1],"main":[2]},{"name":"Blood Lodge","shack":[3],"main":[4]},{"name":"Gas Haven","shack":[5],"main":[6]},{"name":"Wrecker’s Yard","shack":[7],"main":[]},{"name":"Wretched Shop","shack":[8],"main":[9]}]},{"realm":"Backwater Swamp","maps":[{"name":"Grim Pantry","shack":[10],"main":[11]},{"name":"Pale Rose","shack":[12],"main":[13]}]},{"realm":"Coldwind Farm","maps":[{"name":"Fractured Cowshed","shack":[14],"main":[15]},{"name":"Rancid Abattoir","shack":[16],"main":[17]},{"name":"Rotten Fields","shack":[18],"main":[]},{"name":"The Thompson House","shack":[19],"main":[20,21,22]},{"name":"Torment Creek","shack":[23],"main":[24,25,26]}]},{"realm":"Crotus Prenn Asylum","maps":[{"name":"Disturbed Ward","shack":[27],"main":[28]},{"name":"Father Campbell’s Chapel","shack":[29],"main":[30]}]},{"realm":"The Decimated Borgo","maps":[{"name":"The Shattered Square","shack":[31],"main":[32,33,34]},{"name":"Forgotten Ruins","shack":[35],"main":[36,37,38]}]},{"realm":"Dvarka Deepwood","maps":[{"name":"Nostromo Wreckage","shack":[39,40],"main":[41,42,43,44]},{"name":"Toba Landing","shack":[45],"main":[46]}]},{"realm":"Forsaken Boneyard","maps":[{"name":"Eyrie of Crows","shack":[47],"main":[48]},{"name":"Dead Sands","shack":[49],"main":[]}]},{"realm":"Gideon Meat Plant","maps":[{"name":"The Game","shack":[],"main":[]}]},{"realm":"Grave of Glenvale","maps":[{"name":"Dead Dawg Saloon","shack":[50],"main":[51,52,53,54]}]},{"realm":"Hawkins National Laboratory","maps":[{"name":"The Underground Complex","shack":[],"main":[]}]},{"realm":"Léry’s Memorial Institute","maps":[{"name":"Treatment Theatre","shack":[],"main":[]}]},{"realm":"The MacMillan Estate","maps":[{"name":"Coal Tower","shack":[55],"main":[56,57]},{"name":"Groaning Storehouse","shack":[58],"main":[59]},{"name":"Ironworks of Misery","shack":[60],"main":[61,62]},{"name":"Shelter Woods","shack":[63],"main":[64]},{"name":"Suffocation Pit","shack":[65],"main":[66]}]},{"realm":"Ormond","maps":[{"name":"Mount Ormond Resort","shack":[67],"main":[68,69,70]},{"name":"Ormond Lake Mine","shack":[71],"main":[72,73]}]},{"realm":"Raccoon City Police Department","maps":[{"name":"RPD East Wing","shack":[],"main":[]},{"name":"RPD West Wing","shack":[],"main":[]}]},{"realm":"Red Forest","maps":[{"name":"Mother’s Dwelling","shack":[74],"main":[75]},{"name":"Temple of Purgation","shack":[76],"main":[77]}]},{"realm":"Silent Hill","maps":[{"name":"Midwich Elementary School","shack":[],"main":[]}]},{"realm":"Springwood","maps":[{"name":"Badham Preschool","shack":[78],"main":[79,80,81]}]},{"realm":"Yamaoka Estate","maps":[{"name":"Family Residence","shack":[82],"main":[83]},{"name":"Sanctum of Wrath","shack":[84],"main":[85]}]},{"realm":"Withered Isle","maps":[{"name":"Garden of Joy","shack":[86],"main":[87,88]},{"name":"Greenville Square","shack":[89],"main":[90]},{"name":"Freddy Fazbear’s Pizza","shack":[91],"main":[92,93,94]},{"name":"Fallen Refuge","shack":[95],"main":[]}]},{"realm":"Sleepless District","maps":[{"name":"Trickster’s Delusion","shack":[96],"main":[97]}]}];
const hatchImageBase='https://yekpeak.com/wp-content/uploads/2026/11/dead-by-daylight-all-hatch-spawn-locations-';
function hatchImage(n,kind,mapName,i){
 const src=hatchImageBase+String(n).padStart(2,'0')+'.webp';
 return `<figure class="dbd-hatch-shot"><button type="button" class="dbd-hatch-image-trigger" data-hatch-preview="${src}" data-hatch-caption="${kind} — ${mapName}, miejsce ${i+1}" aria-label="Powiększ: ${kind}, ${mapName}, miejsce ${i+1}"><img src="${src}" loading="lazy" alt="${kind} — ${mapName}, wariant ${i+1}" onerror="this.closest('figure').classList.add('dbd-hatch-img-error')"></button><figcaption>${kind} · miejsce ${i+1}</figcaption></figure>`;
}
function hatchGallery(indices,kind,name){
 return `<section class="dbd-hatch-place"><h4>${kind} <span>${indices.length ? indices.length+' '+(indices.length===1?'lokalizacja':'lokalizacje') : 'brak punktu z oferty'}</span></h4>${indices.length?`<div class="dbd-hatch-gallery">${indices.map((n,i)=>hatchImage(n,kind,name,i)).join('')}</div>`:'<p>Na tej mapie nie ma wskazanego miejsca powiązanego z tą ofertą.</p>'}</section>`;
}
function hatchGuide(){
 return `<div class="dbd-hatch-tool">
 <div class="dbd-hatch-intro"><p>Wybierz krainę i mapę, aby zobaczyć <b>miejsca powiązane z ofertami na Hatch</b> przy <b>Main Building</b> i <b>Killer Shack</b>. Zdjęcia pokazują otoczenie konkretnego punktu — kliknij je, aby powiększyć.</p><p><b>Uwaga:</b> są to punkty dla ofert wpływających na pojawienie się Hatcha, a nie gwarantowane miejsca w każdym meczu. Mapa może mieć kilka wariantów lokalizacji. Na mapach bez punktów z ofertą Hatch nadal może pojawić się losowo.</p></div>
 <label class="dbd-hatch-search-label" for="dbd-hatch-search">Szybko znajdź mapę</label><input id="dbd-hatch-search" class="dbd-hatch-search" type="search" placeholder="Np. Greenville, Coldwind, Ormond, Midwich…" autocomplete="off">
 <div class="dbd-hatch-layout"><aside class="dbd-hatch-realms" aria-label="Krainy"></aside><div class="dbd-hatch-main"><div class="dbd-hatch-map-tabs" aria-label="Warianty map"></div><div class="dbd-hatch-results" aria-live="polite"></div></div></div>
 <div class="dbd-hatch-lightbox" role="dialog" aria-modal="true" aria-label="Podgląd zdjęcia Hatcha" hidden><button type="button" class="dbd-hatch-lightbox-close" aria-label="Zamknij podgląd">×</button><button type="button" class="dbd-hatch-lightbox-prev" aria-label="Poprzednie zdjęcie">‹</button><div class="dbd-hatch-lightbox-frame"><img class="dbd-hatch-lightbox-img" alt=""><div class="dbd-hatch-lightbox-caption"></div></div><button type="button" class="dbd-hatch-lightbox-next" aria-label="Następne zdjęcie">›</button></div>
 <p class="dbd-hatch-source">Źródło zdjęć i lokalizacji: <a href="https://yekpeak.com/dead-by-daylight-all-hatch-spawn-locations/" target="_blank" rel="noopener noreferrer">Yekpeak — All Hatch Spawn Locations (2026)</a>. Zdjęcia są wyświetlane z witryny autora, bez zapisywania ich w repozytorium.</p></div>`;
}
function initHatchGuide(root){
 const tool=root.querySelector('.dbd-hatch-tool');if(!tool||tool.dataset.ready)return;tool.dataset.ready='1';
 const realmEl=tool.querySelector('.dbd-hatch-realms'),tabs=tool.querySelector('.dbd-hatch-map-tabs'),results=tool.querySelector('.dbd-hatch-results'),search=tool.querySelector('.dbd-hatch-search');
 const lightbox=tool.querySelector('.dbd-hatch-lightbox'),previewImage=tool.querySelector('.dbd-hatch-lightbox-img'),previewCaption=tool.querySelector('.dbd-hatch-lightbox-caption');
 let previewIndex=0,previewItems=[],lastFocus=null;
 function closePreview(){if(lightbox.hidden)return;lightbox.hidden=true;previewImage.removeAttribute('src');document.body.classList.remove('dbd-hatch-modal-open');if(lastFocus&&lastFocus.isConnected)lastFocus.focus();}
 function showPreview(index){if(!previewItems.length)return;previewIndex=(index+previewItems.length)%previewItems.length;const item=previewItems[previewIndex];previewImage.src=item.dataset.hatchPreview;previewImage.alt=item.dataset.hatchCaption;previewCaption.textContent=item.dataset.hatchCaption+' · '+(previewIndex+1)+' / '+previewItems.length;const multiple=previewItems.length>1;tool.querySelector('.dbd-hatch-lightbox-prev').hidden=!multiple;tool.querySelector('.dbd-hatch-lightbox-next').hidden=!multiple;}
 results.addEventListener('click',e=>{const btn=e.target.closest('[data-hatch-preview]');if(!btn)return;previewItems=[...results.querySelectorAll('[data-hatch-preview]')].filter(x=>!x.closest('.dbd-hatch-img-error'));previewIndex=previewItems.indexOf(btn);if(previewIndex<0)return;lastFocus=btn;showPreview(previewIndex);lightbox.hidden=false;document.body.classList.add('dbd-hatch-modal-open');tool.querySelector('.dbd-hatch-lightbox-close').focus();});
 lightbox.addEventListener('click',e=>{if(e.target===lightbox||e.target.closest('.dbd-hatch-lightbox-close'))closePreview();else if(e.target.closest('.dbd-hatch-lightbox-prev'))showPreview(previewIndex-1);else if(e.target.closest('.dbd-hatch-lightbox-next'))showPreview(previewIndex+1);});
 document.addEventListener('keydown',e=>{if(lightbox.hidden)return;if(e.key==='Escape'){e.preventDefault();closePreview();}else if(e.key==='ArrowLeft'){e.preventDefault();showPreview(previewIndex-1);}else if(e.key==='ArrowRight'){e.preventDefault();showPreview(previewIndex+1);}else if(e.key==='Tab'){const controls=[...lightbox.querySelectorAll('button:not([hidden])')];if(!controls.length)return;const first=controls[0],last=controls[controls.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});

 let selectedRealm='Withered Isle',selectedMap='Greenville Square';
 function display(){
  const query=search.value.trim().toLocaleLowerCase();
  const filtered=hatchLocations.map(r=>({...r,maps:r.maps.filter(m=>!query||(r.realm+' '+m.name).toLocaleLowerCase().includes(query))})).filter(r=>r.maps.length);
  if(!filtered.length){realmEl.innerHTML='';tabs.innerHTML='';results.innerHTML='<p>Nie znaleziono mapy. Spróbuj innej nazwy.</p>';return}
  let realm=filtered.find(r=>r.realm===selectedRealm);
  if(!realm){realm=filtered[0];selectedRealm=realm.realm;selectedMap=realm.maps[0].name}
  let map=realm.maps.find(m=>m.name===selectedMap);
  if(!map){map=realm.maps[0];selectedMap=map.name}
  realmEl.innerHTML=filtered.map(r=>`<button type="button" class="${r.realm===selectedRealm?'active':''}" data-hatch-realm="${r.realm}">${r.realm}<small>${r.maps.length} map</small></button>`).join('');
  tabs.innerHTML=realm.maps.map(m=>`<button type="button" class="${m.name===selectedMap?'active':''}" data-hatch-map="${m.name}">${m.name}</button>`).join('');
  results.innerHTML=`<div class="dbd-hatch-result-heading"><span>${realm.realm}</span><h3>${map.name}</h3></div>${map.shack.length+map.main.length?hatchGallery(map.shack,'Killer Shack',map.name)+hatchGallery(map.main,'Main Building',map.name):'<div class="dbd-hatch-empty">Ta mapa nie ma ustalonych punktów Hatcha powiązanych z ofertami. Nie oznacza to, że Hatch nie pojawi się w meczu.</div>'}${realm.realm==='Raccoon City Police Department'?'<p class="dbd-hatch-note">RPD ma wyjątkowe zachowanie ofert Hatcha; szczegóły sprawdź w źródle.</p>':''}`;
 }
 realmEl.addEventListener('click',e=>{const b=e.target.closest('[data-hatch-realm]');if(!b)return;selectedRealm=b.dataset.hatchRealm;selectedMap='';display()});
 tabs.addEventListener('click',e=>{const b=e.target.closest('[data-hatch-map]');if(!b)return;selectedMap=b.dataset.hatchMap;display()});
 search.addEventListener('input',()=>{selectedRealm='';selectedMap='';display()});
 display();
}

const calloutRealms={"Autohaven Wreckers":["Azarov’s Resting Place","Blood Lodge","Gas Heaven","Wreckers’ Yard","Wretched Shop"],"Springwood / Badham":["Badham Preschool I","Badham Preschool II","Badham Preschool III","Badham Preschool IV","Badham Preschool V"],"Coldwind Farm":["Fractured Cowshed","Rancid Abattoir","Rotten Fields","The Thompson House","Torment Creek"],"Crotus Prenn Asylum":["Disturbed Ward","Father Campbell’s Chapel"],"MacMillan Estate":["Coal Tower","Coal Tower II","Groaning Storehouse","Groaning Storehouse II","Ironworks of Misery","Ironworks of Misery II","Shelter Woods","Shelter Woods II","Suffocation Pit","Suffocation Pit II"],"Red Forest":["Mother’s Dwelling","Temple of Purgation"],"Backwater Swamp":["Grim Pantry","The Pale Rose"],"Yamaoka Estate":["Family Residence","Family Residence II","Sanctum of Wrath","Sanctum of Wrath II"],"Raccoon City":["Police Station East Wing","Police Station West Wing"],"Forsaken Boneyard":["Eyrie of Crows","Dead Sands"],"Grave of Glenvale":["Dead Dawg Saloon"],"Withered Isle":["Garden of Joy","Greenville Square","Fallen Refuge","Freddy Fazbear’s Pizza"],"Gideon Meat Plant":["The Game"],"Haddonfield":["Lampkin Lane"],"Silent Hill":["Midwich Elementary School"],"Ormond":["Mount Ormond Resort","Mount Ormond Resort II","Mount Ormond Resort III","Ormond Lake Mine"],"The Decimated Borgo":["Shattered Square","Forgotten Ruins"],"Léry’s Memorial Institute":["Treatment Theatre"],"Dvarka Deepwood":["Toba Landing","Nostromo Wreckage"],"Hawkins National Laboratory":["The Underground Complex"],"Sleepless District":["Trickster’s Delusion"]};
const calloutLocalImages={"Azarov’s Resting Place":{"simple":"pictures/Azarovs Resting Place.webp","advanced":"pictures/matt-advanced-Azarovs Resting Place.webp","realm":"Autohaven Wreckers"},"Blood Lodge":{"simple":"pictures/Blood Lodge.webp","advanced":"pictures/matt-advanced-Blood Lodge.webp","realm":"Autohaven Wreckers"},"Gas Heaven":{"simple":"pictures/Gas Heaven.webp","advanced":"pictures/matt-advanced-Gas Heaven.webp","realm":"Autohaven Wreckers"},"Wreckers’ Yard":{"simple":"pictures/Wreckers.webp","advanced":"pictures/matt-advanced-Wreckers.webp","realm":"Autohaven Wreckers"},"Wretched Shop":{"simple":"pictures/Wretched Shop.webp","advanced":"pictures/matt-advanced-Wretched Shop.webp","realm":"Autohaven Wreckers"},"Badham Preschool I":{"simple":"pictures/Preschool1.webp","advanced":"pictures/matt-advanced-Preschool1.webp","realm":"Springwood / Badham"},"Badham Preschool II":{"simple":"pictures/Preschool2.webp","advanced":"pictures/matt-advanced-Preschool2.webp","realm":"Springwood / Badham"},"Badham Preschool III":{"simple":"pictures/Preschool3.webp","advanced":"pictures/matt-advanced-Preschool3.webp","realm":"Springwood / Badham"},"Badham Preschool IV":{"simple":"pictures/Preschool4.webp","advanced":"pictures/matt-advanced-Preschool4.webp","realm":"Springwood / Badham"},"Badham Preschool V":{"simple":"pictures/Preschool5.webp","advanced":"pictures/matt-advanced-Preschool5.webp","realm":"Springwood / Badham"},"Fractured Cowshed":{"simple":"pictures/Fractured Cowshed.webp","advanced":"pictures/matt-advanced-Fractured Cowshed.webp","realm":"Coldwind Farm"},"Rancid Abattoir":{"simple":"pictures/Rancid Abbatoir.webp","advanced":"pictures/matt-advanced-Rancid Abbatoir.webp","realm":"Coldwind Farm"},"Rotten Fields":{"simple":"pictures/Rotten Fields.webp","advanced":"pictures/matt-advanced-Rotten Fields.webp","realm":"Coldwind Farm"},"The Thompson House":{"simple":"pictures/The Thompson House.webp","advanced":"pictures/matt-advanced-The Thompson House.webp","realm":"Coldwind Farm"},"Torment Creek":{"simple":"pictures/Torment Creek.webp","advanced":"pictures/matt-advanced-Torment Creek.webp","realm":"Coldwind Farm"},"Disturbed Ward":{"simple":"pictures/Disturbed Ward.webp","advanced":"pictures/matt-advanced-Disturbed Ward.webp","realm":"Crotus Prenn Asylum"},"Father Campbell’s Chapel":{"simple":"pictures/Father Campbells Chapel.webp","advanced":"pictures/matt-advanced-Father Campbells Chapel.webp","realm":"Crotus Prenn Asylum"},"Coal Tower":{"simple":"pictures/Coal Tower.webp","advanced":"pictures/matt-advanced-Coal Tower.webp","realm":"MacMillan Estate"},"Coal Tower II":{"simple":"pictures/Coal Tower II.webp","advanced":"pictures/matt-advanced-Coal Tower II.webp","realm":"MacMillan Estate"},"Groaning Storehouse":{"simple":"pictures/Groaning Storehouse.webp","advanced":"pictures/matt-advanced-Groaning Storehouse.webp","realm":"MacMillan Estate"},"Groaning Storehouse II":{"simple":"pictures/Groaning Storehouse II.webp","advanced":"pictures/matt-advanced-Groaning Storehouse II.webp","realm":"MacMillan Estate"},"Ironworks of Misery":{"simple":"pictures/Ironworks Of Misery.webp","advanced":"pictures/matt-advanced-Ironworks Of Misery.webp","realm":"MacMillan Estate"},"Ironworks of Misery II":{"simple":"pictures/Ironworks Of Misery II.webp","advanced":"pictures/matt-advanced-Ironworks Of Misery II.webp","realm":"MacMillan Estate"},"Shelter Woods":{"simple":"pictures/Shelter Woods.webp","advanced":"pictures/matt-advanced-Shelter Woods.webp","realm":"MacMillan Estate"},"Shelter Woods II":{"simple":"pictures/Shelter Woods II.webp","advanced":"pictures/matt-advanced-Shelter Woods II.webp","realm":"MacMillan Estate"},"Suffocation Pit":{"simple":"pictures/Suffocation Pit.webp","advanced":"pictures/matt-advanced-Suffocation Pit.webp","realm":"MacMillan Estate"},"Suffocation Pit II":{"simple":"pictures/Suffocation Pit II.webp","advanced":"pictures/matt-advanced-Suffocation Pit II.webp","realm":"MacMillan Estate"},"Mother’s Dwelling":{"simple":"pictures/Mothers Dwelling.webp","advanced":"pictures/matt-advanced-Mothers Dwelling.webp","realm":"Red Forest"},"Temple of Purgation":{"simple":"pictures/Temple of Purgation.webp","advanced":"pictures/matt-advanced-Temple of Purgation.webp","realm":"Red Forest"},"Grim Pantry":{"simple":"pictures/Grim Pantry.webp","advanced":"pictures/matt-advanced-Grim Pantry.webp","realm":"Backwater Swamp"},"The Pale Rose":{"simple":"pictures/Pale Rose.webp","advanced":"pictures/matt-advanced-Pale Rose.webp","realm":"Backwater Swamp"},"Family Residence":{"simple":"pictures/Family Residence.webp","advanced":"pictures/matt-advanced-Family Residence.webp","realm":"Yamaoka Estate"},"Family Residence II":{"simple":"pictures/Family Residence II.webp","advanced":"pictures/matt-advanced-Family Residence II.webp","realm":"Yamaoka Estate"},"Sanctum of Wrath":{"simple":"pictures/Sanctum of Wrath.webp","advanced":"pictures/matt-advanced-Sanctum of Wrath.webp","realm":"Yamaoka Estate"},"Sanctum of Wrath II":{"simple":"pictures/Sanctum of Wrath II.webp","advanced":"pictures/matt-advanced-Sanctum of Wrath II.webp","realm":"Yamaoka Estate"},"Police Station East Wing":{"simple":"pictures/Rpd East Wing.webp","advanced":"pictures/matt-advanced-Rpd East Wing.webp","realm":"Raccoon City"},"Police Station West Wing":{"simple":"pictures/Rpd West Wing.webp","advanced":"pictures/matt-advanced-Rpd West Wing.webp","realm":"Raccoon City"},"Eyrie of Crows":{"simple":"pictures/Eyrie of Crows.webp","advanced":"pictures/matt-advanced-Eyrie of Crows.webp","realm":"Forsaken Boneyard"},"Dead Sands":{"simple":"pictures/Dead Sands.webp","advanced":"pictures/matt-advanced-Dead Sands.webp","realm":"Forsaken Boneyard"},"Dead Dawg Saloon":{"simple":"pictures/Dead Dawg Saloon.webp","advanced":"pictures/matt-advanced-Dead Dawg Saloon.webp","realm":"Grave of Glenvale"},"Garden of Joy":{"simple":"pictures/Garden of Joy.webp","advanced":"pictures/matt-advanced-Garden of Joy.webp","realm":"Withered Isle"},"Greenville Square":{"simple":"pictures/Greenville Square.webp","advanced":"pictures/matt-advanced-Greenville Square.webp","realm":"Withered Isle"},"Fallen Refuge":{"simple":"pictures/Fallen Refuge.webp","advanced":"pictures/matt-advanced-Fallen Refuge.webp","realm":"Withered Isle"},"Freddy Fazbear’s Pizza":{"simple":"pictures/Freddy Fazbears Pizza.webp","advanced":"pictures/matt-advanced-Freddy Fazbears Pizza.webp","realm":"Withered Isle"},"The Game":{"simple":"pictures/The Game.webp","advanced":"pictures/matt-advanced-The Game.webp","realm":"Gideon Meat Plant"},"Lampkin Lane":{"simple":"pictures/Haddonfield.webp","advanced":"pictures/matt-advanced-Haddonfield.webp","realm":"Haddonfield"},"Midwich Elementary School":{"simple":"pictures/Midwich.gif","advanced":"pictures/matt-advanced-Midwich.gif","realm":"Silent Hill"},"Mount Ormond Resort":{"simple":"pictures/Ormond.webp","advanced":"pictures/matt-advanced-Ormond.webp","realm":"Ormond"},"Mount Ormond Resort II":{"simple":"pictures/Ormond II.webp","advanced":"pictures/matt-advanced-Ormond II.webp","realm":"Ormond"},"Mount Ormond Resort III":{"simple":"pictures/Ormond III.webp","advanced":"pictures/matt-advanced-Ormond III.webp","realm":"Ormond"},"Ormond Lake Mine":{"simple":"pictures/Ormond Lake Mine.webp","advanced":"pictures/matt-advanced-Ormond Lake Mine.webp","realm":"Ormond"},"Shattered Square":{"simple":"pictures/Shattered Square.webp","advanced":"pictures/matt-advanced-Shattered Square.webp","realm":"The Decimated Borgo"},"Forgotten Ruins":{"simple":"pictures/Forgotten Ruins.webp","advanced":"pictures/matt-advanced-Forgotten Ruins.webp","realm":"The Decimated Borgo"},"Treatment Theatre":{"simple":"pictures/Lerys.webp","advanced":"pictures/matt-advanced-Lerys.webp","realm":"Léry’s Memorial Institute"},"Toba Landing":{"simple":"pictures/Toba Landing.webp","advanced":"pictures/matt-advanced-Toba Landing.webp","realm":"Dvarka Deepwood"},"Nostromo Wreckage":{"simple":"pictures/Nostromo Wreckage.webp","advanced":"pictures/matt-advanced-Nostromo Wreckage.webp","realm":"Dvarka Deepwood"},"The Underground Complex":{"simple":"pictures/Hawkins.webp","advanced":"pictures/matt-advanced-Hawkins.webp","realm":"Hawkins National Laboratory"},"Trickster’s Delusion":{"simple":"pictures/Tricksters Delusion.webp","advanced":"pictures/matt-advanced-Tricksters Delusion.webp","realm":"Sleepless District"}};
function calloutGuide(){return `<div class="dbd-callouts-v2">
<div class="dbd-callout-explain"><h3>Jak działa system zegarowy?</h3><p>Na planie mapy znajdziesz godziny od <strong>1 do 12</strong>. Wybierz krainę i mapę, aby szybko sprawdzić, gdzie znajduje się dany punkt. Możesz powiedzieć drużynie np. „Killer na 3, obok M”.</p><div class="dbd-callout-legend"><span><b>M</b> Main — główny budynek</span><span><b>S</b> Shack — chatka killera</span><span><b>1–12</b> kierunki na planie</span></div><p>Ustalcie przed meczem wspólną orientację mapy. Rzeczywisty układ niektórych elementów może się różnić między rozgrywkami.</p></div>
<div class="dbd-callout-mode"><div><strong>Tryb wyświetlania map</strong><small>Zaawansowany: nowa oprawa • Prosty: oryginalna grafika</small></div><label class="dbd-callout-switch"><span>Zaawansowana</span><input type="checkbox" id="dbd-callout-simple-toggle" role="switch" aria-label="Włącz wersję prostą map"/><i aria-hidden="true"></i><span>Prosta</span></label></div>
<label class="dbd-callout-label" for="dbd-callout-search">Szukaj krainy lub mapy</label><input id="dbd-callout-search" class="dbd-hatch-search" type="search" autocomplete="off" placeholder="Np. Raccoon, East Wing, Coldwind, Greenville…">
<div class="dbd-hatch-layout"><aside class="dbd-hatch-realms dbd-callout-realms" aria-label="Krainy"></aside><div class="dbd-hatch-main"><div class="dbd-hatch-map-tabs dbd-callout-map-tabs" aria-label="Mapy w krainie"></div><div class="dbd-callout-current" aria-live="polite"></div></div></div>
<p class="dbd-hatch-source">Źródło atlasu: <a href="https://hens333.com/callouts" target="_blank" rel="noopener noreferrer">Hens’ Callouts</a> — ilustracje Lethii. Wersja prosta zawiera przesłane mapy; wersja zaawansowana wykorzystuje te same plany w nowej oprawie. Zachowano oryginalne oznaczenia i animację Midwich.</p></div>`}
function initCalloutGuide(root){
 const tool=root.querySelector('.dbd-callouts-v2');if(!tool||tool.dataset.ready)return;tool.dataset.ready='1';
 const realmEl=tool.querySelector('.dbd-callout-realms'),tabs=tool.querySelector('.dbd-callout-map-tabs'),current=tool.querySelector('.dbd-callout-current'),search=tool.querySelector('#dbd-callout-search'),modeToggle=tool.querySelector('#dbd-callout-simple-toggle');
 let realm='Raccoon City',map='Police Station East Wing';
 const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
 function draw(){
  const q=search.value.trim().toLocaleLowerCase();
  const filtered=Object.entries(calloutRealms).map(([name,names])=>({name,maps:names.filter(n=>!q||(name+' '+n).toLocaleLowerCase().includes(q))})).filter(r=>r.maps.length);
  if(!filtered.length){realmEl.innerHTML='';tabs.innerHTML='';current.textContent='Nie znaleziono mapy.';return}
  const chosen=filtered.find(r=>r.name===realm)||filtered[0];realm=chosen.name;if(!chosen.maps.includes(map))map=chosen.maps[0];
  realmEl.innerHTML=filtered.map(r=>`<button type="button" data-realm="${esc(r.name)}" class="${r.name===realm?'active':''}">${esc(r.name)} <small>${r.maps.length}</small></button>`).join('');
  tabs.innerHTML=chosen.maps.map(n=>`<button type="button" data-map="${esc(n)}" class="${n===map?'active':''}">${esc(n)}</button>`).join('');
  const asset=calloutLocalImages[map];
  const image=asset&&(modeToggle.checked?asset.simple:asset.advanced);
  current.innerHTML=`<div class="dbd-hatch-result-heading"><span>${esc(realm)}</span><h3>${esc(map)}</h3></div>${image?`<button type="button" class="dbd-callout-image-button" aria-label="Powiększ plan ${esc(map)}"><img src="${image}" alt="Plan ${esc(map)} z oznaczeniami godzin i Main" loading="lazy"><span><i>↗</i> Powiększ mapę</span></button>`:`<div class="dbd-callout-pending"><strong>Grafika tej mapy nie jest jeszcze dostępna w poradniku.</strong><p>Wybór mapy działa, ale aby pokazać jej plan bez osadzania całej witryny, potrzebujemy pliku ilustracji.</p><a href="https://hens333.com/callouts" target="_blank" rel="noopener noreferrer">Zobacz oryginalny plan w atlasie Hensa ↗</a></div>`}`;
  const btn=current.querySelector('.dbd-callout-image-button');if(btn)btn.addEventListener('click',()=>openPreview(image,map));
 }
 function openPreview(src,name){
  const overlay=document.createElement('div');overlay.className='dbd-callout-lightbox';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Podgląd mapy '+name);
  overlay.innerHTML=`<button type="button" class="dbd-callout-close" aria-label="Zamknij podgląd">×</button><img src="${src}" alt="${esc(name)}">`;
  const close=()=>{overlay.remove();document.removeEventListener('keydown',onKey)};
  const onKey=e=>{if(e.key==='Escape')close()};document.addEventListener('keydown',onKey);
  overlay.addEventListener('click',e=>{if(e.target===overlay||e.target.closest('.dbd-callout-close'))close()});document.body.append(overlay);overlay.querySelector('button').focus();
 }
 realmEl.addEventListener('click',e=>{const b=e.target.closest('[data-realm]');if(!b)return;realm=b.dataset.realm;map='';draw()});
 tabs.addEventListener('click',e=>{const b=e.target.closest('[data-map]');if(!b)return;map=b.dataset.map;draw()});
 search.addEventListener('input',()=>{realm='';map='';draw()});
 modeToggle.addEventListener('change',draw);draw();
}

function render(el){if(!el)return;
el.innerHTML=`<div class="container dbd-guide"><header class="dbd-hero"><span>PORADNIKI / DEAD BY DAYLIGHT</span><h1>Wszytskie informacje z Dead by Daylight</h1><p>Buildy, perki, sekrety map, punkty krwi i komunikacja zegarowa. Przewodnik społeczności MATT'S WORLD.</p></header>
<nav class="dbd-toc" aria-label="Spis treści"><a href="#dbd-addons">BUILDY</a><a href="#dbd-perks">PERKI</a><a href="#dbd-reshade">RESHade</a><a href="#dbd-nightlight">NIGHTLIGHT</a><a href="#dbd-bp">BP I RESET</a><a href="#dbd-hatch">HATCH</a><a href="#dbd-trivia">CIEKAWOSTKI</a><a href="#dbd-clock">SYSTEM ZEGAROWY</a><a href="#dbd-queue">DBDQUEUE</a></nav>
${card('01 / Polecane add-ony i buildy',`<p>Sprawdź aktualne zestawy i dodatki dla killerów i survivorów przygotowane przez Otzdarvę. Opisy i efekty add-onów zmieniają się z aktualizacjami gry, dlatego kierujemy do aktualizowanego źródła.</p>${external('https://otzdarva.com/','OTZDARVA — BUILDS & ADD-ONS')}`,'dbd-addons')}
${card('02 / Jakie perki polecamy?',`<div class="dbd-sub"><div class="dbd-section-label">01 / DLA POCZĄTKUJĄCYCH</div><h3>Startowy zestaw perków</h3><p>Na początek polecamy cztery perki, które pomogą Ci zrozumieć umiejscowienie generatorów, ratowanie drużyny i bezpieczną grę. <b>Decisive Strike</b> jest obecnie dostępny jako perk ogólny (wcześniej należał do Laurie Strode).</p>${build('starter','Zestaw startowy','Zestaw dla początkujących: orientacja na mapie, ratowanie drużyny, szybkie leczenie i ochrona przed tunelowaniem.')}<h4 class="dbd-mini-heading">Alternatywne polecane perki</h4>${extraPerks(['wereGonnaLiveForever','unbreakable','borrowedTime','deadHard','adrenaline'])}<p class="dbd-note"><b>Dead Hard</b> warto wybrać dopiero wtedy, gdy nauczysz się odpowiednio wyczuwać ataki killera.</p></div>
<div class="dbd-sub"><div class="dbd-section-label">02 / ROZBUDOWA KONTA</div><h3>Jakie postacie kupić pod perki?</h3><p><b>Na sam start</b> polecamy trzy postacie: Feng Min, Larę Croft i Kate Denson. Następnie możesz rozważyć Kwon Tae-younga, Jill Valentine i Jeffa Johansena.</p><h4 class="dbd-mini-heading">Kup na początek</h4><div class="dbd-character-grid">${character('Feng Min','dbd-character-feng.png','Lithe · Alert')}${character('Lara Croft','dbd-character-lara.png','Finesse')}${character('Kate Denson','dbd-character-kate.png','Windows of Opportunity')}</div><h4 class="dbd-mini-heading">W dalszej kolejności</h4><div class="dbd-character-grid">${character('Kwon Tae-young','dbd-character-kwon.png','Five Moves Ahead')}${character('Jill Valentine','dbd-character-jill.png','Resurgence')}${character('Jeff Johansen','dbd-character-jeff.png','Distortion')}</div>${build('premium','Zestaw startowy premium','Mobilność, orientacja podczas pościgu i lepsza kontrola sytuacji.')}<h4 class="dbd-mini-heading">Alternatywne perki z kolejnych postaci</h4>${extraPerks(['fiveMovesAhead','resurgence','distortion'])}</div>
<div class="dbd-sub"><div class="dbd-section-label">03 / CO DALEJ?</div><h3>Znajdź swój własny build</h3><p>To propozycje przede wszystkim dla nowych graczy. Warto testować również inne perki i dobrać zestaw do własnego stylu gry. Gdy opanujesz podstawy, sięgnij po bardziej zaawansowane kombinacje — celowo nie opisujemy ich wszystkich na początku.</p>${external('https://www.dbdbuilds.com/tiers','ZOBACZ TIER LISTĘ PERKÓW')}</div>
<div class="dbd-sub"><div class="dbd-section-label">04 / KILLER</div><h3>Uniwersalne perki dla killera</h3>${build('killer','Zestaw uniwersalny killera','')}<p class="dbd-note">Są to perki uniwersalne, a nie zestaw przygotowany pod konkretnego killera. Nie zawsze będą najlepszym wyborem, ale warto je odblokować i wypróbować, szczególnie na początku.</p></div>`,'dbd-perks')}
${card('03 / ReShade',`<p>Instrukcja instalacji i konfiguracji — <b>w przygotowaniu</b>. Dostępne już pliki konfiguracyjne możesz znaleźć w sekcji „Do pobrania”.</p><a class="dbd-button" href="#/viewer/downloads">DO POBRANIA →</a>`,'dbd-reshade')}
${card('04 / NightLight',`<p>Instrukcja obsługi NightLight — <b>w przygotowaniu</b>. Dodamy tu konfigurację, statystyki i przykłady zastosowania.</p>`,'dbd-nightlight')}
${card('Reset wbitej rangi killera i surva',`<div class="dbd-bp-img"><img src="pictures/dbd-bp-ranks.webp" loading="lazy" alt="Tabela nagród BP za rangi: I–IV, od Iridescent do Ash"></div><p class="dbd-note">Reset rangi następuje <b>13. dnia każdego miesiąca</b>. Nagrody za osiągniętą rangę są przyznawane oddzielnie dla survivora i killera.</p>`,'dbd-bp')}
${card('Gdzie znaleźć Hatch na mapie?',hatchGuide(),'dbd-hatch')}
${card('07 / Ciekawostki',`<div class="dbd-sub"><h3>Nostromo — Keycard (Karta dostępu)</h3><p>Znajdź ciało astronauty i podnieś kartę. Następnie użyj jej przy terminalu obok Mess Hall. Sekwencja hackowania to <b>lewo → dół → góra → prawo</b>. Otworzysz tajne pomieszczenie ze skrzynią.</p>${external('https://deadbydaylight.wiki.gg/wiki/Keycard','SZCZEGÓŁY')}</div><div class="dbd-sub"><h3>Midwich — sekretna komnata w wieży</h3><p>Napraw generator w <b>laboratorium chemicznym</b>, a potem generator w <b>sali muzycznej</b>. Gdy rozpocznie się <b>Endgame Collapse</b>, drzwi pod wieżą zegarową otworzą ukryte pomieszczenie ze skrzynią.</p>${external('https://deadbydaylight.wiki.gg/wiki/Midwich_Elementary_School','SZCZEGÓŁY')}</div><div class="dbd-sub"><h3>Yamaoka — ukryty pingwin</h3><p>W społeczności DBD krąży ciekawostka o małym pingwinie na mapie Yamaoka. Lokalizacja i wygląd wymagają jeszcze potwierdzonego materiału; nie dodajemy niezweryfikowanego zdjęcia.</p></div>`,'dbd-trivia')}
${card('System zegarowy — mapy i callouty',calloutGuide(),'dbd-clock')}
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
initHatchGuide(guideRoot);
initCalloutGuide(guideRoot);
// Umożliwiamy otwarcie konkretnej sekcji z odnośnika wewnętrznego.
const requested=window.location.hash.match(/dbd-(?:addons|perks|reshade|nightlight|bp|hatch|clock|trivia|queue)/)?.[0];
if(requested){const found=categories.find(category=>category.sections.includes(requested));if(found)showCategory(found.id)}

}
window.MattDBDGuide={render};
})();
