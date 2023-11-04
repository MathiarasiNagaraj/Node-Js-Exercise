const TASK_ROUTE = {
    base: "/task",
    general: "/",
    specific:"/:id",
    filter: "/filter",
    sort: "/sort",
    pagination:"/pagination"
};
const USER_ROUTE = {
  base: "/user",
  login: "/login",
  register: "/register",
  logout: "/logout",
  refresh: "/refresh",
};

module.exports = {
  TASK_ROUTE,
  USER_ROUTE,
};
