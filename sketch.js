let mafiaMap;
let menImage, moneyImage, usImage, rival1Image, rival2Image, familyPortrait, bgImage;
let mSerial;
let connectButton;
let readyToReceive = false;

// Variables for states
let menCount = 0; // Controlled by pot1 (A0)
let moneyCount = 0; // Controlled by pot2 (A1)
let conversationStage = 0;
let alphaRegion1 = 100; // Reduced intensity of Region 1 green
let alphaRegion2 = 50;  // Initial transparency for Rival 1 (red)
let alphaRegion3 = 50;  // Initial transparency for Rival 2 (red)
let region2Converted = false; // Ensure Region 2 transitions only once
let region3Converted = false; // Ensure Region 3 transitions only once
let forgivePressed = false;
let punishPressed = false;

// Regions for the map
const regions = [
  {
    name: "Region 1",
    vertices: [
      [281.0, 182.0],
      [695.0, 183.0],
      [751.0, 394.0],
      [455.0, 668.0],
    ],
    alpha: alphaRegion1,
    color: [0, 255, 0],
  },
  {
    name: "Region 2",
    vertices: [
      [280.0, 181.0],
      [685.0, 179.0],
      [598.0, 14.0],
      [219.0, 13.0],
    ],
    alpha: alphaRegion2,
    color: [255, 0, 0],
  },
  {
    name: "Region 3",
    vertices: [
      [15.0, 147.0],
      [69.0, 116.0],
      [248.0, 652.0],
      [23.0, 680.0],
    ],
    alpha: alphaRegion3,
    color: [255, 0, 0],
  },
];

// Dialogue quotes
const quotes = {
  1: "\"You've underestimated me, Barzini. That's your first mistake. It will also be your last.\"",
  2: "\"The Corleones don’t start wars, Tattaglia, but we always finish them.\"",
};

// Static cracks array
let cracks = [];

