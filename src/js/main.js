import { getImagesByQuery } from "./pixabay-api";
import {
  createGallery,
  clearGallery,
  lightbox,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const searchForm = document.querySelector(".search-form");
const galleryContainer = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

let query = "";
let page = 1;
let totalHits = 0;

hideLoadMoreButton();

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.error({
      message: "Будь ласка, введіть пошуковий запит!",
      position: "topRight",
    });
    return;
  }

  page = 1;
  clearGallery(galleryContainer);
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.warning({
        message:
          "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
      });
      return;
    }

    galleryContainer.innerHTML = createGallery(data.hits);
    lightbox.refresh();

    if (page * 15 < totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      message: "Сталася помилка при завантаженні даних.",
      position: "topRight",
    });
  } finally {
    hideLoader();
    searchForm.reset();
  }
});

loadMoreBtn.addEventListener("click", async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    galleryContainer.insertAdjacentHTML("beforeend", createGallery(data.hits));
    lightbox.refresh();

    const { height: cardHeight } =
      galleryContainer.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });

    if (page * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      message: "Сталася помилка при завантаженні додаткових даних.",
      position: "topRight",
    });
  } finally {
    hideLoader();
  }
});
