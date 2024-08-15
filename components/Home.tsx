import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, Pressable, ScrollView, Modal } from 'react-native';
import DrawerButton from './DrawerButton';
import TotalCircle from './TotalCircle';
import { GastoContext, GastoContextType } from './MoneyProvaider';
import ListedGastos from './homeComponents/ListedGastos';
import GastoForm from './GastoForm';
import ModalForm from './homeComponents/ModalForm';

const Home = () => {
  const [datailed, setDetailed] = useState<boolean>(true);
  const [mountOrYear, setMountOrYear] = useState<boolean>(false); // true = mount
  const [data, setData] = useState<Gasto[]>([]);
  const { total, combineMoney, combineGastos, listedGastos, getGastosLastMonth, getGastosLastYear } = useContext(GastoContext) as GastoContextType;

  useEffect(() => {
    const getData = () => {
      if (mountOrYear) {
        const gastos =  getGastosLastMonth();
        setData(gastos);
      } else {
        const gastos =  getGastosLastYear();
        setData(gastos);
      }
    };

    getData();
  }, [mountOrYear,total]);


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <ScrollView contentContainerStyle={styles.container}>

        <DrawerButton style={styles.drawerButton}>Menu</DrawerButton>

        <View style={{ alignItems: 'center' }}>
          <View style={{ flexDirection:'row', gap:25, alignItems:'center'}}>
            <Pressable style={styles.tryButton} onPress={() => setDetailed(!datailed)}>
              <Text>{datailed ? 'Mostrar Detalles' : 'Mostrar Resumen'}</Text>
            </Pressable>

            <TotalCircle values={datailed ? (combineMoney(data)):(listedGastos(data).map(gasto => parseInt(gasto.money)))}>{total(data).toString()}</TotalCircle>


            <Pressable style={styles.tryButton} onPress={() => setMountOrYear(!mountOrYear)}>
              <Text>{mountOrYear ?  'Mostrar total': 'Mostrar ultimo mes'}</Text>
            </Pressable>
          </View>

          <ListedGastos gastos={datailed ? (combineGastos(data)):(listedGastos(data))} />
        </View>
        

      </ScrollView>
      <ModalForm/>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    padding: 2,
    justifyContent: 'space-evenly',
    gap: 10,
  },
  drawerButton: {
    alignItems: 'flex-start',
  },
  toggleButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  tryButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
