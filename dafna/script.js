const header = document.querySelector("[data-header]");
const treatmentButtons = document.querySelectorAll("[data-treatment]");
const treatmentStage = document.querySelector("[data-treatment-stage]");

const treatmentContent = {
  injectables: {
    label: "הזרקות מדויקות",
    title: "לא להחליף פנים, אלא לרכך את מה שמפריע.",
    text: "תכנון שמרני של מינונים ואזורים, תוך שמירה על תנועה, הבעה והרמוניה טבעית. מתאים לקמטי הבעה, השבת נפח, שפתיים, לחיים וקו לסת."
  },
  collagen: {
    label: "קולגן ומיצוק",
    title: "עידוד תהליכים טבעיים במקום פתרון חד־פעמי.",
    text: "ביוסטימולטורים כמו אסטפיל, סידן והרמוניקה נבחרים לפי איכות העור, רפיון הרקמות והמטרה האסתטית, במטרה לבנות תוצאה הדרגתית ועדינה."
  },
  skin: {
    label: "Skin Reset",
    title: "מרקם, זוהר וגמישות שמתחילים מתוכנית עור.",
    text: "טיפולי טיקסל, דרמפן ופולינוקליאוטידים ממוקדים בשיפור איכות העור, נקבוביות, קמטוטים ומראה עייף, בלי לשנות את מבנה הפנים."
  },
  comfort: {
    label: "נוחות וביטחון",
    title: "לטפל במה שמפריע ביום־יום, גם כשלא רואים אותו בתמונה.",
    text: "טיפול בהזעת יתר מבוסס על אבחון מדויק והזרקה ממוקדת, במטרה להפחית אי־נוחות ולהחזיר תחושת ביטחון בשגרה."
  }
};

const setHeader = () => {
  header.classList.toggle("is-solid", window.scrollY > 38);
};

setHeader();
window.addEventListener("scroll", setHeader, { passive: true });

treatmentButtons.forEach((button) => {
  button.addEventListener("click", () => {
    treatmentButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const content = treatmentContent[button.dataset.treatment];
    treatmentStage.innerHTML = `
      <p class="stage-label">${content.label}</p>
      <h3>${content.title}</h3>
      <p>${content.text}</p>
    `;
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
