# Week 7 - Unit testing

## Nece isledilir
- `npm test` - butun testleri bir defe isledir
- `npm run test:watch` - deyisiklikde avtomatik yeniden isledir
- `npm run test:coverage` - coverage hesabati cixarir
- `npm run ci` - CI simulyasiyasi (cache olmadan, coverage ile)

## Neyi test etdim ve niye
**FormInput** - istifadecinin gordukleri: label ile input tapilir, yazi yazanda deyer deyisir,
blur-dan sonra xeta mesaji cixir, xeta duzelende itir. aria-invalid ve aria-describedby
yoxlanir, cunki ekran oxuyucu ucun vacibdir. Tab ile fokus da yoxlanir.

**DataList** - dort veziyyet: loading, dolu siyahi, bos siyahi, xeta. API funksiyasi jest.fn ile
mock olunur. Xeta veziyyetinde "Try again" duymesinin yeniden sorgu gonderdiyi yoxlanir.

**Modal** - acilib baglanma, Close duymesi, Escape, fokus, role="dialog". Avtomatik baglanma
fake timers ile test olunur, modal silinende taymerin legv olundugu da yoxlanir.

## Neyi test etmedim ve niye
- Tailwind sinifleri ve dəqiq CSS: gorunusun detalidir, davranisi gostermir
- React-in props-u render etmesi: kitabxananin ozunun isidir
- Daxili state: implementasiya detalidir, refactorda sinir

## Qeydler
- Meqsed coverage faizi deyil, esas davranislara guvendir
- Testler bir-birinden asili deyil, her testden evvel yeni mock yaradilir
- Snapshot yalniz FormInput-un xetasiz veziyyeti ucun var