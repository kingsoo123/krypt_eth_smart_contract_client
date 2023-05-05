import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API;

const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState("");

  const fetchGifs = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
          .split(" ")
          .join("")}&limit=1`
      );
      const { data } = response;
      setGifUrl(data[0]?.images?.downsized_medium?.url);
    } catch (error) {
      setGifUrl("https://media.giphy.com/media/G7nUzRr3LvSu48bR8U/giphy.gif");
    }
  };

  useEffect(() => {
    if (keyword) fetchGifs();
  }, [keyword]);
  return gifUrl;
};

export default useFetch;
