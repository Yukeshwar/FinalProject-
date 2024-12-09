Milestone 3: 

The project aimed to simulate territory control, betrayal, and forgiveness through an interactive experience using Arduino and p5.js. The prototype successfully integrates hardware components with visual elements, providing real-time updates and feedback. The development work involved creating a sketch file for visualizing the gameplay, writing the Arduino code to control the hardware, and connecting the two via serial communication.

The sketch file (sketch.js) was developed to display a dynamic map representing Corleone and rival territories. The map visually grows or shrinks based on player actions, with green areas signifying Corleone-controlled territory and red areas representing rival-controlled zones. Smooth animations were implemented using the lerp() function to ensure visually appealing transitions. Potentiometers were used to adjust resources like money and manpower, influencing the map dynamics. Buttons allowed players to trigger "Punish" or "Forgive" actions, leading to changes in the map and corresponding animations to reflect betrayal or negotiation.

The Arduino file was written to manage inputs and outputs from physical components. Potentiometers provided analog inputs for money and manpower values, while buttons were programmed to trigger actions such as "Punish" or "Forgive." LEDs were used to give visual feedback, with green indicating successful negotiations and red signaling betrayal. A buzzer was included to create auditory cues during high-stakes moments, while a solenoid delivered a physical knock effect during betrayal actions, adding drama to the gameplay. A mini servo was programmed to reflect money allocation by adjusting its angle dynamically, providing an additional layer of visual feedback.

The hardware components included potentiometers for resource adjustment, buttons for triggering actions, LEDs for feedback, a buzzer for tension-filled cues, a solenoid for physical interactions, and a mini servo to visually represent resource distribution. Pull-down resistors ensured accurate button readings, and a transistor circuit was used to safely control the solenoid.

I have attached the Circuit schematic and FSM diagram.

Milestone 2: The Godfather Project Proposal and Development Plan

The project titled The Godfather is an interactive tribute to the timeless themes of loyalty, power, and betrayal portrayed in The Godfather. Drawing inspiration from the intricate plot and emotional depth of the movie, this project seeks to blend storytelling, interactivity, and technology to create a dynamic and immersive experience. By combining visual elements with tactile interactions, the project will provide users with an engaging narrative-driven simulation that captures the essence of the film.

Project Idea Development:

The core of the project involves a dynamic map created in p5.js, representing the Corleone family’s territories in green and rival territories in red. As players make strategic decisions, these territories will expand, shrink, or change, reflecting control and conflict. To symbolize loyalty and betrayal, visual elements include a golden rose representing unity and a cracked portrait of the Don that deteriorates with betrayals. Animations such as transitions for deal-making and explosive visuals for betrayals will enrich the storytelling. On the physical interaction side, the project will use Arduino components to create a tangible layer of interactivity. Players will use potentiometers to adjust resources like money and manpower, enabling precise control over decisions. Buttons will trigger strategic actions such as punishing traitors, forgiving allies, or negotiating with rivals. LEDs will provide feedback on the outcomes of these actions (green for success and red for failure), while a buzzer will signal risky or consequential decisions. A vibration motor will activate during tense moments like betrayals or territorial disputes, heightening immersion.

Development Plan:

The project will follow a structured plan to ensure organized development. First, the visual components will be designed in p5.js, including the dynamic map, symbolic elements such as the golden rose, and animations for key events like deal-making and betrayals. The interactions and transitions between states—such as expanding territories or resolving disputes—will be clearly defined. Concurrently, the hardware setup will involve connecting Arduino components, including potentiometers for resource adjustments, buttons for decision-making, LEDs for visual feedback, and a vibration motor and buzzer for tension-inducing effects. Calibration of the potentiometers and responsiveness of buttons will be prioritized to ensure precise and intuitive control.

Once the visual and hardware components are established, the next step will involve integrating the software and hardware using serial communication. This integration will enable the Arduino inputs and outputs to seamlessly control the p5.js visualizations. Iterative testing will be conducted to ensure smooth transitions and responsive interactions. The final stage will focus on testing and refinement, where usability tests will be conducted to assess the intuitiveness of the controls and the overall user experience. Feedback from these tests will guide the refinement of animations, visual elements, and hardware responsiveness to ensure the final product is polished and engaging.

Challenges and Solutions:

Potential challenges include synchronizing Arduino inputs with p5.js, designing intuitive animations, and ensuring seamless integration between the hardware and software components. To address these challenges, the project will utilize libraries such as p5.serial for reliable communication, conduct iterative testing for interaction refinement, and prioritize user-centric design to maintain simplicity and engagement. With careful planning and problem-solving, these challenges will be managed effectively to deliver a cohesive and immersive project.




Final Project Ideas:

Idea 1: White Nights – An Interactive Tale
Why I Chose This Topic:
Dostoevsky is one of my favorite authors, and his works resonate deeply with me. He’s the father of dark philosophy, often exploring loneliness and human fragility. White Nights is my favorite short story of his, and it captures the themes of fleeting love and existential longing, which I find fascinating.

Implementation:
p5.js:

Create dynamic visuals such as cobwebs, streetlamps, and moonlight to symbolize the narrator’s emotional state.
Use interactive elements like sliders and buttons to control:
The brightness of the streetlamp (clearing cobwebs).
The movement of the bench under the moonlight.
Add a text box for narration and minimal dialogue between the narrator and Nastenka.
Arduino:

Inputs:
Sliders to adjust streetlamp brightness and bench positioning.
Buttons to advance dialogue or trigger narration.
Outputs:
RGB LEDs to reflect emotional tones (gold for hope, gray for despair).
Vibration motor to simulate tension during emotional peaks (e.g., heartbreak).

Idea 2: The Godfather
Why I Chose This Topic:
The Godfather is not only one of the greatest films ever made, but it’s also a cherished memory for me. I watched it with my grandfather, who explained the intricate plot as we sat together. This project is a tribute to both the movie and the values it explores, like loyalty, power, and the consequences of betrayal.

Implementation:
p5.js:

Create a dynamic map showing territories:
Green for controlled areas, red for rival territories.
Add visual elements like:
A golden rose symbolizing family loyalty.
A cracked portrait of the Don that worsens with betrayal.
Include animations for deal-making, betrayal, and territorial expansion.
Arduino:

Inputs:
Knobs to adjust resources (money, men) for territory expansion.
Buttons to make strategic decisions (punish, forgive, negotiate).
Outputs:
LEDs to show success (green) or failure (red).
A buzzer to signal risky actions or betrayal.
Vibration motor for tension-filled moments, such as betrayals or territorial disputes.

Idea 3:Neon Genesis Evangalion : Interactive Eva Synchronization Test

Why I Chose This Topic:

Neon Genesis Evangelion is my favorite anime of all time. It’s a deeply psychological series with complex themes like identity and existentialism. Its dark tone, layered characters, and biblical references make it uniquely compelling. The synchronization tests between the Eva pilots and their mechs are iconic, and I want to recreate that intense experience.

Implementation:
p5.js:

Design a NERV-inspired interface showing:
Synchronization percentage.
Energy levels and heartbeat of the Eva Unit.
Animate the Eva Unit powering up as the sync rate increases.
Include dynamic visuals and sound effects (e.g., alert tones, “synchronization complete” voice prompts).
Arduino:

Inputs:
Knobs or sliders to adjust sync levels, representing the user’s control over the Eva.
Outputs:
LEDs to indicate synchronization status (green for high sync, red for failure).
Vibration motor to provide tactile feedback for sync failure or stress scenarios.

I've added a PDF document with sketches of my ideas (its really bad,i am sorry) 