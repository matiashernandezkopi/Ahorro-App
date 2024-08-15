import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, Pressable, ViewStyle } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';


interface DrawerButtonProps{
    children?: React.ReactNode;  // child component or text to be displayed in button
    style?: ViewStyle; 
}



const DrawerButton:React.FC<DrawerButtonProps> = ({ children,style })=> {
  const navigation = useNavigation();

  return (
    <View  style={style}>
        <Pressable 
          style={styles.button} 
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
            <Text style={styles.buttonText}>{children?(children):('Open Drawer')}</Text>
        </Pressable>
    </View>
  );
};

export default DrawerButton;


const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
