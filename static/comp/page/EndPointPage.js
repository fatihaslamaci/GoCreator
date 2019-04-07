Vue.component('EndPointPage', {
    data: function () {
        return {
            dialog: false,
            loading: false,

            headers: [
                {text: 'Name', value: 'Name'},
                {text: 'InputClass', value: 'InputClass'},
                {text: 'OutputClass', value: 'OutputClass'},

            ],
            desserts: [],
            editedIndex: -1,
            editedItem: {
                Name: '',
                InputClass: '',
                OutputClass: '',
                GoCode: '',
            },
            defaultItem: {
                Name: '',
                InputClass: '',
                OutputClass: '',
                GoCode: '',
            }
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        }
    },

    watch: {
        dialog(val) {
            val || this.close()
        }
    },

    created() {
        this.initialize()
    },
    methods: {
        initialize() {

            //this.loading = true;
            axios
                .post('/api/getEndPoints', {}, {headers: {projectId: sessionStorage.projectId}})
                .then(response => {

                    if(response.data === null){
                        this.desserts=[];
                    }else {
                        this.desserts = response.data;
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    //this.loading = false;
                })


        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            const index = this.desserts.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
        },

        close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },

        saveChanges() {
            this.loading = true;
            axios
                .post('/api/saveEndPoints', this.desserts, {headers: {projectId: sessionStorage.projectId}})
                .then(response => {
                    this.desserts = response.data;
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    this.loading = false;
                })
        },

    },
        template: `<div>
    <v-toolbar flat color="white">
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
                class="mx-2"
                inset
                vertical
        ></v-divider>


        <v-spacer></v-spacer>
        <v-btn round color="primary" dark @click="dialog=true">New Item</v-btn>
        <v-btn round color="primary" :loading="loading" dark @click="saveChanges()">save changes</v-btn>


        <v-dialog v-model="dialog" max-width="500px">
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
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="editedItem.InputClass" label="InputClass"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="editedItem.OutputClass" label="OutputClass"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="editedItem.GoCode" label="GoCode"></v-text-field>
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
    </v-toolbar>
    <v-data-table
            :headers="headers"
            :items="desserts"
            class="elevation-1"
    >
        <template v-slot:items="props">
            <td>{{ props.item.Name }}</td>
            <td>{{ props.item.InputClass }}</td>
            <td>{{ props.item.OutputClass }}</td>
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
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
    </v-data-table>
</div>
  
  
    `,

    });

