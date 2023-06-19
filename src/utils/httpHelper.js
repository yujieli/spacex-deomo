import axios from "axios";
import qs from "qs";

export default {
  /**
   * post request
   * @param {*} url 
   * @param {*} pms 
   * @param {*} callback 
   * @param {*} error 
   */
  postRequest(url, pms, callback, error) {
    axios
      .post(url, pms)
      .then((res) => {
        callback(res);
      })
      .catch((err) => {
        error(err);
      });
  },
  /**
   * get request
   * @param {*} url 
   * @param {*} pms 
   * @param {*} callback 
   * @param {*} error 
   */
  getRequest(url, pms, callback, error) {
    if (pms) {
      url = url + "?" + qs.stringify(pms);
    }
    console.log("getRequest url:", url);

    axios
      .get(url)
      .then((res) => {
        callback(res);
      })
      .catch((err) => {
        error(err);
      });
  },
};
