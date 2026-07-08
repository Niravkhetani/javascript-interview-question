/* Retry with exponential backoff for API along with concurrent 5 taks. */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, retries = 3, baseDelay = 1000) {
    let lastError;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url);

            if (response.ok) {
                return response;
            }

            // Retry only for transient errors
            if (![429, 500, 502, 503, 504].includes(response.status)) {
                throw new Error(`HTTP ${response.status}`);
            }

            lastError = new Error(`HTTP ${response.status}`);
        } catch (err) {
            lastError = err;
        }

        if (attempt < retries) {
            const delay = Math.min(
                baseDelay * (2 ** attempt) + Math.random() * 250,
                30000
            );

            console.log(`Retrying in ${Math.round(delay)} ms...`);
            await sleep(delay);
        }
    }

    throw lastError;
}