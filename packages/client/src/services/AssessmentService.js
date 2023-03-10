import Axios from '../utils/http.config';

export class AssessmentService {
  static submit(assessment) {
    try {
      console.log(assessment);
      // const assessment1 = {
      //   cat_date_of_birth: `2018-05-15`,
      //   cat_name: `Fluffy`,
      //   created_at: `2022-01-01T12:00:00Z`,
      //   deleted_at: null,
      //   id: 12345,
      //   instrument_type: `guitar`,
      //   risk_level: `medium`,
      //   score: 85,
      //   updated_at: `2022-01-02T10:30:00Z`,
      // };
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
    try {
      // Choose the correct method, url, and data to send
      // in a request to the express packages/api/src/routes/assessment.js
      // NOTE: the http.config file automatically adds /api to the front of your url
      return Axios.METHOD(`/some-url`, {
        params: {
        },
      })
        .then(response => response.data.data.assessment);
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }
}
