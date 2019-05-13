Vue.component('QueryBuilderPage', {
    data: function () {
        return {}
    },

    template: `<base-page title="QueryBuilder">

    <template v-slot:toolbarslot>
        <v-btn round color="primary" dark @click="">Sample Button</v-btn>
    </template>

    <v-card>
        Sample Page Content
    </v-card>

</base-page>

`,

});

