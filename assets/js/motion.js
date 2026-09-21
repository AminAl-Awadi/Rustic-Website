/* ==========================================================================
   التفاعل والحركة
   ملاحظة معمارية: الصفحة تعمل بالكامل بدون هذا الملف. كل ما هنا تحسين
   فوق واجهة تعمل أصلاً — لو فشل تحميله يبقى الموقع مستخدماً.
   ========================================================================== */

(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ======================================================================
     1. التنقل — خلفية عند التمرير
     ====================================================================== */
  const nav = document.getElementById("nav");
  const heroSection = document.getElementById("hero");

  /* الشريط زجاجي وثابت: ظاهر دائماً بما في ذلك فوق المشهد — اللقطة
     تظهر خلاله فلا حاجة لإخفائه. الصنف الوحيد المتبقّي يبدّل لون الزجاج
     والنص: فوق المشهد خلفه صورة داكنة (نص فاتح ثابت)، وبعده خلفه أسطح
     الصفحة (فيتبع الثيم). */
  const onScroll = () => {
    const past = heroSection
      ? heroSection.getBoundingClientRect().bottom <= 88
      : window.scrollY > 88;

    nav.classList.toggle("is-scrolled", past);
  };

  /* بلا مِزلاج ينتظر requestAnimationFrame: rAF مُعلَّق في التبويبات
     المخفية، فأي مِزلاج يُرفع داخل الإطار يبقى مغلقاً للأبد إن فُتحت
     الصفحة في تبويب خلفي. تبديل صنف أرخص من تكلفة المِزلاج أصلاً. */
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ======================================================================
     2. قائمة الجوال
     ====================================================================== */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");

  function setMenu(open) {
    burger.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("is-locked", open);

    const ar = document.documentElement.lang === "ar";
    burger.setAttribute(
      "aria-label",
      ar ? (open ? "إغلاق القائمة" : "فتح القائمة") : (open ? "Close menu" : "Open menu")
    );
  }

  burger.addEventListener("click", () => {
    setMenu(burger.getAttribute("aria-expanded") !== "true");
  });

  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => setMenu(false))
  );

  /* ======================================================================
     3. Lightbox
     ====================================================================== */
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCap = document.getElementById("lbCap");
  const lbClose = document.getElementById("lbClose");
  let lastFocused = null;

  function openLightbox(trigger) {
    const img = trigger.querySelector("img");
    const caption = trigger.querySelector(".gallery__caption");

    lastFocused = trigger;
    lbImg.src = trigger.dataset.full || img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = caption ? caption.textContent : "";

    lightbox.classList.add("is-open");
    document.body.classList.add("is-locked");
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("is-locked");
    lbImg.src = "";
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll(".gallery__item").forEach((item) =>
    item.addEventListener("click", () => openLightbox(item))
  );

  lbClose.addEventListener("click", closeLightbox);

  // النقر على الخلفية يغلق، النقر على الصورة لا
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (lightbox.classList.contains("is-open")) closeLightbox();
      else if (burger.getAttribute("aria-expanded") === "true") setMenu(false);
    }

    // حبس التركيز: زر الإغلاق هو العنصر الوحيد القابل للتركيز داخل الحوار
    if (e.key === "Tab" && lightbox.classList.contains("is-open")) {
      e.preventDefault();
      lbClose.focus();
    }
  });

  /* ======================================================================
     3b. قبل / بعد
     المقبض عنصر <input type="range"> حقيقي شفاف فوق المشهد — فيعمل
     بالسحب واللمس ولوحة المفاتيح ويُعلن نفسه لقارئ الشاشة دون كود إضافي.
     ====================================================================== */
  const baR1 = document.getElementById("baRange1");
  const baR2 = document.getElementById("baRange2");
  const baReveal = document.getElementById("baReveal");

  if (baR1 && baR2 && baReveal) {
    /* المقبضان لا يتجاوزان بعضهما: التجاوز يقلب ترتيب المراحل فتظهر
       «بعد» يسار «أثناء» وينهار معنى التدرّج. يُمنع بفجوة صغيرة بدل
       السماح بالتساوي، لأن التساوي يُخفي المرحلة الوسطى تماماً. */
    const GAP = 4;

    const sync = () => {
      let p1 = parseFloat(baR1.value);
      let p2 = parseFloat(baR2.value);

      if (p1 > p2 - GAP) {
        if (document.activeElement === baR1) p1 = p2 - GAP;
        else p2 = p1 + GAP;
      }
      p1 = Math.min(Math.max(p1, 0), 100 - GAP);
      p2 = Math.min(Math.max(p2, GAP), 100);

      baR1.value = p1;
      baR2.value = p2;
      baReveal.style.setProperty("--p1", p1 + "%");
      baReveal.style.setProperty("--p2", p2 + "%");
    };

    baR1.addEventListener("input", sync);
    baR2.addEventListener("input", sync);
    sync();
  }

  /* 3c. مقارنات داخل بطاقات الخدمات — نفس الفكرة بلا معرّفات ثابتة.
     يُختار كل مقبض من صنفه ويكتب على حاويته، فإضافة بطاقة مقارنة جديدة
     لا تحتاج سطراً هنا. */
  document.querySelectorAll(".compare__range").forEach((range) => {
    const box = range.closest(".swatch__chip--compare");
    if (!box) return;
    const sync = () => box.style.setProperty("--pos", range.value + "%");
    range.addEventListener("input", sync);
    sync();
  });

  /* ======================================================================
     4. العدّادات — تعمل مرة واحدة عند الظهور
     ====================================================================== */
  const counters = document.querySelectorAll("[data-count], [data-count-since]");

  /* عدّاد سنوات الخبرة يحمل سنة التأسيس لا عدداً ثابتاً. العدد المثبّت
     يصير خاطئاً عند أول رأس سنة، والاشتقاق يبقيه صحيحاً بلا صيانة. */
  function targetOf(el) {
    if (el.dataset.countSince) {
      return new Date().getFullYear() - parseInt(el.dataset.countSince, 10);
    }
    return parseInt(el.dataset.count, 10);
  }

  function runCounter(el) {
    const target = targetOf(el);
    const suffix = el.dataset.suffix || "";

    if (reduced) {
      el.textContent = target + suffix;
      return;
    }

    const duration = 1600;
    const start = performance.now();

    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      // ease-out: يبطئ قرب النهاية بدل التوقف المفاجئ
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          obs.unobserve(entry.target); // مرة واحدة فقط
        });
      },
      { threshold: 0.4 }
    );
    /* الرقم النهائي مكتوب في HTML ليقرأه زائر بلا جافاسكربت ومحرّك
       البحث. يُصفَّر هنا فقط لأن العدّاد سيتولّاه — فلا يُرى «0» إلا حين
       يوجد من يحرّكه. */
    counters.forEach((c) => {
      c.textContent = "0";
      counterObserver.observe(c);
    });
  } else {
    counters.forEach(runCounter);
  }

  /* ======================================================================
     5. تحقق النموذج + الإرسال عبر واتساب
     ====================================================================== */
  const form = document.getElementById("quoteForm");
  const fName = document.getElementById("fName");
  const fPhone = document.getElementById("fPhone");

  // جوال سعودي: ١٠ أرقام تبدأ بـ 05، أو صيغة دولية
  const PHONE_RE = /^(?:\+?966|0)?5\d{8}$/;

  function normalizePhone(v) {
    // تحويل الأرقام العربية إلى لاتينية ثم إزالة الفواصل
    return v
      .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
      .replace(/[\s\-()]/g, "");
  }

  function validateField(input) {
    const field = input.closest(".field");
    let ok = true;

    if (input === fName) ok = input.value.trim().length >= 2;
    if (input === fPhone) ok = PHONE_RE.test(normalizePhone(input.value));

    field.classList.toggle("has-error", !ok);
    input.setAttribute("aria-invalid", String(!ok));
    return ok;
  }

  // التحقق عند مغادرة الحقل — لا عند كل ضغطة مفتاح
  [fName, fPhone].forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    // بعد ظهور خطأ، صحّحه فوراً أثناء الكتابة
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("has-error")) validateField(input);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameOk = validateField(fName);
    const phoneOk = validateField(fPhone);

    if (!nameOk || !phoneOk) {
      // ينقل التركيز إلى أول حقل خاطئ
      (nameOk ? fPhone : fName).focus();
      return;
    }

    const data = new FormData(form);
    const ar = document.documentElement.lang === "ar";

    const lines = ar
      ? [
          "طلب عرض سعر — مؤسسة لون",
          "الاسم: " + data.get("name"),
          "الجوال: " + data.get("phone"),
          "نوع المشروع: " + data.get("type"),
          "التفاصيل: " + (data.get("message") || "—"),
        ]
      : [
          "Quote request — Lawn Contracting",
          "Name: " + data.get("name"),
          "Phone: " + data.get("phone"),
          "Project type: " + data.get("type"),
          "Details: " + (data.get("message") || "—"),
        ];

    const waHref = document.getElementById("waFloat").href.split("?")[0];
    window.open(waHref + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
  });

  /* ======================================================================
     6. GSAP — طبقة الحركة
     ====================================================================== */
  // شبكة أمان: لو فشل تحميل GSAP من الـ CDN أو كان تقليل الحركة مفعّلاً،
  // نزيل الصنف فيعود كل شيء مرئياً بدل أن تبقى الصفحة فارغة.
  if (reduced || typeof window.gsap === "undefined") {
    document.documentElement.classList.remove("js-motion");
    return;
  }

  const gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);

  /* --- خط الدهان عند التحميل --- */
  const wipe = document.querySelector(".paint-wipe");
  wipe.style.display = "block";

  const intro = gsap.timeline();
  intro
    .fromTo(wipe, { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "power3.in" })
    .set(wipe, { transformOrigin: document.documentElement.dir === "rtl" ? "left" : "right" })
    .to(wipe, { scaleX: 0, duration: 0.55, ease: "power3.out" })
    .set(wipe, { display: "none" });

  /* --- الهيرو: يدخل بعد انحسار خط الدهان ---
     fromTo لا from — لأن CSS يضع opacity:0 كحالة أولية، و from ستعتبرها
     القيمة النهائية فيبقى العنصر مخفياً. */
  intro.fromTo(
    "#hero [data-reveal]",
    { y: 34, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.08 },
    "-=0.25"
  );

  /* --- كشف عناصر الأقسام عند التمرير --- */
  document.querySelectorAll("section:not(#hero)").forEach((section) => {
    const items = section.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    gsap.fromTo(
      items,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      }
    );
  });

  /* الكتل الزخرفية في الهيرو أُزيلت — الفيديو صار الحدث البصري هناك،
     وحركته يتولّاها hero-video.js عبر التمرير. */
})();
