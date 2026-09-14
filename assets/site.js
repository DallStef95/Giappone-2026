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
      testo.textContent = 'Quattro blocchi di viaggio aereo. Le tratte internazionali sono confermate con Emirates; restano da completare i due voli interni Fukuoka → Okinawa e Okinawa → Tokyo.';
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
        '<div class="flight-top"><span>Dom 8 nov</span><span class="tbd">volo interno · da confermare</span></div>' +
        '<div class="flight-mid">' +
          '<span class="code">FUK <span class="mono tbd">--:--</span></span>' +
          '<span class="span"></span>' +
          '<span class="code"><span class="mono tbd">--:--</span> OKA</span>' +
        '</div>' +
        '<div class="flight-bot"><span>Fukuoka <b>→</b> Naha</span><span>circa 1h 40m · orari da inserire</span></div>' +
      '</article>' +

      '<article class="flight reveal">' +
        '<div class="flight-top"><span>Gio 12 nov</span><span class="tbd">volo interno · da confermare</span></div>' +
        '<div class="flight-mid">' +
          '<span class="code">OKA <span class="mono tbd">--:--</span></span>' +
          '<span class="span"></span>' +
          '<span class="code"><span class="mono tbd">--:--</span> <span class="tbd">???</span></span>' +
        '</div>' +
        '<div class="flight-bot"><span>Naha <b>→</b> Tokyo</span><span class="tbd">Haneda o Narita · da confermare</span></div>' +
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
      nota.innerHTML = '<b>Le tratte internazionali sono ora inserite.</b> Andata: MXP → Dubai → NRT il 28/29 ottobre. Ritorno: NRT → Dubai → MXP il 12/13 novembre. La coincidenza a Dubai è di 3h25 all\'andata e 4h25 al ritorno. I due voli interni FUK → OKA e OKA → Tokyo restano invece da completare.';
    }

    var nota2 = sezione.querySelectorAll('.note')[1];
    if (nota2) {
      nota2.innerHTML = '<b>Nota:</b> i dati riportati qui sono quelli delle prenotazioni fornite. Per la coincidenza a Dubai, verifica sul biglietto che le tratte siano effettivamente nella stessa prenotazione/PNR e segui sempre le indicazioni della compagnia per eventuale cambio di terminal o bagagli.';
    }
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
  comparsa();
  checklist();
  appunti();
})();
