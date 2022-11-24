<template>
    <div class="pr-0 mr-0 container-fluid">
        <div class="row no-gutters">
            <header class="header" id="header">
                <div style="display: flex; justify-content:center; align-items: center;">
                    <div @click="close" id="togg" class="header_toggle">
                        <i class="fas fa-bars" id="header-toggle"></i>
                    </div>
                    <!-- <span class="welcomeMsg">Welcome<span style="margin-left: 6px">{{ avatar
                    }}</span></span> -->
                </div>
                <!-- <div style="display: flex; justify-content:center; align-items: center;">
                    <span class="mx-2">{{ email }}</span>
                    <v-menu open-on-hover offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-avatar v-bind="attrs" v-on="on">
                                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                            </v-avatar>
                        </template>
                        <v-list>
                            <v-list-item>
                                <router-link text style="text-transform:capitalize; font-size:15px; color: #4A869F"
                                    to="/userProfile">Profile</router-link>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div> -->
                <div style="display: flex; justify-content:space-between; align-items: center;">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on" class="emaildiv" id="email">{{ email }} <button text><i
                                        class="fas fa-chevron-down"></i></button></span>
                        </template>
                        <v-list>
                            <v-list-item>
                                <router-link text style="text-transform:capitalize; font-size:15px; color: #4A869F"
                                    to="/userProfile">Profile</router-link>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <v-badge class="mx-2" color="#4A869F" :content="CountDown">
                        <!-- <span style="font-size:28px"><i class="far fa-bell">{{ CountDown }}</i></span> -->
                    </v-badge>
                </div>
            </header>
            <div class="l-navbar" id="nav-bar">
                <nav class="nav">
                    <div>
                        <div class="nav_list">
                            <ul style="padding: 0%; margin: 0%" class="list-unstyled components">
                                <li>
                                    <router-link class="nav_link" to="/createReport"> <span style="font-size: 20px">
                                            <i class="fas fa-user"></i>
                                        </span> <span class="nav_name">Create Report</span>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div> <a style="text-decoration:none" href="#" class="nav_link"><span style="font-size: 20px">
                            <i class="fas fa-sign-out-alt"></i>
                        </span><span class="nav_name">Log
                            Out</span> </a>
                </nav>
            </div>
        </div>
        <div id="bodyPd" class="body-pd height-100 ">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import jwt_decode from "jwt-decode";

// import $ from "jquery"

export default {
    data() {
        return {
            bellArray: [],
            bell: '',
            CountDown: '',
            email: '',
            avatar: '',
            subMenu: false,
        }
    },

    async mounted() {
        const retrievedData = localStorage.getItem('token');
        console.log(JSON.parse(retrievedData));
        const token = JSON.parse(retrievedData);
        const decoded = jwt_decode(token);
        const userId = decoded.id
        // const reportId = report
        await axios.all([
            axios.get(`http://localhost:3000/api/v1/review/settings/settings`, {
                headers: {
                    'token': `Bearer ${token}`
                }
            }),
            axios.get(`http://localhost:3000/api/v1/review/users/User/${userId}`, {
                headers: {
                    'token': `Bearer ${token}`
                }
            }),
        ])
            .then(axios.spread((response1, response2) => {
                this.email = response2.data.user.email
                this.avatar = response2.data.user.lastName

                console.log(response1.data.data);
                // const date = new Date().toDateString().split(" ")[2]
                const dateDay = new Date().getDate();





                //onsole.log(date);
                const [{ day }] = response1.data.data.settings;
                console.log(day);

                let d = day.split('-')

                let CurrentDay = +d[2]  // For the month
                //console.log(CurrentDay);
                this.CountDown = CurrentDay - dateDay
                console.log(this.CountDown);
            }))
            .catch(function (error) {
                console.log(error);
            });
    },

    methods: {
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
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap");
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

*,
::before,
::after {
    box-sizing: border-box
}

.lightLogo2 {
    display: none
}

body {
    position: relative;
    margin: 3rem 0 0 0;
    padding: 0 1rem;
    font-family: 'Nunito', sans-serif;
    font-size: 1rem;
    transition: .5s
}

a {
    text-decoration: none
}

.fa-bell {
    color: #4A869F
}

.welcomeMsg {
    font-family: 'Red Hat Display';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    margin-left: 20px;
    color: #252A2F;
}

.logoTxt {
    display: flex;
    flex-direction: column;
    margin-left: 0.4rem;
    justify-content: center;
    align-items: flex-end;

    h4 {
        margin: 0%;
        color: #fff;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
    }

    p {
        margin: 0%;
        color: #fff;
        font-family: 'Caveat';
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
    }
}

.header {
    width: 100%;
    height: 2rem;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    background-color: #fff;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    z-index: 100;
    transition: .5s
}

.emaildiv {
    padding: 10px 12px;
    width: 100%;
    // height: 32px;
    background: #F2F2F2;
    border-radius: 16px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    /* identical to box height */
    color: #444444;
}

.namet {
    color: #fff;
    margin-left: 0.2rem;
}

.header_toggle {
    color: #000;
    font-size: 1.5rem;
    cursor: pointer;
    padding-left: 20%;
    transition: .5s;
}

.header_toggle2 {
    color: #000;
    font-size: 1.5rem;
    cursor: pointer;
    padding-left: 10%;
}

.header_img {
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden
}

.header_img img {
    width: 40px
}

.l-navbar {
    position: fixed;
    top: 0;
    left: -20%;
    width: 224px;
    height: 100vh;
    background-color: #4A869F;
    padding: .5rem 1rem 0 0;
    transition: .5s;
    z-index: 100
}

.l-navbar2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 70px;
    height: 100vh;
    background-color: #4A869F;
    padding: 1rem 1rem 0 0;
    transition: .5s;
    z-index: 100
}


body {
    font-family: 'Poppins', sans-serif;
    background: #fafafa;
}

p {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
    font-weight: 300;
    line-height: 1.7em;
    color: #999;
}

a,
a:hover,
a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
}

