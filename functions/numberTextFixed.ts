export const formatText = (money: string): string => {
    // Reemplazar comas por puntos para asegurar que el formato decimal sea correcto
    const normalizedMoney = money.replace(',', '.');
  
    // Convertir a número flotante
    const amount = parseFloat(normalizedMoney);
  
    // Si el valor no es un número válido, retornar un valor por defecto
    if (isNaN(amount)) return '0.00';
  
    // Formatear a dos decimales y añadir separador de miles
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  