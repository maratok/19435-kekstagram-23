import {arrayPhotos} from '../js/create-array-photos.js';

const bigPicture = document.querySelector('.big-picture');
const thumbnails = document.querySelectorAll('.picture');
const body = document.querySelector('body');

const closePopup = document.querySelector('.big-picture__cancel');
closePopup.addEventListener('click', (evt) => {
  evt.preventDefault();
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  }
});

for (const thumbnail of thumbnails) {
  thumbnail.onclick = () => {
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');

    console.log(thumbnail);

    const bigPictireImg = bigPicture.querySelector('.big-picture__img');
    bigPictireImg.children[0].src = thumbnail.children[0].src;
    const bigPictireLikes = bigPicture.querySelector('.likes-count');
    bigPictireLikes.textContent = thumbnail.children[1].children[1].innerText;
    const bigPictureCommentsLength = bigPicture.querySelector('.comments-count');
    bigPictureCommentsLength.textContent = thumbnail.children[1].children[0].innerText;
    const bigPictureDescription = bigPicture.querySelector('.social__caption');
    // Вот тут
    bigPictureDescription.textContent = thumbnail.description;
    const bigPictureComments = bigPicture.querySelector('.social__comments');

    const createCommentBigPicture = function (photo) {
      const commentElements = document.createDocumentFragment();
      photo.comments.forEach((array) => {
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
    const arrayComments = createCommentBigPicture(arrayPhotos[0]);
    bigPictureComments.appendChild(arrayComments);
  };
}

console.log(thumbnails);


const a = bigPicture;
export {a};
