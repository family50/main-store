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
  // ====== Today ======
  {
    id: "ORD-1001",
    fullName: "Ahmed Hassan",
    country: "Egypt",
    city: "Cairo",
    address: "Nasr City, Street 10",
    phone: "01012345678",
    second_phone: null,
    products: [
      { name: "Black Hoodie", price: 800, quantity: 2, image: "/Soul_Half_Zipper_Solid_Sweatshirt_for_Men-removebg-preview.png"},
      { name: "White Sneakers", price: 1200, quantity: 1, image: "/Puma_PALERMO_UNISEX_-_Trainers_-_archive_green_white-removebg-preview.png" }
    ],
    totalProducts: 3,
    totalPrice: 2800,
    date: "today"
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
      { name: "T-shirt", price: 400, quantity: 2, image:"/Puma_PALERMO_UNISEX_-_Trainers_-_archive_green_white-removebg-preview.png" }
    ],
    totalProducts: 2,
    totalPrice: 800,
    date: "today"
  },
  {
    id: "ORD-1003",
    fullName: "Omar Ali",
    country: "Egypt",
    city: "Alexandria",
    address: "Smouha, Street 12",
    phone: "01234567891",
    second_phone: null,
    products: [
      { name: "Blue Jeans", price: 600, quantity: 1, image:"/Puma_PALERMO_UNISEX_-_Trainers_-_archive_green_white-removebg-preview.png"}
    ],
    totalProducts: 1,
    totalPrice: 600,
    date: "today"
  },
  {
    id: "ORD-1004",
    fullName: "Mona Samir",
    country: "Egypt",
    city: "Cairo",
    address: "Maadi, Street 2",
    phone: "01099887766",
    second_phone: null,
    products: [
      { name: "Red Dress", price: 900, quantity: 1, image:  "/WhatsApp_Image_2026-01-10_at_11.04.24_AM-removebg-preview.png"},
      { name: "Black Sandals", price: 500, quantity: 1, image:"/Elegante_Fleecejacke_mit_Kapuze_für_Wintertage_-_Rosa___XXL-removebg-preview.png" }
    ],
    totalProducts: 2,
    totalPrice: 1400,
    date: "today"
  },
  {
    id: "ORD-1005",
    fullName: "Khaled Nabil",
    country: "Egypt",
    city: "Giza",
    address: "Mohandessin, Street 8",
    phone: "01122334455",
    second_phone: null,
    products: [
      { name: "White Hoodie", price: 750, quantity: 1, image: "/Elegante_Fleecejacke_mit_Kapuze_für_Wintertage_-_Rosa___XXL-removebg-preview.png"}
    ],
    totalProducts: 1,
    totalPrice: 750,
    date: "today"
  },

  // ====== Week ======
  {
    id: "ORD-1006",
    fullName: "Heba Fathy",
    country: "Egypt",
    city: "Cairo",
    address: "Heliopolis, Street 4",
    phone: "01011223344",
    second_phone: null,
    products: [
      { name: "Green T-shirt", price: 350, quantity: 2, image:"/WhatsApp_Image_2026-01-10_at_11.04.24_AM-removebg-preview.png" }
    ],
    totalProducts: 2,
    totalPrice: 700,
    date: "week"
  },
  {
    id: "ORD-1007",
    fullName: "Tamer Adel",
    country: "Egypt",
    city: "Alexandria",
    address: "Gleem, Street 1",
    phone: "01233445566",
    second_phone: null,
    products: [
      { name: "Running Shoes", price: 1300, quantity: 1, image: "/WhatsApp_Image_2026-01-10_at_11.04.24_AM-removebg-preview.png"}
    ],
    totalProducts: 1,
    totalPrice: 1300,
    date: "week"
  },
  {
    id: "ORD-1008",
    fullName: "Salma Hossam",
    country: "Egypt",
    city: "Giza",
    address: "6th of October, Street 9",
    phone: "01155667788",
    second_phone: null,
    products: [
      { name: "Leather Jacket", price: 1500, quantity: 1, image: "/14_of_the_Coolest_Cropped_Sweaters_to_Rock_This_Fall-removebg-preview.png" }
    ],
    totalProducts: 1,
    totalPrice: 1500,
    date: "week"
  },
  {
    id: "ORD-1009",
    fullName: "Mohamed Fawzy",
    country: "Egypt",
    city: "Cairo",
    address: "Zamalek, Street 3",
    phone: "01066778899",
    second_phone: null,
    products: [
      { name: "Cap", price: 200, quantity: 3, image:"/14_of_the_Coolest_Cropped_Sweaters_to_Rock_This_Fall-removebg-preview.png"}
    ],
    totalProducts: 3,
    totalPrice: 600,
    date: "week"
  },
  {
    id: "ORD-1010",
    fullName: "Aya Mahmoud",
    country: "Egypt",
    city: "Alexandria",
    address: "Stanley, Street 7",
    phone: "01277889900",
    second_phone: null,
    products: [
      { name: "Sunglasses", price: 500, quantity: 2, image:"/14_of_the_Coolest_Cropped_Sweaters_to_Rock_This_Fall-removebg-preview.png" }
    ],
    totalProducts: 2,
    totalPrice: 1000,
    date: "week"
  },
  {
    id: "ORD-1011",
    fullName: "Youssef Adel",
    country: "Egypt",
    city: "Cairo",
    address: "Dokki, Street 11",
    phone: "01111223344",
    second_phone: null,
    products: [
      { name: "White Sneakers", price: 1200, quantity: 1, image: "/14_of_the_Coolest_Cropped_Sweaters_to_Rock_This_Fall-removebg-preview.png" }
    ],
    totalProducts: 1,
    totalPrice: 1200,
    date: "week"
  },
  {
    id: "ORD-1012",
    fullName: "Dina Kamal",
    country: "Egypt",
    city: "Giza",
    address: "Haram, Street 5",
    phone: "01022334455",
    second_phone: null,
    products: [
      { name: "Black T-shirt", price: 400, quantity: 2, image:"/14_of_the_Coolest_Cropped_Sweaters_to_Rock_This_Fall-removebg-preview.png" }
    ],
    totalProducts: 2,
    totalPrice: 800,
    date: "week"
  },
  {
    id: "ORD-1013",
    fullName: "Ali Mostafa",
    country: "Egypt",
    city: "Alexandria",
    address: "Roushdy, Street 6",
    phone: "01233445577",
    second_phone: null,
    products: [
      { name: "Blue Hoodie", price: 850, quantity: 1, image: "/14_of_the_Coolest_Cropped_Sweaters_to_Rock_This_Fall-removebg-preview.png" }
    ],
    totalProducts: 1,
    totalPrice: 850,
    date: "week"
  },
  {
    id: "ORD-1014",
    fullName: "Fatma Nader",
    country: "Egypt",
    city: "Cairo",
    address: "Maadi, Street 15",
    phone: "01099887766",
    second_phone: null,
    products: [
      { name: "Black Dress", price: 900, quantity: 1, image: "/14_of_the_Coolest_Cropped_Sweaters_to_Rock_This_Fall-removebg-preview.png"}
    ],
    totalProducts: 1,
    totalPrice: 900,
    date: "week"
  },

  // ====== Past ======
  {
    id: "ORD-1015",
    fullName: "Hany Samir",
    country: "Egypt",
    city: "Giza",
    address: "Mohandessin, Street 3",
    phone: "01155667799",
    second_phone: null,
    products: [
      { name: "Red Hoodie", price: 850, quantity: 1, image: "/Soul_Half_Zipper_Solid_Sweatshirt_for_Men-removebg-preview.png" }
    ],
    totalProducts: 1,
    totalPrice: 850,
    date: "past"
  },
  {
    id: "ORD-1016",
    fullName: "Laila Fathy",
    country: "Egypt",
    city: "Cairo",
    address: "Heliopolis, Street 8",
    phone: "01033445566",
    second_phone: null,
    products: [
      { name: "White Sneakers", price: 1200, quantity: 1, image: "/Soul_Half_Zipper_Solid_Sweatshirt_for_Men-removebg-preview.png" }
    ],
    totalProducts: 1,
    totalPrice: 1200,
    date: "past"
  },
  {
    id: "ORD-1017",
    fullName: "Omar Kamal",
    country: "Egypt",
    city: "Alexandria",
    address: "Stanley, Street 10",
    phone: "01244556677",
    second_phone: null,
    products: [
      { name: "Blue Jeans", price: 600, quantity: 2, image: "/Soul_Half_Zipper_Solid_Sweatshirt_for_Men-removebg-preview.png" }
    ],
    totalProducts: 2,
    totalPrice: 1200,
    date: "past"
  },
  {
    id: "ORD-1018",
    fullName: "Mona Adel",
    country: "Egypt",
    city: "Giza",
    address: "Dokki, Street 12",
    phone: "01166778899",
    second_phone: null,
    products: [
      { name: "Red Dress", price: 900, quantity: 1, image: "/Soul_Half_Zipper_Solid_Sweatshirt_for_Men-removebg-preview.png" }
    ],
    totalProducts: 1,
    totalPrice: 900,
    date: "past"
  },
  {
    id: "ORD-1019",
    fullName: "Khaled Samir",
    country: "Egypt",
    city: "Cairo",
    address: "Nasr City, Street 20",
    phone: "01011223344",
    second_phone: null,
    products: [
      { name: "Black Hoodie", price: 800, quantity: 1, image: "/Soul_Half_Zipper_Solid_Sweatshirt_for_Men-removebg-preview.png"}
    ],
    totalProducts: 1,
    totalPrice: 800,
    date: "past"
  },
  {
    id: "ORD-1020",
    fullName: "Sara Adel",
    country: "Egypt",
    city: "Alexandria",
    address: "Gleem, Street 2",
    phone: "01277889911",
    second_phone: null,
    products: [
      { name: "White T-shirt", price: 400, quantity: 2, image: "/Soul_Half_Zipper_Solid_Sweatshirt_for_Men-removebg-preview.png" }
    ],
    totalProducts: 2,
    totalPrice: 800,
    date: "past"
  }
];
