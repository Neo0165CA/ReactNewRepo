import _ from "lodash";

_.mixin({
  /**
   * Set a given cookie in the document.cookie string.
   * @param {string} name - The name of cookie needs to be stored.
   * @param {string} value - Value that needs to be stored.
   * @param {minutes} number - The nuber of minutes after which the cookie should be expired.
   */
  setCookie: (name = "", value = "", minutes = 1) => {
    let expires = "";
    if (minutes) {
      const date = new Date();
      date.setTime(date.getTime() + minutes * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
  },

  /**
   * Get a cookie from the document.cookie string.
   * @param {string} name - The name of cookie needs to be retrieved.
   */
  getCookie: (name = "") => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  /**
   * Erase a cookie from the document.cookie string.
   * @param {string} name - The name of cookie needs to be erased.
   */
  eraseCookie: (name = "") => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
  },
});
