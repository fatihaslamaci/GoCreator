Vue.component('ProxyClassPage', {
    data: function () {
        return {
            DefField: [{
                Name: "ID",
                FieldType: "int64",
                IsArray:false
            }],

            fieldTypeItems: ['string', 'int32', 'int64', 'float32', 'float64', 'bool', 'time.Time', 'byte'],

        }
    },

    mounted() {
        this.getProxyClass();
    },

    methods: {
        getProxyClass() {
            var prm = {
                ProjectId: sessionStorage.projectId,
            };
            this.loading = true;
            axios
                .post('/api/getProxyClass', prm, {headers: {projectId: sessionStorage.projectId}})
                .then(response => {
                    response.data.forEach((item, index) => {
                        this.fieldTypeItems.push(item.Name);
                    });
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    //this.loading = false;
                })
        }
    },


    template: `<base-kart-page title="Proxy Class" :deffield="DefField" getcart="/api/getProxyClass" savecart="/api/saveProxyClass">

    <template v-slot:FieldDialog="props">

        <v-checkbox
                v-model="props.field.IsArray"
                label="is Array Field"
        ></v-checkbox>
        <v-text-field
                label="Field Name :"
                v-model="props.field.Name"
        ></v-text-field>
        <v-select
                :items="fieldTypeItems"
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

