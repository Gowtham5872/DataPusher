const db = require('../models/database');
const { v4: uuidv4 } = require('uuid');

exports.createDestination = (req, res) => {
  const { account_id, url, method, headers } = req.body;
  const id = uuidv4();

  db.run(
    `INSERT INTO destinations (id, account_id, url, method, headers) VALUES (?, ?, ?, ?, ?)`,
    [id, account_id, url, method, JSON.stringify(headers)],
    err => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id, account_id, url, method, headers });
    }
  );
};

exports.getDestinationsByAccount = (req, res) => {
  const { account_id } = req.params;
  db.all(
    `SELECT * FROM destinations WHERE account_id = ?`,
    [account_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};

exports.deleteDestination = (req, res) => {
  db.run(`DELETE FROM destinations WHERE id = ?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Destination deleted' });
  });
};