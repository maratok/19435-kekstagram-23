import {arrayPhotos} from '../js/create-array-photos.js';
import {isEscEvent} from '../js/utils.js';
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photoFragment = document.createDocumentFragment();

//блок создания миниатюр с обработчиком большой картинки
const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');

arrayPhotos.forEach((photo) => {
  //Создание миниатюры
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoFragment.appendChild(pictureElement);

  //Функции открытия большой картинки
  const bigPictureShowHandler = () => {
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    const commentsLength = photo.comments.length;
    const bigPictireImg = bigPicture.querySelector('.big-picture__img');
    bigPictireImg.children[0].src = photo.url;
    const bigPictireLikes = bigPicture.querySelector('.likes-count');
    bigPictireLikes.textContent = photo.likes;
    const bigPictureCommentsLength = bigPicture.querySelector('.comments-count');
    bigPictureCommentsLength.textContent = commentsLength;
    const bigPictureDescription = bigPicture.querySelector('.social__caption');
    bigPictureDescription.textContent = photo.description;
    const bigPictureComments = bigPicture.querySelector('.social__comments');
    const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader');
    commentsLoaderButton.classList.remove('hidden');
    const pictureCommentCount = document.querySelector('.social__comment-count');
    const closePopup = document.querySelector('.big-picture__cancel');
    let countShowComments = 5;

    //Создание блока комментариев
    const createCommentBigPicture = function (photoComments, count) {
      const commentElements = document.createDocumentFragment();
      for(let i = 0; i < count; i++){
        const array = photoComments.comments;
        const li = document.createElement('li');
        li.classList.add('social__comment');
        const img = document.createElement('img');
        img.classList.add('social__picture');
        const p = document.createElement('p');
        p.classList.add('social__text');

        img.src = array[i].avatar;
        img.alt = array[i].name;
        img.width = '35';
        img.height = '35';

        p.textContent = array[i].message;

        li.appendChild(img);
        li.appendChild(p);
        commentElements.appendChild(li);
      }
      return commentElements;
    };

    const showComments = function(count){
      bigPictureComments.textContent = '';
      bigPictureComments.appendChild(createCommentBigPicture(photo, count));
    };
    const showCountComments = function(allComments){
      pictureCommentCount.textContent = '';
      const countShowCommentsNow = document.querySelectorAll('.social__comment').length;
      pictureCommentCount.insertAdjacentHTML('afterbegin', `${countShowCommentsNow} из <span class="comments-count">${allComments}</span> комментариев`);
    };

    const commentsLoadHandler = () => {
      commentsLoaderButton.classList.remove('hidden');
      countShowComments += 5;
      if(countShowComments > commentsLength){
        showComments(commentsLength);
        showCountComments(commentsLength);
        if(commentsLength === commentsLength){
          commentsLoaderButton.classList.add('hidden');
        }
      } else  {
        showComments(countShowComments);
        showCountComments(commentsLength);
      }
    };

    showComments(countShowComments);
    showCountComments(commentsLength);

    commentsLoaderButton.addEventListener('click', commentsLoadHandler);

    const hidePopup = () => {
      body.classList.remove('modal-open');
      bigPicture.classList.add('hidden');
      bigPictureComments.innerHTML = '';
      commentsLoaderButton.removeEventListener('click', commentsLoadHandler);
    };

    const buttonClickHandler = (evt) => {
      evt.preventDefault();
      hidePopup();
    };
    const buttonKeydownHandler = (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        hidePopup();
        document.removeEventListener('keydown', buttonKeydownHandler);
      }
    };

    closePopup.addEventListener('click', buttonClickHandler);
    document.addEventListener('keydown', buttonKeydownHandler);
  };
  //Обработчик на открытие большой картинки
  pictureElement.addEventListener('click', bigPictureShowHandler);
});

picturesContainer.appendChild(photoFragment);

export {picturesContainer};
