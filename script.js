/**
 * دعوة حفل خطوبة: عمار ♥ سارة
 * Logic & Interactivity: 3D Envelope with Slide Card, Music, Countdown, Calendar & WhatsApp Greetings
 */

// =============================================================================
// 1. إعدادات المناسبة وبيانات الدعوة (Config)
// =============================================================================
const config = {
  groom: 'عمار',
  bride: 'سارة',
  date: '2026-10-16T20:30:00+03:00', // الجمعة 16 أكتوبر 2026 - الساعة 8:30 مساءً (بعد صلاة العشاء)
  dateLabel: 'الجمعة ١٦ أكتوبر ٢٠٢٦',
  timeLabel: 'الساعة 8:30 مساءً',
  timeNote: 'بعد صلاة العشاء',
  venue: 'بني زايد امام مطعم هيما الكلباوي',
  mapUrl: 'https://maps.app.goo.gl/kuFqbsdkvJkTpZNR6',
  whatsappPhone: '201153751600', // رقم إرسال التهنئة المباشر
  defaultWish: 'ألف مبروك للعروسين عمار وسارة بمناسبة الخطوبة المباركة! ربنا يتمم لكم على خير وسعادة 💍❤️',
  shareTitle: 'دعوة حفل خطوبة عمار ♥ سارة 💍',
  shareText: 'يسعدنا ويشرفنا دعوتكم لحضور حفل خطوبتنا (عمار ♥ سارة) يوم الجمعة 16 أكتوبر 2026 الساعة 8:30 مساءً في بني زايد امام مطعم هيما الكلباوي. فرحتنا تكمل بوجودكم معنا 💍✨'
};

const $ = (id) => document.getElementById(id);

// تعبئة البيانات في عناصر الصفحة
$('coverGroom').textContent = config.groom;
$('coverBride').textContent = config.bride;
$('groomName').textContent = config.groom;
$('brideName').textContent = config.bride;
$('dateText').textContent = config.dateLabel;
$('venueText').textContent = config.venue;
$('mapLink').href = config.mapUrl;

// تهيئة رابط واتساب الافتراضي
function getWhatsappUrl(message) {
  return `https://wa.me/${config.whatsappPhone}?text=${encodeURIComponent(message)}`;
}

const whatsappBtn = $('whatsappCongratsBtn');
whatsappBtn.href = getWhatsappUrl(config.defaultWish);

// تفعيل شرائح التهنئة السريعة
document.querySelectorAll('.wish-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const wish = chip.getAttribute('data-wish');
    whatsappBtn.href = getWhatsappUrl(wish);
    
    // تأثير بصري لاختيار الشريحة
    document.querySelectorAll('.wish-chip').forEach(c => {
      c.style.borderColor = 'rgba(98, 17, 32, 0.3)';
      c.style.background = '#fdfaf5';
    });
    chip.style.borderColor = 'var(--burgundy-text)';
    chip.style.background = 'rgba(98, 17, 32, 0.15)';

    // فتح واتساب مباشرة عند النقر
    window.open(getWhatsappUrl(wish), '_blank', 'noopener,noreferrer');
  });
});

