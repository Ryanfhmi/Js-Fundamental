// Initialize counter value
let counter = 0;

// Get elements
const counterValue = document.getElementById('counterValue');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');

// Function to update display
function updateDisplay() {
    counterValue.textContent = counter;
}

// Function to create sparkles
function createSparkles(button, isPlus) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const sparkleCount = 16;
    const sparkleChars = ['✨', '⭐', '✦', '★', '✧', '💫', '⚡'];
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = isPlus ? 'sparkle sparkle-plus' : 'sparkle sparkle-minus';
        sparkle.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
        
        // Random angle for spread
        const angle = (i / sparkleCount) * Math.PI * 2;
        const distance = 60 + Math.random() * 40;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        sparkle.style.left = centerX + 'px';
        sparkle.style.top = centerY + 'px';
        sparkle.style.setProperty('--tx', tx + 'px');
        sparkle.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(sparkle);
        
        // Remove element after animation
        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
}

// Increment function
function increment() {
    counter++;
    updateDisplay();
    createSparkles(incrementBtn, true);
}

// Decrement function
function decrement() {
    counter--;
    updateDisplay();
    createSparkles(decrementBtn, false);
}

// Reset function
function reset() {
    counter = 0;
    updateDisplay();
}

// Event listeners
incrementBtn.addEventListener('click', increment);
decrementBtn.addEventListener('click', decrement);
resetBtn.addEventListener('click', reset);

// Initial display
updateDisplay();
