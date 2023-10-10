import PropTypes from "prop-types";
import { useState } from "react";
Friend.propTypes = {
  friend: PropTypes.string.isRequired,
  setBillName: PropTypes.string.isRequired,
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
  setBillName: PropTypes.string.isRequired,
};
FormSplitBill.propTypes = {
  selectedFriend: PropTypes.string.isRequired,
};
// FormSplitBill.propTypes = {
//   children: PropTypes.string.isRequired,
// };
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
  const [selectedFriend, setSelectedFriend] = useState("Clark");
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
    if (!friendName) return;
    setUpdatedFriends((friend) => [...updatedFriends, newfriend]);
    setFriendName("");
  }
  function toggleForm() {
    setIsOpen((isOpen) => !isOpen);
  }
  function setBillName(person) {
    setSelectedFriend((friend) => person);
    setIsOpen((isOpen) => false);
    console.log(selectedFriend);
  }
  return (
    <body>
      <div className="main">
        <div className="sidebar">
          <FriendList
            updatedFriends={updatedFriends}
            setBillName={setBillName}
          />
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
        <div className="rightbar">
          <FormSplitBill selectedFriend={selectedFriend} />
        </div>
      </div>
    </body>
  );
}
function FriendList({ updatedFriends, setBillName }) {
  return (
    <div className="friendlist">
      {updatedFriends.map((friend) => (
        <Friend key={friend.id} friend={friend} setBillName={setBillName} />
      ))}
    </div>
  );
}
function Friend({ friend, setBillName }) {
  return (
    <div className="friend">
      <img src={friend.image} alt="picture" />
      <h2>{friend.name}</h2>
      <p
        className={
          `${friend.balance}` > 0
            ? "green"
            : `${friend.balance}` < 0
            ? "red"
            : ""
        }
      >
        {friend.balance > 0
          ? `${friend.name} owes you ${friend.balance}`
          : friend.balance < 0
          ? `you owe ${friend.name} ${Math.abs(friend.balance)}`
          : `You and ${friend.name} are even`}
      </p>
      <Button onClick={() => setBillName(friend.name)}>select</Button>
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
  // function handleClick() {
  //   if (onClick) {
  //     onClick();
  //   }
  // }

  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormSplitBill({ selectedFriend }) {
  return (
    <form className="billform">
      <h1>{`Split a Bill With ${selectedFriend}`}</h1>
      <label htmlFor="">Bill Value</label>
      <input type="number" />
      <label htmlFor="">Your expense</label>
      <input type="number" />
      <label htmlFor="">{`${selectedFriend}'s expense`}</label>
      <input type="text" disabled />
      <label htmlFor="">Who is paing the bill</label>
      <select name="" id="">
        <option value="">You</option>
        <option value="">{selectedFriend}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
export default App;
