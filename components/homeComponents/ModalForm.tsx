import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import GastoForm from '../GastoForm'

const ModalForm = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <View style={{alignItems:'center',padding:5}}>
      <Pressable style={styles.toggleButton} onPress={() => setModalVisible(true)}>
          <Text style={{fontSize: 24}}>Nuevo Gasto</Text>
        </Pressable>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <GastoForm close={() => setModalVisible(false)}/>
              <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        
    </View>
  )
}

export default ModalForm

const styles = StyleSheet.create({
    toggleButton: {
      backgroundColor: 'lightblue',
      padding: 10,
      borderRadius: 10,
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    closeButton: {
      backgroundColor: 'gray',
      padding: 10,
      borderRadius: 10,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
})