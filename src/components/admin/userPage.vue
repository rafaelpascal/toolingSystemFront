<template>
    <div class="container-fluid">
        <div class="row">
            <div class="mt-10 col-lg-12">
                <div class="tabTitle">
                    <h4 class="ml-2">Users Table</h4>
                    <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="calories"
                        :items-per-page="5" class="">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <!-- <v-toolbar-title> Users Table</v-toolbar-title> -->
                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                                    hide-details></v-text-field>
                                <v-dialog v-model="dialog" persistent max-width="500px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <button class="ml-8 newR" v-bind="attrs" v-on="on"> <span class="mr-2"><i
                                                    class="fas fa-plus"></i></span>
                                            Create User
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
                                                        <v-text-field v-model="editedItem.firstname" label="First Name">
                                                        </v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-text-field v-model="editedItem.othername" label="Other Name">
                                                        </v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-text-field v-model="editedItem.lastname" label="Last Name">
                                                        </v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-text-field v-model="editedItem.unit" label="Unit">
                                                        </v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-text-field v-model="editedItem.level" label="Level">
                                                        </v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-text-field v-model="editedItem.phone" label="Phone">
                                                        </v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-text-field v-model="editedItem.email" label="Email">
                                                        </v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <!-- <v-row  v-if="edititemBtn === false">
                                                <v-col cols="12" sm="12" md="12">
                                                    <v-text-field v-model="editedItem.password" label="Password">
                                                    </v-text-field>
                                                </v-col>
                                            </v-row> -->
                                                <v-row>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-select :items="category" v-model="editedItem.category"
                                                            label="Category"></v-select>
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
                                <v-dialog persistent v-model="dialogDelete" width="400">
                                    <v-card class="px-4 py-4">
                                        <div class="header-card">
                                            <span style="font-size: 25px; cursor: pointer; color: grey;"
                                                @click="dialogDelete = false"><i class="fas fa-times-circle"></i></span>
                                        </div>
                                        <div style="display: flex; justify-content: center; align-items: center">
                                            <!-- <img src="../../assets/think.png" alt="" srcset="" style="background: #fff; "
                                            width="50%"> -->
                                            <span style="font-size: 5rem; color: #FFF176;">
                                                <i class="fas fa-exclamation"></i>
                                            </span>
                                        </div>
                                        <p class="mb-4 cancelrequest2">Are you sure you want to Change this User Status?
                                        </p>
                                        <v-card-actions>
                                            <div class="mt-4">
                                                <!-- <button class="cancel2 mr-4" @click="closeDelete"> No Cancel</button> -->
                                                <button class="sendRequest2" @click="deleteItemConfirm">Yes
                                                    Continue</button>
                                            </div>
                                        </v-card-actions>
                                        <!-- <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions> -->
                                    </v-card>
                                </v-dialog>
                                <v-dialog persistent v-model="activateDelete" width="400">
                                    <v-card class="px-4 py-4">
                                        <div class="header-card">
                                            <span style="font-size: 25px; cursor: pointer; color: grey;"
                                                @click="activateDelete = false"><i
                                                    class="fas fa-times-circle"></i></span>
                                        </div>
                                        <div style="display: flex; justify-content: center; align-items: center">
                                            <!-- <img src="../../assets/think.png" alt="" srcset="" style="background: #fff; "
                                            width="50%"> -->
                                            <span style="font-size: 5rem; color: #FFF176;">
                                                <i class="fas fa-exclamation"></i>
                                            </span>
                                        </div>
                                        <p class="mb-4 cancelrequest2">Are you sure you want to Change this User Status?
                                        </p>
                                        <v-card-actions>
                                            <div class="mt-4">
                                                <!-- <button class="cancel2 mr-4" @click="closeDelete"> No Cancel</button> -->
                                                <button class="sendRequest2" @click="activateItemConfirm">Yes
                                                    Continue</button>
                                            </div>
                                        </v-card-actions>
                                        <!-- <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions> -->
                                    </v-card>
                                </v-dialog>
                            </v-toolbar>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon small class="mr-2" @click="editItem(item)">
                                mdi-pencil
                            </v-icon>
                            <!-- <v-icon small @click="deleteItem(item)">
                            mdi-cog
                        </v-icon> -->
                            <span>
                                <v-btn @click="activateItemConfirm(item)" text
                                    style="color: #21618C; font-size: 12px; text-transform:capitalize"
                                    v-if="item.status === false">Activate</v-btn>
                                <v-btn @click="deleteItemConfirm(item)" text
                                    style="color: red; font-size: 12px; text-transform:capitalize" v-else>Deactivate
                                </v-btn>
                            </span>
                        </template>
                        <template v-slot:[`item.status`]="{ item }">
                            <span v-if="item.status === false" small
                                style="color: red; font-size: 12px; text-transform:capitalize" class="mr-2">
                                Inactive
                            </span>
                            <span v-else small style="color: #21618C; font-size: 12px; text-transform:capitalize">
                                Active
                            </span>
                        </template>
                        <!-- <template v-slot:no-data>
                        <v-btn color="primary" @click="initialize">
                            Reset
                        </v-btn>
                    </template> -->
                    </v-data-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import io from "socket.io-client";
