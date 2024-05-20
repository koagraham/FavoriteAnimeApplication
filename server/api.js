//fetch anime images
const fetchAnimeInfo = async (title) => {
    try {
        const response = await fetch(`https://graphql.anilist.co`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query ($title: String) {
                        Media(search: $title, type: ANIME) {
                            coverImage {
                                large
                            }
                        }
                    }
                `,
                variables: { title },
            }),
            timeout: 10000
        });

        const data = await response.json();

        if (data.data.Media && data.data.Media.coverImage) {
            return data.data.Media.coverImage.large;
        } else {
            return 'https://example.com/placeholder.jpg';
        }
    } catch (error) {
        console.error('Error fetching anime information:', error);
        return 'https://example.com/error.jpg'; // Return an error image URL
    }
};

export default fetchAnimeInfo;