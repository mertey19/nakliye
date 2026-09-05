import { business } from "./business";
import { journeyWhatsAppMessage } from "./journey";

export type LocationKind = "city" | "district" | "intent";

export type LocationDef = {
  slug: string;
  kind: LocationKind;
  /** Schema ve kartlarda görünen yer adı */
  place: string;
  navLabel: string;
  title: string;
  h1: string;
  description: string;
  eyebrow: string;
  intro: string;
  bullets: string[];
  servicesLead: string;
  services: { title: string; text: string; href: string }[];
  processLead: string;
  process: { title: string; text: string }[];
  whyLead: string;
  why: { title: string; text: string }[];
  pricingLead: string;
  pricing: { title: string; text: string }[];
  coverageLead: string;
  coverage: string;
  nearby: { label: string; href: string }[];
  serviceLinks: { label: string; href: string }[];
  guideHref?: string;
  guideLabel?: string;
  faqs: { question: string; answer: string }[];
  schemaServiceType: string;
  ctaTitle: string;
  ctaText: string;
};

export const locationWhatsAppMessage = journeyWhatsAppMessage;

export const locations: LocationDef[] = [
  {
    slug: "mersin-nakliye",
    kind: "city",
    place: "Mersin",
    navLabel: "Mersin Nakliye",
    title: "Mersin Nakliye ve Nakliyat | Kansu Can Nakliye",
    h1: "Mersin Nakliye ve Nakliyat Hizmetleri",
    description:
      "Mersin nakliye ve nakliyat için Yenişehir üssünden ilçe ilçe plan. Ev, ofis ve parça eşya bilgilerinizi paylaşın; Kansu Can Nakliye ücretsiz teklif hazırlasın.",
    eyebrow: "Mersin · İlçe ilçe taşıma planı",
    intro:
      "Mersin nakliye arayan çoğu kişi evden eve sayfasına değil, önce şehre uygun bir ekip olup olmadığına bakıyor. Kansu Can Nakliye, Çiftlikköy'deki merkezinden Mersin içi ve Mersin çıkışlı taşımaları aynı plan disipliniyle kurar. Bu sayfa ev taşımanın adımlarını tekrar etmez; şehri ilçelere bölerek hangi rotanın size ait olduğunu netleştirir.",
    bullets: [
      "Yenişehir üssünden Mersin içi plan",
      "İlçe koşullarına göre araç ve ekip",
      "Ücretsiz, adrese özel fiyat teklifi",
      "Şehirler arası çıkış için ayrı rota",
    ],
    servicesLead:
      "Mersin nakliyat talebi tek bir işe indirgenmez. Ev, ofis, parça eşya ve şehirler arası çıkış ayrı plan ister. Aşağıdaki hizmet sayfalarında kapsam net; burada hangi ilçeden yola çıktığınızı bağlarız.",
    services: [
      { title: "Evden eve nakliyat", text: "Mersin evden eve nakliyatın kanonik sayfası burası değil; tam ev taşıma adımları, söküm ve kurulum o sayfada. Buradan ilçe planına geçip oraya bağlanın.", href: "/evden-eve-nakliyat" },
      { title: "Ofis taşımacılığı", text: "Plaza, muayenehane ve dükkân taşımada kesinti süresi masadan monitöre kadar planlanır.", href: "/ofis-tasima" },
      { title: "Şehirler arası nakliyat", text: "Mersin'den İstanbul, Ankara, İzmir, Antalya veya Adana çıkışında yükleme ile teslim günü ayrılabilir.", href: "/sehirler-arasi-nakliyat" },
      { title: "Parça eşya taşıma", text: "Tek oda, öğrenci evi veya birkaç beyaz eşya için tam kamyon gerekmez; miktarı söyleyin, uygunluğu konuşalım.", href: "/parca-esya-tasima" },
    ],
    processLead: "Şehir genelinde süreç aynı kalır; değişen şey adresin yaklaşımı, kat ve ilçe içi mesafedir.",
    process: [
      { title: "İlçe ve adres", text: "Çıkış ile varışın hangi ilçede olduğu, site mi cadde mi olduğu ve aracın kapıya yaklaşıp yaklaşamadığı alınır." },
      { title: "Eşya ve kat", text: "Oda sayısı değil, taşınacak hacim + kat + asansör gerçeği ekip büyüklüğünü belirler." },
      { title: "Gün ve saat", text: "GMK, D-400 veya merkez park yasağı olan saatler varsa yükleme penceresi ona göre seçilir." },
      { title: "Yükleme ve teslim", text: "Mersin içi çoğu taşıma aynı gün biter. Şehir dışına çıkışta teslim ayrı konuşulur." },
    ],
    whyLead: "Mersin nakliye firması ararken ilk filtre, uydurma vaat değil, aranabilir bir merkez ve net iletişim olmalı.",
    why: [
      { title: "Gerçek merkez", text: "Üssümüz Yenişehir Çiftlikköy'de. Telefon, WhatsApp ve teklif formu aynı numaraya ve aynı adrese bağlanır." },
      { title: "İlçe bilgisi", text: "Mezitli sahil sitesi ile Toroslar yokuşu aynı kamyon düzenini kaldırmaz. Bunu önceden sorarız." },
      { title: "Şeffaf fiyat", text: "Mersin ucuz nakliye arayan için ayrı bir sayfamız var. Orada da en ucuz iddiası yok; uygun ve hesaplı teklif var." },
    ],
    pricingLead: "Mersin nakliyat fiyatı ilan edilmez. Eşya miktarı, mesafe, kat ve asansör konuşulmadan rakam uydurulmaz.",
    pricing: [
      { title: "Eşya miktarı", text: "İki oda ile eşyalı aile evi aynı araca sığmaz. Fotoğraf veya oda listesi teklifi netleştirir." },
      { title: "Mesafe", text: "Aynı ilçe içi kısa tur ile Mezitli–Tarsus veya Mersin–Ankara ayrı yakıt ve süre demektir." },
      { title: "Kat ve asansör", text: "Asansörsüz üçüncü kat, merdiven işçilik ve süreyi artırır." },
      { title: "Yaklaşım", text: "Dar sokak veya site bariyeri varsa eşya elde taşınır; bu da plana yazılır." },
    ],
    coverageLead: "Mersin nakliye aramasını ilçeye indirmek, hem size hem bize daha doğru teklif çıkarır.",
    coverage:
      "Yenişehir, Mezitli, Akdeniz ve Toroslar merkez ilçelerinin yanında Erdemli, Silifke ve Tarsus çıkışlı taşımaları da değerlendiriyoruz. Listede yoksa yine yazın; rota uygunsa planlarız.",
    nearby: [
      { label: "Mezitli nakliye", href: "/mezitli-nakliye" },
      { label: "Yenişehir nakliye", href: "/yenisehir-nakliye" },
      { label: "Erdemli nakliye", href: "/erdemli-nakliye" },
      { label: "Silifke nakliye", href: "/silifke-nakliye" },
      { label: "Tarsus nakliye", href: "/tarsus-nakliye" },
      { label: "Mersin uygun fiyatlı nakliye", href: "/mersin-ucuz-nakliye" },
    ],
    serviceLinks: [
      { label: "Mersin evden eve nakliyat", href: "/evden-eve-nakliyat" },
      { label: "Mersin ofis taşımacılığı", href: "/ofis-tasima" },
      { label: "Mersin şehirler arası nakliyat", href: "/sehirler-arasi-nakliyat" },
      { label: "Parça eşya taşıma", href: "/parca-esya-tasima" },
    ],
    faqs: [
      { question: "Mersin nakliye ile Mersin nakliyat aynı hizmet mi?", answer: "Günlük dilde ikisi de ev, ofis ve eşya taşımayı anlatır. Biz her iki yazımı da kullanıyoruz; teklif aynı sürece bağlanır." },
      { question: "Hangi ilçelere gidiyorsunuz?", answer: "Yenişehir, Mezitli, Akdeniz, Toroslar ile Erdemli, Silifke ve Tarsus taleplerini alıyoruz. Adresi yazın, o günkü rota uygunluğunu net söyleyelim." },
      { question: "Evden eve sayfası ile bu sayfa neden ayrı?", answer: "Evden eve sayfası tam ev taşıma sürecinin money page'idir. Bu sayfa Mersin nakliye / nakliyat aramasını ilçe ve hizmet ağına bağlar; aynı H1 tekrarlanmaz." },
      { question: "Şehirler arası nakliyat Mersin'den nasıl işler?", answer: "Çıkış adresi Mersin'de planlanır, varış ili ve teslim günü ayrıca konuşulur. Uzun yol paketlemesi ev içi taşımadan farklıdır." },
      { question: "Teklif için neye ihtiyacınız var?", answer: "İki adres, kat ve asansör, taşınacak eşyanın özeti ve tercih ettiğiniz tarih. Fotoğraf varsa plan daha gerçekçi çıkar." },
    ],
    schemaServiceType: "Mersin Nakliye ve Nakliyat",
    ctaTitle: "Mersin'deki adresinizi yazın",
    ctaText: "İlçe, kat ve eşya özetini iletin; ücretsiz teklif ve uygun taşıma planını birlikte çıkaralım.",
  },
  {
    slug: "mezitli-nakliye",
    kind: "district",
    place: "Mezitli",
    navLabel: "Mezitli Nakliye",
    title: "Mezitli Nakliye ve Evden Eve | Kansu Can Nakliye",
    h1: "Mezitli Nakliye ve Evden Eve Nakliyat",
    description:
      "Mezitli nakliye, nakliyat ve evden eve nakliyat. Viranşehir, Tece ve sahil sitelerinde eşya taşıma için yazın; Kansu Can Nakliye ücretsiz teklif versin.",
    eyebrow: "Mezitli · Sahil, site ve D-400",
    intro:
      "Mezitli nakliye talebi çoğu zaman tek mahalle gibi durur; oysa Viranşehir sitesi ile Tece veya Davultepe'deki eski bina aynı yükleme düzenini kaldırmaz. Kansu Can Nakliye, Yenişehir'deki merkezinden Mezitli evden eve nakliyat, Mezitli eşya taşıma ve Mezitli şehirler arası nakliyat çıkışlarını adrese göre planlar. Yazlık dönemde site bariyeri ve D-400 yoğunluğu teklife yazılır; sürpriz işçilik vaadi verilmez.",
    bullets: [
      "Mezitli evden eve nakliyat",
      "Sahil sitesi ve bariyer planı",
      "Mezitli eşya taşıma ve parça yük",
      "Mezitli şehirler arası nakliyat çıkışı",
    ],
    servicesLead:
      "Mezitli nakliyat işi ev taşımakla sınırlı değil. Ofis, parça eşya ve şehir dışına çıkış ayrı konuşulur; hepsi aynı ilçe koşullarına bağlanır.",
    services: [
      { title: "Mezitli evden eve nakliyat", text: "Tam ev taşımanın genel adımları evden eve sayfasındadır. Mezitli'de fark, site yönetimi saati ve aracın bloğa yaklaşıp yaklaşamadığıdır.", href: "/evden-eve-nakliyat" },
      { title: "Mezitli eşya taşıma", text: "Tek oda, beyaz eşya veya birkaç koliden oluşan Mezitli eşya taşıma için tam kamyon şart değildir.", href: "/parca-esya-tasima" },
      { title: "Ofis ve dükkân", text: "Mezitli çarşı ve sahil işyerlerinde vitrin, masa ve elektronik ekipman minimum kesintiyle taşınır.", href: "/ofis-tasima" },
      { title: "Mezitli şehirler arası nakliyat", text: "Mezitli'den başka ile gidecekseniz yükleme burada, teslim varış şehrinde ayrı gün olabilir.", href: "/sehirler-arasi-nakliyat" },
    ],
    processLead: "Mezitli'de süreç, sahil şeridi mi iç mahalle mi olduğuna göre ince ayarlanır.",
    process: [
      { title: "Site veya sokak", text: "Bariyer, otopark rampası ve yönetim saati varsa yükleme penceresi buna göre seçilir." },
      { title: "D-400 zamanı", text: "Yaz ve akşam saatlerinde sahil yolu yavaşlar. Araç çıkışını buna göre kurarız." },
      { title: "Kat ve asansör", text: "Yüksek blokta asansör ölçüsü, Tece evlerinde merdiven boşluğu belirleyicidir." },
      { title: "Yükleme", text: "Koli ve mobilya etiketlenir; Mezitli evden eve nakliyatta kırılabilirler ayrı paketlenir." },
    ],
    whyLead: "Mezitli nakliye firması ararken 'her yere gideriz' cümlesi yetmez. Hangi bloğa nasıl yanaşılacağı konuşulmalı.",
    why: [
      { title: "Yerel yaklaşım", text: "Yenişehir üssünden Mezitli'ye düzenli çıkıyoruz. Adresi görünce boş vaat değil, yanaşma planı konuşuruz." },
      { title: "Yazlık gerçekliği", text: "Haziran–Eylül arasında site içi trafik artar. Bunu gizlemiyoruz; süreye yansıtırız." },
      { title: "Komşu ilçeler", text: "Mezitli dışında Yenişehir, Erdemli, Silifke ve Tarsus taşımalarını da aynı ekip değerlendirir." },
    ],
    pricingLead: "Mezitli nakliyat fiyatı site içi mesafe, kat ve eşya hacmine göre çıkar. Sabit ilan yok.",
    pricing: [
      { title: "Eşya miktarı", text: "Stüdyo ile 4+1 aynı kasa değildir. Liste veya fotoğraf isteğimizin nedeni budur." },
      { title: "Mesafe", text: "Mezitli içi kısa tur ile Erdemli veya Tarsus varışı ayrı yakıt kalemidir." },
      { title: "Kat ve asansör", text: "Asansöre sığmayan gardırop merdivenden iner; işçilik artar." },
      { title: "Site kuralları", text: "Sadece belirli saatlerde taşıma izni varsa ekip o pencereye sıkıştırılır." },
    ],
    coverageLead: "Mezitli nakliye, tek mahalle teklifi değildir.",
    coverage:
      "Viranşehir, Tece, Davultepe ve sahil sitelerinin yanı sıra Mezitli'den Yenişehir, Erdemli, Silifke ve Tarsus'a giden eşya taşımalarını da planlıyoruz. Nasıl taşınır notları bilgi rehberindedir; ticari teklif bu sayfadadır.",
    nearby: [
      { label: "Yenişehir nakliye", href: "/yenisehir-nakliye" },
      { label: "Erdemli nakliye", href: "/erdemli-nakliye" },
      { label: "Silifke nakliye", href: "/silifke-nakliye" },
      { label: "Tarsus nakliye", href: "/tarsus-nakliye" },
      { label: "Mersin nakliye", href: "/mersin-nakliye" },
    ],
    serviceLinks: [
      { label: "Evden eve nakliyat", href: "/evden-eve-nakliyat" },
      { label: "Şehirler arası nakliyat", href: "/sehirler-arasi-nakliyat" },
      { label: "Parça eşya taşıma", href: "/parca-esya-tasima" },
      { label: "Ofis taşıma", href: "/ofis-tasima" },
    ],
    guideHref: "/rehber/mezitli-ev-tasima",
    guideLabel: "Mezitli'de ev taşırken nelere dikkat edilmeli?",
    faqs: [
      { question: "Mezitli evden eve nakliyat için ne zaman yazmalıyım?", answer: "Yazlık dönemde site saatleri daralır. Tarihi netleşince, mümkünse bir hafta önce kat, asansör ve site kuralını paylaşın." },
      { question: "Mezitli eşya taşıma tam evden farklı mı?", answer: "Evet. Birkaç koli veya beyaz eşya için daha küçük düzen kurulabilir. Yine de kapı genişliği ve kat bilgisi gerekir." },
      { question: "Mezitli şehirler arası nakliyat yapıyor musunuz?", answer: "Evet. Çıkış Mezitli'de planlanır; varış ili ve teslim günü ayrıca konuşulur." },
      { question: "Viranşehir sitesine kamyon girer mi?", answer: "Her site aynı değil. Bariyer yüksekliği, rampa ve yönetim izni adrese göre değişir. Fotoğraf veya site adı teklifi netleştirir." },
      { question: "Mezitli nakliyat fiyatını telefonda söyler misiniz?", answer: "Kabaca aralık konuşulabilir; kesin rakam eşya, kat ve yanaşma görülmeden bağlanmaz. Ücretsiz teklif için bu üç bilgi yeter." },
    ],
    schemaServiceType: "Mezitli Nakliye ve Evden Eve Nakliyat",
    ctaTitle: "Mezitli adresinizi iletin",
    ctaText: "Mahalle, kat ve eşya özetini yazın; Mezitli nakliye için ücretsiz fiyat teklifi çıkaralım.",
  },
  {
    slug: "yenisehir-nakliye",
    kind: "district",
    place: "Yenişehir",
    navLabel: "Yenişehir Nakliye",
    title: "Mersin Yenişehir Nakliye | Kansu Can Nakliye",
    h1: "Mersin Yenişehir Nakliye Hizmetleri",
    description:
      "Yenişehir nakliye, Mersin Yenişehir nakliye ve evden eve nakliyat. Çiftlikköy üssünden ofis taşıma ve eşya planı için yazın; ücretsiz teklif alın.",
    eyebrow: "Yenişehir · Çiftlikköy merkezi",
    intro:
      "Yenişehir nakliye arayan kişi çoğu zaman evine en yakın ekibi ister. Kansu Can Nakliye'nin merkezi Çiftlikköy'dedir; Mersin Yenişehir nakliye, Yenişehir nakliyat ve Yenişehir evden eve nakliyat taleplerini aynı mahalle bilgisiyle kurarız. Pozcu siteleri, GMK üzeri işyerleri ve kampüs dönemi öğrenci evleri ayrı yaklaşım ister. Yenişehir ofis taşıma da aynı güzergâhın parçasıdır.",
    bullets: [
      "Çiftlikköy'de yerel üs",
      "Yenişehir evden eve nakliyat",
      "Yenişehir ofis taşıma",
      "GMK ve site saati planı",
    ],
    servicesLead:
      "Yenişehir nakliyat, ev taşımanın yanında ofis ve parça yükü de kapsar. Hizmetin teknik kapsamı ilgili sayfadadır; burada ilçe gerçeği öne çıkar.",
    services: [
      { title: "Yenişehir evden eve nakliyat", text: "Tam ev süreci evden eve sayfasında. Yenişehir'de fark Çiftlikköy–Pozcu arası site girişleri ve asansör ölçüsüdür.", href: "/evden-eve-nakliyat" },
      { title: "Yenişehir ofis taşıma", text: "GMK ve çarşı hattındaki ofislerde masa, sunucu ve arşiv kutuları mesaiye göre taşınır.", href: "/ofis-tasima" },
      { title: "Parça ve öğrenci evi", text: "Dönem sonu tek oda taşımaları için daha küçük düzen kurulabilir.", href: "/parca-esya-tasima" },
      { title: "Şehirler arası çıkış", text: "Yenişehir'den başka ile gidecekseniz yükleme burada planlanır.", href: "/sehirler-arasi-nakliyat" },
    ],
    processLead: "Merkeze yakın olmak, her sokağın aynı olduğu anlamına gelmez.",
    process: [
      { title: "Mahalle", text: "Çiftlikköy, Pozcu veya Güvenevler — her birinde park ve site kuralı değişir." },
      { title: "GMK zamanı", text: "İş çıkışı ana arter yavaşlar. Ofis ve ev yüklemesini buna göre kaydırırız." },
      { title: "Yönetim saati", text: "Sitelerde taşıma izni öğleden önceyle sınırlı olabilir. Bunu önceden sorun." },
      { title: "Yerleşim", text: "Kutular oda oda bırakılır; sökülen mobilya Yenişehir evden eve nakliyatta yeniden kurulur." },
    ],
    whyLead: "Mersin Yenişehir nakliye için uzak bir plaka değil, burada oturan bir ekip konuşuyor olmalısınız.",
    why: [
      { title: "Aynı ilçe, aynı merkez", text: "Depo ve iletişim Çiftlikköy'de. Yol tarifi ve ziyaret aynı adresten." },
      { title: "Kampüs dönemi", text: "Öğrenci evi yoğunluğunda tarih erken kapanır. Bunu saklamıyoruz." },
      { title: "Komşu ilçeler", text: "Yenişehir dışında Mezitli, Erdemli, Silifke ve Tarsus taleplerini de alıyoruz." },
    ],
    pricingLead: "Yenişehir nakliyat fiyatı, merkeze yakın diye otomatik düşmez. Kat ve eşya yine belirleyicidir.",
    pricing: [
      { title: "Eşya miktarı", text: "Öğrenci odası ile aile evinin kasa ihtiyacı ayrıdır." },
      { title: "Mesafe", text: "İlçe içi kısa olsa da Mezitli veya Tarsus varışı ayrı hesaplanır." },
      { title: "Kat ve asansör", text: "Yüksek blokta asansör randevusu süreye eklenir." },
      { title: "Ofis kesintisi", text: "Mesai dışı taşıma ekip planını değiştirir; bunu baştan konuşuruz." },
    ],
    coverageLead: "Yenişehir nakliye, yalnızca Çiftlikköy demek değildir.",
    coverage:
      "Pozcu, Güvenevler ve site stoğunun yanında Yenişehir'den Mezitli, Erdemli, Silifke ve Tarsus'a giden ev ve ofis taşımalarını planlıyoruz. Taşınma ipuçları rehberde; teklif bu sayfada.",
    nearby: [
      { label: "Mezitli nakliye", href: "/mezitli-nakliye" },
      { label: "Erdemli nakliye", href: "/erdemli-nakliye" },
      { label: "Tarsus nakliye", href: "/tarsus-nakliye" },
      { label: "Silifke nakliye", href: "/silifke-nakliye" },
      { label: "Mersin nakliye", href: "/mersin-nakliye" },
    ],
    serviceLinks: [
      { label: "Evden eve nakliyat", href: "/evden-eve-nakliyat" },
      { label: "Ofis taşıma", href: "/ofis-tasima" },
      { label: "Şehirler arası nakliyat", href: "/sehirler-arasi-nakliyat" },
      { label: "Parça eşya", href: "/parca-esya-tasima" },
    ],
    guideHref: "/rehber/yenisehir-ev-tasima",
    guideLabel: "Yenişehir'de ev taşırken nelere dikkat edilmeli?",
    faqs: [
      { question: "Merkeziniz gerçekten Yenişehir'de mi?", answer: "Evet. Çiftlikköy, 3201. Sokak No:15. Harita ve yol tarifi iletişim sayfasında aynı adrestir." },
      { question: "Yenişehir ofis taşıma hafta sonu olur mu?", answer: "Yönetim ve bina izni uygunsa evet. Mesaiyi bozmamak için saati birlikte seçeriz." },
      { question: "Yenişehir evden eve nakliyat aynı gün biter mi?", answer: "İlçe içi ve makul hacimde çoğu iş aynı gün kapanır. Hacim ve kat artarsa teslim saatini baştan söyleriz." },
      { question: "Öğrenci evi için ayrı fiyat mı?", answer: "Ayrı tarife uydurmayız. Eşya azsa düzen küçülür; bu da teklife yansır." },
      { question: "Pozcu sitesine araç girişi sorun olur mu?", answer: "Bazı sitelerde yük asansörü ve saat kuralı vardır. Site adını ve yönetim notunu paylaşın." },
    ],
    schemaServiceType: "Yenişehir Nakliye ve Evden Eve Nakliyat",
    ctaTitle: "Yenişehir'den teklif alın",
    ctaText: "Mahalle ve eşya özetini yazın; Mersin Yenişehir nakliye için ücretsiz teklif hazırlayalım.",
  },
  {
    slug: "erdemli-nakliye",
    kind: "district",
    place: "Erdemli",
    navLabel: "Erdemli Nakliye",
    title: "Erdemli Nakliye ve Nakliyat | Kansu Can Nakliye",
    h1: "Erdemli Nakliye ve Evden Eve Nakliyat",
    description:
      "Erdemli nakliye, Erdemli nakliyat ve evden eve taşıma. Mersin Erdemli nakliye ile şehirler arası çıkış için adresi paylaşın; ücretsiz teklif alın.",
    eyebrow: "Erdemli · Sahil beldeleri ve Mersin hattı",
    intro:
      "Erdemli nakliye, Mersin merkez ilçesinden daha uzun bir sahil hattıdır. Limonlu, Kızkalesi ve yazlık beldelerde ev ile Erdemli evden eve nakliyat aynı kamyon düzenini her zaman kaldırmaz. Kansu Can Nakliye, Yenişehir'den Mersin Erdemli nakliye ve Erdemli şehirler arası nakliyat çıkışlarını mesafe + yanaşma ile kurar. Erdemli nakliyat fiyatı 'ilçe adı'na göre değil, yol ve eşyaya göre çıkar.",
    bullets: [
      "Erdemli evden eve nakliyat",
      "Belde ve yazlık ev planı",
      "Mersin Erdemli nakliye hattı",
      "Erdemli şehirler arası nakliyat",
    ],
    servicesLead:
      "Erdemli nakliyat talebi ev, yazlık eşya, dükkân veya başka ile çıkış olabilir. Kapsamı ilgili hizmet sayfasında, ilçe farkını burada konuşuruz.",
    services: [
      { title: "Erdemli evden eve nakliyat", text: "Tam ev adımları evden eve sayfasında. Erdemli'de ek konu, belde yolu ve yazlık kapı genişliğidir.", href: "/evden-eve-nakliyat" },
      { title: "Yazlık ve parça eşya", text: "Sezonluk evde birkaç mobilya veya beyaz eşya için daha küçük düzen mümkün olabilir.", href: "/parca-esya-tasima" },
      { title: "Erdemli şehirler arası nakliyat", text: "Erdemli'den başka ile gidecekseniz yükleme sahilde, teslim varışta ayrı planlanır.", href: "/sehirler-arasi-nakliyat" },
      { title: "Ofis ve işyeri", text: "İlçe merkezindeki dükkân ve ofis taşımada vitrin ve kesinti saati önemlidir.", href: "/ofis-tasima" },
    ],
    processLead: "Mersin–Erdemli yolu kısa görünür; yaz trafiği ve belde içi dar sokak süreyi değiştirir.",
    process: [
      { title: "Belde adı", text: "Merkez, Limonlu, Kızkalesi veya daha batı — her biri ayrı yaklaşım ister." },
      { title: "Sezon", text: "Yazın sahil yolu ve site içi otopark dolar. Saat seçimi teklifin parçasıdır." },
      { title: "Yanaşma", text: "Bazı yazlıklarda kamyon kapıya giremez. Mesafe elde taşımaya döner." },
      { title: "Çıkış", text: "Erdemli şehirler arası nakliyatta yükleme sabahı Mersin hattına göre kurulur." },
    ],
    whyLead: "Erdemli nakliye için 'Mersin'den geliriz' yetmez. Belde gerçeğini soran bir ekip gerekir.",
    why: [
      { title: "Mesafe dürüstlüğü", text: "Yenişehir–Erdemli arası yakıt ve süreye yazılır. Gizlenmez." },
      { title: "Yazlık deneyimi", text: "Kapı ölçüleri ve site bariyeri baştan sorulur." },
      { title: "Komşu hat", text: "Erdemli dışında Mezitli, Yenişehir, Silifke ve Tarsus taşımalarını da değerlendiririz." },
    ],
    pricingLead: "Erdemli nakliyat fiyatı, Mersin içi kısa turla aynı kalıba girmez.",
    pricing: [
      { title: "Eşya miktarı", text: "Yazlık sade ev ile eşyalı kışlık ayrı kasadır." },
      { title: "Mesafe", text: "Erdemli merkez ile Kızkalesi aynı dakika değildir; Mersin hattı ayrıca eklenir." },
      { title: "Kat ve asansör", text: "Yeni sitede asansör, eski belde evinde merdiven belirler." },
      { title: "Sezon yoğunluğu", text: "Temmuz–Ağustos tarihleri erken dolar. Bunu fiyat değil, müsaitlik belirler." },
    ],
    coverageLead: "Mersin Erdemli nakliye, yalnızca ilçe merkezine inmek demek değildir.",
    coverage:
      "Sahil beldeleri ve Erdemli'den Mezitli, Yenişehir, Silifke ve Tarsus'a giden ev taşımalarını planlıyoruz. Rota uygun değilse bunu net söyleriz.",
    nearby: [
      { label: "Mezitli nakliye", href: "/mezitli-nakliye" },
      { label: "Silifke nakliye", href: "/silifke-nakliye" },
      { label: "Yenişehir nakliye", href: "/yenisehir-nakliye" },
      { label: "Tarsus nakliye", href: "/tarsus-nakliye" },
      { label: "Mersin nakliye", href: "/mersin-nakliye" },
    ],
    serviceLinks: [
      { label: "Evden eve nakliyat", href: "/evden-eve-nakliyat" },
      { label: "Şehirler arası nakliyat", href: "/sehirler-arasi-nakliyat" },
      { label: "Parça eşya taşıma", href: "/parca-esya-tasima" },
    ],
    faqs: [
      { question: "Erdemli evden eve nakliyat aynı gün biter mi?", answer: "Hacim ve belde içi yanaşma uygunsa evet. Uzak belde + asansörsüz kat birleşirse teslim saatini baştan konuşuruz." },
      { question: "Kızkalesi veya Limonlu'ya geliyor musunuz?", answer: "Adresi yazın. Yol ve kapı yaklaşımı uygunsa planlarız; uygun değilse boş söz vermeyiz." },
      { question: "Erdemli şehirler arası nakliyat nasıl işler?", answer: "Yükleme Erdemli'de, teslim varış ilinde. Uzun yol paketlemesi ayrıca konuşulur." },
      { question: "Yazlık ev için parça eşya yeterli mi?", answer: "Birkaç mobilya ve beyaz eşya ise evet. Tam ev ise evden eve kapsamına geçer." },
      { question: "Fiyatı Mersin içiyle aynı mı?", answer: "Hayır. Mesafe ve sezon koşulları teklife yazılır. Mersin'in en ucuzu iddiası da yoktur." },
    ],
    schemaServiceType: "Erdemli Nakliye ve Evden Eve Nakliyat",
    ctaTitle: "Erdemli adresinizi paylaşın",
    ctaText: "Belde, kat ve eşya özetini yazın; Erdemli nakliye için ücretsiz teklif çıkaralım.",
  },
  {
    slug: "silifke-nakliye",
    kind: "district",
    place: "Silifke",
    navLabel: "Silifke Nakliye",
    title: "Silifke Nakliye ve Nakliyat | Kansu Can Nakliye",
    h1: "Silifke Nakliye ve Evden Eve Nakliyat",
    description:
      "Silifke nakliye, Silifke nakliyat ve evden eve taşıma. Mersin Silifke nakliye ile şehirler arası çıkış için bilgilerinizi yazın; ücretsiz teklif alın.",
    eyebrow: "Silifke · Göksu ve uzun hat",
    intro:
      "Silifke nakliye, Mersin'in batı ucunda daha uzun bir lojistik hattır. İlçe merkezi, Taşucu çevresi ve köy evleri aynı yanaşmayı kaldırmaz. Kansu Can Nakliye, Yenişehir'den Mersin Silifke nakliye, Silifke evden eve nakliyat ve Silifke şehirler arası nakliyat taleplerini mesafe açık konuşularak kurar. Silifke nakliyat 'yakın ilçe' muamelesi görmez.",
    bullets: [
      "Silifke evden eve nakliyat",
      "Merkez, Taşucu ve köy ayrımı",
      "Mersin Silifke nakliye hattı",
      "Silifke şehirler arası nakliyat",
    ],
    servicesLead:
      "Silifke nakliyat ev, parça yük veya batıya/şehir dışına çıkış olabilir. Teknik kapsam hizmet sayfalarında; mesafe gerçeği burada.",
    services: [
      { title: "Silifke evden eve nakliyat", text: "Tam ev süreci evden eve sayfasında. Silifke'de ek konu, uzun yol ve evin köy/merkez oluşudur.", href: "/evden-eve-nakliyat" },
      { title: "Parça eşya", text: "Tek ev eşyası veya birkaç oda için daha küçük düzen mümkün olabilir.", href: "/parca-esya-tasima" },
      { title: "Silifke şehirler arası nakliyat", text: "Silifke'den başka ile çıkışta yükleme günü, Mersin hattından bağımsız planlanır.", href: "/sehirler-arasi-nakliyat" },
      { title: "İşyeri", text: "İlçe merkezindeki dükkân taşımada vitrin ve kaldırım izni konuşulur.", href: "/ofis-tasima" },
    ],
    processLead: "Silifke'ye çıkmadan önce yol ve ev tipi netleşmezse teklif yarım kalır.",
    process: [
      { title: "Konum", text: "İlçe merkezi, Taşucu veya köy — her biri ayrı süre ve yanaşma demektir." },
      { title: "Yol", text: "Mersin–Silifke hattı hava ve trafik ile değişir. Yükleme saati buna göre seçilir." },
      { title: "Ev tipi", text: "Bahçeli ev ile apartman asansörü ayrı ekip ister." },
      { title: "Teslim", text: "Silifke şehirler arası nakliyatta varış günü baştan yazılır." },
    ],
    whyLead: "Silifke nakliye için 'yolda bakarız' demeyiz. Mesafeyi baştan söyleriz.",
    why: [
      { title: "Dürüst süre", text: "Yenişehir–Silifke turu Mersin içi değildir. Bunu teklifte gizlemeyiz." },
      { title: "Köy / merkez", text: "Dar yol ve bahçe kapısı varsa plan değişir; sorarız." },
      { title: "Komşu ilçeler", text: "Silifke dışında Erdemli, Mezitli, Yenişehir ve Tarsus taşımalarını da alırız." },
    ],
    pricingLead: "Silifke nakliyat fiyatı uzun hat ve ev tipine göre çıkar.",
    pricing: [
      { title: "Eşya miktarı", text: "Köy evi deposu ile apartman dairesi aynı hacim değildir." },
      { title: "Mesafe", text: "Silifke merkezi ile daha batı köy aynı dakika değildir." },
      { title: "Kat ve asansör", text: "Merkez apartmanda asansör, müstakilde bahçe yolu belirler." },
      { title: "Çift gün", text: "Şehirler arası çıkışta yükleme ve teslim ayrı gün olabilir." },
    ],
    coverageLead: "Mersin Silifke nakliye, yalnızca ilçe meydanına inmek değildir.",
    coverage:
      "Merkez ve Taşucu çevresi ile Silifke'den Erdemli, Mezitli, Yenişehir ve Tarsus'a giden ev taşımalarını değerlendiriyoruz. Rota uymuyorsa açıkça söyleriz.",
    nearby: [
      { label: "Erdemli nakliye", href: "/erdemli-nakliye" },
      { label: "Mezitli nakliye", href: "/mezitli-nakliye" },
      { label: "Yenişehir nakliye", href: "/yenisehir-nakliye" },
      { label: "Tarsus nakliye", href: "/tarsus-nakliye" },
      { label: "Mersin nakliye", href: "/mersin-nakliye" },
    ],
    serviceLinks: [
      { label: "Evden eve nakliyat", href: "/evden-eve-nakliyat" },
      { label: "Şehirler arası nakliyat", href: "/sehirler-arasi-nakliyat" },
      { label: "Parça eşya taşıma", href: "/parca-esya-tasima" },
    ],
    faqs: [
      { question: "Silifke evden eve nakliyat için ne zaman yazmalıyım?", answer: "Uzun hat olduğu için tarihi netleşince, mümkünse birkaç gün önce adres ve eşya özetini paylaşın." },
      { question: "Köy evine çıkıyor musunuz?", answer: "Yol ve kapı yaklaşımı uygunsa evet. Fotoğraf veya konum pini teklifi netleştirir." },
      { question: "Silifke şehirler arası nakliyat mümkün mü?", answer: "Evet. Yükleme Silifke'de planlanır; varış ili ayrıca konuşulur." },
      { question: "Taşucu da bu kapsama girer mi?", answer: "Adresi yazın. Yaklaşım uygunsa aynı Silifke nakliye planına bağlarız." },
      { question: "Fiyat Mersin içiyle aynı mı?", answer: "Değil. Mesafe ve ev tipi teklife yazılır. En ucuz iddiası yoktur." },
    ],
    schemaServiceType: "Silifke Nakliye ve Evden Eve Nakliyat",
    ctaTitle: "Silifke adresinizi yazın",
    ctaText: "Mahalle veya belde, kat ve eşya özetini iletin; Silifke nakliye için ücretsiz teklif alalım.",
  },
  {
    slug: "tarsus-nakliye",
    kind: "district",
    place: "Tarsus",
    navLabel: "Tarsus Nakliye",
    title: "Tarsus Nakliye ve Nakliyat | Kansu Can Nakliye",
    h1: "Tarsus Nakliye ve Evden Eve Nakliyat",
    description:
      "Tarsus nakliye, Tarsus nakliyat ve evden eve taşıma. Mersin Tarsus nakliye ile şehirler arası ve sanayi çıkışı için yazın; ücretsiz teklif alın.",
    eyebrow: "Tarsus · Merkez, sanayi ve Adana hattı",
    intro:
      "Tarsus nakliye, tarihi merkezin dar sokakları ile organize sanayi ve yeni konut stoğunu aynı cümlede toplar. Kansu Can Nakliye, Yenişehir'den Mersin Tarsus nakliye, Tarsus evden eve nakliyat ve Tarsus şehirler arası nakliyat taleplerini sokak genişliği ve yük cinsine göre ayırır. Tarsus nakliyat, 'Mersin'e yakın' diye tek tarife indirgenmez.",
    bullets: [
      "Tarsus evden eve nakliyat",
      "Dar sokak ve sanayi ayrımı",
      "Mersin Tarsus nakliye hattı",
      "Tarsus şehirler arası nakliyat",
    ],
    servicesLead:
      "Tarsus nakliyat ev, ofis, parça eşya veya fabrika/ağır yük olabilir. Ağır makine ayrı değerlendirilir; ev taşıma evden eve sayfasındadır.",
    services: [
      { title: "Tarsus evden eve nakliyat", text: "Tam ev adımları evden eve sayfasında. Tarsus'ta ek konu, çarşı içi dar sokak ve park yasağıdır.", href: "/evden-eve-nakliyat" },
      { title: "Ofis ve işyeri", text: "Çarşı ve yeni işhanlarında masa ve arşiv, kesinti saatine göre taşınır.", href: "/ofis-tasima" },
      { title: "Tarsus şehirler arası nakliyat", text: "Tarsus'tan başka ile, özellikle Adana koridoru ve daha uzak iller, ayrı teslim günü isteyebilir.", href: "/sehirler-arasi-nakliyat" },
      { title: "Parça eşya", text: "Tek ev eşyası veya birkaç oda için daha küçük düzen konuşulur.", href: "/parca-esya-tasima" },
    ],
    processLead: "Tarsus'ta önce sokak, sonra kasa seçilir.",
    process: [
      { title: "Mahalle tipi", text: "Tarihi merkez, yeni site veya sanayi kenarı — yanaşma tamamen değişir." },
      { title: "Park ve yasak", text: "Çarşı içi saatlerinde araç bırakmak zordur. Pencereyi buna göre seçeriz." },
      { title: "Yük cinsi", text: "Ev eşyası ile paletli sanayi yükü aynı ekipman değildir. İkincisi ayrıca değerlendirilir." },
      { title: "Hattı", text: "Mersin Tarsus nakliye turu kısa görünür; teslim Tarsus içi dağıtımsa süre eklenir." },
    ],
    whyLead: "Tarsus nakliye için yalnızca mesafe konuşmak yetmez. Sokak ve yük tipi baştan ayrılmalı.",
    why: [
      { title: "İki Tarsus", text: "Çarşı içi ev ile sanayi kenarı depo aynı plan değildir. Bunu sorarız." },
      { title: "Komşu il", text: "Adana çıkışlı Tarsus şehirler arası nakliyat taleplerinde rota ayrıca kurulur." },
      { title: "Komşu ilçeler", text: "Tarsus dışında Yenişehir, Mezitli, Erdemli ve Silifke işlerini de alırız." },
    ],
    pricingLead: "Tarsus nakliyat fiyatı sokak + hacim + varışa göre çıkar.",
    pricing: [
      { title: "Eşya miktarı", text: "Dar merdivenli eski ev, söküm süresini uzatır." },
      { title: "Mesafe", text: "Tarsus içi ile Mersin veya Adana varışı ayrı kalemdir." },
      { title: "Kat ve asansör", text: "Yeni sitede asansör, çarşı evinde merdiven belirler." },
      { title: "Yük tipi", text: "Makine veya palet varsa ev tarifesi uygulanmaz; uygunluk ayrıca bakılır." },
    ],
    coverageLead: "Mersin Tarsus nakliye, yalnızca ilçe giriş tabelasına kadar gelmek değildir.",
    coverage:
      "Merkez, yeni konut ve sanayi kenarı ile Tarsus'tan Yenişehir, Mezitli, Erdemli ve Silifke'ye giden ev taşımalarını planlıyoruz. Ağır sanayi yükü fotoğraf ve ölçü olmadan kabul edilmez.",
    nearby: [
      { label: "Yenişehir nakliye", href: "/yenisehir-nakliye" },
      { label: "Mezitli nakliye", href: "/mezitli-nakliye" },
      { label: "Erdemli nakliye", href: "/erdemli-nakliye" },
      { label: "Silifke nakliye", href: "/silifke-nakliye" },
      { label: "Mersin nakliye", href: "/mersin-nakliye" },
    ],
    serviceLinks: [
      { label: "Evden eve nakliyat", href: "/evden-eve-nakliyat" },
      { label: "Şehirler arası nakliyat", href: "/sehirler-arasi-nakliyat" },
      { label: "Ofis taşıma", href: "/ofis-tasima" },
      { label: "Parça eşya", href: "/parca-esya-tasima" },
    ],
    faqs: [
      { question: "Tarsus evden eve nakliyat aynı gün biter mi?", answer: "Hacim ve sokak uygunsa evet. Çarşı içi yasak saati teslimi akşama kaydırabilir." },
      { question: "Organize sanayiye ev eşyası götürür müsünüz?", answer: "Adres ev veya lojman ise ev kapsamındadır. Makine/palet ise ayrı değerlendirilir." },
      { question: "Tarsus şehirler arası nakliyat Adana'ya nasıl işler?", answer: "Kısa koridor olsa da yükleme ve teslim adresi ayrı planlanır. Hacim büyürse gün ayrılabilir." },
      { question: "Tarihi merkezde kamyon girer mi?", answer: "Her sokak aynı değil. En yakın yanaşma noktası ve elde taşıma mesafesi teklife yazılır." },
      { question: "Fiyat Mersin içiyle aynı mı?", answer: "Her zaman değil. Mesafe kısa olsa da dar sokak işçiliği artabilir." },
    ],
    schemaServiceType: "Tarsus Nakliye ve Evden Eve Nakliyat",
    ctaTitle: "Tarsus adresinizi iletin",
    ctaText: "Mahalle, sokak yaklaşımı ve eşya özetini yazın; Tarsus nakliye için ücretsiz teklif çıkaralım.",
  },
  {
    slug: "mersin-ucuz-nakliye",
    kind: "intent",
    place: "Mersin",
    navLabel: "Uygun fiyatlı nakliye",
    title: "Mersin Uygun Fiyatlı Nakliye | Kansu Can Nakliye",
    h1: "Mersin Uygun Fiyatlı Nakliye",
    description:
      "Mersin ucuz nakliye arayanlar için şeffaf fiyatlandırma: eşya miktarı, mesafe, kat ve asansör. En ucuz iddiası yok; ücretsiz fiyat teklifi var.",
    eyebrow: "Şeffaf fiyat · Ücretsiz teklif",
    intro:
      "Mersin ucuz nakliye yazan çoğu kişi aslında sürprizsüz, uygun fiyatlı bir iş arıyor. Kansu Can Nakliye 'Mersin'in en ucuzu' demez. Çünkü en düşük rakam çoğu zaman eksik ekip, eksik paket veya son anda eklenen kat ücretidir. Burada şeffaf fiyatlandırma vardır: eşya miktarı, mesafe, kat ve asansör konuşulur; ücretsiz fiyat teklifi yazılı çıkar. Uygun fiyat, gizli kalem bırakmamaktır.",
    bullets: [
      "Ücretsiz fiyat teklifi",
      "Şeffaf fiyatlandırma",
      "Eşya, mesafe, kat-asansör",
      "En ucuz iddiası yok",
    ],
    servicesLead:
      "Uygun fiyat, yanlış hizmet seçmekle gelmez. Az eşya parça taşıma, tam ev evden eve, başka il şehirler arası sayfasındadır.",
    services: [
      { title: "Evden eve", text: "Tam ev taşımanın kapsamı bellidir. Eksik kalemle ucuz görünen teklifi karşılaştırmayın.", href: "/evden-eve-nakliyat" },
      { title: "Parça eşya", text: "Birkaç koli için tam kamyon yazmak fiyatı şişirir. Miktarı doğru söyleyin.", href: "/parca-esya-tasima" },
      { title: "Şehirler arası", text: "Uzun yolda 'ucuz' çoğu zaman zayıf sabitleme demektir. Paket kalemi açık yazılır.", href: "/sehirler-arasi-nakliyat" },
      { title: "İlçe sayfaları", text: "Mezitli, Yenişehir, Erdemli, Silifke ve Tarsus koşulları fiyatı değiştirir.", href: "/mersin-nakliye" },
    ],
    processLead: "Uygun fiyatlı teklif, üç sorudan sonra çıkar. Dördüncü soru uydurma rakamdır.",
    process: [
      { title: "Eşya miktarı", text: "Oda sayısı değil, gerçek hacim. Fotoğraf varsa teklif daralır." },
      { title: "Mesafe", text: "Aynı site içi ile Tarsus veya Ankara aynı yakıt değildir." },
      { title: "Kat ve asansör", text: "Asansörsüz kat işçiliktir. Bunu gizleyen teklif sonra şişer." },
      { title: "Yazılı teklif", text: "Kapsamı görürsünüz. Dahil olmayan söküm veya paket ayrıca işaretlenir." },
    ],
    whyLead: "Mersin ucuz nakliye aramasını karşılamak, ucuzluk yarışına girmek değildir.",
    why: [
      { title: "Şeffaf fiyatlandırma", text: "Hangi kalemin neden eklendiğini söyleriz. Belirsiz 'artı işçilik' bırakmayız." },
      { title: "Ücretsiz fiyat teklifi", text: "Keşif veya teklif için ücret istenmez. Reddedersek nedenini de söyleriz." },
      { title: "Yerel üs", text: "Yenişehir Çiftlikköy. Rakam ile adres aynı kaynaktan gelir." },
    ],
    pricingLead: "Fiyatı belirleyen dört şey. Beşinci şey 'en ucuz' sloganı değildir.",
    pricing: [
      { title: "Eşya miktarı", text: "Kasa ve ekip büyüklüğü buradan çıkar." },
      { title: "Mesafe", text: "İlçe içi, komşu ilçe veya şehirler arası ayrı yakıt ve süre." },
      { title: "Kat ve asansör", text: "Merdiven metresi işçiliktir; sonra eklenmez, baştan yazılır." },
      { title: "Yaklaşım", text: "Dar sokak elde taşıma ekler. Bunu saklayan teklif ucuz görünür." },
    ],
    coverageLead: "Uygun fiyat, her ilçede aynı rakam demek değildir.",
    coverage:
      "Mersin içi, Mezitli, Yenişehir, Erdemli, Silifke ve Tarsus koşulları teklifi değiştirir. İlçe sayfasından adresi seçip aynı ücretsiz teklif formuna gelebilirsiniz.",
    nearby: [
      { label: "Mersin nakliye", href: "/mersin-nakliye" },
      { label: "Yenişehir nakliye", href: "/yenisehir-nakliye" },
      { label: "Mezitli nakliye", href: "/mezitli-nakliye" },
      { label: "Erdemli nakliye", href: "/erdemli-nakliye" },
      { label: "Tarsus nakliye", href: "/tarsus-nakliye" },
      { label: "Silifke nakliye", href: "/silifke-nakliye" },
    ],
    serviceLinks: [
      { label: "Evden eve nakliyat", href: "/evden-eve-nakliyat" },
      { label: "Parça eşya taşıma", href: "/parca-esya-tasima" },
      { label: "Şehirler arası nakliyat", href: "/sehirler-arasi-nakliyat" },
      { label: "Teklif formu", href: "/teklif-al" },
    ],
    faqs: [
      { question: "Mersin'in en ucuz nakliyesini siz mi yapıyorsunuz?", answer: "Hayır. Böyle bir iddia yayınlamıyoruz. Uygun ve şeffaf teklif veririz; en düşük rakamı yarıştırmayız." },
      { question: "Mersin ucuz nakliye arıyorum, neyi karşılaştırmalıyım?", answer: "Rakamın yanında söküm, paket, kat işçiliği ve yanaşma dahil mi bakın. Eksik kalemli teklif sonra şişer." },
      { question: "Ücretsiz fiyat teklifi gerçekten ücretsiz mi?", answer: "Evet. Teklif ve ilk görüşme için ücret alınmaz." },
      { question: "Neden bazı firmalar daha ucuz çıkar?", answer: "Kapsam dar tutulmuş olabilir: paket yok, asansörsüz kat 'sonra bakarız' denmiş olabilir. Biz bunu baştan yazarız." },
      { question: "Küçük bir ev için uygun fiyat nasıl çıkar?", answer: "Parça eşya veya küçük kasa düzeni mümkünse onu öneririz. Tam kamyon dayatmayız." },
      { question: "Şehirler arası da uygun fiyatlı olur mu?", answer: "Uzun yolda güvenlik kalemi kısılmaz. Uygun fiyat, gereksiz kasa ve belirsiz ek ücreti elemektir." },
    ],
    schemaServiceType: "Mersin Uygun Fiyatlı Nakliye",
    ctaTitle: "Ücretsiz fiyat teklifi alın",
    ctaText: "Eşya miktarı, iki adres, kat ve asansörü yazın. Şeffaf, uygun fiyatlı teklifi birlikte netleştirelim.",
  },
];

export const locationBySlug = (slug: string): LocationDef | undefined =>
  locations.find((l) => l.slug === slug);

/** Footer, ana sayfa ve hub'da gösterilen ticari bölge kartları (fiyat niyeti hariç). */
export const districtLocationLinks = locations.filter((l) => l.kind !== "intent");

const extraDistricts = ["Erdemli", "Silifke", "Tarsus"];
const districtNames = [
  ...business.serviceAreas.map((area) => area.name),
  ...extraDistricts,
].filter((name, index, all) => all.indexOf(name) === index);

export const locationSchemaAreas = [
  { type: "City" as const, name: business.primaryCity },
  ...districtNames.map((name) => ({
    type: "AdministrativeArea" as const,
    name: `${name}, ${business.primaryCity}`,
  })),
];
