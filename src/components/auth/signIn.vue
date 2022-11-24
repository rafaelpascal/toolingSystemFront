<template>
    <div>
        <div style="height: 100vh;" class="container-fluid">
            <div class="row no-gutters">
                <div class="col-lg-5">
                    <div class="textD">
                        <h1>Appmart Internal Tooling</h1>
                        <p>A virtual center for designers, devs, PMs, and all design parties to perform their duties in
                            unison. At least 200% faster with Mockplus.</p>
                    </div>
                </div>
                <div class="col-lg-1"></div>
                <div class="col-lg-6">
                    <div class="regDiv">
                        <div class="formDiv">
                            <h3>Sign In</h3>
                            <div class="inputs">
                                <div class="">
                                    <label class="label-f">Email address</label>
                                    <v-text-field solo v-model="email" :rules="[emailrules.required, emailrules.email]" label="Email Address">
                                    </v-text-field>
                                    <!-- <input v-model="email" type="email" class="textField" id=""> -->
                                </div>
                                <div class="">
                                    <label class="label-f">Password</label>
                                    <v-text-field solo :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :rules="[rules.required, rules.min]" :type="show3 ? 'text' : 'password'"
                                        name="input-10-2" label="Password" hint="At least 8 characters"
                                        v-model="password" value="password" class="input-group--focused"
                                        @click:append="show3 = !show3">
                                    </v-text-field>
                                    <!-- <input v-model="password" type="password" class="textField" id=""> -->
                                </div>
                                <!-- <div class="mb-3">
                                    <p class="alrdy">Don't Have an Account? <button @click="signUp" class="signIn">Sign
                                            Up</button></p>
                                </div> -->
                                <div class="mt-3">
                                    <button @click="login" class="createBtn">Log In</button>
                                </div>
                                <div class="mb-3">
                                    <button @click="forgotPass" class="signIn">Forgot Password?</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from "axios"
import Swal from 'sweetalert2'
import jwt_decode from "jwt-decode";

export default {
    data() {
        return {
            email: '',
            password: '',
            userid: '',
            userName: '',
            show3: false,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                emailMatch: () => (`The email and password you entered don't match`),
            },
            emailrules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
            },
        }
    },
    methods: {
        signUp() {
            this.$router.push('/signUp')
        },
        forgotPass() {
            this.$router.push('/changePassword')
        },
        async login() {
            if (!this.email || !this.password) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email and Password Needed',
                    width: 350,
                })
            } else {
                const logindata = {
                    email: this.email,
                    password: this.password,
                }
                await axios.post('http://localhost:3000/api/v1/review/auth/login', logindata)
                    .then(response => {
                        console.log(response.data.message);
                        const loginCount = response.data.data.loginCount //Checks if the user have logged in Before
                        Swal.fire({
                            icon: 'success',
                            title: 'Proceed',
                            showConfirmButton: false,
                            text: 'Login Successful',
                            width: 350,
                            timer: 1000
                        })
                        this.email = ''
                        this.password = ''
                        const token = response.data.data.accessToken
                        localStorage.setItem('token', JSON.stringify(token));
                        const decoded = jwt_decode(token);
                        this.userid = decoded.id
                        this.userName = decoded.lastName
                        console.log("User Id", this.userid);
                        // console.log('Token Decoded',decoded.category);
                        if (loginCount === 0) {
                            Swal.fire({
                                icon: 'info',
                                title: 'Proceed',
                                showConfirmButton: false,
                                text: 'Please Change your Password',
                                width: 350,
                                timer: 1000
                            })
                            setTimeout(() => {
                                this.$router.push('/changePassword')
                            }, 1200);
                        } else if (decoded.category === 'Admin') {
                            setTimeout(() => {
                                this.$router.push('/dashboardadmin')
                            }, 1200);
                        } else {
                            setTimeout(() => {
                                this.$router.push('/createReport')
                            }, 1200);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error.response.data.message,
                            width: 350,
                        })
                    });
                const retrievedData = localStorage.getItem('token');
                const token = JSON.parse(retrievedData);
                // LOGGING
                await axios.post(`http://localhost:3000/api/v1/review/logRoute/newlog/${this.userid}`,
                    {
                        activity: `Logged In`
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
        }
    }
}
</script>
  
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css?family=Caveat');

.container-fluid {
    // background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(../../assets/landImg.jpg);
    // background-position: center;
    // background-repeat: no-repeat;
    // background-size: cover;
    background-color: #4A869F;

}

.lightLogo {
    display: block;
}

.darkLogo {
    display: none;
}

.logoDiv {
    position: fixed;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;

    .logoTxt {
        display: flex;
        flex-direction: column;
        margin-left: 1rem;
        justify-content: center;
        align-items: flex-end;

        h4 {
            margin: 0%;
            color: #fff;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: normal;
            font-size: 25px;
        }

        p {
            margin: 0%;
            color: #fff;
            font-family: 'Caveat';
            font-style: normal;
            font-weight: normal;
            font-size: 20px;
        }
    }

}

.textD {
    padding-left: 5rem;
    margin: 0%;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    h1 {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 800;
        font-size: 38px;
        // margin-bottom: 2rem;
        color: #FFFFFF;
    }

    p {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        // line-height: 111px;
        color: #FFFFFF;
    }
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
            color: #4A869F;
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

@media(min-width: 320px) and (max-width: 1200px) {
    .container-fluid {
        background-color: #4A869F;

        // background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(../../assets/landImg.jpg);
        // background-position: center;
        // background-repeat: no-repeat;
        // background-size: cover;
        // padding: 0%;
        // margin: 0%;
    }

    .lightLogo {
        display: none;
    }

    .darkLogo {
        display: block;
        width: 20%;
    }

    .logoDiv {
        width: 100%;
        position: fixed;
        padding: 1rem;
        display: flex;
        align-items: center;
        background-color: #fdfdfd;
        margin: 0%;

        .logoTxt {
            display: flex;
            flex-direction: column;
            margin-left: 1rem;
            justify-content: center;
            align-items: flex-end;

            h4 {
                margin: 0%;
                color: #000;
                font-family: 'Poppins';
                font-style: normal;
                font-weight: normal;
                font-size: 25px;
            }

            p {
                margin: 0%;
                color: #000;
                font-family: 'Caveat';
                font-style: normal;
                font-weight: normal;
                font-size: 20px;
            }
        }

    }

    .textD {
        padding-left: 0;
        margin-top: 50%;
        margin-bottom: 10%;
        margin-left: 1rem;
        margin-right: 1rem;
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;

        h1 {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 800;
            font-size: 30px;
            margin-bottom: 1rem;
            color: #FFFFFF;
        }

        p {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            // line-height: 111px;
            color: #FFFFFF;
        }
    }

    .regDiv {
        margin: 0;
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .formDiv {
            // border-radius: 18px;
            background-color: #FFFFFF;
            width: 100%;
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
                color: #4A869F;
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
                    width: 100%;
                    height: 50px;
                    font-family: 'Poppins';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 18px;
                    margin-bottom: 2rem;
                    color: #FFFFFF;
                }
            }
        }
    }
}
</style>