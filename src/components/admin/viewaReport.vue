<template>
    <div class="container-fluid">
        <div class="mt-10 row">
            <div class="col-lg-12">
                <div>
                    <div class="my-4">
                        <button style="color: #21618C" @click="gobacktoPage"> <span style="margin:0 1rem"><i
                                    class="fas fa-arrow-left"></i></span> Go Back</button>
                    </div>
                    <div class="chatPage">
                        <div>
                            <h6 class="name">{{ userName }} {{ userSurname }} Report </h6>
                            <p class="date">{{ createdOn }}</p>
                            <p class="date">{{ month }}</p>
                        </div>
                        <v-container class="ma-0 pa-0">
                            <v-row>
                                <v-col cols="12" sm="12" md="12">
                                    <h6 class="my-2">Goals for this period</h6>
                                    <span style="text-align:left; display: block;" v-html="goals" />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="12">
                                    <h6 class="my-2">My accomplishments</h6>
                                    <span style="text-align:left; display: block;" v-html="accomplishment" />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="12">
                                    <h6 class="my-2">How I worked with others</h6>
                                    <span style="text-align:left; display: block;" v-html="workWithOthers" />
                                </v-col>
                            </v-row>
                        </v-container>
                    </div>
                    <hr style="color: #E8E5E5">
                    <h6 class="viewPrevious">View previous comments</h6>
                    <div class="chatText">
                        <div class="">
                            <div class="messageTxt2" v-for="message in messages" :key="message.id">
                                <h6 class="SendrName">
                                    <span>
                                        <v-avatar color="blue" size="48">
                                            <span class="white--text text-h5">{{ message.avatar }}</span>
                                        </v-avatar>
                                        <span class="ml-4">
                                            {{ message.user }}
                                        </span>
                                        <span style="font-size: 12px" class="ml-2">{{ message.reportdate }}</span>
                                    </span>
                                    <div>
                                        <button class="mr-4 deleteBtn" @click="replyTxtShw(message)"><i
                                                class="fas fa-reply"></i></button>
                                        <!-- <button class="deleteBtn" @click="deleteRemark(message)"><i
                                                class="fas fa-trash-alt"></i></button> -->
                                    </div>
                                </h6>
                                <p class="msgBody">{{ message.text }}</p>

                                <!-- <button text class="replybtn" @click="replyTxtShw(message)">{{ message.replybtn
                                }}</button> -->

                                <div class="senderMsg2">
                                    <div id="chatBox2" class="mb-8 messageTxt" v-for="replymessage in replymessages2"
                                        :key="replymessage.id">
                                        <span v-if="message.remarkId == replymessage.remarkId">
                                            <h6 class="SendrName">
                                                <span>
                                                    <v-avatar color="orange" size="48">
                                                        <span class="white--text text-h5">{{ replymessage.avatar
                                                        }}</span>
                                                    </v-avatar>
                                                    <span class="ml-4">
                                                        {{ replymessage.user }}
                                                    </span>
                                                    <span style="font-size: 12px" class="ml-2">{{
                                                            replymessage.reportdate
                                                    }}</span>
                                                </span>
                                                <div>
                                                    <button class="mr-4 deleteBtn"
                                                        @click="replyTxtShw2(replymessage)"><i
                                                            class="fas fa-reply"></i></button>
                                                    <button class="deleteBtn" @click="deleteReply(replymessage)"><i
                                                            class="fas fa-trash-alt"></i></button>
                                                </div>
                                            </h6>
                                            <!-- <span v-if="message.text" class="textreply2"><span>Reply to </span>{{
                                                    message.text
                                            }}</span>
                                            <span v-else>{{ replymessage.text }}</span> -->
                                            <p class="msgBody">{{ replymessage.text }}</p>

                                            <!-- <button text class="replybtn" @click="replyTxtShw2(replymessage)">{{
                                                    message.replybtn
                                            }}</button> -->
                                        </span>
                                        <span v-else></span>
                                    </div>
                                </div>
                                <div v-for="replymessage in replymessages2" :key="replymessage.id">
                                    <div v-if="replymessage.showreplyBox">
                                        <span v-if="message.remarkId == replymessage.remarkId">
                                            <p class="userreply"><span style="margin-right:8px; font-size:20px"><i
                                                        class="fas fa-reply-all"></i></span>{{ replymessage.user }}</p>
                                            <span class="textreply">{{ replymessage.text }}</span>
                                            <div id="message.remarkId" class="textBtn2">
                                                <textarea v-on:keyup.enter="postRemarkreply2(replymessage)" v-model="replytxt" class="textArea" id=""
                                                    placeholder="Comment/Remarks" rows="1"></textarea>
                                                <button class="saveRemark"
                                                    @click="postRemarkreply2(replymessage)">Send</button>
                                            </div>
                                        </span>
                                        <span v-else></span>
                                        </div>
                                    </div>
                                <div v-if="message.showreplyBox">
                                    <p class="userreply"><span style="margin-right:8px; font-size:20px"><i
                                                class="fas fa-reply-all"></i></span>{{ message.user }}</p>
                                    <span class="textreply">{{ message.text }}</span>
                                    <div id="message.remarkId" class="textBtn2">
                                        <textarea v-on:keyup.enter="postRemarkreply(message)" v-model="replytxt" class="textArea" id=""
                                            placeholder="Comment/Remarks" rows="1"></textarea>
                                        <button class="saveRemark" @click="postRemarkreply(message)">Send</button>
                                    </div>
                                </div>
                            </div>
                            <!-- <button text class="replybtn">Reply</button> -->
                            <!-- <div class="senderMsg">
                                <div id="chatBox2" class="messageTxt" v-for="replymessage in replymessages"
                                    :key="replymessage.id">
                                    <h6 class="SendrName"> <span>
                                            <v-avatar color="orange" size="48">
                                                <span class="white--text text-h5">U</span>
                                            </v-avatar>
                                            <span class="ml-4">
                                                {{ replymessage.user }}
                                            </span>
                                        </span> <span>{{ replymessage.reportdate }}</span></h6>
                                    <p class="msgBody">{{ replymessage.text }}</p>
                                </div>
                            </div> -->
                            <!-- <div class="senderMsg2">
                                <div id="chatBox2" class="messageTxt" v-for="replymessage in replymessages3"
                                    :key="replymessage.id">
                                    <h6 class="SendrName"> <span>
                                            <v-avatar color="blue" size="48">
                                                <span class="white--text text-h5">A</span>
                                            </v-avatar>
                                            <span class="ml-4">
                                                {{ replymessage.user }}
                                            </span>
                                        </span> <span>{{ replymessage.reportdate }}</span></h6>
                                    <p class="msgBody">{{ replymessage.text }}</p>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <div class="sendRemark mt-10">
                        <!-- <v-textarea v-on:keyup.enter="sendMessage" v-model="bio" auto-grow filled
                            color="deep-purple" label="Remark" rows="1">
                        </v-textarea> -->
                        <div class="textBtn">
                            <textarea v-on:keyup.enter="saveRemark" v-model="bio" class="textArea"
                                id="exampleFormControlTextarea1" placeholder="Comment/Remarks" rows="1"></textarea>
                            <button class="saveRemark" @click="saveRemark">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'
