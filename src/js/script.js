const routes = {
  "/": "src/html/login.html",
  "/events": "src/html/events.html",
  "/newevent": "src/html/newevent.html",
  "/register": "src/html/register.html",
};

document.body.addEventListener("click", (event) => {
  if (event.target.matches("[data-link]")) {
    event.preventDefault();
    navigate(event.target.getAttribute("href"));
  }
});

