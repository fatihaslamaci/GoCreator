Vue.component('QueryBuilderPage', {
    data: function () {
        return {
            dialog: false,
            desserts: [],
            QueryList:{},
            editedIndex: -1,
            selectedIndex:-1,
            editedItem: {
                Name: '',

            },

            selectedItem: {
                Name: '',

            },
            defaultItem: {
                Name: '',
            }


        }
    },
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
        }
    },

    watch: {
        dialog (val) {
            val || this.close();
        }
    },

    created () {
        this.initialize();
    },

    methods: {
        initialize () {
            this.GetQueryBuilderHandler();
        },

        OnSelectItem(item){
            this.selectedItem=item;
        },
        GetQueryBuilderHandler() {
            var prm = {
                ProjectId  : sessionStorage.projectId,
            };
            var r = {
                Query  : null,
            };
            this.loading = true;
            axios
                .post('/api/GetQueryBuilder', prm, {})
                .then(response => {
                    console.log(response.data);
                    this.QueryList=response.data;
                    this.desserts  = response.data.Query;
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    this.loading = false;
                })
        },

        SaveQueryBuilder() {
            var prm = {
                ProjectId  : sessionStorage.projectId,
                Query  : this.desserts,
            };


            this.loading = true;
            axios
                .post('/api/SaveQueryBuilder', prm, {})
                .then(response => {
                    this.desserts  = response.data.Query;
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    this.loading = false;
                })
        },

        editItem (item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem (item) {
            const index = this.desserts.indexOf(item);
            confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1);
        },

        close () {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            }, 300);
        },

        save () {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem);
            } else {
                this.desserts.push(this.editedItem);
            }
            this.close();
        }
    },

    template: `<div><base-page title="QueryBuilder">

    <template v-slot:toolbarslot>
        <v-btn round color="primary" dark @click="SaveQueryBuilder()">Save</v-btn>
    </template>

  
    <v-layout row wrap>
      <v-flex d-flex xs12 sm5 md3>
        
        <v-data-table
      :items="desserts"
      class="elevation-1"
         hide-actions
    hide-headers
    
    >
        <template v-slot:items="props">
        <tr @click="OnSelectItem(props.item)">
        <td>{{ props.item.Name }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    
    
    
    </v-data-table>
        
      </v-flex>

 
      <v-flex d-flex xs12 sm7 md9>
        <v-card color="blue lighten-2" dark>
          <v-card-text><pre> {{selectedItem}} </pre></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
 

</base-page>

<div>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.Name" label="Name"></v-text-field>
                </v-flex>

                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</div>
</div>
`,

});