.navbar {
    padding: 15px 10px;
    background: #fff;
    border: none;
    border-radius: 0;
    margin-bottom: 40px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
    box-shadow: none;
    outline: none !important;
    border: none;
}

.line {
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #ddd;
    margin: 40px 0;
}

/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */


#sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #47748b;
}

#sidebar ul p {
    color: #fff;
    padding: 10px;
}

#sidebar ul li a {
    color: #fff;
    text-decoration: none;
    padding: 10px;
    font-size: 1.1em;
    display: block;
}

#sidebar ul li a:hover {
    color: #fff;
    background: #4A869F;
}

#sidebar ul li.active>a,
a[aria-expanded="true"] {
    color: #000;
    background: #4A869F;
}

a[data-toggle="collapse"] {
    position: relative;
}

.dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    color: #000;
    background: #4A869F;
}

ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    color: #000;
    background: #4A869F;
}

ul.CTAs {
    padding: 20px;
}

ul.CTAs a {
    text-align: center;
    font-size: 0.9em !important;
    display: block;
    border-radius: 5px;
    margin-bottom: 5px;
}

a.download {
    background: #fff;
    color: #7386D5;
}

a.article,
a.article:hover {
    background: #6d7fcc !important;
    color: #fff !important;
}

/* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */

#content {
    width: 100%;
    padding: 20px;
    min-height: 100vh;
    transition: all 0.3s;
}

/* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */

@media (max-width: 768px) {
    #sidebar {
        margin-left: -250px;
    }

    #sidebar.active {
        margin-left: 0;
    }

    #sidebarCollapse span {
        display: none;
    }

    .dropdown-toggle::after {
        display: block;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        color: #fff;
        background: #4A869F;
    }
}

.nav {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden
}

.nav_logo,
.nav_link {
    display: grid;
    grid-template-columns: max-content max-content;
    align-items: center;
    column-gap: 1rem;
    padding: .5rem 0 .5rem 1.5rem
}

.nav_link2 {
    display: grid;
    grid-template-columns: max-content max-content;
    align-items: center;
    column-gap: 1rem;
    margin-left: 1.5rem;
    padding: .5rem 0 .5rem 1.5rem
}

.nav_logo {
    margin-bottom: 2rem;
    // display: flex;
    // justify-content: center;
    // align-items:center
}

.nav_logo-icon {
    font-size: 1.25rem;
    color: #fff
}

.nav_logo-name {
    color: #fff;
    font-weight: 700
}

.nav_link {
    position: relative;
    color: #fff;
    margin-bottom: .5rem;
    transition: .3s
}

.nav_link:hover {
    color: #000
}

.nav_icon {
    font-size: 1.25rem
}

.show {
    left: 0
}

.active {
    color: #000
}

.active::before {
    content: '';
    position: absolute;
    left: -230px;
    width: 2px;
    height: 32px;
    background-color: #000
}

.height-100 {
    height: 100vh
}

