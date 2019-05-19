Vue.component('queryKart', {
    props: ['value','title'],
    data: function () {
        return {

        }
    },
    methods: {


    },

    template: `<div>

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
            <v-list-tile v-for="(book, index) in value.Fields" :key="index" :book="book">
                <v-list-tile-content>{{ book.Name }}</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ book.FieldType }} &nbsp;
                </v-list-tile-content>
                <v-icon small @click="editField(book,value)">edit</v-icon>
            </v-list-tile>
        </v-list>
    </v-card>

</div>`

});
