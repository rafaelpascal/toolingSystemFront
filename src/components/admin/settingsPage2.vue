<template>
    <div class="container-fluid">
        <div class="row">
            <div class="mt-10 col-lg-12">
                <div class="tabTitle">
                    <h4 class="ml-2">Settings</h4>
                    <v-data-table :headers="headers" :items="desserts" sort-by="calories" :items-per-page="5"
                        class="">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-spacer></v-spacer>
                                <v-dialog v-model="dialog" max-width="500px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <button class="ml-8 newR" v-bind="attrs" v-on="on">
                                            Add Settings
                                        </button>
                                    </template>
                                    <v-card>
                                        <v-card-title
                                            style="background-color: #21618C; color: #fff; margin-bottom: 1rem">
                                            <span style="font-size: 20px">{{ formTitle }}</span>
                                        </v-card-title>
                                        <div class="pa-4">
                                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                                transition="scale-transition" offset-y min-width="auto">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="editedItem.date" label="Select Dealine Date"
                                                        prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on">
                                                    </v-text-field>
                                                </template>
                                                <v-date-picker v-model="editedItem.date"
                                                    :active-picker.sync="activePicker"
                                                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                                    min="1950-01-01" @change="savedate"></v-date-picker>
                                            </v-menu>
                                            <v-text-field v-model="editedItem.frequency" label="Number of reminder"
                                                clearable>
                                            </v-text-field>
                                            <!-- <v-text-field v-model="frequency" label="Frequency" clearable></v-text-field> -->
                                            <v-textarea solo name="input-7-4" v-model="editedItem.message"
                                                label="Message">
                                            </v-textarea>
                                            <button class="saveRemark" @click="save()">Save Settings</button>
                                        </div>

                                        <!-- <button id="saveSettings" class="saveRemark" @click="saveSetting">Save</button> -->
                                    </v-card>
                                </v-dialog>
                                <v-dialog v-model="dialogDelete" max-width="500px">
                                    <v-card>
                                        <v-card-title class="textDel">Are you sure you want to delete this Settings?
                                        </v-card-title>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-toolbar>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon small class="mr-2" @click="editItem(item)">
                                mdi-pencil
                            </v-icon>
                            <v-icon small @click="deleteItem(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                    </v-data-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2'


