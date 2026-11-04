import axios from "axios";

const API_KEY = "58414444-75ff87f1cec75179ee869cae2";
const PER_PAGE = 15;

axios.defaults.baseURL = "https://pixabay.com/api/";

export async function getImagesByQuery(query, page) {
  const response = await axios.get("", {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: "true",
      page,
      per_page: PER_PAGE,
    },
  });

  return response.data;
}