// =============================================================================
// 2. توليد النجوم المتلألئة والبتلات المتساقطة
// =============================================================================
const starsContainer = $('stars');
for (let i = 0; i < 80; i++) {
  const star = document.createElement('i');
  star.className = 'star';
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 4}s`;
  star.style.animationDuration = `${2.5 + Math.random() * 3}s`;
  starsContainer.appendChild(star);
}

const petalsContainer = $('petals');
const petalSymbols = ['🌸', '✿', '💍', '♥', '✨', '🤍', '💐'];

function spawnPetals(count = 1) {
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.fontSize = `${14 + Math.random() * 15}px`;
    petal.style.animationDuration = `${6 + Math.random() * 6}s`;
    petalsContainer.appendChild(petal);

    setTimeout(() => petal.remove(), 12000);
  }
}

// =============================================================================
// 3. مشغل الصوت والموسيقى مع شارة الإرشاد
// =============================================================================
const music = $('music');
const musicBtn = $('musicBtn');
const musicTooltip = $('musicTooltip');

function showMusicTooltip(text = 'يا دبلة الخطوبة (بدون موسيقى) ♫') {
  if (!musicTooltip) return;
  musicTooltip.textContent = text;
  musicTooltip.classList.add('show');
  setTimeout(() => musicTooltip.classList.remove('show'), 3000);
}

function toggleMusic() {
  if (music.paused) {
    music.play().then(() => {
      musicBtn.textContent = '♫';
      musicBtn.classList.add('playing');
      musicBtn.title = 'إيقاف الأغنية';
      showMusicTooltip('الأغنية تعمل ♫');
    }).catch(() => {
      musicBtn.textContent = '♪';
      musicBtn.classList.remove('playing');
    });
  } else {
    music.pause();
    musicBtn.textContent = '♪';
    musicBtn.classList.remove('playing');
    musicBtn.title = 'تشغيل الأغنية';
    showMusicTooltip('تم إيقاف الأغنية');
  }
}

musicBtn.addEventListener('click', toggleMusic);

// =============================================================================
// 4. فتح الظرف ثلاثي الأبعاد مع بطاقة الانزلاق (مُحسّن لنظامي iOS و Android)
// =============================================================================
let isOpened = false;
let petalInterval;

function openInvitation(e) {
  if (e && e.type === 'touchstart') {
    e.preventDefault();
  }
  if (isOpened) return;
  isOpened = true;

  $('openBtn').disabled = true;
  $('envelope').classList.add('open');

  // تشغيل الصوت فوراً داخل سياق لمس المستخدم لضمان عمله في iOS Safari و Android WebViews
  try {
    const playPromise = music.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        musicBtn.classList.add('playing');
        musicBtn.textContent = '♫';
      }).catch(() => {
        musicBtn.title = 'اضغط هنا لتشغيل الأغنية';
      });
    }
  } catch (err) {
    console.log('Audio autoplay prevented:', err);
  }

  // تساقط بتلات احتفالية مكثفة
  spawnPetals(32);

  // إخفاء الغلاف وإظهار البطاقة الملكية بسلاسة
  setTimeout(() => {
    $('opening').classList.add('hide');
    $('site').classList.add('visible');
    musicBtn.hidden = false;
    showMusicTooltip('اضغط هنا للتحكم بالصوت ♫');
    fitInvitation();

    // استمرار تساقط البتلات بنعومة في الخلفية
    petalInterval = setInterval(() => spawnPetals(2), 1200);
  }, 1300);
}

// دعم اللمس والنقر السريع بدون تأخير
['click', 'touchend'].forEach(evt => {
  $('openBtn').addEventListener(evt, openInvitation, { passive: false });
  $('envelope').addEventListener(evt, openInvitation, { passive: false });
});

$('envelope').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openInvitation();
  }
});

// فك قيود الصوت تلقائياً مع أول لمسة للصفحة على الهواتف
document.addEventListener('touchstart', function unlockAudioOnce() {
  if (music && music.paused && !isOpened) {
    music.load();
  }
}, { once: true, passive: true });

// =============================================================================
// 5. ضبط أبعاد ومقاس البطاقة تلقائياً لمختلف الشاشات (Full Responsive Fit)
// =============================================================================
function fitInvitation() {
  const card = $('invitationCard');
  const site = $('site');
  if (!card || !site) return;

  const winHeight = window.innerHeight;
  const winWidth = document.documentElement.clientWidth;

  // على كافة الهواتف والشاشات الصغيرة، نعتمد التمرير الطبيعي فائق السلاسة لتفادي أي تشويش
  if (winWidth <= 768 || winHeight < 720) {
    site.classList.add('scroll-layout');
    card.style.setProperty('--card-scale', '1');
    card.style.top = '';
  } else {
    site.classList.remove('scroll-layout');
    const scale = Math.min(1, (winHeight - 95) / card.offsetHeight, (winWidth - 30) / card.offsetWidth);
    if (scale < 0.92) {
      site.classList.add('scroll-layout');
      card.style.setProperty('--card-scale', '1');
      card.style.top = '';
    } else {
      card.style.setProperty('--card-scale', scale);
      card.style.top = `${(winHeight - 45) / 2}px`;
    }
  }
}

window.addEventListener('resize', fitInvitation);
if (window.visualViewport) window.visualViewport.addEventListener('resize', fitInvitation);
if (document.fonts) document.fonts.ready.then(fitInvitation);
new ResizeObserver(fitInvitation).observe($('invitationCard'));

// =============================================================================
// 6. العداد التنازلي المباشر (Live Countdown)
// =============================================================================
function updateCountdown() {
  const targetTime = new Date(config.date).getTime();
  const now = Date.now();
  const diff = targetTime - now;

  if (diff <= 0) {
    $('countdown').innerHTML = `<div class="countdown-done">🎉 اليوم يوم فرحتنا وخطوبتنا! نوّرتونا وأسعدتونا 🎉</div>`;
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  $('days').textContent = String(days).padStart(2, '0');
  $('hours').textContent = String(hours).padStart(2, '0');
  $('minutes').textContent = String(minutes).padStart(2, '0');
  $('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// =============================================================================
// 7. إضافة إلى التقويم (Google Calendar + iCalendar .ics)
// =============================================================================
$('calendarBtn').addEventListener('click', () => {
  // توقيت البدء: الجمعة 16 أكتوبر 2026 الساعة 8:30 مساءً (+03:00 مصر) = 17:30 UTC
  // توقيت الانتهاء: الساعة 12:00 منتصف الليل (+03:00) = 21:00 UTC
  const startTime = '20261016T173000Z';
  const endTime = '20261016T210000Z';
  const title = encodeURIComponent(`حفل خطوبة ${config.groom} ♥ ${config.bride}`);
  const details = encodeURIComponent(`يسعدنا ويشرفنا حضوركم ومشاركتنا فرحتنا بحفل خطوبتنا في ${config.venue} - الموعد: 8:30 مساءً بعد صلاة العشاء`);
  const location = encodeURIComponent(`${config.venue} - ${config.mapUrl}`);

  // رابط تقويم جوجل المباشر
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
  
  // توليد ملف ICS اختياري لهواتف الآيفون والماك
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Engagement Invitation//AR',
      'BEGIN:VEVENT',
      `DTSTART:${startTime}`,
      `DTEND:${endTime}`,
      `SUMMARY:حفل خطوبة ${config.groom} و${config.bride}`,
      `DESCRIPTION:يسعدنا ويشرفنا حضوركم ومشاركتنا فرحتنا بحفل خطوبتنا في ${config.venue}`,
      `LOCATION:${config.venue}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'engagement-ammar-sarah.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
  }
});

// دالة نسخ مضمونة تعمل في كافة المتصفحات وتطبيقات WebViews (واتساب، فيسبوك، سفاري، كروم)
async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      // الاستمرار إلى الحل البديل في حال حظر WebView للـ API
    }
  }

  // حل بديل متوافق 100% مع كافة هواتف الآيفون والأندرويد داخل التطبيقات
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    return false;
  }
}

$('shareBtn').addEventListener('click', async () => {
  const shareData = {
    title: config.shareTitle,
    text: config.shareText,
    url: window.location.href
  };

  try {
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
    } else {
      await copyToClipboard(window.location.href);
      showToast('تم نسخ رابط الدعوة، شاركها مع أحبابك 💌');
    }
  } catch (err) {
    if (err.name !== 'AbortError') {
      await copyToClipboard(window.location.href);
      showToast('تم نسخ رابط الدعوة 💌');
    }
  }
});
