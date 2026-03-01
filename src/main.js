import getImagesByQuery from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const fetchPostsBtn = document.querySelector('#load-btn');
const searchForm = document.querySelector('.form');
let query = '';
let page = 1;

fetchPostsBtn.addEventListener('click', async () => {
  hideLoadMoreButton();
  showLoader();

  try {
    page += 1;
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);
    const galleryItem = document.querySelector('.gallery-item');
    const cardHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const totalPages = Math.ceil(data.totalHits / 15);
    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: 'Error fetching images!' });
    console.log(error);
  } finally {
    hideLoader();
  }
});

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({ message: 'Search field cannot be empty!' });
    return;
  }
  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      createGallery(data.hits);

      const totalPages = Math.ceil(data.totalHits / 15);
      if (page < totalPages) {
        showLoadMoreButton();
      } else {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    }
  } catch (error) {
    console.log(error);
    iziToast.error({ message: 'Something went wrong. Please try again.' });
  } finally {
    hideLoader();
    event.target.reset();
  }
});
