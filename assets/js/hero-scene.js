/* ==========================================================================
   مشهد الهيرو — تسلسل صور يتقدّم بالتمرير

   لماذا صور لا فيديو؟
   عنصر <video> يعتمد على محرّك الوسائط وفكّ الترميز بالعتاد، وهو معطّل
   على بعض الأجهزة (يفشل حتى مع مقطع ٨ كيلوبايت). الصور تمرّ بمسار مختلف
   تماماً ولا تفشل. كل إطار صورة مستقلة، فالانتقال لأي لحظة فوري بلا بحث
   ولا إطارات مفتاحية.

   لا يعتمد على GSAP — لو فشل الـ CDN يبقى المشهد يعمل.
   ========================================================================== */

(function () {
  "use strict";

  const FRAME_COUNT = 60;
  const FRAME_PATH = (i) =>
    "assets/frames/f" + String(i + 1).padStart(3, "0") + ".jpg";

  const hero = document.getElementById("hero");
  const canvas = document.getElementById("heroCanvas");
  const content = hero && hero.querySelector(".hero__content");
  if (!hero || !canvas) return;

  const ctx = canvas.getContext("2d", { alpha: false });

  const frames = new Array(FRAME_COUNT);
  const loaded = new Array(FRAME_COUNT).fill(false);
  let drawn = -1;

  /* ======================================================================
     التحميل — الإطار الأول أولاً ليظهر شيء فوراً، ثم الباقي في الخلفية
     ====================================================================== */
  function load(i, onDone) {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      loaded[i] = true;
      if (canvas.width !== img.naturalWidth) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }
      if (onDone) onDone();
    };
    img.src = FRAME_PATH(i);
    frames[i] = img;
  }

  // الإطار الأول: يُرسم فور وصوله فلا يبقى الهيرو فارغاً
  load(0, () => { paint(0); rest(); });

  function rest() {
    for (let i = 1; i < FRAME_COUNT; i++) load(i);
  }

  /* ======================================================================
     الرسم — أقرب إطار مُحمّل، فلا فراغ أثناء التحميل
     ====================================================================== */
  function paint(index) {
    let i = index;
    if (!loaded[i]) {
      // ابحث عن أقرب إطار جاهز في الاتجاهين
      let found = -1;
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (i - d >= 0 && loaded[i - d]) { found = i - d; break; }
        if (i + d < FRAME_COUNT && loaded[i + d]) { found = i + d; break; }
      }
      if (found === -1) return;
      i = found;
    }
    if (i === drawn) return;
    ctx.drawImage(frames[i], 0, 0);
    drawn = i;
  }

  /* ======================================================================
     من موضع التمرير إلى رقم الإطار
     ====================================================================== */
  function progress() {
    const travel = hero.offsetHeight - window.innerHeight;
    if (travel <= 0) return 0;
    return Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / travel));
  }

  /* ⚠️ بلا مِزلاج ينتظر requestAnimationFrame.
     rAF مُعلَّق تماماً في التبويبات المخفية، فأي مِزلاج يُرفع داخل الإطار
     يبقى مغلقاً للأبد إن فُتحت الصفحة في تبويب خلفي — ولا يستجيب التمرير
     بعدها أبداً. رسم صورة مُحمّلة مسبقاً أرخص من مليمتر ثانية، والمتصفح
     يوحّد أحداث التمرير في الإطار أصلاً، فالعمل المباشر أبسط وأأمن. */
  function update() {
    const p = progress();
    paint(Math.round(p * (FRAME_COUNT - 1)));

    if (content) {
      // النص يبقى مقروءاً في أول ثلثي المشهد ثم ينسحب
      const fade = Math.min(1, Math.max(0, (p - 0.55) / 0.35));
      content.style.opacity = String(1 - fade);
      content.style.transform = "translateY(" + -fade * 28 + "px)";
      content.style.pointerEvents = fade > 0.9 ? "none" : "";
    }
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  // عند العودة من تبويب خلفي: الرسم على canvas قد يكون ضاع، فيُعاد
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) { drawn = -1; update(); }
  });
  update();
})();
