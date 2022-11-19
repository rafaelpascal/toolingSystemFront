<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h3 class="panel-title">{{ name }}</h3>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="details">
                                    <table class="table table-user-information">
                                        <tbody>
                                            <tr>
                                                <td>Name:</td>
                                                <td>{{ name }}</td>
                                            </tr>
                                            <tr>
                                                <td>Level:</td>
                                                <td>{{ level }}</td>
                                            </tr>
                                            <tr>
                                                <td>Category:</td>
                                                <td>{{ category }}</td>
                                            </tr>
                                            <tr>
                                                <td>Unit</td>
                                                <td>{{ unit }}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td><a href="mailto:info@support.com">{{ email }}</a></td>
                                            </tr>
                                            <tr>
                                                <td>Phone Number</td>
                                                <td>{{ phone }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top:4rem" class="panel-heading">
                        <!-- <button class="resetPassword" >Reset Password</button> -->
                        <button @click="openEditDialog" class="editProfile">Edit Profile</button>
                        <v-row justify="center">
                            <v-dialog v-model="editdialog" persistent max-width="600px">
                                <v-card>
                                    <v-card-title style="background-color: #21618C; color: #fff; margin-bottom: 2rem">
                                        <span class="text-h5">Update Your Details</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-text-field v-model="email" label=email></v-text-field>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-text-field v-model="name" label=name></v-text-field>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-text-field v-model="phone" label=phone></v-text-field>
                                                </v-col>
                                                <!-- <v-col cols="12">
                                                    <v-file-input :rules="rules"
                                                        accept="image/png, image/jpeg, image/bmp"
                                                        placeholder="Pick an avatar" prepend-icon="mdi-camera"
                                                        label="Avatar" @change="uploadFile"></v-file-input>
                                                </v-col> -->
                                            </v-row>
                                        </v-container>
                                        <!-- <small>*indicates required field</small> -->
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <!-- <v-btn color="blue darken-1" text @click="editdialog = false">
                                            Close
                                        </v-btn>
                                        <v-btn color="blue darken-1" text @click="editdialog = false">
                                            Save
                                        </v-btn> -->
                                        <button class="cancl" @click="editdialog = false">Cancel</button>
                                        <button class="newR2" @click="updateUser">Save</button>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";

// import $ from "jquery"

export default {
    data() {
        return {
            name: '',
            email: '',
            phone: '',
            unit: '',
            level: '',
            hireDate: '',
            image: '',
            photo: '',
            category: '',
            editdialog: false,
            rules: [
                value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
            ],
        }
    },
    // mounted() {
    //     // $.ajax({
    //     //     url: "https://phantauth.net/user/",
    //     //     dataType: "json",
    //     //     success: function (user) {
    //     //         ({ el: "#user", data: { user: user } });
    //     //         $("#user").show();
    //     //     }
    //     // });
    // }


    mounted() {
        this.Userdata()
    },
    watch: {
        async Userdata() {
            // document.getElementById("bar").style.display = "block";

            const retrievedData = localStorage.getItem('token');
            const token = JSON.parse(retrievedData);
            const decoded = jwt_decode(token);
            // console.log(decoded.id);
            const userId = decoded.id
            // console.log('Token',JSON.parse(retrievedData));

            await axios.all([
                axios.get(`http://localhost:3000/api/v1/jwtauth/user/users/${userId}`, {
                    headers: {
                        'token': `Bearer ${token}`
                    }
                }),
            ])
                .then(axios.spread((response1) => {
                    // this.bell = response1.data.data.nbHits
                    // console.log('User', response1.data.user);
                    const item = response1.data.user
                    this.name = item.name
                    this.email = item.email
                    this.phone = item.phone
                    this.photo = item.photo
                 
                    this.hireDate = item.createdAt.split("T")[0]

                    //response2 is the result of second call
                }))
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    methods: {
       async Userdata() {
            const retrievedData = localStorage.getItem('token');
            const token = JSON.parse(retrievedData);
            const decoded = jwt_decode(token);
            const userId = decoded.id

            await axios.all([
                axios.get(`http://localhost:3000/api/v1/review/users/User/${userId}`, {
                    headers: {
                        'token': `Bearer ${token}`
                    }
                }),
            ])
                .then(axios.spread((response1) => {
                    // this.bell = response1.data.data.nbHits
                    console.log('User', response1.data.user);
                    const item = response1.data.user
                    this.name = item.firstName +' '+ item.otherName +' '+ item.lastName
                    this.email = item.email
                    this.phone = item.phone
                    this.level = item.level
                    this.unit = item.unit
                    this.category = item.category.Category

                    //response2 is the result of second call
                }))
                .catch(function (error) {
                    console.log(error);
                });
        },
        uploadFile(file) {
            this.image = file
            console.log(this.image);
        },
        openEditDialog() {
            this.editdialog = true
        },
        async updateUser() {
            const retrievedData = localStorage.getItem('token');
            const token = JSON.parse(retrievedData);
            const decoded = jwt_decode(token);
            console.log(decoded.id);
            const userId = decoded.id

            const formData = new FormData();
            formData.append('photo', this.image)
            formData.append('name', this.name)
            formData.append('phone', this.phone)
            formData.append('email', this.email)

            await axios.patch(`http://localhost:3000/api/v1/jwtauth/user/users/${userId}`, formData,
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

            this.editdialog = false
        }
    }
}
</script>

<style lang="scss" scoped>
.container-fluid {
    height: 100vh;
    padding-top: 5rem;
    padding-left: 5rem;
    padding-bottom: 5rem;
}
.editProfile {
    padding: 10px;
    border-radius: 4px;
    background-color: #21618C;
    // margin: 0 2rem;
    color: #fff;
}

.resetPassword {
    padding: 10px;
    border-radius: 4px;
    background-color: #21618C;
    color: #fff;
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

.details {
    background-color: azure;
    padding: 1.2rem 2rem;
}

.user-row {
    margin-bottom: 14px;
}

.table-user-information>tbody>tr {
    border-top: 1px solid #ccc;
}

.table-user-information>tbody>tr:first-child {
    border-top: 0;
}

.table-user-information>tbody>tr>td {
    border-top: 0;
}

.panel {
    margin-top: 20px;
}
</style>