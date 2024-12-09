let serial; // Serial object for Arduino communication
let money = 0; // Money resources
let manpower = 0; // Manpower resources
let corleoneTerritory = 100; // Initial Corleone family territory
let rivalTerritory = 100; // Initial rival family territory

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialize Serial Communication
  serial = new p5.SerialPort();
  serial.open('/dev/tty.usbmodem'); 
  serial.on('data', serialEvent); 
}

function draw() {
  background(30);

  // Draw the map
  drawMap();

  // Display resource values
  displayResources();
}

function drawMap() {
  textSize(18);

  // Smoothly adjust territory sizes based on conditions
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

  // Corleone Territory (Green)
  fill(0, 255, 0);
  rect(50, height / 4, corleoneTerritory, height / 2);
  fill(255);
  text('Corleone Territory', 60, height / 4 - 10);

  // Rival Territory (Red)
  fill(255, 0, 0);
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
  let data = serial.readLine().trim(); // Read incoming data
  if (data.startsWith("Money:")) {
    let values = data.split(" ");
    money = int(values[0].split(":")[1]); // Extract money
    manpower = int(values[1].split(":")[1]); // Extract manpower
  } else if (data === "Action:Punish") {
    corleoneTerritory -= 50; // Punish reduces Corleone territory
    rivalTerritory += 50;   // Rival gains territory
    flashTerritory("red");
  } else if (data === "Action:Forgive") {
    corleoneTerritory += 20; // Forgive increases Corleone territory
    rivalTerritory -= 20;   // Rival loses territory
    flashTerritory("green");
  }
}

function flashTerritory(color) {
  let flashDuration = 500; 
  let startTime = millis();

  function doFlash() {
    if (millis() - startTime < flashDuration) {
      fill(color === "red" ? [255, 0, 0] : [0, 255, 0]);
      rect(50, height / 4, width - 100, height / 2);
    }
  }

  setTimeout(() => {}, flashDuration); 
  doFlash();
}
