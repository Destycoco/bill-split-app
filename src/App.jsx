import PropTypes from "prop-types";
Friend.propTypes = {
  friend: PropTypes.string.isRequired,
};
Button.propTypes = {
  children: PropTypes.string.isRequired,
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
  return (
    <body>
      <div className="main">
        <div className="sidebar">
          <FriendList />
        </div>
      </div>
    </body>
  );
}
function FriendList() {
  return (
    <div className="friendlist">
      {initialFriends.map((friend) => (
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

function Form() {
  return <div></div>;
}
function Button({ children }) {
  return <button className="button">{children}</button>;
}

function FormSplitBill() {
  return <div></div>;
}
export default App;
