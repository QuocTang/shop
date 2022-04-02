import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjlkMjU2MTRkYWE4NjFiZjVkYTMxZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NzAwNjM5MCwiZXhwIjoxNjQ3MjY1NTkwfQ.0zGCoZtCUo5jt6OwPtw_n3qLEAXcL0nD27TKtL9ZV04"
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});