import io from "socket.io-client"
// import jwt_decode from "jwt-decode";



export default {
    data: () => ({
        reponse: false,
        messages: [],
        replymessages: [],
        replymessages2: [],
        replymessages3: [],
        avata: 150,
        sent: false,
        recieved: false,
        edititemBtn: false,
        dialogRemark: false,
        commentdialog: false,
        itemId: '',
        replyValue: '',
        branch: '',
        formattedDate: '',
        replytxt: '',
        bio: '',
        userName: '',
        userSurname: '',
        createdBy: '',
        createdOn: '',
        month: '',
        goals: '',
        workWithOthers: '',
        accomplishment: '',
        userID: '',
        // messages2: [],
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: 'Remark By', value: 'remarkBy' },
            { text: 'Category', value: 'category' },
            // { text: 'Date Created', value: 'dateCreated' },
            { text: 'Report Submission Date', value: 'reportdate' },
            // { text: 'Protein (g)', value: 'protein' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            reportdate: '',
            remarkBy: '',
            dateCreated: '',
            category: '',
        },
        defaultItem: {
            reportdate: '',
            remarkBy: '',
            dateCreated: '',
            category: '',
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
        this.socketInstance = io("http://localhost:3000")

        this.socketInstance.on(
            "message:recieved", (data) => {
                this.messages = this.messages.concat(data)
            }
        )
        // const retrievedRemarkId = localStorage.getItem('remarkId');
        const retrievedData = localStorage.getItem('token');
        const retrievedItemId = localStorage.getItem('IdItem');
        const retrieveduserId = localStorage.getItem('userID');
        const token = JSON.parse(retrievedData);
        const item = JSON.parse(retrievedItemId);
        const user = JSON.parse(retrieveduserId);
        // const Remark = JSON.parse(retrievedRemarkId);
        // console.log('ItemId', item);
        // console.log('TOKEN', token);
        // console.log('USERID', user);
        // console.log('Remark', Remark);
        this.getremarks()
        this.getreplyremarks()
        this.getreplyremarks2()

        await axios.all([
            axios.get(`http://localhost:3000/api/v1/review/userreport/getreviewone/${item}`, {
                headers: {
                    'token': `Bearer ${token}`
                }
            }),
            axios.get(`http://localhost:3000/api/v1/review/users/User/${user}`, {
                headers: {
                    'token': `Bearer ${token}`
                }
            }),
            // axios.get(`http://localhost:3000/api/v1/review/adminRemark/remark/${item}`, {
            //     headers: {
            //         'token': `Bearer ${token}`
            //     }
            // }),
            // axios.get(`http://localhost:3000/api/v1/review/userReply/reply/${item}`, {
            //     headers: {
            //         'token': `Bearer ${token}`
            //     }
            // }),
        ])
            .then(axios.spread((response1, response2) => {
                // this.report = response1.data.data.nbHits
                console.log(response1);
                const res = response1.data.data
                this.goals = res.goals
                this.itemId = res._id
                this.workWithOthers = res.workingWithothers
                this.accomplishment = res.accomplishment
                this.month = res.month + ' ' + res.createdAt.split("T")[0].split("-")[2]
                // this.createdOn = res.createdAt.split("T")[0]
                this.userID = response2.data.user._id
                // console.log(response2.data.user);
                this.userName = response2.data.user.firstName + ' ' + response2.data.user.lastName
                this.branch = response2.data.user.branch
                // response3.data.data.remarks.forEach(elem => {
                //     this.messages.push({
                //         remarkId: elem._id,
                //         text: elem.comment,
                //         user: elem.remarkBy.firstName + ' ' + elem.remarkBy.lastName,
                //         reportdate: elem.createdAt.split("T")[0],
                //         replybtn: elem.replybutton,
                //         showreplyBox: false,
                //         replyofRemark: elem.replyofRemark,
                //         // remarkBy: elem.remarkBy.firstName + " " + elem.remarkBy.lastName,
                //         // // dateCreated: elem.createdAt.split("T")[0],
                //         // category: elem.remarkBy.category,
                //     })
                // });
                // response4.data.data.replys.forEach(elem => {
                //     this.replymessages.push({
                //         remarkId: elem._id,
                //         text: elem.reply,
                //         user: elem.replyBy.firstName+' '+elem.replyBy.lastName,
                //         reportdate: elem.createdAt.split("T")[0],
                //         // remarkBy: elem.remarkBy.firstName + " " + elem.remarkBy.lastName,
                //         // // dateCreated: elem.createdAt.split("T")[0],
                //         // category: elem.remarkBy.category,
                //     })
                // });
            }))
            .catch(function (error) {
                console.log(error);
            });
    },
    methods: {
        replyTxtShw(message) {
            // console.log(message);
            message.showreplyBox = !message.showreplyBox
        },
        replyTxtShw2(replymessage) {
            console.log(replymessage);
            replymessage.showreplyBox = !replymessage.showreplyBox
        },
        // DELETE REPLY
        async deleteReply(replymessage) {
            const itemId = replymessage.replyremarkId
            const retrievedData = localStorage.getItem('token');
            const token = JSON.parse(retrievedData);
            await axios.delete(`http://localhost:3000/api/v1/review/userReply/deletereplies/${itemId}`,
                {
                    headers: {
                        'token': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log(response);
                    this.getreplyremarks()
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        // DELETE REMARK
        async deleteRemark(message) {
            console.log(message);
            const itemId = message.remarkId
            const retrievedData = localStorage.getItem('token');
            const token = JSON.parse(retrievedData);
            await axios.delete(`http://localhost:3000/api/v1/review/adminRemark/remark/${itemId}`,
                {
                    headers: {
                        'token': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log(response);
                    this.getreplyremarks()
                    this.deleteReply()
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        async getremarks() {
            const retrievedItemId = localStorage.getItem('IdItem');
            const item = JSON.parse(retrievedItemId);
            const retrievedData = localStorage.getItem('token');
            const token = JSON.parse(retrievedData);
            await axios.get(`http://localhost:3000/api/v1/review/adminRemark/remark/${item}`,
                {
                    headers: {
                        'token': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    // console.log(response);
                    console.log(response.data.data.remarks);
                    const messages = [];
                    response.data.data.remarks.forEach(elem => {
                        messages.push({
                            avatar: elem.remarkBy.lastName[0],
                            remarkId: elem._id,
                            text: elem.comment,
                            replybtn: elem.replybutton,
                            user: elem.remarkBy.firstName + ' ' + elem.remarkBy.lastName,
                            reportdate: elem.date.split("T")[0],
                            replyofRemark: elem.replyofRemark,
                            showreplyBox: false,
                            showreplyBoxrrr: false,
                        })
                    });
                    this.messages = messages
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        async getreplyremarks() {
            const retrievedData = localStorage.getItem('token');
            const token = JSON.parse(retrievedData);
            await axios.get(`http://localhost:3000/api/v1/review/userReply/reply`,
                {
                    headers: {
                        'token': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    // console.log(response);
                    console.log('ReplygET', response);
                    const replymessages2 = [];
                    response.data.data.replys.forEach(elem => {
                        replymessages2.push({
                            avatar: elem.replyBy.lastName[0],
                            remarkId: elem.remarkId._id,
                            replyremarkId: elem._id,
                            text: elem.reply,
                            user: elem.replyBy.firstName + ' ' + elem.replyBy.lastName,
                            reportdate: elem.createdAt.split("T")[0],
                            showreplyBox: false,
                            showreplyBoxrrr: false,
                        })
                    });
                    this.replymessages2 = replymessages2
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        async getreplyremarks2() {
            const retrievedData = localStorage.getItem('token');
            const token = JSON.parse(retrievedData);
            await axios.get(`http://localhost:3000/api/v1/review/admincommentReply/commentreply`,
                {
                    headers: {
                        'token': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    // console.log(response);
                    console.log(response);
                    const replymessages3 = [];
                    response.data.data.replys.forEach(elem => {
                        replymessages3.push({
                            replyremarkId: elem._id,
                            text: elem.commentReply,
                            user: elem.replyByid.firstName + ' ' + elem.replyByid.lastName,
                            reportdate: elem.createdAt.split("T")[0],
                        })
                    });
                    this.replymessages3 = replymessages3
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        async postRemarkreply(message) {
            // console.log('helo');
            // console.log(this.messages[0].remarkId);
            const remarkId = message.remarkId
            console.log(remarkId);
            // const RuserId = this.userID
            const retrievedData = localStorage.getItem('token');
            const token = JSON.parse(retrievedData);
            if (this.replytxt === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Comment is Empty',
                    width: 350,
                })
            } else {
                // console.log(this.userID);
                await axios.post(`http://localhost:3000/api/v1/review/userReply/replies/${remarkId}`,
                    {
                        reply: this.replytxt,
                    },
                    {
                        headers: {
                            'token': `Bearer ${token}`
                        }
                    })
                    .then((response) => {
                        console.log(response);
                        this.replytxt = '';
                        this.getreplyremarks()
                        message.showreplyBox = false
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something Went Wrong Please Try again.',
                            width: 350,
                        })
                    })
            }
        },
        async postRemarkreply2(replymessage) {
            // console.log('helo');
            // console.log(this.messages[0].remarkId);
            const remarkId = replymessage.remarkId
            console.log(remarkId);
            // const RuserId = this.userID
            const retrievedData = localStorage.getItem('token');
            const token = JSON.parse(retrievedData);
            if (this.replytxt === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Comment is Empty',
                    width: 350,
                })
            } else {
                // console.log(this.userID);
                await axios.post(`http://localhost:3000/api/v1/review/userReply/replies/${remarkId}`,
                    {
                        reply: this.replytxt,
                    },
                    {
                        headers: {
                            'token': `Bearer ${token}`
                        }
                    })
                    .then((response) => {
                        console.log(response);
                        this.replytxt = '';
                        this.getreplyremarks()
                        replymessage.showreplyBox = false
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something Went Wrong Please Try again.',
                            width: 350,
                        })
                    })
            }
        },
        gobacktoPage() {
            // setTimeout(() => {
            this.$router.push('/allReport')
            // }, 1200);
        },
        sendMessage() {
            // console.log(this.bio)
            this.addMessage()
            this.bio = "";
        },
        addMessage() {
            const message = {
                id: new Date().getTime(),
                text: this.bio,
                user: this.userName
            }
            this.messages = this.messages.concat(message)
            this.socketInstance.emit('message', message)
        },
        opencommentD(item) {
            console.log(item);
            this.commentdialog = true
        },
        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogRemark = true
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
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

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },
        async saveRemark() {
            const reportId = this.itemId
            const retrievedData = localStorage.getItem('token');
            const token = JSON.parse(retrievedData);
            if (this.bio === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Comment is Empty',
                    width: 350,
                })
            } else {
                await axios.post(`http://localhost:3000/api/v1/review/adminRemark/remarks/${reportId}`,
                    {
                        comment: this.bio,
                        replybutton: 'Reply'
                    },
                    {
                        headers: {
                            'token': `Bearer ${token}`
                        }
                    })
                    .then((response) => {
                        console.log(response);
                        this.getremarks()
                        this.bio = '';
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something Went Wrong Please Try again.',
                            width: 350,
                        })
                    })
            }
        }
    },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css?family=Caveat');
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@200&display=swap');

$color-base: #fff;
$color-text: #222;
$color-accent: desaturate(navy, 80%);

.chatPage {
    // box-sizing: border-box;
    width: 100%;
    height: 395px;
    background: #FFFFFF;
    border: 1px solid #E8EDF0;
    border-radius: 4px;
    padding: 31px;
    overflow-y: scroll;

    .name {
        font-family: 'Mulish';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        /* identical to box height, or 125% */
        color: #6C6C6C;
    }

    .date {
        font-family: 'Mulish';
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 20px;
        /* identical to box height, or 167% */
        color: #9F9F9F;
    }
}

.chatPage::-webkit-scrollbar {
    display: block;
    width: 5px;
    height: 5px
}

.chatPage::-webkit-scrollbar-track {
    background: transparent;
}

.chatPage::-webkit-scrollbar-thumb {
    background-color: #21618C;
    border-right: none;
    border-left: none;
}

.chatPage::-webkit-scrollbar-track-piece:end {
    background: transparent;
    margin-bottom: 10px;
}

.chatPage::-webkit-scrollbar-track-piece:start {
    background: transparent;
    margin-top: 10px;
}



.senderMsg2 {
    // margin-left: 4rem;
    margin-bottom: 2rem;
    // margin-top: 1rem;
}

.textBtn {
    background-color: #FFFFFF;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border: 1px solid #E8EDF0;
    border-radius: 4px;
    align-items: center;

    .textArea {
        padding: 1rem;
        background-color: #FFFFFF;
        width: 100%;

        border: none;
        overflow: auto;
        outline: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
    }

    .saveRemark {
        width: 76px;
        height: 36px;
        background: #F03C3C;
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

.textBtn2 {
    background-color: #FFFFFF;
    width: auto;
    // margin-left: 4rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    border: 1px solid #E8EDF0;
    border-radius: 4px;
    align-items: center;

    .textArea {
        padding: 1rem;
        background-color: #FFFFFF;
        width: 100%;

        border: none;
        overflow: auto;
        outline: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
    }

    .saveRemark {
        width: 76px;
        height: 36px;
        background: #F03C3C;
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

.viewPrevious {
    font-family: 'Mulish';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    /* identical to box height */
    display: flex;
    align-items: center;
    color: #F03C3C;
}

.chatText {
    // box-sizing: border-box;
    width: 100%;
    height: auto;
    // background: #FFFFFF;
    // border: 1px solid #E8EDF0;
    border-radius: 4px;
    padding: 31px;


    .messageTxt {
        width: 100%;

        .SendrName {
            font-family: 'Mulish';
            font-style: normal;
            font-weight: 800;
            font-size: 13px;
            // line-height: 20px;
            /* identical to box height, or 154% */
            color: #6C6C6C;
            // display: flex;
            // justify-content: center;
        }

        .msgBody {
            font-family: 'Mulish';
            font-style: normal;
            font-weight: 800;
            font-size: 13px;
            padding-bottom: 0%;
            margin-bottom: 0%;
            // line-height: 20px;
            /* or 154% */
            width: 100%;
            margin-left: 4.5rem;
            color: #6C6C6C;
        }
    }

    .messageTxt2 {
        margin: 1rem 0;
        box-sizing: border-box;
        width: 100%;
        height: auto;
        background: #FFFFFF;
        border: 1px solid #E8EDF0;
        border-radius: 4px;
        padding: 31px;

        .SendrName {
            font-family: 'Mulish';
            font-style: normal;
            font-weight: 800;
            font-size: 15px;
            // line-height: 20px;
            /* identical to box height, or 154% */
            color: #6C6C6C;
            margin: 0%;
            padding: 0%;
            display: flex;
            justify-content: space-between;

            .deleteBtn {
                color: lightgray;

                &:hover {
                    color: gray;
                }
            }
        }

        .msgBody {
            font-family: 'Mulish';
            font-style: normal;
            font-weight: 800;
            font-size: 13px;
            width: 95%;
            // line-height: 20px;
            /* or 154% */
            margin-left: 4.5rem;
            color: #6C6C6C;
        }

        .userreply {
            font-family: 'Mulish';
            font-style: normal;
            font-weight: 800;
            font-size: 13px;
            padding: 0%;
            margin: 0%;
            // margin-left: 20px;
            color: #6C6C6C;
        }

        .textreply {
            font-family: 'Mulish';
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            font-style: italic;
            // padding: 0%;
            // margin: 0%;
            // margin-left: 30px;
            color: #6C6C6C;
        }

        .textreply2 {
            font-family: 'Mulish';
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            // padding: 0%;
            padding-left: 2.7rem;
            margin-left: 30px;
            color: #6C6C6C;
        }
    }
}

.replybtn {
    margin-bottom: 30px;
    font-family: 'Mulish';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    color: #F03C3C;
    margin-left: 4.5rem;

}

.sendRemark {
    display: flex;
    justify-content: center;
    align-items: center;
}

.container-fluid {
    height: 100vh;
    padding-top: 2rem;
    padding-left: 5rem;
    padding-bottom: 5rem;
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

.sendRequest2 {
    // margin-right: 50px;
    // border-radius: 8px;
    padding: 10px 25px;
    margin-top: 2rem;
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

@media(min-width: 320px) and (max-width: 1200px) {

    .chatPage {
        // box-sizing: border-box;
        width: 100%;
        height: 395px;
        background: #FFFFFF;
        border: 1px solid #E8EDF0;
        border-radius: 4px;
        padding: 31px;
        overflow-y: scroll;

        .name {
            font-family: 'Mulish';
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 20px;
            /* identical to box height, or 125% */
            color: #6C6C6C;
        }

        .date {
            font-family: 'Mulish';
            font-style: normal;
            font-weight: 700;
            font-size: 12px;
            line-height: 20px;
            /* identical to box height, or 167% */
            color: #9F9F9F;
        }
    }

    .chatPage::-webkit-scrollbar {
        display: block;
        width: 5px;
        height: 5px
    }

    .chatPage::-webkit-scrollbar-track {
        background: transparent;
    }

    .chatPage::-webkit-scrollbar-thumb {
        background-color: #21618C;
        border-right: none;
        border-left: none;
    }

    .chatPage::-webkit-scrollbar-track-piece:end {
        background: transparent;
        margin-bottom: 10px;
    }

    .chatPage::-webkit-scrollbar-track-piece:start {
        background: transparent;
        margin-top: 10px;
    }



    .senderMsg2 {
        // margin-left: 4rem;
        margin-bottom: 2rem;
        // margin-top: 1rem;
    }

    .textBtn {
        background-color: #FFFFFF;
        width: 100%;
        display: flex;
        justify-content: space-between;
        border: 1px solid #E8EDF0;
        border-radius: 4px;
        align-items: center;

        .textArea {
            padding: 1rem;
            background-color: #FFFFFF;
            width: 100%;

            border: none;
            overflow: auto;
            outline: none;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
        }

        .saveRemark {
            width: 76px;
            height: 36px;
            background: #F03C3C;
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

    .textBtn2 {
        background-color: #FFFFFF;
        width: auto;
        // margin-left: 4rem;
        margin-bottom: 2rem;
        display: flex;
        justify-content: space-between;
        border: 1px solid #E8EDF0;
        border-radius: 4px;
        align-items: center;

        .textArea {
            padding: 1rem;
            background-color: #FFFFFF;
            width: 100%;

            border: none;
            overflow: auto;
            outline: none;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
        }

        .saveRemark {
            width: 76px;
            height: 36px;
            background: #F03C3C;
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

    .viewPrevious {
        font-family: 'Mulish';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 18px;
        /* identical to box height */
        display: flex;
        align-items: center;
        color: #F03C3C;
    }

    .chatText {
        box-sizing: border-box;
        width: 100%;
        height: auto;
        // background: #FFFFFF;
        // border: 1px solid #E8EDF0;
        border-radius: 4px;
        padding: 0px;


        .messageTxt {
            width: 100%;

            .SendrName {
                font-family: 'Mulish';
                font-style: normal;
                font-weight: 800;
                font-size: 13px;
                // line-height: 20px;
                /* identical to box height, or 154% */
                color: #6C6C6C;
                // display: flex;
                // justify-content: center;
            }

            .msgBody {
                font-family: 'Mulish';
                font-style: normal;
                font-weight: 800;
                font-size: 13px;
                padding-bottom: 0%;
                margin-bottom: 0%;
                // line-height: 20px;
                /* or 154% */
                width: 100%;
                margin-left: 4.5rem;
                color: #6C6C6C;
            }
        }

        .messageTxt2 {
            margin: 1rem 0;
            box-sizing: border-box;
            width: 100%;
            height: auto;
            background: #FFFFFF;
            border: 1px solid #E8EDF0;
            border-radius: 4px;
            padding: 31px;

            .SendrName {
                font-family: 'Mulish';
                font-style: normal;
                font-weight: 800;
                font-size: 15px;
                // line-height: 20px;
                /* identical to box height, or 154% */
                color: #6C6C6C;
                margin: 0%;
                padding: 0%;
                display: flex;
                justify-content: space-between;

                .deleteBtn {
                    color: lightgray;

                    &:hover {
                        color: gray;
                    }
                }
            }

            .msgBody {
                font-family: 'Mulish';
                font-style: normal;
                font-weight: 800;
                font-size: 13px;
                width: 85%;
                // line-height: 20px;
                /* or 154% */
                margin-left: 2.5rem;
                color: #6C6C6C;
            }

            .userreply {
                font-family: 'Mulish';
                font-style: normal;
                font-weight: 800;
                font-size: 13px;
                padding: 0%;
                margin: 0%;
                // margin-left: 20px;
                color: #6C6C6C;
            }

            .textreply {
                font-family: 'Mulish';
                font-style: normal;
                font-weight: 400;
                font-size: 13px;
                font-style: italic;
                // padding: 0%;
                // margin: 0%;
                // margin-left: 30px;
                color: #6C6C6C;
            }

            .textreply2 {
                font-family: 'Mulish';
                font-style: normal;
                font-weight: 400;
                font-size: 13px;
                // padding: 0%;
                padding-left: 2.7rem;
                margin-left: 30px;
                color: #6C6C6C;
            }
        }
    }

    .replybtn {
        margin-bottom: 30px;
        font-family: 'Mulish';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        color: #F03C3C;
        margin-left: 4.5rem;

    }

    .sendRemark {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container-fluid {
        // position: absolute;
        // top: 10%;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 2rem;
        padding-bottom: 5rem;
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

    .sendRequest2 {
        // margin-right: 50px;
        // border-radius: 8px;
        padding: 10px 25px;
        margin-top: 2rem;
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
}
</style>