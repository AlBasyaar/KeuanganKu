document.addEventListener('DOMContentLoaded', ambilTransaksi);

// Menambahkan event listener pada form
formTransaksi.addEventListener('submit', function (event) {
  event.preventDefault();
  const jenis = inputJenis.value;
  const keterangan = inputKeterangan.value.trim();
  const jumlah = parseFloat(inputJumlah.value);
  const tanggal = inputTanggal.value;
  if (!keterangan || !jumlah || !tanggal) {
    alert('Silakan isi semua kolom.');
    return;
  }
  tambahTransaksi({ jenis, keterangan, jumlah, tanggal });
  formTransaksi.reset();
});

// Menambahkan event listener pada kolom pencarian
inputCari.addEventListener('input', function (event) {
  const keyword = event.target.value.trim().replace(/\s+/g, "|");
  const polaKeyword = new RegExp('(' + keyword + ')', 'i');
  const filteredTransactions = daftarTransaksi.filter(transaksi => {
    const gabunganData = transaksi.jenis + " " + transaksi.keterangan + " " + ubahTanggal(transaksi.tanggal)
    return polaKeyword.test(gabunganData)
  });
  updateTabel(filteredTransactions);
});