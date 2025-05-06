document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const balanceElement = document.getElementById('balance');
    const addFundsButton = document.getElementById('add-funds');
    const betAmountInput = document.getElementById('bet-amount');
    const spinButton = document.getElementById('spin-button');
    const messageElement = document.getElementById('message');
    const reels = [
        document.getElementById('reel1'),
        document.getElementById('reel2'),
        document.getElementById('reel3')
    ];
    
    // Mini-game Elements
    const miniGameContainer = document.getElementById('mini-game-container');
    const miniGameArea = document.getElementById('mini-game');
    const target = document.getElementById('target');
    const miniGameButton = document.getElementById('mini-game-button');
    const timerElement = document.getElementById('timer-value');
    const miniGameMessage = document.getElementById('mini-game-message');
    const miniGameCloseButton = document.getElementById('mini-game-close');
    
    // Profile Elements
    const profileForm = document.getElementById('profile-form');
    const saveProfileButton = document.getElementById('save-profile');
    const profileSavedMessage = document.getElementById('profile-saved-message');
    const toggleProfileButton = document.getElementById('toggle-profile');
    const profileContent = document.getElementById('profile-content');
    const profileDisplay = document.getElementById('profile-display');
    const editProfileButton = document.getElementById('edit-profile');
    
    // Profile Display Elements
    const displayUsername = document.getElementById('display-username');
    const displayEmail = document.getElementById('display-email');
    const displayAge = document.getElementById('display-age');
    const displayFavoriteGame = document.getElementById('display-favorite-game');
    const displayBio = document.getElementById('display-bio');
    
    // Game state
    let balance = 1000;
    let isSpinning = false;
    const WIN_PROBABILITY = 0.40; // 40% chance to win
    let miniGameActive = false;
    let miniGameTimer = null;
    let timeLeft = 10;
    let miniGameClicks = 0;
    let targetClickCount = 0;
    let isProfileCollapsed = false;
    
    // Slot symbols with corresponding values
    const symbols = [
        { icon: '🍒', value: 2 },   // Cherry
        { icon: '🍋', value: 3 },   // Lemon
        { icon: '🍊', value: 4 },   // Orange
        { icon: '🍇', value: 5 },   // Grapes
        { icon: '🍉', value: 6 },   // Watermelon
        { icon: '🍎', value: 7 },   // Apple
        { icon: '💎', value: 10 },  // Diamond
        { icon: '7️⃣', value: 15 }, // Seven
        { icon: '🎰', value: 20 }   // Jackpot
    ];
    
    // Update balance display
    function updateBalance() {
        balanceElement.textContent = balance;
    }
    
    // Toggle profile panel
    toggleProfileButton.addEventListener('click', () => {
        isProfileCollapsed = !isProfileCollapsed;
        profileContent.classList.toggle('collapsed');
        toggleProfileButton.classList.toggle('collapsed');
        toggleProfileButton.textContent = isProfileCollapsed ? '▶' : '▼';
    });
    
    // Add funds button now opens mini-game
    addFundsButton.addEventListener('click', () => {
        startMiniGame();
    });
    
    // Mini-game functions
    function startMiniGame() {
        miniGameContainer.classList.remove('hidden');
        miniGameActive = true;
        timeLeft = 10;
        miniGameClicks = 0;
        targetClickCount = 0;
        timerElement.textContent = timeLeft;
        miniGameMessage.textContent = 'Click the gold target or button as many times as possible!';
        miniGameCloseButton.classList.add('hidden');
        
        // Position target at random location
        repositionTarget();
        
        // Position mini-game button at random location
        repositionMiniGameButton();
        
        // Start the timer
        miniGameTimer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endMiniGame();
            }
        }, 1000);
    }
    
    function repositionTarget() {
        const maxX = miniGameArea.clientWidth - target.clientWidth;
        const maxY = miniGameArea.clientHeight - target.clientHeight;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        target.style.left = `${randomX}px`;
        target.style.top = `${randomY}px`;
    }
    
    function repositionMiniGameButton() {
        const maxX = miniGameArea.clientWidth - miniGameButton.clientWidth;
        const maxY = miniGameArea.clientHeight - miniGameButton.clientHeight;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        miniGameButton.style.left = `${randomX}px`;
        miniGameButton.style.top = `${randomY}px`;
    }
    
    function endMiniGame() {
        clearInterval(miniGameTimer);
        miniGameActive = false;
        
        // Determine if player succeeded
        const targetSuccess = targetClickCount >= 5;
        const buttonSuccess = miniGameClicks >= 10;
        
        if (targetSuccess || buttonSuccess) {
            // Award credits
            balance += 100;
            updateBalance();
            miniGameMessage.textContent = 'Success! You earned 100 credits!';
            miniGameMessage.style.color = 'gold';
        } else {
            miniGameMessage.textContent = 'Try again! You need more clicks to win.';
            miniGameMessage.style.color = '#ff6b6b';
        }
        
        miniGameCloseButton.classList.remove('hidden');
    }
    
    // Target click event
    target.addEventListener('click', () => {
        if (miniGameActive) {
            targetClickCount++;
            repositionTarget();
        }
    });
    
    // Mini-game button click event
    miniGameButton.addEventListener('click', () => {
        if (miniGameActive) {
            miniGameClicks++;
            repositionMiniGameButton();
        }
    });
    
    // Close mini-game
    miniGameCloseButton.addEventListener('click', () => {
        miniGameContainer.classList.add('hidden');
    });
    
    // Profile saving functionality
    saveProfileButton.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;
        const favoriteGame = document.getElementById('favorite-game').value;
        const bio = document.getElementById('bio').value;
        
        // Simple validation
        if (!username) {
            alert('Please enter a username');
            return;
        }
        
        // Save profile data (in a real app, this would be sent to a server)
        const profileData = {
            username,
            email,
            age,
            favoriteGame,
            bio
        };
        
        // Save to localStorage
        localStorage.setItem('casinoProfile', JSON.stringify(profileData));
        
        // Update display
        updateProfileDisplay(profileData);
        
        // Show success message
        profileSavedMessage.classList.remove('hidden');
        
        // Hide message after 3 seconds
        setTimeout(() => {
            profileSavedMessage.classList.add('hidden');
        }, 3000);
    });
    
    // Edit profile button
    editProfileButton.addEventListener('click', () => {
        profileDisplay.classList.add('hidden');
        profileForm.classList.remove('hidden');
    });
    
    // Update profile display
    function updateProfileDisplay(profileData) {
        displayUsername.textContent = profileData.username || 'Not set';
        displayEmail.textContent = profileData.email || 'Not set';
        displayAge.textContent = profileData.age || 'Not set';
        displayFavoriteGame.textContent = profileData.favoriteGame || 'Not set';
        displayBio.textContent = profileData.bio || 'Not set';
        
        // Show display and hide form
        profileForm.classList.add('hidden');
        profileDisplay.classList.remove('hidden');
    }
    
    // Load profile data if exists
    function loadProfileData() {
        const savedProfile = localStorage.getItem('casinoProfile');
        
        if (savedProfile) {
            const profileData = JSON.parse(savedProfile);
            
            // Fill form fields
            document.getElementById('username').value = profileData.username || '';
            document.getElementById('email').value = profileData.email || '';
            document.getElementById('age').value = profileData.age || '';
            document.getElementById('favorite-game').value = profileData.favoriteGame || '';
            document.getElementById('bio').value = profileData.bio || '';
            
            // Update display
            updateProfileDisplay(profileData);
        } else {
            // Show form if no profile exists
            profileForm.classList.remove('hidden');
            profileDisplay.classList.add('hidden');
        }
    }
    
    // Spin the reels
    spinButton.addEventListener('click', () => {
        if (isSpinning) return;
        
        const betAmount = parseInt(betAmountInput.value);
        
        // Check if bet is valid
        if (isNaN(betAmount) || betAmount < 10) {
            messageElement.textContent = 'Minimum bet is 10 credits.';
            messageElement.className = 'lose-message';
            return;
        }
        
        // Check if player has enough balance
        if (betAmount > balance) {
            messageElement.textContent = 'Not enough credits. Add more funds.';
            messageElement.className = 'lose-message';
            return;
        }
        
        // Deduct bet amount
        balance -= betAmount;
        updateBalance();
        
        // Clear previous message
        messageElement.textContent = 'Good luck!';
        messageElement.className = '';
        
        // Start spinning
        isSpinning = true;
        spinButton.disabled = true;
        
        // Add spinning animation to reels
        reels.forEach(reel => {
            const symbolElement = reel.querySelector('.symbol');
            symbolElement.classList.add('spinning');
        });
        
        // Determine in advance if this spin will be a win
        const isWin = Math.random() < WIN_PROBABILITY;
        
        // Stop reels after delay with different timings for each reel
        setTimeout(() => stopReel(0, isWin), 1000);
        setTimeout(() => stopReel(1, isWin), 1500);
        setTimeout(() => stopReel(2, isWin, finishSpin), 2000);
    });
    
    // Stop a single reel
    function stopReel(reelIndex, isWin, callback) {
        const reel = reels[reelIndex];
        const symbolElement = reel.querySelector('.symbol');
        
        // Stop spinning animation
        symbolElement.classList.remove('spinning');
        
        // Pick a symbol
        let randomSymbol;
        
        if (isWin && reelIndex === 2) { // For the last reel in a winning spin
            // Get the symbols from the first two reels
            const symbol1 = reels[0].querySelector('.symbol').textContent;
            const symbol2 = reels[1].querySelector('.symbol').textContent;
            
            // If the first two reels show the same symbol, match it for a win
            if (symbol1 === symbol2) {
                randomSymbol = symbols.find(s => s.icon === symbol1);
            } else {
                // Last chance to make a win - choose either the first or second reel symbol
                randomSymbol = symbols.find(s => s.icon === (Math.random() < 0.5 ? symbol1 : symbol2));
            }
        } else if (isWin && reelIndex === 1) { // For the second reel in a winning spin
            // Get the symbol from the first reel
            const symbol1 = reels[0].querySelector('.symbol').textContent;
            
            // 70% chance to match the first reel for a potential win
            if (Math.random() < 0.7) {
                randomSymbol = symbols.find(s => s.icon === symbol1);
            } else {
                // Otherwise pick a random different symbol
                const otherSymbols = symbols.filter(s => s.icon !== symbol1);
                randomSymbol = otherSymbols[Math.floor(Math.random() * otherSymbols.length)];
            }
        } else {
            // Pick a completely random symbol
            randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        }
        
        // Set the symbol
        symbolElement.textContent = randomSymbol.icon;
        
        // Call callback if provided
        if (callback) callback();
    }
    
    // Finish spin and check results
    function finishSpin() {
        // Get the final symbols
        const finalSymbols = reels.map(reel => reel.querySelector('.symbol').textContent);
        
        // Check for a win (all symbols are the same)
        const isWin = finalSymbols[0] === finalSymbols[1] && finalSymbols[1] === finalSymbols[2];
        
        // Calculate winnings if won
        if (isWin) {
            const winningSymbol = symbols.find(s => s.icon === finalSymbols[0]);
            const betAmount = parseInt(betAmountInput.value);
            const winAmount = betAmount * winningSymbol.value;
            
            // Add winnings to balance
            balance += winAmount;
            updateBalance();
            
            // Display win message
            messageElement.textContent = `Congratulations! You won ${winAmount} credits!`;
            messageElement.className = 'win-message';
            
            // Add celebration effect
            reels.forEach(reel => {
                reel.style.animation = 'pulse 0.5s 3';
                setTimeout(() => {
                    reel.style.animation = '';
                }, 1500);
            });
        } else {
            // Display loss message
            messageElement.textContent = 'Better luck next time!';
            messageElement.className = 'lose-message';
        }
        
        // Reset game state
        isSpinning = false;
        spinButton.disabled = false;
    }
    
    // Initialize game
    updateBalance();
    loadProfileData();
}); 