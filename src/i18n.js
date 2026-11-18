const I18N = {
sr: {
  name: 'Srpski', flag: '🇷🇸', html: 'sr-Latn',
  ui: {
    title: 'Radionica kola', subtitle: 'Sastavi kolo na protobordu i pritisni Simuliraj',
    help: 'Pomoć', sound: 'Zvuk', save: 'Sačuvaj', myCircuits: 'Moja kola', clear: 'Očisti',
    select: 'Izaberi', undo: 'Poništi', redo: 'Ponovi', simulate: 'Simuliraj', stop: 'Zaustavi',
    free: 'Igraj slobodno', learn: 'Hajde da učimo', del: 'Obriši', level: 'Nivo', lessons: 'Lekcije',
    step: 'Korak', showSolution: 'Pokaži rešenje', resetLesson: 'Počni ispočetka', light: 'Svetlo',
    props: 'Svojstva', noSelection: 'Izaberi alat „Izaberi“ i klikni na deo da vidiš njegova svojstva.',
    value: 'Otpor', color: 'Boja', position: 'Položaj klizača', state: 'Stanje', on: 'Uključen', off: 'Isključen',
    pressed: 'Pritisnut', released: 'Pušten', burnedLabel: 'Pregoreo', current: 'Struja', voltage: 'Napon',
    lessonFooter: 'Kada završiš, pritisni <b>Simuliraj</b>. Ako radi, nivo se završava i otključavaš nove delove 🔓.',
    pickFirst: 'Klikni na rupicu gde počinje: {part}.', pickSecond: 'Sada klikni na drugu rupicu. (Esc = odustani)',
    pickPot: 'Klikni na rupicu — potenciometar zauzima 3 susedne rupice u redu.',
    occupied: 'Ta rupica je već zauzeta.', sameHole: 'Izaberi drugu rupicu.', potBad: 'Ovde nema mesta za potenciometar.',
    locked: 'Ovaj deo se otključava u kasnijoj lekciji.',
    short: '⚠ Kratak spoj! Plus je spojen direktno na minus i baterija se greje. Prekini taj spoj.',
    burned: '💥 LED je pregoreo — teklo je previše struje. Obriši ga, stavi novi i dodaj otpornik.',
    noPower: 'Kolo nije zatvoreno — struja nema kuda da teče. Da li si se vratio na − šinu?',
    simOn: 'Simulacija radi. Pritiskaj tastere i prebacuj prekidače!',
    saved: 'Sačuvano.', loaded: 'Učitano.', copied: 'Kôd je kopiran.', importBad: 'Ovaj kôd ne valja.',
    lessonDone: 'Bravo! Nivo završen!', unlockedParts: 'Otključano:', nextLesson: 'Sledeća lekcija', stay: 'Ostani ovde',
    allDone: 'Završio si sve lekcije! Sada probaj slobodnu igru.', solutionLoaded: 'Ovo je jedno rešenje. Pritisni Simuliraj!',
    name: 'Ime kola', load: 'Otvori', exportCode: 'Kôd kola (pošalji ga drugaru)', copy: 'Kopiraj',
    importLabel: 'Nalepi kôd kola', importBtn: 'Učitaj kôd', empty: 'Još nema sačuvanih kola.', close: 'Zatvori',
    confirmClear: 'Obrisati sve delove sa protoborda?', yes: 'Da', no: 'Ne', done: 'završeno', defaultName: 'Moje kolo',
    helpItems: [
      'Izaberi deo sa leve strane, pa klikni na dve rupice protoborda da ga postaviš.',
      'Rupice u istoj koloni (a–e, ili f–j) su spojene ispod. Dugačke šine + i − su spojene celom dužinom.',
      'Baterija od 9 V je vezana za gornje šine: + (crvena) i − (plava). Donje šine spoji žicama ako ti trebaju.',
      'Alatom <b>Izaberi</b> klikni na deo, pa ga obriši dugmetom <b>Obriši</b> ili tasterom Delete.',
      'Pritisni <b>Simuliraj</b> da vidiš kako teče struja. Tokom simulacije možeš da pritiskaš tastere i prebacuješ prekidače.',
      '↶ i ↷ poništavaju i vraćaju poteze.'
    ]
  },
  cats: { power: 'Izvori i žice', passive: 'Pasivne', out: 'Izlazi', sw: 'Prekidači', sens: 'Senzori', tools: 'Alati' },
  colors: { red: 'Crvena', green: 'Zelena', blue: 'Plava', yellow: 'Žuta', white: 'Bela', black: 'Crna', orange: 'Narandžasta' },
  parts: { wire: 'Žica', resistor: 'Otpornik', led: 'LED', diode: 'Dioda', bulb: 'Sijalica', buzzer: 'Zujalica', motor: 'Motor', button: 'Taster', switch: 'Prekidač', pot: 'Potenciometar', ldr: 'Fotootpornik', ammeter: 'Ampermetar', voltmeter: 'Voltmetar', battery: 'Baterija 9 V' },
  info: {
    wire: 'Provodi struju između dve tačke. Klikni na prvu rupicu, pa na drugu.',
    resistor: 'Ograničava struju. Bez njega LED pregori! Trake u boji pokazuju vrednost u omima (Ω).',
    led: 'Svetleća dioda. Svetli samo kad struja ide u pravom smeru: duža nožica (+) ka plusu. Uvek joj treba otpornik.',
    diode: 'Propušta struju samo u jednom smeru, kao jednosmerni ventil. Srebrna traka je strana minusa (−).',
    bulb: 'Sijalica svetli kad kroz njenu nit teče struja. Što više struje, jače svetli.',
    buzzer: 'Zujalica pišti kad kroz nju teče struja. Prvo klikni na stranu koja ide ka plusu (+).',
    motor: 'Motor pretvara struju u okretanje. Kad zameniš + i −, okreće se na drugu stranu.',
    button: 'Taster spaja kolo samo dok ga držiš pritisnutog. Tokom simulacije pritisni ga mišem ili prstom.',
    switch: 'Prekidač pamti položaj: uključen ili isključen. Tokom simulacije klikni na njega da ga prebaciš.',
    pot: 'Promenljivi otpornik sa tri nožice. Pomeri klizač i struja se menja — kao dugme za jačinu zvuka.',
    ldr: 'Otpor mu zavisi od svetla: na svetlu je mali, u mraku veliki. Svetlo menjaš klizačem ☀.',
    ammeter: 'Meri struju. Stavlja se REDNO, u samo kolo, tako da struja prolazi kroz njega.',
    voltmeter: 'Meri napon između dve tačke. Stavlja se PARALELNO, preko dela koji meriš.',
    battery: 'Baterija od 9 V daje energiju. Plus (+) je crvena šina, minus (−) plava.'
  },
  lessons: [
    { t: 'Upali jedan LED', d: 'Baterija → otpornik → LED → nazad na −. Tvoje prvo zatvoreno kolo.', s: [
      'Postavi <b>žicu</b> od <b>+ šine</b> (crvena) do jedne kolone u gornjem delu.',
      'Postavi <b>otpornik</b> od te kolone do kolone malo desnije.',
      'Postavi <b>LED</b>: prvo klikni u kolonu otpornika (duža nožica +), pa u sledeću slobodnu kolonu.',
      'Postavi <b>žicu</b> od kolone kratke nožice LED-a do <b>− šine</b> (plava).'] },
    { t: 'Taster', d: 'Taster pali LED samo dok ga držiš. Kad ga pustiš, opruga ga otvori.', s: [
      'Napravi kolo iz prvog nivoa, ali umesto prve žice stavi <b>taster</b> između + šine i otpornika.',
      'Pritisni <b>Simuliraj</b>, pa drži taster mišem ili prstom.',
      'LED treba da svetli dok držiš taster i da se ugasi kad ga pustiš.'] },
    { t: 'Prekidač', d: 'Prekidač pamti položaj — kao prekidač za svetlo u tvojoj sobi.', s: [
      'Stavi <b>prekidač</b> u kolo, između + šine i otpornika.',
      'Simuliraj i klikni na prekidač da ga uključiš i isključiš.',
      'Ostavi ga uključenog da LED svetli.'] },
    { t: 'Dva LED-a paralelno', d: 'Svaki LED ima svoj put do baterije. Ako jedan izvadiš, drugi i dalje svetli.', s: [
      'Napravi dva odvojena kola, svako sa svojim <b>otpornikom</b> i <b>LED-om</b>.',
      'Oba počinju na <b>+ šini</b> i završavaju na <b>− šini</b>.',
      'Simuliraj — oba LED-a treba da svetle.'] },
    { t: 'Dva LED-a redno', d: 'Struja prolazi kroz oba LED-a, jedan za drugim, kao kroz vagone voza.', s: [
      '+ šina → <b>otpornik</b> → prvi <b>LED</b> → drugi <b>LED</b> → − šina.',
      'Kratka nožica prvog LED-a ide u istu kolonu kao duga nožica drugog. U toj koloni ne sme biti ništa drugo.',
      'Simuliraj — svetle oba. Probaj otpornik od 220 Ω ako su slabi.'] },
    { t: 'Sijalica', d: 'Sijalica ima tanku nit koja se usija kad kroz nju teče struja. Njoj ne treba otpornik.', s: [
      'Postavi <b>sijalicu</b> između dve kolone.',
      'Jednu stranu spoji žicom na + šinu, a drugu na − šinu.',
      'Simuliraj.'] },
    { t: 'Zujalica', d: 'Zujalica pretvara struju u zvuk. Uključi zvuk 🔊!', s: [
      'Postavi <b>zujalicu</b>: prvo klikni na stranu koja ide ka plusu (+).',
      'Spoji je žicama na + i − šinu.',
      'Simuliraj i slušaj.'] },
    { t: 'Motor', d: 'Motor pretvara struju u okretanje.', s: [
      'Postavi <b>motor</b> između dve kolone.',
      'Spoji ga žicama na + i − šinu.',
      'Simuliraj — motor se okreće! Probaj da zameniš + i − i gledaj smer.'] },
    { t: 'Dimer sa potenciometrom', d: 'Potenciometar je otpornik koji menjaš okretanjem. Njime biraš koliko jako LED svetli.', s: [
      'Postavi <b>potenciometar</b> u gornji deo — zauzima 3 kolone.',
      'Levu nožicu spoji žicom na + šinu.',
      'Od srednje nožice (klizač): <b>otpornik</b> → <b>LED</b> → − šina.',
      'Simuliraj, izaberi potenciometar i pomeraj klizač.'] },
    { t: 'Fotootpornik', d: 'Napravi LED koji svetli jače kad je svetlije oko njega.', s: [
      '+ šina → <b>fotootpornik</b> → <b>otpornik</b> → <b>LED</b> → − šina.',
      'Simuliraj i pomeraj klizač <b>☀ Svetlo</b>.',
      'LED treba da menja jačinu.'] },
    { t: 'Dioda – jednosmerna ulica', d: 'Dioda pušta struju samo u jednom smeru. Srebrna traka je strana kroz koju struja izlazi.', s: [
      '+ šina → <b>dioda</b> (prvo klikni na stranu BEZ trake) → <b>otpornik</b> → <b>LED</b> → − šina.',
      'Simuliraj — LED svetli.',
      'Probaj da okreneš diodu: LED se gasi! Vrati je da završiš nivo.'] },
    { t: 'Merimo struju', d: 'Ampermetar se stavlja U kolo, da struja prođe kroz njega.', s: [
      'Napravi kolo sa <b>LED-om</b> i <b>otpornikom</b>.',
      'Na jednom mestu prekini kolo i ubaci <b>ampermetar</b> (prvo klikni na stranu ka plusu).',
      'Simuliraj i pročitaj koliko miliampera (mA) teče.'] },
    { t: 'Merimo napon', d: 'Voltmetar se stavlja PREKO dela — po jedna nožica sa svake strane.', s: [
      'Napravi kolo sa <b>LED-om</b> i <b>otpornikom</b>.',
      'Postavi <b>voltmetar</b> tako da su mu nožice u kolonama obe nožice LED-a.',
      'Simuliraj: koliko volti je na LED-u?'] },
    { t: 'Popravi kolo', d: 'Neko je sastavio ovo kolo, ali LED ne svetli. Pronađi grešku i popravi je!', s: [
      'Simuliraj i pogledaj kolo.',
      'Proveri smer LED-a: duža nožica (+) mora ka plusu.',
      'Obriši deo koji ne valja i postavi ga ispravno.'] },
    { t: 'Veliko finale', d: 'Pokreni motor, upali LED i oglasi zujalicu — sve u isto vreme!', s: [
      'Svaki deo dobija svoj put od + šine do − šine.',
      'Ne zaboravi otpornik za LED.',
      'Simuliraj — sve radi zajedno!'] }
  ]
},
mk: {
  name: 'Македонски', flag: '🇲🇰', html: 'mk',
  ui: {
    title: 'Работилница за струјни кола', subtitle: 'Состави коло на плочата и притисни Симулирај',
    help: 'Помош', sound: 'Звук', save: 'Зачувај', myCircuits: 'Мои кола', clear: 'Исчисти',
    select: 'Избери', undo: 'Врати', redo: 'Повтори', simulate: 'Симулирај', stop: 'Запри',
    free: 'Слободна игра', learn: 'Ајде да учиме', del: 'Избриши', level: 'Ниво', lessons: 'Лекции',
    step: 'Чекор', showSolution: 'Покажи решение', resetLesson: 'Почни одново', light: 'Светлина',
    props: 'Својства', noSelection: 'Избери ја алатката „Избери“ и кликни на дел за да ги видиш неговите својства.',
    value: 'Отпор', color: 'Боја', position: 'Положба на лизгачот', state: 'Состојба', on: 'Вклучен', off: 'Исклучен',
    pressed: 'Притиснато', released: 'Пуштено', burnedLabel: 'Изгорен', current: 'Струја', voltage: 'Напон',
    lessonFooter: 'Кога ќе завршиш, притисни <b>Симулирај</b>. Ако работи, нивото е завршено и отклучуваш нови делови 🔓.',
    pickFirst: 'Кликни на дупката каде што почнува: {part}.', pickSecond: 'Сега кликни на втората дупка. (Esc = откажи)',
    pickPot: 'Кликни на дупка — потенциометарот зафаќа 3 соседни дупки во ред.',
    occupied: 'Таа дупка е веќе зафатена.', sameHole: 'Избери друга дупка.', potBad: 'Тука нема место за потенциометар.',
    locked: 'Овој дел се отклучува во подоцнежна лекција.',
    short: '⚠ Краток спој! Плусот е поврзан директно со минусот и батеријата се загрева. Прекини го тој спој.',
    burned: '💥 LED-от изгоре — течеше премногу струја. Избриши го, стави нов и додај отпорник.',
    noPower: 'Колото не е затворено — струјата нема каде да тече. Дали се врати на − шината?',
    simOn: 'Симулацијата работи. Притискај копчиња и префрлај прекинувачи!',
    saved: 'Зачувано.', loaded: 'Вчитано.', copied: 'Кодот е копиран.', importBad: 'Овој код не е исправен.',
    lessonDone: 'Браво! Нивото е завршено!', unlockedParts: 'Отклучено:', nextLesson: 'Следна лекција', stay: 'Остани тука',
    allDone: 'Ги заврши сите лекции! Сега пробај слободна игра.', solutionLoaded: 'Ова е едно решение. Притисни Симулирај!',
    name: 'Име на колото', load: 'Отвори', exportCode: 'Код на колото (испрати го на другар)', copy: 'Копирај',
    importLabel: 'Залепи код на коло', importBtn: 'Вчитај код', empty: 'Сè уште нема зачувани кола.', close: 'Затвори',
    confirmClear: 'Да се избришат сите делови од плочата?', yes: 'Да', no: 'Не', done: 'завршено', defaultName: 'Мое коло',
    helpItems: [
      'Избери дел од левата страна, па кликни на две дупки на плочата за да го поставиш.',
      'Дупките во иста колона (a–e, или f–j) се поврзани одоздола. Долгите шини + и − се поврзани по целата должина.',
      'Батеријата од 9 V е поврзана на горните шини: + (црвена) и − (сина). Долните шини поврзи ги со жици ако ти требаат.',
      'Со алатката <b>Избери</b> кликни на дел, па избриши го со копчето <b>Избриши</b> или со тастерот Delete.',
      'Притисни <b>Симулирај</b> за да видиш како тече струјата. За време на симулацијата можеш да притискаш копчиња и да префрлаш прекинувачи.',
      '↶ и ↷ ги враќаат и повторуваат потезите.'
    ]
  },
  cats: { power: 'Извори и жици', passive: 'Пасивни', out: 'Излези', sw: 'Прекинувачи', sens: 'Сензори', tools: 'Алатки' },
  colors: { red: 'Црвена', green: 'Зелена', blue: 'Сина', yellow: 'Жолта', white: 'Бела', black: 'Црна', orange: 'Портокалова' },
  parts: { wire: 'Жица', resistor: 'Отпорник', led: 'LED', diode: 'Диода', bulb: 'Сијалица', buzzer: 'Зујалка', motor: 'Мотор', button: 'Копче', switch: 'Прекинувач', pot: 'Потенциометар', ldr: 'Фотоотпорник', ammeter: 'Амперметар', voltmeter: 'Волтметар', battery: 'Батерија 9 V' },
  info: {
    wire: 'Спроведува струја меѓу две точки. Кликни на првата дупка, па на втората.',
    resistor: 'Ја ограничува струјата. Без него LED-от изгорува! Обоените ленти ја покажуваат вредноста во оми (Ω).',
    led: 'Светлечка диода. Свети само кога струјата тече во вистинската насока: подолгата ножичка (+) кон плусот. Секогаш ѝ треба отпорник.',
    diode: 'Пропушта струја само во една насока, како еднонасочен вентил. Сребрената лента е страната на минусот (−).',
    bulb: 'Сијалицата свети кога низ нејзиното влакно тече струја. Колку повеќе струја, толку посилно свети.',
    buzzer: 'Зујалката пишти кога низ неа тече струја. Прво кликни на страната што оди кон плусот (+).',
    motor: 'Моторот ја претвора струјата во вртење. Кога ќе ги замениш + и −, се врти на другата страна.',
    button: 'Копчето го затвора колото само додека го држиш притиснато. За време на симулацијата притисни го со глувчето или со прст.',
    switch: 'Прекинувачот ја памети положбата: вклучен или исклучен. За време на симулацијата кликни на него за да го префрлиш.',
    pot: 'Променлив отпорник со три ножички. Помести го лизгачот и струјата се менува — како копче за јачина на звукот.',
    ldr: 'Отпорот му зависи од светлината: на светло е мал, во темно голем. Светлината ја менуваш со лизгачот ☀.',
    ammeter: 'Мери струја. Се става СЕРИСКИ, во самото коло, за струјата да поминува низ него.',
    voltmeter: 'Мери напон меѓу две точки. Се става ПАРАЛЕЛНО, преку делот што го мериш.',
    battery: 'Батеријата од 9 V дава енергија. Плусот (+) е црвената шина, минусот (−) сината.'
  },
  lessons: [
    { t: 'Запали еден LED', d: 'Батерија → отпорник → LED → назад на −. Твоето прво затворено коло.', s: [
      'Постави <b>жица</b> од <b>+ шината</b> (црвена) до една колона во горниот дел.',
      'Постави <b>отпорник</b> од таа колона до колона малку подесно.',
      'Постави <b>LED</b>: прво кликни во колоната на отпорникот (подолгата ножичка +), па во следната слободна колона.',
      'Постави <b>жица</b> од колоната на кратката ножичка на LED-от до <b>− шината</b> (сина).'] },
    { t: 'Копче', d: 'Копчето го пали LED-от само додека го држиш. Кога ќе го пуштиш, пружината го отвора.', s: [
      'Направи го колото од првото ниво, но наместо првата жица стави <b>копче</b> меѓу + шината и отпорникот.',
      'Притисни <b>Симулирај</b>, па држи го копчето со глувчето или со прст.',
      'LED-от треба да свети додека го држиш копчето и да се изгасне кога ќе го пуштиш.'] },
    { t: 'Прекинувач', d: 'Прекинувачот ја памети положбата — како прекинувачот за светло во твојата соба.', s: [
      'Стави <b>прекинувач</b> во колото, меѓу + шината и отпорникот.',
      'Симулирај и кликни на прекинувачот за да го вклучиш и исклучиш.',
      'Остави го вклучен за LED-от да свети.'] },
    { t: 'Два LED-а паралелно', d: 'Секој LED има свој пат до батеријата. Ако едниот го извадиш, другиот и понатаму свети.', s: [
      'Направи две одделни кола, секое со свој <b>отпорник</b> и <b>LED</b>.',
      'Двете почнуваат на <b>+ шината</b> и завршуваат на <b>− шината</b>.',
      'Симулирај — двата LED-а треба да светат.'] },
    { t: 'Два LED-а сериски', d: 'Струјата минува низ двата LED-а, еден по друг, како низ вагоните на воз.', s: [
      '+ шина → <b>отпорник</b> → прв <b>LED</b> → втор <b>LED</b> → − шина.',
      'Кратката ножичка на првиот LED оди во истата колона како долгата ножичка на вториот. Во таа колона не смее да има ништо друго.',
      'Симулирај — светат двата. Пробај отпорник од 220 Ω ако се слаби.'] },
    { t: 'Сијалица', d: 'Сијалицата има тенко влакно што се вжарува кога низ него тече струја. Нејзе не ѝ треба отпорник.', s: [
      'Постави <b>сијалица</b> меѓу две колони.',
      'Едната страна поврзи ја со жица на + шината, а другата на − шината.',
      'Симулирај.'] },
    { t: 'Зујалка', d: 'Зујалката ја претвора струјата во звук. Вклучи го звукот 🔊!', s: [
      'Постави <b>зујалка</b>: прво кликни на страната што оди кон плусот (+).',
      'Поврзи ја со жици на + и − шината.',
      'Симулирај и слушај.'] },
    { t: 'Мотор', d: 'Моторот ја претвора струјата во вртење.', s: [
      'Постави <b>мотор</b> меѓу две колони.',
      'Поврзи го со жици на + и − шината.',
      'Симулирај — моторот се врти! Пробај да ги замениш + и − и гледај ја насоката.'] },
    { t: 'Затемнувач со потенциометар', d: 'Потенциометарот е отпорник што го менуваш со вртење. Со него избираш колку силно свети LED-от.', s: [
      'Постави <b>потенциометар</b> во горниот дел — зафаќа 3 колони.',
      'Левата ножичка поврзи ја со жица на + шината.',
      'Од средната ножичка (лизгачот): <b>отпорник</b> → <b>LED</b> → − шина.',
      'Симулирај, избери го потенциометарот и мрдај го лизгачот.'] },
    { t: 'Фотоотпорник', d: 'Направи LED што свети посилно кога околу него е посветло.', s: [
      '+ шина → <b>фотоотпорник</b> → <b>отпорник</b> → <b>LED</b> → − шина.',
      'Симулирај и мрдај го лизгачот <b>☀ Светлина</b>.',
      'LED-от треба да ја менува јачината.'] },
    { t: 'Диода – еднонасочна улица', d: 'Диодата пушта струја само во една насока. Сребрената лента е страната низ која струјата излегува.', s: [
      '+ шина → <b>диода</b> (прво кликни на страната БЕЗ лента) → <b>отпорник</b> → <b>LED</b> → − шина.',
      'Симулирај — LED-от свети.',
      'Пробај да ја свртиш диодата: LED-от се гаси! Врати ја за да го завршиш нивото.'] },
    { t: 'Мериме струја', d: 'Амперметарот се става ВО колото, за струјата да мине низ него.', s: [
      'Направи коло со <b>LED</b> и <b>отпорник</b>.',
      'На едно место прекини го колото и вметни <b>амперметар</b> (прво кликни на страната кон плусот).',
      'Симулирај и прочитај колку милиампери (mA) тече.'] },
    { t: 'Мериме напон', d: 'Волтметарот се става ПРЕКУ делот — по една ножичка од секоја страна.', s: [
      'Направи коло со <b>LED</b> и <b>отпорник</b>.',
      'Постави <b>волтметар</b> така што ножичките ќе му бидат во колоните на двете ножички на LED-от.',
      'Симулирај: колку волти има на LED-от?'] },
    { t: 'Поправи го колото', d: 'Некој го составил ова коло, но LED-от не свети. Најди ја грешката и поправи ја!', s: [
      'Симулирај и погледни го колото.',
      'Провери ја насоката на LED-от: подолгата ножичка (+) мора кон плусот.',
      'Избриши го делот што не е во ред и постави го правилно.'] },
    { t: 'Големо финале', d: 'Вклучи го моторот, запали LED и огласи ја зујалката — сè во исто време!', s: [
      'Секој дел добива свој пат од + шината до − шината.',
      'Не заборавај отпорник за LED-от.',
      'Симулирај — сè работи заедно!'] }
  ]
},
ro: {
  name: 'Română', flag: '🇷🇴', html: 'ro',
  ui: {
    title: 'Atelierul de circuite', subtitle: 'Construiește circuitul pe breadboard și apasă Simulează',
    help: 'Ajutor', sound: 'Sunet', save: 'Salvează', myCircuits: 'Circuitele mele', clear: 'Golește',
    select: 'Selectează', undo: 'Anulează', redo: 'Refă', simulate: 'Simulează', stop: 'Oprește',
    free: 'Joacă liber', learn: 'Hai să învățăm', del: 'Șterge', level: 'Nivelul', lessons: 'Lecții',
    step: 'Pasul', showSolution: 'Arată soluția', resetLesson: 'Ia-o de la capăt', light: 'Lumină',
    props: 'Proprietăți', noSelection: 'Alege unealta „Selectează” și dă clic pe o piesă ca să-i vezi proprietățile.',
    value: 'Rezistență', color: 'Culoare', position: 'Poziția cursorului', state: 'Stare', on: 'Pornit', off: 'Oprit',
    pressed: 'Apăsat', released: 'Eliberat', burnedLabel: 'Ars', current: 'Curent', voltage: 'Tensiune',
    lessonFooter: 'Când ai terminat, apasă <b>Simulează</b>. Dacă merge, nivelul se încheie și deblochezi piese noi 🔓.',
    pickFirst: 'Dă clic pe gaura unde începe: {part}.', pickSecond: 'Acum dă clic pe a doua gaură. (Esc = renunță)',
    pickPot: 'Dă clic pe o gaură — potențiometrul ocupă 3 găuri vecine pe rând.',
    occupied: 'Gaura aceasta e deja ocupată.', sameHole: 'Alege altă gaură.', potBad: 'Aici nu e loc pentru potențiometru.',
    locked: 'Piesa aceasta se deblochează într-o lecție mai târzie.',
    short: '⚠ Scurtcircuit! Plusul e legat direct la minus și bateria se încălzește. Întrerupe legătura.',
    burned: '💥 LED-ul s-a ars — a trecut prea mult curent. Șterge-l, pune altul și adaugă un rezistor.',
    noPower: 'Circuitul nu e închis — curentul nu are pe unde să treacă. Te-ai întors la șina −?',
    simOn: 'Simularea rulează. Apasă butoane și comută întrerupătoare!',
    saved: 'Salvat.', loaded: 'Încărcat.', copied: 'Codul a fost copiat.', importBad: 'Codul acesta nu e valid.',
    lessonDone: 'Bravo! Nivel terminat!', unlockedParts: 'Deblocat:', nextLesson: 'Lecția următoare', stay: 'Rămân aici',
    allDone: 'Ai terminat toate lecțiile! Acum încearcă jocul liber.', solutionLoaded: 'Aceasta e o soluție. Apasă Simulează!',
    name: 'Numele circuitului', load: 'Deschide', exportCode: 'Codul circuitului (trimite-l unui prieten)', copy: 'Copiază',
    importLabel: 'Lipește codul unui circuit', importBtn: 'Încarcă codul', empty: 'Încă nu ai circuite salvate.', close: 'Închide',
    confirmClear: 'Ștergi toate piesele de pe breadboard?', yes: 'Da', no: 'Nu', done: 'terminat', defaultName: 'Circuitul meu',
    helpItems: [
      'Alege o piesă din stânga, apoi dă clic pe două găuri ale breadboardului ca s-o așezi.',
      'Găurile din aceeași coloană (a–e sau f–j) sunt legate pe dedesubt. Șinele lungi + și − sunt legate pe toată lungimea.',
      'Bateria de 9 V e legată la șinele de sus: + (roșie) și − (albastră). Șinele de jos le legi cu fire dacă îți trebuie.',
      'Cu unealta <b>Selectează</b> dă clic pe o piesă, apoi șterge-o cu butonul <b>Șterge</b> sau cu tasta Delete.',
      'Apasă <b>Simulează</b> ca să vezi cum curge curentul. În timpul simulării poți apăsa butoane și comuta întrerupătoare.',
      '↶ și ↷ anulează și refac mutările.'
    ]
  },
  cats: { power: 'Surse și fire', passive: 'Pasive', out: 'Ieșiri', sw: 'Întrerupătoare', sens: 'Senzori', tools: 'Unelte' },
  colors: { red: 'Roșu', green: 'Verde', blue: 'Albastru', yellow: 'Galben', white: 'Alb', black: 'Negru', orange: 'Portocaliu' },
  parts: { wire: 'Fir', resistor: 'Rezistor', led: 'LED', diode: 'Diodă', bulb: 'Bec', buzzer: 'Buzzer', motor: 'Motor', button: 'Buton', switch: 'Întrerupător', pot: 'Potențiometru', ldr: 'Fotorezistor', ammeter: 'Ampermetru', voltmeter: 'Voltmetru', battery: 'Baterie 9 V' },
  info: {
    wire: 'Duce curentul între două puncte. Dă clic pe prima gaură, apoi pe a doua.',
    resistor: 'Limitează curentul. Fără el, LED-ul se arde! Benzile colorate arată valoarea în ohmi (Ω).',
    led: 'Diodă luminoasă. Se aprinde doar când curentul merge în sensul bun: piciorul lung (+) spre plus. Are mereu nevoie de un rezistor.',
    diode: 'Lasă curentul să treacă într-un singur sens, ca o supapă. Banda argintie e partea de minus (−).',
    bulb: 'Becul se aprinde când trece curent prin filament. Cu cât mai mult curent, cu atât luminează mai tare.',
    buzzer: 'Buzzerul piuie când trece curent prin el. Dă clic întâi pe partea care merge spre plus (+).',
    motor: 'Motorul transformă curentul în rotație. Dacă inversezi + și −, se învârte invers.',
    button: 'Butonul închide circuitul doar cât îl ții apăsat. În timpul simulării apasă-l cu mouse-ul sau cu degetul.',
    switch: 'Întrerupătorul ține minte poziția: pornit sau oprit. În timpul simulării dă clic pe el ca să-l comuți.',
    pot: 'Rezistor variabil cu trei picioare. Mută cursorul și curentul se schimbă — ca butonul de volum.',
    ldr: 'Rezistența lui depinde de lumină: la lumină e mică, în întuneric mare. Lumina o schimbi din cursorul ☀.',
    ammeter: 'Măsoară curentul. Se pune ÎN SERIE, chiar în circuit, ca să treacă curentul prin el.',
    voltmeter: 'Măsoară tensiunea dintre două puncte. Se pune ÎN PARALEL, peste piesa pe care o măsori.',
    battery: 'Bateria de 9 V dă energie. Plusul (+) e șina roșie, minusul (−) cea albastră.'
  },
  lessons: [
    { t: 'Aprinde un LED', d: 'Baterie → rezistor → LED → înapoi la −. Primul tău circuit închis.', s: [
      'Pune un <b>fir</b> de la <b>șina +</b> (roșie) la o coloană din partea de sus.',
      'Pune un <b>rezistor</b> de la acea coloană la o coloană puțin mai la dreapta.',
      'Pune <b>LED-ul</b>: dă clic întâi în coloana rezistorului (piciorul lung +), apoi în următoarea coloană liberă.',
      'Pune un <b>fir</b> de la coloana piciorului scurt al LED-ului la <b>șina −</b> (albastră).'] },
    { t: 'Butonul', d: 'Butonul aprinde LED-ul doar cât îl ții apăsat. Când îl eliberezi, arcul îl deschide.', s: [
      'Fă circuitul de la primul nivel, dar în locul primului fir pune un <b>buton</b> între șina + și rezistor.',
      'Apasă <b>Simulează</b>, apoi ține butonul apăsat cu mouse-ul sau cu degetul.',
      'LED-ul trebuie să lumineze cât ții butonul și să se stingă când îl eliberezi.'] },
    { t: 'Întrerupătorul', d: 'Întrerupătorul ține minte poziția — ca întrerupătorul de lumină din camera ta.', s: [
      'Pune un <b>întrerupător</b> în circuit, între șina + și rezistor.',
      'Simulează și dă clic pe întrerupător ca să-l pornești și să-l oprești.',
      'Lasă-l pornit ca LED-ul să lumineze.'] },
    { t: 'Două LED-uri în paralel', d: 'Fiecare LED are drumul lui până la baterie. Dacă scoți unul, celălalt luminează în continuare.', s: [
      'Fă două circuite separate, fiecare cu <b>rezistorul</b> și <b>LED-ul</b> lui.',
      'Amândouă pornesc de la <b>șina +</b> și se termină la <b>șina −</b>.',
      'Simulează — ambele LED-uri trebuie să lumineze.'] },
    { t: 'Două LED-uri în serie', d: 'Curentul trece prin ambele LED-uri, unul după altul, ca prin vagoanele unui tren.', s: [
      'Șina + → <b>rezistor</b> → primul <b>LED</b> → al doilea <b>LED</b> → șina −.',
      'Piciorul scurt al primului LED intră în aceeași coloană cu piciorul lung al celui de-al doilea. În acea coloană nu trebuie să fie nimic altceva.',
      'Simulează — luminează amândouă. Încearcă un rezistor de 220 Ω dacă sunt slabe.'] },
    { t: 'Becul', d: 'Becul are un filament subțire care se înroșește când trece curent prin el. Nu are nevoie de rezistor.', s: [
      'Pune <b>becul</b> între două coloane.',
      'Leagă o parte cu un fir la șina +, iar cealaltă la șina −.',
      'Simulează.'] },
    { t: 'Buzzerul', d: 'Buzzerul transformă curentul în sunet. Pornește sunetul 🔊!', s: [
      'Pune <b>buzzerul</b>: dă clic întâi pe partea care merge spre plus (+).',
      'Leagă-l cu fire la șina + și la șina −.',
      'Simulează și ascultă.'] },
    { t: 'Motorul', d: 'Motorul transformă curentul în rotație.', s: [
      'Pune <b>motorul</b> între două coloane.',
      'Leagă-l cu fire la șina + și la șina −.',
      'Simulează — motorul se învârte! Încearcă să inversezi + și − și urmărește sensul.'] },
    { t: 'Variator cu potențiometru', d: 'Potențiometrul e un rezistor pe care îl schimbi rotindu-l. Cu el alegi cât de tare luminează LED-ul.', s: [
      'Pune <b>potențiometrul</b> în partea de sus — ocupă 3 coloane.',
      'Leagă piciorul din stânga cu un fir la șina +.',
      'Din piciorul din mijloc (cursorul): <b>rezistor</b> → <b>LED</b> → șina −.',
      'Simulează, selectează potențiometrul și mută cursorul.'] },
    { t: 'Fotorezistorul', d: 'Fă un LED care luminează mai tare când e mai multă lumină în jur.', s: [
      'Șina + → <b>fotorezistor</b> → <b>rezistor</b> → <b>LED</b> → șina −.',
      'Simulează și mută cursorul <b>☀ Lumină</b>.',
      'LED-ul trebuie să-și schimbe intensitatea.'] },
    { t: 'Dioda – stradă cu sens unic', d: 'Dioda lasă curentul doar într-un sens. Banda argintie e partea pe unde iese curentul.', s: [
      'Șina + → <b>diodă</b> (dă clic întâi pe partea FĂRĂ bandă) → <b>rezistor</b> → <b>LED</b> → șina −.',
      'Simulează — LED-ul luminează.',
      'Încearcă să întorci dioda: LED-ul se stinge! Pune-o la loc ca să termini nivelul.'] },
    { t: 'Măsurăm curentul', d: 'Ampermetrul se pune ÎN circuit, ca să treacă curentul prin el.', s: [
      'Fă un circuit cu un <b>LED</b> și un <b>rezistor</b>.',
      'Întrerupe circuitul într-un loc și pune acolo un <b>ampermetru</b> (dă clic întâi pe partea spre plus).',
      'Simulează și citește câți miliamperi (mA) trec.'] },
    { t: 'Măsurăm tensiunea', d: 'Voltmetrul se pune PESTE piesă — câte un picior de fiecare parte.', s: [
      'Fă un circuit cu un <b>LED</b> și un <b>rezistor</b>.',
      'Pune <b>voltmetrul</b> cu picioarele în coloanele celor două picioare ale LED-ului.',
      'Simulează: câți volți sunt pe LED?'] },
    { t: 'Repară circuitul', d: 'Cineva a construit acest circuit, dar LED-ul nu se aprinde. Găsește greșeala și repar-o!', s: [
      'Simulează și uită-te la circuit.',
      'Verifică sensul LED-ului: piciorul lung (+) trebuie să fie spre plus.',
      'Șterge piesa greșită și pune-o corect.'] },
    { t: 'Marea finală', d: 'Pornește motorul, aprinde un LED și fă buzzerul să sune — toate în același timp!', s: [
      'Fiecare piesă primește propriul drum de la șina + la șina −.',
      'Nu uita rezistorul pentru LED.',
      'Simulează — totul merge împreună!'] }
  ]
},
bg: {
  name: 'Български', flag: '🇧🇬', html: 'bg',
  ui: {
    title: 'Работилница за електрически вериги', subtitle: 'Сглоби веригата на макетната платка и натисни Симулирай',
    help: 'Помощ', sound: 'Звук', save: 'Запази', myCircuits: 'Моите вериги', clear: 'Изчисти',
    select: 'Избери', undo: 'Отмени', redo: 'Повтори', simulate: 'Симулирай', stop: 'Спри',
    free: 'Свободна игра', learn: 'Хайде да учим', del: 'Изтрий', level: 'Ниво', lessons: 'Уроци',
    step: 'Стъпка', showSolution: 'Покажи решение', resetLesson: 'Започни отначало', light: 'Светлина',
    props: 'Свойства', noSelection: 'Избери инструмента „Избери“ и щракни върху елемент, за да видиш свойствата му.',
    value: 'Съпротивление', color: 'Цвят', position: 'Положение на плъзгача', state: 'Състояние', on: 'Включен', off: 'Изключен',
    pressed: 'Натиснат', released: 'Отпуснат', burnedLabel: 'Изгорял', current: 'Ток', voltage: 'Напрежение',
    lessonFooter: 'Когато свършиш, натисни <b>Симулирай</b>. Ако работи, нивото приключва и отключваш нови елементи 🔓.',
    pickFirst: 'Щракни върху дупката, където започва: {part}.', pickSecond: 'Сега щракни върху втората дупка. (Esc = отказ)',
    pickPot: 'Щракни върху дупка — потенциометърът заема 3 съседни дупки в ред.',
    occupied: 'Тази дупка вече е заета.', sameHole: 'Избери друга дупка.', potBad: 'Тук няма място за потенциометър.',
    locked: 'Този елемент се отключва в по-късен урок.',
    short: '⚠ Късо съединение! Плюсът е свързан направо с минуса и батерията се нагрява. Прекъсни тази връзка.',
    burned: '💥 Светодиодът изгоря — мина твърде много ток. Изтрий го, сложи нов и добави резистор.',
    noPower: 'Веригата не е затворена — токът няма откъде да мине. Върна ли се до шината −?',
    simOn: 'Симулацията работи. Натискай бутони и превключвай ключове!',
    saved: 'Запазено.', loaded: 'Заредено.', copied: 'Кодът е копиран.', importBad: 'Този код не е валиден.',
    lessonDone: 'Браво! Нивото е завършено!', unlockedParts: 'Отключено:', nextLesson: 'Следващ урок', stay: 'Остани тук',
    allDone: 'Завърши всички уроци! Сега опитай свободна игра.', solutionLoaded: 'Това е едно решение. Натисни Симулирай!',
    name: 'Име на веригата', load: 'Отвори', exportCode: 'Код на веригата (изпрати го на приятел)', copy: 'Копирай',
    importLabel: 'Постави код на верига', importBtn: 'Зареди кода', empty: 'Все още няма запазени вериги.', close: 'Затвори',
    confirmClear: 'Да се изтрият ли всички елементи от платката?', yes: 'Да', no: 'Не', done: 'завършено', defaultName: 'Моята верига',
    helpItems: [
      'Избери елемент отляво, после щракни върху две дупки на платката, за да го поставиш.',
      'Дупките в една колона (a–e или f–j) са свързани отдолу. Дългите шини + и − са свързани по цялата дължина.',
      'Батерията от 9 V е свързана към горните шини: + (червена) и − (синя). Долните шини свържи с проводници, ако ти трябват.',
      'С инструмента <b>Избери</b> щракни върху елемент и го изтрий с бутона <b>Изтрий</b> или с клавиша Delete.',
      'Натисни <b>Симулирай</b>, за да видиш как тече токът. По време на симулацията можеш да натискаш бутони и да превключваш ключове.',
      '↶ и ↷ отменят и повтарят ходовете.'
    ]
  },
  cats: { power: 'Източници и проводници', passive: 'Пасивни', out: 'Изходи', sw: 'Ключове', sens: 'Сензори', tools: 'Инструменти' },
  colors: { red: 'Червен', green: 'Зелен', blue: 'Син', yellow: 'Жълт', white: 'Бял', black: 'Черен', orange: 'Оранжев' },
  parts: { wire: 'Проводник', resistor: 'Резистор', led: 'Светодиод', diode: 'Диод', bulb: 'Крушка', buzzer: 'Зумер', motor: 'Мотор', button: 'Бутон', switch: 'Ключ', pot: 'Потенциометър', ldr: 'Фоторезистор', ammeter: 'Амперметър', voltmeter: 'Волтметър', battery: 'Батерия 9 V' },
  info: {
    wire: 'Провежда ток между две точки. Щракни върху първата дупка, после върху втората.',
    resistor: 'Ограничава тока. Без него светодиодът изгаря! Цветните ивици показват стойността в омове (Ω).',
    led: 'Светодиод. Свети само когато токът тече в правилната посока: дългото краче (+) към плюса. Винаги му трябва резистор.',
    diode: 'Пропуска ток само в една посока, като еднопосочен клапан. Сребристата ивица е страната на минуса (−).',
    bulb: 'Крушката свети, когато през жичката ѝ тече ток. Колкото повече ток, толкова по-силно свети.',
    buzzer: 'Зумерът пищи, когато през него тече ток. Първо щракни върху страната към плюса (+).',
    motor: 'Моторът превръща тока във въртене. Ако размениш + и −, се върти в обратна посока.',
    button: 'Бутонът затваря веригата само докато го държиш натиснат. По време на симулацията го натисни с мишката или с пръст.',
    switch: 'Ключът помни положението си: включен или изключен. По време на симулацията щракни върху него, за да го превключиш.',
    pot: 'Променлив резистор с три крачета. Премести плъзгача и токът се променя — като копчето за сила на звука.',
    ldr: 'Съпротивлението му зависи от светлината: на светло е малко, на тъмно — голямо. Светлината се променя с плъзгача ☀.',
    ammeter: 'Мери тока. Свързва се ПОСЛЕДОВАТЕЛНО, в самата верига, за да минава токът през него.',
    voltmeter: 'Мери напрежението между две точки. Свързва се УСПОРЕДНО, върху елемента, който измерваш.',
    battery: 'Батерията от 9 V дава енергия. Плюсът (+) е червената шина, минусът (−) — синята.'
  },
  lessons: [
    { t: 'Запали един светодиод', d: 'Батерия → резистор → светодиод → обратно към −. Твоята първа затворена верига.', s: [
      'Постави <b>проводник</b> от <b>шината +</b> (червена) до една колона в горната част.',
      'Постави <b>резистор</b> от тази колона до колона малко по-надясно.',
      'Постави <b>светодиода</b>: първо щракни в колоната на резистора (дългото краче +), после в следващата свободна колона.',
      'Постави <b>проводник</b> от колоната на късото краче на светодиода до <b>шината −</b> (синя).'] },
    { t: 'Бутон', d: 'Бутонът пали светодиода само докато го държиш. Когато го пуснеш, пружината го отваря.', s: [
      'Направи веригата от първото ниво, но вместо първия проводник сложи <b>бутон</b> между шината + и резистора.',
      'Натисни <b>Симулирай</b> и задръж бутона с мишката или с пръст.',
      'Светодиодът трябва да свети, докато държиш бутона, и да изгасне, когато го пуснеш.'] },
    { t: 'Ключ', d: 'Ключът помни положението си — като ключа за лампата в твоята стая.', s: [
      'Сложи <b>ключ</b> във веригата, между шината + и резистора.',
      'Симулирай и щракни върху ключа, за да го включваш и изключваш.',
      'Остави го включен, за да свети светодиодът.'] },
    { t: 'Два светодиода успоредно', d: 'Всеки светодиод има свой път до батерията. Ако извадиш единия, другият продължава да свети.', s: [
      'Направи две отделни вериги, всяка със свой <b>резистор</b> и <b>светодиод</b>.',
      'И двете започват от <b>шината +</b> и свършват на <b>шината −</b>.',
      'Симулирай — двата светодиода трябва да светят.'] },
    { t: 'Два светодиода последователно', d: 'Токът минава през двата светодиода един след друг, като през вагоните на влак.', s: [
      'Шина + → <b>резистор</b> → първи <b>светодиод</b> → втори <b>светодиод</b> → шина −.',
      'Късото краче на първия светодиод е в същата колона като дългото краче на втория. В тази колона не бива да има нищо друго.',
      'Симулирай — светят и двата. Опитай резистор 220 Ω, ако са слаби.'] },
    { t: 'Крушка', d: 'Крушката има тънка жичка, която се нажежава, когато през нея тече ток. Тя няма нужда от резистор.', s: [
      'Постави <b>крушка</b> между две колони.',
      'Свържи едната страна с проводник към шината +, а другата — към шината −.',
      'Симулирай.'] },
    { t: 'Зумер', d: 'Зумерът превръща тока в звук. Включи звука 🔊!', s: [
      'Постави <b>зумера</b>: първо щракни върху страната към плюса (+).',
      'Свържи го с проводници към шините + и −.',
      'Симулирай и слушай.'] },
    { t: 'Мотор', d: 'Моторът превръща тока във въртене.', s: [
      'Постави <b>мотор</b> между две колони.',
      'Свържи го с проводници към шините + и −.',
      'Симулирай — моторът се върти! Опитай да размениш + и − и гледай посоката.'] },
    { t: 'Димер с потенциометър', d: 'Потенциометърът е резистор, който променяш с въртене. С него избираш колко силно да свети светодиодът.', s: [
      'Постави <b>потенциометъра</b> в горната част — заема 3 колони.',
      'Свържи лявото краче с проводник към шината +.',
      'От средното краче (плъзгача): <b>резистор</b> → <b>светодиод</b> → шина −.',
      'Симулирай, избери потенциометъра и мести плъзгача.'] },
    { t: 'Фоторезистор', d: 'Направи светодиод, който свети по-силно, когато наоколо е по-светло.', s: [
      'Шина + → <b>фоторезистор</b> → <b>резистор</b> → <b>светодиод</b> → шина −.',
      'Симулирай и мести плъзгача <b>☀ Светлина</b>.',
      'Светодиодът трябва да променя яркостта си.'] },
    { t: 'Диод – еднопосочна улица', d: 'Диодът пропуска ток само в една посока. Сребристата ивица е страната, през която токът излиза.', s: [
      'Шина + → <b>диод</b> (първо щракни върху страната БЕЗ ивица) → <b>резистор</b> → <b>светодиод</b> → шина −.',
      'Симулирай — светодиодът свети.',
      'Опитай да обърнеш диода: светодиодът угасва! Върни го, за да завършиш нивото.'] },
    { t: 'Мерим тока', d: 'Амперметърът се слага ВЪВ веригата, за да минава токът през него.', s: [
      'Направи верига със <b>светодиод</b> и <b>резистор</b>.',
      'Прекъсни веригата на едно място и сложи там <b>амперметър</b> (първо щракни върху страната към плюса).',
      'Симулирай и прочети колко милиампера (mA) текат.'] },
    { t: 'Мерим напрежението', d: 'Волтметърът се слага ВЪРХУ елемента — по едно краче от всяка страна.', s: [
      'Направи верига със <b>светодиод</b> и <b>резистор</b>.',
      'Постави <b>волтметъра</b> така, че крачетата му да са в колоните на двете крачета на светодиода.',
      'Симулирай: колко волта има на светодиода?'] },
    { t: 'Поправи веригата', d: 'Някой е сглобил тази верига, но светодиодът не свети. Намери грешката и я поправи!', s: [
      'Симулирай и разгледай веригата.',
      'Провери посоката на светодиода: дългото краче (+) трябва да е към плюса.',
      'Изтрий сгрешения елемент и го постави правилно.'] },
    { t: 'Голям финал', d: 'Завърти мотора, запали светодиод и накарай зумера да звучи — всичко едновременно!', s: [
      'Всеки елемент получава свой път от шината + до шината −.',
      'Не забравяй резистора за светодиода.',
      'Симулирай — всичко работи заедно!'] }
  ]
},
en: {
  name: 'English', flag: '🇬🇧', html: 'en',
  ui: {
    title: 'Circuit Workshop', subtitle: 'Build a circuit on the breadboard and press Simulate',
    help: 'Help', sound: 'Sound', save: 'Save', myCircuits: 'My circuits', clear: 'Clear',
    select: 'Select', undo: 'Undo', redo: 'Redo', simulate: 'Simulate', stop: 'Stop',
    free: 'Free play', learn: "Let's learn", del: 'Delete', level: 'Level', lessons: 'Lessons',
    step: 'Step', showSolution: 'Show solution', resetLesson: 'Start over', light: 'Light',
    props: 'Properties', noSelection: 'Pick the Select tool and click a part to see its properties.',
    value: 'Resistance', color: 'Colour', position: 'Slider position', state: 'State', on: 'On', off: 'Off',
    pressed: 'Pressed', released: 'Released', burnedLabel: 'Burnt out', current: 'Current', voltage: 'Voltage',
    lessonFooter: 'When you are done, press <b>Simulate</b>. If it works, the level is complete and you unlock new parts 🔓.',
    pickFirst: 'Click the hole where it starts: {part}.', pickSecond: 'Now click the second hole. (Esc = cancel)',
    pickPot: 'Click a hole — the potentiometer takes 3 neighbouring holes in a row.',
    occupied: 'That hole is already taken.', sameHole: 'Pick a different hole.', potBad: 'There is no room for a potentiometer here.',
    locked: 'This part unlocks in a later lesson.',
    short: '⚠ Short circuit! Plus is connected straight to minus and the battery is heating up. Break that connection.',
    burned: '💥 The LED burnt out — too much current flowed. Delete it, put in a new one and add a resistor.',
    noPower: 'The circuit is not closed — the current has nowhere to go. Did you get back to the − rail?',
    simOn: 'Simulation running. Press buttons and flip switches!',
    saved: 'Saved.', loaded: 'Loaded.', copied: 'Code copied.', importBad: 'That code is not valid.',
    lessonDone: 'Well done! Level complete!', unlockedParts: 'Unlocked:', nextLesson: 'Next lesson', stay: 'Stay here',
    allDone: 'You finished all the lessons! Now try free play.', solutionLoaded: 'Here is one solution. Press Simulate!',
    name: 'Circuit name', load: 'Open', exportCode: 'Circuit code (send it to a friend)', copy: 'Copy',
    importLabel: 'Paste a circuit code', importBtn: 'Load code', empty: 'No saved circuits yet.', close: 'Close',
    confirmClear: 'Remove all parts from the breadboard?', yes: 'Yes', no: 'No', done: 'done', defaultName: 'My circuit',
    helpItems: [
      'Pick a part on the left, then click two holes on the breadboard to place it.',
      'Holes in the same column (a–e, or f–j) are connected underneath. The long + and − rails are connected along their whole length.',
      'The 9 V battery is connected to the top rails: + (red) and − (blue). Connect the bottom rails with wires if you need them.',
      'With the <b>Select</b> tool, click a part, then remove it with the <b>Delete</b> button or the Delete key.',
      'Press <b>Simulate</b> to see the current flow. While simulating you can press buttons and flip switches.',
      '↶ and ↷ undo and redo your moves.'
    ]
  },
  cats: { power: 'Power and wires', passive: 'Passive', out: 'Outputs', sw: 'Switches', sens: 'Sensors', tools: 'Tools' },
  colors: { red: 'Red', green: 'Green', blue: 'Blue', yellow: 'Yellow', white: 'White', black: 'Black', orange: 'Orange' },
  parts: { wire: 'Wire', resistor: 'Resistor', led: 'LED', diode: 'Diode', bulb: 'Bulb', buzzer: 'Buzzer', motor: 'Motor', button: 'Push button', switch: 'Switch', pot: 'Potentiometer', ldr: 'Light sensor (LDR)', ammeter: 'Ammeter', voltmeter: 'Voltmeter', battery: '9 V battery' },
  info: {
    wire: 'Carries current between two points. Click the first hole, then the second.',
    resistor: 'Limits the current. Without it the LED burns out! The colour bands show its value in ohms (Ω).',
    led: 'Light-emitting diode. It only lights when current flows the right way: long leg (+) towards plus. It always needs a resistor.',
    diode: 'Lets current through in one direction only, like a one-way valve. The silver band is the minus (−) side.',
    bulb: 'A bulb lights up when current flows through its filament. More current, brighter light.',
    buzzer: 'A buzzer beeps when current flows through it. Click the side going to plus (+) first.',
    motor: 'A motor turns current into spinning. Swap + and − and it spins the other way.',
    button: 'A push button closes the circuit only while you hold it down. While simulating, press it with the mouse or your finger.',
    switch: 'A switch remembers its position: on or off. While simulating, click it to flip it.',
    pot: 'A variable resistor with three legs. Move the slider and the current changes — like a volume knob.',
    ldr: 'Its resistance depends on light: small in the light, large in the dark. Change the light with the ☀ slider.',
    ammeter: 'Measures current. It goes IN SERIES, inside the circuit, so the current flows through it.',
    voltmeter: 'Measures the voltage between two points. It goes IN PARALLEL, across the part you are measuring.',
    battery: 'The 9 V battery supplies the energy. Plus (+) is the red rail, minus (−) the blue one.'
  },
  lessons: [
    { t: 'Light up an LED', d: 'Battery → resistor → LED → back to −. Your first closed circuit.', s: [
      'Place a <b>wire</b> from the <b>+ rail</b> (red) to a column in the top half.',
      'Place a <b>resistor</b> from that column to a column a little further right.',
      'Place the <b>LED</b>: click the resistor’s column first (long leg +), then the next free column.',
      'Place a <b>wire</b> from the column of the LED’s short leg to the <b>− rail</b> (blue).'] },
    { t: 'Push button', d: 'The button lights the LED only while you hold it. Let go and the spring opens it.', s: [
      'Build the circuit from level one, but instead of the first wire put a <b>push button</b> between the + rail and the resistor.',
      'Press <b>Simulate</b>, then hold the button with the mouse or your finger.',
      'The LED should light while you hold the button and go out when you let go.'] },
    { t: 'Switch', d: 'A switch remembers its position — like the light switch in your room.', s: [
      'Put a <b>switch</b> into the circuit, between the + rail and the resistor.',
      'Simulate and click the switch to turn it on and off.',
      'Leave it on so the LED lights.'] },
    { t: 'Two LEDs in parallel', d: 'Each LED has its own path to the battery. Take one out and the other keeps shining.', s: [
      'Build two separate circuits, each with its own <b>resistor</b> and <b>LED</b>.',
      'Both start at the <b>+ rail</b> and end at the <b>− rail</b>.',
      'Simulate — both LEDs should light.'] },
    { t: 'Two LEDs in series', d: 'The current flows through both LEDs, one after the other, like through the carriages of a train.', s: [
      '+ rail → <b>resistor</b> → first <b>LED</b> → second <b>LED</b> → − rail.',
      'The short leg of the first LED goes in the same column as the long leg of the second. Nothing else may be in that column.',
      'Simulate — both light. Try a 220 Ω resistor if they are dim.'] },
    { t: 'Bulb', d: 'A bulb has a thin filament that glows when current flows through it. It does not need a resistor.', s: [
      'Place a <b>bulb</b> between two columns.',
      'Connect one side with a wire to the + rail and the other to the − rail.',
      'Simulate.'] },
    { t: 'Buzzer', d: 'A buzzer turns current into sound. Turn the sound on 🔊!', s: [
      'Place the <b>buzzer</b>: click the side going to plus (+) first.',
      'Connect it with wires to the + and − rails.',
      'Simulate and listen.'] },
    { t: 'Motor', d: 'A motor turns current into spinning.', s: [
      'Place a <b>motor</b> between two columns.',
      'Connect it with wires to the + and − rails.',
      'Simulate — the motor spins! Try swapping + and − and watch the direction.'] },
    { t: 'Dimmer with a potentiometer', d: 'A potentiometer is a resistor you change by turning it. Use it to choose how brightly the LED shines.', s: [
      'Place a <b>potentiometer</b> in the top half — it takes 3 columns.',
      'Connect the left leg with a wire to the + rail.',
      'From the middle leg (the wiper): <b>resistor</b> → <b>LED</b> → − rail.',
      'Simulate, select the potentiometer and move its slider.'] },
    { t: 'Light sensor', d: 'Make an LED that shines brighter when it is lighter around it.', s: [
      '+ rail → <b>light sensor</b> → <b>resistor</b> → <b>LED</b> → − rail.',
      'Simulate and move the <b>☀ Light</b> slider.',
      'The LED should change its brightness.'] },
    { t: 'Diode – a one-way street', d: 'A diode lets current through in one direction only. The silver band marks the side where current leaves.', s: [
      '+ rail → <b>diode</b> (click the side WITHOUT the band first) → <b>resistor</b> → <b>LED</b> → − rail.',
      'Simulate — the LED lights.',
      'Try turning the diode around: the LED goes out! Put it back to finish the level.'] },
    { t: 'Measuring current', d: 'An ammeter goes INTO the circuit, so the current flows through it.', s: [
      'Build a circuit with an <b>LED</b> and a <b>resistor</b>.',
      'Break the circuit in one place and put an <b>ammeter</b> there (click the plus side first).',
      'Simulate and read how many milliamps (mA) flow.'] },
    { t: 'Measuring voltage', d: 'A voltmeter goes ACROSS a part — one leg on each side.', s: [
      'Build a circuit with an <b>LED</b> and a <b>resistor</b>.',
      'Place a <b>voltmeter</b> with its legs in the columns of the LED’s two legs.',
      'Simulate: how many volts are across the LED?'] },
    { t: 'Fix the circuit', d: 'Someone built this circuit, but the LED does not light. Find the mistake and fix it!', s: [
      'Simulate and look at the circuit.',
      'Check the LED’s direction: the long leg (+) must face plus.',
      'Delete the wrong part and place it correctly.'] },
    { t: 'Grand finale', d: 'Spin the motor, light an LED and sound the buzzer — all at the same time!', s: [
      'Each part gets its own path from the + rail to the − rail.',
      'Don’t forget the resistor for the LED.',
      'Simulate — everything works together!'] }
  ]
}
};
if (typeof module !== 'undefined') module.exports = I18N;
