Vue.component('QueryBuilderPage', {
    data: function () {
        return {
            dialog: false,
            dialog2: false,

            desserts: [],
            QueryList:{},
            editedIndex: -1,
            selectedIndex:-1,
            editedItem: {
                Name: '',
                Parameters:[]
            },

            selectedItem: {
                Name: '',
                Parameters:[]

            },
            defaultItem: {
                Name: '',
                Parameters:[]

            },

            rowsPerPageItems: [20, 40, 80],
            pagination: {
                rowsPerPage: 20
            },
            tables:[],
            table:{Name:""},
            editedIndexTable: -1,
            editedTable:{
                Name:"",
                Join: "",
                JoinOn: "",

            },

            editTableMode:false

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
            if (this.editedItem.Parameters==null){
                this.editedItem.Parameters=[];
            }

            this.dialog = true;
        },

        editTableDialogShow (item) {
            this.editTableMode=true;
            this.editedIndexTable = this.selectedItem.Tables.indexOf(item);
            this.editedTable = Object.assign({}, item);

            this.dialog2 = true;
        },



        deleteItem (item) {
            const index = this.desserts.indexOf(item);
            confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1);
        },

        deleteTable (item) {
            const index = this.selectedItem.Tables.indexOf(item);
            confirm('Are you sure you want to delete this item?') && this.selectedItem.Tables.splice(index, 1);
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
        },

        addTableDialogShow () {


            var prm = {
                ProjectId  : sessionStorage.projectId,
            };
            this.loading = true;
            axios
                .post('/api/GetTables', prm, {})
                .then(response => {
                    this.tables  = response.data;
                    this.editTableMode=false;
                    this.dialog2 = true;
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    this.loading = false;
                })



        },

        TableDialogOk () {
            if (this.editTableMode){
                //TODO : Edit işlemi yapılacak
                this.aditTable();
            }else {
                this.addTable();
            }
        },

        addTable () {

            var t = {
                Name: this.table.Name,
                Fields: [],
            };

            var i=0;
            for (i=0;i<this.table.Fields.length;i++){
                var f={
                    Name:this.table.Fields[i].Name,
                    FieldType:this.table.Fields[i].FieldType,
                };

                t.Fields.push(f)
            }
            if (this.selectedItem.Tables==null)
            {
                this.selectedItem.Tables=[]
            }
            this.selectedItem.Tables.push(t);
            this.dialog2=false;
        },

        aditTable () {

            this.selectedItem.Tables[this.editedIndexTable].Join = this.editedTable.Join;
            this.selectedItem.Tables[this.editedIndexTable].JoinOn = this.editedTable.JoinOn;
            this.dialog2=false;
        }


    },

    template: `<div>
    <base-page title="QueryBuilder">

        <template v-slot:toolbarslot>
            <v-btn round color="primary" dark @click="dialog=true">New Query</v-btn>
            <v-btn round color="primary" dark @click="addTableDialogShow()">Add Table</v-btn>
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
                <v-data-iterator v-if="selectedItem.Tables !=null"
                                 :items="selectedItem.Tables"
                                 :rows-per-page-items="rowsPerPageItems"
                                 :pagination.sync="pagination"
                                 content-tag="v-layout" row wrap>
                    <template v-slot:item="props">
                        <v-flex xs12 sm6 md4 lg3>
                            <v-card>
                                <v-toolbar dense color="info">
                                    <v-btn icon>
                                        <v-icon @click="deleteTable(props.item)">delete</v-icon>
                                    </v-btn>
                                    <v-toolbar-title>{{ props.item.Name }}</v-toolbar-title>
                                    <v-spacer></v-spacer>


                                    <v-btn icon>
                                        <v-icon @click="editTableDialogShow(props.item)">edit</v-icon>
                                    </v-btn>

                                </v-toolbar>

                                <v-list dense>
                                    <v-list-tile v-for="(book, index) in props.item.Fields" :key="index" :book="book">


                                        <v-checkbox
                                                v-model="book.Selected"
                                                data-vv-name="checkbox"
                                                type="checkbox"
                                                :label="book.Name"
                                        ></v-checkbox>


                                        <v-list-tile-content class="align-end">{{ book.FieldType }} &nbsp;
                                        </v-list-tile-content>


                                    </v-list-tile>
                                </v-list>
                            </v-card>
                        </v-flex>
                    </template>
                </v-data-iterator>


            </v-flex>
        </v-layout>
        <pre>{{table}}</pre>
        <pre>{{selectedItem}}</pre>

    </base-page>

    <div>
        <v-dialog v-model="dialog" max-width="550px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                    
                    <v-text-field v-model="editedItem.Name" label="Name"></v-text-field>
                    <v-text-field v-model="editedItem.QueryEnd" label="Query End"></v-text-field>
                    <parameter-kart title="Parameters" :value="editedItem.Parameters"></parameter-kart>
                        
                    
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog2" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline"> Table </span>
                </v-card-title>

                <v-card-text>

                    <template v-if="editTableMode==false">
                        <v-select :items="tables" v-model="table" label="Table"
                                  item-text="Name"
                                  return-object
                        ></v-select>
                    </template>
                    <template v-if="editTableMode==true">
                        <v-text-field
                                label="Join :"
                                v-model="editedTable.Join"
                        ></v-text-field>
                        <v-text-field
                                label="Join On :"
                                v-model="editedTable.JoinOn"
                        ></v-text-field>

                    </template>

                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog2=false">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="TableDialogOk()">Ok</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


    </div>

</div>
`,

});

