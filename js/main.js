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
//Начало модуля 4
const COUNT_PHOTOS = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_NUMBER_AVATAR = 1;
const MAX_NUMBER_AVATAR = 6;
const COMMENT_COUNT = 5;
const arrayMessage = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const arrayNames = [
  'Эмилия',
  'София',
  'Телепузик',
  'Барсик',
];

const getRandomArrayElement = (elements) => elements[randomNumber(0, elements.length - 1)];
const getRandomAvatar = () => `img/avatar-${ randomNumber(MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR)}.svg`;
const getPhotoMessages = function(){
  const numberComments = randomNumber(0,1);
  if(numberComments === 0){
    return getRandomArrayElement(arrayMessage);
  }
  return `${getRandomArrayElement(arrayMessage)} ${getRandomArrayElement(arrayMessage)}`;
};

const getComments = function(id) {
  const array = [];
  for(let jj = 0; jj < id; jj++){
    array[jj] = {
      id: jj+1,
      avatar: getRandomAvatar(),
      message: getPhotoMessages(),
      name: getRandomArrayElement(arrayNames),
    };
  }
  return array;
};

const getArrayPhotos = function(id){
  const array = [];
  for(let ii = 0; ii < id; ii++){
    array[ii] = {
      id: ii+1,
      url: `photos/'${ii+1}.jpg`,
      description: 'Крутое необычное изящное фото',
      likes: randomNumber(MIN_LIKES, MAX_LIKES),
      comments: getComments(COMMENT_COUNT),
    };
  }
  return array;
};

console.log(getArrayPhotos(COUNT_PHOTOS));
