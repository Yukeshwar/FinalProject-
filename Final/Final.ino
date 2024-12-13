#include <Servo.h>

Servo myServo;

// Pin Definitions
int potMoney = A0;       // Potentiometer for Money
int potManpower = A1;    // Potentiometer for Manpower
int buttonPunish = 2;    // Button for Punish action
int buttonForgive = 3;   // Button for Forgive action
int ledGreen = 4;        // Green LED
int ledRed = 5;          // Red LED
int buzzer = 11;         // Active Buzzer

unsigned long lastServoUpdate = 0; // Tracks the last time the servo was updated
int servoAngle = 0; // Current angle of the servo

void setup() {
  pinMode(buttonPunish, INPUT); // Set Punish button as INPUT
  pinMode(buttonForgive, INPUT); // Set Forgive button as INPUT
  pinMode(ledGreen, OUTPUT); // Green LED
  pinMode(ledRed, OUTPUT); // Red LED
  pinMode(buzzer, OUTPUT); // Set buzzer as OUTPUT
  //myServo.attach(10); // Attach servo to pin 10

  // Ensure buzzer starts OFF
  digitalWrite(buzzer, HIGH);

  Serial.begin(9600); // Begin serial communication with p5.js
}

void loop() {
  // Read potentiometer values
  int money = analogRead(potMoney) / 4;    // Scale to 0-255
  int manpower = analogRead(potManpower) / 4;

  // Send data to p5.js
  Serial.print("Money:");
  Serial.print(money);
  Serial.print(" Manpower:");
  Serial.println(manpower);

  // Update servo angle like a minute hand
  unsigned long currentMillis = millis();
  if (currentMillis - lastServoUpdate >= 1000) { // Update every second
    lastServoUpdate = currentMillis;
    servoAngle += 3; // Move by 3 degrees (180°/60 seconds)
    if (servoAngle > 180) {
      servoAngle = 0; // Reset to 0 after completing a full cycle
    }
    myServo.write(servoAngle); // Move servo to the new angle
    Serial.print("Servo Angle: ");
    Serial.println(servoAngle);
  }

  // Handle Punish Button
  if (digitalRead(buttonPunish) == HIGH) { // Button is pressed
    Serial.println("Action:Punish");
    digitalWrite(ledRed, HIGH);  // Turn on Red LED
    digitalWrite(buzzer, LOW); // Turn on Buzzer
  } else { // Button is not pressed
    digitalWrite(ledRed, LOW);   // Turn off Red LED
    digitalWrite(buzzer, HIGH);  // Turn off Buzzer
  }

  // Handle Forgive Button
  if (digitalRead(buttonForgive) == HIGH) { // Button is pressed
    Serial.println("Action:Forgive");
    digitalWrite(ledGreen, HIGH);  // Turn on Green LED
  } else { // Button is not pressed
    digitalWrite(ledGreen, LOW);   // Turn off Green LED
  }

  delay(50); // Small delay for stability
}
