import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions.js";

const PER_PAGE = 15;
const END_OF_COLLECTION_MESSAGE =
  "We're sorry, but you've reached the end of search results.";

const searchForm = document.querySelector(".search-form");
const loadMoreBtn = document.querySelector(".load-more");
const galleryContainer = document.querySelector(".gallery");

let query = "";
let page = 1;
let totalHits = 0;

const scrollToNewImages = () => {
  const { height: cardHeight } =
    galleryContainer.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
};

const showEndOfCollection = () => {
  hideLoadMoreButton();
  iziToast.info({
    message: END_OF_COLLECTION_MESSAGE,
    position: "topRight",
  });
};

const handleSubmit = async searchQuery => {
  query = searchQuery;
  page = 1;

  clearGallery();
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

    createGallery(data.hits);

    if (page * PER_PAGE < totalHits) {
      showLoadMoreButton();
    } else {
      showEndOfCollection();
    }
  } catch {
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again!",
      position: "topRight",
    });
  } finally {
    hideLoader();
  }
};

const handleLoadMore = async () => {
  page += 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    createGallery(data.hits);
    scrollToNewImages();

    if (page * PER_PAGE >= totalHits) {
      showEndOfCollection();
    } else {
      showLoadMoreButton();
    }
  } catch {
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again!",
      position: "topRight",
    });
  } finally {
    hideLoader();
  }
};

searchForm.addEventListener("submit", event => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();

  if (searchQuery === "") {
    iziToast.warning({
      title: "Ops",
      message: "Please enter a search word!",
      position: "topRight",
    });
    return;
  }

  handleSubmit(searchQuery);
});

loadMoreBtn.addEventListener("click", handleLoadMore);
