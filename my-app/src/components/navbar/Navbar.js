import "./navbar.css";
import Notification from "../../img/notification.jpg";
import Message from "../../img/MessagePNG.png";
import Settings from "../../img/SettingPNG.png";
import { useEffect, useState } from "react";

const Navbar = ({ socket }) => {
  let newnotifications;
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
      // setNotifications(data);
    });
  }, [socket]);

  if (notifications) {
    let noti_not_duplicate = new Set(notifications);
    let it = noti_not_duplicate.values();
    newnotifications = Array.from(it);
    console.log(Array.from(it));
  }
  const displayNotification = ({ senderName, type }, index) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span
        key={`${senderName} so ${index}`}
        className="notification"
      >{`${senderName} ${action} your post.`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div className="navbar">
      <span className="logo">Lama App</span>
      <div className="icons">
        <div className="icon">
          <img
            src={Notification}
            className="iconImg"
            alt=""
            onClick={() => {
              setOpen(!open);
            }}
          />
          <div className="counter">{newnotifications.length}</div>
        </div>
        <div className="icon">
          <img src={Message} className="iconImg" alt="" />
          <div className="counter">2</div>
        </div>
        <div className="icon">
          <img src={Settings} className="iconImg" alt="" />
          <div className="counter">2</div>
        </div>
        {open && (
          <div className="notifications">
            {console.log(newnotifications)}
            {newnotifications.map((n, index) => displayNotification(n, index))}
            <button className="nButton" onClick={handleRead}>
              Mark as read
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
