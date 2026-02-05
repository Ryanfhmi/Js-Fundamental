// ===== FORM MANAGEMENT =====
class CustomerForm {
    constructor() {
        this.form = document.getElementById('customerForm');
        this.barcodeInput = document.getElementById('barcode');
        this.statusMsg = document.getElementById('formStatus');
        this.init();
    }

    init() {
        // Load barcode dari session
        const lastBarcode = sessionStorage.getItem('lastBarcode');
        if (lastBarcode) {
            this.barcodeInput.value = lastBarcode;
        }

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupSelectStyles();
    }

    handleSubmit(e) {
        e.preventDefault();

        // Validasi form
        if (!this.form.checkValidity()) {
            this.showStatus('Mohon lengkapi semua field yang diperlukan', 'error');
            return;
        }

        // Ambil data form
        const formData = new FormData(this.form);
        const customer = {
            id: Date.now(),
            barcode: formData.get('barcode'),
            nama: formData.get('nama'),
            email: formData.get('email'),
            telepon: formData.get('telepon'),
            alamat: formData.get('alamat'),
            kota: formData.get('kota'),
            provinsi: formData.get('provinsi'),
            tipePembeli: formData.get('tipePembeli'),
            totalTransaksi: parseFloat(formData.get('totalTransaksi')),
            catatan: formData.get('catatan'),
            tanggal: new Date().toLocaleString('id-ID')
        };

        // Simpan ke localStorage
        this.saveCustomer(customer);
        this.showStatus('✅ Data pelanggan berhasil disimpan!', 'success');

        // Clear form dan redirect
        this.form.reset();
        this.barcodeInput.value = '';
        sessionStorage.removeItem('lastBarcode');

        setTimeout(() => {
            window.location.href = 'list.html';
        }, 1500);
    }

    saveCustomer(customer) {
        let customers = JSON.parse(localStorage.getItem('customers')) || [];
        
        // Cek apakah pelanggan sudah ada (berdasarkan barcode)
        const index = customers.findIndex(c => c.barcode === customer.barcode);
        
        if (index >= 0) {
            // Update data yang sudah ada
            customers[index] = customer;
        } else {
            // Tambah data baru
            customers.push(customer);
        }

        localStorage.setItem('customers', JSON.stringify(customers));
    }

    showStatus(message, type = 'info') {
        this.statusMsg.textContent = message;
        this.statusMsg.className = 'status-message show ' + type;
        setTimeout(() => {
            this.statusMsg.classList.remove('show');
        }, 3000);
    }

    setupSelectStyles() {
        const select = document.getElementById('tipePembeli');
        select.addEventListener('change', function() {
            this.style.borderColor = this.value ? '#1e40af' : '#e5e7eb';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CustomerForm();
});
