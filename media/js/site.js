void (function() {
  function $$(selector, element = document) {
    return element.querySelectorAll(selector);
  }

  function doEach(items, fn) {
    for (const item of items) {
      Promise.resolve(fn(item)).catch(error => console.error(error));
    }
  }

  async function hamburger_menu(container) {
    container.addEventListener("click", () => {
      const target = document.querySelector(
        container.getAttribute("data-target")
      );
      container.classList.toggle("is-active");
      target.classList.toggle("is-active");
    });
  }

  doEach($$(".navbar-burger"), hamburger_menu);
})();