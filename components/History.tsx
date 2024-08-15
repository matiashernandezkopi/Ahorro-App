import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import ListedHistory from './historyComponents/ListedHistory';
import { GastoContext, GastoContextType } from './MoneyProvaider';

const Historyal = () => {
  const { gastos } = useContext(GastoContext) as GastoContextType;

  return (
    <View style={styles.container}>
      <ListedHistory gastos={gastos} />
    </View>
  );
};

export default Historyal;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});
