import { movies } from "./api";

export async function getNow(dispatch) {
  dispatch({ type: "GET_NOW" });
  try {
    const response = await movies.getNowPlaying();
    dispatch({ type: "GET_NOW_SUCCESS", data: response.data.results });
  } catch (e) {
    dispatch({ type: "GET_NOW_ERROR", error: e });
  }
}
