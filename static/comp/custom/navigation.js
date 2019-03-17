Vue.component('faNavigation', {
    data: function () {
        return {
            items: [{
                    title: 'Sample Page',
                    icon: 'dashboard',
                    routername: 'SamplePage'
                },
                {
                    title: 'About',
                    icon: 'question_answer',
                    routername: 'about'
                },
                {
                    title: 'Tables',
                    icon: 'dashboard',
                    routername: 'TablesPage'
                },
                {
                    title: 'Build',
                    icon: 'build',
                    routername: 'BuildPage'
                },
            ],
        }
    },
    template: `
      <v-list dense class="pt-0">
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click="$router.push({ name: item.routername })"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    `

});