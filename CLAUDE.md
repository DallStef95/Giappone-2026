# Sito itinerario Giappone — contesto del progetto

Sito statico con l'itinerario di un viaggio in Giappone, **28 ottobre – 13 novembre 2026**.
Non è di Michele: è per un suo amico, che lo ospiterà su un proprio dominio. La consegna
avviene passando uno **zip**, quindi il sito deve funzionare scompattato in una cartella
qualunque, senza build e senza chiamate a servizi esterni.

Nasce dallo stesso impianto di `../Travel-to-China`, ma **il design è volutamente diverso**:
non riportare qui la palette carta/celadon/cinabro né i font di quel sito.

## File

| File | Ruolo |
|---|---|
| `index.html` | Tutto il sito: voli, itinerario, spostamenti, pratico, valigia, luce, buchi, checklist, appunti |
| `assets/site.css` | Tutto il CSS |
| `assets/site.js` | Contatore, comparsa allo scroll, checklist e appunti in localStorage |
| `assets/fonts.css` | `@font-face` locali, con gli `unicode-range` |
| `assets/fonts/` | Otto woff2, 172 kB |
| `CLAUDE.md` | Questo file |

Non ci sono pagine di tappa, immagini né sezione privata: per ora è una bozza a pagina
singola. Se servono, il modello da cui copiare l'impianto è il sito Cina.

## Dati del viaggio — quello che è certo

Arrivano dall'amico, testuali. Non inventare oltre questi.

- **28/10** partenza, Milano Malpensa → Tokyo Narita
- **29–31/10** Tokyo
- **01/11** Hakone, poi Kyoto
- **02–04/11** Kyoto, Osaka, Nara
- **05/11** Hiroshima e Miyajima, poi Fukuoka
- **06–08/11** Fukuoka e Beppu
- **08/11** volo Fukuoka → Okinawa
- **09–11/11** Okinawa
- **12/11** mattina volo Okinawa → Tokyo, sera volo Tokyo → Milano
- **13/11** atterraggio in Italia

**Il conto delle notti deve sempre fare 16**: 2 in volo, Tokyo 3, Kyoto 4, Fukuoka 3,
Okinawa 4. È il vincolo che tiene insieme l'itinerario: se si aggiunge una notte a
Hakone o a Hiroshima, va tolta altrove. C'è un riepilogo visibile in fondo alla
sezione «Giorno per giorno» (`.ledger`) e va aggiornato insieme all'itinerario.

## Cosa manca (bloccante)

1. **I voli.** Compagnie, numeri, orari. E soprattutto: biglietto unico o separati?
   Il volo Naha → Tokyo del 12 arriva a **Haneda o Narita**? Da questo dipende se il
   12 novembre è una giornata tranquilla o il rischio più grosso del viaggio.
2. Hakone: passaggio in giornata o notte in ryokan (Kyoto scenderebbe a 3 notti).
3. Beppu: gita da Fukuoka o notte in ryokan a Beppu/Yufuin.
4. Okinawa: solo l'isola principale o anche Ishigaki/Miyako.
5. Interessi dei viaggiatori (templi, cibo, natura e onsen, anime), numero di persone,
   fascia di budget. Senza, le giornate restano generiche.
6. Hotel: quattro basi da scegliere, nessuna prenotata.
7. Se serve una sezione privata cifrata per le prenotazioni (modello Cina).

## Verificato, non inventato

- **Giorni della settimana** delle date: calcolati, non tirati a indovinare.
- **Alba e tramonto**: calcolati con l'algoritmo NOAA sulle coordinate di ogni città,
  fuso +9 fisso (il Giappone non usa l'ora legale). Se cambiano le tappe, ricalcolarli.
- Il tramonto a Tokyo alle **16:49** è il vincolo che decide la forma delle giornate:
  citato nell'itinerario e nella sezione «Quanta luce avete».

Cose scritte di proposito **come da verificare**, perché cambiano o non sono certe:
prezzi e coperture dei JR Pass, tassa d'ingresso a Miyajima, date del torneo di sumo
Kyūshū Basho a Fukuoka (di solito comincia la seconda domenica di novembre, che nel
2026 è l'8 — il giorno del volo per Okinawa). Non trasformarle in affermazioni secche.

Due punti che sono facili da sbagliare e che vanno tenuti:
- **Patente internazionale per Okinawa: modello Ginevra 1949**, non Vienna 1968.
- **Il foliage a Kyoto arriva dal 20 novembre**: il 2–4 novembre sono in anticipo.
  Non vendere il momiji come se lo vedessero.

## Convenzioni del sito

**Struttura.** Una pagina sola, niente framework, niente build. I percorsi sono
**sempre relativi**: il sito può finire in una sottocartella.

**Design — palette urushi.** Fondo di lacca nero-blu, testo di seta grezza, indaco e
oro. Variabili in cima a `assets/site.css`: `--sumi`, `--kinari`, `--ai`, `--kin`,
`--shu`. Il **vermiglio `--shu` è l'unico rosso e vuol dire due cose sole**: voli e
avvisi. Se lo usi altrove smette di funzionare.

**Font**, tutti self-hostati: Instrument Serif per i titoli, Manrope per il testo,
JetBrains Mono per i dati, Noto Serif JP per i kanji.

**Niente emoji.** Sono state tolte apposta: `🚄` su Windows diventa un'emoji a colori
e il CSS non può colorarla. I mezzi si distinguono con la parola e con il tratto della
riga (`.leg` continuo indaco = superficie, tratteggiato vermiglio = volo).

**Il subset giapponese copre 23 caratteri.** Se ne aggiungi uno **visibile** va
rigenerato, altrimenti cade su un font di sistema. La lista e il comando stanno in
`assets/fonts.css`. Vale anche per i macron: `ō`, `ū` stanno nei file `-ext`.

**L'elemento firma è il binario dei giorni**: colonna di sinistra con la data in mono,
filo verticale d'oro e un **rombo** su ogni giorno (vermiglio se `.day.air`, cioè se
quel giorno si vola). La classe `.leg` chiude il giorno **da cui si parte**, non quello
in cui si arriva. Va riverificata ogni volta che cambia un mezzo.

**localStorage.** Ci vivono la checklist (`giappone2026:check:<k>`) e gli appunti
(`giappone2026:nota:<id>`). Vale solo su quel dispositivo e in quel browser: **ogni
punto in cui si scrive lo dice all'utente**. In navigazione privata l'accesso può
lanciare: `site.js` lo prova una volta e degrada disabilitando la textarea.

**Movimento.** Solo un fade-up allo scroll, con rispetto di `prefers-reduced-motion`.
Non aggiungerne altro.

## Tono dei testi

Italiano. **Seconda persona plurale** (il viaggio è di più persone), a differenza del
sito Cina che dà del tu. Concreto e asciutto: cosa fare, a che ora, quanto dura, cosa
può andare storto. I problemi vanno detti, non addolciti — le note in vermiglio
(`.note.warn`) e la sezione «Cosa manca» esistono per quello. Evita l'entusiasmo da
brochure.

## Provare prima di consegnare

Apri il sito da un server locale (`python -m http.server`, non `file://`) e guardalo a
larghezza da telefono: il layout è pensato mobile-first. Controlla che non ci sia
scorrimento orizzontale e che i kanji e i macron non cambino font a metà parola.
