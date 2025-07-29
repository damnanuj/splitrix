import { Avatar, XStack, YStack } from "tamagui";
import MyText from "../customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";

const FriendsList = () => {
  return (
    <YStack
      borderWidth={1}
      borderColor={"green"}
      //   mb={scale(100)}
      gap={scale(30)}
    >
      {dummyFriends.map((friend, index) => (
        <FriendItem
          key={index}
          name={friend.name}
          amount={friend.amount}
          type={friend.type}
          image={friend.image}
        />
      ))}
    </YStack>
  );
};

export default FriendsList;

const FriendItem = ({ name, amount, image, type }) => {
  const renderStatus = () => {
    if (type === "owesYou") {
      return (
        <MyText fontSize={scale(12)} color="$textSecondary">
          Owes you <MyText color="$accentGreen">₹{amount}</MyText>
        </MyText>
      );
    } else if (type === "youOwe") {
      return (
        <MyText fontSize={scale(12)} color="$textSecondary">
          You owe <MyText color="tomato">₹{amount}</MyText>
        </MyText>
      );
    } else {
      return (
        <MyText fontSize={scale(12)} color="$textSecondary">
          No pending expenses
        </MyText>
      );
    }
  };

  return (
    <XStack gap={scale(20)} items="center">
      <Avatar rounded={scale(10)} size={scale(60)}>
        <Avatar.Image accessibilityLabel={name} src={image} />
        <Avatar.Fallback delayMs={600} backgroundColor="lightgray" />
      </Avatar>
      <YStack>
        <MyText>{name}</MyText>
        {renderStatus()}
      </YStack>
    </XStack>
  );
};

const dummyFriends = [
  {
    name: "Ankit Sharma",
    amount: 120,
    type: "owesYou",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    name: "Priya Mehra",
    amount: 85,
    type: "youOwe",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    name: "Ravi Kumar",
    amount: 0,
    type: "settled",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    name: "Sneha Patil",
    amount: 60,
    type: "owesYou",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Amit Joshi",
    amount: 150,
    type: "youOwe",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Amit Joshi",
    amount: 150,
    type: "youOwe",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];
