// Mendapatkan referensi elemen HTML
const formTransaksi = document.querySelector("#form-transaksi");
const inputJenis = document.querySelector("#jenis");
const inputKeterangan = document.querySelector("#keterangan");
const inputJumlah = document.querySelector("#jumlah");
const inputTanggal = document.querySelector("#tanggal");
const bodiTabel = document.querySelector("#daftar-transaksi"); // Changed selector
const elemenSaldo = document.querySelector("#saldo");
const elementotalPemasukan = document.querySelector("#total-pemasukan");
const elementotalPengeluaran = document.querySelector("#total-pengeluaran");
const inputCari = document.querySelector("#cari");

// Mendefinisikan variabel global
let daftarTransaksi = [];
const opsiTanggal = { year: "numeric", month: "long", day: "numeric" };

function ubahTanggal(tanggal) {
  return new Date(tanggal).toLocaleDateString("id-ID", opsiTanggal);
}

// Menampilkan daftar transaksi yang telah difilter pada tabel
function updateTabel(daftarTransaksi) {
  // Add a null check to prevent error
  if (!bodiTabel) {
    console.error('Tabel body element not found');
    return;
  }

  bodiTabel.innerHTML = "";
  for (let i = 0; i < daftarTransaksi.length; i++) {
    const transaksi = daftarTransaksi[i];
    const baris = document.createElement("tr");
    baris.innerHTML = `
    <td>${transaksi.jenis === "pemasukan" ? "Pemasukan" : "Pengeluaran"}</td>
    <td>${transaksi.keterangan}</td>
    <td>Rp ${parseFloat(transaksi.jumlah).toLocaleString()}</td>
    <td>${ubahTanggal(transaksi.tanggal)}</td>
    <td style="display: flex; gap: 0.5rem; justify-content: center;">
    <button style="background-color:rgb(238, 76, 76); color: white; padding: 0.2rem 0.5rem; border-radius: 0.375rem; width: 4rem; height: 2rem; transition: background-color 0.3s;" 
    onmouseover="this.style.backgroundColor='rgb(235, 37, 37)'" 
    onmouseout="this.style.backgroundColor='rgb(238, 76, 76)'" 
    onclick="hapusTransaksi(${transaksi.id})">
    Hapus
    </button> 
  <button style="background-color:rgb(19, 222, 240); color: white; padding: 0.2rem 0.5rem; border-radius: 0.375rem; width: 4rem; height: 2rem; transition: background-color 0.3s;" 
    onmouseover="this.style.backgroundColor='rgb(40, 150, 160);'" 
    onmouseout="this.style.backgroundColor='rgb(41, 144, 153);'" 
    onclick="editTransaksi(${transaksi.id})">
    Edit
  </button>
</td>

`;

    bodiTabel.appendChild(baris);
  }
}

// Mengupdate tampilan saldo dan total pemasukan/pengeluaran
function updateSaldo() {
  let totalPemasukan = 0;
  let totalPengeluaran = 0;
  for (let i = 0; i < daftarTransaksi.length; i++) {
    const transaksi = daftarTransaksi[i];
    const jumlah = parseFloat(transaksi.jumlah);
    if (transaksi.jenis === "pemasukan") {
      totalPemasukan += jumlah;
    } else {
      totalPengeluaran += jumlah;
    }
  }
  const saldo = totalPemasukan - totalPengeluaran;
  elemenSaldo.innerHTML = `Rp ${saldo.toLocaleString()}`;
  elementotalPemasukan.innerHTML = `Rp ${totalPemasukan.toLocaleString()}`;
  elementotalPengeluaran.innerHTML = `Rp ${totalPengeluaran.toLocaleString()}`;
}