// DateTimePickerComponent.js
import React, { useState } from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Stack, XStack } from "tamagui";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";

const DateTimePickerComponent = ({ mode = "date", onChangeDate }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
      onChangeDate?.(selectedDate);
    }
  };

  const showMode = () => {
    setShowPicker(true);
  };

  return (
    <>
      <Button
        bg={"transparent"}
        borderWidth={1}
        borderColor={"$borderPrimary"}
        onPress={showMode}
      >
        {mode === "date"
          ? date.toLocaleDateString()
          : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </Button>

      {/* <Button title={`Pick ${mode}`} onPress={showMode} /> */}

      {showPicker && (
        <DateTimePicker
          value={date}
          mode={mode}
          display="default"
          onChange={handleChange}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { borderWidth: 1, borderColor: "red" },
  label: { fontSize: 16, fontWeight: "bold" },
  value: { fontSize: 18, marginVertical: 10 },
});

export default DateTimePickerComponent;