export default {
    data: () => ({
        activePicker: null,
        date: null,
        menu: false,
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: 'First Name', align: 'start', sortable: false, value: 'firstName', class: 'blue-grey lighten-4' },
            { text: 'Last Name', value: 'lastName', class: 'blue-grey lighten-4' },
            { text: 'Email', value: 'email', class: 'blue-grey lighten-4' },
            { text: 'Level', value: 'level', class: 'blue-grey lighten-4' },
            { text: 'Deadline', value: 'date', class: 'blue-grey lighten-4' },
            { text: 'Frequncy', value: 'frequency', class: 'blue-grey lighten-4' },
            // { text: 'Message', value: 'message' },
            { text: 'Actions', value: 'actions', sortable: false, class: 'blue-grey lighten-4' },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            firstName: '',
            lastName: '',
            email: '',
            level: '',
            settingsId: '',
            SetById: '',
            date: null,
            message: '',
            frequency: '',
        },
        defaultItem: {
            date: null,
            message: '',
            frequency: '',
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    async beforeMount() {
        window.addEventListener('scroll', this.handleScroll)
        const retrievedData = localStorage.getItem('token');
        const token = JSON.parse(retrievedData);

        await axios.all([
            axios.get('http://localhost:3000/api/v1/review/settings/settings', {
                headers: {
                    'token': `Bearer ${token}`
                }
            }),
        ])
            .then(axios.spread((response1) => {
                console.log(response1.data.data.settings);
                this.request = response1.data.data.nbHits
                response1.data.data.settings.forEach(elem => {
                    this.desserts.push({
                        settingsId: elem._id,
                        SetById: elem.SetBy._id,
                        firstName: elem.SetBy.firstName,
                        lastName: elem.SetBy.lastName,
                        email: elem.SetBy.email,
                        level: elem.SetBy.level,
                        date: elem.day,
                        frequency: elem.numberOfreminder,
                        message: elem.message
                    })
                });
            }))
            .catch(function (error) {
                console.log(error);
            });
    },

    methods: {
        savedate(date) {
            this.$refs.menu.save(date)
        },
        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        async deleteItemConfirm() {
            const retrievedData = localStorage.getItem('token');
            console.log(JSON.parse(retrievedData));
            const token = JSON.parse(retrievedData);
            const itemId = this.editedItem.settingsId
            console.log(itemId);
            await axios.delete(`http://localhost:3000/api/v1/review/settings/delete/settings/${itemId}`,
                {
                    headers: {
                        'token': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log(response);
                    this.desserts.splice(this.editedIndex, 1)
                })
                .catch((error) => {
                    console.log(error);
                })
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        async save() {
            const retrievedData = localStorage.getItem('token');
            const token = JSON.parse(retrievedData);
            const decoded = jwt_decode(token);
            this.userid = decoded.id
            const settingsId = this.editedItem.settingsId
            console.log(settingsId);

            if (this.editedIndex > -1) {
                await axios.patch(`http://localhost:3000/api/v1/review/settings/newsetting/${settingsId}`,
                    {
                        day: this.editedItem.date,
                        numberOfreminder: this.editedItem.frequency,
                        message: this.editedItem.message,
                    },
                    {
                        headers: {
                            'token': `Bearer ${token}`
                        }
                    })
                    .then((response) => {
                        console.log(response);
                        Object.assign(this.desserts[this.editedIndex], this.editedItem)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            showConfirmButton: false,
                            text: 'Settings Updated',
                            width: 350,
                            timer: 1000
                        })
                        this.close()
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                // LOGGING
                await axios.post(`http://localhost:3000/api/v1/review/logRoute/newlog/${this.userid}`,
                    {
                        activity: `Edited Settings`
                    },
                    {
                        headers: {
                            'token': `Bearer ${token}`
                        }
                    })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    })

            } else {
                await axios.post(`http://localhost:3000/api/v1/review/settings/newsetting/${this.userid}`,
                    {
                        day: this.editedItem.date,
                        numberOfreminder: this.editedItem.frequency,
                        message: this.editedItem.message,
                        record: true,
                        startday: new Date()
                    },
                    {
                        headers: {
                            'token': `Bearer ${token}`
                        }
                    })
                    .then((response) => {
                        const item = response.data.data.setting;
                        console.log(response.data.data.setting);
                        this.editedItem = {
                            settingsId: item._id,
                            SetById: item.SetBy._id,
                            firstName: item.SetBy.firstName,
                            lastName: item.SetBy.lastName,
                            email: item.SetBy.email,
                            level: item.SetBy.level,
                            date: item.day,
                            frequency: item.numberOfreminder,
                            message: item.message
                        };
                        this.desserts.push(this.editedItem)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            showConfirmButton: false,
                            text: 'Settings Saved',
                            width: 350,
                            timer: 1000
                        })
                        this.date = ''
                        this.frequency = ''
                        this.message = ''
                        this.close()
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                // LOGGING
                await axios.post(`http://localhost:3000/api/v1/review/logRoute/newlog/${this.userid}`,
                    {
                        activity: `Created Settings`
                    },
                    {
                        headers: {
                            'token': `Bearer ${token}`
                        }
                    })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }

            // if (this.editedIndex > -1) {
            //     Object.assign(this.desserts[this.editedIndex], this.editedItem)
            // } else {
            //     this.desserts.push(this.editedItem)
            // }
            // this.close()
        },
    },
}
</script>

<style lang="scss" scoped>
.container-fluid {
    height: 100vh;
    padding-top: 5rem;
    padding-left: 5rem;
    padding-bottom: 5rem;
    background: #E5E5E5;
    height: 100vh;
}


.tabTitle {
    width: 100%;
    padding: 20px 0;
    height: auto;
    background: #FFFFFF;
    border-radius: 8px;

    h4 {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        line-height: 16px;
        /* identical to box height */
        display: flex;
        align-items: center;
        text-align: center;
        color: #4F4F4F;
    }
}

.newR {
    width: auto;
    height: auto;
    padding: 0.5rem;
    background: #21618C;
    // border-radius: 3px;
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    text-align: center;

    color: #FFFFFF;
}

.saveRemark {
    width: 45%;
    height: 36px;
    background: #21618C;
    border-radius: 4px;
    margin-right: 10px;

    font-family: 'Mulish';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height */
    color: #FFFFFF;
}

.textDel {
    margin-bottom: 0.8rem;
    color: #21618C;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
}

@media(min-width: 320px) and (max-width: 1200px) {
    .container-fluid {
        height: 100vh;
        padding-top: 5rem;
        padding-left: 1rem;
        padding-bottom: 5rem;
    }
}
</style>