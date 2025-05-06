# Casino Slot Machine

A simple web-based casino slot machine game where users can bet credits and try their luck at winning.

## Features

- Starting balance of 1000 credits
- Adjustable bet amounts (minimum 10 credits)
- Interactive mini-game to earn 100 credits
- Player profile system to save your information
- Three spinning reels with various symbols
- Different payout values for each symbol
- 40% chance of winning
- Winning multipliers based on the matched symbols

## How to Play

1. Open `index.html` in your web browser
2. Set your bet amount using the input field (minimum 10 credits)
3. Click the "SPIN" button to start the game
4. If you run out of credits, click "Add Funds" to play a mini-game for 100 credits
5. Fill in your profile information on the right panel and save it

## Mini-Game

When you click "Add Funds", a mini-game will appear:
- You have 10 seconds to click on the gold target or button as many times as possible
- To win 100 credits, you need to either:
  - Click the gold target at least 5 times, or
  - Click the button at least 10 times
- If you succeed, 100 credits will be added to your balance

## Player Profile

The player profile panel allows you to:
- Save your username, email, age, favorite game, and bio
- Your profile information is stored locally and will be remembered when you return

## Winning Combinations

To win, all three reels must display the same symbol. Each symbol has its own multiplier:

- 🍒 Cherry: 2x your bet
- 🍋 Lemon: 3x your bet
- 🍊 Orange: 4x your bet
- 🍇 Grapes: 5x your bet
- 🍉 Watermelon: 6x your bet
- 🍎 Apple: 7x your bet
- 💎 Diamond: 10x your bet
- 7️⃣ Seven: 15x your bet
- 🎰 Jackpot: 20x your bet

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Local Storage for profile data

## Browser Compatibility

This game works best on modern browsers that support ES6 JavaScript, CSS3 animations, and Local Storage. 