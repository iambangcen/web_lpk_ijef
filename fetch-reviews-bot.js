const { ApifyClient } = require('apify-client');
const fs = require('fs');

const client = new ApifyClient({
    token: process.env.APIFY_API_TOKEN,
});

// Fungsi untuk mengkonversi tanggal mentah menjadi waktu relatif Bahasa Indonesia
function timeAgo(dateString) {
    if (!dateString) return 'Baru-baru ini';
    
    if (!dateString.includes('T') && !dateString.includes('-')) {
        let text = dateString.toLowerCase();
        if (text.includes('day') || text.includes('hari')) {
            let num = text.replace(/[^0-9]/g, '') || '1';
            return `${num} hari yang lalu`;
        }
        if (text.includes('week') || text.includes('minggu')) {
            let num = text.replace(/[^0-9]/g, '') || '1';
            return `${num} minggu yang lalu`;
        }
        if (text.includes('month') || text.includes('bulan')) {
            let num = text.replace(/[^0-9]/g, '') || '1';
            return `${num} bulan yang lalu`;
        }
        if (text.includes('year') || text.includes('tahun')) {
            let num = text.replace(/[^0-9]/g, '') || '1';
            return `${num} tahun yang lalu`;
        }
        return dateString;
    }

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffDays === 0) return 'Baru-baru ini';
    if (diffDays === 1) return 'Kemarin';
    if (diffDays < 30) return `${diffDays} hari yang lalu`;
    if (diffMonths < 12) return `${diffMonths} bulan yang lalu`;
    return `${diffYears} tahun yang lalu`;
}

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
                time: timeAgo(review.relativePublishDate || review.publishedAtDate),
                text: review.text || review.comment || '',
                // Kosongkan foto jika ulasan tidak memiliki foto pribadi, mencegah duplikat gambar acak
                photos: (review.reviewImageUrls && review.reviewImageUrls.length > 0) 
                    ? review.reviewImageUrls 
                    : []
            }));

            // WAJIB dibungkus objek { reviews: [...] } agar cocok dengan script.js frontend (menghindari error .slice)
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