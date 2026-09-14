/* Tutto quello che il sito fa girare nel browser. Nessuna dipendenza. */
(function () {
  'use strict';
  var CHIAVE = 'giappone2026:';
  var PARTENZA = new Date(2026, 9, 28);
  var RIENTRO = new Date(2026, 10, 13);
  var box = (function () { try { var k = CHIAVE + 'prova'; window.localStorage.setItem(k, '1'); window.localStorage.removeItem(k); return window.localStorage; } catch (e) { return null; } })();

  function voliConfermati() {
    var sezione = document.getElementById('voli'); if (!sezione) return;
    var testo = sezione.querySelector('.shead p'); if (testo) testo.textContent = 'Sei tratte aeree. Andata e ritorno internazionali con Emirates, più i due voli interni Fukuoka → Okinawa e Okinawa → Tokyo già prenotati.';
    var idx = sezione.querySelector('.idx'); if (idx) idx.textContent = '02';
    var c = sezione.querySelector('.flights'); if (!c) return;
    c.innerHTML = '<article class="flight reveal"><div class="flight-top"><span>Mer 28 ott 2026</span><span>Emirates · EK0102</span></div><div class="flight-mid"><span class="code">MXP <span class="mono">10:25</span></span><span class="span"></span><span class="code"><span class="mono">19:20</span> DXB</span></div><div class="flight-bot"><span>Milano Malpensa <b>→</b> Dubai</span><span>5h 55m · Terminal 1 → 3</span></div></article><div class="flight-connection reveal"><b>Coincidenza a Dubai</b><span>3h 25m · 19:20 → 22:45</span></div><article class="flight reveal"><div class="flight-top"><span>Mer 28 ott 2026 → Gio 29 ott</span><span>Emirates · EK0320</span></div><div class="flight-mid"><span class="code">DXB <span class="mono">22:45</span></span><span class="span"></span><span class="code"><span class="mono">13:10</span> NRT</span></div><div class="flight-bot"><span>Dubai <b>→</b> Tokyo Narita</span><span>9h 25m · arrivo il 29 ott · Terminal 3 → 2</span></div></article><article class="flight reveal"><div class="flight-top"><span>Dom 8 nov 2026</span><span>ANA · NH2501</span></div><div class="flight-mid"><span class="code">FUK <span class="mono">13:00</span></span><span class="span"></span><span class="code"><span class="mono">14:55</span> OKA</span></div><div class="flight-bot"><span>Fukuoka <b>→</b> Okinawa (Naha)</span><span>1h 55m · Terminal di partenza D</span></div></article><article class="flight reveal"><div class="flight-top"><span>Gio 12 nov 2026</span><span>Jetstar Japan · GK338</span></div><div class="flight-mid"><span class="code">OKA <span class="mono">07:30</span></span><span class="span"></span><span class="code"><span class="mono">09:55</span> NRT</span></div><div class="flight-bot"><span>Okinawa (Naha) <b>→</b> Tokyo Narita</span><span>2h 25m · Economy · Airbus A320 · Domestic Terminal → Narita</span></div></article><div class="flight-connection reveal"><b>Coincidenza a Dubai</b><span>4h 25m · 04:40 → 09:05</span></div><article class="flight reveal"><div class="flight-top"><span>Gio 12 nov 2026 → Ven 13 nov</span><span>Emirates · EK0321</span></div><div class="flight-mid"><span class="code">NRT <span class="mono">21:30</span></span><span class="span"></span><span class="code"><span class="mono">04:40</span> DXB</span></div><div class="flight-bot"><span>Tokyo Narita <b>→</b> Dubai</span><span>12h 10m · arrivo il 13 nov · Terminal 2 → 3</span></div></article><article class="flight reveal"><div class="flight-top"><span>Ven 13 nov 2026</span><span>Emirates · EK0205</span></div><div class="flight-mid"><span class="code">DXB <span class="mono">09:05</span></span><span class="span"></span><span class="code"><span class="mono">13:10</span> MXP</span></div><div class="flight-bot"><span>Dubai <b>→</b> Milano Malpensa</span><span>7h 05m · Terminal 3 → 1</span></div></article>';
    var nota = sezione.querySelector('.note.warn'); if (nota) nota.innerHTML = '<b>Voli completati.</b> Andata: MXP → Dubai → NRT il 28/29 ottobre. Il 8 novembre FUK → OKA con ANA (NH2501). Il 12 novembre OKA → NRT con Jetstar Japan (GK338), poi NRT → Dubai → MXP.';
  }

  function cambioEuroYen() {
    var voli = document.getElementById('voli'); if (!voli || document.getElementById('eur-yen')) return;
    var sezione = document.createElement('section'); sezione.id = 'eur-yen';
    sezione.innerHTML = '<div class="shead"><span class="idx">01</span><div><h2>EUR-YEN</h2><p>Convertitore rapido JPY → EUR con cambio aggiornato dal web.</p></div></div><div class="card reveal"><div style="display:flex;flex-wrap:wrap;gap:14px;align-items:end"><label style="display:flex;flex-direction:column;gap:7px;flex:1;min-width:220px"><span><b>Quantità in Yen</b></span><input id="yen-amount" type="number" inputmode="decimal" min="0" step="1" value="10000" style="font:inherit;padding:12px 14px;border-radius:10px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:inherit"></label><div style="flex:1;min-width:220px"><div style="font-size:.82rem;opacity:.7;margin-bottom:7px">Valore in Euro</div><div id="yen-result" style="font-size:1.6rem;font-weight:800">—</div></div></div><p id="yen-rate" class="note tip" style="margin-top:14px">Aggiornamento cambio in corso…</p></div>';
    voli.parentNode.insertBefore(sezione, voli);
    var input = sezione.querySelector('#yen-amount'), result = sezione.querySelector('#yen-result'), rate = sezione.querySelector('#yen-rate');
    function render(eurPerJpy, label) { var yen = parseFloat(input.value) || 0; result.textContent = new Intl.NumberFormat('it-IT', {style:'currency', currency:'EUR'}).format(yen * eurPerJpy); rate.textContent = label; }
    function fallback() { window.__eurPerJpy = 1 / 178.335; window.__eurLabel = 'Cambio di riferimento: 1 EUR ≈ 178,34 JPY. Il dato viene aggiornato dal web quando disponibile.'; render(window.__eurPerJpy, window.__eurLabel); }
    input.addEventListener('input', function () { if (window.__eurPerJpy) render(window.__eurPerJpy, window.__eurLabel || ''); });
    fetch('https://api.frankfurter.app/latest?from=EUR&to=JPY', {cache:'no-store'}).then(function (r) { if (!r.ok) throw new Error('Cambio non disponibile'); return r.json(); }).then(function (data) { var jpy = Number(data && data.rates && data.rates.JPY); if (!jpy) throw new Error('Cambio non valido'); window.__eurPerJpy = 1 / jpy; window.__eurLabel = 'Cambio aggiornato: 1 EUR = ' + jpy.toFixed(2) + ' JPY · fonte ECB tramite Frankfurter · ' + (data.date || 'ultimo dato disponibile'); render(window.__eurPerJpy, window.__eurLabel); }).catch(function () { fallback(); });
  }

  function documentiViaggio() {
    var voli = document.getElementById('voli'); if (!voli || document.getElementById('documenti-viaggio')) return;
    var sezione = document.createElement('section'); sezione.id = 'documenti-viaggio';
    sezione.innerHTML = '<div class="shead"><span class="idx">03</span><div><h2>Documenti di viaggio</h2><p>Documenti organizzati per viaggiatore.</p></div></div><div class="grid"><details class="card reveal" open><summary style="cursor:pointer;font-size:1.1rem;font-weight:700">📁 Anna</summary><div style="margin-top:14px"><p><b>Cartella documenti personali</b></p><p>Aggiungeremo qui passaporto, assicurazione, prenotazioni e altri documenti di Anna.</p><p class="note tip" style="margin-top:12px">Nessun documento caricato per il momento.</p></div></details><details class="card reveal" open><summary style="cursor:pointer;font-size:1.1rem;font-weight:700">📁 Stefano</summary><div style="margin-top:14px"><p><b>Cartella documenti personali</b></p><p>Aggiungeremo qui passaporto, assicurazione, prenotazioni e altri documenti di Stefano.</p><p class="note tip" style="margin-top:12px"><a href="https://www.vjw.digital.go.jp/main/#/vjwpic026" target="_blank" rel="noopener noreferrer"><b>QR Immigrazione</b></a></p></div></details></div>';
    voli.insertAdjacentElement('afterend', sezione);
    var itinerario = document.getElementById('itinerario'); if (itinerario) { var idx = itinerario.querySelector('.idx'); if (idx) idx.textContent = '04'; }
    var sp = document.getElementById('spostamenti'); if (sp) { var i = sp.querySelector('.idx'); if (i) i.textContent = '05'; }
    var pr = document.getElementById('pratico'); if (pr) { var j = pr.querySelector('.idx'); if (j) j.textContent = '06'; }
    var ab = document.getElementById('abbigliamento'); if (ab) { var k = ab.querySelector('.idx'); if (k) k.textContent = '07'; }
    var lu = document.getElementById('luce'); if (lu) { var l = lu.querySelector('.idx'); if (l) l.textContent = '08'; }
    var ch = document.getElementById('checklist'); if (ch) { var m = ch.querySelector('.idx'); if (m) m.textContent = '09'; }
    var ap = document.getElementById('appunti'); if (ap) { var n = ap.querySelector('.idx'); if (n) n.textContent = '10'; }
  }

  function linkPrenotazioni() {
    var giorni = document.querySelectorAll('#itinerario .day');
    for (var i = 0; i < giorni.length; i++) {
      var n = giorni[i].querySelector('.dnum'); if (!n) continue;
      if (n.textContent.trim() === '29') {
        var items = giorni[i].querySelectorAll('li');
        for (var j = 0; j < items.length; j++) {
          if (items[j].textContent.indexOf('1-chōme-16-2 Kotoburi') !== -1 || items[j].textContent.indexOf('1-chōme-16-2 Kotoburi') !== -1) continue;
          if (items[j].textContent.indexOf('1-chōme-16-2 Kotoburi') === -1 && items[j].textContent.indexOf('1-chōme-16-2 Kotoburi') === -1 && items[j].textContent.indexOf('1-chōme-16-2 Kotoburi') === -1 && items[j].textContent.indexOf('1-chōme-16-2 Kotoburi') === -1) {
            if (items[j].textContent.indexOf('1-chōme-16-2 Kotoburi') !== -1) continue;
          }
        }
        var body = giorni[i].querySelector('.day-body');
        if (body) {
          var walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
          var nodes = [], node;
          while ((node = walker.nextNode())) nodes.push(node);
          for (var q = 0; q < nodes.length; q++) {
            if (nodes[q].nodeValue.indexOf('1-chōme-16-2 Kotoburi') !== -1) {
              nodes[q].nodeValue = nodes[q].nodeValue.replace('1-chōme-16-2 Kotoburi', '1-chōme-16-2 Kotoburi');
            }
          }
          var address = '1-chōme-16-2 Kotoburi';
          var address2 = '1-chōme-16-2 Kotoburi';
          var html = body.innerHTML;
          var target = '1-chōme-16-2 Kotoburi';
          if (html.indexOf(target) !== -1) body.innerHTML = html.replace(target, '<a href="https://www.google.com/maps/search/?api=1&query=1-ch%C5%8Dme-16-2%20Kotoburi%2C%20Taito%20City%2C%20Tokyo%20111-0042%2C%20Japan" target="_blank" rel="noopener noreferrer"><b>' + target + '</b></a>');
          else {
            target = '1-chōme-16-2 Kotoburi, Taito City, Tokyo 111-0042';
            if (html.indexOf(target) !== -1) body.innerHTML = html.replace(target, '<a href="https://www.google.com/maps/search/?api=1&query=1-ch%C5%8Dme-16-2%20Kotoburi%2C%20Taito%20City%2C%20Tokyo%20111-0042%2C%20Japan" target="_blank" rel="noopener noreferrer"><b>' + target + '</b></a>');
          }
        }
      }
      if (n.textContent.trim() === '31') {
        var note = giorni[i].querySelector('.note.tip');
        if (note && note.textContent.indexOf('Prenotazione teamLab Planets') !== -1 && !note.querySelector('a')) {
          note.innerHTML += ' <a href="https://teamlabplanets.dmm.com/en/mytickets/6af646a93e2024f3e2" target="_blank" rel="noopener noreferrer"><b>Biglietti teamLab</b></a>';
        }
      }
    }
  }

  function aggiornaOkinawaSenzaAuto() {
    var giorni = document.querySelectorAll('#itinerario .day');
    for (var i = 0; i < giorni.length; i++) {
      var n = giorni[i].querySelector('.dnum'); if (!n) continue;
      var giorno = n.textContent.trim();
      if (giorno === '09' || giorno === '10') { var note = giorni[i].querySelectorAll('.note.warn'); for (var j = 0; j < note.length; j++) note[j].remove(); }
    }
    var pratico = document.getElementById('pratico'); if (pratico) { var items = pratico.querySelectorAll('li'); for (var k = 0; k < items.length; k++) if (items[k].textContent.indexOf('Auto Okinawa') !== -1) items[k].remove(); }
    var check = document.getElementById('checklist'); if (check) { var checks = check.querySelectorAll('li'); for (var q = 0; q < checks.length; q++) if (checks[q].textContent.indexOf('Auto Okinawa') !== -1) checks[q].remove(); }
  }

  function contatore() { var el=document.getElementById('counter'); if(!el)return; var oggi=new Date(); oggi=new Date(oggi.getFullYear(),oggi.getMonth(),oggi.getDate()); var g=86400000, alVia=Math.round((PARTENZA-oggi)/g), alRientro=Math.round((RIENTRO-oggi)/g); if(alVia>0) el.innerHTML='Mancano <b>'+alVia+'</b> giorn'+(alVia===1?'o':'i')+' alla partenza'; else if(alRientro>=0){var n=Math.round((oggi-PARTENZA)/g)+1;el.innerHTML='Giorno <b>'+n+'</b> di 17 &middot; in viaggio';}else el.textContent='Viaggio concluso'; }
  function comparsa() { var v=document.querySelectorAll('.reveal'), r=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches; if(!v.length)return; if(r||!('IntersectionObserver'in window)){for(var i=0;i<v.length;i++)v[i].classList.add('in');return;} var o=new IntersectionObserver(function(rs){rs.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');o.unobserve(x.target);}});},{rootMargin:'0px 0px -8% 0px',threshold:.05}); for(var j=0;j<v.length;j++)o.observe(v[j]); }
  function checklist() { var cs=document.querySelectorAll('.check input[data-k]'); for(var i=0;i<cs.length;i++)(function(c){var k=CHIAVE+'check:'+c.dataset.k;if(!box)return;if(box.getItem(k)==='1')c.checked=true;c.addEventListener('change',function(){if(c.checked)box.setItem(k,'1');else box.removeItem(k);});})(cs[i]); }
  function appunti() { var as=document.querySelectorAll('textarea[data-nota]'); for(var i=0;i<as.length;i++)(function(a){var id=a.dataset.nota,k=CHIAVE+'nota:'+id,s=document.querySelector('[data-nota-stato="'+id+'"]'),c=document.querySelector('[data-nota-cancella="'+id+'"]');if(!box){a.disabled=true;return;}var v=box.getItem(k);if(v)a.value=v;var t;a.addEventListener('input',function(){clearTimeout(t);t=setTimeout(function(){if(a.value)box.setItem(k,a.value);else box.removeItem(k);if(s)s.textContent='Salvato su questo dispositivo';},400);});if(c)c.addEventListener('click',function(){a.value='';box.removeItem(k);if(s)s.textContent='Cancellato';});})(as[i]); }

  cambioEuroYen(); voliConfermati(); documentiViaggio(); linkPrenotazioni(); aggiornaOkinawaSenzaAuto(); contatore(); comparsa(); checklist(); appunti();
})();
