# 🐵 **Landing Game**

A **2D platformer game** built using **Phaser.js**, where players control a monkey navigating through challenging levels, collecting bananas, managing fuel, and avoiding obstacles. The game focuses on creating an engaging experience with dynamic physics, animations, and interactive gameplay.

--

## 📚 **Framework and Development**

The game is developed using **Phaser.js**, a robust framework for creating 2D games in **JavaScript** and **TypeScript**. Phaser.js offers powerful tools like physics engines and animation utilities, simplifying game logic and object interactions.

---

## 🗂️ **Project Structure**

1. **Assets**:
   - Images, audio files, and fonts used in the game.

2. **CSS**:
   - Styles for the game interface.

3. **Source Code (`src`)**:
   - **Game Objects**: Classes for elements like bananas, cliffs, and fuel.
   - **Game Scenes**: Manages different game stages: Main Menu, Gameplay, Pause, and Game Over.
   - **`main.js`**: Entry point for initializing the Phaser.js framework.

4. **`index.html`**:
   - The main file to launch the game in the browser.

---

## 🎮 **How to Play**

### **Objective**
Guide the monkey to collect bananas, avoid obstacles, and land safely on the landing space.

### **Controls**
- **Arrow Keys**:
  - `↑`: Hover up.
  - `←`: Move left.
  - `→`: Move right.

### **Scoring**
- Collect bananas for points.
- Remaining fuel adds bonus points.

### **Game Over Conditions**
- Running out of fuel or lives.
- Failing to land correctly on the landing space.

---

## 🖥️ **Game Screenshots**

### **Main Menu**
<img width="802" alt="MainMenu" src="https://github.com/user-attachments/assets/6b9b5e57-1c4f-4aa5-8843-31a450da6af6" />


### **How to Play**
<img width="802" alt="Screenshot 2024-12-18 at 6 54 56 PM" src="https://github.com/user-attachments/assets/55146b5d-d8ab-43df-815d-11352f183e75" />

### **In-Game Scene**
<img width="802" alt="Level2" src="https://github.com/user-attachments/assets/f060fba5-89d7-4cd6-88a2-da1010fccd8a" />


### **Paused Screen**
<img width="802" alt="Screenshot 2024-12-18 at 6 55 18 PM" src="https://github.com/user-attachments/assets/5e8435a4-8c7e-453d-bd26-ce3fbbea0c94" />


### **Game Over Screen**
<img width="805" alt="Screenshot 2024-12-18 at 7 28 28 PM" src="https://github.com/user-attachments/assets/56c6797d-5375-4431-91a2-1e3311c8c9db" />

### **Level Selection**
<img width="802" alt="Screenshot 2024-12-18 at 6 55 04 PM" src="https://github.com/user-attachments/assets/84a2f2a7-800d-4e3a-bf6e-7cdbb012f963" />

---

## 🚧 **Current Development Status**

### ✅ **What Works**
- Game objects load successfully in the scene.
- Player can control the monkey and collect bananas.

### 🛠️ **Pending Tasks**
- Refine game logic and object placement.
- Implement smooth collision detection.
- Add logic for soft landings on landing spaces.

---

## 💡 **Challenges Faced**

1. **Physics Engine Selection**:
   - Transitioned from **Arcade Physics** to drawing custom boundaries for complex collisions.

2. **Asset Management**:
   - Manually cropped images for spritesheets and animated assets.

3. **Animations**:
   - Implemented monkey movement animations with direction-specific frames.

4. **Landing Space Logic**:
   - Logic for detecting the monkey's landing required fine-tuning to ensure seamless gameplay.

---

## 🚀 **How to Run the Game**

1. Install Node.js (if not already installed):
   - [Download Node.js](https://nodejs.org/) and install it for your system.
   - Verify installation:
     ```bash
     node -v
     npm -v
     ```

2. Clone the repository:
   ```bash
   git clone <repository-url>
   cd landing-game
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start a local server:
   ```bash
   npx http-server
   ```

5. Open the game in your browser:
   ```
   http://localhost:8080
   ```

---

## 🔮 **Future Improvements**

- Add enhanced collision detection.
- Design additional levels with unique challenges.
- Polish animations and add new sprite directions.
- Improve user experience with refined UI and effects.

---

## 👨‍💻 **Contributors**

- **Developer**: Kavin Raj Raveendran, Sai Kumar agam, Disha roopun
- **Tech Stack**: Phaser.js, JavaScript, HTML, CSS

---

## 📜 **License**

This project is licensed under the **MIT License**.
