const shorter = document.querySelector(".container");
const shorterInput = document.querySelector("#link");
const shorterBtn = document.querySelector(".shorten-itBtn");

// validate the input field
const validateInput = () => {
  //   if (shorterInput.value == "" || !shorterInput.value.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)) {
  if (shorterInput.value == "" || !shorterInput.value.match(/\.+[a-zA-Z]/g)) {
    shorter.classList.add("error-active");
  } else {
    shorter.classList.remove("error-active");
    createShortenLink(shorterInput.value);
    resetInput();
  }
};

// reset the input after each short
const resetInput = () => {
  shorterInput.value = "";
};

// interact with API & shorten the link
const createShortenLink = async (originalLink) => {
  const res = await fetch(
    `https://api.shrtco.de/v2/shorten?url=${originalLink}`
  );
  const data = await res.json();
  console.log(data.result);
  displayLinks(data.result.short_link, originalLink);
};

// Diplsay Shorten Links on page
const displayLinks = (shortenLink, originalLink) => {
  const linkContainer = document.querySelector(".short-results");
  let link = document.createElement("div");
  link.innerHTML = `<div class="link-container">
    <h1 class="original-link">${originalLink}</h1>
    <hr class="link-divider"/>
    <div class="shorten-link">
      <span class="link">${shortenLink}</span>
      <button type="button" onclick=setCopy(event) class="copyBtn">Copy</button>
    </div>
  </div>`;
  linkContainer.appendChild(link);
};

// configure Copy button
const setCopy = (e) => {
  // copies the Link on click
  let parentElement = e.target.closest(".shorten-link");
  const link = parentElement.children[0].innerText;
  navigator.clipboard.writeText(link);

  //   set copied style
  const copyBtn = parentElement.children[1];
  console.log(copyBtn);
  copyBtn.innerText = "Copied!";
  copyBtn.style.background = "hsl(257, 27%, 26%)";
  //   copyBtn.classList.add("copiedBtn");
};
shorterBtn.addEventListener("click", validateInput);
shorterInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    validateInput();
  }
});

// set menu  button functionality

const menuBtn = document.querySelector(".hamburger");
const menu = document.querySelector(".navLinks");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("menu-active");
});