function preload() {
  bgImage = loadImage("bg.png"); // Load background image
  mafiaMap = loadImage("Mafia_Map.jpg");
  menImage = loadImage("men.jpg");
  moneyImage = loadImage("money.png");
  familyPortrait = loadImage("family_portrait.jpg");
  usImage = loadImage("us.jpg");
  rival1Image = loadImage("rival1.jpg");
  rival2Image = loadImage("rival2.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  mSerial = createSerial();
  connectButton = createButton("Connect to Serial");
  connectButton.position(width / 2 - 50, height / 2);
  connectButton.mousePressed(connectToSerial);

  readyToReceive = false;
}

function draw() {
  // Draw the background image
  image(bgImage, 0, 0, width, height);

  drawMap();
  drawFamilyPortrait();
  displayImages();
  drawCaptions();
  handleConversations();

  if (mSerial.opened() && readyToReceive) {
    mSerial.write(0xAB); // Request data
    readyToReceive = false;
  }

  if (mSerial.availableBytes() > 0) {
    receiveSerial();
  }
}

function drawMap() {
  let mapAspectRatio = mafiaMap.width / mafiaMap.height;
  let canvasAspectRatio = width / height;

  let mapWidth, mapHeight;
  if (canvasAspectRatio > mapAspectRatio) {
    mapHeight = height;
    mapWidth = mapHeight * mapAspectRatio;
  } else {
    mapWidth = width * 0.6;
    mapHeight = mapWidth / mapAspectRatio;
  }

  let mapX = 0;
  let mapY = (height - mapHeight) / 2;

  image(mafiaMap, mapX, mapY, mapWidth, mapHeight);

  regions.forEach((region) => {
    drawRegion(region, mapX, mapY, mapWidth / mafiaMap.width, mapHeight / mafiaMap.height);
  });
}

function drawRegion(region, offsetX, offsetY, scaleX, scaleY) {
  fill(region.color[0], region.color[1], region.color[2], region.alpha);

  stroke(0);
  strokeWeight(2);
  beginShape();
  region.vertices.forEach(([x, y]) => vertex(x * scaleX + offsetX, y * scaleY + offsetY));
  endShape(CLOSE);
}

function drawFamilyPortrait() {
  let portraitWidth = 150;
  let portraitHeight = 200;
  let portraitX = width * 0.78;
  let portraitY = 50;

  image(familyPortrait, portraitX, portraitY, portraitWidth, portraitHeight);

  // Draw static cracks
  cracks.forEach(crack => {
    stroke(0); // Black color
    strokeWeight(1.5);
    noFill();
    beginShape();
    crack.forEach(([x, y]) => vertex(portraitX + x, portraitY + y));
    endShape();
  });
}

function addCrackToPortrait() {
  const numCracks = random(2, 5); // Number of cracks per forgive press
  for (let i = 0; i < numCracks; i++) {
    let crack = generateCrackPath(random(0, 150), random(0, 200));
    cracks.push(crack);
  }
}

function generateCrackPath(startX, startY) {
  let crack = [[startX, startY]];
  const maxSegments = random(5, 10);

  for (let i = 0; i < maxSegments; i++) {
    let prevPoint = crack[crack.length - 1];
    let newX = prevPoint[0] + random(-20, 20);
    let newY = prevPoint[1] + random(-20, 20);

    if (newX >= 0 && newX <= 150 && newY >= 0 && newY <= 200) {
      crack.push([newX, newY]);
    }
  }
  return crack;
}

function displayImages() {
  let xStart = width * 0.75;
  let yStartMen = height - 200;
  let yStartMoney = height - 300;
  let imageSize = 20;
  let imagesPerRow = 16;

  for (let i = 0; i < menCount; i++) {
    let x = xStart + (i % imagesPerRow) * (imageSize + 2);
    let y = yStartMen + floor(i / imagesPerRow) * (imageSize + 2);
    image(menImage, x, y, imageSize, imageSize);
  }

  for (let i = 0; i < moneyCount; i++) {
    let x = xStart + (i % imagesPerRow) * (imageSize + 2);
    let y = yStartMoney + floor(i / imagesPerRow) * (imageSize + 2);
    image(moneyImage, x, y, imageSize, imageSize);
  }
}

function drawCaptions() {
  fill(255, 0, 0);
  textSize(20);
  textAlign(CENTER);

  text("Money", width * 0.9, height - 330);
  text("Manpower", width * 0.9, height - 230);
}

function handleConversations() {
  const imageWidth = 450;
  const imageHeight = 600;
  const gap = 50;
  const centerY = height / 2 - imageHeight / 2;

  if (conversationStage === 1) {
    drawCharacters(usImage, rival1Image, quotes[1], imageWidth, imageHeight, centerY, gap);
    if (punishPressed && !region2Converted) {
      regions[1].color = [0, 255, 0];
      regions[1].alpha = min(regions[1].alpha + 5, 100);
      if (regions[1].alpha === 100) region2Converted = true;
    }
  }

  if (conversationStage === 2) {
    drawCharacters(usImage, rival2Image, quotes[2], imageWidth, imageHeight, centerY, gap);
    if (punishPressed && !region3Converted) {
      regions[2].color = [0, 255, 0];
      regions[2].alpha = min(regions[2].alpha + 5, 100);
      if (regions[2].alpha === 100) region3Converted = true;
    }
  }

  if (forgivePressed) {
    conversationStage = 0;
    addCrackToPortrait(); // Add static cracks when forgiving
  }
}

function drawCharacters(leftImage, rightImage, quote, imgWidth, imgHeight, y, gap) {
  push();
  translate(width / 2 - imgWidth - gap + imgWidth, y); // Flip horizontally
  scale(-1, 1);
  image(leftImage, 0, 0, imgWidth, imgHeight);
  pop();

  image(rightImage, width / 2 + gap, y, imgWidth, imgHeight);

  // Dialogue box in the center
  const boxWidth = 800;
  const boxHeight = 150;
  const boxY = height - 300;

  fill(255, 255, 240);
  stroke(0);
  strokeWeight(2);
  rect(width / 2 - boxWidth / 2, boxY, boxWidth, boxHeight, 10);

  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(quote, width / 2, boxY + boxHeight / 2);
}

function connectToSerial() {
  if (!mSerial.opened()) {
    mSerial.open(9600);
    connectButton.hide();
    readyToReceive = true;
  }
}

function receiveSerial() {
  let line = mSerial.readUntil("\n").trim();
  if (!line) return;

  try {
    let data = JSON.parse(line).data;
    menCount = map(data?.A0?.value ?? 512, 0, 1023, 0, 50);
    moneyCount = map(data?.A1?.value ?? 512, 0, 1023, 0, 50);
    forgivePressed = data?.D3?.count === 1;
    punishPressed = data?.D2?.count === 1;

    if (menCount >= 25 && moneyCount >= 25 && conversationStage === 0 && !region2Converted) {
      conversationStage = 1;
    } else if (menCount >= 40 && moneyCount >= 40 && conversationStage === 0 && !region3Converted) {
      conversationStage = 2;
    }
  } catch (error) {
    console.error("Error parsing:", error.message);
  }
  readyToReceive = true;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
