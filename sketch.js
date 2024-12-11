let gridCountX = 16;
let gridCountY = 56;
let offset = 3;
let random10 = [];
let nameArray = ['1', '2', '3', '4', '1', '2', '3', '4', '1', '2', '3', '4', '1', '2', '3', '4', '1', '2', '3', '4'];

let gridArray = Array(gridCountX).fill().map(() => Array(gridCountY).fill(null));

let triangleList = [] // this stores the actual TesoTriangle objects
let isBlackTriangles = [];
let counter = 0;

function setup() {

 /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line.
  /*important!*/ poster.setup(this, "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line.
	//createCanvas(1050 / 2, 1920 / 2);
	background(100);



	for (let i = 0; i < gridCountX; i++) {

		for (let j = 0; j < gridCountY; j++) {

			gridArray[i][j] = 0;
			triangleList.push(new TesoTriangle(i, j));

		}

	}

}


function draw() {
background(255)

	counter++
	if (counter == 10) {
		console.log(random10)
		console.log(nameArray)
	}

	//background(255)
	noStroke(); // IN REALIT
	//stroke(255); // TO HELP

	for (let i = 0; i < triangleList.length; i++) {
		if(!triangleList[i].active) {
			triangleList[i].showTriangle();
		}
		
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

class TesoTriangle {

	constructor(i, j, w, h) {

		this.i = i; //row and column
		this.j = j;

		this.w = width / gridCountX; // width and height -> dependant on canvas size
		this.h = height / gridCountY;

		this.x = i * this.w; // top left corver coordinates of triangle
		this.y = j * this.h;

		this.active = false; // boolean to determine color
	}
	
	updatePositions() {
		
		this.w = width / gridCountX; // width and height -> dependant on canvas size
		this.h = height / gridCountY;
		
		this.x = this.i * this.w; // top left corver coordinates of triangle
		this.y = this.j  * this.h;

	}


	getRandomElements(arr, num) {
		var randomElements = [];
		let copyArr = [...arr]; // Create a copy of the array to avoid modifying the original array

		for (let i = 0; i < num; i++) {
			// Get a random index
			let randomIndex = Math.floor(Math.random() * copyArr.length);

			// Push the random element (subarray) into the result array
			randomElements.push(copyArr[randomIndex]);

			// Remove the selected element from the copyArr to avoid duplicates
			copyArr.splice(randomIndex, 1);
		}
		return randomElements;
	}
	// NEW CODE END


	showTriangle() {


		push(); // for every triangle new settingBase

		translate(this.x, this.y)


		//calling the number arrays to color them
		let currentDigits;
		switch ( poster.getCounter()) {
			case 9: currentDigits = numberNine; break;
			case 8: currentDigits = numberEight; break;
			case 7: currentDigits = numberSeven; break;
			case 6: currentDigits = numberSix; break;
			case 5: currentDigits = numberFive; break;
			case 4: currentDigits = numberFour; break;
			case 3: currentDigits = numberThree; break;
			case 2: currentDigits = numberTwo; break;
			case 1: currentDigits = numberOne; break;
			case 0: currentDigits = numberZero; break;
		  }
		

		let isWhite = currentDigits.some(item => item[0] === this.i && item[1] === this.j);
		if (isWhite) {
			fill(0);
			//isBlackTriangles.push(this);
		}
		else {
			fill(255);
		} //coloring the numbers


		
		random10 = this.getRandomElements(isBlackTriangles, 20);



		// work out the orientation of the triangle based on column and row. 
		// checks if odd or even
		let invert = this.i % 2
		invert -= this.j % 2


		let slider = map(poster.posNormal.x, 0, 1, -20, 20)
		// draw
		if (invert) {

			let p1 = createVector(0, this.h / 2);
			let p2 = createVector(this.w, 0 - (this.h / 2))
			let p3 = createVector(this.w, this.h + (this.h / 2))

			let m = (p2.y - p1.y) / (p2.x - p1.x)

			let parallelStart = createVector(p1.x + slider, p1.y + slider);

			let deltaX = this.w + 100
			let deltaY = m * deltaX
			let parallelEnd = createVector(parallelStart.x + deltaX, parallelStart.y + deltaY)

			let rectWidth = (parallelEnd.x - parallelStart.x) / 2;
			let rectHeight = (parallelEnd.y - parallelStart.y) / 2;


			triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)


			canvas.getContext("2d").clip()


			if (isWhite) {
				for (let j = 0; j < 10; j++) {
					push()
					if (j % 2 == 0 && j < 5) { fill(0) } else { fill(255) }

					// this.drawRectis(parallelStart.x - j * rectWidth, parallelStart.y + j * rectHeight, parallelEnd.x - j * rectWidth, parallelEnd.y + j * rectHeight);
					this.drawRectis(parallelStart.x + j * offset, parallelStart.y + j * offset, parallelEnd.x + j * offset, parallelEnd.y + j * offset);
					pop()
				}

			}

		}

		else {
			let p4 = createVector(0, 0 - (this.h / 2))
			let p5 = createVector(this.w, this.h / 2)
			let p6 = createVector(0, this.h + (this.h / 2))

			let m = -(p5.y - p4.y) / (p5.x - p4.x)
			let parallelStart = createVector(p4.x - 20, p4.y);

			let deltaX = 200
			let deltaY = m * deltaX
			let parallelEnd = createVector(parallelStart.x + deltaX, parallelStart.y + deltaY)
		//	console.log('start x' + parallelStart.x + 'start y' + parallelStart.y)
		//	console.log('end x' + parallelEnd.x + 'end y' + parallelEnd.y)
		triangle(p4.x, p4.y, p5.x, p5.y, p6.x, p6.y);

		canvas.getContext("2d").clip()
		}


		pop();

	}


	drawRectis(xx, yy, xe, ye) {
		push()
		noStroke();
		beginShape();
		vertex(xx, yy);
		vertex(xe, ye);
		vertex(xe + 40, ye + 20);
		vertex(xx + 40, yy + 20)
		endShape(CLOSE)
		pop()
	}


}


// let gridCountX = 16;
// let gridCountY = 56;
// let offset = 3;
// let random10 = [];
// let nameArray = ['1', '2', '3', '4', '1', '2', '3', '4', '1', '2', '3', '4', '1', '2', '3', '4', '1', '2', '3', '4'];

// let gridArray = Array(gridCountX).fill().map(() => Array(gridCountY).fill(null));

// let triangleList = [] // this stores the actual TesoTriangle objects
// let isBlackTriangle =[];
// let counter = 0;

// let currentDigits;
// let currentNumber = 9; // Start with 9 for demonstration


// function setup() {

//   /*important!*/ createCanvas(poster.getWindowWidth(), poster.getWindowHeight()); // Don't remove this line. 
//   /*important!*/ poster.setup(this, "/Poster_Templates/libraries/assets/models/movenet/model.json");  // Don't remove this line. 

//   createCanvas(1050 / 2, 1920 / 2);
//   background(100);

//   for (let i = 0; i < gridCountX; i++) {
//     for (let j = 0; j < gridCountY; j++) {
//       gridArray[i][j] = 0;
//       triangleList.push(new TesoTriangle(i, j));
//     }
//   }
// }

// function draw() {
// 	background (255)

//   counter++;
//   if(counter ==  10){
// 	console.log(random10)
// 	console.log(nameArray)
//   }
//   noStroke();

//   // Update the current number every 60 frames (can be adjusted)
//   if (frameCount % 60 === 0) {
//     currentNumber = (currentNumber - 1 + 10) % 10; // Cycles through digits 9 to 0
//   }

//   // Set the currentDigits array based on the current number
//   switch (currentNumber) {
//     case 9: currentDigits = numberNine; break;
//     case 8: currentDigits = numberEight; break;
//     case 7: currentDigits = numberSeven; break;
//     case 6: currentDigits = numberSix; break;
//     case 5: currentDigits = numberFive; break;
//     case 4: currentDigits = numberFour; break;
//     case 3: currentDigits = numberThree; break;
//     case 2: currentDigits = numberTwo; break;
//     case 1: currentDigits = numberOne; break;
//     case 0: currentDigits = numberZero; break;
//   }

//   // Show the triangles for the current digit
//   for (let i = 0; i < triangleList.length; i++) {
//     triangleList[i].showTriangle(currentDigits);
//   }
//   /*important*/ poster.posterTasks(); //do not remove this last line
// }

// // TesoTriangle Class: Handles individual triangles
// class TesoTriangle {
//   constructor(i, j, w, h) {
//     this.i = i; // row and column
//     this.j = j;

//     this.w = width / gridCountX; // width and height -> dependent on canvas size
//     this.h = height / gridCountY;

//     this.x = i * this.w; // top left corner coordinates of triangle
//     this.y = j * this.h;

//     this.active = false; // boolean to determine color
//   }

//   getRandomElements(arr, num){
// 	var randomElements = [];
// 	let copyArr = [...arr];

// 	for (let i = 0; i < num; i++){
// 		let randomIndex = Math.floor(Math.random() * copyArr.length);
// 		randomElements.push(copyArr[randomIndex]);
// 		copyArr.splice(randomIndex, 1);
// 	}

// 	return randomElements;
//   }

//   // Show the triangle, with animation based on the current digits
//   showTriangle(currentDigits) {
//     push();
//     translate(this.x, this.y);

//     // Check if this triangle should be filled based on the currentDigits array
//     let isWhite = currentDigits.some(item => item[0] === this.i && item[1] === this.j);
    
//     if (isWhite) {
//       fill(0);  // black for active part of the number
//     } else {
//       fill(255);  // white for inactive parts
//     }

// 	random10 = this.getRandomElements(isBlackTriangle, 20)

//     // Animation logic (based on the current position of the triangle)
//     let invert = this.i % 2
// 	invert -= this.j % 2
//     let slider = map(poster.posNormal.x, 0, 1, -20, 20); // Adding some movement with mouseX for interaction

//     // Animation for odd/even triangle positions
//     if (invert) {
//       let p1 = createVector(0, this.h / 2);
//       let p2 = createVector(this.w, 0 - (this.h / 2));
//       let p3 = createVector(this.w, this.h + (this.h / 2));

//       let m = (p2.y - p1.y) / (p2.x - p1.x);
//       let parallelStart = createVector(p1.x + slider, p1.y + slider);

//       let deltaX = this.w + 100;
//       let deltaY = m * deltaX;
//       let parallelEnd = createVector(parallelStart.x + deltaX, parallelStart.y + deltaY);

//       triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);

//       if (isWhite) {
//         for (let j = 0; j < 10; j++) {
//           push();
//           if (j % 2 === 0 && j < 5) { fill(0); } else { fill(255); }
//           this.drawRectis(parallelStart.x + j * offset, parallelStart.y + j * offset, parallelEnd.x + j * offset, parallelEnd.y + j * offset);
//           pop();
//         }
//       }
//     } else {
//       let p4 = createVector(0, 0 - (this.h / 2));
//       let p5 = createVector(this.w, this.h / 2);
//       let p6 = createVector(0, this.h + (this.h / 2));

//       let m = -(p5.y - p4.y) / (p5.x - p4.x);
//       let parallelStart = createVector(p4.x - 20, p4.y);

//       let deltaX = 200;
//       let deltaY = m * deltaX;
//       let parallelEnd = createVector(parallelStart.x + deltaX, parallelStart.y + deltaY);

//       triangle(p4.x, p4.y, p5.x, p5.y, p6.x, p6.y);
//     }

//     pop();
//   }

//   // Helper function to draw rectangle shapes for the animation
//   drawRectis(xx, yy, xe, ye) {
//     push();
//     noStroke();
//     beginShape();
//     vertex(xx, yy);
//     vertex(xe, ye);
//     vertex(xe + 40, ye + 20);
//     vertex(xx + 40, yy + 20);
//     endShape(CLOSE);
//     pop();
//   }
// }




