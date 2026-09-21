/* ==========================================================================
   i18n + بيانات المؤسسة
   ========================================================================== */

/* ┌──────────────────────────────────────────────────────────────────────┐
   │  ⚠️  عدّل هذه القيم — هذا هو المكان الوحيد الذي تحتاج تغييره         │
   └──────────────────────────────────────────────────────────────────────┘ */
const BIZ = {
  // رقم الجوال كما يُعرض للزائر
  phoneDisplay: "+966 50 384 0013",
  // نفس الرقم بصيغة الاتصال الدولية (بدون مسافات أو رموز)
  phoneDial: "+966503840013",

  // رقم واتساب — صيغة دولية بدون + وبدون صفر البداية
  // مثال: 966512345678
  whatsapp: "966503840013",
  whatsappDisplay: "+966 50 384 0013",

  email: "colourpaintest@yahoo.com",
  crNumber: "2051028422",       // رقم السجل التجاري
};
/* ────────────────────────────────────────────────────────────────────── */


const I18N = {
  ar: {
    "meta.title": "مؤسسة لون للمقاولات العامة — متخصصون في الدهانات",
    "meta.desc": "مؤسسة لون للمقاولات العامة — دهانات داخلية وخارجية، ديكورات وتشطيبات، جبس بورد، لياسة وترميم. جودة تنفيذ وتسليم في الموعد.",

    "brand.short": "مؤسسة لون",
    "brand.full": "مؤسسة لون للمقاولات العامة",

    "a11y.skip": "تخطَّ إلى المحتوى",
    "a11y.wa": "تواصل عبر واتساب",
    "a11y.close": "إغلاق",
    "a11y.compare": "اسحب لمقارنة التشطيبين",
    "a11y.closeMenu": "إغلاق القائمة",
    "a11y.theme": "تبديل بين الوضع الفاتح والداكن",

    "nav.about": "من نحن",
    "nav.services": "خدماتنا",
    "nav.work": "أعمالنا",
    "nav.contact": "تواصل معنا",

    "cta.quote": "اطلب عرض سعر",
    "cta.work": "شاهد أعمالنا",

    "hero.eyebrow": "مقاولات عامة · دهانات",
    "hero.line1": "نُتقن اللون",
    "hero.line2": "فيتغيّر المكان",
    "hero.sub": "مؤسسة لون للمقاولات العامة — متخصصون في الدهانات الداخلية والخارجية والتشطيبات. خامات معتمدة، فريق مدرّب، وتسليم في الموعد المتفق عليه.",

    "about.eyebrow": "من نحن",
    "about.title": "خبرة ميدانية تُترجَم إلى جدران لا تحتاج إعادة عمل",
    "about.p1": "نعمل في قطاع المقاولات العامة مع تخصص أساسي في الدهانات. نتعامل مع الفلل والشقق والمكاتب والمنشآت التجارية، ونلتزم بمعايير تحضير الأسطح قبل الدهان — لأن جودة النتيجة النهائية تُحسم في هذه المرحلة تحديداً.",
    "about.p2": "نبدأ بمعاينة مجانية وتقدير واضح للتكلفة والمدة، ثم ننفّذ بفريق ثابت مدرّب، ونسلّم الموقع نظيفاً. لا تكاليف مفاجئة بعد الاتفاق.",
    "about.point1": "معاينة وتسعير مجاني قبل بدء أي عمل",
    "about.point2": "خامات أصلية من موردين معتمدين",
    "about.point3": "ضمان على التنفيذ ومتابعة بعد التسليم",
    "about.point4": "التزام بالموعد وتسليم الموقع نظيفاً",

    "stats.years": "سنة خبرة",
    "stats.projects": "مشروع منجز",
    "stats.clients": "عميل",
    "stats.ontime": "تسليم في الموعد",

    "services.eyebrow": "خدماتنا",
    "services.title": "من التحضير حتى اللمسة الأخيرة",
    "services.lede": "نغطي دورة العمل كاملة، فلا تحتاج للتنسيق بين أكثر من مقاول.",
    "svc.1.t": "دهانات داخلية",
    "svc.1.d": "تحضير كامل للأسطح، معجون، وطبقات دهان متساوية بحواف نظيفة وبدون روائح مزعجة.",
    "svc.2.t": "دهانات خارجية",
    "svc.2.d": "دهانات مقاومة للحرارة والأتربة والأشعة، تحافظ على لونها في مناخ المنطقة لسنوات.",
    "svc.3.t": "ديكورات وتشطيبات",
    "svc.3.d": "ورق جدران، دهانات ثلاثية الأبعاد، أسقف مزخرفة، وبروفايلات بتنفيذ دقيق.",
    "svc.4.t": "جبس بورد",
    "svc.4.d": "أسقف وقواطع جبس بورد، أسقف مخفية وبارزة، وتجهيز للإنارة المدمجة بسطح جاهز للدهان.",
    "svc.5.t": "ترميم وصيانة",
    "svc.5.d": "معالجة التشققات والتقشير والرطوبة، وإعادة المبنى إلى حالته بأقل تدخل ممكن.",
    "svc.6.t": "لياسة",
    "svc.6.d": "لياسة أسمنتية مستوية للجدران والأسقف، زوايا مستقيمة وسطح مهيّأ للمعجون والدهان.",

    /* نصوص بديلة لصور الخدمات */
    "svc.img.interior": "جدار داخلي بتشطيب جيري أبيض ناعم الملمس",
    "svc.img.exterior": "جدار خارجي بدهان مُزمَّل خشن حبيبي الملمس",
    "svc.img.decorA": "تشطيب ديكوري إسمنتي رمادي ناعم",
    "svc.img.decorB": "تشطيب ديكوري بيج متموّج الملمس",
    "svc.img.gypsum": "غرفة بسقف جبس بورد مخفي وإنارة خطّية مدمجة",
    "svc.img.restore": "إعادة دهان جدار برول فوق سطح مُعالَج",
    "svc.img.plaster": "يد تُلاسّ جداراً إسمنتياً بالمسطرين",

    "ba.eyebrow": "الفرق",
    "ba.title": "اسحب المقبضين وشوف المراحل الثلاث",
    "ba.lede": "جدار متشقّق، ثم بعد معالجة الشقوق وتحضير السطح، ثم بعد الدهان.",
    "ba.before": "قبل",
    "ba.during": "أثناء التحضير",
    "ba.after": "بعد",
    "ba.aria1": "حدّ مرحلة التحضير",
    "ba.aria2": "حدّ مرحلة الدهان",

    "work.eyebrow": "أعمالنا",
    "work.title": "مشاريع نفخر بتسليمها",
    "work.aria": "معرض الأعمال",
    "work.prev": "الشريحة السابقة",
    "work.next": "الشريحة التالية",
    "work.1.cap": "دهانات خارجية — تنفيذ بالرول الطويل",
    "work.1.alt": "عامل بملابس عمل حمراء وخوذة يدهن واجهة مبنى برول طويل",
    "work.2.cap": "غرفة داخلية — بعد الوجه النهائي",
    "work.2.alt": "غرفة بيضاء بعد الدهان وبداخلها سلّم ومقعد عمل",
    "work.3.cap": "دهانات داخلية — تمرير الوجه الأول",
    "work.3.alt": "يد تمرّر رول الدهان على جدار داخلي عن قرب",
    "work.4.cap": "ديكور داخلي — جدار بلون مميّز",
    "work.4.alt": "جدار داخلي بلون برتقالي دافئ معلّق عليه إطاران",
    "work.5.cap": "الخامات — عدّة نظيفة لكل موقع",
    "work.5.alt": "رول دهان أبيض نظيف قبل الاستخدام",
    "work.6.cap": "سطح مستوٍ — دهان بلا آثار رول",
    "work.6.alt": "جدار مدهون بلون أخضر مصمت بسطح مستوٍ",

    "contact.eyebrow": "تواصل معنا",
    "contact.title": "احصل على عرض سعر خلال ٢٤ ساعة",
    "contact.lede": "أرسل تفاصيل مشروعك وسنعاود التواصل معك بتقدير مبدئي للتكلفة والمدة.",
    "contact.phone": "الجوال",
    "contact.wa": "واتساب",
    "contact.mail": "البريد الإلكتروني",
    "contact.city": "الموقع",
    "contact.cityValue": "الظهران، المملكة العربية السعودية",

    "form.name": "الاسم *",
    "form.phone": "رقم الجوال *",
    "form.type": "نوع المشروع",
    "form.type.1": "دهانات داخلية",
    "form.type.2": "دهانات خارجية",
    "form.type.3": "ديكورات وتشطيبات",
    "form.type.4": "جبس بورد",
    "form.type.5": "ترميم وصيانة",
    "form.type.6": "لياسة",
    "form.msg": "تفاصيل المشروع",
    "form.msg.ph": "مثال: فيلا دورين، مساحة ٤٠٠م، مطلوب دهان داخلي وخارجي",
    "form.msg.hint": "كلما زادت التفاصيل، كان التسعير أدق.",
    "form.submit": "أرسل الطلب عبر واتساب",
    "form.note": "بالضغط على الزر سيُفتح واتساب برسالة جاهزة تحتوي بياناتك — تراجعها قبل الإرسال.",
    "form.err.name": "الرجاء إدخال الاسم",
    "form.err.phone": "أدخل رقم جوال صحيح (١٠ أرقام يبدأ بـ ٠٥)",

    "footer.tag": "متخصصون في الدهانات والتشطيبات. جودة تنفيذ والتزام بالموعد.",
    "footer.links": "روابط",
    "footer.contact": "للتواصل",
    "footer.cr": "س.ت " + BIZ.crNumber,
    "footer.rights": "© ٢٠٢٦ مؤسسة لون للمقاولات العامة. جميع الحقوق محفوظة.",
    "footer.city": "الظهران، المملكة العربية السعودية",

    "wa.intro": "السلام عليكم، أرغب في عرض سعر.",
  },

  en: {
    "meta.title": "Lawn General Contracting — Painting Specialists",
    "meta.desc": "Lawn General Contracting — interior and exterior painting, finishes, gypsum board, plastering and restoration. Quality workmanship, delivered on schedule.",

    "brand.short": "Lawn",
    "brand.full": "Lawn General Contracting",

    "a11y.skip": "Skip to content",
    "a11y.wa": "Contact us on WhatsApp",
    "a11y.close": "Close",
    "a11y.compare": "Drag to compare the two finishes",
    "a11y.closeMenu": "Close menu",
    "a11y.theme": "Toggle light and dark mode",

    "nav.about": "About",
    "nav.services": "Services",
    "nav.work": "Our Work",
    "nav.contact": "Contact",

    "cta.quote": "Request a Quote",
    "cta.work": "See Our Work",

    "hero.eyebrow": "General Contracting · Painting",
    "hero.line1": "We master colour",
    "hero.line2": "the space transforms",
    "hero.sub": "Lawn General Contracting — specialists in interior and exterior painting and finishes. Certified materials, a trained crew, and delivery on the date we agreed.",

    "about.eyebrow": "About Us",
    "about.title": "Field experience that shows up as walls you never redo",
    "about.p1": "We work across general contracting with painting as our core specialty — villas, apartments, offices and commercial facilities. We hold to proper surface preparation before any paint goes on, because that stage is where the final result is actually decided.",
    "about.p2": "We start with a free site visit and a clear estimate of cost and duration, execute with a consistent trained crew, and hand the site back clean. No surprise costs after the agreement.",
    "about.point1": "Free site visit and quote before any work begins",
    "about.point2": "Genuine materials from certified suppliers",
    "about.point3": "Workmanship warranty and post-handover follow-up",
    "about.point4": "On-schedule delivery, site handed back clean",

    "stats.years": "Years of experience",
    "stats.projects": "Projects delivered",
    "stats.clients": "Clients",
    "stats.ontime": "On-time delivery",

    "services.eyebrow": "Our Services",
    "services.title": "From preparation to the final coat",
    "services.lede": "We cover the full cycle, so you never have to coordinate between multiple contractors.",
    "svc.1.t": "Interior Painting",
    "svc.1.d": "Full surface preparation, filling, and even coats with clean edges — and no lingering odour.",
    "svc.2.t": "Exterior Painting",
    "svc.2.d": "Heat, dust and UV resistant coatings that hold their colour in this climate for years.",
    "svc.3.t": "Décor & Finishes",
    "svc.3.d": "Wallpaper, 3D wall finishes, decorative ceilings and profiles, precisely executed.",
    "svc.4.t": "Gypsum Board",
    "svc.4.d": "Gypsum ceilings and partitions, concealed and stepped ceilings, prepared for recessed lighting and ready to paint.",
    "svc.5.t": "Restoration",
    "svc.5.d": "Treating cracks, peeling and moisture, returning the building to condition with minimal intervention.",
    "svc.6.t": "Plastering",
    "svc.6.d": "Level cement plaster on walls and ceilings — straight corners and a surface ready for filler and paint.",

    /* alt text for the service images */
    "svc.img.interior": "Interior wall with a smooth white limestone-effect finish",
    "svc.img.exterior": "Exterior wall with a coarse granular textured coating",
    "svc.img.decorA": "Smooth grey cement decorative finish",
    "svc.img.decorB": "Beige decorative finish with a rippled texture",
    "svc.img.gypsum": "Room with a stepped gypsum ceiling and recessed linear lighting",
    "svc.img.restore": "Repainting a wall with a roller over a treated surface",
    "svc.img.plaster": "A hand smoothing cement plaster onto a wall with a float",

    "ba.eyebrow": "The difference",
    "ba.title": "Drag the two handles and see all three stages",
    "ba.lede": "A cracked wall, then after the cracks are treated and the surface prepared, then after paint.",
    "ba.before": "Before",
    "ba.during": "In preparation",
    "ba.after": "After",
    "ba.aria1": "Preparation stage boundary",
    "ba.aria2": "Paint stage boundary",

    "work.eyebrow": "Our Work",
    "work.title": "Projects we are proud to have delivered",
    "work.aria": "Work gallery",
    "work.prev": "Previous slide",
    "work.next": "Next slide",
    "work.1.cap": "Exterior painting — long-pole roller",
    "work.1.alt": "A worker in red overalls and a helmet painting a building façade with a long-pole roller",
    "work.2.cap": "Interior room — after the final coat",
    "work.2.alt": "A white room after painting, with a ladder and a work stool inside",
    "work.3.cap": "Interior painting — first coat going on",
    "work.3.alt": "Close-up of a hand rolling paint onto an interior wall",
    "work.4.cap": "Interior décor — a feature wall",
    "work.4.alt": "An interior wall in a warm orange tone with two framed pictures",
    "work.5.cap": "Materials — clean kit on every site",
    "work.5.alt": "A clean white paint roller before use",
    "work.6.cap": "An even surface — no roller marks",
    "work.6.alt": "A wall painted a solid green with an even finish",

    "contact.eyebrow": "Contact",
    "contact.title": "Get a quote within 24 hours",
    "contact.lede": "Send us your project details and we'll come back with an initial estimate of cost and duration.",
    "contact.phone": "Phone",
    "contact.wa": "WhatsApp",
    "contact.mail": "Email",
    "contact.city": "Location",
    "contact.cityValue": "Dhahran, Saudi Arabia",

    "form.name": "Name *",
    "form.phone": "Mobile number *",
    "form.type": "Project type",
    "form.type.1": "Interior painting",
    "form.type.2": "Exterior painting",
    "form.type.3": "Décor & finishes",
    "form.type.4": "Gypsum board",
    "form.type.5": "Restoration",
    "form.type.6": "Plastering",
    "form.msg": "Project details",
    "form.msg.ph": "e.g. Two-storey villa, 400 m², interior and exterior painting needed",
    "form.msg.hint": "The more detail you give, the more accurate the quote.",
    "form.submit": "Send via WhatsApp",
    "form.note": "This opens WhatsApp with a pre-filled message containing your details — review it before sending.",
    "form.err.name": "Please enter your name",
    "form.err.phone": "Enter a valid mobile number (10 digits starting with 05)",

    "footer.tag": "Painting and finishing specialists. Quality workmanship, delivered on time.",
    "footer.links": "Links",
    "footer.contact": "Get in touch",
    "footer.cr": "CR " + BIZ.crNumber,
    "footer.rights": "© 2026 Lawn General Contracting. All rights reserved.",
    "footer.city": "Dhahran, Saudi Arabia",

    "wa.intro": "Hello, I'd like to request a quote.",
  },
};

