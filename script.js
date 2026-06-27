// ===== Mobile Menu =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

function toggleMenu() {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
}

// Close menu on link click
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

function setActiveLink() {
  let current = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 120;
    if (scrollY >= top) {
      current = sec.getAttribute("id");
    }
  });
  navAnchors.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) {
      a.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);

// ===== Contact Form =====
const form = document.getElementById("contactForm");

function showToast(msg, isError = false) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.style.background = isError ? "#d32f2f" : "#1e8e3e";
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = new FormData(this);
  const btn = this.querySelector("button");
  btn.disabled = true;
  btn.textContent = "جاري الإرسال...";

  try {
    const res = await fetch(this.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      showToast("✅ تم إرسال رسالتك بنجاح!");
      this.reset();
    } else {
      showToast("❌ فشل الإرسال، حاول مرة أخرى", true);
    }
  } catch {
    showToast("❌ مشكلة في الاتصال، تحقق من الإنترنت", true);
  } finally {
    btn.disabled = false;
    btn.textContent = "إرسال الرسالة";
  }
});

// ===== Scroll Reveal Animation =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.15 }
);

document
  .querySelectorAll(
    ".skill-card, .project-card, .about-content, .contact-content"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
