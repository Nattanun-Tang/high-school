(() => {
  const $ = (selector) => document.querySelector(selector);

  function applyContent() {
    const c = window.CONTENT?.th;
    if (!c) return;
    $("#landingEyebrow").textContent = c.landing.eyebrow;
    $("#landingTitle").textContent = c.landing.title;
    $("#landingDescription").textContent = c.landing.description;
    $("#metaSubject").textContent = c.landing.subject;
    $("#metaLevel").textContent = c.landing.level;
    $("#startButton").textContent = c.landing.start;
    $("#appEyebrow").textContent = c.app.eyebrow;
    $("#appTitle").textContent = c.app.title;
  }

  function showApp() {
    $("#landingPage").hidden = true;
    $("#landingPage").classList.remove("view--active");
    $("#appPage").hidden = false;
    $("#appPage").classList.add("view--active");
    $("#appTitle").focus?.();
  }

  function bootstrap() {
    applyContent();
    $("#startButton").addEventListener("click", showApp);
  }

  document.addEventListener("DOMContentLoaded", bootstrap);
})();
