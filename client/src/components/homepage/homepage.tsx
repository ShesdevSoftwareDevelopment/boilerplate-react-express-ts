import React, { useState } from "react";

import { searchArtworks } from "../../api";

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
          <div>LOADER</div>
        </div>
      )}
      {noArtworksFound && !isLoading ? (
        <div>No results were found for the entered keyword/s.</div>
      ) : (
        <div>
          {artworks.map((artwork, idx) => {
            const {
              id,
              title,
              image_url,
              artist_display,
              date_display,
              medium_display,
              place_of_origin,
            } = artwork;
            return (
              <div key={`artwork-${id}`}>
                <a
                  href={image_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-current="true"
                >
                  <img src={image_url} alt="img" />
                </a>
                <div>
                  <div>{title}</div>
                  <div
                    className="text-muted"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {place_of_origin}, {date_display}
                    <br />
                    <small className="text-muted">{artist_display}</small>
                  </div>
                  <div>
                    <small className="text-muted">{medium_display}</small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Homepage;
