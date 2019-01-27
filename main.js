
let HEADER_TITLE = "<span class=\"thin\">Projekt iz programske potpore: </span>Jetpack FER ride"
let headerTitle = document.getElementById("headerTitle");
let title = document.getElementById("title");
let header = document.getElementsByTagName("header")[0];
let main = document.getElementsByClassName("main")[0];

window.onscroll = () => {
  if (window.pageYOffset > header.offsetTop) {
    header.classList.add("sticky");
    main.style.padding = header.offsetHeight + "px 0 0 0";
  } else {
    header.classList.remove("sticky");
    main.style.padding = "0px";
  }
  if (window.pageYOffset > title.offsetTop + title.offsetHeight - header.offsetHeight) {
    headerTitle.innerHTML = HEADER_TITLE;
  } else {
    headerTitle.innerHTML = "";
  }
}

let body = document.getElementsByTagName("body")[0];

function displayLargeImage(target) {
  let div = document.createElement("div");
  div.classList.add("largeImage");
  let img = document.createElement("img");
  img.src = target.src;
  div.appendChild(img);
  let caption = document.createElement("h3");
  caption.innerHTML = target.alt;
  div.appendChild(caption);

  let close = document.createElement("img");
  close.src = "icons/close_white.svg";
  close.classList.add("close");
  close.onclick = e => {
    body.removeChild(div);
    body.removeChild(close);
  }
  body.appendChild(div);
  body.appendChild(close);
}

let thumbnails = document.getElementsByClassName("thumbnail");
for (let i = 0; i < thumbnails.length; i++) {
  thumbnails[i].onclick = e => {
    displayLargeImage(e.target);
    e.preventDefault();
  }
}

