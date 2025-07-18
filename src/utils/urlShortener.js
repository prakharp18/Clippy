export async function shortenUrl(originalUrl) {
  try {
    const response = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: originalUrl }),
    });

    if (!response.ok) {
      throw new Error('Failed to shorten URL');
    }

    const data = await response.json();
    return data.result_url || data.shortUrl || data.shortenedUrl;
  } catch {
    return null;
  }
}
