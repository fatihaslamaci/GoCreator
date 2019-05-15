Vue.component('EndPointPage', {
    data: function () {
        return {
            dialog: false,
            loading: false,

            headers: [
                {text: 'Name', value: 'Name'},
                {text: '', value: ''},

            ],
            desserts: {},
            editedIndex: -1,
            editedItem: {
                Name: '',
                Request: {
                    Name: "",
                    Fields: []
                },
                Response: {
                    Name: "",
                    Fields: []
                }


            },
            defaultItem: {
                Name: '',
                Request: {
                    Name: "",
                    Fields: []
                },
                Response: {
                    Name: "",
                    Fields: []
                }
            },

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

                    console.log(response.data);
                    if (response.data.EndPoints === null) {
                        console.log("aaa");

                        this.desserts = {
                            PacketNames:[],
                            EndPoints:[]
                        };
                    } else {
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
            this.editedIndex = this.desserts.EndPoints.indexOf(item);
            //this.editedItem = Object.assign({}, item);
            this.editedItem = JSON.parse(JSON.stringify(item));

            this.dialog = true
        },

        deleteItem(item) {
            const index = this.desserts.EndPoints.indexOf(item);
            confirm('Are you sure you want to delete this item?') && this.desserts.EndPoints.splice(index, 1)
        },

        close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },

        save() {
            console.log(this.desserts);

            if (this.editedIndex > -1) {
                Object.assign(this.desserts.EndPoints[this.editedIndex], this.editedItem)
            } else {
                this.desserts.EndPoints.push(this.editedItem)
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
    template: `<base-page title="End Point Page">

    <template v-slot:toolbarslot>
        <v-btn round color="primary" dark @click="dialog=true">New Item</v-btn>
        <v-btn round color="primary" :loading="loading" dark @click="saveChanges()">save changes</v-btn>
    </template>

    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm12 md12>
                            <v-text-field v-model="editedItem.Name" label="Name :"></v-text-field>
                        </v-flex>
                        
                        
                        
                    </v-layout>

                </v-container>
                <v-layout wrap>
                    <struct-kart title="Request" :value="editedItem.Request"></struct-kart>
                    <struct-kart title="Response" :value="editedItem.Response"></struct-kart>
                </v-layout>

            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <template>
        <v-data-table
                :headers="headers"
                :items="desserts.EndPoints"
                class="elevation-1"
        >
            <template v-slot:items="props">
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
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>
        
        TODO : Aşağıdaki datayı düzenleyecek arayüz yapılacak
        <pre> {{desserts.PacketNames}} </pre>
        
    </template>

</base-page>
  
  
    `,

});

