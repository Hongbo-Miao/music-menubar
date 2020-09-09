import React from "react";
import { observer } from "mobx-react-lite";
import clsx from "clsx";
import { useMst } from "../../models";

type SongProps = {
  name: string;
  artist: string;
  albumArt: string;
  onClick(): void;
  dark: boolean;
  playing: boolean;
};

function Song({ name, artist, albumArt, playing, onClick, dark }: SongProps) {
  return (
    <li
      onClick={onClick}
      className={clsx(
        dark
          ? playing
            ? "bg-darker hover:bg-gray-500"
            : "bg-dark hover:bg-gray-500"
          : "hover:bg-gray-100",
        "p-6 flex transition-colors duration-150 cursor-pointer"
      )}
    >
      <div className="flex flex-1 space-x-4">
        <div>
          <img src={albumArt} className="h-12 object-scale-down" />
        </div>
        <div
          className={clsx(dark ? "text-white" : "text-gray-900", "font-bold")}
        >
          <p>{name}</p>
          <p className="text-sm">{artist}</p>
        </div>
      </div>
      <div className="flex items-center">
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={clsx(dark && "text-white", "w-6 ml-6")}
        >
          <path d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </li>
  );
}

// TODO: type this
export default observer(
  ({
    songs,
    onSongSelect,
    playing,
  }: {
    songs: any;
    onSongSelect: React.Dispatch<any>;
    playing: any;
  }) => {
    const store = useMst();

    const dark = store.player.theme === "dark";

    const songsList = songs.map((song: any) => {
      const { track } = song;
      const { album, artists, href, id, name, uri } = track;

      const artist = artists[0].name;

      return (
        <Song
          key={name}
          name={name}
          artist={artist}
          albumArt={album.images[0].url}
          dark={dark}
          onClick={() =>
            onSongSelect({ name, artist, albumArt: album.images[0].url })
          }
          playing={playing && playing.name === name}
        />
      );
    });

    return (
      <ul
        className={clsx(
          dark ? "divide-gray-800" : "divide-gray-200",
          "divide-y "
        )}
      >
        {songsList}
      </ul>
    );
  }
);
