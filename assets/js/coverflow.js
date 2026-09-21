/* ==========================================================================
   Coverflow — منقول من مكوّن React إلى DOM خالص.

   المكوّن الأصلي يتعمّد عدم تمرير الحركة عبر حالة React ويكتب على
   style.transform مباشرة عبر refs، فالمنطق هنا هو نفسه لا محاكاة له:
   المواضع أرقام في متغيّرات، والرسم دالة واحدة تُستدعى في كل إطار.
   ========================================================================== */

(function () {
  "use strict";

  const frame = document.getElementById("cfFrame");
  const track = document.getElementById("cfTrack");
  if (!frame || !track) return;

  const cards = Array.from(track.children);
  const count = cards.length;
  if (!count) return;

  const captionEl = document.getElementById("cfCaption");
  const dotsEl = document.getElementById("cfDots");
  const prevBtn = document.getElementById("cfPrev");
  const nextBtn = document.getElementById("cfNext");

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- الإعدادات: نفس القيم الافتراضية للمكوّن الأصلي ---- */
  const ROTATE = 44;      // درجات ميل الجار الأول
  const DEPTH = 0.6;      // كم يتراجع الجار الأول، ككسر من عرض البطاقة
  const FALLOFF = 0.56;   // أُسّ المسافة — دون ١ يخفّ الميل كلما ابتعدت البطاقة
  const FADE = 0.1;       // الشفافية المفقودة لكل خطوة عن المركز
  const GAP = 0.05;       // الفراغ بين البطاقات، ككسر من العرض
  const LOOP = true;

  /* ---- الحالة ---- */
  let pos = 0;      // مؤشّر كسري للبطاقة في المركز — المصدر الوحيد للحقيقة
  let target = 0;   // وجهة الاستقرار الحالي. الخطو من pos بدلها يبتلع
                    // ضغطة مفتاح تصل أثناء الحركة قبل أن يتحرك التقريب
  let width = 0;
  let raf = null;
  let drag = null;
  let selected = 0;

  /* أقرب بطاقة صحيحة، مطويّة داخل 0..count-1 */
  const indexAt = (p) => (((Math.round(p) % count) + count) % count);

  const clamp = (p) => (LOOP ? p : Math.max(0, Math.min(count - 1, p)));

  /* ======================================================================
     الرسم — يكتب على DOM مباشرة. ستون تحديثاً في الثانية عبر أي طبقة
     حالة يعني إعادة بناء كل بطاقة لأرقام لا تحتاج أن تراها.
     ====================================================================== */
  function paint() {
    if (!width) return;
    const pitch = width * (1 + GAP);

    for (let i = 0; i < count; i++) {
      const card = cards[i];

      // طيّ المسافة على الاتجاه الأقصر حول الحلقة. هذه هي آلية الدوران
      // كلها — بلا عُقد منسوخة وبلا إعادة ترتيب للـ DOM.
      let offset = i - pos;
      if (LOOP) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      // الميل والتراجع يخفّان معاً كلما ابتعدت البطاقة — مضاعفة المسافة
      // تضيف نصف القدر تقريباً. التدرّج الخطي يُغلق البطاقة الثانية تماماً.
      const ramp = Math.pow(distance, FALLOFF);
      // محدود دون الحافة تماماً حتى لا تدير بطاقة بعيدة ظهرها.
      const tilt = Math.min(ROTATE * ramp, 82) * Math.sign(offset);

      card.style.transform =
        "translateX(calc(-50% + " + offset * pitch + "px)) " +
        "translateZ(" + -DEPTH * width * ramp + "px) " +
        "rotateY(" + -tilt + "deg)";

      // البطاقة تُنقل عبر الحلقة عند نصف دورة بالضبط، فيجب أن تكون قد
      // اختفت قبلها وإلا صارت القفزة مرئية.
      const edge = LOOP ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      const opacity = Math.max(0, 1 - FADE * distance) * edge;
      card.style.opacity = String(opacity);
      card.style.zIndex = String(100 - Math.round(distance));

      // Tab يصل إلى البطاقة المركزية فقط حتى لا يمرّ بست بطاقات في كل جولة؛
      // البقية تُبلغ بالأسهم. لكن تُخفى عن قارئ الشاشة فقط إن كانت مختفية
      // فعلاً — إخفاء صورة مرئية عن قارئ الشاشة يحجب محتوى حقيقياً.
      card.tabIndex = distance > 0.5 ? -1 : 0;
      if (opacity === 0) card.setAttribute("aria-hidden", "true");
      else card.removeAttribute("aria-hidden");
    }
  }

  /* ======================================================================
     الاستقرار — تسارع أسّي متناقص، لا نابض. النابض يُستخدم فقط لو أردنا
     تجاوز الهدف ثم العودة.
     ====================================================================== */
  function settle(to) {
    if (raf !== null) cancelAnimationFrame(raf);
    target = to;
    setSelected(indexAt(to));

    if (reduced) { pos = to; paint(); raf = null; return; }

    const step = () => {
      const remaining = target - pos;
      if (Math.abs(remaining) < 0.0004) {
        pos = target;
        paint();
        raf = null;
        return;
      }
      pos += remaining * 0.16;
      paint();
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }

  function goTo(index) {
    // يسلك الاتجاه الأقصر بدل فكّ الحلقة كاملة
    const to = LOOP
      ? index + Math.round((target - index) / count) * count
      : index;
    settle(clamp(to));
  }

  const nudge = (by) => settle(clamp(Math.round(target) + by));

  /* ======================================================================
     التسمية والنقاط
     ====================================================================== */
  function setSelected(index) {
    if (index === selected && captionEl.textContent) return;
    selected = index;

    const cap = cards[index].querySelector(".gallery__caption");
    if (captionEl && cap) captionEl.textContent = cap.textContent;

    if (dotsEl) {
      Array.from(dotsEl.children).forEach((dot, i) =>
        dot.setAttribute("aria-current", String(i === index))
      );
    }
  }

  if (dotsEl) {
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "coverflow__dot";
      dot.setAttribute("aria-label", "اذهب إلى الشريحة " + (i + 1));
      dot.addEventListener("click", () => goTo(i));
      dotsEl.appendChild(dot);
    }
  }

  /* ======================================================================
     السحب
     ====================================================================== */
  frame.addEventListener("pointerdown", (e) => {
    if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
    frame.setPointerCapture(e.pointerId);
    target = pos;
    drag = { id: e.pointerId, x: e.clientX, startX: e.clientX, pos, v: 0, t: performance.now(), moved: false };
  });

  frame.addEventListener("pointermove", (e) => {
    if (!drag || drag.id !== e.pointerId) return;
    const pitch = width * (1 + GAP);
    if (!pitch) return;

    if (Math.abs(e.clientX - drag.startX) > 4) drag.moved = true;

    const now = performance.now();
    const previous = pos;
    pos = clamp(drag.pos - (e.clientX - drag.x) / pitch);
    // بطاقات في الثانية، للاندفاع
    drag.v = ((pos - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    setSelected(indexAt(pos));
    paint();
  });

  function endDrag(e) {
    if (!drag || drag.id !== e.pointerId) return;
    const wasDrag = drag.moved;
    const v = drag.v;
    drag = null;
    // تُترك النفضة تحمل، لكن لا أكثر من بطاقتين
    const carried = Math.max(-2, Math.min(2, v * 0.18));
    settle(clamp(Math.round(pos + carried)));
    frame.dataset.dragged = wasDrag ? "1" : "";
  }

  frame.addEventListener("pointerup", endDrag);
  frame.addEventListener("pointercancel", endDrag);

  /* ======================================================================
     النقر: البطاقة الجانبية تُتوسَّط، والمركزية تفتح العارض.
     ====================================================================== */
  cards.forEach((card, i) => {
    card.addEventListener("click", (e) => {
      // نقرة نتجت عن سحب ليست نقرة
      if (frame.dataset.dragged) {
        frame.dataset.dragged = "";
        e.stopImmediatePropagation();
        return;
      }

      if (i !== selected) {
        e.stopImmediatePropagation();
        goTo(i);
      }
      // البطاقة المركزية: يُترك الحدث يمرّ إلى معالج العارض في motion.js
    });
  });

  /* التسمية تُقرأ من النص المخفي داخل البطاقة، فتحتاج تحديثاً عند تبديل اللغة */
  document.addEventListener("lawn:langchange", () => {
    const cap = cards[selected].querySelector(".gallery__caption");
    if (captionEl && cap) captionEl.textContent = cap.textContent;

    const rtl = document.documentElement.dir === "rtl";
    Array.from(dotsEl ? dotsEl.children : []).forEach((dot, i) => {
      dot.setAttribute("aria-label", (rtl ? "اذهب إلى الشريحة " : "Go to slide ") + (i + 1));
    });
  });

  /* ======================================================================
     لوحة المفاتيح — الأسهم تتبع الاتجاه البصري في اللغتين
     ====================================================================== */
  frame.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const rtl = document.documentElement.dir === "rtl";
    const forward = rtl ? e.key === "ArrowLeft" : e.key === "ArrowRight";
    nudge(forward ? 1 : -1);
  });

  if (prevBtn) prevBtn.addEventListener("click", () => nudge(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => nudge(1));

  /* ======================================================================
     القياس — عرض البطاقة يقود الخطوة والعمق والمنظور، فهو الشيء الوحيد
     الجدير بالقياس، وفقط حين يتغيّر الصندوق فعلاً.
     ====================================================================== */
  const measure = () => {
    width = cards[0].offsetWidth;
    paint();
  };

  measure();
  setSelected(0);

  if ("ResizeObserver" in window) {
    new ResizeObserver(measure).observe(frame);
  } else {
    window.addEventListener("resize", measure);
  }
})();
