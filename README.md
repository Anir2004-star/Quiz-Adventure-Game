# 🌍 Quiz Adventure Game

**Quiz Adventure** is an interactive, browser-based trivia game built using **HTML, CSS, and JavaScript** — no frameworks required.  
You start your journey as a novice explorer and rise through difficulty levels (Easy → Medium → Hard → Expert) by answering real-world trivia questions correctly.  
But be careful... one wrong answer and your journey ends with a dramatic **GAME OVER** sound! 🎮💥

---

## 🚀 Features

### 🎯 Progressive Difficulty
- Starts on **Easy**
- Automatically advances through **Medium → Hard → Expert**
- Each correct answer increases your rank

### 🌐 Live Trivia Questions
- Fetches random questions from the [Open Trivia Database API](https://opentdb.com/)
- Covers multiple categories — science, movies, history, tech, etc.
- No question repeats within a session (thanks to session tokens)

### 🎵 Immersive Sound Design
- **Game Over Sound Effect** and **Voice Alert**
- Staggered playback for cinematic timing
- (Optional) Ambient background music support

### 🧠 Gameplay Rules
- You start with one question at Easy level
- Each correct answer takes you to the next stage
- The game ends instantly upon one wrong answer
- Your score and highest level reached are displayed at the end

---

## 🧩 Tech Stack

| Component | Description |
|------------|-------------|
| **HTML5** | Game structure and layout |
| **CSS3** | Visual styling, gradients, animations |
| **JavaScript (ES6)** | Game logic, API handling, difficulty progression |
| **Open Trivia DB API** | Source for live trivia questions |
| **Pixabay Sounds** | Free sound effects for Game Over audio |

---
## 🗂️ Project Structure
quiz-adventure/
│
├── index.html # Main game HTML
├── style.css # Game styles and animations
├── script.js # Game logic and trivia handling
