# QRIS Pelanggan - Sistem Scan Barcode

Website untuk pengambilan data pembeli/pelanggan dengan fitur scan barcode dan manajemen data dengan tema QRIS.

## 🌟 Fitur Utama

1. **Scan Barcode** 📱
   - Scan barcode/QR code menggunakan kamera perangkat
   - Input manual jika scanner tidak tersedia
   - Otomatis redirect ke form input data

2. **Form Input Data Pelanggan** 📋
   - Data lengkap: nama, email, telepon, alamat, kota, provinsi
   - Tipe pembeli: Individu, Bisnis, Korporat, Reseller
   - Total transaksi dan catatan tambahan
   - Data tersimpan di localStorage

3. **Daftar Data Pelanggan** 📊
   - Tampilan kartu untuk setiap pelanggan
   - Statistik: total pelanggan, revenue, rata-rata transaksi
   - Search dan filter berdasarkan nama, email, barcode, atau tipe pembeli
   - Export data ke CSV
   - Edit dan hapus data

4. **Tema QRIS** 🎨
   - Warna biru (#1e40af) dan merah (#dc2626)
   - Design modern dan responsif
   - Mobile-friendly

## 📂 Struktur File

```
tugas4/
├── index.html         # Halaman scan barcode
├── form.html          # Form input data pelanggan
├── list.html          # Daftar data pelanggan
├── style.css          # Styling global (tema QRIS)
├── script.js          # Logika scanner barcode
├── form-script.js     # Logika form input
├── list-script.js     # Logika list dan manajemen data
└── README.md          # File dokumentasi ini
```

## 🚀 Cara Menggunakan

### 1. Halaman Scan (index.html)
- Klik tombol "🎥 Mulai Kamera" untuk mengakses kamera perangkat
- Arahkan kamera ke barcode
- Atau masukkan barcode secara manual di input "Masukkan barcode/ID"
- Klik "Lanjut" untuk melanjutkan ke form

### 2. Halaman Form (form.html)
- Isi semua data pelanggan yang diperlukan (bertanda *)
- Barcode sudah terisi otomatis dari hasil scan
- Klik "💾 Simpan Data" untuk menyimpan
- Data akan disimpan di localStorage
- Otomatis redirect ke halaman list data

### 3. Halaman List (list.html)
- Lihat semua data pelanggan yang sudah tersimpan
- Statistik muncul di bagian atas (total pelanggan, revenue, rata-rata)
- **Pencarian**: Cari berdasarkan nama, email, atau barcode
- **Filter**: Filter berdasarkan tipe pembeli
- **Edit**: Klik tombol ✏️ untuk mengedit data
- **Hapus**: Klik tombol 🗑 untuk menghapus satu data
- **Export CSV**: Klik tombol 📥 untuk download data dalam format CSV
- **Hapus Semua**: Klik tombol 🗑 untuk menghapus semua data (hati-hati!)

## 💾 Penyimpanan Data

Data disimpan secara lokal menggunakan **localStorage** browser:
- **Customers**: Array object berisi semua data pelanggan
- **Last Barcode**: ID barcode terakhir yang di-scan

**Catatan**: Data akan hilang jika Anda menghapus cache browser atau local storage.

## 📱 Responsif

Website ini responsif dan bekerja optimal di:
- Desktop (> 1024px)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🎨 Warna & Tema QRIS

- **Primary Blue**: #1e40af
- **Accent Red**: #dc2626
- **White**: #ffffff
- **Gray**: #f3f4f6

## ⚠️ Catatan Penting

1. **Browser Compatibility**
   - Requires modern browser (Chrome, Firefox, Safari, Edge)
   - Camera access needs HTTPS atau localhost untuk keamanan

2. **Data Privacy**
   - Data hanya tersimpan di device (localStorage)
   - Tidak ada server/cloud storage

3. **Storage Limit**
   - localStorage biasanya 5-10MB per domain
   - Jika data terlalu besar, gunakan fitur export CSV

4. **Barcode Scanner**
   - Implementasi saat ini: input manual
   - Untuk scanning otomatis, tambahkan library seperti:
     - [jsQR](https://github.com/cozmo/jsQR)
     - [QuaggaJS](https://github.com/serratus/quaggaJS)
     - [html5-qrcode](https://github.com/mebjas/html5-qrcode)

## 🔧 Teknologi Yang Digunakan

- **HTML5**: Struktur halaman
- **CSS3**: Styling dan animasi (Grid, Flexbox)
- **JavaScript ES6+**: Logika aplikasi
- **localStorage API**: Penyimpanan data lokal
- **getUserMedia API**: Akses kamera

## 📝 Contoh Data

Sistem ini sudah siap untuk input data seperti:
```
Barcode: 609c47890ab1
Nama: Budi Santoso
Email: budi@email.com
Telepon: 0812345678
Alamat: Jln. Merdeka No.10
Kota: Jakarta
Provinsi: Jakarta
Tipe Pembeli: Bisnis
Total Transaksi: 150000
```

## 🎯 Pengembangan Lebih Lanjut

Fitur yang bisa ditambahkan:
- [ ] Integrasi database backend (Firebase, MongoDB)
- [ ] Autentikasi user
- [ ] Import CSV
- [ ] Grafik analitik data
- [ ] Notifikasi real-time
- [ ] QR code generator
- [ ] Print laporan
- [ ] Dark mode

## 📞 Support

Untuk pertanyaan atau laporan bug, hubungi developer.

---

**Created**: February 2026 | **Version**: 1.0
