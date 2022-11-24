<template>
    <div class="container-fluid">
        <div class="row">
            <div class="mt-10 col-lg-12">
                <div class="tabTitle">
                    <h4 class="ml-2">My Reports</h4>
                    <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="calories"
                        :items-per-page="5" class="">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                                    hide-details></v-text-field>
                                <v-dialog v-model="dialog" persistent max-width="750px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <button class="ml-8 newR" v-bind="attrs" v-on="on">
                                            New Report
                                        </button>
                                    </template>
                                    <v-card>
                                        <v-card-title
                                            style="background-color: #21618C; color: #fff; margin-bottom: 2rem">
                                            <span style="font-size: 20px">{{ formTitle }}</span>
                                        </v-card-title>

                                        <v-card-text>
                                            <v-container>
                                                <v-row>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <h4 class="my-2 title-txt2">Goals for this period</h4>
                                                        <vue-editor v-model="editedItem.goals">
                                                        </vue-editor>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <h4 class="my-2 title-txt2">My accomplishments</h4>
                                                        <vue-editor v-model="editedItem.accomplishment">
                                                        </vue-editor>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <h4 class="my-2 title-txt2">How I worked with others</h4>
                                                        <vue-editor v-model="editedItem.workWithOthers">
                                                        </vue-editor>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <h4 class="my-2 title-txt2">Here are my thoughts on the
                                                            expectations
                                                            and competencies for the last period.</h4>
                                                        <vue-editor v-model="editedItem.thoughts">
                                                        </vue-editor>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="mt-10">
                                                    <v-col cols="6" sm="6" md="6">
                                                        <!-- <h4 class="my-2 title-txt2">Date</h4> -->
                                                        <div>
                                                            <v-select :items="years" v-model="editedItem.years"
                                                                label="Select Year" dense></v-select>
                                                        </div>
                                                    </v-col>
                                                    <v-col cols="6" sm="6" md="6">
                                                        <!-- <h4 class="my-2 title-txt2">Date</h4> -->
                                                        <div>
                                                            <v-select :items="monthNames"
                                                                v-model="editedItem.monthNames" label="Select Month"
                                                                dense>
                                                            </v-select>
                                                        </div>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <button class="cancl" @click="close">
                                                Cancel
                                            </button>
                                            <button class="newR2" @click="save">
                                                Save
                                            </button>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <v-dialog v-model="dialogDelete" max-width="500px">
                                    <v-card>
                                        <v-card-title class="text-h5">Are you sure you want to delete this item?
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
                        <template v-slot:[`item.submissionDate`]="{ item }">
                            <span v-if="item.submissionDate === item.month" small
                                style="color: #21618C; font-size: 12px; text-transform:capitalize" class="mr-2">
                                Submitted
                            </span>
                            <span v-else small style="color:red; font-size: 12px; text-transform:capitalize">
                                Late Submission
                            </span>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-btn text
                                style="text-transform:capitalize; color:#21618C; font-size: 10px; margin: 0%; padding: 0%;"
                                @click="pushtoView(item)">
                                view Report
                            </v-btn>
                        </template>
                    </v-data-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    VueEditor
} from "vue2-editor";
// import io from "socket.io-client";
import axios from "axios";
import Swal from 'sweetalert2'
import jwt_decode from "jwt-decode";

