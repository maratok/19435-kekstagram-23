import {arrayPhotos} from '../js/create-array-photos.js';

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

  //Обработчик на открытие большой картинки
  pictureElement.addEventListener('click', () => {

    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    const bigPictireImg = bigPicture.querySelector('.big-picture__img');
    bigPictireImg.children[0].src = photo.url;
    const bigPictireLikes = bigPicture.querySelector('.likes-count');
    bigPictireLikes.textContent = photo.likes;
    const bigPictureCommentsLength = bigPicture.querySelector('.comments-count');
    bigPictureCommentsLength.textContent = photo.comments.length;
    const bigPictureDescription = bigPicture.querySelector('.social__caption');
    bigPictureDescription.textContent = photo.description;
    const bigPictureComments = bigPicture.querySelector('.social__comments');

    //Создание блока комментариев
    const createCommentBigPicture = function (photoComments) {
      const commentElements = document.createDocumentFragment();
      photoComments.comments.forEach((array) => {
        const li = document.createElement('li');
        li.classList.add('social__comment');
        const img = document.createElement('img');
        img.classList.add('social__picture');
        const p = document.createElement('p');
        p.classList.add('social__text');

        img.src = array.avatar;
        img.alt = array.name;
        img.width = '35';
        img.height = '35';

        p.textContent = array.message;

        li.appendChild(img);
        li.appendChild(p);
        commentElements.appendChild(li);
      });
      return commentElements;
    };
    const arrayComments = createCommentBigPicture(photo);
    bigPictureComments.appendChild(arrayComments);

    //Обрабочтик на клик кретика большой картинки
    const closePopup = document.querySelector('.big-picture__cancel');
    closePopup.addEventListener('click', (evt) => {
      evt.preventDefault();
      body.classList.remove('modal-open');
      bigPicture.classList.add('hidden');
    });
    //Обрабочтик на клик кнопки Esc во время открытой большой картинки
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        body.classList.remove('modal-open');
        bigPicture.classList.add('hidden');
      }
    });

    //Задание номер 3 в модуле 7 - задание 2. Временное
    const countComments = bigPicture.querySelector('.social__comment-count');
    const commentsLoader = bigPicture.querySelector('.comments-loader');
    countComments.classList.add('hidden');
    commentsLoader.classList.add('hidden');

  });
});

//добавления фрагмента с миниатюрами в элемент с классом ".pictures"
picturesContainer.appendChild(photoFragment);

export {picturesContainer};
