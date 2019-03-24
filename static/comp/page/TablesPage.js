Vue.component('TablesPage', {
    data: function () {
        return {
            DefField: [{
                Name: "ID",
                PrimaryKey: true,
                FieldType: "int64",
            }]

        }
    },

    template: `<base-kart-page title="End Point"  :deffield="DefField" getcart="/api/getTables" savecart="/api/saveTables">

    <template v-slot:FieldDialog="props">
        <v-checkbox v-model="props.field.PrimaryKey" label="Primary Key"></v-checkbox>
        <v-text-field
                label="Field Name :"
                v-model="props.field.Name"
        ></v-text-field>
        <v-select
                :items="['string','int32','int64','float32','float64','time.Time','[]byte']"
                label="Type"
                v-model="props.field.FieldType"
        ></v-select>
        <v-checkbox v-model="props.field.Nullable" label="Nullable"></v-checkbox>
        <v-text-field
                label="Default Value :"
                v-model="props.field.Dflt_value"
        ></v-text-field>


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

