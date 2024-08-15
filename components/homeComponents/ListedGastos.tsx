import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { GastoContext, GastoContextType } from '../MoneyProvaider';
import Svg, { Circle } from 'react-native-svg';
import { getSegmentColor } from '../../functions/SegmentColor';
import { formatText } from '../../functions/numberTextFixed';

interface listGasto {
  money: string;
  category: string;
  porcentaje: number;
  date?: Date;
}

interface ListedGastosProps {
  gastos: listGasto [];
}





const ListedGastos: React.FC<ListedGastosProps> = ({ gastos }) => {
  const sortedGastos = gastos.sort((a, b) => parseInt(b.money) - parseInt(a.money));

  return (
    <View>
      <View style={styles.container}>
        {sortedGastos.map((gasto, index) => {
          return (
            <View style={styles.gasto} key={index}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Svg height="50" width="50" style={styles.circle}>
                  <Circle
                    cx="25"
                    cy="25"
                    r="20"
                    stroke={getSegmentColor(index)}
                    strokeWidth="2.5"
                    fill="none"
                    strokeDasharray={`${(gasto.porcentaje / 100) * 2 * Math.PI * 20} ${2 * Math.PI * 20}`}
                    strokeDashoffset={0}
                    rotation={-90}
                    origin="25, 25"
                  />
                  <Text style={styles.circleText}>{gasto.porcentaje.toFixed(1)}%</Text>
                </Svg>  
                <Text>${formatText(gasto.money)}</Text>
              </View>
              <View style={styles.dateAndCategory}>
                <Text>{gasto.date?.toLocaleDateString('es-MX')}</Text>
                <Text>{gasto.category}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ListedGastos;

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: 'gray',
    width: '95%',
    gap: 8,
    padding: 12,
    paddingHorizontal: 15,
  },
  gasto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  dateAndCategory:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    alignItems: 'center',
  },
  circle: {
    marginRight: 10,
  },
  circleText: {
    position: 'absolute',
    textAlign: 'center',
    width: 50,
    top: 15,
  },
});


