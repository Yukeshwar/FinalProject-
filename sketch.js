let mafiaMap;
let mSerial;
let connectButton;
let readyToReceive = false;

// Game variables
let punishCount = 0;
let forgiveCount = 0;
let servoAngle = 0;

const regions = [
  {
    name: "Region 1",
    vertices: [
      [281.0, 182.0],
      [695.0, 183.0],
      [751.0, 394.0],
      [455.0, 668.0],
    ],
    controlledBy: "Corleone",
  },
  {
    name: "Region 2",
    vertices: [
      [280.0, 181.0],
      [685.0, 179.0],
      [598.0, 14.0],
      [219.0, 13.0],
    ],
    controlledBy: "Rival 1",
  },
  {
    name: "Region 3",
    vertices: [
      [15.0, 147.0],
      [69.0, 116.0],
      [248.0, 652.0],
      [23.0, 680.0],
    ],
    controlledBy: "Rival 2",
  },
];

function preload() {
  mafiaMap = loadImage("Mafia_Map.jpg"); // Load your map image
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Setup serial communication
  mSerial = createSerial();
  connectButton = createButton("Connect to Serial");
  connectButton.position(width / 2 - 50, height / 2);
  connectButton.mousePressed(connectToSerial);

  readyToReceive = false;
}

function draw() {
  background(255);

  drawMap();
  displayStats();

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
  noFill();
  if (region.controlledBy === "Corleone") {
    stroke(0, 255, 0);
    fill(0, 255, 0, 50);
  } else if (region.controlledBy.startsWith("Rival")) {
    stroke(255, 0, 0);
    fill(255, 0, 0, 50);
  }

  strokeWeight(2);
  beginShape();
  region.vertices.forEach(([x, y]) => vertex(x * scaleX + offsetX, y * scaleY + offsetY));
  endShape(CLOSE);

  let [cx, cy] = calculateCentroid(region.vertices);
  cx = cx * scaleX + offsetX;
  cy = cy * scaleY + offsetY;
  noStroke();
  fill(0);
  textSize(12);
  textAlign(CENTER, CENTER);
  text(region.name, cx, cy);
}

function calculateCentroid(vertices) {
  let sumX = 0,
    sumY = 0;
  vertices.forEach(([x, y]) => {
    sumX += x;
    sumY += y;
  });
  return [sumX / vertices.length, sumY / vertices.length];
}

function displayStats() {
  textSize(16);
  fill(0);
  text(`Punish Actions: ${punishCount}`, width * 0.7, 50);
  text(`Forgive Actions: ${forgiveCount}`, width * 0.7, 70);
  text(`Servo Angle: ${servoAngle}`, width * 0.7, 90);
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
    if (!line.startsWith("{") || !line.endsWith("}")) {
      readyToReceive = true;
      return;
    }

    let data = JSON.parse(line).data;

    punishCount = data.punish ?? 0;
    forgiveCount = data.forgive ?? 0;
    servoAngle = data.servoAngle ?? 0;
  } catch (error) {
    console.error("JSON Parsing Error:", error.message);
    console.error("Raw Data:", line);
  }

  readyToReceive = true;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
