import homePage from "./pages/home-page.cmp.js";
import aboutPage from "./pages/about-page.cmp.js";
import mailApp from "./apps/mail-app/pages/mail-app.cmp.js";
import keepApp from "./apps/keep-app/pages/keep-app.cmp.js";
import mailDetails from "./apps/mail-app/pages/mail-details.cmp.js";
import bookApp from "./apps/miss-Book/pages/book-app.js";
import bookDetails from "./apps/miss-Book/pages/book-details.js";
import bookEdit from "./apps/miss-Book/pages/book-edit.js";

const routes = [
  {
    path: "/",
    component: homePage,
  },
  {
    path: "/mail",
    component: mailApp,
  },
  {
    path: "/mail/:mailId",
    component: mailDetails,
  },
  {
    path: "/keep",
    component: keepApp,
  },
  {
    path: "/book",
    component: bookApp,
  },
  {
    path: "/book/edit/:bookId?",
    component: bookEdit,
  },
  {
    path: "/book/:bookId",
    component: bookDetails,
  },
  {
    path: "/about",
    component: aboutPage,
  },
];

export const router = new VueRouter({ routes });
