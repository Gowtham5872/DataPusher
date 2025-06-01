const db = require('../models/database');
const axios = require('axios');

exports.incomingData = (req, res) => {
  const token = req.headers['cl-x-token'];
  const data = req.body;

  if (!token) return res.status(401).json({ message: 'Un Authenticate' });

  // 1. Find the account by secret token
  db.get('SELECT * FROM accounts WHERE secret_token = ?', [token], (err, account) => {
    if (err || !account) {
      return res.status(401).json({ message: 'Invalid Token' });
    }

    // 2. Get all destinations for the account
    db.all('SELECT * FROM destinations WHERE account_id = ?', [account.id], async (err, destinations) => {
      if (err) return res.status(500).json({ message: 'Error fetching destinations' });

      for (let dest of destinations) {
        try {
          const headers = JSON.parse(dest.headers);
          const method = dest.method.toUpperCase();

          console.log('\n👉 Forwarding to:', dest.url);
          console.log('📦 Data:', JSON.stringify(data, null, 2));
          console.log('📤 Method:', method);
          console.log('🧾 Headers:', headers);

          if (method === 'GET') {
            await axios.get(dest.url, {
              headers,
              params: data
            });
          } else {
            await axios({
              method,
              url: dest.url,
              headers: {
                ...headers,
                'Content-Type': 'application/json'  // ✅ Force this
              },
              data
            });
          }
        } catch (e) {
          console.error('❌ Failed to push to destination:', dest.url, '\n🛑 Error:', e.message);
        }
      }

      res.json({ message: 'Data forwarded to destinations' });
    });
  });
};