import axios from "axios";
import Swal from "sweetalert2"

export default {
    data: () => ({
        avata: 150,
        sent: false,
        recieved: false,
        edititemBtn: false,
        search: '',
        request: '',
        users: '',
        riders: '',
        messages: [],
        Items: [],
        ridersDetails: [],
        category: [],
        // messages2: [],
        mesg: "",
        view: {
            topOfPage: true
        },

        dialog: false,
        dialogDelete: false,
        activateDelete: false,
        headers: [
            {
                text: 'First Name',
                align: 'start',
                sortable: false,
                value: 'firstname',
                class: 'blue-grey lighten-4'
            },
            {
                text: 'Other Name',
                align: 'start',
                sortable: false,
                value: 'othername',
                class: 'blue-grey lighten-4'
            },
            {
                text: 'Last Name',
                align: 'start',
                sortable: false,
                value: 'lastname',
                class: 'blue-grey lighten-4'
            },
            { text: 'Category', value: 'category', class: 'blue-grey lighten-4'},
            { text: 'Unit', value: 'unit', class: 'blue-grey lighten-4'},
            { text: 'Level', value: 'level', class: 'blue-grey lighten-4'},
            { text: 'Phone', value: 'phone', class: 'blue-grey lighten-4'},
            { text: 'Email', value: 'email', class: 'blue-grey lighten-4'},
            { text: 'Status', value: 'status', class: 'blue-grey lighten-4'},
            { text: 'Actions', value: 'actions', sortable: false, class: 'blue-grey lighten-4'},
        ],
        // desserts: [],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            userId: '',
            firstname: '',
            othername: '',
            lastname: '',
            category: '',
            unit: '',
            level: '',
            status: '',
            phone: '',
            email: '',
            // password: '',
        },
        defaultItem: {
            userId: '',
            firstname: '',
            othername: '',
            lastname: '',
            category: '',
            unit: '',
            level: '',
            status: '',
            phone: '',
            email: '',
            // password: '',
        },
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New User' : 'Edit User'
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
        this.getCategory()
        this.getusers()
    },
    methods: {
        async getusers() {
            const retrievedData = localStorage.getItem('token');
            const token = JSON.parse(retrievedData);
            await axios.get(`http://localhost:3000/api/v1/review/users/getUsers`, {
                headers: {
                    'token': `Bearer ${token}`
                }
            })
                .then((response) => {
                    response.data.data.Allusers.forEach(elem => {
                        this.desserts.push({
                            userId: elem._id,
                            firstname: elem.firstName,
                            othername: elem.otherName,
                            lastname: elem.lastName,
                            date: elem.createdAt.split("T")[0],
                            category: elem.category.Category,
                            unit: elem.unit,
                            level: elem.level,
                            phone: elem.phone,
                            email: elem.email,
                            status: elem.isActive,

                        })
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        async getCategory() {
            const retrievedData = localStorage.getItem('token');
            const token = JSON.parse(retrievedData);
            await axios.get(`http://localhost:3000/api/v1/review/categoryRoute/newcategory`, {
                headers: {
                    'token': `Bearer ${token}`
                }
            })
                .then((response) => {
                    console.log(response.data.data.categories);
                    response.data.data.categories.forEach(el => {
                        this.category.push({
                            value: el._id,
                            text: el.Category,
                        })
                    })
                    console.log(this.category);
                })
                .catch((error) => {
                    console.log(error);
                })
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
        activateItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.activateDelete = true
        },

        //This function is used to Deactivate
        async deleteItemConfirm(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            const userId = this.editedItem.userId
            await axios.patch(`http://localhost:3000/api/v1/review/users/deactivateUser/${userId}`,
                {
                    isActive: false,
                })
                .then((response) => {
                    console.log(response.data.data.user.isActive);
                    const item = response.data.data.user;
                    this.editedItem = {
                        status: item.isActive
                    };
                    Swal.fire({
                        icon: 'success',
                        title: 'Proceed',
                        showConfirmButton: false,
                        text: 'User Deactivated Successfully',
                        width: 350,
                        timer: 1000
                    })
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                })
                .catch((error) => {
                    console.log(error);
                })
            this.closeDelete()
        },

        //This function is used to Activate the user after deactivation
        async activateItemConfirm(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            const userId = this.editedItem.userId
            await axios.patch(`http://localhost:3000/api/v1/review/users/activateUser/${userId}`)
                .then((response) => {
                    // console.log(response);
                    console.log(response.data.data.user.isActive);
                    const item = response.data.data.user;
                    this.editedItem = {
                        status: item.isActive
                    };
                    Swal.fire({
                        icon: 'success',
                        title: 'Proceed',
                        showConfirmButton: false,
                        text: 'User Activated Successfully',
                        width: 350,
                        timer: 1000
                    })
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                })
                .catch((error) => {
                    console.log(error);
                })
            this.AcloseDelete()
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
        AcloseDelete() {
            this.activateDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        async save() {
            const userId = this.editedItem.userId
            if (this.editedIndex > -1) {
                await axios.patch(`http://localhost:3000/api/v1/review/users/User/${userId}`,
                    {
                        firstName: this.editedItem.firstname,
                        otherName: this.editedItem.othername,
                        lastName: this.editedItem.lastname,
                        category: this.editedItem.category,
                        unit: this.editedItem.unit,
                        level: this.editedItem.level,
                        phone: this.editedItem.phone,
                        email: this.editedItem.email,
                        // password: this.editedItem.password,
                    })
                    .then((response) => {
                        console.log(response);
                        Object.assign(this.desserts[this.editedIndex], this.editedItem)
                        this.close()
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } else {
                await axios.post(`http://localhost:3000/api/v1/review/auth/admincreate`,
                    {
                        firstName: this.editedItem.firstname,
                        otherName: this.editedItem.othername,
                        lastName: this.editedItem.lastname,
                        category: this.editedItem.category,
                        unit: this.editedItem.unit,
                        level: this.editedItem.level,
                        phone: this.editedItem.phone,
                        email: this.editedItem.email,
                        password: this.editedItem.password,
                    })
                    .then((response) => {
                        const item = response.data;
                        console.log('post User',response.data);
                        this.editedItem = {
                            userId: item._id,
                            firstname: item.firstName,
                            othername: item.otherName,
                            lastname: item.lastName,
                            date: item.createdAt.split("T")[0],
                            category: item.category.Category,
                            unit: item.unit,
                            level: item.level,
                            phone: item.phone,
                            email: item.email
                        };
                        this.desserts.push(this.editedItem)
                        this.close()
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

.sendRequest2 {
    // margin-right: 50px;
    // border-radius: 8px;
    padding: 10px 25px;
    background: #21618C;
    // border-radius: 3px;
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 20px;
    text-align: center;

    color: #FFFFFF;
}

.cancel2 {
    // margin-right: 50px;
    background: grey;
    border: 1px solid grey;
    padding: 10px 25px;
    // border-radius: 8px;
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 20px;
    text-align: center;
    color: #fff;
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
        // position: absolute;
        // top: 10%;
        padding-top: 5rem;
        padding-left: 1rem;
        height: auto;
        background-color: #E5E5E5;
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