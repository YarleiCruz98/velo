export function generateOrderNumber() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
  
    const RandomLetter = () => letras[Math.floor(Math.random() * letras.length)];
    const RandomNumber = () => numeros[Math.floor(Math.random() * numeros.length)];
  
    const orderNumber =
      'VLO-' +
      RandomLetter() +
      RandomNumber() +
      RandomNumber() +
      RandomLetter() +
      RandomLetter() +
      RandomLetter();
  
    return orderNumber;
  }