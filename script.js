const services = {
  western: {
    kicker: "Deep Calm",
    title: "Western Massages",
    copy: "Slow, intentional bodywork for stress, tension, and full-body release. Ideal for guests who want a polished restorative session with a luxury spa feel.",
    price: "From ₹3500*",
    duration: "Recommended 60-90 min"
  },
  ayurvedic: {
    kicker: "Ancient Rhythm",
    title: "Ayurvedic Therapies",
    copy: "Traditional therapy inspired by time-tested healing systems, designed to support balance, warmth, and whole-body renewal.",
    price: "From ₹3500*",
    duration: "Traditional wellness care"
  },
  holistic: {
    kicker: "Mind Body Spirit",
    title: "Holistic Therapies",
    copy: "A balanced ritual for guests seeking healing beyond surface relaxation, with care for energy, emotion, and physical ease.",
    price: "From ₹4000",
    duration: "Balance · Heal · Restore"
  },
  sports: {
    kicker: "Targeted Relief",
    title: "Sports Massage",
    copy: "Focused pressure and recovery-minded bodywork for active bodies, tight muscles, and post-travel stiffness.",
    price: "From ₹4000",
    duration: "Recovery focused"
  },
  scrubs: {
    kicker: "Polish",
    title: "Scrubs",
    copy: "A renewing exfoliation ritual that leaves skin brighter, smoother, and ready to absorb deep nourishment.",
    price: "From ₹3000*",
    duration: "Detox · Smooth · Glow"
  },
  mask: {
    kicker: "Nourish",
    title: "Body Mask",
    copy: "A cocooning body-care experience that calms the senses while replenishing the skin with a spa-grade finish.",
    price: "From ₹3000*",
    duration: "Hydrate · Soothe · Renew"
  },
  packages: {
    kicker: "Complete Escape",
    title: "Packages",
    copy: "Curated combinations for a fuller wellness visit, pairing massage, body care, and restorative rituals.",
    price: "From ₹5000*",
    duration: "Best for premium visits"
  }
};

const gallery = [
  ["image1.jpeg", "Ritual welcome with rose petals"],
  ["image2.jpeg", "Private therapy suite"],
  ["image3.jpeg", "Reception and waiting lounge"],
  ["image4.jpeg", "Wellness reception desk"],
  ["image5.jpeg", "Warm single treatment room"],
  ["image6.jpeg", "Restorative treatment bed"],
  ["image7.jpeg", "Therapy room detail"],
  ["image8.jpeg", "Traditional decor and petals"],
  ["image9.jpeg", "Signature massage room"],
  ["image10.jpeg", "Calm wellness ambience"]
];

const reviews = [
  {
    name: "Jay",
    date: "December 6, 2024",
    text: "Had a holistic massage, very nice treatment experienced therapist, will comeback again and will suggest friends"
  },
  {
    name: "Sarha",
    date: "December 7, 2024",
    text: "Excellent treatment with clean facilities. Will back on next trip."
  },
  {
    name: "Sarha",
    date: "December 9, 2024",
    text: "Best wellness center ever!!"
  },
  {
    name: "Akku",
    date: "January 2, 2025",
    text: "Nice Ambience & Friendly service"
  }
];

const hours = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hoursCard = document.querySelector("#hoursCard");
const today = new Date().getDay();

hoursCard.innerHTML = hours.map((day, index) => `
  <div class="hour-row ${index === today ? "today" : ""}">
    <strong>${day}</strong>
    <span>10:00 AM - 08:00 PM</span>
  </div>
`).join("");

const serviceTabs = document.querySelectorAll(".service-tab");
const serviceDetail = document.querySelector("#serviceDetail");

serviceTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const data = services[tab.dataset.service];
    serviceTabs.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    serviceDetail.animate(
      [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 260, easing: "ease-out" }
    );
    serviceDetail.innerHTML = `
      <p class="service-kicker">${data.kicker}</p>
      <h3>${data.title}</h3>
      <p>${data.copy}</p>
      <div class="service-meta">
        <span>${data.price}</span>
        <span>${data.duration}</span>
      </div>
    `;
  });
});

const galleryGrid = document.querySelector("#galleryGrid");
const lightbox = document.querySelector("#lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxCaption = document.querySelector("#lightboxCaption");
let activeImage = 0;

galleryGrid.innerHTML = gallery.map(([src, caption], index) => `
  <button class="gallery-item" type="button" data-index="${index}" aria-label="Open ${caption}">
    <img src="${src}" alt="${caption}" loading="lazy">
    <span>${caption}</span>
  </button>
`).join("");

function openLightbox(index) {
  activeImage = index;
  const [src, caption] = gallery[activeImage];
  lightboxImg.src = src;
  lightboxImg.alt = caption;
  lightboxCaption.textContent = caption;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
}

function moveLightbox(direction) {
  activeImage = (activeImage + direction + gallery.length) % gallery.length;
  openLightbox(activeImage);
}

galleryGrid.addEventListener("click", (event) => {
  const item = event.target.closest(".gallery-item");
  if (item) openLightbox(Number(item.dataset.index));
});

document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
document.querySelector(".lightbox-nav.prev").addEventListener("click", () => moveLightbox(-1));
document.querySelector(".lightbox-nav.next").addEventListener("click", () => moveLightbox(1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

const reviewCard = document.querySelector("#reviewCard");
const reviewDots = document.querySelector("#reviewDots");
let activeReview = 0;

function renderReview() {
  const review = reviews[activeReview];
  reviewCard.innerHTML = `
    <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
    <blockquote>“${review.text}”</blockquote>
    <cite>${review.name} · ${review.date} · 5/5</cite>
  `;
  reviewDots.innerHTML = reviews.map((_, index) => `
    <button class="${index === activeReview ? "active" : ""}" type="button" data-index="${index}" aria-label="Show review ${index + 1}"></button>
  `).join("");
}

function moveReview(direction) {
  activeReview = (activeReview + direction + reviews.length) % reviews.length;
  reviewCard.animate(
    [{ opacity: 0, transform: "translateX(12px)" }, { opacity: 1, transform: "translateX(0)" }],
    { duration: 280, easing: "ease-out" }
  );
  renderReview();
}

document.querySelector('[data-review="prev"]').addEventListener("click", () => moveReview(-1));
document.querySelector('[data-review="next"]').addEventListener("click", () => moveReview(1));
reviewDots.addEventListener("click", (event) => {
  const dot = event.target.closest("button");
  if (!dot) return;
  activeReview = Number(dot.dataset.index);
  renderReview();
});
renderReview();

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

const header = document.querySelector(".site-header");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});
