<template>
    <div class="container-fluid">
        <div class="row">
            <div class="mt-10 col-lg-12">
                <div class="tabTitle">
                    <h4 class="ml-2"> Activities</h4>
                    <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="calories"
                        :items-per-page="5" class="">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                                    hide-details></v-text-field>
                            </v-toolbar>
                        </template>
                    </v-data-table>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import axios from "axios";
// import Swal from 'sweetalert2'
// import jwt_decode from "jwt-decode";


export default {
    data: () => ({
        avata: 150,
        sent: false,
        recieved: false,
        dialog: false,
        search: '',
        idUser: '',
        messages: [],
        Items: [],
        ridersSelect: [{ value: null, id: '', text: 'Select Rider' }],
        // messages2: [],
        mesg: "",
        view: {
            topOfPage: true
        },

        // dialog: false,
        dialogDelete: false,
        headers: [
            { text: 'User Name', value: 'username', class: 'blue-grey lighten-4'},
            { text: 'Email', value: 'useremail', class: 'blue-grey lighten-4'},
            { text: 'Phone', value: 'phone', class: 'blue-grey lighten-4'},
            // { text: 'Category', value: 'usercategory' },
            { text: 'Activity', value: 'activity', class: 'blue-grey lighten-4'},
            { text: 'Date', value: 'date', class: 'blue-grey lighten-4'},
            // { text: 'Actions', value: 'actions', sortable: false },
        ],
        // desserts: [],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            itemId: '',
            createdBy: '',
            goals: '',
            workWithOthers: '',
            accomplishment: '',
        },
        defaultItem: {
            itemId: '',
            createdBy: '',
            goals: '',
            workWithOthers: '',
            accomplishment: '',
        },
    }),
    // computed: {
    //     formTitle() {
    //         return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    //     },
    // },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },
    async beforeMount() {
        this.getallLogs()
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        async getallLogs() {
            console.log();
            const retrievedData = localStorage.getItem('token');
            const token = JSON.parse(retrievedData);
            await axios.get(`http://localhost:3000/api/v1/review/logRoute/logs`,
                {
                    headers: {
                        'token': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log(response.data.data.logs);
                    response.data.data.logs.forEach(elem => {
                        this.desserts.push({
                            logId: elem._id,
                            createdById: elem.user._id,
                            username: elem.user.firstName + " " + elem.user.lastName,
                            activity: elem.activity,
                            useremail: elem.user.email,
                            phone: elem.user.phone,
                            usercategory: elem.user.category.Category,
                            date: elem.date.split("T")[0],
                        })
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
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
            const itemId = this.editedItem.itemId
            await axios.delete(`http://localhost:3000/api/v1/review/users/User/${itemId}`)
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

.sideBtn {
    padding: 0.5rem 0;
    color: #21618C;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    // border-radius: 3px;
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
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        margin: 0%;
        width: 20%;
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