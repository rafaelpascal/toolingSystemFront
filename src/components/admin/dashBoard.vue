<template>
    <div style="display: flex; justify-content: space-between">
        <b-sidebar class="sidebarclss" id="sidebar-footer" aria-label="Sidebar with custom footer" shadow>
            <template #footer="{  }">
                <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
                    <strong class="mr-auto">Appmart Internal Tooling System</strong>
                </div>
            </template>
            <div class="px-8 py-2">
                <div class="logoDiv">
                    <div class="logoTxt">
                        <h4>Appmart Internal
                            <br>
                             Tooling System    
                        </h4>
                    </div>
                </div>
                <div style="margin: 3rem 1rem; display: flex; flex-direction:column; align-items:flex-start">
                    <div style="margin: 2rem 0; display: flex; flex-direction:column; align-items:flex-start">
                        <router-link class="sideBtn" to="/newReuest">Dashboard</router-link>
                        <router-link class="sideBtn" to="/userPage">Create User</router-link>
                        <router-link class="sideBtn" to="/allReport">Reports</router-link>
                        <router-link class="sideBtn" to="/LogPage">Logs</router-link>
                    </div>
                </div>
            </div>
        </b-sidebar>
        <nav :class="{ 'onScroll': !view.topOfPage }" id="navigation">
            <button id="bar" style="margin: 0 2rem; background-color: transparent;" v-b-toggle.sidebar-footer><span
                    style="font-size: 25px"><i class="fas fa-bars"></i></span></button>
            <div style="width:100%">
                <ul class="links">
                    <li class="mr-8">
                        <span id="email" class="mx-2">{{ email }}</span>
                        <v-avatar size="40">
                            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                        </v-avatar>
                    </li>
                </ul>
            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
import axios from "axios"
import jwt_decode from "jwt-decode";

// import $ from "jquery"

export default {
    data() {
        return {
            bell: '',
            email: '',
            subMenu: false,
            view: {
                topOfPage: true
            },
        }
    },

    async mounted() {
        const retrievedData = localStorage.getItem('token');
        // console.log(JSON.parse(retrievedData));
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
                this.email = response1.data.user.email
                // console.log(response1.data.user.email);
                //response2 is the result of second call
            }))
            .catch(function (error) {
                console.log(error);
            });
    },

    beforeMount() {
        window.addEventListener('scroll', this.handleScroll)

    },

    methods: {
        handleScroll() {
            if (window.pageYOffset > 0) {
                if (this.view.topOfPage) this.view.topOfPage = false
                // document.getElementById("bar").style.display = "block";
            } else {
                if (!this.view.topOfPage) this.view.topOfPage = true
                // document.getElementById("bar").style.display = "none";
            }
        },
        pushNotification() {
            this.$router.push('/notiFication')
        },
        hideShow() {
            this.subMenu = true
        },

        close() {
            // document.getElementById("nav-bar").classList.remove('l-navbar');
            document.getElementById("nav-bar").classList.toggle('l-navbar2');
            // document.getElementById("bodyPd").classList.remove('body-pd');
            document.getElementById("bodyPd").classList.toggle('body-pd2');
            document.getElementById("header").classList.toggle('body-pd3');
            document.getElementById("header-toggle").classList.toggle('bx-x')
            document.getElementById("togg").classList.toggle('header_toggle2')
            document.getElementById("lightLogo").classList.toggle('lightLogo2')
        }

    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css?family=Caveat');

$color-base: #fff;
$color-text: #222;
$color-accent: desaturate(navy, 80%);

// .container-fluid {
//     position: absolute;
//     top: 10%;
//     padding: 2rem 5rem;
// }

.sideBtn {
    padding: 0.5rem 0;
    color: #21618C;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    // border-radius: 3px;
}

.sidebarclss {
    width: 18%;
}

.dropdownicon {
    color: #fff;
    margin-left: 0.5rem
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

body {
    background-color: #e5e5e5;
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
    height: 55px;
    background-color: transparent;
    display: flex;
    align-items: center;
    transition: all .2s ease-in-out;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    // height: 50px;
    box-shadow: 0 0px 9px 4px rgba(#000, .1), 0 -5px 2px 2px rgba(#000, .1);
    z-index: 1000;
    min-width: 580px;

    &.onScroll {
        box-shadow: 0 0 10px #aaa;
        background-color: #4A869F;
        // border: 1px solid #21618C;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

        ul li {
            color: #fff;
        }

        .trigger-drop {
            color: #fff
        }

        #bar {
            color: #fff
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
            // margin: 10px;
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
    .sidebarclss {
        width: 100%;
    }

    #email {
        display: none;
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