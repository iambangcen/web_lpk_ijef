const { ApifyClient } = require('apify-client');
const fs = require('fs');

const client = new ApifyClient({
    token: process.env.APIFY_API_TOKEN,
});

async function runScraper() {
    try {
        console.log('Menjalankan Apify Google Maps Scraper...');

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

        const run = await client.actor("compass/google-maps-reviews-scraper").call(input);

        console.log('Mengambil data ulasan dari dataset...');
        const { items } = await client.dataset(run.defaultDatasetId).listItems();

        if (items && items.length > 0) {
            const placeData = items[0];
            const rawReviews = placeData.reviews || items;

            const formattedReviews = rawReviews.slice(0, 10).map(review => ({
                author: review.name || review.authorName || 'Pengguna Google',
                rating: review.stars || review.rating || 5,
                // Menggunakan teks waktu relatif asli dari Google Maps (misal: "sebulan lalu")
                time: review.relativePublishDate || 'Baru-baru ini',
                text: review.text || review.comment || '',
                photos: review.reviewPhotos || review.photos || (review.imageUrl ? [review.imageUrl] : [])
            }));

            // Bungkus dalam objek { reviews: [...] } agar cocok dengan script.js frontend Anda yang memanggil .slice()
            const outputData = {
                reviews: formattedReviews
            };

            fs.writeFileSync('reviews.json', JSON.stringify(outputData, null, 2), 'utf-8');
            console.log('Berhasil! File reviews.json telah diperbarui.');
        } else {
            console.log('Tidak ada data ulasan yang ditemukan.');
        }
    } catch (error) {
        console.error('Gagal menjalankan scraper Apify:', error);
        process.exit(1);
    }
}

runScraper();