Vue.component('ExplorerPage', {
    data: function () {
        return {
            open: ['public'],
            files: {
                html: 'mdi-language-html5',
                js: 'mdi-nodejs',
                json: 'mdi-json',
                md: 'mdi-markdown',
                pdf: 'mdi-file-pdf',
                png: 'mdi-file-image',
                txt: 'mdi-file-document-outline',
                go: 'mdi-language-go',

                xls: 'mdi-file-excel'
            },
            tree: [],
            items: [
                {
                    name: '.git'
                },
                {
                    name: 'node_modules'
                },
                {
                    name: 'public',
                    children: [
                        {
                            name: 'static',
                            children: [{
                                name: 'logo.png',
                                file: 'png'
                            }]
                        },
                        {
                            name: 'favicon.ico',
                            file: 'png'
                        },
                        {
                            name: 'index.html',
                            file: 'html'
                        }
                    ]
                },
                {
                    name: '.gitignore',
                    file: 'txt'
                },
                {
                    name: 'babel.config.js',
                    file: 'js'
                },
                {
                    name: 'package.json',
                    file: 'json'
                },
                {
                    name: 'README.md',
                    file: 'md'
                },
                {
                    name: 'vue.config.js',
                    file: 'js'
                },
                {
                    name: 'yarn.lock',
                    file: 'txt'
                },
                {
                    name: 'main.go',
                    file: 'go'
                }
            ]



        }
    },

    template: `<base-page title="Explorer">

    <template v-slot:toolbarslot>
        <v-btn round color="primary" dark @click="">Sample Button</v-btn>
    </template>

    <v-card>
          <v-treeview
    v-model="tree"
    :open="open"
    :items="items"
    activatable
    item-key="name"
    open-on-click
  >
    <template v-slot:prepend="{ item, open }">
      <v-icon v-if="!item.file">
        {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
      </v-icon>
      <v-icon v-else>
        {{ files[item.file] }}
      </v-icon>
    </template>
  </v-treeview>
    </v-card>

</base-page>

`,

});

