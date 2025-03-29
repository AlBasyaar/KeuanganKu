// Mengambil daftar transaksi dari API
async function ambilTransaksi() {
  try {
    const response = await fetch('/api/transaksi');
    if (response.ok) {
      const data = await response.json();
      daftarTransaksi      = data;
      updateTabel(daftarTransaksi);
      updateSaldo();
      return;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Menambahkan transaksi baru ke dalam daftar transaksi
async function tambahTransaksi(transaksi) {
  try {
    const response = await fetch('/api/transaksi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaksi)
    });
    if (response.ok) {
      ambilTransaksi();
      return;
    }
  } catch (error) {
    console.error(error);
  }
  Swal.fire('Gagal menambah transaksi.', '', 'error');
}

// Menghapus transaksi dari daftar transaksi
async function hapusTransaksi(id) {
  // Menggunakan SweetAlert2 untuk konfirmasi hapus
  Swal.fire({
    title: 'Apakah Anda yakin?',
    text: "Transaksi ini akan dihapus!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/transaksi/${id}`, { method: 'DELETE' });
        if (response.ok) {
          ambilTransaksi(); // Update daftar setelah dihapus
          Swal.fire('Transaksi dihapus!', '', 'success');
          return;
        }
      } catch (error) {
        console.error(error);
        Swal.fire('Gagal menghapus transaksi.', '', 'error');
      }
    }
  });
}

// Mengedit transaksi
async function editTransaksi(id) {
  const transaksi = daftarTransaksi.find(t => t.id === id);
  if (!transaksi) return;

  const { value: formValues } = await Swal.fire({
    title: 'Edit Transaksi',
    html: `
      <select id="edit-jenis" class="swal2-input">
        <option value="pemasukan" ${transaksi.jenis === "pemasukan" ? "selected" : ""}>Pemasukan</option>
        <option value="pengeluaran" ${transaksi.jenis === "pengeluaran" ? "selected" : ""}>Pengeluaran</option>
      </select>
      <input id="edit-keterangan" class="swal2-input" placeholder="Keterangan" value="${transaksi.keterangan}">
      <input id="edit-jumlah" class="swal2-input" type="number" placeholder="Jumlah" value="${transaksi.jumlah}">
      <input id="edit-tanggal" class="swal2-input" type="date" value="${transaksi.tanggal}">
    `,
    focusConfirm: false,
    preConfirm: () => {
      const jenis = document.getElementById('edit-jenis').value;
      const keterangan = document.getElementById('edit-keterangan').value;
      const jumlah = document.getElementById('edit-jumlah').value;
      const tanggal = document.getElementById('edit-tanggal').value;

      // Validasi input
      if (!jenis || !keterangan || !jumlah || !tanggal) {
        Swal.showValidationMessage('Semua field harus diisi');
        return false;
      }

      return { jenis, keterangan, jumlah, tanggal };
    }
  });

  if (formValues) {
    try {
      const response = await fetch(`/api/transaksi/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });

      const result = await response.json();

      if (response.ok) {
        await ambilTransaksi();
        Swal.fire('Berhasil!', result.message || 'Transaksi berhasil diperbarui.', 'success');
      } else {
        Swal.fire('Gagal', result.error || 'Gagal mengedit transaksi', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Terjadi kesalahan saat mengedit transaksi', 'error');
    }
  }
}