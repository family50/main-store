// analytics.js

// ================= SALES =================
export const salesStats = {
today: [
  { hour: "01:00 AM", orders: 1, revenue: 300, user: 1 },
  { hour: "02:00 AM", orders: 0, revenue: 0,   user: 0 },
  { hour: "03:00 AM", orders: 2, revenue: 600, user: 2 },
  { hour: "04:00 AM", orders: 1, revenue: 250, user: 1 },
  { hour: "05:00 AM", orders: 0, revenue: 0,   user: 0 },
  { hour: "06:00 AM", orders: 3, revenue: 900, user: 2 },
  { hour: "07:00 AM", orders: 2, revenue: 700, user: 2 },
  { hour: "08:00 AM", orders: 4, revenue: 1400,user: 3 },
  { hour: "09:00 AM", orders: 3, revenue: 1200,user: 2 },
  { hour: "10:00 AM", orders: 5, revenue: 2000,user: 4 },
  { hour: "11:00 AM", orders: 6, revenue: 2600,user: 5 },
  { hour: "12:00 AM", orders: 4, revenue: 1800,user: 3 },
  { hour: "01:00 PM", orders: 7, revenue: 3000,user: 6 },
  { hour: "02:00 PM", orders: 5, revenue: 2400,user: 4 },
  { hour: "03:00 PM", orders: 6, revenue: 2800,user: 5 },
  { hour: "04:00 PM", orders: 8, revenue: 3500,user: 7 },
  { hour: "05:00 PM", orders: 7, revenue: 3300,user: 6 },
  { hour: "06:00 PM", orders: 6, revenue: 2900,user: 5 },
  { hour: "07:00 PM", orders: 9, revenue: 4000,user: 8 },
  { hour: "08:00 PM", orders: 8, revenue: 3700,user: 7 },
  { hour: "09:00 PM", orders: 10,revenue: 4500,user: 9 },
  { hour: "10:00 PM", orders: 9, revenue: 4200,user: 8 },
  { hour: "11:00 PM", orders: 7, revenue: 3400,user: 6 },
  { hour: "12:00 PM", orders: 5, revenue: 2600,user: 4 },
]

,
  week: [
    { day: "Sat", orders: 10, revenue: 4000,user:7 },
    { day: "Sun", orders: 14, revenue: 6200,user:24 },
    { day: "Mon", orders: 8, revenue: 3100 ,user:86},
    { day: "Tue", orders: 16, revenue: 7500 ,user:16},
    { day: "Wed", orders: 11, revenue: 4800,user:9},
    { day: "Thu", orders: 20, revenue: 9200 ,user:8},
    { day: "Fri", orders: 18, revenue: 8300,user:8 },
  ],

  month: [
    { week: "Week 1", orders: 60, revenue: 24000 ,user:44 },
    { week: "Week 2", orders: 72, revenue: 31000,user:60  },
    { week: "Week 3", orders: 55, revenue: 22000 ,user:30 },
    { week: "Week 4", orders: 80, revenue: 37000 ,user:50 },
  ],

  year: [
    { month: "Jan", orders: 220, revenue: 98000 ,user:150},
    { month: "Feb", orders: 260, revenue: 112000 ,user:187},
    { month: "Mar", orders: 310, revenue: 145000 ,user:170},
    { month: "Apr", orders: 290, revenue: 132000 ,user:190},
  ],
  

  total: {
    totalOrders: 1080,
    totalRevenue: 487000 ,
    totalUsers: 139
  }
};

// ================= VISITORS =================
export const visitorsStats = {
 today: [
  { hour: "01:00 AM", orders: 1, revenue: 300, user: 1 },
  { hour: "02:00 AM", orders: 0, revenue: 0,   user: 0 },
  { hour: "03:00 AM", orders: 2, revenue: 600, user: 2 },
  { hour: "04:00 AM", orders: 1, revenue: 250, user: 1 },
  { hour: "05:00 AM", orders: 0, revenue: 0,   user: 0 },
  { hour: "06:00 AM", orders: 3, revenue: 900, user: 2 },
  { hour: "07:00 AM", orders: 2, revenue: 700, user: 2 },
  { hour: "08:00 AM", orders: 4, revenue: 1400,user: 3 },
  { hour: "09:00 AM", orders: 3, revenue: 1200,user: 2 },
  { hour: "10:00 AM", orders: 5, revenue: 2000,user: 4 },
  { hour: "11:00 AM", orders: 6, revenue: 2600,user: 5 },
  { hour: "12:00 AM", orders: 4, revenue: 1800,user: 3 },
  { hour: "01:00 PM", orders: 7, revenue: 3000,user: 6 },
  { hour: "02:00 PM", orders: 5, revenue: 2400,user: 4 },
  { hour: "03:00 PM", orders: 6, revenue: 2800,user: 5 },
  { hour: "04:00 PM", orders: 8, revenue: 3500,user: 7 },
  { hour: "05:00 PM", orders: 7, revenue: 3300,user: 6 },
  { hour: "06:00 PM", orders: 6, revenue: 2900,user: 5 },
  { hour: "07:00 PM", orders: 9, revenue: 4000,user: 8 },
  { hour: "08:00 PM", orders: 8, revenue: 3700,user: 7 },
  { hour: "09:00 PM", orders: 10,revenue: 4500,user: 9 },
  { hour: "10:00 PM", orders: 9, revenue: 4200,user: 8 },
  { hour: "11:00 PM", orders: 7, revenue: 3400,user: 6 },
  { hour: "12:00 PM", orders: 5, revenue: 2600,user: 4 },
]
,


  week: [
    { day: "Sat", visitors: 300 },
    { day: "Sun", visitors: 450 },
    { day: "Mon", visitors: 280 },
    { day: "Tue", visitors: 500 },
    { day: "Wed", visitors: 420 },
    { day: "Thu", visitors: 600 },
    { day: "Fri", visitors: 550 },
  ],

  month: [
    { week: "Week 1", visitors: 2000 },
    { week: "Week 2", visitors: 2600 },
    { week: "Week 3", visitors: 2300 },
    { week: "Week 4", visitors: 3000 },
  ],

  total: 12000
};

