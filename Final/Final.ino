#include <Servo.h>

// Pin Definitions
int potMoney = A0;
int potManpower = A1;
int buttonPunish = 2;
int buttonForgive = 3;
int ledGreen = 4;
int ledRed = 5;
int buzzer = 6;
int solenoidPin = 8;
Servo myServo;

void setup() {
  pinMode(buttonPunish, INPUT_PULLUP);
  pinMode(buttonForgive, INPUT_PULLUP);
  pinMode(ledGreen, OUTPUT);
  pinMode(ledRed, OUTPUT);
  pinMode(buzzer, OUTPUT);
  pinMode(solenoidPin, OUTPUT);

  myServo.attach(9); 
  myServo.write(0);  
  Serial.begin(9600); 
}

void loop() {
  // potentiometers
  int money = analogRead(potMoney) / 4;
  int manpower = analogRead(potManpower) / 4;

  // Send data to p5.js
  Serial.print("Money:");
  Serial.print(money);
  Serial.print(" Manpower:");
  Serial.println(manpower);

  // Adjust servo for money allocation
  int servoAngle = map(money, 0, 255, 0, 180);
  myServo.write(servoAngle);

  // Handle button inputs
  if (digitalRead(buttonPunish) == LOW) {
    Serial.println("Action:Punish");
    digitalWrite(ledRed, HIGH);
    tone(buzzer, 1000, 200);
    digitalWrite(solenoidPin, HIGH); // Solenoid knock
    delay(200);
    digitalWrite(solenoidPin, LOW);
    delay(1000);
    digitalWrite(ledRed, LOW);
  }

  if (digitalRead(buttonForgive) == LOW) {
    Serial.println("Action:Forgive");
    digitalWrite(ledGreen, HIGH);
    delay(1000);
    digitalWrite(ledGreen, LOW);
  }

  delay(100);
}
