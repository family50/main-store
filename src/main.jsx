import React, { useState , useEffect } from "react";

import Home from "./home.jsx";
import Header from "./header.jsx";
import Cart from "./cart.jsx";
import  Dashboard  from "./dashboard.jsx";
import { Routes, Route, useLocation } from "react-router-dom";

function Main() {
   const location = useLocation();
const hideHeader = location.pathname === "/cart" || location.pathname.startsWith("/dashboard");



  const getSavedIndex = () => {
  const saved = localStorage.getItem("scrollIndex");
  return saved !== null ? Number(saved) : 0;
};
  const [scrollIndex, setScrollIndex] = useState(getSavedIndex);
useEffect(() => {
  localStorage.setItem("scrollIndex", scrollIndex);
}, [scrollIndex]);

const whiteGradient = `
  radial-gradient(
    circle at center,
    rgba(255,255,255,0.35) 0%,
    rgba(255,255,255,0.15) 30%,
    rgba(255,255,255,0.05) 50%,
    rgba(255,255,255,0) 70%
  )
`;
const blackGradient = `
  radial-gradient(
    circle at center,
    rgba(0,0,0,0.35) 0%,
    rgba(0,0,0,0.25) 30%,
    rgba(0,0,0,0.15) 50%,
    rgba(0,0,0,0) 70%
  )
`;
 const [products, setProducts] = useState([
  {
   
     id: 1,
    productTitles: "Modern jacket",
    productDescriptions:"A modern jacket with a sleek design for everyday wear.", 
    images: ["/Elegante_Fleecejacke_mit_Kapuze_für_Wintertage_-_Rosa___XXL-removebg-preview.png"],
    backgrounds: "#d9dee1",
    textColors: { title: "#1a1a1a", description: "#4b4f54" },
    price: 140,
    buttonColors:"#4b4b4b",
    buttonTextColors: "#ffffff",
    quantity: 1,
    leftshadow: "0 4px 15px rgba(51, 57, 60, 0.65)", // للباكجراوند #d9dee1
    headerShadows: "0 4px 15px rgba(51, 57, 60, 0.65)",
    iconShadows:"2px 2px 8px #4b4b4b",
    backgroundshadow: blackGradient,
    backgroundcartCount:"#1a1a1a",
    cartCountshadow:"#1a1a1a",
  },
  {
    id: 2,
    productTitles: "Jacket Bump",
    productDescriptions: "A stylish and warm jacket, perfect for winter.", 
    images:["/WhatsApp_Image_2026-01-10_at_11.04.24_AM-removebg-preview.png"],
    backgrounds: "#b65a2a",
    textColors:{ title: "#ffffff", description: "#f1e6df" }, 
    price: 120,
    buttonColors:"#ffd700",
    buttonTextColors: "#ffffff",
    quantity: 1,
    leftshadow:"0 4px 15px #ffd9004e", // للباكجراوند #b65a2a
    headerShadows:"0 4px 15px #ffd9004e",
    iconShadows:"2px 2px 8px #ffd700",
     backgroundshadow: whiteGradient,
     backgroundcartCount:"#b65a2a",
    cartCountshadow:"#2e231d",
  },
  {
    id: 3,
    productTitles: "Italian shirt",
    productDescriptions: "A premium Italian shirt made for elegance and comfort.", 
    images: ["/Men_s_Button_Down_Collared_Neck_Shirt-removebg-preview.png"],
    backgrounds:"#3f4663",
    textColors: { title: "#ffffff", description: "#cfd5ff" },
    price: 95,
    buttonColors: "#f0e68c",
    buttonTextColors: "#1a1a1a",
    quantity: 1,
    leftshadow: "0 4px 15px rgba(63, 70, 99, 0.8)",   // للباكجراوند #3f4663
    headerShadows:"0 4px 15px rgba(63, 70, 99, 0.8)",
    iconShadows: "2px 2px 8px #f0e68c",
    backgroundshadow: whiteGradient,
    backgroundcartCount:"#3f4663",
     cartCountshadow:"#f0e68c",
  },
  {
    id: 4,
    productTitles: "Puma shoes",
    productDescriptions:"High-performance Puma shoes built for comfort and speed.",
    images: ["/Puma_PALERMO_UNISEX_-_Trainers_-_archive_green_white-removebg-preview.png"],
    backgrounds:"#437353",
    textColors:{ title: "#ffffff", description: "#dce9e2" },
    price: 95,
    buttonColors:"#90ee90",
    buttonTextColors: "#1a1a1a",
    quantity: 1,
    leftshadow: "0 4px 15px #437353",  // للباكجراوند #437353
    headerShadows:"0 4px 15px #437353",
    iconShadows:"2px 2px 8px #90ee90",
    backgroundshadow: whiteGradient,
    backgroundcartCount:"#437353",
    cartCountshadow:"#90ee90",
  },
  {
    id: 5,
    productTitles: "Simple hoodie",
    productDescriptions:"A simple and cozy hoodie ideal for daily outfits.",  
    images: ["/Soul_Half_Zipper_Solid_Sweatshirt_for_Men-removebg-preview.png"],
    backgrounds:"#1a1a1a",
    textColors:{ title: "#ffffff", description: "#bfbfbf" }, 
    price: 95,
    buttonColors: "#ffffff",
    buttonTextColors: "#1a1a1a",
    quantity: 1,
    leftshadow: "0 4px 15px rgba(255, 254, 254, 0.43)",   // للباكجراوند #1a1a1a
    headerShadows:"0 4px 15px rgba(255, 254, 254, 0.43)",
    iconShadows:"2px 2px 8px #ffffff",
     backgroundshadow: whiteGradient,
     backgroundcartCount:"#1a1a1a",
     cartCountshadow:"#ffffff",
   },
  {
    id: 6,
    productTitles: "Women's hoodie",
    productDescriptions: "A comfortable women's hoodie with a soft, modern look.", 
    images:["/14_of_the_Coolest_Cropped_Sweaters_to_Rock_This_Fall-removebg-preview.png"],
    backgrounds:"#a11e27",
    textColors: { title: "#ffffff", description: "#f2cfd1" },
    price: 95,
    buttonColors: "#ff69b4",
    buttonTextColors: "#ffffff",
    quantity: 1,
    leftshadow: "0 4px 15px #ff69b46f",  // للباكجراوند #a11e27
    headerShadows: "0 4px 15px #ff69b46f",
    iconShadows: "2px 2px 8px #ff69b4",
    backgroundshadow: whiteGradient,
    backgroundcartCount:"#a11e27",
    cartCountshadow:"#ff69b4",
  },
]);

const [Quantities, setQuantities] = useState(() => {
  const saved = localStorage.getItem("productQuantities");
  return saved ? JSON.parse(saved) : {};
});

useEffect(() => {
  localStorage.setItem("productQuantities", JSON.stringify(Quantities));
}, [Quantities]);





const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const [key, val] = c.split("=");
    if (key === name) return val;
  }
  return null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};


