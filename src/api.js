import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  // return details of a company 
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // return list of companies
  static async getCompanies(query = "") {
    // if the search query is empty show list of all companies
    const endpoint = query ? `companies?name=${query}` : `companies`;

    let res = await this.request(endpoint);
    return res.companies;
  }

  // return list of jobs
  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  // apply to jobs 
  // static async applyToJob(username, jobId) {
  //   await this.request(`users/${username}/jobs/${jobId}`, {}, "POST");
  // }

  static async applyToJob(username, jobId) {
    try {
      if (!username || !jobId) {
        throw new Error("username and job id are required");
      }
      
      // send POST request to apply for a job
      const res = await this.request(`users/${username}/jobs/${jobId}`, {}, "POST");
      
      // check if the response contains the applied job id
      if (res.applied) {
        return { success: true, jobId: res.applied };
      } else {
        throw new Error("unexpected response format");
      }
    } catch (err) {
      console.error("API Error:", err);
      throw err;
    }
  }

  // send login details to the server and receive a token
  // credentials is an object containing username and password
  static async loginUser(credentials) {
    let res = await this.request(`auth/token`, credentials, "POST");
    return res.token;
  }

  // register new user and return token
  static async registerUser(data) {
    let res = await this.request(`auth/register`, data, "POST");
    return res.token;
  }

  // get user details by username
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  //update user information
  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, "PATCH");
    return res.user;
  }
}

export default JoblyApi;

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
