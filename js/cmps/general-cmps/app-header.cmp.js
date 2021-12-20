export default {
  name: "app-header",
  template: `
        <header class="header flex main-layout align-center space-between">
        <div class="main-screen" onclick="toggleMenu()"></div>
            <div class="logo">
                <h3><A>APPSUS</A></h3>
            </div>
            <nav class="nav">
                <router-link class="page-move" to="/" active-class="active-link" exact>Home</router-link> <span class="for-desktop">|</span>
                <router-link class="page-move" to="/mail">Mail</router-link> <span class="for-desktop">|</span>
                <router-link class="page-move" to="/keep">Keep</router-link> <span class="for-desktop">|</span>
                <router-link class="page-move" to="/book">Books</router-link> <span class="for-desktop">|</span>
                <router-link class="page-move" to="/about">About</router-link> 
            </nav>
            <button class="btn-menu" onclick="toggleMenu()">☰</button>
        </header>
    `,
};
