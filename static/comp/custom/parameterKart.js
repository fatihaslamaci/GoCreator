Vue.component('ParameterKart', {
    props: ['value','title'],
    data: function () {
        return {

            insert: false,
            dialog: false,

            table: [],
            editItem: {},
            editItem2: {},

         }
    },
    methods: {
        addField(table) {
            this.insert = true;
            //this.editItem.Name = "";
            this.table = table;
            this.dialog = true;
        },
        saveField() {


            var index = this.table.indexOf(this.editItem2);
            console.log("index");
            console.log(index);

            if (index > -1) {
                this.table[index] = JSON.parse(JSON.stringify(this.editItem));
            } else {
                this.table.push(JSON.parse(JSON.stringify(this.editItem)));
            }
            this.dialog = false;
        },
        editField(val, table) {
            this.insert = false;
            this.editItem2 = val;
            this.table = table;
            this.editItem = JSON.parse(JSON.stringify(val));
            this.dialog = true;
        },
        deleteField() {
            if (confirm("Delete field?")) {
                var index = this.table.indexOf(this.editItem2);
                if (index > -1) {
                    this.table.splice(index, 1);
                }
                this.dialog = false;
            }
        },

    },

    template: `<div>

    <v-dialog v-model="dialog" persistent max-width="400">
        <v-card>
            <v-card-title class="headline"> {{title}}</v-card-title>
            <v-card-text>

                <v-text-field
                        label="Field Name :"
                        v-model="editItem.Name"
                ></v-text-field>
                <v-combobox
                        :items="['string','int32','int64','float32','float64','bool','time.Time','[]byte']"
                        label="Field Type :"
                        v-model="editItem.FieldType"
                ></v-combobox>


            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat @click="dialog = false">Cancel</v-btn>
                <v-btn v-if="insert==false" color="error" flat @click="deleteField()">Delete</v-btn>
                <v-btn color="green darken-1" flat @click="saveField()">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-card>
        <v-toolbar dense color="info">
            <v-btn icon>
                <v-icon @click="">delete</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon @click="addField(value)">add</v-icon>
            </v-btn>

        </v-toolbar>
        <v-list dense>
            <v-list-tile v-for="(book, index) in value" :key="index" :book="book">
                <v-list-tile-content>{{ book.Name }}</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ book.FieldType }} &nbsp;
                </v-list-tile-content>
                <v-icon small @click="editField(book,value)">edit</v-icon>
            </v-list-tile>
        </v-list>
    </v-card>

</div>`

});
