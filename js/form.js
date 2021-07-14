import {isEscEvent, countLetters} from './utils.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadFile = form.querySelector('#upload-file');
const imgOverlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('#upload-cancel');
const submitButton = form.querySelector('.img-upload__submit');

uploadFile.addEventListener('change', ()=> {
  imgOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
});

//Закрытие на крестик
closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  body.classList.remove('modal-open');
  imgOverlay.classList.add('hidden');
  form.reset();
});


//Обрабочтик на клик кнопки Esc
document.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    body.classList.remove('modal-open');
    imgOverlay.classList.add('hidden');
    form.reset();
  }
});

//Валидация
const checkHashTags = function () {
  const hashtagsInput = form.hashtags.value;
  if(!hashtagsInput){
    form.hashtags.setCustomValidity('');
    return true;
  }
  const hashtagsArray = hashtagsInput.split(' ');
  if (hashtagsArray.length > 5) {
    form.hashtags.setCustomValidity('Максимум 5 хэш-тэгов.');
    return false;
  }

  for (let i = 0; i < hashtagsArray.length; i++){
    const hashtag = hashtagsArray[i];
    if(!hashtag.startsWith('#')){
      form.hashtags.setCustomValidity('Хэш-тэг должен начинаться с #');
      return false;
    }
    if(hashtag.length < 2){
      form.hashtags.setCustomValidity('Хэш-тэг не может содержать 1 символа');
      return false;
    }
    if(!countLetters(hashtag, 20)){
      form.hashtags.setCustomValidity('Хэш-тэг не может содержать больше 20 символов');
      return false;
    }
    if(!hashtag.match(/^#[a-zа-я0-9]+$/)){
      form.hashtags.setCustomValidity('Хэш-тэг должен содержать буквы и числа');
      return false;
    }
    if(hashtagsArray.slice(0, i).includes(hashtag)){
      form.hashtags.setCustomValidity('Хэш-тэг не должен повторяться');
      return false;
    }
  }
  form.hashtags.setCustomValidity('');
  return true;
};

form.hashtags.addEventListener('keydown', (evt)=> evt.stopPropagation());
form.description.addEventListener('keydown', (evt)=> evt.stopPropagation());

submitButton.addEventListener('click', checkHashTags);


