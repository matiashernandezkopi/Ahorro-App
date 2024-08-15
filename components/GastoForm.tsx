import { StyleSheet, Text, TextInput, View, TouchableOpacity, Button, Platform, Pressable } from 'react-native';
import React, { useContext, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GastoContext, GastoContextType } from './MoneyProvaider';
import { formatText } from '../functions/numberTextFixed';


interface GastoFormProps{
  close: () => void;
}

const GastoForm:React.FC<GastoFormProps> = ({close}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);
  const [openCategorySelector,setOpenCategorySelector] = useState<boolean>(false);
  const [Gasto, setGasto] = useState<Gasto>({
    id: Date.now(),
    money: '0.00',
    priority: 5,
    description: '',
    category: 'Varios',
    date: date,
  });

  const { newGasto, categorys, newCategory, total, gastos } = useContext(GastoContext) as GastoContextType;

  const priorities = [ 1, 2, 3, 4, 5, 6, 7, 8, 9] 

  const handleChanges = (change: string, value: string) => {
    
    switch (change) {
      case 'money':
      if (value === '') {
        setGasto(prev => ({ ...prev, [change]: '0,00' }));
        break;
      }

      // Reemplazar comas por puntos y eliminar caracteres no numéricos
      let cleanedValue = value.replace(/,/g, '.');
      cleanedValue = cleanedValue.replace(/\D/g, '');

      // Eliminar ceros a la izquierda
      cleanedValue = cleanedValue.replace(/^0+/, '');

      // Agregar un punto antes de los dos últimos dígitos
      let formattedValue;
      if (cleanedValue.length > 2) {
        formattedValue = cleanedValue.slice(0, -2) + '.' + cleanedValue.slice(-2);
      } else {
        formattedValue = '0.' + cleanedValue.padStart(2, '0');
      }

      // Reemplazar el punto decimal por una coma
      formattedValue = formattedValue.replace('.', ',');

      // Actualizar el estado con el valor formateado
      setGasto(prev => ({ ...prev, [change]: formattedValue }));
      break;
  
      case 'priority':
        if (value === '') {
          setGasto(prev => ({ ...prev, [change]: 0 }));
          break;
        }
        const priorityValue = parseFloat(value);
        if (!isNaN(priorityValue)) {
          setGasto(prev => ({ ...prev, [change]: priorityValue }));
        } else {
          console.error('Valor de prioridad no válido:', value);
        }
        break;
  
      case 'description':
      case 'category':
        setGasto(prev => ({ ...prev, [change]: value }));
        break;
  
      default:
        console.warn('Cambio desconocido:', change);
        break;
    }
  };
  
  
  
  const onChange = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      setGasto(prev => ({ ...prev, date: selectedDate }));
    }
  };

  const handleSaveGasto = () => {
    if (parseInt(Gasto.money) > 0 && Gasto.category) {
      newGasto(Gasto); 
      close()
      setGasto({
        id: Date.now(),
        money: '0.00',
        priority: 5,
        description: '',
        category: '',
        date: new Date(),
      });
      setShow(false);
    }else{
      alert('Debes ingresar un monto')
    }
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems:'center',marginBottom:10}}>
        <Text style={styles.fontedText}>Monto</Text>
        <View style={[{alignItems:'center',flexDirection:'row',}]}>
          
          <Text style={{fontSize:23}}>$</Text>
          <TextInput
            style={{fontSize:28}}
            value={Gasto.money.toString()}
            onChangeText={(text) => handleChanges('money', text)}
            keyboardType='numeric'
            maxLength={20} 
          />

          
        </View>
        <Text style={styles.fontedText}>Total: ${formatText((total(gastos) + parseFloat(Gasto.money.replace(',','.'))).toString())}</Text>
      </View>

      <View style={styles.selectorContainer}>
        {openCategorySelector && (
          <View style={styles.categoryList}>
            <TouchableOpacity
              style={[styles.categoryItem,{alignItems: 'center', paddingTop: 0}]}
              onPress={() => {
                setOpenCategorySelector(false);
              }}
            >
              <Text style={styles.categoryText}>{Gasto.category}</Text>
            </TouchableOpacity>

            {categorys.map((cat, index) => {
              if (cat===Gasto.category) {
                return
              }
              
              return(
              <TouchableOpacity
                  key={index}
                  style={styles.categoryItem}
                  onPress={() => {
                    setGasto(prev => ({ ...prev, category: cat }));
                    setOpenCategorySelector(false);
                  }}
                >
                  <Text style={styles.categoryText}>{cat}</Text>
                </TouchableOpacity>)
              }
            
            )}
            <TouchableOpacity style={styles.addButton} onPress={() => newCategory('aaaadsdaa')}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => setOpenCategorySelector(!openCategorySelector)}
        >
          <Text style={styles.selectedCategoryText}>{Gasto.category}</Text>
        </TouchableOpacity>
      </View>


      <Text>Prioridad</Text>
      
      
      <View style={{justifyContent:'space-between',flexDirection:'row',gap:2}}>
        {priorities.map((priority) => (
          <TouchableOpacity
            key={priority}
            onPress={() => handleChanges('priority', priority.toString())}
          >
            <Text style={[styles.prioriti,(priority > 4 ? {fontSize: (priority*5)} : {fontSize: (45-priority*5)}) ,priority===Gasto.priority && styles.selectedPrioriti]}> {priority < 4 ? '<' : priority === 5 ? '|' : '>'}</Text>


          </TouchableOpacity>
        ))}
      </View>

      <Text>Descripcion</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Descripción del gasto (opcional)"
        value={Gasto.description}
        onChangeText={(text) => handleChanges('description', text)}
        multiline={true}
        numberOfLines={4}
      />


      <TouchableOpacity onPress={()=>setShow(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>{date.toLocaleDateString('es-MX')}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()} // Opcional: establece una fecha máxima
        />
      )}

      <TouchableOpacity onPress={handleSaveGasto} style={styles.saveButton}>
        <Text>Agregar Gasto</Text>
      </TouchableOpacity>
    </View>
  );
};


export default GastoForm;


const styles = StyleSheet.create({
  prioriti: {
    fontSize: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 40,
    height: 40,
    transform: [{ rotate: '-90deg' }],
    color: '#ddd',
    
  },
  selectedPrioriti: {
    color: 'black',
  },
  fontedText:{
    fontSize:18
  },
  container: {
    padding: 20,
  }, 
  textarea: {
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  dateText: {
    fontSize: 18,
    color: 'blue',
  },
  saveButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  selectorContainer: {
    margin: 10,
  },
  categoryList: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    position:'absolute',
    zIndex:5,
    elevation:5,
    width: '100%',
  },
  categoryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  selectorButton: {
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedCategoryText: {
    fontSize: 16,
    color: 'white',
  },
});