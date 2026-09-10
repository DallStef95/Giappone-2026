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

  contatore();
  comparsa();
  checklist();
  appunti();
})();
