Vue.component('ProxyClassPage', {
    data: function () {
        return {
            DefField: [{
                Name: "ID",
                FieldType: "int64",
            }]

        }
    },

    template: `<base-kart-page title="Proxy Class" :deffield="DefField" getcart="/api/getProxyClass" savecart="/api/saveProxyClass">

    <template v-slot:FieldDialog="props">

        <v-text-field
                label="Field Name :"
                v-model="props.field.Name"
        ></v-text-field>
        <v-select
                :items="['string','int32','int64','float32','float64','bool','time.Time','[]byte']"
                label="Type"
                v-model="props.field.FieldType"
        ></v-select>

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
        <v-icon small></v-icon>
        <v-list-tile-content>&nbsp; &nbsp;&nbsp; &nbsp;{{props.field.Name}}</v-list-tile-content>

        <v-list-tile-content class="align-end">{{ props.field.DataType }} &nbsp;
        </v-list-tile-content>
    </template>

</base-kart-page>
  
  
    `,

});

