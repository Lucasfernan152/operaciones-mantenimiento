export const getTimeStamp =(timestamp: any) =>{
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  
  return date.toLocaleDateString('es-es')

}
  