/* Additions for the extended parts set and lessons 16–22; merged into I18N. */
(() => {
const X = {
sr: {
  ui: {
    pickRow: 'Klikni na prvu rupicu — {part} zauzima {n} susedne rupice u redu.', rowBad: 'Ovde nema mesta — potrebno je više susednih rupica u redu.',
    temp: 'Temperatura', tiltLbl: 'Nagib', rotLbl: 'Okretanje', gasLbl: 'Gas u vazduhu', leak: 'ventil pušta gas',
    magnetNear: 'Magnet je blizu', magnetFar: 'Primakni magnet', irRemote: 'IC daljinski', irHold: 'Drži pritisnuto', irFixed: 'Fiksno', irStop: 'Stop',
    capacitance: 'Kapacitet', meterMode: 'Šta meri', spdtPos: 'Položaj', pinsLbl: 'Nožice', outV: 'Izlaz',
    q_off: 'zatvoren (ne vodi)', q_act: 'otvoren (pojačava)', q_sat: 'potpuno otvoren', relayOn: 'kontakt zatvoren', relayOff: 'kontakt otvoren',
    valveOpen: 'otvoren', valveClosed: 'zatvoren'
  },
  cats: { motion: 'Kretanje i rotacija', ir: 'Infracrveno (bez žice)' },
  parts: { battery: 'Baterija 9 V', lemon: 'Limun', potato: 'Krompir', capacitor: 'Kondenzator', rgb: 'RGB LED', valve: 'Ventil za gas', spdt: 'Preklopnik', npn: 'Tranzistor', relay: 'Relej', ntc: 'Senzor temperature', tilt: 'Senzor nagiba', touch: 'Senzor dodira', reed: 'Magnetni senzor', gas: 'Senzor gasa', accel: 'Akcelerometar', gyro: 'Žiroskop', irrx: 'IC prijemnik', multimeter: 'Multimetar' },
  info: {
    battery: 'Još jedna baterija od 9 V. Crveni kraj (+) je plus.',
    lemon: 'Voćna baterija: bakar (Cu) je +, cink (Zn) je −. Jedan limun daje oko 1 V — za LED spoji tri redno.',
    potato: 'Krompir-baterija daje oko 0,85 V i malo struje. Spoji ih nekoliko redno.',
    capacitor: 'Čuva električnu energiju kao mali rezervoar. Puni se dok ima struje, a prazni kad je nestane. Pazi na + nožicu.',
    rgb: 'Tri LED-a u jednom: crveni, zeleni i plavi. Zajednička nožica (−) ide na minus. Mešanjem boja dobijaš nove boje.',
    valve: 'Elektromagnetni ventil: kad kroz njega teče struja, otvara se i pušta gas.',
    spdt: 'Preklopnik ima srednju nožicu (C) koju spaja ili sa A ili sa B. Tokom simulacije klikni da ga prebaciš.',
    npn: 'Tranzistor je elektronski prekidač: mala struja u bazu (B) pušta veliku struju od kolektora (C) do emitera (E).',
    relay: 'Relej: kad struja teče kroz kalem (~ ~), magnet privuče kontakt i spoji C sa NO. Tako malo kolo uključuje drugo, veliko.',
    ntc: 'Termistor: što je toplije, otpor mu je manji. Temperaturu menjaš klizačem 🌡.',
    tilt: 'U njemu je kuglica. Kad se nagne više od 45°, kuglica spoji kontakte. Nagib menjaš klizačem 📐.',
    touch: 'Senzor dodira: spaja kolo dok ga dodiruješ. Tokom simulacije pritisni ga prstom ili mišem.',
    reed: 'Magnetni (rid) prekidač: spoji se kad mu primakneš magnet 🧲.',
    gas: 'Senzor gasa: kad u vazduhu ima više gasa, otpor mu pada. Količinu gasa menjaš klizačem 💨.',
    accel: 'Akcelerometar oseća nagib. Spoji + i −, a izlaz S daje veći napon što je nagib veći.',
    gyro: 'Žiroskop oseća okretanje. Spoji + i −, a izlaz S daje veći napon što se brže okreće.',
    irrx: 'IC prijemnik hvata nevidljivo svetlo daljinskog upravljača. Dok daljinski šalje signal, izlaz S je uključen.',
    multimeter: 'Multimetar meri napon (V) ili struju (mA). Izaberi šta meri u svojstvima — za struju ide redno, za napon paralelno.'
  },
  pinNames: { rgb: ['crvena', 'zajednička', 'zelena', 'plava'], spdt: ['strana A', 'sredina', 'strana B'], npn: ['emiter', 'baza', 'kolektor'], relay: ['kalem', 'kalem', 'zajednički', 'radni kontakt'], accel: ['plus', 'signal', 'minus'], gyro: ['plus', 'signal', 'minus'], irrx: ['plus', 'signal', 'minus'] },
  helpExtra: 'Kad postaviš senzor, iznad protoborda se pojavljuju kontrole: svetlo, temperatura, nagib, gas, magnet i IC daljinski.',
  lessons: [
    { t: 'Voćna baterija', d: 'Limun i krompir mogu da prave struju! Jedan daje malo napona, zato ih spajamo redno. Za ovaj nivo ne koristiš veliku bateriju.', s: [
      'Postavi tri <b>limuna</b> u donji deo, jedan za drugim: − (Zn) jednog u istu kolonu kao + (Cu) sledećeg.',
      'Postavi <b>LED</b>: duža nožica u kolonu + prvog limuna.',
      'Kratku nožicu LED-a spoji <b>žicom</b> sa − poslednjeg limuna.',
      'Simuliraj — LED slabo svetli. Probaj i sa krompirima!'] },
    { t: 'Kondenzator', d: 'Kondenzator je mali rezervoar struje. Kad pustiš taster, LED još malo svetli dok se kondenzator prazni.', s: [
      'Postavi <b>taster</b> od + šine do jedne kolone.',
      'Iz te kolone postavi <b>kondenzator</b> (+ nožica u kolonu) do − šine.',
      'Iz iste kolone: <b>otpornik</b> → <b>LED</b> → − šina.',
      'Simuliraj, drži taster par sekundi, pa pusti. LED se polako gasi.'] },
    { t: 'Tranzistor kao prekidač', d: 'Mala struja kroz bazu tranzistora pali veliku sijalicu.', s: [
      'Postavi <b>tranzistor</b> u donji deo: nožice E, B, C.',
      '+ šina → <b>taster</b> → <b>otpornik 10 kΩ</b> → baza (B).',
      '+ šina → <b>sijalica</b> → kolektor (C).',
      'Emiter (E) spoji na − (donju − šinu spoji sa gornjom).',
      'Simuliraj i drži taster.'] },
    { t: 'Noćno svetlo', d: 'Napravi svetlo koje se samo pali kad padne mrak — sa fotootpornikom i tranzistorom.', s: [
      '+ šina → <b>otpornik 10 kΩ</b> → kolona X, a iz kolone X <b>fotootpornik</b> → − šina.',
      'Iz kolone X <b>otpornik 1 kΩ</b> → baza tranzistora.',
      '+ šina → otpornik → <b>LED</b> → kolektor; emiter → −.',
      'Simuliraj i pomeraj ☀ Svetlo: u mraku LED svetli, na svetlu se gasi.'] },
    { t: 'Relej', d: 'Relej je prekidač koji pomera magnet. Malo kolo sa tasterom uključuje drugo kolo sa motorom.', s: [
      'Postavi <b>relej</b> u donji deo: dve nožice kalema (~ ~), pa C i NO.',
      '+ šina → <b>taster</b> → prvi ~; drugi ~ → − šina.',
      '+ šina → C; NO → <b>motor</b> → − šina.',
      'Simuliraj i drži taster — čuješ „klik“ i motor kreće.'] },
    { t: 'RGB LED', d: 'U RGB LED-u su tri svetla: crveno, zeleno i plavo. Kad upališ dva ili tri, boje se mešaju!', s: [
      'Postavi <b>RGB LED</b> — zauzima 4 kolone: R, −, G, B.',
      'Zajedničku nožicu (−) spoji na − šinu.',
      'Na R, G i B dovedi struju sa + šine, svaku kroz svoj <b>otpornik</b>.',
      'Simuliraj — upali bar dve boje odjednom.'] },
    { t: 'Senzori', d: 'Senzori osećaju svet oko sebe: toplotu, nagib, dodir, magnet, gas, pokret i daljinski upravljač.', s: [
      'Izaberi jedan <b>senzor</b> (npr. magnetni) i stavi ga u kolo sa otpornikom i LED-om.',
      'Moduli (akcelerometar, žiroskop, IC prijemnik) imaju nožice +, S, −: + na plus, − na minus, a S kroz otpornik na LED.',
      'Simuliraj i menjaj okolinu kontrolama iznad protoborda — LED treba da se pali i gasi.'] }
  ]
},
mk: {
  ui: {
    pickRow: 'Кликни на првата дупка — {part} зафаќа {n} соседни дупки во ред.', rowBad: 'Тука нема место — потребни се повеќе соседни дупки во ред.',
    temp: 'Температура', tiltLbl: 'Наклон', rotLbl: 'Вртење', gasLbl: 'Гас во воздухот', leak: 'вентилот пушта гас',
    magnetNear: 'Магнетот е блиску', magnetFar: 'Приближи магнет', irRemote: 'IC далечински', irHold: 'Држи притиснато', irFixed: 'Фиксно', irStop: 'Стоп',
    capacitance: 'Капацитет', meterMode: 'Што мери', spdtPos: 'Положба', pinsLbl: 'Ножички', outV: 'Излез',
    q_off: 'затворен (не спроведува)', q_act: 'отворен (засилува)', q_sat: 'целосно отворен', relayOn: 'контактот е затворен', relayOff: 'контактот е отворен',
    valveOpen: 'отворен', valveClosed: 'затворен'
  },
  cats: { motion: 'Движење и вртење', ir: 'Инфрацрвено (без жица)' },
  parts: { battery: 'Батерија 9 V', lemon: 'Лимон', potato: 'Компир', capacitor: 'Кондензатор', rgb: 'RGB LED', valve: 'Вентил за гас', spdt: 'Преклопник', npn: 'Транзистор', relay: 'Реле', ntc: 'Сензор за температура', tilt: 'Сензор за наклон', touch: 'Сензор за допир', reed: 'Магнетен сензор', gas: 'Сензор за гас', accel: 'Акцелерометар', gyro: 'Жироскоп', irrx: 'IC приемник', multimeter: 'Мултиметар' },
  info: {
    battery: 'Уште една батерија од 9 V. Црвениот крај (+) е плусот.',
    lemon: 'Овошна батерија: бакарот (Cu) е +, цинкот (Zn) е −. Еден лимон дава околу 1 V — за LED поврзи три сериски.',
    potato: 'Компир-батеријата дава околу 0,85 V и малку струја. Поврзи неколку сериски.',
    capacitor: 'Чува електрична енергија како мал резервоар. Се полни додека има струја, а се празни кога ќе ја снема. Внимавај на + ножичката.',
    rgb: 'Три LED-а во еден: црвен, зелен и син. Заедничката ножичка (−) оди на минус. Со мешање на боите добиваш нови бои.',
    valve: 'Електромагнетен вентил: кога низ него тече струја, се отвора и пушта гас.',
    spdt: 'Преклопникот ја поврзува средната ножичка (C) или со A или со B. За време на симулацијата кликни за да го префрлиш.',
    npn: 'Транзисторот е електронски прекинувач: мала струја во базата (B) пушта голема струја од колекторот (C) до емитерот (E).',
    relay: 'Реле: кога струја тече низ калемот (~ ~), магнетот го привлекува контактот и ги поврзува C и NO. Така мало коло вклучува друго, големо коло.',
    ntc: 'Термистор: колку е потопло, толку отпорот му е помал. Температурата ја менуваш со лизгачот 🌡.',
    tilt: 'Во него има топче. Кога ќе се наклони повеќе од 45°, топчето ги поврзува контактите. Наклонот го менуваш со лизгачот 📐.',
    touch: 'Сензор за допир: го затвора колото додека го допираш. За време на симулацијата притисни го со прст или со глувчето.',
    reed: 'Магнетен (рид) прекинувач: се затвора кога ќе му приближиш магнет 🧲.',
    gas: 'Сензор за гас: кога во воздухот има повеќе гас, отпорот му опаѓа. Количината на гас ја менуваш со лизгачот 💨.',
    accel: 'Акцелерометарот чувствува наклон. Поврзи + и −, а излезот S дава поголем напон колку е поголем наклонот.',
    gyro: 'Жироскопот чувствува вртење. Поврзи + и −, а излезот S дава поголем напон колку побрзо се врти.',
    irrx: 'IC приемникот ја фаќа невидливата светлина од далечинскиот управувач. Додека далечинскиот праќа сигнал, излезот S е вклучен.',
    multimeter: 'Мултиметарот мери напон (V) или струја (mA). Избери што мери во својствата — за струја се става сериски, за напон паралелно.'
  },
  pinNames: { rgb: ['црвена', 'заедничка', 'зелена', 'сина'], spdt: ['страна A', 'средина', 'страна B'], npn: ['емитер', 'база', 'колектор'], relay: ['калем', 'калем', 'заеднички', 'работен контакт'], accel: ['плус', 'сигнал', 'минус'], gyro: ['плус', 'сигнал', 'минус'], irrx: ['плус', 'сигнал', 'минус'] },
  helpExtra: 'Кога ќе поставиш сензор, над плочата се појавуваат контроли: светлина, температура, наклон, гас, магнет и IC далечински.',
  lessons: [
    { t: 'Овошна батерија', d: 'Лимонот и компирот можат да прават струја! Еден дава мал напон, затоа ги поврзуваме сериски. За ова ниво не ја користиш големата батерија.', s: [
      'Постави три <b>лимони</b> во долниот дел, еден по друг: − (Zn) на едниот во иста колона со + (Cu) на следниот.',
      'Постави <b>LED</b>: подолгата ножичка во колоната на + од првиот лимон.',
      'Кратката ножичка на LED-от поврзи ја со <b>жица</b> со − на последниот лимон.',
      'Симулирај — LED-от слабо свети. Пробај и со компири!'] },
    { t: 'Кондензатор', d: 'Кондензаторот е мал резервоар за струја. Кога ќе го пуштиш копчето, LED-от уште малку свети додека кондензаторот се празни.', s: [
      'Постави <b>копче</b> од + шината до една колона.',
      'Од таа колона постави <b>кондензатор</b> (+ ножичката во колоната) до − шината.',
      'Од истата колона: <b>отпорник</b> → <b>LED</b> → − шина.',
      'Симулирај, држи го копчето неколку секунди, па пушти. LED-от полека се гаси.'] },
    { t: 'Транзистор како прекинувач', d: 'Мала струја низ базата на транзисторот пали голема сијалица.', s: [
      'Постави <b>транзистор</b> во долниот дел: ножички E, B, C.',
      '+ шина → <b>копче</b> → <b>отпорник 10 kΩ</b> → база (B).',
      '+ шина → <b>сијалица</b> → колектор (C).',
      'Емитерот (E) поврзи го на − (долната − шина поврзи ја со горната).',
      'Симулирај и држи го копчето.'] },
    { t: 'Ноќно светло', d: 'Направи светло што само се пали кога ќе се стемни — со фотоотпорник и транзистор.', s: [
      '+ шина → <b>отпорник 10 kΩ</b> → колона X, а од колоната X <b>фотоотпорник</b> → − шина.',
      'Од колоната X <b>отпорник 1 kΩ</b> → база на транзисторот.',
      '+ шина → отпорник → <b>LED</b> → колектор; емитер → −.',
      'Симулирај и мрдај го ☀ Светлина: во темно LED-от свети, на светло се гаси.'] },
    { t: 'Реле', d: 'Релето е прекинувач што го мрда магнет. Мало коло со копче вклучува друго коло со мотор.', s: [
      'Постави <b>реле</b> во долниот дел: две ножички на калемот (~ ~), па C и NO.',
      '+ шина → <b>копче</b> → првиот ~; вториот ~ → − шина.',
      '+ шина → C; NO → <b>мотор</b> → − шина.',
      'Симулирај и држи го копчето — се слуша „клик“ и моторот тргнува.'] },
    { t: 'RGB LED', d: 'Во RGB LED-от има три светла: црвено, зелено и сино. Кога ќе запалиш две или три, боите се мешаат!', s: [
      'Постави <b>RGB LED</b> — зафаќа 4 колони: R, −, G, B.',
      'Заедничката ножичка (−) поврзи ја на − шината.',
      'На R, G и B доведи струја од + шината, секоја низ свој <b>отпорник</b>.',
      'Симулирај — запали барем две бои одеднаш.'] },
    { t: 'Сензори', d: 'Сензорите го чувствуваат светот околу нив: топлина, наклон, допир, магнет, гас, движење и далечински управувач.', s: [
      'Избери еден <b>сензор</b> (на пр. магнетен) и стави го во коло со отпорник и LED.',
      'Модулите (акцелерометар, жироскоп, IC приемник) имаат ножички +, S, −: + на плус, − на минус, а S низ отпорник на LED.',
      'Симулирај и менувај ја околината со контролите над плочата — LED-от треба да се пали и гаси.'] }
  ]
},
ro: {
  ui: {
    pickRow: 'Dă clic pe prima gaură — {part} ocupă {n} găuri vecine pe rând.', rowBad: 'Nu e loc aici — trebuie mai multe găuri vecine pe rând.',
    temp: 'Temperatură', tiltLbl: 'Înclinare', rotLbl: 'Rotație', gasLbl: 'Gaz în aer', leak: 'supapa eliberează gaz',
    magnetNear: 'Magnetul e aproape', magnetFar: 'Apropie magnetul', irRemote: 'Telecomandă IR', irHold: 'Ține apăsat', irFixed: 'Fix', irStop: 'Stop',
    capacitance: 'Capacitate', meterMode: 'Ce măsoară', spdtPos: 'Poziția', pinsLbl: 'Picioare', outV: 'Ieșire',
    q_off: 'blocat (nu conduce)', q_act: 'deschis (amplifică)', q_sat: 'complet deschis', relayOn: 'contact închis', relayOff: 'contact deschis',
    valveOpen: 'deschisă', valveClosed: 'închisă'
  },
  cats: { motion: 'Mișcare și rotație', ir: 'Infraroșu (fără fir)' },
  parts: { battery: 'Baterie 9 V', lemon: 'Lămâie', potato: 'Cartof', capacitor: 'Condensator', rgb: 'LED RGB', valve: 'Supapă de gaz', spdt: 'Comutator', npn: 'Tranzistor', relay: 'Releu', ntc: 'Senzor de temperatură', tilt: 'Senzor de înclinare', touch: 'Senzor tactil', reed: 'Senzor magnetic', gas: 'Senzor de gaz', accel: 'Accelerometru', gyro: 'Giroscop', irrx: 'Receptor IR', multimeter: 'Multimetru' },
  info: {
    battery: 'Încă o baterie de 9 V. Capătul roșu (+) e plusul.',
    lemon: 'Baterie din fructe: cuprul (Cu) e +, zincul (Zn) e −. O lămâie dă cam 1 V — pentru un LED leagă trei în serie.',
    potato: 'Bateria din cartof dă cam 0,85 V și puțin curent. Leagă mai mulți în serie.',
    capacitor: 'Păstrează energie electrică, ca un mic rezervor. Se încarcă cât are curent și se descarcă atunci când curentul dispare. Atenție la piciorul +.',
    rgb: 'Trei LED-uri într-unul: roșu, verde și albastru. Piciorul comun (−) merge la minus. Amestecând culorile obții culori noi.',
    valve: 'Supapă electromagnetică: când trece curent prin ea, se deschide și lasă gazul să iasă.',
    spdt: 'Comutatorul leagă piciorul din mijloc (C) fie cu A, fie cu B. În timpul simulării dă clic ca să-l comuți.',
    npn: 'Tranzistorul e un întrerupător electronic: un curent mic în bază (B) lasă să treacă un curent mare de la colector (C) la emitor (E).',
    relay: 'Releu: când trece curent prin bobină (~ ~), magnetul atrage contactul și leagă C cu NO. Așa un circuit mic pornește alt circuit, mare.',
    ntc: 'Termistor: cu cât e mai cald, cu atât rezistența lui e mai mică. Temperatura o schimbi din cursorul 🌡.',
    tilt: 'Înăuntru are o bilă. Când se înclină peste 45°, bila leagă contactele. Înclinarea o schimbi din cursorul 📐.',
    touch: 'Senzor tactil: închide circuitul cât îl atingi. În timpul simulării apasă-l cu degetul sau cu mouse-ul.',
    reed: 'Întrerupător magnetic (reed): se închide când apropii un magnet 🧲.',
    gas: 'Senzor de gaz: când e mai mult gaz în aer, rezistența lui scade. Cantitatea de gaz o schimbi din cursorul 💨.',
    accel: 'Accelerometrul simte înclinarea. Leagă + și −, iar ieșirea S dă o tensiune mai mare cu cât înclinarea e mai mare.',
    gyro: 'Giroscopul simte rotația. Leagă + și −, iar ieșirea S dă o tensiune mai mare cu cât se rotește mai repede.',
    irrx: 'Receptorul IR prinde lumina invizibilă a telecomenzii. Cât timp telecomanda trimite semnal, ieșirea S e pornită.',
    multimeter: 'Multimetrul măsoară tensiunea (V) sau curentul (mA). Alege ce măsoară în proprietăți — pentru curent se pune în serie, pentru tensiune în paralel.'
  },
  pinNames: { rgb: ['roșu', 'comun', 'verde', 'albastru'], spdt: ['partea A', 'mijloc', 'partea B'], npn: ['emitor', 'bază', 'colector'], relay: ['bobină', 'bobină', 'comun', 'contact normal deschis'], accel: ['plus', 'semnal', 'minus'], gyro: ['plus', 'semnal', 'minus'], irrx: ['plus', 'semnal', 'minus'] },
  helpExtra: 'Când pui un senzor, deasupra breadboardului apar controale: lumină, temperatură, înclinare, gaz, magnet și telecomanda IR.',
  lessons: [
    { t: 'Bateria din fructe', d: 'Lămâia și cartoful pot face curent! Unul singur dă puțină tensiune, de aceea le legăm în serie. La acest nivel nu folosești bateria mare.', s: [
      'Pune trei <b>lămâi</b> în partea de jos, una după alta: − (Zn) al uneia în aceeași coloană cu + (Cu) al următoarei.',
      'Pune <b>LED-ul</b>: piciorul lung în coloana + a primei lămâi.',
      'Leagă piciorul scurt al LED-ului cu un <b>fir</b> la − al ultimei lămâi.',
      'Simulează — LED-ul luminează slab. Încearcă și cu cartofi!'] },
    { t: 'Condensatorul', d: 'Condensatorul e un mic rezervor de curent. Când eliberezi butonul, LED-ul mai luminează puțin cât se descarcă condensatorul.', s: [
      'Pune un <b>buton</b> de la șina + la o coloană.',
      'Din acea coloană pune un <b>condensator</b> (piciorul + în coloană) până la șina −.',
      'Din aceeași coloană: <b>rezistor</b> → <b>LED</b> → șina −.',
      'Simulează, ține butonul câteva secunde, apoi eliberează-l. LED-ul se stinge încet.'] },
    { t: 'Tranzistorul ca întrerupător', d: 'Un curent mic prin baza tranzistorului aprinde un bec mare.', s: [
      'Pune un <b>tranzistor</b> în partea de jos: picioarele E, B, C.',
      'Șina + → <b>buton</b> → <b>rezistor de 10 kΩ</b> → bază (B).',
      'Șina + → <b>bec</b> → colector (C).',
      'Leagă emitorul (E) la − (leagă șina − de jos cu cea de sus).',
      'Simulează și ține butonul.'] },
    { t: 'Lumina de noapte', d: 'Fă o lumină care se aprinde singură când se întunecă — cu fotorezistor și tranzistor.', s: [
      'Șina + → <b>rezistor de 10 kΩ</b> → coloana X, iar din coloana X <b>fotorezistor</b> → șina −.',
      'Din coloana X <b>rezistor de 1 kΩ</b> → baza tranzistorului.',
      'Șina + → rezistor → <b>LED</b> → colector; emitor → −.',
      'Simulează și mută ☀ Lumină: pe întuneric LED-ul luminează, la lumină se stinge.'] },
    { t: 'Releul', d: 'Releul e un întrerupător mișcat de un magnet. Un circuit mic cu buton pornește alt circuit cu motor.', s: [
      'Pune <b>releul</b> în partea de jos: două picioare de bobină (~ ~), apoi C și NO.',
      'Șina + → <b>buton</b> → primul ~; al doilea ~ → șina −.',
      'Șina + → C; NO → <b>motor</b> → șina −.',
      'Simulează și ține butonul — se aude „clic” și motorul pornește.'] },
    { t: 'LED-ul RGB', d: 'În LED-ul RGB sunt trei lumini: roșie, verde și albastră. Când aprinzi două sau trei, culorile se amestecă!', s: [
      'Pune <b>LED-ul RGB</b> — ocupă 4 coloane: R, −, G, B.',
      'Leagă piciorul comun (−) la șina −.',
      'La R, G și B adu curent de la șina +, fiecare prin <b>rezistorul</b> lui.',
      'Simulează — aprinde cel puțin două culori deodată.'] },
    { t: 'Senzorii', d: 'Senzorii simt lumea din jur: căldura, înclinarea, atingerea, magnetul, gazul, mișcarea și telecomanda.', s: [
      'Alege un <b>senzor</b> (de ex. cel magnetic) și pune-l într-un circuit cu rezistor și LED.',
      'Modulele (accelerometru, giroscop, receptor IR) au picioarele +, S, −: + la plus, − la minus, iar S prin rezistor la LED.',
      'Simulează și schimbă mediul din controalele de deasupra breadboardului — LED-ul trebuie să se aprindă și să se stingă.'] }
  ]
},
bg: {
  ui: {
    pickRow: 'Щракни върху първата дупка — {part} заема {n} съседни дупки в ред.', rowBad: 'Тук няма място — трябват повече съседни дупки в ред.',
    temp: 'Температура', tiltLbl: 'Наклон', rotLbl: 'Въртене', gasLbl: 'Газ във въздуха', leak: 'вентилът пуска газ',
    magnetNear: 'Магнитът е близо', magnetFar: 'Приближи магнит', irRemote: 'ИЧ дистанционно', irHold: 'Задръж', irFixed: 'Постоянно', irStop: 'Стоп',
    capacitance: 'Капацитет', meterMode: 'Какво мери', spdtPos: 'Положение', pinsLbl: 'Крачета', outV: 'Изход',
    q_off: 'запушен (не провежда)', q_act: 'отпушен (усилва)', q_sat: 'напълно отпушен', relayOn: 'контактът е затворен', relayOff: 'контактът е отворен',
    valveOpen: 'отворен', valveClosed: 'затворен'
  },
  cats: { motion: 'Движение и въртене', ir: 'Инфрачервено (без кабел)' },
  parts: { battery: 'Батерия 9 V', lemon: 'Лимон', potato: 'Картоф', capacitor: 'Кондензатор', rgb: 'RGB светодиод', valve: 'Газов вентил', spdt: 'Превключвател', npn: 'Транзистор', relay: 'Реле', ntc: 'Температурен сензор', tilt: 'Сензор за наклон', touch: 'Сензор за допир', reed: 'Магнитен сензор', gas: 'Газов сензор', accel: 'Акселерометър', gyro: 'Жироскоп', irrx: 'ИЧ приемник', multimeter: 'Мултиметър' },
  info: {
    battery: 'Още една батерия от 9 V. Червеният край (+) е плюсът.',
    lemon: 'Плодова батерия: медта (Cu) е +, цинкът (Zn) е −. Един лимон дава около 1 V — за светодиод свържи три последователно.',
    potato: 'Картофената батерия дава около 0,85 V и малко ток. Свържи няколко последователно.',
    capacitor: 'Пази електрическа енергия като малък резервоар. Зарежда се, докато има ток, и се разрежда, когато токът изчезне. Внимавай за крачето +.',
    rgb: 'Три светодиода в един: червен, зелен и син. Общото краче (−) отива към минуса. Като смесваш цветовете, получаваш нови цветове.',
    valve: 'Електромагнитен вентил: когато през него тече ток, се отваря и пуска газ.',
    spdt: 'Превключвателят свързва средното краче (C) или с A, или с B. По време на симулацията щракни, за да го превключиш.',
    npn: 'Транзисторът е електронен ключ: малък ток в базата (B) пропуска голям ток от колектора (C) към емитера (E).',
    relay: 'Реле: когато през бобината (~ ~) тече ток, магнитът привлича контакта и свързва C с NO. Така малка верига включва друга, голяма верига.',
    ntc: 'Термистор: колкото е по-топло, толкова съпротивлението му е по-малко. Температурата се променя с плъзгача 🌡.',
    tilt: 'Вътре има топче. Когато се наклони повече от 45°, топчето свързва контактите. Наклонът се променя с плъзгача 📐.',
    touch: 'Сензор за допир: затваря веригата, докато го докосваш. По време на симулацията го натисни с пръст или с мишката.',
    reed: 'Магнитен (рийд) ключ: затваря се, когато приближиш магнит 🧲.',
    gas: 'Газов сензор: когато във въздуха има повече газ, съпротивлението му намалява. Количеството газ се променя с плъзгача 💨.',
    accel: 'Акселерометърът усеща наклон. Свържи + и −, а изходът S дава по-голямо напрежение, колкото по-голям е наклонът.',
    gyro: 'Жироскопът усеща въртене. Свържи + и −, а изходът S дава по-голямо напрежение, колкото по-бързо се върти.',
    irrx: 'ИЧ приемникът улавя невидимата светлина на дистанционното. Докато дистанционното изпраща сигнал, изходът S е включен.',
    multimeter: 'Мултиметърът мери напрежение (V) или ток (mA). Избери какво мери в свойствата — за ток се свързва последователно, за напрежение успоредно.'
  },
  pinNames: { rgb: ['червен', 'общ', 'зелен', 'син'], spdt: ['страна A', 'среда', 'страна B'], npn: ['емитер', 'база', 'колектор'], relay: ['бобина', 'бобина', 'общ', 'нормално отворен'], accel: ['плюс', 'сигнал', 'минус'], gyro: ['плюс', 'сигнал', 'минус'], irrx: ['плюс', 'сигнал', 'минус'] },
  helpExtra: 'Когато поставиш сензор, над платката се появяват контроли: светлина, температура, наклон, газ, магнит и ИЧ дистанционно.',
  lessons: [
    { t: 'Плодова батерия', d: 'Лимонът и картофът могат да правят ток! Един дава малко напрежение, затова ги свързваме последователно. На това ниво не използваш голямата батерия.', s: [
      'Постави три <b>лимона</b> в долната част, един след друг: − (Zn) на единия в същата колона като + (Cu) на следващия.',
      'Постави <b>светодиода</b>: дългото краче в колоната на + на първия лимон.',
      'Свържи късото краче на светодиода с <b>проводник</b> към − на последния лимон.',
      'Симулирай — светодиодът свети слабо. Опитай и с картофи!'] },
    { t: 'Кондензатор', d: 'Кондензаторът е малък резервоар за ток. Когато пуснеш бутона, светодиодът свети още малко, докато кондензаторът се разрежда.', s: [
      'Постави <b>бутон</b> от шината + до една колона.',
      'От тази колона постави <b>кондензатор</b> (крачето + в колоната) до шината −.',
      'От същата колона: <b>резистор</b> → <b>светодиод</b> → шина −.',
      'Симулирай, задръж бутона няколко секунди и го пусни. Светодиодът угасва бавно.'] },
    { t: 'Транзисторът като ключ', d: 'Малък ток през базата на транзистора пали голяма крушка.', s: [
      'Постави <b>транзистор</b> в долната част: крачета E, B, C.',
      'Шина + → <b>бутон</b> → <b>резистор 10 kΩ</b> → база (B).',
      'Шина + → <b>крушка</b> → колектор (C).',
      'Свържи емитера (E) към − (свържи долната шина − с горната).',
      'Симулирай и задръж бутона.'] },
    { t: 'Нощна лампа', d: 'Направи лампа, която сама светва, когато се стъмни — с фоторезистор и транзистор.', s: [
      'Шина + → <b>резистор 10 kΩ</b> → колона X, а от колона X <b>фоторезистор</b> → шина −.',
      'От колона X <b>резистор 1 kΩ</b> → базата на транзистора.',
      'Шина + → резистор → <b>светодиод</b> → колектор; емитер → −.',
      'Симулирай и мести ☀ Светлина: на тъмно светодиодът свети, на светло угасва.'] },
    { t: 'Реле', d: 'Релето е ключ, който се движи от магнит. Малка верига с бутон включва друга верига с мотор.', s: [
      'Постави <b>релето</b> в долната част: две крачета на бобината (~ ~), после C и NO.',
      'Шина + → <b>бутон</b> → първото ~; второто ~ → шина −.',
      'Шина + → C; NO → <b>мотор</b> → шина −.',
      'Симулирай и задръж бутона — чува се „щрак“ и моторът тръгва.'] },
    { t: 'RGB светодиод', d: 'В RGB светодиода има три светлини: червена, зелена и синя. Когато запалиш две или три, цветовете се смесват!', s: [
      'Постави <b>RGB светодиода</b> — заема 4 колони: R, −, G, B.',
      'Свържи общото краче (−) към шината −.',
      'До R, G и B подай ток от шината +, всеки през свой <b>резистор</b>.',
      'Симулирай — запали поне два цвята едновременно.'] },
    { t: 'Сензори', d: 'Сензорите усещат света около тях: топлина, наклон, допир, магнит, газ, движение и дистанционно.', s: [
      'Избери един <b>сензор</b> (напр. магнитния) и го сложи във верига с резистор и светодиод.',
      'Модулите (акселерометър, жироскоп, ИЧ приемник) имат крачета +, S, −: + към плюса, − към минуса, а S през резистор към светодиода.',
      'Симулирай и променяй средата с контролите над платката — светодиодът трябва да светва и да угасва.'] }
  ]
},
en: {
  ui: {
    pickRow: 'Click the first hole — the {part} takes {n} neighbouring holes in a row.', rowBad: 'No room here — it needs more neighbouring holes in a row.',
    temp: 'Temperature', tiltLbl: 'Tilt', rotLbl: 'Rotation', gasLbl: 'Gas in the air', leak: 'the valve is releasing gas',
    magnetNear: 'Magnet is near', magnetFar: 'Bring a magnet', irRemote: 'IR remote', irHold: 'Hold', irFixed: 'Latched', irStop: 'Stop',
    capacitance: 'Capacitance', meterMode: 'What it measures', spdtPos: 'Position', pinsLbl: 'Legs', outV: 'Output',
    q_off: 'off (not conducting)', q_act: 'on (amplifying)', q_sat: 'fully on', relayOn: 'contact closed', relayOff: 'contact open',
    valveOpen: 'open', valveClosed: 'closed'
  },
  cats: { motion: 'Motion and rotation', ir: 'Infrared (wireless)' },
  parts: { battery: '9 V battery', lemon: 'Lemon', potato: 'Potato', capacitor: 'Capacitor', rgb: 'RGB LED', valve: 'Gas valve', spdt: 'Changeover switch', npn: 'Transistor', relay: 'Relay', ntc: 'Temperature sensor', tilt: 'Tilt sensor', touch: 'Touch sensor', reed: 'Magnetic sensor', gas: 'Gas sensor', accel: 'Accelerometer', gyro: 'Gyroscope', irrx: 'IR receiver', multimeter: 'Multimeter' },
  info: {
    battery: 'One more 9 V battery. The red end (+) is plus.',
    lemon: 'A fruit battery: copper (Cu) is +, zinc (Zn) is −. One lemon gives about 1 V — for an LED, connect three in series.',
    potato: 'A potato battery gives about 0.85 V and only a little current. Connect several in series.',
    capacitor: 'Stores electrical energy like a small tank. It fills while there is current and empties when the current stops. Mind the + leg.',
    rgb: 'Three LEDs in one: red, green and blue. The common leg (−) goes to minus. Mix the colours to make new ones.',
    valve: 'A solenoid valve: when current flows through it, it opens and lets gas out.',
    spdt: 'A changeover switch connects its middle leg (C) either to A or to B. While simulating, click it to flip it.',
    npn: 'A transistor is an electronic switch: a small current into the base (B) lets a big current flow from the collector (C) to the emitter (E).',
    relay: 'A relay: when current flows through the coil (~ ~), a magnet pulls the contact and connects C to NO. That way a small circuit switches another, bigger one.',
    ntc: 'A thermistor: the warmer it is, the lower its resistance. Change the temperature with the 🌡 slider.',
    tilt: 'There is a little ball inside. Tilt it past 45° and the ball connects the contacts. Change the tilt with the 📐 slider.',
    touch: 'A touch sensor closes the circuit while you touch it. While simulating, press it with your finger or the mouse.',
    reed: 'A magnetic (reed) switch closes when you bring a magnet 🧲 close.',
    gas: 'A gas sensor: the more gas in the air, the lower its resistance. Change the amount of gas with the 💨 slider.',
    accel: 'An accelerometer senses tilt. Connect + and −, and output S gives a higher voltage the more it is tilted.',
    gyro: 'A gyroscope senses rotation. Connect + and −, and output S gives a higher voltage the faster it turns.',
    irrx: 'An IR receiver catches the invisible light of a remote control. While the remote is sending, output S is on.',
    multimeter: 'A multimeter measures voltage (V) or current (mA). Choose what it measures in its properties — in series for current, in parallel for voltage.'
  },
  pinNames: { rgb: ['red', 'common', 'green', 'blue'], spdt: ['side A', 'middle', 'side B'], npn: ['emitter', 'base', 'collector'], relay: ['coil', 'coil', 'common', 'normally open'], accel: ['plus', 'signal', 'minus'], gyro: ['plus', 'signal', 'minus'], irrx: ['plus', 'signal', 'minus'] },
  helpExtra: 'When you place a sensor, controls appear above the breadboard: light, temperature, tilt, gas, magnet and the IR remote.',
  lessons: [
    { t: 'Fruit battery', d: 'Lemons and potatoes can make electricity! One gives only a little voltage, so we connect them in series. Don’t use the big battery for this level.', s: [
      'Place three <b>lemons</b> in the bottom half, one after another: the − (Zn) of one in the same column as the + (Cu) of the next.',
      'Place an <b>LED</b>: long leg in the column of the first lemon’s +.',
      'Connect the LED’s short leg with a <b>wire</b> to the − of the last lemon.',
      'Simulate — the LED glows faintly. Try it with potatoes too!'] },
    { t: 'Capacitor', d: 'A capacitor is a little tank of electricity. When you let go of the button, the LED keeps glowing for a while as the capacitor empties.', s: [
      'Place a <b>push button</b> from the + rail to a column.',
      'From that column, place a <b>capacitor</b> (+ leg in the column) to the − rail.',
      'From the same column: <b>resistor</b> → <b>LED</b> → − rail.',
      'Simulate, hold the button for a few seconds, then let go. The LED fades slowly.'] },
    { t: 'Transistor as a switch', d: 'A small current through the transistor’s base turns on a big bulb.', s: [
      'Place a <b>transistor</b> in the bottom half: legs E, B, C.',
      '+ rail → <b>push button</b> → <b>10 kΩ resistor</b> → base (B).',
      '+ rail → <b>bulb</b> → collector (C).',
      'Connect the emitter (E) to − (join the bottom − rail to the top one).',
      'Simulate and hold the button.'] },
    { t: 'Night light', d: 'Build a light that switches itself on when it gets dark — with a light sensor and a transistor.', s: [
      '+ rail → <b>10 kΩ resistor</b> → column X, and from column X a <b>light sensor</b> → − rail.',
      'From column X a <b>1 kΩ resistor</b> → the transistor’s base.',
      '+ rail → resistor → <b>LED</b> → collector; emitter → −.',
      'Simulate and move ☀ Light: in the dark the LED shines, in the light it goes out.'] },
    { t: 'Relay', d: 'A relay is a switch moved by a magnet. A small circuit with a button switches on another circuit with a motor.', s: [
      'Place a <b>relay</b> in the bottom half: two coil legs (~ ~), then C and NO.',
      '+ rail → <b>push button</b> → first ~; second ~ → − rail.',
      '+ rail → C; NO → <b>motor</b> → − rail.',
      'Simulate and hold the button — you hear a “click” and the motor starts.'] },
    { t: 'RGB LED', d: 'An RGB LED has three lights inside: red, green and blue. Light two or three and the colours mix!', s: [
      'Place the <b>RGB LED</b> — it takes 4 columns: R, −, G, B.',
      'Connect the common leg (−) to the − rail.',
      'Feed R, G and B from the + rail, each through its own <b>resistor</b>.',
      'Simulate — light at least two colours at once.'] },
    { t: 'Sensors', d: 'Sensors feel the world around them: heat, tilt, touch, magnets, gas, movement and a remote control.', s: [
      'Pick a <b>sensor</b> (for example the magnetic one) and put it in a circuit with a resistor and an LED.',
      'Modules (accelerometer, gyroscope, IR receiver) have legs +, S, −: + to plus, − to minus, and S through a resistor to the LED.',
      'Simulate and change the surroundings with the controls above the breadboard — the LED should turn on and off.'] }
  ]
}
};
for (const k in X) {
  const T = I18N[k], E = X[k];
  Object.assign(T.ui, E.ui); Object.assign(T.cats, E.cats); Object.assign(T.parts, E.parts); Object.assign(T.info, E.info);
  T.pinNames = E.pinNames;
  T.lessons = T.lessons.concat(E.lessons);
  T.ui.helpItems = T.ui.helpItems.concat([E.helpExtra]);
}
})();
