//imports
import React, { useState, useEffect } from 'react';

//main component
const AnimeImage = ({ title }) => {
  const [imageUrl, setImageUrl] = useState(null);

  //fetch anime images
  useEffect(() => {
    const fetchAnimeInfo = async () => {
      try {
        const response = await fetch(`https://graphql.anilist.co`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          //mode: 'no-cors',
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
        });

        const data = await response.json();

        if (data.data.Media && data.data.Media.coverImage) {
          setImageUrl(data.data.Media.coverImage.large);
        } else {
          setImageUrl('https://example.com/placeholder.jpg');
        }
      } catch (error) {
        console.error('Error fetching anime information:', error);
      }
    };

    fetchAnimeInfo();
  }, [title]);

  if (!imageUrl) {
    return <td><img src="https://example.com/placeholder.jpg" alt="Placeholder" /></td>;
  }

  return <td><img src={imageUrl} alt={title} height="150" width="100"/></td>;
};

export default AnimeImage;