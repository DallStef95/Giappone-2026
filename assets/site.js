/* Tutto quello che il sito fa girare nel browser. Nessuna dipendenza. */
(function () {
  'use strict';

  var CHIAVE = 'giappone2026:';
  var PARTENZA = new Date(2026, 9, 28);  // 28 ottobre 2026, mese 0-based
  var RIENTRO = new Date(2026, 10, 13);  // 13 novembre 2026

  /* localStorage puo' lanciare in navigazione privata o con i cookie di terze
     parti bloccati. Lo si prova una volta sola: se non c'e', le funzioni che
     ne dipendono si spengono invece di rompere la pagina. */
  var box = (function () {
    try {
      var k = CHIAVE + 'prova';
      window.localStorage.setItem(k, '1');
      window.localStorage.removeItem(k);
      return window.localStorage;
    } catch (e) {
      return null;
    }
  })();

  /* ---------- voli confermati ---------- */
  function voliConfermati() {
    var sezione = document.getElementById('voli');
    if (!sezione) { return; }

    var testo = sezione.querySelector('.shead p');
    if (testo) {
      testo.textContent = 'Sei tratte aeree. Andata e ritorno internazionali con Emirates, più i due voli interni Fukuoka → Okinawa e Okinawa → Tokyo già prenotati.';
    }

    var contenitore = sezione.querySelector('.flights');
    if (!contenitore) { return; }

    contenitore.innerHTML = '' +
      '<article class="flight reveal">' +
        '<div class="flight-top"><span>Mer 28 ott 2026</span><span>Emirates · EK0102</span></div>' +
        '<div class="flight-mid">' +
          '<span class="code">MXP <span class="mono">10:25</span></span>' +
          '<span class="span"></span>' +
          '<span class="code"><span class="mono">19:20</span> DXB</span>' +
        '</div>' +
        '<div class="flight-bot"><span>Milano Malpensa <b>→</b> Dubai</span><span>5h 55m · Terminal 1 → 3</span></div>' +
      '</article>' +

      '<div class="flight-connection reveal"><b>Coincidenza a Dubai</b><span>3h 25m · 19:20 → 22:45</span></div>' +

      '<article class="flight reveal">' +
        '<div class="flight-top"><span>Mer 28 ott 2026 → Gio 29 ott</span><span>Emirates · EK0320</span></div>' +
        '<div class="flight-mid">' +
          '<span class="code">DXB <span class="mono">22:45</span></span>' +
          '<span class="span"></span>' +
          '<span class="code"><span class="mono">13:10</span> NRT</span>' +
        '</div>' +
        '<div class="flight-bot"><span>Dubai <b>→</b> Tokyo Narita</span><span>9h 25m · arrivo il 29 ott · Terminal 3 → 2</span></div>' +
      '</article>' +

      '<article class="flight reveal">' +
        '<div class="flight-top"><span>Dom 8 nov 2026</span><span>ANA · NH2501</span></div>' +
        '<div class="flight-mid">' +
          '<span class="code">FUK <span class="mono">13:00</span></span>' +
          '<span class="span"></span>' +
          '<span class="code"><span class="mono">14:55</span> OKA</span>' +
        '</div>' +
        '<div class="flight-bot"><span>Fukuoka <b>→</b> Okinawa (Naha)</span><span>1h 55m · Terminal di partenza D</span></div>' +
      '</article>' +

      '<article class="flight reveal">' +
        '<div class="flight-top"><span>Gio 12 nov 2026</span><span>Jetstar Japan · GK338</span></div>' +
        '<div class="flight-mid">' +
          '<span class="code">OKA <span class="mono">07:30</span></span>' +
          '<span class="span"></span>' +
          '<span class="code"><span class="mono">09:55</span> NRT</span>' +
        '</div>' +
        '<div class="flight-bot"><span>Okinawa (Naha) <b>→</b> Tokyo Narita</span><span>2h 25m · Economy · Airbus A320 · Domestic Terminal → Narita</span></div>' +
      '</article>' +

      '<div class="flight-connection reveal"><b>Coincidenza a Dubai</b><span>4h 25m · 04:40 → 09:05</span></div>' +

      '<article class="flight reveal">' +
        '<div class="flight-top"><span>Gio 12 nov 2026 → Ven 13 nov</span><span>Emirates · EK0321</span></div>' +
        '<div class="flight-mid">' +
          '<span class="code">NRT <span class="mono">21:30</span></span>' +
          '<span class="span"></span>' +
          '<span class="code"><span class="mono">04:40</span> DXB</span>' +
        '</div>' +
        '<div class="flight-bot"><span>Tokyo Narita <b>→</b> Dubai</span><span>12h 10m · arrivo il 13 nov · Terminal 2 → 3</span></div>' +
      '</article>' +

      '<article class="flight reveal">' +
        '<div class="flight-top"><span>Ven 13 nov 2026</span><span>Emirates · EK0205</span></div>' +
        '<div class="flight-mid">' +
          '<span class="code">DXB <span class="mono">09:05</span></span>' +
          '<span class="span"></span>' +
          '<span class="code"><span class="mono">13:10</span> MXP</span>' +
        '</div>' +
        '<div class="flight-bot"><span>Dubai <b>→</b> Milano Malpensa</span><span>7h 05m · Terminal 3 → 1</span></div>' +
      '</article>';

    var nota = sezione.querySelector('.note.warn');
    if (nota) {
      nota.innerHTML = '<b>Voli completati.</b> Andata: MXP → Dubai → NRT il 28/29 ottobre. Il 8 novembre FUK → OKA con ANA (NH2501). Il 12 novembre OKA → NRT con Jetstar Japan (GK338), poi NRT → Dubai → MXP. Le coincidenze a Dubai sono di 3h25 all\'andata e 4h25 al ritorno.';
    }

    var nota2 = sezione.querySelectorAll('.note')[1];
    if (nota2) {
      nota2.innerHTML = '<b>Nota:</b> per i voli interni sono riportati i dati delle prenotazioni fornite. Per il GK338: partenza da Naha Airport Domestic Terminal alle 07:30 e arrivo a Narita alle 09:55. Verifica sempre eventuali aggiornamenti di orario direttamente con la compagnia.';
    }
  }

  /* ---------- compleanno Anna · 29 ottobre ---------- */
  function compleannoAnna() {
    var giorno = document.querySelector('#itinerario .day:not(.air) .dnum');
    if (!giorno || giorno.textContent.trim() !== '29') { return; }
    var body = giorno.closest('.day-body');
    if (!body || body.querySelector('.birthday-plan')) { return; }

    var blocco = document.createElement('div');
    blocco.className = 'note tip birthday-plan';
    blocco.innerHTML = '<b>🎂 Compleanno di Anna · programma consigliato</b>' +
      '<ul>' +
        '<li><b>15:00–15:45 · Check-in Airbnb:</b> 1-chōme-16-2 Kotobuki, Taito City, Tokyo 111-0042. Prenotazione Airbnb · codice <b>HM9W9X2JWM</b>. Dopo il volo, niente programma impegnativo: lasciate i bagagli e prendetevi un po\' di tempo per rinfrescarvi.</li>' +
        '<li><b>16:00–16:40 · Prima passeggiata ad Asakusa:</b> Kaminarimon → Nakamise-dōri → Sensō-ji. È perfetta per iniziare il viaggio senza allontanarsi dall\'alloggio.</li>' +
        '<li><b>16:40–17:15 · Tramonto sul Sumida:</b> passeggiata verso il fiume e vista sul Tokyo Skytree. Il 29 ottobre il sole tramonta intorno alle 16:49, quindi conviene essere sul fiume prima del tramonto.</li>' +
        '<li><b>17:15–18:15 · Pausa e brindisi:</b> rientro verso Asakusa, drink o aperitivo in zona. Meglio mantenere il ritmo rilassato dopo il viaggio.</li>' +
        '<li><b>18:30–20:30 · Cena di sushi 🎌🍣:</b> per il compleanno punterei su un <b>omakase</b> ad Asakusa, così la cena diventa l\'esperienza speciale della giornata. Tra le opzioni da valutare: <b>Sushi Kanesho</b> (Michelin, atmosfera intima, circa 9 posti) oppure <b>Sushi Oku</b> (omakase di alto livello, anch\'esso molto raccolto). Entrambi richiedono prenotazione anticipata.</li>' +
        '<li><b>20:30–21:30 · Dopo cena:</b> passeggiata serale tra Asakusa e il Sumida, con le luci del Sensō-ji e dello Skytree. Se avete ancora energie, brindisi finale.</li>' +
      '</ul>' +
      '<p><b>La mia scelta:</b> farei il 29 molto locale e romantico, senza correre per Tokyo: Asakusa + tramonto sul Sumida + <b>omakase di sushi</b>. È un modo molto più bello di festeggiare il compleanno rispetto a spostarsi dall\'altra parte della città appena arrivati.</p>' +
      '<p><b>Nota prenotazione:</b> per una cena di compleanno consiglio di scrivere alla prenotazione che è il compleanno di Anna e chiedere se possono preparare una piccola sorpresa/dessert. La disponibilità per il 29/10/2026 va verificata al momento della prenotazione.</p>';

    body.appendChild(blocco);
  }

  /* ---------- contatore ---------- */
  function contatore() {
    var el = document.getElementById('counter');
    if (!el) { return; }

    var oggi = new Date();
    oggi = new Date(oggi.getFullYear(), oggi.getMonth(), oggi.getDate());
    var giorno = 86400000;
    var alVia = Math.round((PARTENZA - oggi) / giorno);
    var alRientro = Math.round((RIENTRO - oggi) / giorno);

    if (alVia > 0) {
      el.innerHTML = 'Mancano <b>' + alVia + '</b> giorn' + (alVia === 1 ? 'o' : 'i') + ' alla partenza';
    } else if (alRientro >= 0) {
      var n = Math.round((oggi - PARTENZA) / giorno) + 1;
      el.innerHTML = 'Giorno <b>' + n + '</b> di 17 &middot; in viaggio';
    } else {
      el.textContent = 'Viaggio concluso';
    }
  }

  /* ---------- comparsa allo scroll ---------- */
  function comparsa() {
    var voci = document.querySelectorAll('.reveal');
    if (!voci.length) { return; }

    var ridotto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (ridotto || !('IntersectionObserver' in window)) {
      for (var i = 0; i < voci.length; i++) { voci[i].classList.add('in'); }
      return;
    }

    var osserva = new IntersectionObserver(function (righe) {
      righe.forEach(function (r) {
        if (r.isIntersecting) {
          r.target.classList.add('in');
          osserva.unobserve(r.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    for (var j = 0; j < voci.length; j++) { osserva.observe(voci[j]); }
  }

  /* ---------- checklist ---------- */
  function checklist() {
    var caselle = document.querySelectorAll('.check input[data-k]');
    for (var i = 0; i < caselle.length; i++) {
      (function (c) {
        var k = CHIAVE + 'check:' + c.dataset.k;
        if (!box) { return; }
        if (box.getItem(k) === '1') { c.checked = true; }
        c.addEventListener('change', function () {
          if (c.checked) { box.setItem(k, '1'); } else { box.removeItem(k); }
        });
      })(caselle[i]);
    }
  }

  /* ---------- appunti ---------- */
  function appunti() {
    var aree = document.querySelectorAll('textarea[data-nota]');
    for (var i = 0; i < aree.length; i++) {
      (function (area) {
        var id = area.dataset.nota;
        var k = CHIAVE + 'nota:' + id;
        var stato = document.querySelector('[data-nota-stato="' + id + '"]');
        var cancella = document.querySelector('[data-nota-cancella="' + id + '"]');

        if (!box) {
          area.disabled = true;
          area.placeholder = 'Questo browser non permette di salvare in locale.';
          if (stato) { stato.textContent = 'Salvataggio non disponibile'; }
          if (cancella) { cancella.disabled = true; }
          return;
        }

        var salvato = box.getItem(k);
        if (salvato) { area.value = salvato; }
        if (stato) { stato.textContent = salvato ? 'Salvato su questo dispositivo' : ''; }

        var attesa;
        area.addEventListener('input', function () {
          clearTimeout(attesa);
          if (stato) { stato.textContent = 'Sto scrivendo...'; }
          attesa = setTimeout(function () {
            if (area.value) { box.setItem(k, area.value); } else { box.removeItem(k); }
            if (stato) { stato.textContent = 'Salvato su questo dispositivo'; }
          }, 400);
        });

        if (cancella) {
          cancella.addEventListener('click', function () {
            area.value = '';
            box.removeItem(k);
            if (stato) { stato.textContent = 'Cancellato'; }
            area.focus();
          });
        }
      })(aree[i]);
    }
  }

  voliConfermati();
  contatore();
  compleannoAnna();
  comparsa();
  checklist();
  appunti();
})();
