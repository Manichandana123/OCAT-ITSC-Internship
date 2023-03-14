import Axios from '../utils/http.config';

export class AssessmentService {
  static submit(assessment) {
    try {
      console.log(assessment);
      // Choose the correct method, url, and data to send
      // in a request to the express packages/api/src/routes/assessment.js
      // NOTE: the http.config file automatically adds /api to the front of your url
      return Axios.post(`/assessment/submit`, { assessment })
        .then(response => response.data);
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

  static getList() {
    console.log(`entered getList`);
    try {
      // Choose the correct method, url, and data to send
      // in a request to the express packages/api/src/routes/assessment.js
      // NOTE: the http.config file automatically adds /api to the front of your url
      return Axios.get(`/assessment/list`, {
        params: { },
      })
        .then(response => response.data.data.assessments);
    }
    catch (err) {
      console.log(`error`);
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }
}
