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
    const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader');
    commentsLoaderButton.classList.remove('hidden');

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

    let COUNT_SHOW_COMMENTS = 5;

    //Отрисовка первых пяти комментариев
    bigPictureComments.appendChild(createCommentBigPicture(photo, COUNT_SHOW_COMMENTS));
    //Удаления, а потом добавления счетчика комментари
    const pictureCommentCount = document.querySelector('.social__comment-count');
    pictureCommentCount.textContent = '';
    //Число комментариев которые показаны из всех комментариев
    let countShowCommentsNow = document.querySelectorAll('.social__comment').length;
    pictureCommentCount.insertAdjacentHTML('afterbegin', `${countShowCommentsNow} из <span class="comments-count">${photo.comments.length}</span> комментариев`);

    //Обработка клика
    commentsLoaderButton.addEventListener('click', () => {
      commentsLoaderButton.classList.remove('hidden');
      //Удаление внтуреенностей Счетчика комментариев
      pictureCommentCount.textContent = '';
      //Удаление внтуреенностей блока комментариев
      bigPictureComments.textContent = '';
      //Новое число загрузки комментариев
      COUNT_SHOW_COMMENTS += 5;
      //Если число комментариев для отрисовки больше числа всех комментариев отрисовываем все комментарии
      if(COUNT_SHOW_COMMENTS > photo.comments.length){
        const fut = photo.comments.length;
        bigPictureComments.appendChild(createCommentBigPicture(photo, fut));

        countShowCommentsNow = document.querySelectorAll('.social__comment').length;
        pictureCommentCount.insertAdjacentHTML('afterbegin', `${countShowCommentsNow} из <span class="comments-count">${photo.comments.length}</span> комментариев`);
        // Если число показанных комментариев равно числу всех комментариев скрываем кнопку
        if(countShowCommentsNow === photo.comments.length){
          commentsLoaderButton.classList.add('hidden');
        }
      } else  {
        //Отрисовка без условия по клику
        bigPictureComments.appendChild(createCommentBigPicture(photo, COUNT_SHOW_COMMENTS));
        pictureCommentCount.textContent = '';
        //считает количество комментариев показанных комментариев
        countShowCommentsNow = document.querySelectorAll('.social__comment').length;
        pictureCommentCount.insertAdjacentHTML('afterbegin', `${countShowCommentsNow} из <span class="comments-count">${photo.comments.length}</span> комментариев`);
      }
    });

    //Обрабочтик на клик кретика большой картинки
    const closePopup = document.querySelector('.big-picture__cancel');
    closePopup.addEventListener('click', (evt) => {
      evt.preventDefault();
      body.classList.remove('modal-open');
      bigPicture.classList.add('hidden');
      bigPictureComments.innerHTML = '';
    });
    //Обрабочтик на клик кнопки Esc во время открытой большой картинки
    document.addEventListener('keydown', (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        body.classList.remove('modal-open');
        bigPicture.classList.add('hidden');
        bigPictureComments.innerHTML = '';
      }
    });
  });

});

//добавления фрагмента с миниатюрами в элемент с классом ".pictures"
picturesContainer.appendChild(photoFragment);

export {picturesContainer};
