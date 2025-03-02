import sqlite from "better-sqlite3";

function open() {
  return new sqlite("database.db", { verbose: console.log });
}

function close(db) {
  db.close();
}

// If the database file does not exist, it will be created.
function init() {
  const db = open();

  db.exec(`
        CREATE TABLE IF NOT EXISTS files (
        filename TEXT PRIMARY KEY,
        creator TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

  db.exec(`
        CREATE TABLE IF NOT EXISTS evaluations (
        id integer,
        filename TEXT,
        findings TEXT,
        impression_a TEXT,
        impression_b TEXT,
        ethnicity TEXT,
        gender TEXT,
        reason_for_exam TEXT,
        age INTEGER,
        accuracyRating INTEGER default 0,
        qualityRating INTEGER default 0,
        comment TEXT default ''
        )
    `);

  close(db);
}

async function insertFile(filename, creator, rows) {
  const db = open();

  const insertFile = db.prepare(
    "INSERT INTO files (filename, creator) VALUES (?, ?)"
  );

  const insertEvaluation = db.prepare(
    "INSERT INTO evaluations (id, filename, findings, impression_a, impression_b, ethnicity, gender, reason_for_exam, age) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );

  const insertEvals = db.transaction((rows) => {
    let index = 0;
    for (const row of rows)
      insertEvaluation.run(
        index++,
        filename,
        row["Findings"],
        row["Impression A"],
        row["Impression B"],
        row["Ethnicity"],
        row["Gender"],
        row["Reason For Exam"],
        row["Age"]
      );
  });

  const insertAll = db.transaction((rows) => {
    insertFile.run(filename, creator);
    insertEvals(rows); // nested transaction
  });

  insertAll(rows);

  close(db);
}

function updateEvaluation(
  filename,
  id,
  accuracyRating,
  qualityRating,
  comment
) {
  const db = open();
  const update = db.prepare(
    "UPDATE evaluations SET accuracyRating = ?, qualityRating = ?, comment = ? WHERE filename = ? and id = ?"
  );
  update.run(accuracyRating, qualityRating, comment, filename, id);
  close(db);
}

function getFile(filename) {
  const db = open();
  const row = db
    .prepare("SELECT * FROM files WHERE filename = ?")
    .get(filename);
  close(db);
  return row;
}

function getEvaluations(filename) {
  const db = open();
  const rows = db
    .prepare("SELECT * FROM evaluations WHERE filename = ?")
    .all(filename);
  close(db);
  return rows;
}

export default {
  init,
  insertFile,
  getFile,
  updateEvaluation,
  getEvaluations,
};
