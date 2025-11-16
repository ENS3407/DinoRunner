// DOM'dan elementleri seçiyoruz.
const character = document.getElementById('character');
const obstacle = document.getElementById('obstacle');
const scoreElement = document.getElementById('score');

// Skor değişkenleri
let score = 0;
let scoreInterval = null; // Skor sayacının ID'sini tutmak için

// Zıplama fonksiyonu
function jump() {
    // Eğer karakter zaten zıplıyorsa, fonksiyondan çık.
    if (character.classList.contains('jump')) {
        return;
    }

    // Karaktere 'jump' sınıfını ekle.
    character.classList.add('jump');

    // Animasyon bittiğinde 'jump' sınıfını kaldır.
    character.addEventListener('animationend', () => {
        character.classList.remove('jump');
    }, { once: true }); // {once: true} dinleyicinin bir kez çalışıp kalkmasını sağlar.
}

// Klavye dinleyicisi
document.addEventListener('keydown', (event) => {
    // Basılan tuş 'Space' (Boşluk) ise zıpla.
    if (event.code === 'Space') {
        jump();
    }
});

/* ======================== */
/* Adım 4: Oyun Döngüsü     */
/* ======================== */

// Oyun döngüsü (Çarpışma Kontrolü)
// Her 50 milisaniyede bir çalışır.
const gameLoop = setInterval(() => {
    
    // Karakterin anlık dikey pozisyonunu al
    let characterTop = character.offsetTop;
    // Engelin anlık yatay pozisyonunu al
    let obstacleLeft = obstacle.offsetLeft;

    // Çarpışma Kontrolü
    if (obstacleLeft < 40 && obstacleLeft > 10 && characterTop > 160) {
        
        // Çarpışma oldu!
        
        // a. Oyun döngüsünü durdur.
        clearInterval(gameLoop);
        
        // b. Skor sayacını durdur.
        clearInterval(scoreInterval);

        // c. Engelin animasyonunu durdur.
        obstacle.style.animationPlayState = 'paused';
        
        // d. "Game Over!" uyarısı göster.
        alert('Game Over! Skorunuz: ' + score);
        
        // e. Uyarı kapatılınca sayfayı yeniden yükle (Oyunu yeniden başlat).
        location.reload();
    }
    
}, 50);

/* ======================== */
/* Adım 5: Skor Sayacı      */
/* ======================== */

// Ayrı bir skor sayacı başlatıyoruz.
// Her 100 milisaniyede bir skoru 1 artır.
scoreInterval = setInterval(() => {
    score++; // Skoru artır
    scoreElement.textContent = score; // Ekrana yazdır
}, 100);