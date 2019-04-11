Vue.component('BasePage', {
    data: function () {
        return {
         }
    },

    props: ['title'],

    template: `<div>

    <v-container fluid grid-list-md>
        <v-toolbar flat color="white">
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-divider
                class="mx-2"
                inset
                vertical
        ></v-divider>
        <v-spacer></v-spacer>
        
        <slot name="toolbarslot"> </slot>
        
        </v-toolbar>

        <slot></slot>
        
    </v-container>
</div>
    `,

});

