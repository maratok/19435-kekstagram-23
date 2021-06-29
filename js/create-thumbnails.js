import {arrayPhotos} from '../js/create-array-photos.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photoFragment = document.createDocumentFragment();

arrayPhotos.forEach((photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoFragment.appendChild(pictureElement);
});

picturesContainer.appendChild(photoFragment);

export {picturesContainer};
