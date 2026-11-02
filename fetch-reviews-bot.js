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
        const input = {
            "searchStringsArray": ["LPK IJEF CORP International Japan Eco Future Corp"],
            "maxReviews": 10,
            "reviewsSort": "newest",
            "language": "id",
            "includeReviewsWithImages": true,
            "lat": -6.8378,
            "lng": 107.5073,
            "zoom": 14
        };

        // Jalankan Aktor resmi Apify untuk Google Maps Reviews
        const run = await client.actor("compass/google-maps-reviews-scraper").call(input);

        // Ambil hasil data dari dataset Apify
        console.log('Mengambil data ulasan dari dataset...');
        const { items } = await client.dataset(run.defaultDatasetId).listItems();

        if (items && items.length > 0) {
            const placeData = items[0];
            const rawReviews = placeData.reviews || items;

            // Ambil rating total dan jumlah ulasan dari Google Maps
            const totalScore = placeData.totalScore || 5.0;
            const reviewsCount = placeData.reviewsCount || 41;

            const formattedReviews = rawReviews.slice(0, 10).map(review => ({
                author: review.name || review.authorName || 'Pengguna Google',
                rating: review.stars || review.rating || 5,
                // Ambil waktu asli dari Apify secara langsung
                time: review.relativePublishDate || review.publishedAtDate || 'Baru-baru ini',
                text: review.text || review.comment || '',
                photos: review.reviewPhotos || review.photos || (review.imageUrl ? [review.imageUrl] : [])
            }));

            // Bungkus dalam objek agar menyimpan rating keseluruhan, total ulasan, dan list review
            const outputData = {
                rating: totalScore,
                totalReviews: reviewsCount,
                reviews: formattedReviews
            };

            // Timpa (overwrite) file reviews.json secara otomatis
            fs.writeFileSync('reviews.json', JSON.stringify(outputData, null, 2), 'utf-8');
            console.log('Berhasil! File reviews.json telah diperbarui dengan data rating, total ulasan, dan foto akurat.');
        } else {
            console.log('Tidak ada data ulasan yang ditemukan.');
        }
    } catch (error) {
        console.error('Gagal menjalankan scraper Apify:', error);
        process.exit(1);
    }
}

// Fungsi pembantu untuk format waktu
function formatRelativeTime(dateString) {
    return 'Baru-baru ini';
}

runScraper();