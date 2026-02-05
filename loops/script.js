// 1. FOR LOOP - Looping dengan 3 parameter (awal, kondisi, increment)
function demonstrateForLoop() {
    let result = [];
    
    for (let i = 1; i <= 10; i++) {
        result.push(i);
    }
    
    document.getElementById("forLoopOutput").innerHTML = 
        "<strong>Output:</strong> " + result.join(" ");
}

// 2. WHILE LOOP - Looping selama kondisi bernilai true
function demonstrateWhileLoop() {
    let result = [];
    let i = 1;
    
    while (i <= 10) {
        result.push(i);
        i++; // PENTING: jangan lupa untuk increment!
    }
    
    document.getElementById("whileLoopOutput").innerHTML = 
        "<strong>Output:</strong> " + result.join(" ");
}

// 3. DO...WHILE LOOP - Dijalankan minimal 1x
function demonstrateDoWhileLoop() {
    let result = [];
    let i = 1;
    
    do {
        result.push(i);
        i++;
    } while (i <= 10);
    
    document.getElementById("doWhileLoopOutput").innerHTML = 
        "<strong>Output:</strong> " + result.join(" ");
}

// 4. FOR...OF LOOP - Untuk looping array
function demonstrateForOfLoop() {
    let buah = ['🍎 Apel', '🥭 Mangga', '🍊 Jeruk'];
    let result = [];
    
    for (let item of buah) {
        result.push(item);
    }
    
    document.getElementById("forOfLoopOutput").innerHTML = 
        "<strong>Output:</strong> " + result.join(" | ");
}

// 5. Print Angka 1-10 Berurutan
function printNumbers() {
    let result = [];
    
    // Cara 1: For loop
    for (let i = 1; i <= 10; i++) {
        result.push(i); // Taruh hasilnya di array
    }
    
    // Tampilkan hasilnya
    document.getElementById("numberOutput").innerHTML = 
        "<strong>Angka 1-10 Berurutan:</strong><br>" + result.join(" ✨ ");
}

// Jalankan satu contoh saat halaman load
window.addEventListener('load', function() {
    demonstrateForLoop();
});
