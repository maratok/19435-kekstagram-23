import {randomNumber} from '../js/utils.js';
import {MIN_LIKES, MAX_LIKES, MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR, COMMENT_COUNT, arrayMessage, arrayNames} from '../js/data.js';

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

export {getArrayPhotos};
