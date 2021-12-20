import appHeader from "./cmps/general-cmps/app-header.cmp.js";
import appFooter from "./cmps/general-cmps/app-footer.cmp.js";
import userMsg from "./cmps/general-cmps/user-msg.cmp.js";
import { router } from "./routes.js";

const options = {
  el: "#app",
  router,
  template: `
        <section>
          <div class="curtain-screen"></div>
          <user-msg />
            <app-header />
            <keep-alive>
                <router-view class="main-containers main-layout"/>
            </keep-alive>
            <app-footer />
        </section>
    `,
  components: {
    appHeader,
    appFooter,
    userMsg,
  },
};

new Vue(options);
