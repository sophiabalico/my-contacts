import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FAB, Avatar } from "react-native-paper";

export default function HomeScreen() {
  const [contacts, setContacts] = useState([]); // Lista de contatos
  const [modalVisible, setModalVisible] = useState(false); // Modal visível ou não
  const [newContact, setNewContact] = useState({ name: "", phone: "", category: "" }); // Dados do novo contato
  const [editIndex, setEditIndex] = useState(null); // Índice do contato em edição

  // Função para adicionar ou editar contato
  function addOrEditContact() {
    if (!newContact.name.trim() || !newContact.phone.trim() || !newContact.category.trim()) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    const updatedContacts = [...contacts];
    if (editIndex === null) {
      updatedContacts.push(newContact); // Adiciona um novo contato
    } else {
      updatedContacts[editIndex] = newContact; // Edita o contato existente
      setEditIndex(null);
    }

    setContacts(updatedContacts); // Atualiza a lista de contatos
    setNewContact({ name: "", phone: "", category: "" }); // Limpa os campos
    setModalVisible(false); // Fecha o modal
  }

  // Função para confirmar exclusão de contato
  function confirmDelete(index) {
    Alert.alert("Excluir contato?", `Remover "${contacts[index].name}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          const updatedContacts = contacts.filter((_, i) => i !== index); // Remove o contato pelo índice
          setContacts(updatedContacts); // Atualiza a lista de contatos
        },
      },
    ]);
  }

  // Função para abrir o modal em modo de edição
  function openEditModal(index) {
    setNewContact(contacts[index]); // Carrega os dados do contato no formulário
    setEditIndex(index); // Define o índice do contato a ser editado
    setModalVisible(true); // Abre o modal
  }

  return (
    <View style={styles.container}>
      {/* Lista de contatos */}
      <FlatList
        data={contacts}
        keyExtractor={(_, i) => String(i)} // Identificador único para cada item
        renderItem={({ item, index }) => (
          <View style={styles.taskItemContainer}>
            {/* Ícone com a inicial do nome do contato */}
            <Avatar.Text
              size={40}
              label={item.name[0]} // Exibe a inicial do nome
              style={{ backgroundColor: "#7209b7", marginRight: 10 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.taskItem}>{item.name}</Text>
              <Text style={styles.taskSubItem}>{item.phone}</Text>
              <Text style={styles.taskSubItem}>{item.category}</Text>
            </View>
            <View style={styles.taskButtons}>
              {/* Botões para editar e excluir */}
              <Text
                onPress={() => openEditModal(index)} // Abre o modal para editar
                style={[styles.taskButton, styles.editButton]}
              >
                ✏️
              </Text>
              <Text
                onPress={() => confirmDelete(index)} // Exclui o contato
                style={[styles.taskButton, styles.deleteButton]}
              >
                🗑️
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum contato ainda!</Text>
        }
      />

      {/* Botão flutuante para adicionar contato */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          setNewContact({ name: "", phone: "", category: "" });
          setEditIndex(null);
          setModalVisible(true);
        }}
      />

      {/* Modal para adicionar ou editar contato */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={{ marginBottom: 8 }}>
              {editIndex === null
                ? "Digite os dados do novo contato:"
                : "Edite os dados do contato:"}
            </Text>
            <TextInput
              value={newContact.name} // Valor do campo de texto é controlado pelo estado `newContact`
              onChangeText={(text) => setNewContact({ ...newContact, name: text })}
              placeholder="Nome"
              style={styles.input}
            />
            <TextInput
              value={newContact.phone}
              onChangeText={(text) => setNewContact({ ...newContact, phone: text })}
              placeholder="Telefone"
              keyboardType="phone-pad"
              style={styles.input}
            />
            <View style={styles.categoryContainer}>
              {["Trabalho", "Família", "Pessoal"].map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    newContact.category === category && styles.categoryButtonSelected,
                  ]}
                  onPress={() => setNewContact({ ...newContact, category })}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      newContact.category === category && styles.categoryButtonTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text
              onPress={addOrEditContact}
              style={{ color: "#7209b7", textAlign: "center", marginBottom: 8 }}
            >
              {editIndex === null ? "Adicionar" : "Salvar alterações"}
            </Text>
            <Text
              onPress={() => setModalVisible(false)}
              style={{ color: "#999", textAlign: "center" }}
            >
              Cancelar
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#7209b7",
  },
  taskItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 6,
  },
  taskItem: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskSubItem: {
    fontSize: 14,
    color: "#666",
  },
  taskButtons: {
    flexDirection: "row",
  },
  taskButton: {
    marginLeft: 8,
    padding: 6,
    borderRadius: 4,
  },
  editButton: {
    color: "#7209b7",
  },
  deleteButton: {
    color: "#ff0000",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    color: "#666",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  categoryButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    alignItems: "center",
  },
  categoryButtonSelected: {
    backgroundColor: "#7209b7",
    borderColor: "#7209b7",
  },
  categoryButtonText: {
    color: "#000",
  },
  categoryButtonTextSelected: {
    color: "#fff",
  },
});