export const adminMenu = [
  //Dashboard
  {
    name: "menu.admin.dashboard",
    menus: [
      {
        name: "menu.admin.dashboard",
        link: "/system/dashboard",
      },
    ],
  },
  //Quan ly nguoi dung
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
    ],
  },
  //Quan lý bác sĩ
  {
    name: "menu.admin.manage-doctor",
    menus: [
      {
        name: "menu.admin.manage-infor-doctor",
        link: "/system/manage-doctor",
      },
    ],
  },
  //Quan lý Lịch Khám
  {
    name: "menu.admin.schedule",
    menus: [
      {
        // name: "menu.admin.manage-handbook",
        // link: "/system/manage-handbook",
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  //Quan ly phong kham
  {
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  //Quan lychuyen khoa
  {
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
];
export const doctorMenu = [
  //Quan ly ke hoach kham benh cua bac si
  {
    name: "menu.admin.schedule",
    menus: [
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
];
