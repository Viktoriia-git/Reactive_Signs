let gridCountX = 16;
let gridCountY = 56;

let triangleList = [];
let lastNumber = 9; // Починаємо з 9
let numberArrays = []; // Масив для цифр
let animationProgress = 0; // Від 0 до 1, прогрес анімації
let animationSpeed = 0.08; // Зменшено для більш плавного переходу


function setup() {
  /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line.
  /*important!*/ poster.setup(this,  "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line.
  background(255); // Білий фон

  // Заповнюємо масиви цифр
  numberArrays = [numberZero, numberOne, numberTwo, numberThree, numberFour, numberFive, numberSix, numberSeven, numberEight, numberNine];

  // Створюємо трикутники
  for (let i = 0; i < gridCountX; i++) {
    for (let j = 0; j < gridCountY; j++) {
      triangleList.push(new TesoTriangle(i, j));
    }
  }
}

function draw() {
  background(255); // Очищаємо фон

  // Малюємо анімацію
  animateNumberTransition(numberArrays[lastNumber], numberArrays[poster.getCounter()]);

  // Оновлюємо прогрес анімації
  if (animationProgress <= 1 && poster.getCounter() != lastNumber) {
    animationProgress += animationSpeed;
  }

  console.log("poster.getCounter() " + poster.getCounter());
  console.log("lastNumber " + lastNumber);

  if (animationProgress >= 1) {
    // Перехід завершено
    animationProgress = 0;
    lastNumber = poster.getCounter();
  }

  /*important!*/ poster.posterTasks(); // do not remove this last line!
}

function windowScaled() { // this is a custom event called whenever the poster is scaled
  for (let i = 0; i < triangleList.length; i++) {
    triangleList[i].updatePositions();
  }
}

// Анімація переходу між цифрами
function animateNumberTransition(currentArray, nextArray) {
  for (let i = 0; i < triangleList.length; i++) {
    let startPos = currentArray[i] || [-1, -1]; // Якщо немає, позиція поза екраном
    let endPos = nextArray[i] || [-1, -1]; // Якщо немає, позиція поза екраном

    // Лінійна інтерполяція між стартовою та кінцевою позиціями
    let currentX = lerp(startPos[0], endPos[0], animationProgress);
    let currentY = lerp(startPos[1], endPos[1], animationProgress);

    // Зменшене випадкове відхилення для плавнішого руху
    let randomOffsetX = random(-0.5, 0.5); // Менше відхилення по осі X
    let randomOffsetY = random(-0.5, 0.5); // Менше відхилення по осі Y

    // Обчислюємо початковий і кінцевий кути повороту
    let startAngle = getTriangleOrientation(startPos[0], startPos[1]);
    let endAngle = getTriangleOrientation(endPos[0], endPos[1]);
    let currentAngle = lerp(startAngle, endAngle, animationProgress);

    // Малюємо трикутник на поточній позиції з поворотом
    triangleList[i].setPositionAndRotation(currentX, currentY, currentAngle);
    triangleList[i].display(); // Тепер малюємо трикутники без фільтра на активність
  }
}

// Обчислення кута орієнтації трикутника
function getTriangleOrientation(i, j) {
  if (i === undefined || j === undefined || i < 0 || j < 0) return 0; // Поза екраном
  let invert = i % 2 - j % 2;
  return invert ? PI : 0; // Повертаємо 180° (PI) або 0
}

class TesoTriangle {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.w = width / gridCountX;
    this.h = height / gridCountY;
    this.angle = 0; // Початковий кут

    // Відступи для центрованої сітки
    this.offsetX = (width - gridCountX * this.w) / 2;
    this.offsetY = (height - gridCountY * this.h) / 2;

    this.x = this.i * this.w + this.offsetX;
    this.y = this.j * this.h + this.offsetY;
  }

  updatePositions() {
    this.w = width / gridCountX;
    this.h = height / gridCountY;

    this.offsetX = (width - gridCountX * this.w) / 2;
    this.offsetY = (height - gridCountY * this.h) / 2;

    this.x = this.i * this.w + this.offsetX;
    this.y = this.j * this.h + this.offsetY;
  }

  setPositionAndRotation(x, y, angle) {
    this.x = x * (width / gridCountX) + this.offsetX;
    this.y = y * (height / gridCountY) + this.offsetY;
    this.angle = angle;
  }

  display() {
    push();
    translate(this.x, this.y); // Переміщаємо трикутник
    rotate(this.angle); // Повертаємо трикутник
    fill(0); // Колір трикутника (чорний)
    noStroke();

    // Обрізаємо за допомогою clip()
    beginShape();
    vertex(0, this.h / 2);
    vertex(this.w, -this.h / 2);
    vertex(this.w, this.h + this.h / 2);
    endShape(CLOSE);

    // Використовуємо clip для обрізки
    canvas.getContext("2d").clip();

    // Малюємо лінії на трикутнику
    this.drawLines();

    pop();
  }

  // Малювання ліній на трикутнику
  drawLines() {
    let p1 = createVector(0, this.h / 2);
    let p2 = createVector(this.w, -this.h / 2);
    let p3 = createVector(this.w, this.h + this.h / 2);

    // Лінії на трикутнику
    stroke(0); // Колір лінії (чорний)
    line(p1.x, p1.y, p2.x, p2.y);
    line(p2.x, p2.y, p3.x, p3.y);
    line(p3.x, p3.y, p1.x, p1.y);
  }
}
