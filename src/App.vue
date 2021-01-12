<template>
  <div class="page-container md-layout-column">
    <NavDrawer />
    <div
      v-if="$root.$data.userLoggedIn"
      style="padding: 10px"
    >
      <component :is="$root.$data.pageView" />
    </div>
  </div>
</template>

<script>
import NavDrawer from "@/components/NavDrawer";
import MovieSearch from "@/components/MovieSearch";
import MovieDetails from "@/components/MovieDetails";
import BrowseMovies from "@/components/BrowseMovies";
import Profile from "@/components/Profile";
import LoginView from "@/components/LoginView";
import Watchlist from "@/components/Watchlist";

export default {
  name: "App",
  components: {
    MovieSearch,
    NavDrawer,
    MovieDetails,
    BrowseMovies,
    Profile,
    LoginView,
    Watchlist
  },
};
</script>
