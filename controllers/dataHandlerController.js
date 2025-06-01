const db = require('../models/database');
const axios = require('axios');

exports.incomingData = (req, res) => {
  const token = req.headers['cl-x-token'];
  const data = req.body;

  if (!token) return res.json({ message: 'Un Authenticate' });

  db.get(`SELECT * FROM accounts WHERE secret_token = ?`, [token], (err, account) => {
    if (err || !account) return res.status(401).json({ message: 'Invalid Token' });

    db.all(
      `SELECT * FROM destinations WHERE account_id = ?`,
      [account.id],
      async (err, destinations) => {
        if (err) return res.status(500).json({ message: 'Error fetching destinations' });

        for (let dest of destinations) {
          try {
            const headers = JSON.parse(dest.headers);
            const method = dest.method.toUpperCase();

            if (method === 'GET') {
              await axios.get(dest.url, {
                headers,
                params: data,
              });
            } else {
              await axios({
                method,
                url: dest.url,
                headers,
                data,
              });
            }
          } catch (e) {
            console.error('Failed to push to destination:', dest.url, e.message);
          }
        }

        res.json({ message: 'Data forwarded to destinations' });
      }
    );
  });
};