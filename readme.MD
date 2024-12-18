# 🐵 **Landing Game**

A **2D platformer game** built using **Phaser.js**, where players control a monkey navigating through challenging levels, collecting bananas, managing fuel, and avoiding obstacles. The game focuses on creating an engaging experience with dynamic physics, animations, and interactive gameplay.

---

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
![Main Menu](screenshots/Screenshot-2024-12-16-at-3.12.32-AM.png)

### **How to Play**
![How to Play](screenshots/Screenshot-2024-12-16-at-3.13.00-AM.png)

### **In-Game Scene**
![Game Scene](screenshots/Screenshot-2024-12-16-at-3.12.46-AM.png)

### **Paused Screen**
![Paused Screen](screenshots/Screenshot-2024-12-16-at-3.13.35-AM.png)

### **Game Over Screen**
![Game Over](screenshots/Screenshot-2024-12-16-at-3.13.51-AM.png)

### **Level Selection**
![Level Selection](screenshots/Screenshot-2024-12-16-at-3.13.55-AM.png)

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
   cd monkey-landing-adventure
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

- **Developer**: [Your Name]
- **Tech Stack**: Phaser.js, JavaScript, HTML, CSS

---

## 📜 **License**

This project is licensed under the **MIT License**.
