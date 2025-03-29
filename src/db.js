const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'pengelolaan_keuangan'
});

pool.on('connection', conn => {
    console.log('Database is connected')
  });
  
exports.query = async (sql, values = []) => {
    try {
       const koneksi = await pool.getConnection();
       const barisdata = await koneksi.query(sql, values);
       koneksi.release()
       return barisdata
    } catch (error) {
       throw error
    
    }
}