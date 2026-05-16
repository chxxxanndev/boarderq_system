import mysql from 'mysql2/promise';

const isLocal = process.env.NODE_ENV !== 'production';

const pool = mysql.createPool({
  host: isLocal ? '127.0.0.1' : process.env.MYSQLHOST,
  user: isLocal ? 'root' : process.env.MYSQLUSER,
  password: isLocal ? '' : process.env.MYSQLPASSWORD,
  database: isLocal ? 'boarder_q' : process.env.MYSQLDATABASE,
  port: isLocal ? 3306 : parseInt(process.env.MYSQLPORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  ssl: isLocal
    ? undefined
    : { rejectUnauthorized: false }
});

export default pool;