/* ========================================================================== */

let currentLang = localStorage.getItem("lawn-lang") || "ar";

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || I18N.ar[key] || key;
}

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem("lawn-lang", lang);

  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = t(key);
    const attr = el.getAttribute("data-i18n-attr");

    if (attr) {
      el.setAttribute(attr, value);
    } else if (el.tagName === "TITLE") {
      document.title = value;
    } else {
      el.textContent = value;
    }
  });

  // زر التبديل يعرض اللغة الأخرى دائماً
  const toggle = document.getElementById("langToggle");
  if (toggle) {
    toggle.textContent = lang === "ar" ? "EN" : "ع";
    toggle.setAttribute("aria-label", lang === "ar" ? "Switch to English" : "التبديل إلى العربية");
  }

  // المكوّنات التي تنسخ نصوصاً من DOM (مثل تسمية الـ coverflow) تستمع لهذا
  document.dispatchEvent(new CustomEvent("lawn:langchange", { detail: { lang } }));

  const burger = document.getElementById("burger");
  if (burger) {
    const open = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute(
      "aria-label",
      lang === "ar" ? (open ? "إغلاق القائمة" : "فتح القائمة")
                    : (open ? "Close menu" : "Open menu")
    );
  }
}

/* حقن بيانات التواصل في كل مكان تظهر فيه */
function applyBusinessData() {
  const waHref = "https://wa.me/" + BIZ.whatsapp;

  const set = (id, fn) => { const el = document.getElementById(id); if (el) fn(el); };

  set("valPhone", (el) => (el.textContent = BIZ.phoneDisplay));
  set("footPhone", (el) => (el.textContent = BIZ.phoneDisplay));
  set("cardPhone", (el) => (el.href = "tel:" + BIZ.phoneDial));
  set("footPhone", (el) => (el.href = "tel:" + BIZ.phoneDial));

  set("valWa", (el) => (el.textContent = BIZ.whatsappDisplay));
  set("cardWa", (el) => (el.href = waHref + "?text=" + encodeURIComponent(t("wa.intro"))));
  set("waFloat", (el) => (el.href = waHref + "?text=" + encodeURIComponent(t("wa.intro"))));

  set("valMail", (el) => (el.textContent = BIZ.email));
  set("footMail", (el) => { el.textContent = BIZ.email; el.href = "mailto:" + BIZ.email; });
  set("cardMail", (el) => (el.href = "mailto:" + BIZ.email));
}

