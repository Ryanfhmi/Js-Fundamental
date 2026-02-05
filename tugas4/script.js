// ===== QRIS BARCODE SCANNER =====
class BarcodeScanner {
    constructor() {
        this.video = document.getElementById('video');
        this.barcodeInput = document.getElementById('barcodeInput');
        this.startBtn = document.getElementById('startCamera');
        this.stopBtn = document.getElementById('stopCamera');
        this.submitBtn = document.getElementById('submitBarcode');
        this.statusMsg = document.getElementById('statusMessage');
        this.lastScanInfo = document.getElementById('lastScanInfo');
        this.stream = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.startBtn?.addEventListener('click', () => this.startCamera());
        this.stopBtn?.addEventListener('click', () => this.stopCamera());
        this.submitBtn?.addEventListener('click', () => this.handleBarcodeSubmit());
        this.barcodeInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleBarcodeSubmit();
        });
    }

    async startCamera() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            this.video.srcObject = this.stream;
            this.startBtn.style.display = 'none';
            this.stopBtn.style.display = 'inline-block';
            this.showStatus('Kamera dimulai. Arahkan ke barcode.', 'info');
            this.startScanning();
        } catch (err) {
            this.showStatus('Tidak dapat mengakses kamera: ' + err.message, 'error');
        }
    }

    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
        this.video.srcObject = null;
        this.startBtn.style.display = 'inline-block';
        this.stopBtn.style.display = 'none';
        this.showStatus('Kamera dihentikan', 'info');
    }

    startScanning() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const scanInterval = setInterval(() => {
            if (!this.stream) {
                clearInterval(scanInterval);
                return;
            }
            canvas.width = this.video.videoWidth;
            canvas.height = this.video.videoHeight;
            ctx.drawImage(this.video, 0, 0);
            // Simulasi deteksi barcode (dalam implementasi nyata gunakan library seperti jsQR)
        }, 100);
    }

    handleBarcodeSubmit() {
        const barcode = this.barcodeInput.value.trim();
        if (!barcode) {
            this.showStatus('Masukkan barcode/ID terlebih dahulu', 'error');
            return;
        }
        this.processBarcodeData(barcode);
    }

    processBarcodeData(barcode) {
        // Simpan barcode ke session storage
        sessionStorage.setItem('lastBarcode', barcode);
        
        // Update last scan info
        const timestamp = new Date().toLocaleString('id-ID');
        this.lastScanInfo.innerHTML = `
            <div class="result-item">
                <strong>📱 Barcode:</strong> ${barcode}
            </div>
            <div class="result-item">
                <strong>⏰ Waktu:</strong> ${timestamp}
            </div>
        `;
        this.lastScanInfo.classList.add('has-data');

        this.showStatus('Barcode terdeteksi! Arahkan ke halaman form...', 'success');
        setTimeout(() => {
            window.location.href = 'form.html';
        }, 1500);
    }

    showStatus(message, type = 'info') {
        this.statusMsg.textContent = message;
        this.statusMsg.className = 'status-message show ' + type;
        setTimeout(() => {
            this.statusMsg.classList.remove('show');
        }, 3000);
    }
}

// Initialize scanner saat DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    new BarcodeScanner();
});
