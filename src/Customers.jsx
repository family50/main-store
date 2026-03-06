import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./customers.css";
import { translations } from "./translations";
import { ordersTable } from "./analytics"; // مكان ملف البيانات

export default function Customers({ lang ,changePage }) {
  const t = translations[lang];

  const [openPanel, setOpenPanel] = useState(null); // "week" | "month" | null
  const [activeBtn, setActiveBtn] = useState("today");
  const [weekLabel, setWeekLabel] = useState(t.charts.week);
  const [monthLabel, setMonthLabel] = useState(t.charts.month);
  const [displayLabel, setDisplayLabel] = useState(t.charts.today);
const [selectedOrder, setSelectedOrder] = useState(null);
const modalRef = useRef(null);
const [currentProductIndex, setCurrentProductIndex] = useState(0);

const [searchName, setSearchName] = useState("");
const [searchPhone, setSearchPhone] = useState("");

;
 const filteredOrders = ordersTable.filter(order => {
  // فلترة حسب الوقت
  const timeMatch =
    (activeBtn === "today" && order.date === "today") ||
    (activeBtn === "week" && order.date === "week") ||
    (activeBtn === "month" && order.date === "past");

  // فلترة بالاسم
  const nameMatch = order.fullName
    .toLowerCase()
    .includes(searchName.toLowerCase());

  // فلترة بالموبايل
  const phoneMatch = order.phone
    .toString()
    .includes(searchPhone);

  return timeMatch && nameMatch && phoneMatch;
});

  const panelRef = useRef(null);

  // تشغيل الانيميشن عند الفتح
  useEffect(() => {
    if (openPanel && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [openPanel]);

  const togglePanel = (panel) => {
    if (openPanel === panel) {
      closePanel();
    } else {
      setOpenPanel(panel);
    }
  };

  const closePanel = () => {
    if (!panelRef.current) return;

    gsap.to(panelRef.current, {
      opacity: 0,
      y: -15,
      duration: 0.2,
      onComplete: () => setOpenPanel(null),
    });
  };
  const openOrder = (order) => {
  setSelectedOrder(order);
  setCurrentProductIndex(0);

  setTimeout(() => {
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
    );
  }, 10);
};

const closeOrder = () => {
  gsap.to(modalRef.current, {
    opacity: 0,
    scale: 0.9,
    y: 30,
    duration: 0.3,
    onComplete: () => setSelectedOrder(null),
  });
};




 const handleSelect = (label, type) => {
  setActiveBtn(type); // هذا التغيير الأساسي لتحديث الفلترة
  if (type === "week") {
    setWeekLabel(label);
    setMonthLabel(t.charts.month);
  }
  if (type === "month") {
    setMonthLabel(label);
    setWeekLabel(t.charts.week);
  }
  setDisplayLabel(label);
  closePanel();
};

  // Days
  const daysLabels =
    lang === "EN"
      ? ["1 day ago","2 days ago","3 days ago","4 days ago","5 days ago","6 days ago","7 days ago"]
      : ["منذ يوم","منذ يومين","منذ 3 أيام","منذ 4 أيام","منذ 5 أيام","منذ 6 أيام","منذ 7 أيام"];

  // Months
  const monthsLabels =
    lang === "EN"
      ? ["1 month ago","2 months ago","3 months ago","4 months ago","5 months ago","6 months ago",
         "7 months ago","8 months ago","9 months ago","10 months ago","11 months ago","12 months ago"]
      : ["منذ شهر","منذ شهرين","منذ 3 أشهر","منذ 4 أشهر","منذ 5 أشهر","منذ 6 أشهر",
         "منذ 7 أشهر","منذ 8 أشهر","منذ 9 أشهر","منذ 10 أشهر","منذ 11 شهر","منذ 12 شهر"];

  return (
    <div className="customers-page">
           
        <button className="back-btn" onClick={() => changePage("dashboard")}>
          <i className="fas fa-arrow-left"></i>
        </button>
       
      <h1 className="customers-title">
        <i className="fa-solid fa-users customers-icon"></i>
        {lang === "EN" ? "Customers" : "العملاء"}
      </h1>

      <p className="customers-desc">
        {lang === "EN" ? "Track customer activity based on time periods." : "تابع نشاط العملاء حسب الفترات الزمنية."}
      </p>

      <div className="customers-buttons">
        <button
          className={`time-btn ${activeBtn === "today" ? "active" : ""}`}
          onClick={() => {
            setActiveBtn("today");
            setWeekLabel(t.charts.week);
            setMonthLabel(t.charts.month);
            setDisplayLabel(t.charts.today);
            if (openPanel) closePanel();
          }}
        >
          {t.charts.today}
        </button>

       <button
  className={`time-btn ${activeBtn === "week" ? "active" : ""}`}
  onClick={() => togglePanel("week")}
>
  {weekLabel}
  <i className={`fa-solid fa-chevron-${openPanel === "week" ? "up" : "down"} arrow-icon`}></i>
</button>

<button
  className={`time-btn ${activeBtn === "month" ? "active" : ""}`}
  onClick={() => togglePanel("month")}
>
  {monthLabel}
  <i className={`fa-solid fa-chevron-${openPanel === "month" ? "up" : "down"} arrow-icon`}></i>
</button>
      </div>

      {openPanel && (
        <div className="overlay-panel" ref={panelRef}>
          {openPanel === "week" &&
            daysLabels.map((label, i) => (
              <div key={i} className="panel-item" onClick={() => handleSelect(label, "week")}>
                {label}
              </div>
            ))}

          {openPanel === "month" &&
            monthsLabels.map((label, i) => (
              <div key={i} className="panel-item" onClick={() => handleSelect(label, "month")}>
                {label}
              </div>
            ))}
        </div>
      )}

      <div className="customers-data">
        <div className="top-controls">
          <div className="search-boxes">
            <div className="search-input">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" 
              placeholder={lang === "EN" ? "Search by Name" : "البحث بالاسم"} 
               value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              
              />           
            </div>
            <div className="search-input">
              <i className="fa-solid fa-phone"></i>
              <input type="text" placeholder={lang === "EN" ? "Search by Phone" : "البحث بالهاتف"}
               value={searchPhone}
               onChange={(e) => setSearchPhone(e.target.value)}
              
              />
            </div>
          </div>
          <div className="today-box">{displayLabel}</div>
        </div>

        <div className="data-content">
      {filteredOrders.map(order => (
         <div className="order-item" key={order.id}>
          <div className="order-info">
            <p><strong>{lang === "EN" ? "ID:" : "رقم الطلب:"}</strong> {order.id}</p>
            <p><strong>{lang === "EN" ? "Name:" : "الاسم:"}</strong> {order.fullName}</p>
            <p><strong>{lang === "EN" ? "City:" : "المدينة:"}</strong> {order.city}</p>
            <p><strong>{lang === "EN" ? "Total Products:" : "عدد المنتجات:"}</strong> {order.totalProducts}</p>
            <p><strong>{lang === "EN" ? "Total Price:" : "السعر الكلي:"}</strong> ${order.totalPrice}</p>
            <p><strong>{lang === "EN" ? "Phone:" : "الهاتف:"}</strong> {order.phone}</p>
          </div>
       <div className="order-actions">
 <button className="view-btn" onClick={() => openOrder(order)}>
  <i className="fa-solid fa-eye"></i> {lang === "EN" ? "View" : "عرض"}
</button>

  <button className="delete-btn">
    <i className="fa-solid fa-trash"></i> {lang === "EN" ? "Delete:" : "مسح"}
  </button>
</div>
        </div>
      ))}
{selectedOrder && (
  <div className="order-modal-overlay">
    <div className="order-modal" ref={modalRef}>

      <button className="close-btn" onClick={closeOrder}>✖</button>

      {/* ===== الجزء الأول: السلايدر ===== */}
      <div className="modal-top">

        <div className="product-view">
          <img
            src={selectedOrder.products[currentProductIndex].image}
            alt=""
          />
           {/* صف الزرين تحت الصورة */}
  <div className="arrow-buttons-container">
     <button
          className="arrow-btn"
          disabled={currentProductIndex === 0}
          onClick={() => setCurrentProductIndex(p => p - 1)}
        >◀</button>
     <button
          className="arrow-btn"
          disabled={currentProductIndex === selectedOrder.products.length - 1}
          onClick={() => setCurrentProductIndex(p => p + 1)}
        >▶</button>
  </div>

         <div className="product-info">
  <h3>{selectedOrder.products[currentProductIndex].name}</h3>

  <div className="product-detail">
    <span className="label">{lang === "EN" ? "Quantity" : "الكمية"}</span>
    <span className="value">{selectedOrder.products[currentProductIndex].quantity}</span>
  </div>

  <div className="product-detail">
    <span className="label">{lang === "EN" ? "Price" : "السعر"}</span>
    <span className="value">${selectedOrder.products[currentProductIndex].price}</span>
  </div>

  <div className="product-detail">
    <span className="label">{lang === "EN" ? "Total" : "الإجمالي"}</span>
    <span className="value">
      ${selectedOrder.products[currentProductIndex].price *
        selectedOrder.products[currentProductIndex].quantity}
    </span>
  </div>
</div>

        </div>

      

      </div>

      {/* ===== الجزء الثاني: كل المنتجات ===== */}
      <div className="modal-products-list">
        {selectedOrder.products.map((p, i) => (
          <div key={i} className="product-row">
            <span>{p.name}</span>
            <span>
              {lang === "EN" ? "Quantity:" : "الكمية:"} {p.quantity} × ${p.price}
            </span>
            <span>
              {lang === "EN" ? "Total:" : "الإجمالي:"} ${p.quantity * p.price}
            </span>
          </div>
        ))}

        <div className="products-total">
          {lang === "EN" ? "Total Products:" : "إجمالي المنتجات:"} {selectedOrder.totalProducts}
          <br/>
          {lang === "EN" ? "Total Price:" : "السعر الإجمالي:"} ${selectedOrder.totalPrice}
        </div>
      </div>

    {/* ===== الجزء الثالث: بيانات العميل ===== */}
<div className="modal-customer-info">
  <h2 className="customer-name">{lang === "EN" ? "Customer Info" : "بيانات العميل"}</h2>

  {/* باقي البيانات تحت الاسم */}
  <div className="customer-details">
  <p>
    <strong>{lang === "EN" ? "Name:" : "الاسم:"}</strong>{" "}
    {selectedOrder.fullName}
  </p>

  <p>
    <strong>{lang === "EN" ? "Country:" : "الدولة:"}</strong>{" "}
    {selectedOrder.country}
  </p>

  <p>
    <strong>{lang === "EN" ? "City:" : "المدينة:"}</strong>{" "}
    {selectedOrder.city}
  </p>

  <p>
    <strong>{lang === "EN" ? "Address:" : "العنوان:"}</strong>{" "}
    {selectedOrder.address}
  </p>

  <p>
    <strong>{lang === "EN" ? "Phone:" : "رقم الهاتف:"}</strong>{" "}
    {selectedOrder.phone}
  </p>

  {selectedOrder.second_phone && (
    <p>
      <strong>{lang === "EN" ? "Second Phone:" : "رقم هاتف آخر:"}</strong>{" "}
      {selectedOrder.second_phone}
    </p>
  )}
</div>
</div>

    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
}
