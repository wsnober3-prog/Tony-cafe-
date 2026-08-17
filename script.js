/* =====================================
   LOADING SCREEN
===================================== */

window.addEventListener("load", () => {

  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("hide");
  }, 700);

});


/* =====================================
   CURRENT YEAR
===================================== */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* =====================================
   NAVBAR SCROLL
===================================== */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

});


/* =====================================
   MOBILE MENU
===================================== */

const menuToggle =
  document.getElementById("menuToggle");

const nav =
  document.getElementById("nav");


menuToggle.addEventListener("click", () => {

  nav.classList.toggle("active");

  menuToggle.classList.toggle("active");

});


document
  .querySelectorAll(".nav a")
  .forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("active");

      menuToggle.classList.remove("active");

    });

  });


/* =====================================
   MENU TABS
===================================== */

const menuTabs =
  document.querySelectorAll(".menu-tab");

const menuCategories =
  document.querySelectorAll(".menu-category");


menuTabs.forEach(tab => {

  tab.addEventListener("click", () => {

    const category =
      tab.dataset.category;


    menuTabs.forEach(item => {
      item.classList.remove("active");
    });


    menuCategories.forEach(item => {
      item.classList.remove("active");
    });


    tab.classList.add("active");


    const selectedCategory =
      document.getElementById(category);


    if (selectedCategory) {
      selectedCategory.classList.add("active");
    }

  });

});


/* =====================================
   SCROLL REVEAL
===================================== */

const revealElements =
  document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
  );


const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.12
    }

  );


revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* =====================================
   OPEN / CLOSED STATUS
   Uses Europe/London time
===================================== */

function getUKTime() {

  const now = new Date();

  const parts =
    new Intl.DateTimeFormat(
      "en-GB",
      {
        timeZone: "Europe/London",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }
    )
    .formatToParts(now);


  let weekday = "";
  let hour = 0;
  let minute = 0;


  parts.forEach(part => {

    if (part.type === "weekday") {
      weekday = part.value;
    }

    if (part.type === "hour") {
      hour = Number(part.value);
    }

    if (part.type === "minute") {
      minute = Number(part.value);
    }

  });


  return {
    weekday,
    hour,
    minute
  };

}


function updateCafeStatus() {

  const uk = getUKTime();


  const dayNumbers = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6
  };


  const day = dayNumbers[uk.weekday];

  const currentMinutes =
    (uk.hour * 60) + uk.minute;


  let openingMinutes;
  let closingMinutes;


  // Sunday
  if (day === 0) {

    openingMinutes = 9 * 60;
    closingMinutes = 16 * 60;

  }

  // Monday - Saturday
  else {

    openingMinutes = 8 * 60;
    closingMinutes = 17 * 60;

  }


  const isOpen =
    currentMinutes >= openingMinutes &&
    currentMinutes < closingMinutes;


  const openStatus =
    document.getElementById("openStatus");

  const hoursStatus =
    document.getElementById("hoursStatus");

  const statusDot =
    document.querySelector(".status-dot");


  if (isOpen) {

    openStatus.textContent = "Open Now";

    hoursStatus.textContent =
      `Open today until ${
        day === 0 ? "4:00 PM" : "5:00 PM"
      }`;

    if (statusDot) {

      statusDot.style.background =
        "#708761";

      statusDot.style.boxShadow =
        "0 0 0 6px rgba(112,135,97,.15)";

    }

  }

  else {

    openStatus.textContent = "Closed";

    hoursStatus.textContent =
      day === 0
        ? "Closed • Opens tomorrow at 8:00 AM"
        : "Currently Closed";

    if (statusDot) {

      statusDot.style.background =
        "#b65b4d";

      statusDot.style.boxShadow =
        "0 0 0 6px rgba(182,91,77,.15)";

    }

  }


  // Highlight today's opening row

  document
    .querySelectorAll(".day-row")
    .forEach(row => {

      const rowDay =
        Number(row.dataset.day);

      if (rowDay === day) {

        row.classList.add("today");

      }

    });

}


updateCafeStatus();


/* =====================================
   HERO PARALLAX
===================================== */

const hero =
  document.querySelector(".hero");


window.addEventListener("scroll", () => {

  if (!hero) return;


  const scrollPosition =
    window.scrollY;


  if (scrollPosition < window.innerHeight) {

    hero.style.backgroundPosition =
      `center ${scrollPosition * 0.15}px`;

  }

});


/* =====================================
   SMOOTH ANCHOR LINKS
===================================== */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(anchor => {

    anchor.addEventListener(
      "click",
      function (event) {

        const targetId =
          this.getAttribute("href");


        if (targetId === "#") return;


        const target =
          document.querySelector(targetId);


        if (target) {

          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      }
    );

  });
