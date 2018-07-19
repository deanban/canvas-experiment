let canvas = document.getElementsByClassName("canvas")[0];
let c = canvas.getContext("2d");

let numStars = 1000;
let radius = 1;
let focalLength = canvas.width;

let centerX, centerY;

let stars = [];
let star, i;

let animate = false;

/************************************************** 
 https://stackoverflow.com/questions/5605588/how-to-use-requestanimationframe
 **************************************************/

window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

/**************************************************/

initializeStars();

function executeFrame() {
  if (animate) requestAnimFrame(executeFrame);
  moveStars();
  drawStars();
}

function initializeStars() {
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;

  stars = [];
  for (i = 0; i < numStars; i++) {
    star = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width
    };
    stars.push(star);
  }
}

function moveStars() {
  for (i = 0; i < numStars; i++) {
    star = stars[i];
    star.z--;

    // star.x--;
    // star.y--;

    if (star.z <= 0) {
      star.z = canvas.width;
    }

    // if (star.x <= 0) {
    //   star.x = canvas.width;
    // }

    // if (star.y <= 0) {
    //   star.y = canvas.height;
    // }
  }
}

function drawStars() {
  let pixelX, pixelY, pixelRadius;

  // Resize screen
  if (canvas.width != window.innerWidth || canvas.width != window.innerWidth) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeStars();
  }

  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "red";
  for (i = 0; i < numStars; i++) {
    // debugger
    star = stars[i];

    pixelX = (star.x - centerX) * (focalLength / star.z);
    pixelX += centerX;
    pixelY = (star.y - centerY) * (focalLength / star.z);
    pixelY += centerY;
    pixelRadius = radius * (focalLength / star.z);

    c.beginPath();
    c.arc(pixelX, pixelY, pixelRadius, 0, 2 * Math.PI);
    c.fill();
    // debugger;
  }
}

canvas.addEventListener("mousemove", function(e) {
  focalLength = e.x;
});

//start
canvas.addEventListener("mouseover", function(e) {
  animate = true;
  executeFrame();
});

//pause
canvas.addEventListener("mouseout", function(e) {
  mouseDown = false;
  animate = false;
});

executeFrame();