@media (min-width: 768px) {
    body {
        margin: 4rem 0 0 0;
        padding-left: 16rem;
    }

    .header {
        height: 4rem;
        padding: 0 2rem 0 15rem
    }

    .header_img {
        width: 40px;
        height: 40px
    }

    .header_img img {
        width: 45px
    }

    .l-navbar {
        left: 0;
        padding: 1rem 1rem 0 0
    }

    .show {
        width: 380px
    }

    .body-pd {
        padding-left: 144px;
        transition: .5s;
    }

    .body-pd2 {
        padding-left: 5px;
        transition: .5s;
    }

    .body-pd3 {
        padding-left: 80px;
        transition: .5s;
    }
}

@media(min-width: 320px) and (max-width: 800px) {
    #email {
        display: none;
    }
    body {
        position: relative;
        margin: 3rem 0 0 0;
        padding: 0 1rem;
        font-family: 'Nunito', sans-serif;
        font-size: 1rem;
        transition: .5s
    }

    a {
        text-decoration: none
    }

    .namet {
        color: #fff;
        margin-left: 0.2rem;
    }


    .header_toggle {
        color: #000;
        font-size: 1.5rem;
        cursor: pointer;
        padding-left: 20%;
        transition: .5s;
        margin-left: 12rem;
    }

    .header_toggle2 {
        color: #000;
        font-size: 1.5rem;
        cursor: pointer;
        padding-left: 20%;
        margin-left: 0;
    }

    .header_img {
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden
    }

    .header_img img {
        width: 40px
    }

    .l-navbar {
        position: fixed;
        top: 0;
        left: 0%;
        width: 224px;
        height: 100vh;
        background-color: #4A869F;
        padding: .5rem 1rem 0 0;
        transition: .5s;
        z-index: 100
    }

    .l-navbar2 {
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 100vh;
        background-color: #4A869F;
        padding: 1rem 1rem 0 0;
        transition: .5s;
        z-index: 100
    }

    .header {
        width: 100%;
        height: 3rem;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
        background-color: #fff;
        z-index: 100;
        transition: .5s
    }


    body {
        font-family: 'Poppins', sans-serif;
        background: #fafafa;
    }

    p {
        font-family: 'Poppins', sans-serif;
        font-size: 1.1em;
        font-weight: 300;
        line-height: 1.7em;
        color: #999;
    }

    a,
    a:hover,
    a:focus {
        color: inherit;
        text-decoration: none;
        transition: all 0.3s;
    }

    .navbar {
        padding: 15px 10px;
        background: #fff;
        border: none;
        border-radius: 0;
        margin-bottom: 40px;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
    }

    .navbar-btn {
        box-shadow: none;
        outline: none !important;
        border: none;
    }

    .line {
        width: 100%;
        height: 1px;
        border-bottom: 1px dashed #ddd;
        margin: 40px 0;
    }

    /* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */


    #sidebar ul.components {
        padding: 20px 0;
        border-bottom: 1px solid #47748b;
    }

    #sidebar ul p {
        color: #fff;
        padding: 10px;
    }

    #sidebar ul li a {
        color: #fff;
        text-decoration: none;
        padding: 10px;
        font-size: 1.1em;
        display: block;
    }

    #sidebar ul li a:hover {
        color: #fff;
        background: #4A869F;
    }

    #sidebar ul li.active>a,
    a[aria-expanded="true"] {
        color: #000;
        background: #4A869F;
    }

    a[data-toggle="collapse"] {
        position: relative;
    }

    .dropdown-toggle::after {
        display: block;
        position: absolute;
        top: 50%;
        right: 2rem;
        transform: translateY(-50%);
        color: #000;
        background: #4A869F;
    }

    ul ul a {
        font-size: 0.9em !important;
        padding-left: 30px !important;
        color: #000;
        background: #4A869F;
    }

    ul.CTAs {
        padding: 20px;
    }

    ul.CTAs a {
        text-align: center;
        font-size: 0.9em !important;
        display: block;
        border-radius: 5px;
        margin-bottom: 5px;
    }

    a.download {
        background: #fff;
        color: #7386D5;
    }

    a.article,
    a.article:hover {
        background: #6d7fcc !important;
        color: #fff !important;
    }

    /* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */

    #content {
        width: 100%;
        padding: 20px;
        min-height: 100vh;
        transition: all 0.3s;
    }

    /* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */

    @media (max-width: 768px) {
        #sidebar {
            margin-left: -250px;
        }

        #sidebar.active {
            margin-left: 0;
        }

        #sidebarCollapse span {
            display: none;
        }

        .dropdown-toggle::after {
            display: block;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            color: #fff;
            background: #4A869F;
        }
    }

    .nav {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden
    }

    .nav_logo,
    .nav_link {
        display: grid;
        grid-template-columns: max-content max-content;
        align-items: center;
        column-gap: 1rem;
        padding: .5rem 0 .5rem 1.5rem
    }

    .nav_link2 {
        display: grid;
        grid-template-columns: max-content max-content;
        align-items: center;
        column-gap: 1rem;
        margin-left: 1.5rem;
        padding: .5rem 0 .5rem 1.5rem
    }

    .nav_logo {
        margin-bottom: 2rem
    }

    .nav_logo-icon {
        font-size: 1.25rem;
        color: #fff
    }

    .nav_logo-name {
        color: #fff;
        font-weight: 700
    }

    .nav_link {
        position: relative;
        color: #fff;
        margin-bottom: .5rem;
        transition: .3s
    }

    .nav_link:hover {
        color: #000
    }

    .nav_icon {
        font-size: 1.25rem
    }

    .show {
        left: 0
    }

    .active {
        color: #000
    }

    .active::before {
        content: '';
        position: absolute;
        left: -230px;
        width: 2px;
        height: 32px;
        background-color: #000
    }

    .height-100 {
        height: 100vh
    }

    @media (min-width: 768px) {
        body {
            margin: 4rem 0 0 0;
            padding-left: 16rem;
        }

        .header {
            height: 4rem;
            padding: 0 2rem 0 15rem
        }

        .header_img {
            width: 40px;
            height: 40px
        }

        .header_img img {
            width: 45px
        }

        .l-navbar {
            left: 0;
            padding: 1rem 1rem 0 0
        }

        .show {
            width: 380px
        }

        .body-pd {
            padding-left: 210px;
            transition: .5s;
        }

        .body-pd2 {
            padding-left: 20px;
            transition: .5s;
        }

        .body-pd3 {
            padding-left: 80px;
            transition: .5s;
        }
    }
}