// ================= CART BUT NO BUY =================
export const cartAbandonedStats = {
  today: [
  { hour: "01:00 AM", orders: 1, revenue: 300, user: 1 },
  { hour: "02:00 AM", orders: 0, revenue: 0,   user: 0 },
  { hour: "03:00 AM", orders: 2, revenue: 600, user: 2 },
  { hour: "04:00 AM", orders: 1, revenue: 250, user: 1 },
  { hour: "05:00 AM", orders: 0, revenue: 0,   user: 0 },
  { hour: "06:00 AM", orders: 3, revenue: 900, user: 2 },
  { hour: "07:00 AM", orders: 2, revenue: 700, user: 2 },
  { hour: "08:00 AM", orders: 4, revenue: 1400,user: 3 },
  { hour: "09:00 AM", orders: 3, revenue: 1200,user: 2 },
  { hour: "10:00 AM", orders: 5, revenue: 2000,user: 4 },
  { hour: "11:00 AM", orders: 6, revenue: 2600,user: 5 },
  { hour: "12:00 AM", orders: 4, revenue: 1800,user: 3 },
  { hour: "01:00 PM", orders: 7, revenue: 3000,user: 6 },
  { hour: "02:00 PM", orders: 5, revenue: 2400,user: 4 },
  { hour: "03:00 PM", orders: 6, revenue: 2800,user: 5 },
  { hour: "04:00 PM", orders: 8, revenue: 3500,user: 7 },
  { hour: "05:00 PM", orders: 7, revenue: 3300,user: 6 },
  { hour: "06:00 PM", orders: 6, revenue: 2900,user: 5 },
  { hour: "07:00 PM", orders: 9, revenue: 4000,user: 8 },
  { hour: "08:00 PM", orders: 8, revenue: 3700,user: 7 },
  { hour: "09:00 PM", orders: 10,revenue: 4500,user: 9 },
  { hour: "10:00 PM", orders: 9, revenue: 4200,user: 8 },
  { hour: "11:00 PM", orders: 7, revenue: 3400,user: 6 },
  { hour: "12:00 PM", orders: 5, revenue: 2600,user: 4 },
]
,

  week: [
    { day: "Sat", count: 40 },
    { day: "Sun", count: 55 },
    { day: "Mon", count: 30 },
    { day: "Tue", count: 70 },
    { day: "Wed", count: 60 },
    { day: "Thu", count: 90 },
    { day: "Fri", count: 80 },
  ],

  month: [
    { week: "Week 1", count: 200 },
    { week: "Week 2", count: 260 },
    { week: "Week 3", count: 220 },
    { week: "Week 4", count: 310 },
  ]
};

// ================= CONVERSION COMPARISON =================
export const conversionStats = [
  { name: "Visitors", value: 12000 },
  { name: "Reached Cart", value: 4300 },
  { name: "Purchased", value: 1080 },
];

// ================= ORDERS DETAILS (TABLE - FUTURE) =================
export const ordersTable = [
  {
    id: "ORD-1001",
    fullName: "Ahmed Hassan",
    country: "Egypt",
    city: "Cairo",
    address: "Nasr City, Street 10",
    phone: "01012345678",
    second_phone: null,

    products: [
      {
        name: "Black Hoodie",
        price: 800,
        quantity: 2,
        image: "/images/hoodie.png"
      },
      {
        name: "White Sneakers",
        price: 1200,
        quantity: 1,
        image: "/images/shoes.png"
      }
    ],

    totalProducts: 3,
    totalPrice: 2800
  },

  {
    id: "ORD-1002",
    fullName: "Sara Mohamed",
    country: "Egypt",
    city: "Giza",
    address: "Dokki, Street 5",
    phone: "01198765432",
    second_phone: "01222222222",

    products: [
      {
        name: "T-shirt",
        price: 400,
        quantity: 2,
        image: "/images/tshirt.png"
      }
    ],

    totalProducts: 2,
    totalPrice: 800
  }
];
