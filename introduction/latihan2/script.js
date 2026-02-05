const eventForm = document.getElementById('eventForm');
const resultContainer = document.getElementById('resultContainer');
const resultContent = document.getElementById('resultContent');

eventForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Ambil data dari form
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const umur = document.getElementById('umur').value;
    const noTelepon = document.getElementById('noTelepon').value;
    const asal = document.getElementById('asal').value;
    const pekerjaan = document.getElementById('pekerjaan').value;
    const event = document.getElementById('event').value;
    const pesan = document.getElementById('pesan').value;

    // Tampilkan hasil
    displayResult(nama, email, umur, noTelepon, asal, pekerjaan, event, pesan);
});

function displayResult(nama, email, umur, noTelepon, asal, pekerjaan, event, pesan) {
    let resultHTML = `
        <div class="result-item">
            <span class="result-label">👤 Nama</span>
            <span class="result-value">${nama}</span>
        </div>
        <div class="result-item">
            <span class="result-label">📧 Email</span>
            <span class="result-value">${email}</span>
        </div>
        <div class="result-item">
            <span class="result-label">🎂 Umur</span>
            <span class="result-value">${umur} tahun</span>
        </div>
        <div class="result-item">
            <span class="result-label">📱 Telepon</span>
            <span class="result-value">${noTelepon}</span>
        </div>
        <div class="result-item">
            <span class="result-label">🏙️ Asal</span>
            <span class="result-value">${asal}</span>
        </div>
        <div class="result-item">
            <span class="result-label">💼 Pekerjaan</span>
            <span class="result-value">${pekerjaan}</span>
        </div>
        <div class="result-item">
            <span class="result-label">🎯 Event</span>
            <span class="result-value">${event}</span>
        </div>
    `;

    if (pesan) {
        resultHTML += `
        <div class="result-item">
            <span class="result-label">💬 Pesan</span>
            <span class="result-value">${pesan}</span>
        </div>
        `;
    }

    resultContent.innerHTML = resultHTML;
    resultContainer.style.display = 'block';

    // Scroll ke hasil
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeResult() {
    // Clear form dan sembunyikan hasil
    eventForm.reset();
    resultContainer.style.display = 'none';
}

function confirmRegistration() {
    // Konfirmasi pendaftaran
    alert('🎉 Terima kasih! Pendaftaran Anda telah dikonfirmasi. Kami akan menghubungi Anda segera.');
    eventForm.reset();
    resultContainer.style.display = 'none';
}
