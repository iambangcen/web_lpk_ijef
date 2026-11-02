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
            "searchStringsArray": ["LPK IJEF CORP International Japan Eco Future Corp"],
            "maxReviews": 10,
            "reviewsSort": "newest",
            "language": "id",
            "includeReviewsWithImages": true,
            // Tambahkan koordinat pusat pencarian Bandung Barat agar tepat sasaran
            "lat": -6.8378,
            "lng": 107.5073,
            "zoom": 14
        };

        // Jalankan Aktor resmi Apify untuk Google Maps Reviews (ID: compass/google-maps-reviews-scraper)
        const run = await client.actor("compass/google-maps-reviews-scraper").call(input);

        // Ambil hasil data dari dataset Apify
        console.log('Mengambil data ulasan dari dataset...');
        const { items } = await client.dataset(run.defaultDatasetId).listItems();

        if (items && items.length > 0) {
            const rawReviews = items[0].reviews || items;

            const formattedReviews = rawReviews.slice(0, 10).map(review => ({
                author: review.name || review.authorName || 'Pengguna Google',
                rating: review.stars || review.rating || 5,
                time: review.publishedAtDate ? formatRelativeTime(review.publishedAtDate) : (review.relativePublishDate || 'Baru-baru ini'),
                text: review.text || review.comment || '',
                // Perbaikan: Ambil foto spesifik milik ulasan tersebut, atau kosongkan jika tidak ada
                photos: review.reviewPhotos || review.photos || (review.imageUrl ? [review.imageUrl] : [])
            }));

            fs.writeFileSync('reviews.json', JSON.stringify(formattedReviews, null, 2), 'utf-8');
            console.log('Berhasil! File reviews.json telah diperbarui dengan data foto yang akurat.');
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