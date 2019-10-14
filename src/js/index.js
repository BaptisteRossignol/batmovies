import '../scss/style.scss';

const app = { test: "test" };
const app2 = { ...app };

document.getElementById("app").innerHTML = app2.test;