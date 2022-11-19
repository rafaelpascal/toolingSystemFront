import Vue from "vue";
import VueRouter from "vue-router";
// import signUp from "../components/auth/signUp";
import signIn from "../components/auth/signIn";
import changePassword from "../components/auth/changePassword";
import adminDashboard from "../components/admin/adminDashboard";
import settingsPage from "../components/admin/settingsPage";
import settingsPage2 from "../components/admin/settingsPage2";
import adminProfile from "../components/admin/adminProfile";
import dashboardAdmin from "../components/admin/dashboardAdmin";
// import dashBoard from "../components/admin/dashBoard";
import viewaReport from "../components/admin/viewaReport";
import LogPage from "../components/admin/LogPage";
import userDashboard from "../components/user/userDashboard";
// import usernewDashboard from "../components/user/usernewDashboard";
import userPage from "../components/admin/userPage";
import allReport from "../components/admin/allReport";
import createReport from "../components/user/createReport";
import userProfile from "../components/user/userProfile";
import notificationPage from "../components/user/notificationPage";
import userViewreport from "../components/user/userViewreport";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "signUp",
  //   component: signUp,
  // },
  {
    path: "/",
    name: "signIn",
    component: signIn,
  },
  {
    path: "/changePassword",
    name: "changePassword",
    component: changePassword,
  },
  {
    path: "/adminDashboard",
    name: "adminDashboard",
    component: adminDashboard,
    children: [
      {
        path: "/userPage",
        name: "userPage",
        component: userPage,
      },
      {
        path: "/allReport",
        name: "allReport",
        component: allReport,
      },
      {
        path: "/LogPage",
        name: "LogPage",
        component: LogPage,
      },
      {
        path: "/viewaReport",
        name: "viewaReport",
        component: viewaReport,
      },
      {
        path: "/settingsPage",
        name: "settingsPage",
        component: settingsPage,
      },
      {
        path: "/settingsPage2",
        name: "settingsPage2",
        component: settingsPage2,
      },
      {
        path: "/adminProfile",
        name: "adminProfile",
        component: adminProfile,
      },
      {
        path: "/dashboardadmin",
        name: "dashboardAdmin",
        component: dashboardAdmin,
      },
    ],
  },
  {
    path: "/userDashboard",
    name: "userDashboard",
    component: userDashboard,
    children: [
      {
        path: "/createReport",
        name: "createReport",
        component: createReport,
      },
      {
        path: "/notificationPage",
        name: "notificationPage",
        component: notificationPage,
      },
      {
        path: "/userViewreport",
        name: "userViewreport",
        component: userViewreport,
      },
      {
        path: "/userProfile",
        name: "userProfile",
        component: userProfile,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
