
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
  let captionDiv = document.createElement("div");
  let caption = document.createElement("h3");
  caption.innerHTML = target.alt;
  captionDiv.appendChild(caption);
  div.appendChild(captionDiv);

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

(function konamiCodeListener() {
  // up-up-down-down-left-right-left-right-b-a-enter
  let UP = "ArrowUp";
  let DOWN = "ArrowDown";
  let LEFT = "ArrowLeft";
  let RIGHT = "ArrowRight";
  let B = "b";
  let A = "a";
  let ENTER = "Enter";
  let state = 0;
  let acceptableInState = [UP, UP, DOWN, DOWN, LEFT, RIGHT, LEFT, RIGHT, B, A, ENTER];
  window.onkeydown = e => {
    if (e.key == acceptableInState[state]) {
      state++;
    } else {
      state = 0;
      if (e.key == UP) state++;
    }
    if (state === acceptableInState.length) {
      window.onKonamiCode && window.onKonamiCode();
      state = 0;
    }
  }
})();

window.onKonamiCode = dropCupcoins;

function randint(min, max) {
  return Math.floor(Math.random() * (max-min) + min);
}

let COIN_SIZE = 70;
let NUMBER_OF_CUPCOINS = 150;
let cupcoinFactoryId = 0;
let audio1 = document.createElement("audio");
let audio2 = document.createElement("audio");
let audio3 = document.createElement("audio");
let audio4 = document.createElement("audio");
function dropCupcoins() {
  let startingMinY = -20*COIN_SIZE;
  let startingMaxY = -COIN_SIZE;
  let startingMinX = 0;
  let startingMaxX = window.innerWidth;
  let minVelY = 900; // px/s
  let maxVelY = 1000; // px/s

  let cupcoins = [];
  for (let i = 0; i < NUMBER_OF_CUPCOINS; i++) {
    let coin = createCupcoin();
    coin.props = {
      y: randint(startingMinY, startingMaxY),
      vel: randint(minVelY, maxVelY),
      aVel: 2*(2*Math.PI * Math.random() - Math.PI),
      phi: 2*Math.PI * Math.random(),
      id: cupcoinFactoryId++
    };
    coin.style.top = coin.props.y + "px";
    coin.style.left = randint(startingMinX, startingMaxX) + "px";
    cupcoins.push(coin);
  }
  cupcoins.forEach(coin => body.appendChild(coin));

  let start, last;
  function redraw(timestamp) {
    if (!start) {
      start = last = timestamp;
    }

    let dt = timestamp - last;
    let t = timestamp - start;
    let toRemove = {};
    cupcoins.forEach(coin => {
      let dy = coin.props.vel * dt / 1000; 
      coin.props.y = coin.props.y + dy;
      coin.style.top = coin.props.y + "px";
      coin.style.transform = "scaleX(" + Math.cos(coin.props.aVel * t/1000 + coin.props.phi) + ")";
      if (coin.props.y > window.innerHeight) {
        toRemove[coin.props.id] = true;
      }
    });
    cupcoins = cupcoins.filter(coin => {
      if (toRemove[coin.props.id]) {
        body.removeChild(coin);
        return false;
      }
      return true;
    });
    if (cupcoins.length !== 0) {
      requestAnimationFrame(redraw);
      last = timestamp;
    }
  }
  requestAnimationFrame(redraw);
  audio1.src = "audio/coins1.mp3";
  audio2.src = audio3.src = audio4.src = "audio/coins2.mp3";
  audio1.play();
  setTimeout(() => {
    audio2.play();
  }, 500);
  setTimeout(() => {
    audio3.play();
  }, 1000);
  setTimeout(() => {
    audio4.play();
  }, 1300);
}

let CUPCOIN_SRC = "textures/cupcoin.png";
function createCupcoin() {
  let cupcoin = document.createElement("img");
  cupcoin.classList.add("cupcoin");
  cupcoin.src = CUPCOIN_SRC;
  return cupcoin;
}

