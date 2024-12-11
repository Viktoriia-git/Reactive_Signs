// let font;
// function preload() {  
//   // load the font
//   font = loadFont('barlow_condensed.otf');
// }
// function setup() {
//   /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line. 
//  /*important!*/ poster.setup(this, "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line. 
//   textFont(font);
// }

// function draw() {
//   background(0, 0, 0, 20);
//   fill(255);
//   wordEffect(poster.getCounter(), width / 2, height / 2);
// /*important!*/ poster.posterTasks(); // do not remove this last line!  



// }

// function windowScaled() { // this is a custom event called whenever the poster is scaled
//  // textSize(10 * poster.vw);
// }

// function wordEffect(number, x, y) {
//   push()
//     textSize(120 * poster.vw);
//     translate(x, y)
//     let rotation = (-PI * 0.25) + (poster.posNormal.x * 0.5 * PI)
//     rotate(rotation);
//     // The textBounds function returns the bounding box of the text.
//     // This can be very useful when you need to precisely position text.
//     let bbox = font.textBounds(""+number, 0, 0,);
//     translate((-(bbox.x)/2)-(bbox.w/2), +(bbox.h/2));
//     // uncommment the following line to see the bounding box


//     text(""+number, 0, 0)
//     noFill();
//     stroke(255,0,0)
//     rect(bbox.x, bbox.y, bbox.w, bbox.h);
//   pop();
// }


// let gridCountX = 16;
// let gridCountY = 56;

// let triangleList = [];
// let lastNumber = 9; // Починаємо з 9
// let numberArrays = []; // Масив для цифр
// let animationProgress = 0; // Від 0 до 1, прогрес анімації
// let animationSpeed = 0.1; // Зменшено для більш плавного переходу

// function setup() {
//   /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line. 
//   /*important!*/ poster.setup(this,  "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line. 
//   background(255); // Білий фон

//   // Заповнюємо масиви цифр
//   numberArrays = [numberZero, numberOne, numberTwo, numberThree, numberFour, numberFive, numberSix, numberSeven, numberEight, numberNine];

//   // Створюємо трикутники
//   for (let i = 0; i < gridCountX; i++) {
//     for (let j = 0; j < gridCountY; j++) {
//       triangleList.push(new TesoTriangle(i, j));
//     }
//   }
// }

// function draw() {
//   background(255); // Очищаємо фон

//   // Малюємо анімацію
//   animateNumberTransition(numberArrays[lastNumber], numberArrays[poster.getCounter()]);

//   // Оновлюємо прогрес анімації
//   if (animationProgress <= 1 && poster.getCounter() != lastNumber) {
//   animationProgress += animationSpeed;
//   }
//   console.log("poster.getCounter()"+poster.getCounter())
//   console.log("lastNumber"+lastNumber)
//   if (animationProgress >= 1) {
//     // Перехід завершено
//     animationProgress = 0;
//     lastNumber = poster.getCounter();
//     //currentNumberIndex = (currentNumberIndex - 1 + 10) % 10; // Переходимо до попереднього числа, з 9 до 0
//   }
//     /*important!*/ poster.posterTasks(); // do not remove this last line!  
// }

// function windowScaled() { // this is a custom event called whenever the poster is scaled
// 	//console.log("triangleList"+triangleList.length)
	
// 	for (let i = 0; i < triangleList.length; i++) {
// 		triangleList[i].updatePositions();
// 		console.log("count"+i)
// 	}
//   }

// // Анімація переходу між цифрами
// function animateNumberTransition(currentArray, nextArray) {
//   for (let i = 0; i < triangleList.length; i++) {
//     let startPos = currentArray[i] || [-1, -1]; // Якщо немає, позиція поза екраном
//     let endPos = nextArray[i] || [-1, -1]; // Якщо немає, позиція поза екраном

//     // Лінійна інтерполяція між стартовою та кінцевою позиціями
//     let currentX = lerp(startPos[0], endPos[0], animationProgress);
//     let currentY = lerp(startPos[1], endPos[1], animationProgress);

//     // Зменшене випадкове відхилення для плавнішого руху
//     let randomOffsetX = random(-0.5, 0.5); // Менше відхилення по осі X
//     let randomOffsetY = random(-0.5, 0.5); // Менше відхилення по осі Y

//    // currentX += randomOffsetX;
//    // currentY += randomOffsetY;

