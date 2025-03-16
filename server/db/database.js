import sqlite from "better-sqlite3";
import env from "../env.js";

function open() {
  const options = {};
  if (env.isDev()) {
    options.verbose = console.log;
  }
  return new sqlite("database.db", options);
}

function close(db) {
  db.close();
}

// If the database file does not exist, it will be created.
function init() {
  const db = open();

  db.exec(`
        CREATE TABLE IF NOT EXISTS files (
        file_id TEXT PRIMARY KEY,
        file_name TEXT,
        creator TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
  
  // row_id is row index in Excel file
  db.exec(`
        CREATE TABLE IF NOT EXISTS evaluations (
        file_id TEXT,
        row_id integer,
        findings TEXT,
        impression_a TEXT,
        impression_b TEXT,
        ethnicity TEXT,
        gender TEXT,
        reason_for_exam TEXT,
        age INTEGER,
        accuracy_rating INTEGER default 0,
        quality_rating INTEGER default 0,
        comment TEXT default '',
        PRIMARY KEY (file_id, row_id)
        )
    `);

  close(db);
}

async function insertFile(fileId, fileName, creator, rows) {
  const db = open();

  const insertFile = db.prepare(
    "INSERT INTO files (file_id, file_name, creator) VALUES (?, ?, ?)"
  );

  const insertEvaluation = db.prepare(
    "INSERT INTO evaluations (file_id, row_id, findings, impression_a, impression_b, ethnicity, gender, reason_for_exam, age) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );

  const insertEvals = db.transaction((rows) => {
    let index = 0;
    for (const row of rows)
      insertEvaluation.run(
        fileId,
        index++,
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
    insertFile.run(fileId, fileName, creator);
    insertEvals(rows); // nested transaction
  });

  insertAll(rows);

  close(db);
}

function updateEvaluation(
  fileId,
  rowId,
  accuracyRating,
  qualityRating,
  comment
) {
  const db = open();
  const update = db.prepare(
    "UPDATE evaluations SET accuracy_rating = ?, quality_rating = ?, comment = ? WHERE file_id = ? and row_id = ?"
  );
  update.run(accuracyRating, qualityRating, comment, fileId, rowId);
  close(db);
}

function getFile(fileId) {
  const db = open();
  const row = db
    .prepare("SELECT * FROM files WHERE file_id = ?")
    .get(fileId);
  close(db);
  return row;
}

function getEvaluations(fileId) {
  const db = open();
  const rows = db
    .prepare("SELECT * FROM evaluations WHERE file_id = ?")
    .all(fileId);
  close(db);
  return rows;
}

function getStastics() {
  const db = open();
  // accuracy_rating == 0 means not evaluated after upload
  const accuracyRows = db
    .prepare("SELECT accuracy_rating, count(*) FROM evaluations WHERE accuracy_rating > 0 GROUP BY accuracy_rating")
    .all();

  const qualityRows = db
    .prepare("SELECT quality_rating, count(*) FROM evaluations WHERE quality_rating > 0 GROUP BY quality_rating")
    .all();

  close(db);

  return {
    accuracy: accuracyRows,
    quality: qualityRows,
  };
}

export default {
  init,
  insertFile,
  getFile,
  updateEvaluation,
  getEvaluations,
  getStastics,
};
