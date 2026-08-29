(function () {
  const ENDPOINT = "https://script.google.com/macros/s/AKfycbw2O59UHxF8hpeaYoNsgx7OGyPNSlk9Wv8YwJC7e1504YHiGWaf9S5O3d8NKjj0tm_vBw/exec";
  const script = document.currentScript;
  const site = script && script.dataset.site ? script.dataset.site : location.hostname;
  const page = script && script.dataset.page ? script.dataset.page : location.pathname;
  const now = new Date();
  const localDay = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("-");
  const storageKey = `openclaw-counter:${site}:${page}:${localDay}`;

  try {
    if (localStorage.getItem(storageKey)) return;
    localStorage.setItem(storageKey, now.toISOString());
  } catch (error) {
    if (sessionStorage.getItem(storageKey)) return;
    sessionStorage.setItem(storageKey, now.toISOString());
  }

  function getVisitorId() {
    const key = "openclaw-counter-visitor";
    try {
      let visitorId = localStorage.getItem(key);
      if (!visitorId) {
        visitorId = (crypto && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
        localStorage.setItem(key, visitorId);
      }
      return visitorId;
    } catch (error) {
      return "storage-unavailable";
    }
  }

  function cleanPageUrl() {
    const url = new URL(location.href);
    url.searchParams.delete("v");
    url.hash = "";
    return url.toString();
  }

  function track() {
    const visitorId = getVisitorId();
    const payload = {
      ts: now.toISOString(),
      firstName: "",
      lastName: "",
      region: "",
      phone: "",
      source: `site-counter:${site}`,
      pageUrl: `${cleanPageUrl()}#page=${encodeURIComponent(page)}&visitor=${encodeURIComponent(visitorId)}`,
      userAgent: navigator.userAgent || ""
    };
    const body = JSON.stringify(payload);

    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
      if (navigator.sendBeacon(ENDPOINT, blob)) return;
    }

    fetch(ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body
    }).catch(function () {});
  }

  if ("requestIdleCallback" in window) {
    requestIdleCallback(track, { timeout: 2500 });
  } else {
    setTimeout(track, 1200);
  }
})();
