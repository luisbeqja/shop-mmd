const menuBurger = document.querySelector("#menuBurger");
const menuMobile = document.querySelector("#menuMobile");
menuBurger.addEventListener("click", () => {
  menuMobile.classList.toggle("hiddenMobile");
});
