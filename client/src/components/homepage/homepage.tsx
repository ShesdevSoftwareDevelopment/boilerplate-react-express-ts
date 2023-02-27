import React, { useState } from "react";

import { searchArtworks } from "../../api";
import ImgMediaCard from "../img-card/ImgCard";

function Homepage({ onLogout }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [noArtworksFound, setNoArtworksFound] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [artworks, setArtworks] = useState([]);

  const onChangeKeyword = (event: any) => {
    setKeyword(event.target.value);
  };

  const onSearchArtworks = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    const artworks = await searchArtworks({ keyword });
    setArtworks(artworks);
    setNoArtworksFound(!artworks || !artworks.length);
    setIsLoading(false);
  };

  return (
    <div>
      <div className="mt-2 mb-2 justify-content-end">
        <button onClick={onLogout}>Log out</button>
      </div>
      <div>
        <h1>Welcome!</h1>
      </div>
      <div className="mt-2">
        <h6>
          Enter one or multiple keywords below to search for artworks in the Art
          Institute of Chicago.
        </h6>
      </div>
      <div>
        <form className="w-100 mb-5" onSubmit={onSearchArtworks}>
          <input
            type="text"
            placeholder="e.g. Monet, O'Keeffe, Ancient Greek..."
            onChange={onChangeKeyword}
            value={keyword}
          />

          <button disabled={!keyword} type="submit">
            Search artworks
          </button>
        </form>
      </div>
      {isLoading && (
        <div className="justify-content-center mb-5">
          <div>Loading...</div>
        </div>
      )}
      {noArtworksFound && !isLoading ? (
        <div>No results were found for the entered keyword/s.</div>
      ) : (
        <div>
          {artworks.map((artwork) => {
            const { id } = artwork;
            return <ImgMediaCard key={`artwork-${id}`} artwork={artwork} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Homepage;
