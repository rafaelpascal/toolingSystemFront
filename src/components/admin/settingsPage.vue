<template>
    <div class="container-fluid">
        <div class="mt-10 row">
            <div class="col-lg-12">
                <div class="settingContan">
                    <div class="settings">
                        <h4 class="setxt">Set Deadline for Report</h4>
                        <v-card class="pa-6 mx-auto elevation-4" max-width="1000" outlined>
                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="date" label="Set Dealine Date" prepend-icon="mdi-calendar"
                                        readonly v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="date" :active-picker.sync="activePicker"
                                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                    min="1950-01-01" @change="save"></v-date-picker>
                            </v-menu>
                            <v-text-field v-model="frequency" label="Number of reminder" clearable></v-text-field>
                            <!-- <v-text-field v-model="frequency" label="Frequency" clearable></v-text-field> -->
                            <v-textarea solo name="input-7-4" v-model="message" label="Message"></v-textarea>
                            <div v-for="setting in settings" :key="setting.id">
                                <button v-if="setting.record === true" class="saveRemark"
                                    @click="updatesetting(setting)">Edit Settings</button>
                                <button v-else id="saveSettings" class="saveRemark" @click="saveSetting">Save</button>
                            </div>
                            <!-- <button id="saveSettings" class="saveRemark" @click="saveSetting">Save</button> -->
                        </v-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'
import jwt_decode from "jwt-decode";

export default {
    data: () => ({
        activePicker: null,
        date: null,
        menu: false,
        message: '',
        frequency: '',
        settings: [],
        userid: '',
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }),
    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },
    mounted() {
        this.getSetting()
    },
    methods: {
        async getSetting() {
            const retrievedData = localStorage.getItem('token');
            const token = JSON.parse(retrievedData);
            await axios.get(`http://localhost:3000/api/v1/review/settings/settings`,
                {
                    headers: {
                        'token': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log(response.data.data.settings);
                    // this.settingId = response.data.data.settings.
                    response.data.data.settings.forEach(elem => {
                        this.settings.push({
                            settingsId: elem._id,
                            record: elem.record,
                        })
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        save(date) {
            this.$refs.menu.save(date)
        },
        async saveSetting() {
            console.log(this.date);
            const retrievedData = localStorage.getItem('token');
            const token = JSON.parse(retrievedData);
            const decoded = jwt_decode(token);
            this.userid = decoded.id
            await axios.post(`http://localhost:3000/api/v1/review/settings/newsetting/${this.userid}`,
                {
                    day: this.date,
                    numberOfreminder: this.frequency,
                    message: this.message,
                    record: true,
                    startday: new Date()
                },
                {
                    headers: {
                        'token': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log(response);
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
        },

        async updatesetting(setting) {
            if (this.date === null || this.frequency === '' || this.message === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please Complete the Form',
                    width: 350,
                })
            } else {
                const settingsId = setting.settingsId
                const retrievedData = localStorage.getItem('token');
                const token = JSON.parse(retrievedData);
                await axios.patch(`http://localhost:3000/api/v1/review/settings/newsetting/${settingsId}`,
                    {
                        day: this.date,
                        numberOfreminder: this.frequency,
                        message: this.message,
                    },
                    {
                        headers: {
                            'token': `Bearer ${token}`
                        }
                    })
                    .then((response) => {
                        console.log(response);
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
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@200&display=swap');

.container-fluid {
    height: 100vh;
    padding-top: 5rem;
    padding-left: 5rem;
    padding-bottom: 5rem;
}

.settingContan {
    display: flex;
    justify-content: center;
    align-items: center;

    .settings {
        width: 50%;

        .setxt {
            font-family: 'Mulish';
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 20px;
            /* identical to box height, or 125% */
            color: #6C6C6C;
        }

        .saveRemark {
            width: 25%;
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
    }
}

@media(min-width: 320px) and (max-width: 1200px) {
    .container-fluid {
        height: 100vh;
        padding-top: 5rem;
        padding-left: 1rem;
        padding-bottom: 5rem;
    }

    .settingContan {
        display: flex;
        justify-content: center;
        align-items: center;

        .settings {
            width: 100%;

            .setxt {
                font-family: 'Mulish';
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 20px;
                /* identical to box height, or 125% */
                color: #6C6C6C;
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
        }
    }
}
</style>