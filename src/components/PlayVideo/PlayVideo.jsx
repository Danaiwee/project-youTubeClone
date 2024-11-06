import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";

const PlayVideo = () => {
  const {videoId} = useParams();

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState(null);

  const fetchVideoData = async () => {
    //Fetching Videos Data
    const video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(video_url)
      .then((response) => response.json())
      .then((data) => setApiData(data.items[0]));
  };

  const fetchOtherData = async () => {
    const video_url2 = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${
      apiData && apiData.snippet.channelId
    }&key=${API_KEY}`;
    await fetch(video_url2)
      .then((response) => response.json())
      .then((data) => setChannelData(data.items[0]));
  };

  const fetchCommentData = async () => {
    const video_url3 = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${
      apiData && apiData.id
    }&key=${API_KEY}`;
    await fetch(video_url3).then((response) =>
      response.json().then((data) => setCommentData(data.items))
    );
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
    fetchCommentData();
  }, [apiData]);

  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apiData && apiData.snippet.title}</h3>
      <div className="play-video-info">
        <p>
          {value_converter(apiData && apiData.statistics.viewCount)} Views
          &bull; {moment(apiData && apiData.snippet.publishedAt).fromNow()}
        </p>
        <div>
          <span>
            <img src={like} alt="like" />
            {apiData && value_converter(apiData.statistics.likeCount)}
          </span>
          <span>
            <img src={dislike} alt="dislike" />
            {Math.floor(Math.random() * 100)}
          </span>
          <span>
            <img src={share} alt="share" />
            {value_converter(Math.floor(Math.random() * 100000))}
          </span>
          <span>
            <img src={save} alt="save" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData && channelData.snippet.thumbnails.medium.url}
          alt="jack"
        />
        <div>
          <p>{apiData && apiData.snippet.channelTitle}</p>
          <span>
            {value_converter(
              channelData && channelData.statistics.subscriberCount
            )}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData && apiData.snippet.description.slice(0, 250) + "..."}</p>
        <hr />
        <h4>
          {apiData && value_converter(apiData.statistics.commentCount)} Comments
        </h4>
        {commentData &&
          commentData.map((data) => {
            return (
              <div className="comment" key={data.id}>
                <img src={data.snippet.topLevelComment.snippet.authorProfileImageUrl ? data.snippet.topLevelComment.snippet.authorProfileImageUrl : user_profile} alt="user_profile" />
                <div>
                  <h3>
                    {data.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span>
                  </h3>
                  <p>
                    {data.snippet.topLevelComment.snippet.textDisplay}
                  </p>
                  <div className="comment-action">
                    <img src={like} alt="like" />
                    <span>{value_converter(data.snippet.topLevelComment.snippet.likeCount)}</span>
                    <img src={dislike} alt="dislike" />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PlayVideo;
