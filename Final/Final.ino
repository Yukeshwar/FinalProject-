#include <Servo.h>
#include <ArduinoJson.h>

Servo myServo;

// Pin Definitions
const int buttonPunish = 2;    // Button for Punish action
const int buttonForgive = 3;   // Button for Forgive action
const int ledGreen = 4;        // Green LED
const int ledRed = 5;          // Red LED
const int buzzer = 11;         // Active Buzzer
const int servoPin = 10;       // Servo pin

unsigned long lastServoUpdate = 0; // Tracks the last time the servo was updated
int servoAngle = 0; // Current angle of the servo

void setup() {
  pinMode(buttonPunish, INPUT);       // Set Punish button as INPUT
  pinMode(buttonForgive, INPUT);     // Set Forgive button as INPUT
  pinMode(ledGreen, OUTPUT);         // Green LED
  pinMode(ledRed, OUTPUT);           // Red LED
  pinMode(buzzer, OUTPUT);           // Set buzzer as OUTPUT
  myServo.attach(servoPin);          // Attach servo to pin 10

  // Ensure buzzer starts OFF
  digitalWrite(buzzer, HIGH);

  Serial.begin(9600); // Begin serial communication with p5.js
}

void loop() {
  // Update servo angle like a minute hand
  unsigned long currentMillis = millis();
  if (currentMillis - lastServoUpdate >= 1000) { // Update every second
    lastServoUpdate = currentMillis;
    servoAngle += 3; // Move by 3 degrees (180°/60 seconds)
    if (servoAngle > 180) {
      servoAngle = 0; // Reset to 0 after completing a full cycle
    }
    myServo.write(servoAngle); // Move servo to the new angle
  }

  // Handle Punish Button
  bool punishPressed = digitalRead(buttonPunish) == HIGH;
  if (punishPressed) {
    digitalWrite(ledRed, HIGH);   // Turn on Red LED
    digitalWrite(buzzer, LOW);   // Turn on Buzzer
  } else {
    digitalWrite(ledRed, LOW);   // Turn off Red LED
    digitalWrite(buzzer, HIGH);  // Turn off Buzzer
  }

  // Handle Forgive Button
  bool forgivePressed = digitalRead(buttonForgive) == HIGH;
  if (forgivePressed) {
    digitalWrite(ledGreen, HIGH);  // Turn on Green LED
  } else {
    digitalWrite(ledGreen, LOW);   // Turn off Green LED
  }

  // Send JSON data to p5.js
  sendJsonData(punishPressed, forgivePressed, servoAngle);

  delay(50); // Small delay for stability
}

void sendJsonData(bool punish, bool forgive, int servoAngle) {
  // Create JSON object
  StaticJsonDocument<128> json;
  JsonObject data = json.createNestedObject("data");

  data["punish"] = punish ? 1 : 0;  // Send punish status
  data["forgive"] = forgive ? 1 : 0; // Send forgive status
  data["servoAngle"] = servoAngle;

  // Serialize and send JSON
  serializeJson(json, Serial);
  Serial.println();
}
