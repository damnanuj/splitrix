import { Avatar, XStack, YStack } from "tamagui";
import MyText from "../customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import { FlatList } from "react-native";

const FriendsList = () => {
  return (
    <YStack
      // borderWidth={1}
      borderColor={"red"}
      //   mb={scale(100)}
      flex={1}
      // gap={scale(0)}
      mb={scale(80)}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dummyFriends}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: scale(20),
          gap: scale(30),
        }}
        renderItem={({ item }) => (
          <FriendItem
            name={item.name}
            amount={item.amount}
            type={item.type}
            image={item.image}
          />
        )}
      />
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
    name: "Deepika Sinha",
    amount: 0,
    type: "settled",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    name: "Vikram Singh",
    amount: 95,
    type: "owesYou",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Meena Gupta",
    amount: 70,
    type: "youOwe",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Rohan Das",
    amount: 0,
    type: "settled",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Neha Rathi",
    amount: 200,
    type: "owesYou",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
  },
  {
    name: "Kunal Verma",
    amount: 140,
    type: "youOwe",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
  },
  {
    name: "Pooja Yadav",
    amount: 0,
    type: "settled",
    image: "https://randomuser.me/api/portraits/women/35.jpg",
  },
  {
    name: "Aditya Narayan",
    amount: 180,
    type: "owesYou",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    name: "Shweta Ghosh",
    amount: 50,
    type: "youOwe",
    image: "https://randomuser.me/api/portraits/women/18.jpg",
  },
  {
    name: "Manish Tiwari",
    amount: 0,
    type: "settled",
    image: "https://randomuser.me/api/portraits/men/58.jpg",
  },
  {
    name: "Isha Kapoor",
    amount: 120,
    type: "owesYou",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
  },
  {
    name: "Rajeev Nair",
    amount: 105,
    type: "youOwe",
    image: "https://randomuser.me/api/portraits/men/49.jpg",
  },
  {
    name: "Tanvi Chauhan",
    amount: 0,
    type: "settled",
    image: "https://randomuser.me/api/portraits/women/66.jpg",
  },
  {
    name: "Siddharth Rao",
    amount: 90,
    type: "owesYou",
    image: "https://randomuser.me/api/portraits/men/69.jpg",
  },
  {
    name: "Kritika Jain",
    amount: 110,
    type: "youOwe",
    image: "https://randomuser.me/api/portraits/women/71.jpg",
  },
];