// @media(min-width: 320px) and (max-width: 1200px) {
//     body {
//         margin: 4rem 0 0 0;
//         padding-left: 16rem;
//     }

//     .namet {
//         // color: #fff;
//         // margin-left: 2rem;
//         // font-size: 10px;
//         display: none;

//     }

//     .namet2 {
//         // color: #fff;
//         // font-size: 10px;
//         display: none;
//     }

//     .header {
//         height: 4rem;
//         padding: 0 2rem 0 15rem
//     }

//     .header_img {
//         width: 40px;
//         height: 40px
//     }

//     .header_img img {
//         width: 45px
//     }

//     .l-navbar {
//         left: 0;
//         padding: 1rem 1rem 0 0
//     }

//     .show {
//         width: 380px
//     }

//     .body-pd {
//         padding-left: 0px;
//         transition: .5s;
//     }

//     .body-pd2 {
//         padding-left: 0px;
//         transition: .5s;
//     }

//     .body-pd3 {
//         padding-left: 240px;
//         transition: .5s;
//     }

//     .dropdown-toggle::after {
//         display: block;
//         position: absolute;
//         top: 50%;
//         right: 2rem;
//         transform: translateY(-50%);
//         color: #000;
//         background: #4A869F;
//     }

//     .header_toggle {
//         color: #fff;
//         font-size: 1.5rem;
//         cursor: pointer;
//         transition: .5s;
//         margin-left: 12rem;
//     }

//     .header_toggle2 {
//         color: #fff;
//         font-size: 1.5rem;
//         cursor: pointer;
//         // padding-left: 20%;
//         transition: .5s;
//     }

//     .l-navbar {
//         position: fixed;
//         top: 0;
//         left: 0%;
//         width: 224px;
//         height: 100vh;
//         background-color: #4A869F;
//         padding: .5rem 1rem 0 0;
//         transition: .5s;
//         z-index: 100
//     }

//     .l-navbar2 {
//         position: fixed;
//         top: 0;
//         left: 0;
//         width: 224px;
//         height: 100vh;
//         background-color: #4A869F;
//         padding: 1rem 1rem 0 0;
//         transition: .5s;
//         z-index: 100
//     }

//     .header {
//         width: 100%;
//         height: 3rem;
//         position: fixed;
//         top: 0;
//         left: 0;
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//         padding: 0 1rem;
//         background-color: #4A869F;
//         z-index: 100;
//         transition: .5s
//     }
// }
</style>