export default {
    data: () => ({
        avata: 150,
        sent: false,
        recieved: false,
        edititemBtn: false,
        activePicker: null,
        date: null,
        menu: false,
        years: null,
        monthNames: null,
        search: '',
        userID: '',
        view: {
            topOfPage: true
        },

        dialog: false,
        dialogDelete: false,
        headers: [
            { text: 'Name', value: 'createdBy' },
            { text: 'Submission Status', value: 'submissionDate' },
            { text: 'Year', value: 'year' },
            { text: 'Month', value: 'month' },
            { text: 'Day', value: 'day' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            year: '',
            month: '',
            day: '',
            itemId: '',
            createdBy: '',
            goals: '',
            workWithOthers: '',
            accomplishment: '',
            thoughts: '',
            submissionDate: '',
            years: null,
            monthNames: null,
        },
        defaultItem: {
            year: '',
            month: '',
            day: '',
            itemId: '',
            createdBy: '',
            goals: '',
            workWithOthers: '',
            accomplishment: '',
            thoughts: '',
            years: null,
            monthNames: null,
        },
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Report' : 'Edit Report'
        },
    },

    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },
    beforeMount() {
        window.addEventListener('scroll', this.handleScroll)

    },
    components: {
        VueEditor
    },
    async mounted() {
        const currentYear = (new Date()).getFullYear();
        const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
        this.years = range(currentYear, currentYear - 50, -1);

        this.monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const retrievedData = localStorage.getItem('token');
        console.log(JSON.parse(retrievedData));
        const token = JSON.parse(retrievedData);
        const decoded = jwt_decode(token);
        this.userID = decoded.id
        await axios.all([
            axios.get('http://localhost:3000/api/v1/review/userreport/getreviewall', {
                headers: {
                    'token': `Bearer ${token}`
                }
            }),
        ])
            .then(axios.spread((response1) => {
                console.log(response1.data.data);

                response1.data.data.report.forEach(elem => {
                    this.desserts.push({
                        itemId: elem._id,
                        createdBy: elem.createdBy.firstName + " " + elem.createdBy.lastName,
                        year: elem.year,
                        month: elem.month,
                        day: elem.createdAt.split("-")[2].split("T")[0],
                        submissionDate: elem.submissionDate,
                    })
                });
            }))
            .catch(function (error) {
                console.log(error);
            });
    },
    methods: {
        // This function will push you to viewing a report
        pushtoView(item) {
            const IdItem = item.itemId
            const retrievedData = localStorage.getItem('token');
            console.log(JSON.parse(retrievedData));
            const token = JSON.parse(retrievedData);
            const decoded = jwt_decode(token);
            const userID = decoded.id
            // console.log('Token Decoded',decoded.id);
            localStorage.setItem('IdItem', JSON.stringify(IdItem));
            localStorage.setItem('userID', JSON.stringify(userID));
            if (!IdItem || !userID) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something Went Wrong Please Try again.',
                    width: 350,
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Proceed',
                    showConfirmButton: false,
                    text: 'Proceed',
                    width: 350,
                    timer: 1000
                })
                setTimeout(() => {
                    this.$router.push('/userViewreport')
                }, 1200);
            }
        },
        savedate(date) {
            this.$refs.menu.save(date)
        },
        sendMessage() {
            this.sent = true,
                this.addMessage()
            this.mesg = ""
        },
        editItem(item) {
            this.edititemBtn = true
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            console.log(this.editedItem);
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        // THE DELETE FUNCTION IS FOR DEACTIVATING A USER
        async deleteItemConfirm() {
            const userId = this.editedItem.userId //USER ID
            await axios.delete(`http://localhost:3000/api/v1/review/users/User/${userId}`)
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
            this.edititemBtn = false
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

        // THE SAVE FUNCTION IS FOR CREATUING THE REPORT BY THE USER
        async save() {
            const retrievedData = localStorage.getItem('token'); //THE TOKEN IS COMING FROM THE LOCAL STORAGE
            const token = JSON.parse(retrievedData);
            console.log(token);
            await axios.post(`http://localhost:3000/api/v1/review/userreport/postreview`,
                {
                    // This is the payload
                    goals: this.editedItem.goals,
                    workingWithothers: this.editedItem.workWithOthers,
                    accomplishment: this.editedItem.accomplishment,
                    mythoughts: this.editedItem.thoughts,
                    year: this.editedItem.years,
                    month: this.editedItem.monthNames
                },
                {
                    headers: {
                        'token': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    const item = response.data.message;
                    console.log(response.data.message);
                    this.editedItem = {
                        itemId: item._id,
                        goals: item.goals,
                        createdBy: item.createdBy.firstName + " " + item.createdBy.lastName,
                        workWithOthers: item.workingWithothers,
                        accomplishment: item.accomplishment,
                        thoughts: item.mythoughts,
                        submissionDate: item.submissionDate,
                        // date: item.createdAt.split("T")[0],
                        year: item.year,
                        month: item.month,
                        day: item.createdAt.split("-")[2].split("T")[0],
                    };
                    this.desserts.push(this.editedItem)
                    this.close()
                    const reportId = this.editedItem.itemId;
                    localStorage.setItem('reportId', JSON.stringify(reportId));
                })
                .catch((error) => {
                    console.log(error);
                })

            // LOGGING this function is for Logging what the user is doing into the System
            await axios.post(`http://localhost:3000/api/v1/review/logRoute/newlog/${this.userID}`,
                {
                    activity: `Created a Report`
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
    },
}
</script>
    
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css?family=Caveat');

$color-base: #fff;
$color-text: #222;
$color-accent: desaturate(navy, 80%);

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


.title-txt2 {
    font-family: 'Circular Std';
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 20px;
    color: #21618C;
    margin: 10px 0;
}

.sideBtn {
    padding: 0.5rem 0;
    color: #21618C;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    // border-radius: 3px;
}

.chartD {
    background-color: #fff;
    height: 435px;
}

.mainChat {
    width: 100%;
    position: relative;
    background-color: #fff;
    padding: 0%;

    h5 {
        margin-bottom: 0.8rem;
        color: #21618C;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 800;
        font-size: 20px;
        text-align: left;
    }

    .textAre {
        position: absolute;
        // top: 90%;
        left: 5%;
        bottom: 2%;
        width: 90%;
        background: #FFFFFF;
        border: 0.5px solid #D3D8DD;
        border-radius: 4px;
    }

    .chatD {
        width: 100%;
        height: 300px;
        background-color: #fff;
        overflow-y: scroll;
        margin-bottom: 4rem;


        .adminChat {
            width: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            margin: 2rem 0;


            .caretTxt {
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                position: relative;

                span {
                    position: absolute;
                    left: 22px;
                    top: 0;
                    color: #e5e5e5;

                }

                .textCnt {
                    margin: 0 2rem;
                    border-radius: 8px;
                    padding: 1rem;
                    width: 100%;
                    // display: block;
                    height: auto;
                    background-color: #e5e5e5;

                    p {
                        color: grey;
                        text-align: left;
                        font-size: 12px;
                        font-family: 'Poppins';
                        font-style: normal;
                        font-weight: normal;
                    }
                }
            }

        }

        .userChat {
            margin: 2rem;
            display: flex;
            align-items: flex-start;
            justify-content: flex-end;

            .caretTxt {
                display: flex;
                justify-content: flex-end;
                align-items: flex-end;
                position: relative;

                span {
                    position: absolute;
                    right: 22px;
                    top: 0;
                    color: #e5e5e5;

                }

                .textCnt {
                    margin: 0 2rem;
                    border-radius: 8px;
                    padding: 1rem;
                    width: 50%;
                    height: auto;
                    background-color: #e5e5e5;

                    p {
                        color: grey;
                        text-align: left;
                        font-size: 12px;
                        font-family: 'Poppins';
                        font-style: normal;
                        font-weight: normal;

                    }
                }
            }
        }
    }

    .chatD::-webkit-scrollbar {
        display: block;
        width: 5px;
        height: 5px
    }

    .chatD::-webkit-scrollbar-track {
        background: transparent;
    }

    .chatD::-webkit-scrollbar-thumb {
        background-color: #21618C;
        border-right: none;
        border-left: none;
    }

    .chatD::-webkit-scrollbar-track-piece:end {
        background: transparent;
        margin-bottom: 10px;
    }

    .chatD::-webkit-scrollbar-track-piece:start {
        background: transparent;
        margin-top: 10px;
    }
}

.reviews {
    background-color: #fff;
    border-radius: 5px;
    padding: 1rem;

    h5 {
        margin: 10px;
        color: #21618C;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 800;
        font-size: 20px;
        text-align: left;
    }

    .contDi {
        overflow-x: scroll;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 335px;

        .riderReview {
            margin: 0 1rem;
            padding: 1rem 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 50%;
            height: auto;
            border-radius: 5px;


            .nameTxt {
                margin-top: 10px;
                text-align: center;

                h4 {
                    color: #21618C;
                    font-family: 'Poppins';
                    font-style: normal;
                    font-weight: normal;
                    font-size: 20px;
                }

                p {
                    color: #21618C;
                    font-family: 'Poppins';
                    font-style: normal;
                    font-weight: normal;
                    font-size: 18px;
                }
            }
        }
    }

}

.contDi::-webkit-scrollbar {
    display: block;
    width: 5px;
    height: 5px
}

.contDi::-webkit-scrollbar-track {
    background: transparent;
}

.contDi::-webkit-scrollbar-thumb {
    background-color: #21618C;
    border-right: none;
    border-left: none;
}

.contDi::-webkit-scrollbar-track-piece:end {
    background: transparent;
    margin-bottom: 10px;
}

.contDi::-webkit-scrollbar-track-piece:start {
    background: transparent;
    margin-top: 10px;
}

.logoDiv {
    position: fixed;
    // padding: 1rem 2rem;
    display: flex;
    align-items: center;
    margin-bottom: 5rem;

    .logoTxt {
        display: flex;
        flex-direction: column;
        margin-left: 1rem;
        justify-content: center;
        align-items: flex-end;

        h4 {
            margin: 0%;
            color: #21618C;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: normal;
            font-size: 20px;
        }

        p {
            margin: 0%;
            color: #21618C;
            font-family: 'Caveat';
            font-style: normal;
            font-weight: normal;
            font-size: 20px;
        }
    }

}

.cnt {
    display: flex;
    justify-content: space-between;

    .textD {
        // border: 1px solid grey;
        // padding-left: 5rem;
        background-color: #fff;
        // border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
        // margin: 0%;
        width: 50%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .numbertxt {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: bolder;
            font-size: 45px;
            text-align: left;
            color: #2e4765;
        }

        .numbertxt2 {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 15px;
            text-align: left;
            color: #2e4765;
        }
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

.newR2 {
    width: auto;
    height: auto;
    padding: 0.5rem 3rem;
    margin-left: 2rem;
    background: #21618C;
    // border-radius: 3px;
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 20px;
    text-align: center;

    color: #FFFFFF;
}

.cancl {
    width: auto;
    height: auto;
    padding: 0.5rem 3rem;
    margin-left: 2rem;
    background: grey;
    // border-radius: 3px;
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 20px;
    text-align: center;
    color: #fff;
}

.regDiv {
    width: 80%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;

    .formDiv {
        // border-radius: 18px;
        background-color: #FFFFFF;
        width: 80%;
        height: auto;
        padding: 2rem;
        margin: 0%;

        h3 {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 25px;
            // line-height: 30px;
            /* identical to box height */
            text-align: center;
            color: #393939;
        }

        .inputs {
            // margin-top: 2rem;

            .label-f {
                font-family: 'Poppins';
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 13px;
                /* identical to box height */
                color: #4A869F;
            }

            .textField {
                background-color: #fdfdfd;
                border: 1px solid #dfdbdb;
                border-radius: 5px;
                width: 100%;
                height: 50px;
                padding: 0 1rem;
            }

            .createBtn {
                background-color: #4A869F;
                width: 40%;
                height: 50px;
                font-family: 'Poppins';
                font-style: normal;
                font-weight: 500;
                font-size: 18px;
                margin-bottom: 2rem;
                color: #FFFFFF;
            }

            .signIn {
                color: #4A869F;
                font-family: 'Poppins';
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 13px;
                margin-left: 2px;

                &:hover {
                    color: red;
                    font-family: 'Poppins';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 13px;
                }
            }

            .alrdy {
                color: grey;
                font-family: 'Poppins';
                font-style: normal;
                font-weight: 500;
                font-size: 14px;
                line-height: 13px;
            }
        }
    }
}

* {
    padding: 0;
    margin: 0;
}

a,
a:hover {
    color: $color-accent;
    text-decoration: none;
    font-weight: 600;
}

nav {
    position: fixed;
    width: 100%;
    height: 60px;
    background-color: transparent;
    display: flex;
    align-items: center;
    transition: all .2s ease-in-out;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    // height: 50px;
    // box-shadow: 0 0px 9px 4px rgba(#000, .1), 0 -5px 2px 2px rgba(#000, .1);
    z-index: 1000;
    min-width: 580px;

    &.onScroll {
        box-shadow: 0 0 10px #aaa;
        background-color: #fff;
        // border: 1px solid #21618C;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

        ul li {
            color: #10b761;
        }
    }


    .links {
        // width: 100%;
        float: right;
        margin-right: 30px;
        position: relative;

        li {
            float: left;
            list-style: none;
            position: relative;
            margin: 10px;
            display: inline-block;
            color: #21618C;

            &>a {
                position: relative;
                display: inline-block;
                padding: 0 10px;
                line-height: 30px;
                height: 30px;
                color: #21618C;


                &:hover {
                    color: $color-base;
                    background: $color-accent;
                    border-radius: 2px;
                }

                &[class^="trigger-"] {
                    padding-right: 40px;
                }

                .arrow {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    top: 35%;
                    text-align: center;
                    right: 10px;
                    border-width: 5px 5px 0 5px;
                    border-style: solid;
                    border-color: rgba(#000, .3) transparent;

                    &:after {
                        content: "";
                        border-left: 1px solid rgba(#000, .15);
                        top: -10px;
                        left: -15px;
                        position: absolute;
                        height: 15px;
                    }

                }

            }

            ul {
                position: absolute;
                left: 0;
                //top:40px;
                margin: 0;
                background: $color-base;
                border-radius: 2px;
                box-shadow: 0 0 5px rgba(#000, .15);
                display: none;

                >li {
                    clear: both;
                    list-style: none;
                    display: block;
                    padding: 0 10px;
                    margin: 0;
                    width: 100%;

                    &:hover {

                        background: lighten($color-accent, 40);

                        >a {
                            background: lighten($color-accent, 40);
                            color: $color-base;
                        }
                    }
                }

            }

            &:hover {
                >.drop {
                    display: block;
                    animation: fadeInRight .3s ease;
                    -webkit-animation: fadeInRight .3s ease;
                }
            }

        }
    }

}

@keyframes fadeInRight {
    0% {
        opacity: 0;
        transform: translate3d(100%, 0, 0)
    }

    100% {
        opacity: 1;
        transform: none
    }
}

@media(min-width: 320px) and (max-width: 1200px) {
    .mainChat {
        margin-top: 2rem;
        width: 100%;
        position: relative;
        background-color: #fff;
        padding: 0%;

        .textAre {
            position: absolute;
            // top: 90%;
            left: 5%;
            bottom: 2%;
            width: 90%;
        }

        .chatD {
            width: 100%;
            height: 300px;
            background-color: #fff;
            overflow-y: scroll;
            margin-bottom: 4rem;


            .adminChat {
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;

                .textCnt {
                    margin-left: 10px;
                    margin-top: 0;
                    margin-bottom: 0;
                    margin-right: 0;
                    border-radius: 8px;
                    padding: 1rem;
                    width: 100%;
                    height: auto;
                    background-color: #e5e5e5;

                    p {
                        color: grey;
                        text-align: left;

                    }
                }
            }

            .userChat {
                margin: 2rem 10px;
                display: flex;
                align-items: flex-start;
                justify-content: flex-end;

                .textCnt {
                    margin-right: 10px;
                    margin-top: 0;
                    margin-bottom: 0;
                    margin-left: 0;
                    border-radius: 8px;
                    padding: 1rem;
                    width: 100%;
                    height: auto;
                    background-color: #e5e5e5;

                    p {
                        color: grey;
                        text-align: left;

                    }
                }
            }
        }

        .chatD::-webkit-scrollbar {
            display: block;
            width: 5px;
            height: 5px
        }

        .chatD::-webkit-scrollbar-track {
            background: transparent;
        }

        .chatD::-webkit-scrollbar-thumb {
            background-color: #21618C;
            border-right: none;
            border-left: none;
        }

        .chatD::-webkit-scrollbar-track-piece:end {
            background: transparent;
            margin-bottom: 10px;
        }

        .chatD::-webkit-scrollbar-track-piece:start {
            background: transparent;
            margin-top: 10px;
        }
    }

    .container-fluid {
        position: absolute;
        top: 10%;
        padding: 1rem;
    }

    .reviews {
        background-color: #fff;
        border-radius: 5px;
        padding: 1rem;
        // margin-top: 1rem;

        h5 {
            margin: 10px;
            color: #21618C;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 800;
            font-size: 20px;
            text-align: left;
        }

        .contDi {
            overflow-x: scroll;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 335px;

            .riderReview {
                margin: 0 1rem;
                padding: 1rem 2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                width: 50%;
                height: auto;
                border-radius: 5px;


                .nameTxt {
                    margin-top: 10px;
                    text-align: center;

                    h4 {
                        color: #21618C;
                        font-family: 'Poppins';
                        font-style: normal;
                        font-weight: normal;
                        font-size: 20px;
                    }

                    p {
                        color: #21618C;
                        font-family: 'Poppins';
                        font-style: normal;
                        font-weight: normal;
                        font-size: 18px;
                    }
                }
            }
        }

    }

    .cnt {
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;

        .textD {
            // border: 1px solid grey;
            // padding-left: 5rem;
            margin: 1rem 0;
            border-radius: 10px;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            // margin: 0%;
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;

            .numbertxt {
                font-family: 'Poppins';
                font-style: normal;
                font-weight: bolder;
                font-size: 45px;
                text-align: left;
                color: #2e4765;
            }

            .numbertxt2 {
                font-family: 'Poppins';
                font-style: normal;
                font-weight: 500;
                font-size: 15px;
                text-align: left;
                color: #2e4765;
            }
        }
    }
}
</style>