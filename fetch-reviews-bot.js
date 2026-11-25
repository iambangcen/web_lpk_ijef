const { ApifyClient } = require('apify-client');
const fs = require('fs');

const client = new ApifyClient({
    token: process.env.APIFY_API_TOKEN,
});

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
    if (isNaN(date.getTime())) return 'Baru-baru ini';

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (diffMs <= 0) return 'Baru-baru ini';

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
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
        console.log('Menjalankan Apify Google Maps Reviews Scraper...');

        const input = {
            startUrls: [
                {
                    url: "https://www.google.com/maps/place/LPK+IJEF+CORP+-+International+Japan+Eco+Future+Corp,+Pasirhalang,+Cisarua,+West+Bandung+Regency,+West+Java+40551/@-6.8254326,107.5261916,16z/data=!4m6!3m5!1s0x2e68e344a4656409:0xad10456097c85b6f!8m2!3d-6.8254326!4d107.5261916!16s%2Fg%2F11y3w5vyg8"
                }
            ],
            maxReviews: 15,
            reviewsSort: "newest",
            language: "id",
            reviewsOrigin: "all",
            personalData: true
        };

        const run = await client.actor("compass/google-maps-reviews-scraper").call(input);

        console.log('Mengambil data ulasan dari dataset...');
        const { items } = await client.dataset(run.defaultDatasetId).listItems();

        if (!items || items.length === 0) {
            throw new Error('Dataset Apify kosong (0 ulasan ditemukan).');
        }

        const sortedItems = [...items].sort((a, b) => {
            const dateA = a.publishedAtDate ? new Date(a.publishedAtDate).getTime() : 0;
            const dateB = b.publishedAtDate ? new Date(b.publishedAtDate).getTime() : 0;
            return dateB - dateA;
        });

        const totalScore = sortedItems[0].totalScore || 5.0;
        const reviewsCount = sortedItems[0].reviewsCount || sortedItems.length;

        const formattedReviews = sortedItems.slice(0, 10).map(review => ({
            author: review.name || review.authorName || 'Pengguna Google',
            rating: review.stars || review.rating || 5,
            time: timeAgo(review.publishedAtDate || review.relativePublishDate),
            text: review.text || review.comment || '',
            photos: (review.reviewImageUrls && review.reviewImageUrls.length > 0)
                ? review.reviewImageUrls
                : (review.reviewPhotos || review.photos || [])
        }));

        const outputData = {
            rating: totalScore,
            totalReviews: reviewsCount,
            reviews: formattedReviews
        };

        fs.writeFileSync('reviews.json', JSON.stringify(outputData, null, 2), 'utf-8');
        console.log(`Berhasil! File reviews.json diperbarui (${formattedReviews.length} ulasan terbaru, total: ${reviewsCount}).`);
    } catch (error) {
        console.error('Gagal menjalankan scraper Apify:', error);
        process.exit(1);
    }
}

runScraper();
