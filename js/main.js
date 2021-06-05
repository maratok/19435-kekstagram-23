//Функция выдачи рандомного числа.
const randomNumber = function (number1, number2) {
  if(number1 >= 0){
    if(number2 <= number1){
      return Math.round(Math.random() * number1) + number2 ;
    }
    // Функция взята с https://ru.stackoverflow.com/questions/863591/%D0%A1%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE%D0%B5-%D1%87%D0%B8%D1%81%D0%BB%D0%BE-%D0%BE%D1%82-1-%D0%B4%D0%BE-100
    return Math.round(Math.random() * number2) + number1 ;
  }
};
randomNumber(1,5);

//Функция проверки длины комментария
const countLetters = function(strick, maxLetters){
  const numberLetters =  strick.length;
  if(numberLetters <= maxLetters){
    return numberLetters;
  }
};

countLetters('Сюдакот', 140);
