// Smooth scroll behavior (opsional)
document.addEventListener('DOMContentLoaded', function() {
    // Highlight code blocks saat hover
    const codeBoxes = document.querySelectorAll('.code-box');
    codeBoxes.forEach(box => {
        box.addEventListener('mouseover', function() {
            this.style.opacity = '0.95';
        });
        box.addEventListener('mouseout', function() {
            this.style.opacity = '1';
        });
    });
});
