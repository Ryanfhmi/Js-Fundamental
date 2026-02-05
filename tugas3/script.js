// Array untuk menyimpan data siswa
let dataSiswa = [];

// Fungsi untuk menghitung rata-rata
function hitungRataRata(n1, n2, n3) {
    return Math.round(((n1 + n2 + n3) / 3) * 100) / 100;
}

// Fungsi untuk menentukan predikat
function tentakanPredikat(nilaiAkhir) {
    if (nilaiAkhir >= 85) return 'A';
    if (nilaiAkhir >= 75) return 'B';
    if (nilaiAkhir >= 65) return 'C';
    return 'D';
}

// Fungsi untuk menentukan status (lulus/tidak lulus)
function tentakanStatus(nilaiAkhir) {
    return nilaiAkhir >= 70 ? 'Lulus' : 'Tidak Lulus';
}

// Fungsi untuk menambah siswa
function tambahSiswa() {
    const nama = document.getElementById('nama').value.trim();
    const nilai1 = parseFloat(document.getElementById('nilai1').value);
    const nilai2 = parseFloat(document.getElementById('nilai2').value);
    const nilai3 = parseFloat(document.getElementById('nilai3').value);

    // Validasi input
    if (!nama) {
        alert('⚠️ Nama siswa tidak boleh kosong!');
        return;
    }

    if (!nilai1 || !nilai2 || !nilai3) {
        alert('⚠️ Semua nilai harus diisi!');
        return;
    }

    if (nilai1 < 0 || nilai1 > 100 || nilai2 < 0 || nilai2 > 100 || nilai3 < 0 || nilai3 > 100) {
        alert('⚠️ Nilai harus antara 0-100!');
        return;
    }

    // Hitung nilai akhir
    const nilaiAkhir = hitungRataRata(nilai1, nilai2, nilai3);
    const predikat = tentakanPredikat(nilaiAkhir);
    const status = tentakanStatus(nilaiAkhir);

    // Tambah ke array
    dataSiswa.push({
        nama: nama,
        nilai1: nilai1,
        nilai2: nilai2,
        nilai3: nilai3,
        nilaiAkhir: nilaiAkhir,
        predikat: predikat,
        status: status
    });

    // Reset form
    document.getElementById('nama').value = '';
    document.getElementById('nilai1').value = '';
    document.getElementById('nilai2').value = '';
    document.getElementById('nilai3').value = '';
    document.getElementById('nama').focus();

    // Update tampilan
    tampilkanTabel();
    hitungStatistik();
}

// Fungsi untuk menampilkan tabel
function tampilkanTabel() {
    const tbody = document.getElementById('dataSiswa');

    if (dataSiswa.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; color: #999;">Belum ada data siswa</td></tr>';
        return;
    }

    tbody.innerHTML = dataSiswa.map((siswa, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${siswa.nama}</td>
            <td>${siswa.nilai1}</td>
            <td>${siswa.nilai2}</td>
            <td>${siswa.nilai3}</td>
            <td><strong>${siswa.nilaiAkhir}</strong></td>
            <td><span class="predikat ${siswa.predikat.toLowerCase()}">${siswa.predikat}</span></td>
            <td><span class="status ${siswa.status === 'Lulus' ? 'lulus' : 'tidakLulus'}">${siswa.status}</span></td>
            <td><button class="btn-hapus" onclick="hapusSiswa(${index})">Hapus</button></td>
        </tr>
    `).join('');
}

// Fungsi untuk menghapus siswa
function hapusSiswa(index) {
    if (confirm(`Hapus data ${dataSiswa[index].nama}?`)) {
        dataSiswa.splice(index, 1);
        tampilkanTabel();
        hitungStatistik();
    }
}

// Fungsi untuk menghitung statistik
function hitungStatistik() {
    const totalSiswa = dataSiswa.length;

    // Hitung rata-rata kelas
    const rataRataKelas = totalSiswa > 0 
        ? Math.round((dataSiswa.reduce((sum, siswa) => sum + siswa.nilaiAkhir, 0) / totalSiswa) * 100) / 100 
        : 0;

    // Hitung lulus dan tidak lulus
    const jumlahLulus = dataSiswa.filter(siswa => siswa.status === 'Lulus').length;
    const jumlahTidakLulus = totalSiswa - jumlahLulus;

    // Hitung per predikat
    const countA = dataSiswa.filter(siswa => siswa.predikat === 'A').length;
    const countB = dataSiswa.filter(siswa => siswa.predikat === 'B').length;
    const countC = dataSiswa.filter(siswa => siswa.predikat === 'C').length;
    const countD = dataSiswa.filter(siswa => siswa.predikat === 'D').length;

    // Update DOM
    document.getElementById('totalSiswa').textContent = totalSiswa;
    document.getElementById('rataRataKelas').textContent = rataRataKelas.toFixed(2);
    document.getElementById('jumlahLulus').textContent = jumlahLulus;
    document.getElementById('jumlahTidakLulus').textContent = jumlahTidakLulus;
    document.getElementById('countA').textContent = `${countA} siswa`;
    document.getElementById('countB').textContent = `${countB} siswa`;
    document.getElementById('countC').textContent = `${countC} siswa`;
    document.getElementById('countD').textContent = `${countD} siswa`;
}

// Fungsi untuk reset semua data
function resetData() {
    if (confirm('Yakin ingin menghapus semua data siswa?')) {
        dataSiswa = [];
        tampilkanTabel();
        hitungStatistik();
    }
}

// Shortcut: Enter untuk submit
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        tambahSiswa();
    }
});
