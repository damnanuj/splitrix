import { StyleSheet, Text, View } from "react-native";
import DateTimePickerComponent from "src/components/addBill/dateTimePicker/DateTimePickerComponent";

import BackButtonWithHeader from "src/components/common/BackButtonWithHeader";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import { Button, Spinner, useTheme, XStack } from "tamagui";
import { Form, Input, YStack } from "tamagui";

const AddBillPage = () => {
  const theme = useTheme();
  const handleDateChange = (selectedDate) => {
    console.log("Selected Date/Time:", selectedDate);
  };
  return (
    <YStack px={scale(25)} flex={1} bg={"$background"}>
      <BackButtonWithHeader title="Create New Bill" />
      <Form
        mt={scale(25)}
        width="100%"
        items="center"
        // borderWidth={1}
        borderColor={"red"}
        // onSubmit={() => handleSigninForm}
      >
        <YStack
          width="100%"
          gap={scale(10)}
          //   borderWidth={1}
          borderColor={"white"}
          mb={scale(20)}
        >
          <MyText color={"$textPrimary"} fontSize={scale(16)}>
            Title
          </MyText>

          <Input
            placeholderTextColor={"$textSecondary"}
            focusStyle={{ borderColor: theme.accentYellow }}
            // value={}
            // onChangeText={(text) => handleChange("email", text)}
            htmlFor="email"
            bg={"transparent"}
            placeholder="Enter expense title"
            width="100%"
            height={scale(50)}
            rounded={scale(8)}
            borderWidth={scale(1.5)}
            borderColor={false ? "red" : "$borderPrimary"}
            style={{
              fontFamily: "MPlusRounded500",
              fontSize: scale(14),
              color: theme.textPrimary.val,
            }}
          />
          {false && <MyText color={"red"}>Something err</MyText>}
        </YStack>

        {/* ------time and date section ---------- */}

        <XStack mb={scale(20)} borderColor={"red"} gap={scale(20)}>
          <YStack flex={1} gap={scale(10)}>
            <MyText>Date</MyText>
            <DateTimePickerComponent
              mode="date"
              onChangeDate={handleDateChange}
            />
          </YStack>
          <YStack flex={1} gap={scale(10)}>
            <MyText>Time</MyText>
            <DateTimePickerComponent
              mode="time"
              onChangeDate={handleDateChange}
            />
          </YStack>
        </XStack>

        {/* ----------amount------- */}
        <YStack
          width="100%"
          gap={scale(10)}
          //   borderWidth={1}
          borderColor={"white"}
          mb={scale(20)}
        >
          <MyText color={"$textPrimary"} fontSize={scale(16)}>
            Enter Amount
          </MyText>

          <Input
            placeholderTextColor={"$textSecondary"}
            focusStyle={{ borderColor: theme.accentYellow }}
            // value={}
            // onChangeText={(text) => handleChange("email", text)}
            htmlFor="email"
            bg={"transparent"}
            placeholder="Enter expense amount"
            width="100%"
            height={scale(50)}
            rounded={scale(8)}
            borderWidth={scale(1.5)}
            borderColor={false ? "red" : "$borderPrimary"}
            style={{
              fontFamily: "MPlusRounded500",
              fontSize: scale(14),
              color: theme.textPrimary.val,
            }}
          />
          {false && <MyText color={"red"}>Something err</MyText>}
        </YStack>

        <Form.Trigger asChild>
          <Button
            // width="100%"
            bg={"$accentYellow"}
            size="$4"
            // onPress={() => {
            //   const isValid = validateForm();
            //   setHasSubmitted(true);

            //   if (isValid) {
            //     mutate(signInForm);
            //   }
            // }}
            // disabled={isPending}
            // opacity={isPending ? 0.7 : 1}
          >
            <MyText color={"$accentBlack"}>Create Split</MyText>

            {false && <Spinner size="small" color="$white1" />}
          </Button>
        </Form.Trigger>
      </Form>
    </YStack>
  );
};
export default AddBillPage;

const styles = StyleSheet.create({});
