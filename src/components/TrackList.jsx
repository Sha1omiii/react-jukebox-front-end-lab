import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react'
import * as trackService from '../services/trackService';
import './TrackList.css';


const TrackList = ({handleDeleteTrack, handlePlayTrack}) => {
    const [tracks, setTracks] = useState([]);
    useEffect(() => {
      const getAllTracks = async () => {
        try {
          const allTracksOnDB = await trackService.fetchAllTracks();
          console.log(allTracksOnDB);

          if (Array.isArray(allTracksOnDB)) {
              setTracks(allTracksOnDB);
          }
          else {
              console.log('Not what I wanted to return');
          }

        } catch (e) {
          console.log('error', e)
        } 
      };
      getAllTracks();
    }, []);
    return (
        <div className='track-container'><h1>Community Tracks</h1>
            {tracks.length === 0 ? (<p>The community has not added any songs yet</p>) 
             : (
                <div className='alltracks'>
                  <ul className='track-body'>{tracks.map((track) => (
                    <li key={track._id} className='track-details'>
                        <p className='track-text'><span className='artist-text'>{track.title} by</span> {track.artist}</p>
                        <button onClick={() => handlePlayTrack(track)}>Play</button>
                        <Link to={`/tracks/edit-track/${track._id}`}> <button>Edit Track</button></Link>
                        <button onClick={()=>handleDeleteTrack(track._id)} className='delete-btn'>Delete Track</button>
                    </li>
                  ))}</ul>
          </div>
            )}
        </div>
    )
}

export default TrackList;