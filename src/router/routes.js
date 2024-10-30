const routes = [
  {
    path: "/",
    redirect: {
      name: "add-user",
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "add-user",
        name: "add-user",
        component: () => import("pages/AddUser.vue"),
      },
      {
        path: "users",
        name: "users",
        component: () => import("src/pages/UserList.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
