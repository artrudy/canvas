const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

// canvas.width = window.innerWidth;

// // //fillRect();
// // ctx.fillStyle = "grey";
// // ctx.fillRect(20, 20, 150, 100);

// // ctx.fillStyle = "green";
// // ctx.fillRect(200, 20, 150, 100);

// // //strokeRect()
// // ctx.lineWidth = 5;
// // ctx.strokeStyle = "red";
// // ctx.strokeRect(20, 130, 150, 100);

// // //clearRect()

// // ctx.clearRect(25, 25, 140, 90);

// // //fillText();

// // ctx.font = "30px Arial";
// // ctx.fillStyle = "purple";
// // ctx.fillText("hello", 400, 50);

// // //strokeText();

// // ctx.lineWidth = 1;
// // ctx.strokeStyle = "orange";
// // ctx.strokeText("world", 400, 100);

// //Paths

// // ctx.beginPath();
// // ctx.moveTo(50, 50);
// // ctx.lineTo(150, 50);
// // ctx.lineTo(100, 100);
// // ctx.lineTo(50, 50);
// // // ctx.closePath();

// // ctx.fillStyle = "coral";

// // ctx.fill();

// // ctx.beginPath();
// // ctx.moveTo(200, 50);
// // ctx.lineTo(150, 100);
// // ctx.lineTo(250, 100);
// // ctx.closePath();
// // ctx.stroke();

// // ctx.beginPath();
// // ctx.rect(300, 50, 50, 50);
// // ctx.fillStyle = "teal";
// // ctx.fill();

// //Arc
// ctx.beginPath();

// const centerX = canvas.width / 2;

// const centerY = canvas.height / 2;

// ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);

// ctx.moveTo(centerX + 120, centerY);

// ctx.arc(centerX, centerY, 120, 0, Math.PI, false);

// ctx.moveTo(centerX - 60, centerY - 80);

// ctx.arc(centerX - 85, centerY - 80, 25, 0, Math.PI * 2);

// ctx.moveTo(centerX + 110, centerY - 80);
// ctx.arc(centerX + 85, centerY - 80, 25, 0, Math.PI * 2);

// ctx.stroke();

//Animation

// const circle = {
//   x: 200,
//   y: 200,
//   size: 30,
//   dx: 5,
//   dy: 4,
// };

// function drawCircle() {
//   ctx.beginPath();
//   ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
//   ctx.fillStyle = "purple";
//   ctx.fill();
// }

// drawCircle();

// function update() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   drawCircle();

//   //change position
//   circle.x += circle.dx;
//   circle.y += circle.dy;

//   //wall detection

//   if (circle.x + circle.size > canvas.width) {
//     circle.dx *= -1;
//   }
//   if (circle.y + circle.size > canvas.height) {
//     circle.dy *= -1;
//   }

//   if (circle.x - circle.size < 0) {
//     circle.dx *= -1;
//   }
//   if (circle.y - circle.size < 0) {
//     circle.dy *= -1;
//   }
//   requestAnimationFrame(update);
// }
// update();

const image = document.getElementById("source");

const player = {
  w: 50,
  h: 70,
  x: 20,
  y: 200,
  speed: 5,
  dx: 0,
  dy: 0,
};

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPosition() {
  player.x += player.dx;
  player.y += player.dy;

  detectWalls();
}

function detectWalls() {
  //Left wall

  if (player.x < 0) {
    player.x = 0;
  }

  //Right wall
  if (player.x > canvas.width - player.w) {
    player.x = canvas.width - player.w;
  }

  //Ceiling
  if (player.y < 0) {
    player.y = 0;
  }

  //Floor

  if (player.y > canvas.height - player.h) {
    player.y = canvas.height - player.h;
  }
}

function drawPlayer() {
  ctx.drawImage(image, player.x, player.y, player.w, player.h);
}

function update() {
  clear();

  drawPlayer();

  newPosition();

  requestAnimationFrame(update);
}

function moveUp() {
  player.dy = -player.speed;
}

function moveDown() {
  player.dy = player.speed;
}

function moveRight() {
  player.dx = player.speed;
}

function moveLeft() {
  player.dx = -player.speed;
}

function keyDown(e) {
  if (e.key === "ArrowRight" || e.key === "Right") {
    moveRight();
  } else if (e.key === "ArrowLeft" || e.key === "Left") {
    moveLeft();
  } else if (e.key === "ArrowUp" || e.key === "Up") {
    moveUp();
  } else if (e.key === "ArrowDown" || e.key === "Down") {
    moveDown();
  }

  console.log(e.key);
  e.stopPropagation();
}

function keyUp(e) {
  if (
    e.key == "Right" ||
    e.key == "ArrowRight" ||
    e.key == "Left" ||
    e.key == "ArrowLeft" ||
    e.key == "Up" ||
    e.key == "ArrowUp" ||
    e.key == "Down" ||
    e.key == "ArrowDown"
  ) {
    player.dx = 0;
    player.dy = 0;
  }
}

update();

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
