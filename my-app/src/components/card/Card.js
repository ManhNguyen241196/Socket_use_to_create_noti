import "./card.css";
import Heart from "../../img/heart.png";
import HeartFilled from "../../img/heartFilled.png";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Info from "../../img/info.png";
import { useState } from "react";

const Card = ({ post, user, socket }) => {
  // post là các item trích ra từ array posts. Nó khác
  // so với user. user này xuất hiện kèm mỗi khi socket mới được khởi tạo. Nó có thể được lấy trong
  //data chung nhưng quan trọng nó đi kèm với sự xuất hiện của 1 socket.
  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    setLiked(true);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };
  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <img
            src={HeartFilled}
            alt=""
            className="cardIcon"
            onClick={() => setLiked(false)}
          />
        ) : (
          <img
            src={Heart}
            alt=""
            className="cardIcon"
            onClick={() => handleNotification(1)}
          />
        )}
        <img
          src={Comment}
          alt=""
          className="cardIcon"
          onClick={() => handleNotification(2)}
        />
        <img
          src={Share}
          alt=""
          className="cardIcon"
          onClick={() => handleNotification(3)}
        />
        <img src={Info} alt="" className="cardIcon infoIcon" />
      </div>
    </div>
  );
};

export default Card;
