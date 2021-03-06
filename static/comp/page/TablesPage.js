Vue.component('TablesPage', {
    data: function () {
        return {
            DefField: [{
                Name: "Id",
                PrimaryKey: true,
                FieldType: "int64",
            }],
            tables:[]
        }
    },

    mounted() {
        this.getTables();
    },

    methods: {

        doSave(){
            this.getTables();
        },

        getTables () {

            var prm = {
                ProjectId  : sessionStorage.projectId,
            };
            //this.loading = true;
            axios
                .post('/api/GetTables', prm, {})
                .then(response => {
                    this.tables  = response.data;
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    //this.loading = false;
                })

        },

    },

    template: `<base-kart-page title="Tables"  :deffield="DefField" getcart="/api/GetTables" savecart="/api/saveTables" v-on:on-save="doSave">

    <template v-slot:FieldDialog="props">
    <v-layout>
        <v-checkbox v-model="props.field.PrimaryKey" label="Primary Key"></v-checkbox>
        <v-checkbox v-model="props.field.ForeignKey" label="Foreign Key "></v-checkbox>
    </v-layout>    
        <v-text-field
                label="Field Name :"
                v-model="props.field.Name"
        ></v-text-field>
        <v-select
                :items="['string','int32','int64','float32','float64','bool','time.Time','[]byte']"
                label="Type"
                v-model="props.field.FieldType"
        ></v-select>
        <v-checkbox v-model="props.field.Nullable" label="Nullable"></v-checkbox>
        <v-text-field
                label="Default Value :"
                v-model="props.field.Dflt_value"
        ></v-text-field>

        <template v-if="props.field.ForeignKey">
             <v-select :items="tables" label="Foreign Table Name" v-model="props.field.ForeignTable"
                                  item-text="Name"
                                  item-value="Name"
             ></v-select>
            <v-text-field label="Foreign Table Field Name"
                          v-model="props.field.ForeignField"
            ></v-text-field>
        </template>

        <template v-if="props.field.FieldType=='int32'">
        </template>
        <template v-else-if="props.field.FieldType=='string'">
            <v-text-field type="number"
                          label="Size"
                          v-model="props.field.Size"
            ></v-text-field>
        </template>
    </template>

    <template v-slot:FieldList="props">
        <template v-if="props.field.PrimaryKey==true">
            <v-icon small>vpn_key</v-icon>
            <v-list-tile-content>&nbsp;{{props.field.Name}}</v-list-tile-content>
        </template>
        <template v-else-if="props.field.ForeignKey==true">
            <v-icon small>link</v-icon>
            <v-list-tile-content>&nbsp;{{props.field.Name}}</v-list-tile-content>
        </template>
        
        <template v-else>
            <v-icon small></v-icon>
            <v-list-tile-content>&nbsp; &nbsp;&nbsp; &nbsp;{{props.field.Name}}</v-list-tile-content>
        </template>
        <v-list-tile-content class="align-end">{{ props.field.DataType }} &nbsp;
        </v-list-tile-content>
    </template>

</base-kart-page>
  
  
    `,

});

