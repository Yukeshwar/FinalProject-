let serial; // Serial object for Arduino communication
let money = 0;
let manpower = 0;
let corleoneTerritory = 100;
let rivalTerritory = 100;

let mapImage; // Variable to store the map image

function preload() {
  // Load the map image
  mapImage = loadImage("Mafia_Map.jpg"); // Replace with the correct path
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialize Serial Communication
  serial = new p5.SerialPort();
  serial.open('/dev/tty.usbmodem'); // Replace with your Arduino's serial port
  serial.on('data', serialEvent);
}

function draw() {
  // Draw the map image as the background
  background(30); // Black background as fallback
  image(mapImage, 0, 0, width, height); // Display the map image

  // Draw the dynamic map overlays
  drawDynamicMap();

  // Display resource values
  displayResources();
}

function drawDynamicMap() {
  textSize(18);

  // Smoothly adjust territory sizes
  corleoneTerritory = lerp(
    corleoneTerritory,
    constrain(corleoneTerritory + (money - manpower) / 10, 0, width / 2),
    0.1
  );
  rivalTerritory = lerp(
    rivalTerritory,
    constrain(rivalTerritory + (manpower - money) / 10, 0, width / 2),
    0.1
  );

  // Overlay Corleone-controlled territory (green)
  fill(0, 255, 0, 100); // Semi-transparent green
  rect(50, height / 4, corleoneTerritory, height / 2);
  fill(255);
  text('Corleone Territory', 60, height / 4 - 10);

  // Overlay rival-controlled territory (red)
  fill(255, 0, 0, 100); // Semi-transparent red
  rect(width - 50 - rivalTerritory, height / 4, rivalTerritory, height / 2);
  fill(255);
  text('Rival Territory', width - rivalTerritory - 60, height / 4 - 10);
}

function displayResources() {
  fill(255);
  textSize(24);
  text(`Money: ${money}`, 50, 50);
  text(`Manpower: ${manpower}`, 50, 90);
}

function serialEvent() {
  let data = serial.readLine().trim();
  if (data.startsWith("Money:")) {
    let values = data.split(" ");
    money = int(values[0].split(":")[1]);
    manpower = int(values[1].split(":")[1]);
  } else if (data === "Action:Punish") {
    corleoneTerritory -= 50; // Punish reduces Corleone territory
    rivalTerritory += 50;   // Rival gains territory
  } else if (data === "Action:Forgive") {
    corleoneTerritory += 20; // Forgive increases Corleone territory
    rivalTerritory -= 20;   // Rival loses territory
  }
}
