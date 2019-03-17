Vue.component('TablesPage', {
    data: function () {
        return {
            count: 0,
            items: [],
            table: {},
            editItem: {},
            editItem2: {},
            insert: false,
            loading: false,

            rowsPerPageItems: [20, 40, 80],
            pagination: {
                rowsPerPage: 20
            },
            dialog: false,
            dialogNewTable: false,


            NewTableName: ""

        }
    },
    mounted() {
        axios
            .post('/api/getTables', {}, {headers: {projectId: sessionStorage.projectId}})
            .then(response => (
                    this.items = response.data
                )
            )
    },
    methods: {



        saveField() {




            var index = this.table.Fields.indexOf(this.editItem2);

            if (index > -1) {
                this.table.Fields[index] = JSON.parse(JSON.stringify(this.editItem));
            } else {
                this.table.Fields.push(JSON.parse(JSON.stringify(this.editItem)));
            }
            this.dialog = false;
        },

        addTable() {
            var table = {
                Uid: "",
                Ad: this.NewTableName,
                Fields: [{
                    Name: "ID",
                    PrimaryKey: true,
                    DataType: "INTEGER",

                }]
            };

            if (this.items==null) {
                this.items = [];
            }
            this.items.push(table);
            this.dialogNewTable = false;
        },

        editField(val, table) {
            this.insert = false;


            this.editItem2 = val;
            this.table = table;
            this.editItem = JSON.parse(JSON.stringify(val));
            this.dialog = true;
        },

        addField(table) {
            this.insert = true;


            this.editItem.Name = "";
            this.table = table;

            this.dialog = true;


        },

        saveChanges() {
            this.loading = true;
            axios
                .post('/api/saveTables', this.items, {headers: {projectId: sessionStorage.projectId}})
                .then(response => {
                    this.items = response.data;
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    this.loading = false;
                })


        },



        deleteField() {
            if (confirm("Delete field?")) {
                var index = this.table.Fields.indexOf(this.editItem2);
                if (index > -1) {
                    this.table.Fields.splice(index, 1);
                }
                this.dialog = false;
            }
        },
        deleteTable(table) {
            if (confirm("Delete table?")) {
                var index = this.items.indexOf(table);
                if (index > -1) {
                    this.items.splice(index, 1);
                }
            }
        },

        fieldDialogTitle(){
            if (this.insert) {
                return "Insert Field";
            }else{
                return "Edit Field"
            }

        }



    },

    template: `<div>

    <v-dialog v-model="dialogNewTable" persistent max-width="290">
        <v-card>
            <v-card-title class="headline"> New Table</v-card-title>
            <v-card-text>

                <v-text-field
                        label="Table Name :"
                        v-model="NewTableName"
                ></v-text-field>

            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat @click="dialogNewTable = false">Iptal</v-btn>
                <v-btn color="green darken-1" flat @click="addTable()">Kaydet</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>


    <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
            <v-card-title class="headline"> {{fieldDialogTitle()}}</v-card-title>
            <v-card-text>
                <v-checkbox v-model="editItem.PrimaryKey" label="Primary Key"></v-checkbox>

                <v-text-field
                        label="Field Name :"
                        v-model="editItem.Name"
                ></v-text-field>

                <v-select
                        :items="['INTEGER','TEXT','REAL','DATETIME','BOOLEAN','BLOB']"
                        label="Type"
                        v-model="editItem.DataType"
                ></v-select>


                <template v-if="editItem.DataType=='INTEGER'">

                </template>
                <template v-else-if="editItem.DataType=='TEXT'">
                    <v-text-field type="number"
                                  label="Size"
                                  v-model="editItem.Size"
                    ></v-text-field>
                </template>
               

            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat @click="dialog = false">Cancel</v-btn>
                <v-btn v-if="insert==false" color="error" flat @click="deleteField()">Delete</v-btn>
                
                <v-btn color="green darken-1" flat @click="saveField()">Save</v-btn>
                
            </v-card-actions>
        </v-card>
    </v-dialog>


    <v-container fluid grid-list-md>
        <v-btn round color="primary" dark @click="dialogNewTable=true">New Table</v-btn>
        <v-btn round color="primary" :loading="loading" dark @click="saveChanges()">save changes</v-btn>

        <v-data-iterator v-if="items !=null"
                :items="items"
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

                            <v-toolbar-title>{{ props.item.Ad }}</v-toolbar-title>
                            <v-spacer></v-spacer>
                            
                            
                            <v-btn icon>
                                <v-icon @click="addField(props.item)">add</v-icon>
                            </v-btn>
                            
                        </v-toolbar>

                        <v-list dense>
                            <v-list-tile v-for="(book, index) in props.item.Fields" :key="index" :book="book">


                                <template v-if="book.PrimaryKey==true">
                                    <v-icon small>vpn_key</v-icon>
                                    <v-list-tile-content>&nbsp;{{book.Name}}</v-list-tile-content>
                                </template>
                                <template v-else>
                                <v-icon small></v-icon>
                                    <v-list-tile-content>&nbsp; &nbsp;&nbsp; &nbsp;{{book.Name}}</v-list-tile-content>
                                </template>


                                <v-list-tile-content class="align-end">{{ book.DataType }} &nbsp;
                                </v-list-tile-content>
                                <v-icon small @click="editField(book,props.item)">edit</v-icon>


                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-flex>
            </template>
        </v-data-iterator>
    </v-container>

</div>
    `,

});

