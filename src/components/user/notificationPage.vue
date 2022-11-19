<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <v-card v-for="notification in notifications" :key="notification.id" class="mx-auto my-2 pa-2" max-width="100%">
                    <div style="display:flex; justify-content:space-between; align-items:center">
                        <h6 style="text-transform:capitalize; font-size: 10px; color: #21618C;"> {{ notification.month }} {{ notification.year }}</h6>
                        <!-- <h6 style="text-transform:capitalize; font-size: 10px; color: #21618C;"> {{ notification.report }}</h6> -->
                        <v-btn style="text-transform:capitalize; font-size: 12px; color: #21618C;" text>
                            Delete
                        </v-btn>
                    </div>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
// import io from "socket.io-client";
import axios from "axios";

export default {
    data: () => ({
        notifications: []
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
    beforeMount() {
        window.addEventListener('scroll', this.handleScroll)

    },
    async mounted() {
        // document.getElementById("bar").style.display = "none";
        // this.socketInstance = io("http://localhost:3000");

        // this.socketInstance.on(
        //     "message:recieved", (data) => {
        //         this.messages = this.messages.concat(data)
        //     }
        // )

        const retrievedData = localStorage.getItem('token');
        console.log(JSON.parse(retrievedData));
        const token = JSON.parse(retrievedData);

        await axios.all([
            axios.get('http://localhost:3000/api/v1/review/notification/getAllmynotification', {
                headers: {
                    'token': `Bearer ${token}`
                }
            }),
        ])
            .then(axios.spread((response1) => {
                this.bell = response1.data.data.nbHits
                console.log(response1.data.data.notifi);
                response1.data.data.notifi.forEach(el => {
                    this.notifications.push({
                        report: el.report,
                        year: el.report.year,
                        month: el.report.month,
                        // Items: el.request.cargo.toString(),
                        // pickup: el.request.pickup,
                        // location: el.request.dropoff,
                        // riderFirstname:  el.rider.firstName,
                        // riderLastname:  el.rider.lastName,
                        // riderPhone: el.rider.phoneNumber,
                        // riderEmail: el.rider.email,
                    })
                })
                //response2 is the result of second call
            }))
            .catch(function (error) {
                console.log(error);
            });
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css?family=Caveat');

.container-fluid {
    // position: absolute;
    // top: 10%;
    padding: 5rem;
}
</style>