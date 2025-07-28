// DateTimePickerComponent.js
import React, { useState } from "react";
import { View, Text, Button, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

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
    <View style={styles.container}>
      <Text style={styles.label}>
        {mode === "date" ? "Selected Date:" : "Selected Time:"}
      </Text>
      <Text style={styles.value}>
        {mode === "date"
          ? date.toLocaleDateString()
          : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </Text>

      <Button title={`Pick ${mode}`} onPress={showMode} />

      {showPicker && (
        <DateTimePicker
          value={date}
          mode={mode}
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 20 },
  label: { fontSize: 16, fontWeight: "bold" },
  value: { fontSize: 18, marginVertical: 10 },
});

export default DateTimePickerComponent;
