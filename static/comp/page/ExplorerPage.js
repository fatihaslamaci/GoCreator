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

                xls: 'mdi-file-excel',
                sqlite:'mdi-database',
                xml:'mdi-file-xml',

            },
            tree: [],
            items: [],
            items2: [],
            dialog:false,
            textFile:"",
            path:""

        }
    },
    mounted() {
        axios
            .post('/api/getDir', {}, {headers: {projectId: sessionStorage.projectId}})
            .then(response => (
                    //console.log(response.data)
                    this.items = response.data
                )
            )
    },
    methods: {
        iconClick(item) {

            this.path =item.path;
            var prm={
                Path : item.path
            };

            axios
                .post('/api/getFile', prm, {headers: {projectId: sessionStorage.projectId}})
                .then(response => {
                    console.log(response.data);
                    this.textFile = response.data;
                    this.dialog=true;
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    //this.loading = false;
                })
        },

        saveFile() {


            var prm={
                Path : this.path,
                Value :"denem"
            };

            axios
                .post('/api/saveFile', prm, {headers: {projectId: sessionStorage.projectId}})
                .then(response => {
                    console.log(response.data);
                    this.textFile = response.data;
                    this.dialog=true;
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    //this.loading = false;
                })
        }
    },

    template: `
<div>

    <v-dialog v-model="dialog" persistent >
        
        <v-card>
            <v-card-title class="headline"> File </v-card-title>
            <v-card-text> 
            
            <pre id="output" contenteditable="true"> {{textFile}}</pre>
            
          
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat @click="dialog = false">Iptal</v-btn>
                <v-btn color="green darken-1" flat @click="saveFile()">Kaydet</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>


<base-page title="Explorer">

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
    <template v-slot:prepend="{ item, open }" >
      <v-icon v-if="!item.file">
        {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
      </v-icon>
      <v-icon @click="iconClick(item)" v-else>
         
        {{ files[item.file] }}
         
      </v-icon>
    </template>
  </v-treeview>
    </v-card>

</base-page>

</div>
`,

});

