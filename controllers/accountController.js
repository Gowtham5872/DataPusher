const db = require('../models/database');
const { v4: uuidv4 } = require('uuid');
const generateToken = require('../utils/generateToken');

exports.createAccount = (req, res) => {
  const { email, name, website } = req.body;
  const id = uuidv4();
  const secret_token = generateToken();

  db.run(
    `INSERT INTO accounts (id, email, name, website, secret_token) VALUES (?, ?, ?, ?, ?)`,
    [id, email, name, website || null, secret_token],
    err => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id, email, name, website, secret_token });
    }
  );
};

exports.getAccounts = (req, res) => {
  db.all(`SELECT * FROM accounts`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.deleteAccount = (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM accounts WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Account and its destinations deleted' });
  });
};