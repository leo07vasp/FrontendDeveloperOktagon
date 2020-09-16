// import axios from "axios";

// export default axios.create({
//   baseURL: `http://devserver.oktagongames.com:5000/api/`,
// });

import axios from "axios";

const API = axios.create({
  baseURL: `http://devserver.oktagongames.com:5000/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