/* ========================================================================== */

/* ==========================================================================
   الثيم
   الاختيار الصريح يُحفظ ويتقدّم على النظام. بلا اختيار، الصفحة تتبع
   إعداد الجهاز — والزر يبدأ من الحالة المعروضة فعلاً لا من افتراض.
   ========================================================================== */

function currentTheme() {
  const set = document.documentElement.getAttribute("data-theme");
  if (set) return set;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function setupTheme() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("lawn-theme", next); } catch (e) { /* محجوب */ }

    // شريط المتصفح على الجوال يتبع الثيم المختار لا إعداد النظام
    const meta = document.querySelector('meta[name="theme-color"]:not([media])')
      || document.head.appendChild(
           Object.assign(document.createElement("meta"), { name: "theme-color" }));
    meta.setAttribute("content", next === "dark" ? "#14120f" : "#faf7f3");
  });
}

/* ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  applyLang(currentLang);
  applyBusinessData();
  setupTheme();

  const toggle = document.getElementById("langToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = currentLang === "ar" ? "en" : "ar";
      const main = document.getElementById("main");

      // crossfade قصير يمنع وميض تبدّل النصوص
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        applyLang(next);
        applyBusinessData();
        return;
      }

      main.style.transition = "opacity 200ms ease";
      main.style.opacity = "0";
      setTimeout(() => {
        applyLang(next);
        applyBusinessData();
        main.style.opacity = "1";
      }, 200);
    });
  }
});
