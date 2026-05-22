const db = require('../config/db');

exports.createRequest = (req, res) => {
  const {
    title,
    description,
    category,
    address,
    preferred_time
  } = req.body;

  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO service_requests
    (user_id, title, description, category, address, preferred_time, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      req.user.id,
      title,
      description,
      category,
      address,
      preferred_time,
      image
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: 'Request Created'
      });
    }
  );
};

exports.getRequests = (req, res) => {
  const sql = 'SELECT * FROM service_requests WHERE user_id=?';

  db.query(sql, [req.user.id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.updateStatus = (req, res) => {
  const { status } = req.body;

  const sql = 'UPDATE service_requests SET status=? WHERE id=?';

  db.query(sql, [status, req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: 'Status Updated'
    });
  });
};

exports.deleteRequest = (req, res) => {
  const sql = 'DELETE FROM service_requests WHERE id=?';

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: 'Request Deleted'
    });
  });
};