const [cartCount, setCartCount] = useState(() => {
  const saved = getCookie("cartCount");
  return saved ? Number(saved) : 0;
});

// الدالة لحفظ المنتج في الكارت ومسح العدادات
const handleAddToCart = (productId) => {
  const currentProduct = products.find(p => p.id === productId);
  if (!currentProduct) return;

  // 1️⃣ نجيب كمية المنتج الحالية من الـ state
  const newQuantity = Quantities[productId] || 1;

  // 2️⃣ نحضر الكارت الموجود في localStorage أو ننشئه لو فاضي
  const savedCart = JSON.parse(localStorage.getItem("cart")) || {};

  // 3️⃣ إذا المنتج موجود بالفعل → نجمع الكميات ونحدث السعر الإجمالي
  if (savedCart[productId]) {
    const oldQuantity = savedCart[productId].quantity || 0;
    const oldTotal = savedCart[productId].total || 0;

    const updatedQuantity = oldQuantity + newQuantity;
    const updatedTotal = oldTotal + currentProduct.price * newQuantity;

    savedCart[productId] = {
      ...savedCart[productId], // الاحتفاظ بباقي بيانات المنتج
      quantity: updatedQuantity,
      total: updatedTotal
    };
  } else {
    // 4️⃣ إذا المنتج غير موجود → نضيفه لأول مرة
    savedCart[productId] = {
      id: currentProduct.id,
      productTitles: currentProduct.productTitles,
      images: currentProduct.images[0],
      price: currentProduct.price,
      quantity: newQuantity,
      total: currentProduct.price * newQuantity
    };
  }


  // 4️⃣ نحفظ الكارت كامل في localStorage
  localStorage.setItem("cart", JSON.stringify(savedCart));

  // 5️⃣ بعد ما حفظنا، نمسح عداد الكمية من الـ state
  setQuantities(prev => {
    const newQuantities = { ...prev };
    delete newQuantities[productId];
    return newQuantities;
  });

  // ✅ Optional: مسح العدادات من الـ localStorage الخاص بها لو كنت محفظها
  const savedQuantities = JSON.parse(localStorage.getItem("productQuantities")) || {};
  delete savedQuantities[productId];
  localStorage.setItem("productQuantities", JSON.stringify(savedQuantities));
  setCartCount(prev => {
  const newValue = prev + 1;
  setCookie("cartCount", newValue, 7); // نخزنه أسبوع
  return newValue;
});

};



  return (
    <>
       {/* الهيدر يظهر في كل الصفحات ماعدا cart */}
      {!hideHeader && (
        <Header
          products={products}
          scrollIndex={scrollIndex}
          iconColor={products[scrollIndex].buttonColors}
          headerShadow={products[scrollIndex].headerShadows}
          iconShadow={products[scrollIndex].iconShadows}
          buttonColors={products[scrollIndex].buttonColors}
          buttonTextColors={products[scrollIndex].buttonTextColors}
          cartCount={cartCount}
          setCartCount={setCartCount}
          deleteCookie={deleteCookie}
          textColors={products[scrollIndex].textColors}
          backgrounds={products[scrollIndex].backgrounds}
          />
      )}

      <Routes>
        <Route
          path="/"
          element={
           <Home
               scrollIndex={scrollIndex}
               setScrollIndex={setScrollIndex}
               products={products}
               setProducts={setProducts}
               Quantities={Quantities}
               setQuantities={setQuantities}
               handleAddToCart={handleAddToCart}
          />
          }
        />
        <Route
    path="/cart"
    element={
      <Cart
         products={products}
         setProducts={setProducts}
        
      />
    }
  />
      </Routes>
       <Routes>
        <Route
          path="dashboard/"
          element={
           <Dashboard
            
          />
          }
        />
      </Routes>
    </>
  );
}

export default Main;
