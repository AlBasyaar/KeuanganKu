const db = require("./db");

// handlers.js
exports.daftarTransaksi = async (req, res) => {
  try {
    const [barisData] = await db.query('SELECT * FROM transaksi ORDER BY tanggal DESC');
    res.json(barisData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kesalahan server internal' });
  }
}

exports.tambahTransaksi = async (req, res) => {
  const { jenis, tanggal, jumlah, keterangan } = req.body;
  try {
    await db.query('INSERT INTO transaksi (jenis, tanggal, jumlah, keterangan) VALUES (?, ?, ?, ?)', [jenis, tanggal, jumlah, keterangan]);
    res.status(201).json({ message: 'Transaksi berhasil ditambahkan' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kesalahan server internal' });
  }
}

exports.hapusTransaksi = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM transaksi WHERE id = ?', [id]);
    res.json({ message: 'Transaksi berhasil dihapus' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kesalahan server internal' });
  }
};

exports.editTransaksi = async (req, res) => {
  const { id } = req.params;
  const { jenis, tanggal, jumlah, keterangan } = req.body;
  
  // Validasi input
  if (!jenis || !tanggal || !jumlah || !keterangan) {
    return res.status(400).json({ error: 'Semua field harus diisi' });
  }

  try {
    // Konversi jumlah ke numerik
    const jumlahNumeric = Number(jumlah);
    
    await db.query('UPDATE transaksi SET jenis = ?, tanggal = ?, jumlah = ?, keterangan = ? WHERE id = ?', 
      [jenis, tanggal, jumlahNumeric, keterangan, id]);
    
    res.json({ message: 'Transaksi berhasil diperbarui' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kesalahan server internal', details: err.message });
  }
}; 