import React, { useEffect, useState } from 'react';
import './Recommended.css';
import thumbnail1 from '../../assets/thumbnail1.png';
import thumbnail2 from '../../assets/thumbnail2.png';
import thumbnail3 from '../../assets/thumbnail3.png';
import thumbnail4 from '../../assets/thumbnail4.png';
import thumbnail5 from '../../assets/thumbnail5.png';
import thumbnail6 from '../../assets/thumbnail6.png';
import thumbnail7 from '../../assets/thumbnail7.png';
import thumbnail8 from '../../assets/thumbnail8.png';
import { API_KEY, value_converter } from '../../data';
import { Link } from 'react-router-dom';


const Recommended = ({categoryId}) => {
  const [apiData, setApiData] = useState(null);

  const fetchRecommendedVideo = async ()=> {
    const video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(video_url).then(response=>response.json()).then(data=>setApiData(data.items));
  }

  useEffect(()=> {
    fetchRecommendedVideo();
  },[])

  console.log(apiData);
  
  return (
    <div className='recommended'>
        {apiData && apiData.map((data)=> {
            return (
            <Link to={`/video/${data.snippet.categoryId}/${data.id}`} className="side-video-list" key={data.id}>
            <img src={data.snippet.thumbnails.medium.url} alt="thumbnail1" />
            <div className='vid-info'>
                <h4>{data.snippet.title}</h4>
                <p>{data.snippet.channelTitle}</p>
                <p>{value_converter(data.statistics.viewCount)} Views</p>
            </div>
        </Link>
            )
        })}
    </div>
  )
}

export default Recommended;