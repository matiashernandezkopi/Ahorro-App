import { Pressable, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { formatText } from '../../functions/numberTextFixed';
import { GastoContext, GastoContextType } from '../MoneyProvaider';

interface Prioridad {
  text: string;
  color: string;
}

interface ListedGastosProps {
  gastos: Gasto[];
}

const ListedHistory: React.FC<ListedGastosProps> = ({ gastos }) => {
  const [order, setOrder] = useState<string>('date');
  const [orderSelector, setOrderSelector] = useState<boolean>(false);

  const Orders = ['date', 'priority', 'money'];

  const [sortedGastos, setSortedGastos] = useState<Gasto[]>([]);

  // Lista de prioridades con colores asociados
  const prioridades: Prioridad[] = [
    { text: 'Innecesario', color: 'darkred' },
    { text: 'Muy Baja', color: 'red' },
    { text: 'Algo Baja', color: 'salmon' },
    { text: 'Baja', color: 'lightcoral' },
    { text: 'Normal', color: 'withe' },
    { text: 'Alta', color: 'lightblue' },
    { text: 'Algo Alta', color: 'skyblue' },
    { text: 'Muy Alta', color: 'royalblue' },
    { text: 'Indispensable', color: 'blue' },
  ];

  const { deleteGasto } = useContext(GastoContext) as GastoContextType;

  const getOrderText = (order: string) => {
    switch (order) {
      case 'priority': return 'Prioridad';
      case 'money': return 'Importe';
      case 'date': return 'Fecha';
      default: return '';
    }
  };

  useEffect(() => {
    const sortGastos = () => {
      const sorted = [...gastos].sort((a, b) => {
        switch (order) {
          case 'money': return parseFloat(b.money.replace(',', '.')) - parseFloat(a.money.replace(',', '.'));
          case 'priority': return b.priority - a.priority;
          case 'date': return b.date.getTime() - a.date.getTime();
          default: return 0;
        }
      });
      setSortedGastos(sorted);
    };

    sortGastos();
  }, [order, gastos]);

  return (
    <View style={styles.container}>
      <View style={styles.orderContainer}>
        {orderSelector && (
          <View style={styles.orderSelector}>
            <TouchableOpacity
              style={styles.orderButton}
              onPress={() => setOrderSelector(false)}
            >
              <Text>{getOrderText(order)}</Text>
            </TouchableOpacity>

            {Orders.map((ord, index) => ord !== order && (
              <TouchableOpacity
                key={index}
                style={styles.orderButton}
                onPress={() => {
                  setOrder(ord);
                  setOrderSelector(false);
                }}
              >
                <Text>{getOrderText(ord)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => setOrderSelector(!orderSelector)}
        >
          <Text>{orderSelector ? 'Cancelar' : getOrderText(order)}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {sortedGastos.map((gasto) => (
          <View style={styles.gasto} key={gasto.id}>
            <View style={styles.dateAndCategory}>
              <Text style={{ color: prioridades[gasto.priority-1].color }}>
                Prioridad: {prioridades[gasto.priority - 1].text}
              </Text>
              <Text>{gasto.category}</Text>
              <Text>{gasto.date.toLocaleDateString('es-MX')}</Text>
            </View>

            <Text style={styles.moneyText}>${formatText(gasto.money).replace(',', '.')}</Text>

            {gasto.description && (
              <View style={styles.descripcion}>
                <Text>Descripcion: {gasto.description}</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteGasto(gasto.id)}
            >
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ListedHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Asegura que el contenedor principal ocupe toda la pantalla
    
    paddingHorizontal: 5,
  },
  orderContainer: {
    padding: 10,
  },
  orderSelector: {
    marginBottom: 10,
  },
  orderButton: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'lightgray',
    marginVertical: 5,
    borderRadius: 5,
  },
  scrollContainer: {
    flexGrow: 1, // Permite que el ScrollView crezca
    gap: 8,
    paddingVertical: 10,
  },
  gasto: {
    backgroundColor: 'lightgray',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  dateAndCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  moneyText: {
    fontSize: 20,
  },
  descripcion: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
  },
});
