import React from "react";
import "./Body.css";
import Header from "./Header";
import { useStateValue } from "./StateProvider";
import SongRow from "./SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function Body({ spotify }) {
    const [{ discover_weekly }, dispatch] = useStateValue();

    const playPlaylist = (id) => {
        spotify
            .play({
                context_uri: `spotify:playlist:37i9dQZEVXcJZyENOWUFo7`,
            })
            .then((res) => {
                spotify.getMyCurrentPlayingTrack().then((r) => {
                    dispatch({
                        type: "SET_ITEM",
                        item: r.item,
                    });
                    dispatch({
                        type: "SET_PLAYING",
                        playing: true,
                    });
                });
            });
    };

    const playSong = (id) => {
        spotify
            .play({
                uris: [`spotify:track:${id}`],
            })
            .then((res) => {
                spotify.getMyCurrentPlayingTrack().then((r) => {
                    dispatch({
                        type: "SET_ITEM",
                        item: r.item,
                    });
                    dispatch({
                        type: "SET_PLAYING",
                        playing: true,
                    });
                });
            });
    };

    return (
        <div className="body">
            <Header spotify={spotify} />

            <div className="body__info">
                <img src={"https://newjams-images.scdn.co/v3/discover-weekly/JElJEs8VsYtu45TXFhTnNk_VPrfm7HFDGSDJjlhJnmtH2QDZBiQfSqKWPXRzFvEb9yohWanlfBafaJXW_MZg4UXrSRtcbcTE1gzJWV6JjjNOCCke4foHZuErogenDqJH71KyCOIGn_ynYaTmVEWEz2xZD2uisnOgbC-Hx5x3gYFiCOVw9F-HJFH5wYBsnKyjmN_QlUoX0U3BreFxBQeMUg==/NTI6NjI6MzJUNzItMzAtMQ==/default"} alt="" />
                <div className="body__infoText">
                    <strong>PLAYLIST</strong>
                    <h2>Discover Weekly</h2>
                    <p>{discover_weekly?.description}</p>
                </div>
            </div>

            <div className="body__songs">
                <div className="body__icons">
                    <PlayCircleFilledIcon
                        className="body__shuffle"
                        onClick={playPlaylist}
                    />
                    <FavoriteIcon fontSize="large" />
                    <MoreHorizIcon />
                </div>

                {discover_weekly?.tracks.items.map((item) => (
                    <SongRow playSong={playSong} track={item.track} />
                ))}
            </div>
        </div>
    );
}

export default Body;