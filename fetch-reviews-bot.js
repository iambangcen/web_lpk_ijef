const { ApifyClient } = require('apify-client');
const fs = require('fs');

// Inisialisasi Apify Client menggunakan token dari environment variable GitHub Actions
const client = new ApifyClient({
    token: process.env.APIFY_API_TOKEN,
});

async function runScraper() {
    try {
        console.log('Menjalankan Apify Google Maps Scraper...');

        // Input konfigurasi untuk aktor Google Maps Reviews Scraper di Apify
        // Sesuaikan 'searchStrings' dengan nama bisnis dan lokasi Anda
        const input = {
            "searchStringsArray": ["LPK IJEF Corp Bandung Barat"],
            "maxReviews": 10, // Ambil 10 ulasan terbaru
            "reviewsSort": "newest", // Urutkan dari yang paling baru
            "language": "id",
            "includeReviewsWithImages": true, // Pastikan mengambil ulasan yang ada fotonya
        };

        // Jalankan Aktor resmi Apify untuk Google Maps Reviews (ID: compass/google-maps-reviews-scraper)
        const run = await client.actor("compass/google-maps-reviews-scraper").call(input);

        // Ambil hasil data dari dataset Apify
        console.log('Mengambil data ulasan dari dataset...');
        const { items } = await client.dataset(run.defaultDatasetId).listItems();

        if (items && items.length > 0) {
            // Ambil data tempat (biasanya ulasan berada di dalam properti reviews dari item pertama)
            const placeData = items[0];
            const rawReviews = placeData.reviews || [];

            // Petakan data agar sesuai dengan format yang dibutuhkan oleh frontend website kita
            const formattedReviews = rawReviews.slice(0, 10).map(review => ({
                author: review.name || 'Pengguna Google',
                rating: review.stars || 5,
                time: review.publishedAtDate ? formatRelativeTime(review.publishedAtDate) : 'Baru-baru ini',
                text: review.text || '',
                // Ambil daftar foto ulasan jika ada
                photos: review.reviewImageUrls || []
            }));

            // Timpa (overwrite) file reviews.json secara otomatis di repositori
            fs.writeFileSync('reviews.json', JSON.stringify(formattedReviews, null, 2), 'utf-8');
            console.log('Berhasil! File reviews.json telah diperbarui dengan data terbaru.');
        } else {
            console.log('Tidak ada data ulasan yang ditemukan.');
        }
    } catch (error) {
        console.error('Gagal menjalankan scraper Apify:', error);
        process.exit(1);
    }
}

// Fungsi pembantu sederhana untuk mengubah tanggal menjadi format relatif (opsional)
function formatRelativeTime(dateString) {
    // Bisa disesuaikan atau langsung menggunakan string waktu dari apify (misal: review.relativePublishDate)
    return 'Baru-baru ini';
}

runScraper();