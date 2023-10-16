import PropTypes from "prop-types";
import { useState } from "react";
Friend.propTypes = {
  friend: PropTypes.string.isRequired,
  setBillName: PropTypes.string.isRequired,
  selectedFriend: PropTypes.string.isRequired,
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
  billValue: PropTypes.string.isRequired,
  setBillValue: PropTypes.string.isRequired,
  expense: PropTypes.string.isRequired,
  setExpense: PropTypes.string.isRequired,
  whoIsPaying: PropTypes.string.isRequired,
  setWhoIsPaying: PropTypes.string.isRequired,
  friendExpense: PropTypes.string.isRequired,
  handleSplit: PropTypes.string.isRequired,
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
  const [selectedFriend, setSelectedFriend] = useState("");
  const [billValue, setBillValue] = useState("");
  const [expense, setExpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const id = crypto.randomUUID();

  const newfriend = {
    id: id,
    name: friendName,
    image: `${imageUrl}?u=${id}`,
    balance: 0,
  };
  const [updatedFriends, setUpdatedFriends] = useState([...initialFriends]);
  const friendExpense = billValue - expense;
  const owedExpense = whoIsPaying === "user" ? friendExpense : -expense;
  console.log(selectedFriend);
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
  function handleSelectedFriend(person) {
    setSelectedFriend((friend) => (person.id === friend.id ? "" : person));
    setIsOpen((isOpen) => false);
    console.log(selectedFriend);
    // toggleBill();
  }
  function updateFriend(id) {
    setUpdatedFriends((cur) =>
      cur.map((friend) =>
        friend.id === id
          ? { ...friend, balance: friend.balance + owedExpense }
          : friend
      )
    );
  }
  function handleSplit(e) {
    e.preventDefault();
    if (!billValue || !expense) return;
    console.log(owedExpense);
    updateFriend(selectedFriend.id);
    // setBillOpen((bill) => !bill);
    setSelectedFriend((friend) => "");
  }

  return (
    <body>
      <div className="main">
        <div className="sidebar">
          <FriendList
            updatedFriends={updatedFriends}
            handleSelectedFriend={handleSelectedFriend}
            selectedFriend={selectedFriend}
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
          {selectedFriend && (
            <FormSplitBill
              selectedFriend={selectedFriend}
              billValue={billValue}
              setBillValue={setBillValue}
              expense={expense}
              setExpense={setExpense}
              whoIsPaying={whoIsPaying}
              setWhoIsPaying={setWhoIsPaying}
              friendExpense={friendExpense}
              handleSplit={handleSplit}
            />
          )}
        </div>
      </div>
    </body>
  );
}
// selectedFriend
function FriendList({ updatedFriends, handleSelectedFriend, selectedFriend }) {
  return (
    <div className="friendlist">
      {updatedFriends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          handleSelectedFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
          // owedExpense={owedExpense}
        />
      ))}
    </div>
  );
}
// selectedFriend
function Friend({ friend, handleSelectedFriend, selectedFriend }) {
  return (
    <div
      className={selectedFriend.id === friend.id ? "friend selected" : "friend"}
    >
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
          ? `${friend.name} owes you $${friend.balance}`
          : friend.balance < 0
          ? `you owe ${friend.name} $${Math.abs(friend.balance)}`
          : `You and ${friend.name} are even`}
      </p>
      <Button onClick={() => handleSelectedFriend(friend)}>
        {selectedFriend.id === friend.id ? "close" : "select"}
      </Button>
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

function FormSplitBill({
  selectedFriend,
  billValue,
  setBillValue,
  expense,
  setExpense,
  whoIsPaying,
  setWhoIsPaying,
  friendExpense,
  handleSplit,
}) {
  const friendOption = "A friend";
  const expenseOption = "Friend";
  return (
    <form className="billform" onSubmit={handleSplit}>
      <h1>{`Split a Bill With ${
        selectedFriend.name ? selectedFriend.name : friendOption
      }`}</h1>
      <label htmlFor="">Bill Value</label>
      <input
        type="number"
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
      />
      <label htmlFor="">Your expense</label>
      <input
        type="number"
        value={expense}
        onChange={(e) => {
          const newExpense = Number(e.target.value);
          if (newExpense <= billValue) {
            setExpense(newExpense);
          } else {
            setExpense(expense);
          }
        }}
      />
      <label htmlFor="">{`${
        selectedFriend.name ? selectedFriend.name : expenseOption
      }'s expense`}</label>
      <input type="text" disabled value={friendExpense} />
      <label htmlFor="">Who is paying the bill</label>
      <select
        name=""
        id=""
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
export default App;
