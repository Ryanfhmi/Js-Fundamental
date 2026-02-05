// ===== LIST & MANAGEMENT =====
class CustomerList {
    constructor() {
        this.listContainer = document.getElementById('customerList');
        this.searchInput = document.getElementById('searchInput');
        this.filterTipe = document.getElementById('filterTipe');
        this.filterBtn = document.getElementById('filterBtn');
        this.resetFilterBtn = document.getElementById('resetFilterBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.deleteAllBtn = document.getElementById('deleteAllBtn');
        this.filteredCustomers = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadAndDisplay();
    }

    setupEventListeners() {
        this.searchInput.addEventListener('input', () => this.applyFilter());
        this.filterTipe.addEventListener('change', () => this.applyFilter());
        this.filterBtn.addEventListener('click', () => this.applyFilter());
        this.resetFilterBtn.addEventListener('click', () => this.resetFilter());
        this.exportBtn.addEventListener('click', () => this.exportToCSV());
        this.deleteAllBtn.addEventListener('click', () => this.deleteAll());
    }

    loadAndDisplay() {
        const customers = JSON.parse(localStorage.getItem('customers')) || [];
        this.filteredCustomers = customers;
        this.displayCustomers(customers);
        this.updateStatistics(customers);
    }

    displayCustomers(customers) {
        if (customers.length === 0) {
            this.listContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #999;">
                    📭 Belum ada data pelanggan
                </div>
            `;
            return;
        }

        this.listContainer.innerHTML = customers.map(customer => `
            <div class="customer-card">
                <div class="customer-header">
                    <div>
                        <h3>${customer.nama}</h3>
                        <p class="customer-barcode">📱 ${customer.barcode}</p>
                    </div>
                    <div class="customer-badge">${this.getBadge(customer.tipePembeli)}</div>
                </div>

                <div class="customer-details">
                    <div class="detail-row">
                        <span class="label">✉️ Email:</span>
                        <span class="value">${customer.email}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">📞 Telepon:</span>
                        <span class="value">${customer.telepon}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">📍 Alamat:</span>
                        <span class="value">${customer.alamat}, ${customer.kota}, ${customer.provinsi}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">💰 Total Transaksi:</span>
                        <span class="value amount">Rp ${this.formatCurrency(customer.totalTransaksi)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">📅 Tanggal:</span>
                        <span class="value">${customer.tanggal}</span>
                    </div>
                    ${customer.catatan ? `
                    <div class="detail-row">
                        <span class="label">📝 Catatan:</span>
                        <span class="value">${customer.catatan}</span>
                    </div>
                    ` : ''}
                </div>

                <div class="customer-actions">
                    <button class="btn btn-secondary btn-small" onclick="customerList.editCustomer(${customer.id})">✏️ Edit</button>
                    <button class="btn btn-danger btn-small" onclick="customerList.deleteCustomer(${customer.id})">🗑 Hapus</button>
                </div>
            </div>
        `).join('');
    }

    applyFilter() {
        let customers = JSON.parse(localStorage.getItem('customers')) || [];
        const searchTerm = this.searchInput.value.toLowerCase();
        const tipeTerm = this.filterTipe.value;

        customers = customers.filter(c => {
            const matchSearch = !searchTerm || 
                c.nama.toLowerCase().includes(searchTerm) ||
                c.email.toLowerCase().includes(searchTerm) ||
                c.barcode.toLowerCase().includes(searchTerm);
            
            const matchTipe = !tipeTerm || c.tipePembeli === tipeTerm;

            return matchSearch && matchTipe;
        });

        this.filteredCustomers = customers;
        this.displayCustomers(customers);
        this.updateStatistics(customers);
    }

    resetFilter() {
        this.searchInput.value = '';
        this.filterTipe.value = '';
        this.loadAndDisplay();
    }

    updateStatistics(customers) {
        const total = customers.length;
        const totalRevenue = customers.reduce((sum, c) => sum + c.totalTransaksi, 0);
        const avgTransaction = total > 0 ? totalRevenue / total : 0;

        document.getElementById('totalCustomers').textContent = total;
        document.getElementById('totalRevenue').textContent = `Rp ${this.formatCurrency(totalRevenue)}`;
        document.getElementById('avgTransaction').textContent = `Rp ${this.formatCurrency(avgTransaction)}`;
    }

    editCustomer(id) {
        const customers = JSON.parse(localStorage.getItem('customers')) || [];
        const customer = customers.find(c => c.id === id);
        
        if (customer) {
            // Simpan customer yang akan diedit
            sessionStorage.setItem('editingCustomer', JSON.stringify(customer));
            window.location.href = 'form.html';
        }
    }

    deleteCustomer(id) {
        if (confirm('⚠️ Yakin ingin menghapus data ini?')) {
            let customers = JSON.parse(localStorage.getItem('customers')) || [];
            customers = customers.filter(c => c.id !== id);
            localStorage.setItem('customers', JSON.stringify(customers));
            this.loadAndDisplay();
            alert('✅ Data berhasil dihapus');
        }
    }

    deleteAll() {
        if (confirm('⚠️ Yakin ingin menghapus SEMUA data? Tindakan ini tidak dapat dibatalkan!')) {
            localStorage.removeItem('customers');
            this.loadAndDisplay();
            alert('✅ Semua data berhasil dihapus');
        }
    }

    exportToCSV() {
        const customers = this.filteredCustomers;
        if (customers.length === 0) {
            alert('Tidak ada data untuk diekspor');
            return;
        }

        let csv = 'Barcode,Nama,Email,Telepon,Alamat,Kota,Provinsi,Tipe Pembeli,Total Transaksi,Tanggal,Catatan\n';
        
        customers.forEach(c => {
            csv += `"${c.barcode}","${c.nama}","${c.email}","${c.telepon}","${c.alamat}","${c.kota}","${c.provinsi}","${c.tipePembeli}","${c.totalTransaksi}","${c.tanggal}","${c.catatan || ''}"\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `pelanggan_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert('✅ Data berhasil diekspor');
    }

    formatCurrency(num) {
        return new Intl.NumberFormat('id-ID').format(num);
    }

    getBadge(tipe) {
        const badges = {
            'individu': '👤 Individu',
            'bisnis': '🏢 Bisnis',
            'korporat': '🏛️ Korporat',
            'reseller': '🔄 Reseller'
        };
        return badges[tipe] || tipe;
    }
}

// Global instance untuk diakses dari HTML
let customerList;

document.addEventListener('DOMContentLoaded', () => {
    customerList = new CustomerList();
});
