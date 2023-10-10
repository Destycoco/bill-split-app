import PropTypes from "prop-types";
import { useState } from "react";
Friend.propTypes = {
  friend: PropTypes.string.isRequired,
};
Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.string.isRequired,
};
Form.propTypes = {
  friendName: PropTypes.string.isRequired,
  onsetFriendName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onsetImageUrl: PropTypes.string.isRequired,
  onsetAddFriend: PropTypes.string.isRequired,
};
FriendList.propTypes = {
  updatedFriends: PropTypes.string.isRequired,
};
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friendName, setFriendName] = useState("");
  const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/48");
  const [isOpen, setIsOpen] = useState(false);
  const id = crypto.randomUUID();
  const newfriend = {
    id: id,
    name: friendName,
    image: `${imageUrl}?u=${id}`,
    balance: 0,
  };
  const [updatedFriends, setUpdatedFriends] = useState([...initialFriends]);
  function handleFriendName(e) {
    setFriendName((friendName) => e.target.value);
  }
  function handleImageUrl(e) {
    setImageUrl((img) => e.target.value);
  }
  function handleAddFriend(e) {
    e.preventDefault();
    setUpdatedFriends((friend) => [...updatedFriends, newfriend]);
    setFriendName("");
  }
  function toggleForm() {
    setIsOpen((isOpen) => !isOpen);
  }
  return (
    <body>
      <div className="main">
        <div className="sidebar">
          <FriendList updatedFriends={updatedFriends} />
          {isOpen && (
            <Form
              friendName={friendName}
              onsetFriendName={handleFriendName}
              imageUrl={imageUrl}
              onsetImageUrl={handleImageUrl}
              onsetAddFriend={handleAddFriend}
            />
          )}
          <Button onClick={toggleForm}>
            {isOpen ? "close" : "Add friend"}
          </Button>
        </div>
      </div>
    </body>
  );
}
function FriendList({ updatedFriends }) {
  return (
    <div className="friendlist">
      {updatedFriends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </div>
  );
}
function Friend({ friend }) {
  return (
    <div className="friend">
      <img src={friend.image} alt="picture" />
      <h2>{friend.name}</h2>
      <p>
        {friend.balance > 0
          ? `${friend.name} owes you ${friend.balance}`
          : friend.balance < 0
          ? `you owe ${friend.name} ${Math.abs(friend.balance)}`
          : `You and ${friend.name} are even`}
      </p>
      <Button>select</Button>
    </div>
  );
}

function Form({
  friendName,
  onsetFriendName,
  imageUrl,
  onsetImageUrl,
  onsetAddFriend,
}) {
  return (
    <form className="form" onSubmit={onsetAddFriend}>
      <label htmlFor="">Friend name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => onsetFriendName(e)}
      />
      <label htmlFor="">Image Url</label>
      <input type="text" value={imageUrl} onChange={(e) => onsetImageUrl(e)} />
      <Button>Add</Button>
    </form>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormSplitBill() {
  return <div></div>;
}
export default App;
