Vue.component('project', {
    data() {
        return {
            count: 0,
            items: [],
            projectId: '',
            loading: false,
            saveloading: false,
            errored: false,
            dialog: false,
            newitem: {},
        }

    },
    mounted() {
        this.loading = true;

        axios
            .get('/api/getProject')
            .then(response => {
                this.items = response.data;
                if (sessionStorage.projectId) {
                    this.projectId = sessionStorage.projectId;

                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                this.loading = false
            })

    },
    watch: {
        projectId(id) {
            if (sessionStorage.projectId != id) {
                sessionStorage.projectId = id;
                location.reload();

            }

            //this.$router.push({ name: 'about' })
        }
    },
    methods: {
        newProject() {
            this.saveloading = true;
            axios
                .post('/api/saveProject', this.newitem)
                .then(response => {
                    this.items = response.data;
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    this.saveloading = false;
                    this.dialog = false;
                })


        }
    },


    template: `<div>


    <v-dialog v-model="dialog" persistent max-width="290">
        
        <v-card>
            <v-card-title class="headline"> Yeni Proje </v-card-title>
            <v-card-text> 
            <v-text-field
            label="Proje Adı :"
            v-model="newitem.Ad"
            ></v-text-field>
            <v-text-field
            label="Path :"
            v-model="newitem.Path"
            ></v-text-field>
            
          
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat @click="dialog = false">Iptal</v-btn>
                <v-btn :loading="saveloading" color="green darken-1" flat @click="newProject">Kaydet</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    
    <v-select
            v-model="projectId"
            :items="items"
            item-text="Ad"
            item-value="Uid"
            label="Project"
            :loading="loading"
    >

        <template v-slot:append-outer>
            <v-menu
                    style="top: 12px"
                    offset-y
            >
                <template v-slot:activator="{ on }">
                    <v-btn small fab v-on="on">
                        <v-icon small>arrow_drop_down</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-text class="pa-4">
                        <v-btn large flat color="primary" @click="dialog = true">
                            <v-icon left>mdi-target</v-icon>
                            New
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-menu>
        </template>

    </v-select>


</div>`

});