//     // Обчислюємо початковий і кінцевий кути повороту
//     let startAngle = getTriangleOrientation(startPos[0], startPos[1]);
//     let endAngle = getTriangleOrientation(endPos[0], endPos[1]);
//     let currentAngle = lerp(startAngle, endAngle, animationProgress);

//     // Малюємо трикутник на поточній позиції з поворотом
//     triangleList[i].setPositionAndRotation(currentX, currentY, currentAngle);
//     triangleList[i].display(true);
//   }
// }

// // Обчислення кута орієнтації трикутника
// function getTriangleOrientation(i, j) {
//   if (i === undefined || j === undefined || i < 0 || j < 0) return 0; // Поза екраном
//   let invert = i % 2 - j % 2;
//   return invert ? PI : 0; // Повертаємо 180° (PI) або 0
// }

// class TesoTriangle {
//   constructor(i, j) {
//     this.i = i;
//     this.j = j;
//     this.w = width / gridCountX;
//     this.h = height / gridCountY;
//     this.x = i * this.w;
//     this.y = j * this.h;
//     this.angle = 0; // Початковий кут
//   }

//   updatePositions() {
		
// 		this.w = width / gridCountX; // width and height -> dependant on canvas size
// 		this.h = height / gridCountY;
		
// 		this.x = this.i * this.w; // top left corver coordinates of triangle
// 		this.y = this.j  * this.h;

// 	}

//   setPositionAndRotation(i, j, angle) {
//     this.x = i * (width / gridCountX);
//     this.y = j * (height / gridCountY);
//     this.angle = angle; // Зберігаємо кут повороту
//   }

//   display(isBlack) {
//     push();
//     translate(this.x, this.y);
//     rotate(this.angle); // Повертаємо трикутник
//     fill(isBlack ? 0 : 255); // Чорний або білий
//     noStroke();

//     // Малюємо трикутник
//     triangle(0, this.h / 2, this.w, -this.h / 2, this.w, this.h + this.h / 2);
//     pop();
//   }
// }

//------------


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
  console.log("poster.getCounter()"+poster.getCounter())
  console.log("lastNumber"+lastNumber)
  if (animationProgress >= 1) {
    // Перехід завершено
    animationProgress = 0;
    lastNumber = poster.getCounter();
    //currentNumberIndex = (currentNumberIndex - 1 + 10) % 10; // Переходимо до попереднього числа, з 9 до 0
  }
    /*important!*/ poster.posterTasks(); // do not remove this last line!  
}

function windowScaled() { // this is a custom event called whenever the poster is scaled
	//console.log("triangleList"+triangleList.length)
	
	for (let i = 0; i < triangleList.length; i++) {
		triangleList[i].updatePositions();
		console.log("count"+i)
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

   // currentX += randomOffsetX;
   // currentY += randomOffsetY;

    // Обчислюємо початковий і кінцевий кути повороту
    let startAngle = getTriangleOrientation(startPos[0], startPos[1]);
    let endAngle = getTriangleOrientation(endPos[0], endPos[1]);
    let currentAngle = lerp(startAngle, endAngle, animationProgress);

    // Малюємо трикутник на поточній позиції з поворотом
    triangleList[i].setPositionAndRotation(currentX, currentY, currentAngle);
    triangleList[i].display(true);
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
    // Перерахунок ширини та висоти
    this.w = width / gridCountX;
    this.h = height / gridCountY;

    // Перерахунок відступів
    this.offsetX = (width - gridCountX * this.w) / 2;
    this.offsetY = (height - gridCountY * this.h) / 2;

    // Позиціюємо трикутник з урахуванням відступів
    this.x = this.i * this.w + this.offsetX;
    this.y = this.j * this.h + this.offsetY;
  }

  setPositionAndRotation(i, j, angle) {
    // Позиціюємо трикутник з урахуванням відступів
    this.x = i * (width / gridCountX) + this.offsetX;
    this.y = j * (height / gridCountY) + this.offsetY;
    this.angle = angle; // Зберігаємо кут повороту
  }

  display(isBlack) {
    push();
    translate(this.x, this.y); // Переміщаємо трикутник
    rotate(this.angle); // Повертаємо трикутник
    fill(isBlack ? 0 : 255); // Чорний або білий
    noStroke();

    // Малюємо трикутник
    triangle(0, this.h / 2, this.w, -this.h / 2, this.w, this.h + this.h / 2);
    pop();
  }
}

