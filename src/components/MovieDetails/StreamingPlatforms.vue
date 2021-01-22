<template>
  <md-card-expand>
    <md-card-actions>
      <md-card-expand-trigger>
        <md-button>Stream<md-icon>keyboard_arrow_down</md-icon></md-button>
      </md-card-expand-trigger>
    </md-card-actions>

    <md-card-expand-content>
      <md-card-content>
        <div class="md-layout md-gutter md-alignment-bottom-center">
          <md-divider />
          <div
            v-for="plat in platforms"
            :key="plat.platform"
            class="md-layout-item"
          >
            <a
              :href="plat.link"
              target="_blank"
              class="plat-link"
            >
              <img
                :src="findIcon(plat.platform)"
                class="plat-icon"
                alt="plat"
              >
            </a>
          </div>
        </div>
      </md-card-content>
    </md-card-expand-content>
    <md-divider />
  </md-card-expand>
</template>

<script>
import { platIcons } from '@/utils/streamingPlatforms'

export default {
  name: 'StreamingPlatforms',
  props: {
    platforms: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    findIcon (plat) {
      if (Object.keys(platIcons).includes(plat)) {
        return platIcons[plat]
      }
    }
  }
}
</script>

<style scoped>
.plat-link {
  padding: 10px;
}
.plat-icon {
  width: 70px;
}
</style>
