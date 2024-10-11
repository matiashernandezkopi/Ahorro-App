import React, { createContext, useState, ReactNode } from 'react';



export interface GastoContextType {
  categorys: string[];
  newCategory: (newCategory: string) => void;
  gastos: Gasto[];
  deleteGasto: (id: number) => void;
  editGasto: (editedGasto: Gasto) => void;
  newGasto: (newGasto: Gasto) => void;
  promedio: () => number;
  total: (gastos: Gasto[]) => number;
  listedGastos: (gastos: Gasto[]) => { category: string; money: string; porcentaje: number; date: Date }[];
  combineGastos: (gastos: Gasto[]) => { category: string; money: string; porcentaje: number }[];
  combineMoney: (gastos: Gasto[]) => number[];
  getGastosLastMonth: () => Gasto[];
  getGastosLastYear: () => Gasto[];
}

export const GastoContext = createContext<GastoContextType | undefined>(undefined);

export const GastoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categorys, setCategorys] = useState<string[]>(['Impuestos', 'Comida', 'Varios', 'Transporte', 'Entretenimiento']);

  const newCategory = (newCategory: string) => {
    setCategorys(prev => [...prev, newCategory]);
  }

  const [gastos, setGastos] = useState<Gasto[]>([
    { id: 0, money: '25', priority: 5, description: 'optional', category: 'Impuestos', date: new Date(2023, 4, 20) },
    { id: 1, money: '900', priority: 7, category: 'Comida', date: new Date(2024, 4, 19) },
    { id: 2, money: '90', priority: 9, category: 'Comida', date: new Date() },
    { id: 3, money: '90', priority: 1, category: 'Comida', date: new Date(2024, 8, 17) },
    { id: 4, money: '90', priority: 2, category: 'Comida', date: new Date(2024, 8, 17) },
    { id: 5, money: '90', priority: 3, category: 'Comida', date: new Date(2024, 8, 17) },
    { id: 6, money: '90', priority: 4, category: 'Comida', date: new Date(2024, 8, 17) },
    { id: 7, money: '90', priority: 5, category: 'Comida', date: new Date(2024, 8, 17) }
  ]);

  const getGastosLastMonth = () => {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    return gastos.filter(gasto => gasto.date >= lastMonth);
  }

  const getGastosLastYear = () => {
    const today = new Date();
    const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    return gastos.filter(gasto => gasto.date >= lastYear);
  }

  const deleteGasto = (id: number) => {
    setGastos(prev => prev.filter(gasto => gasto.id !== id));
  };

  const editGasto = (editedGasto: Gasto) => {
    setGastos(prev => prev.map(gasto => (gasto.id === editedGasto.id ? editedGasto : gasto)));
  };

  const newGasto = (newGasto: Gasto) => {
    setGastos(prev => [...prev, newGasto]);
  }

  const promedio = () => {
    const totalAmount = gastos.reduce((acc, current) => acc + parseFloat(current.money), 0);
    return totalAmount / gastos.length;
  }

  const total = (gastos: Gasto[]): number => {
    // Calcula el total sumando todos los valores de dinero
    return gastos.reduce((acc, current) => acc + parseFloat(current.money.replace(',', '.')), 0);
  };
  
  const listedGastos = (gastos: Gasto[]) => {
    const totalMoney = total(gastos);

    return gastos.map(gasto => ({
      category: gasto.category,
      money: gasto.money,
      porcentaje: parseFloat(((parseFloat(gasto.money) / totalMoney) * 100).toFixed(1)),
      date: gasto.date
    }));
  };

  const combineMoney = (gastos: Gasto[]): number[] => {
    const combined: { [category: string]: number } = {};
  
    gastos.forEach(gasto => {
      const { money, category } = gasto;
      if (combined[category]) {
        combined[category] += parseFloat(money);
      } else {
        combined[category] = parseFloat(money);
      }
    });
  
    // Extraer solo los valores de dinero combinados como números
    return Object.values(combined);
  };

  const combineGastos = (gastos: Gasto[]) => {
    const combined: { [category: string]: number } = {};
  
    // Agrupar gastos por categoría
    gastos.forEach(gasto => {
      const { money, category } = gasto;
      // Convertir el monto a número flotante y acumularlo en la categoría correspondiente
      if (combined[category]) {
        combined[category] += parseFloat(money.replace(',', '.'));
      } else {
        combined[category] = parseFloat(money.replace(',', '.'));
      }
    });
  
    // Calcular el total combinado de dinero
    const totalMoney = Object.values(combined).reduce((sum, money) => sum + money, 0);
  
    // Transformar el objeto combinado en un array con el formato requerido
    return Object.entries(combined).map(([category, money]) => ({
      category,
      money: money.toFixed(2), // Formatear el monto a dos decimales
      porcentaje: parseFloat(((money / totalMoney) * 100).toFixed(1)), // Calcular el porcentaje
    }));
  };
  

  return (
    <GastoContext.Provider value={{ categorys, getGastosLastMonth, getGastosLastYear, newCategory, gastos, deleteGasto, editGasto, newGasto, promedio, listedGastos, combineGastos, total, combineMoney }}>
      {children}
    </GastoContext.Provider>
  );
};
