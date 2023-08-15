export const getTimeStamp =(timestamp: any) =>{

    // Convierte el timestamp en un objeto Date
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  
  // Obtiene los componentes de la fecha (día, mes y año)
  const day = date.getDate();
  const month = date.getMonth() + 1; // Los meses en JavaScript están basados en 0
  const year = date.getFullYear();
  
  // Formatea la fecha en el formato deseado 'DD/MM/YYYY'
  const formattedDate = `${day}/${month}/${year}`;
  
  return formattedDate

}
  