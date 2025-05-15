import React from "react";
import { View, StyleSheet } from "react-native";
import { List, Button, Avatar } from "react-native-paper";

export default function ContactItem({ contact, onEdit, onDelete }) {
  return (
    <List.Item
      title={contact.name}
      description={`${contact.phone} - ${contact.category}`}
      left={() => (
        <Avatar.Text
          size={40}
          label={contact.name[0]}
          style={{ backgroundColor: "#7209b7" }}
        />
      )}
      right={() => (
        <View style={styles.taskButtons}>
          <Button icon="pencil" onPress={onEdit} compact />
          <Button icon="delete" onPress={onDelete} compact />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  taskButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
});