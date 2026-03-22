import { useEffect, useRef , useState } from "react"; // استيراد useEffect للتعامل مع lifecycle و useRef لتخزين المراجع و useState للحالة
import gsap from "gsap"; // استيراد GSAP للأنيميشن
import "./cart.css"; // استيراد تنسيقات CSS
import { useNavigate } from "react-router-dom"; // استيراد useNavigate للتنقل بين الصفحات

function Cart() {

const summaryRef = useRef(null);   // مرجع لعنصر ملخص الطلب اليممين للتحكم فيه بالأنيميشن
const headerRef = useRef(null);    // مرجع لعنصر الهيدر أعلى الصفحة للتحكم في ظهوره وحركته
const subtitleRef = useRef(null);  // مرجع لعنصر النص أسفل الهيدر (Subtitle)
const productsRef = useRef({});    // مصفوفة مراجع لكل كارت منتج (تم تغييرها لكائن لضمان دقة الربط بالـ ID)
const [modalType, setModalType] = useState(null); // صفحه البينات عرض
const modalRef = useRef(null); //غلق صفحه البينات
const [Payment, setPayment] = useState(false); // صفحه الدفع
const PaymentRef = useRef(null); //غلق صفحه الدفع
 // متغير صفحه الدفع حسب عرض الشاشه 
const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);


// زر العودة للتسوق
  const navigate = useNavigate(); // hook للتنقل بين الصفحات
  const handleContinueShopping = () => {
    navigate("/"); // زر العودة للتسوق
  };




  // جلب بيانات الكارت المخزنةمن localStorage
  const [cartItems, setCartItems] = useState(() => { 
    const savedCart = localStorage.getItem("cart"); // جلب بيانات الكارت المخزنة
    return savedCart ? JSON.parse(savedCart) : {}; // تحويلها لكائن أو إرجاع كائن فارغ
  });

  // =====  تحديث  بينات الكارت لو تغيرت البينات فى اللوكل استورج====
  useEffect(() => {

    const handleStorageChange = () => {
      const savedCart = localStorage.getItem("cart"); // قراءة البيانات الجديدة
      setCartItems(savedCart ? JSON.parse(savedCart) : {}); // تحديث الحالة
    };

    window.addEventListener("storage", handleStorageChange); // الاستماع لتغيرات التخزين
    return () => window.removeEventListener("storage", handleStorageChange); // تنظيف الحدث
  }, []);


  
  // ===== تحديث الكمية من العدات  لكل منتج زياده او نقصان=====
  const handleQuantityChange = (id, delta) => {
    setCartItems(prev => {
      const updatedCart = { ...prev }; // عمل نسخة من الكارت
      if (updatedCart[id]) {
        updatedCart[id].quantity += delta; // تعديل الكمية
        if (updatedCart[id].quantity < 1) updatedCart[id].quantity = 1; // منع الكمية < 1
        updatedCart[id].total = updatedCart[id].quantity * updatedCart[id].price; // تحديث السعر الإجمالي
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // حفظ التغيير في localStorage
      return updatedCart; // تحديث الـ state
    });
  };





  // لو مفيش عناصر رجع صوره بى انميشن 
const imgRef = useRef(null);
useEffect(() => {
  const el = imgRef.current; // تخزين المرجع
  if (!el) return; // لو العنصر مش موجود، اخرج

  // Timeline للحركة المتكررة فقط لو الكارت فاضي
  if (Object.keys(cartItems).length === 0) {
    const tl = gsap.timeline({ repeat: -1 }); // إنشاء تايم لاين متكرر

    tl.fromTo(
      el,
      { x: "-100%", opacity: 0 }, // البداية: خارج الشاشة على الشمال ومخفية
      { x: "50%", opacity: 1, duration: 1, ease: "power1.inOut" } // تتحرك للمنتصف وتظهر
    )
      .to(el, { duration: 1, x: "50%", ease: "none" }) // تثبت ثانية في المنتصف
      .to(el, { x: "100%", opacity: 0, duration: 1, ease: "power1.inOut" }) // تتحرك لليمين وتختفي
      .set(el, { x: "-100%" }); // ترجع للشمال للبداية من جديد
  }
}, [cartItems]); // 🔑 كل مرة cartItems يتغير، نتحقق لو فاضي


// دالة غلق صفحه اللبينات
const closeModal = () => {
  if (!modalRef.current) return; // التحقق من وجود المرجع
  gsap.to(modalRef.current, {
    y: -100, // الارتفاع للأعلى
    opacity: 0, // الاختفاء
    duration: 0.4, // المدة
    ease: "power2.in", // نوع الحركة
    onComplete: () => setModalType(null), // يخفي أي مودال بعد الانتهاء
  });
};

// أنيميشن عند فتح المودال
useEffect(() => {
  if (modalType && modalRef.current) {
    gsap.fromTo(
      modalRef.current,
      { y: -100, opacity: 0 }, // نقطة البداية
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" } // نقطة النهاية
    );
  }
}, [modalType]);

// متغير صفحه الدفع حسب عرض الشاشه 
useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1024); // تحديث حالة الموبايل
  };
  window.addEventListener("resize", handleResize); // إضافة مستمع لتغيير الحجم

  return () => {
    window.removeEventListener("resize", handleResize); // تنظيف المستمع
  };
}, []);

// ===== حفظ بيانات الدفع =====
const [formData, setFormData] = useState({
  fullName: "",
  country: "",
  city: "",
  address: "",
  phone: ""
});

const [errors, setErrors] = useState({});



  // ===== أنيميشن عند تحميل الصفحة =====
  useEffect(() => {
    document.body.classList.remove("home", "other-page"); // إزالة أي كلاس قديم
    document.documentElement.classList.remove("home", "other-page"); // تنظيف الروت

    document.body.classList.add("cart-container"); // إضافة كلاس خاص بالصفحة
    document.documentElement.classList.add("cart-container"); // إضافة كلاس للروت

    // أنيميشن ملخص الطلب عند التحميل الأول
    gsap.fromTo(summaryRef.current, { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: 2, ease: "power3.out", delay: 0.5 });
    // أنيميشن الهيدر
    gsap.fromTo(headerRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" });
    // أنيميشن subtitle
    gsap.fromTo(subtitleRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 3, ease: "power3.out", delay: 0.3 });

    return () => {
      document.body.classList.remove("cart-container"); // تنظيف الكلاسات عند الخروج
      document.documentElement.classList.remove("cart-container");
    };
  }, []);

// ===== 🔑 تصليح أنيميشن المنتجات المضافة حديثاً =====
useEffect(() => {
  // تجميع المراجع الحقيقية الموجودة حالياً وفلترة أي قيم فارغة
  const existingProducts = Object.values(productsRef.current).filter(el => el !== null);

  // استهداف العناصر التي لم يتم عمل أنيميشن لها بعد (لا تحتوي على كلاس is-animated)
  const newProducts = existingProducts.filter(el => !el.classList.contains('is-animated'));

  if (newProducts.length > 0) {
    gsap.fromTo(
      newProducts,
      { x: -50, opacity: 0, scale: 0.9 }, // البداية: زحزحة لليسار وصغر حجم
      { 
        x: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        ease: "power3.out", 
        stagger: 0.2, // تتابع بين المنتجات
   onComplete: (targets) => { 
  // هنا نستخدم targets التي تمررها GSAP تلقائياً
  targets.forEach(el => el.classList.add('is-animated'));
}
      }
    );
  }
}, [cartItems]); // 🔑 يراقب التغير في الكارت ليشمل أي منتج جديد مضاف

  // ===== إجمالي السعر فى الكارت الى فى اليمين=====
  const totalPrice 
  = Object.values(cartItems).reduce((sum, item) => sum + item.total, 0); // جمع كل الأسعار







return (  
<div className="cart-container">
  
  {modalType === "empty" && ( // 🔥 مودال فارغ
  <div className="modal-wrapper">
    <div className="checkout-box-lose" ref={modalRef}>
      <button className="checkout-close" onClick={closeModal}>✖</button>
      <div className="empty-checkout-lose">
      
        <p className="empty-text">Your cart is empty. Please add some products before checkout.</p>
      </div>
    </div>
  </div>
)}

{modalType === "checkout" && ( //ادخال اللبينات
 <div className="checkout-box-wrapper">
  <div className="checkout-box"ref={modalRef}>

    <button 
      className="checkout-close"
     onClick={closeModal}
    >
      ✖
    </button>

    <div className="checkout-content">

      <div className="checkout-left">
        <img src="/25T22-54-18.png" alt="Payment" />
      </div>

      <div className="checkout-right">

<p className="checkout-text">
 <i className="fa fa-box-open checkout-icon"></i>

  Fast Checkout
</p>


<div className="input-wrapper">
  <input
    type="text"
    placeholder="Full Name"
    value={formData.fullName}
    onChange={(e) => {
      setFormData({ ...formData, fullName: e.target.value }); // تحديث الاسم
      setErrors({ ...errors, fullName: false }); // إزالة الخطأ
    }}
    style={{
      border: errors.fullName ? "2px solid red" : "2px solid #ccc"
    }}
  />
  <i className="fa fa-user"></i>
</div>





<div className="input-wrapper">
  <input type="text"
  placeholder="Country"
  value={formData.country}
  onChange={(e) => {
      setFormData({ ...formData, country: e.target.value }); // تحديث الدولة
      setErrors({ ...errors, country: false }); // إزالة الخطأ
    }}
    style={{
      border: errors.country ? "2px solid red" : "2px solid #ccc"
    }}
  />
  <i className="fa fa-flag"></i> {/* أيقونة الدولة */}
</div>

<div className="input-wrapper">
  <input type="text"
   placeholder="City" 
    value={formData.city}
     onChange={(e) => {
      setFormData({ ...formData, city: e.target.value }); // تحديث المدينة
      setErrors({ ...errors, city: false }); // إزالة الخطأ
    }}
    style={{
      border: errors.city ? "2px solid red" : "2px solid #ccc"
    }}
   />
  <i className="fa fa-city"></i> {/* أيقونة المدينة */}
</div>

<div className="input-wrapper">
  <input type="text"
   placeholder="Address"
    value={formData.address}
  onChange={(e) => {
      setFormData({ ...formData, address: e.target.value }); // تحديث العنوان
      setErrors({ ...errors, address: false }); // إزالة الخطأ
    }}
    style={{
      border: errors.address ? "2px solid red" : "2px solid #ccc"
    }}
   
   />
  <i className="fa fa-map-marker-alt"></i> {/* أيقونة العنوان */}
</div>

<div className="input-wrapper">
  <input type="tel"
   placeholder="Phone Number" 
   value={formData.phone}
  onChange={(e) => {
      setFormData({ ...formData, phone: e.target.value }); // تحديث الهاتف
      setErrors({ ...errors, phone: false }); // إزالة الخطأ
    }}
    style={{
      border: errors.phone ? "2px solid red" : "2px solid #ccc"
    }}
   />
  <i className="fa fa-phone"></i> {/* أيقونة الهاتف */}
</div>

<div className="input-wrapper">
    <span className="optional-text">Optional</span>
  <input type="tel" placeholder="Second Phone Number" />
  <i id="fa-phone" className="fa fa-phone"></i> {/* أيقونة الهاتف الثاني */}
</div>


     <button
  className="confirm-payment"
  onClick={() => {
    if (modalRef.current) {
       const newErrors = {
      fullName: !formData.fullName,
      country: !formData.country,
      city: !formData.city,
      address: !formData.address,
      phone: !formData.phone
    };
    setErrors(newErrors); // فحص الأخطاء
if (Object.values(newErrors).some(err => err)) return; // لو فيه خطأ اخرج

// هات input الرقم التاني
const secondPhoneInput = document.querySelector('input[placeholder="Second Phone Number"]');

let secondPhone = null; // القيمة الافتراضية

if (secondPhoneInput && secondPhoneInput.value.trim() !== "") {
  secondPhone = secondPhoneInput.value.trim(); // لو موجود خده
}


      setErrors(newErrors); // تحديث الأخطاء
      if (Object.values(newErrors).some(err => err)) return;
       // 3️⃣ كل الحقول مليانة، نحفظ البيانات في sessionStorage
      const dataToSave = {
        fullName: formData.fullName,
        country: formData.country,
        city: formData.city,
        address: formData.address,
        phone: formData.phone,
        second_phone: secondPhone // 👈 يا null يا رقم
      };
      sessionStorage.setItem("checkoutData", JSON.stringify(dataToSave)); // تخزين البيانات

      if (modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { y: 0, opacity: 1 },
          {
            y: -100,
            opacity: 0,
            duration: 0.5,
            ease: "power3.in",
            onComplete: () => {
              setModalType(null); // إغلاق المودال
              setPayment(true); // فتح صفحة الدفع

              setTimeout(() => {
                if (PaymentRef.current) {
                  gsap.fromTo(
                    PaymentRef.current,
                    { y: -100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
                  ); // أنيميشن ظهور صفحة الدفع
                }
              }, 2);
            }
          }
        );
      }
    }
  }}
>
  <i className="fa fa-credit-card" style={{ marginRight: '8px' }}></i>
  Confirm Payment
</button>



      
      </div>
    </div>
   </div> 
  </div>
)}

{Payment && !isMobile && (// صفحه الدفع نسخه الكمبيوتر
<div className="payment-page-wrapper">
 <div
    className="payment-page"ref={PaymentRef} >
      
   <button
  className="back-to-checkout"
  onClick={() => {
    if (PaymentRef.current) {
      // Animation لإخفاء صفحة الدفع
      gsap.to(PaymentRef.current, {
        x: "-100%",      // تتحرك لليسار خارج الشاشة
        opacity: 0,       // تختفي تدريجيًا
        duration: 0.5,    // نصف ثانية
        ease: "power3.in", // نوع الحركة
        onComplete: () => {
          setPayment(false);       // اخفاء صفحة الدفع من الـ DOM
          setModalType("checkout"); // اظهار صفحة checkout مرة تانية
        },
      });
    }
  }}
>
   <i className="fa fa-arrow-left"></i> Back
</button>
   
    {/* المحتوى الداخلي لصفحة الدفع */}
    
<div className="payment-content">
  <div className="payment-box">
    <div className="payment-left">
  <h2>Hello {formData.fullName ? formData.fullName.split(' ')[0] : "Guest"}</h2>{/* ترحيب */}
    </div>

    <div className="payment-right">
      <span>Total:</span>
      <span className="total-amount">${totalPrice}</span> {/* السعر */}
    </div>
  </div>
</div>



    {/* القسم الأسفل لكل عنصر */}
          {/* القسم الأسفل لكل عنصر */}
<div className="payment-content-bottom">
  <div className="payment-content-left">
    <h3>Select a payment method</h3>
    <p className="payment-subtitle">
      Select the payment method you want to use to pay for your products.
    </p>

    {/* الأزرار تحت النص */}
   <div className="Payment-methods">
  {/* الزر الأول */}
  <button className="payment-btn">
    <div className="btn-left">
      <span>PayPal</span>
    </div>
    <div className="btn-right">
      <img src="/toppng-paypal.png" alt="img1" id="PayPal" className="btn-img"/>
    </div>
  </button>

  {/* الزر الأوسط */}
  <button className="payment-btn middle">
    <div className="btn-left">
      <span>Credit Card</span>
    </div>
    <div className="btn-right">
      <img src="/11ccfbb92bce0438587dbb54abfb81cd.png" alt="img1" id="visa-right" className="btn-img"/>
      <img src="/4c481eceb32f259b7d66d8b4006b57cd.png" alt="img2"id="master-right" className="btn-img"/>
      <img src="/{46E2607B-2863-465F-B4DA-A9E761482763}.png" alt="img3" id="amrican-right" className="btn-img"/>
      <img src="/Mada.png" alt="img4" id="Mada-right" className="btn-img-right"/>
    </div>
  </button>

  {/* الزر الثالث */}
  <button className="payment-btn" id="payment-btn-3">
    <div className="btn-left">
      <span>Payment buttons</span>
    </div>
    <div className="btn-right">
      <img src="/Google.png" alt="img1" id="Google"  className="btn-img"/>
      <img src="/Apple-Pay.png" alt="img2" id="Apple" className="btn-img"/>
    </div>
  </button>
  {/* زر إتمام الدفع */}
<button className="confirm-payment-btn">
  <i className="fa fa-lock"></i>
  Confirm Payment
</button>
</div>
</div>
 {/* محتوى  على اليمين */}
  <div className="payment-content-right">
      {/* الصور الصغيرة */}
  <div className="payment-small-images">
    <img src="/11ccfbb92bce0438587dbb54abfb81cd.png" id="visa" alt="1" />
    <img src="/4c481eceb32f259b7d66d8b4006b57cd.png" alt="2"id="master" />
    <img src="/{46E2607B-2863-465F-B4DA-A9E761482763}.png"  id="amrican"alt="3" />
    <img src="/Mada.png" alt="4"id="Mada" />
  </div>

  {/* ادخال بينات الكارد*/}
  <div className="payment-card-form33">
  <div className="input-row33">
    <div className="input-group33">
      <input type="text" id="fullName" placeholder="Your Full Name" />
    </div>
    <div className="input-group33">
      <input type="text" id="cardNumber" placeholder="Card Number" />
    </div>
  </div>

  <div className="input-row33">
    <div className="input-group33">
      <input type="text" id="expireDate" placeholder="MM/YY" />
    </div>
    <div className="input-group33">
      <input type="text" id="cvc" placeholder="CVC" />
    </div>
  </div>
</div>

    <img 
    src="/upscalemedia-transformed (1).png" 
    alt="payment visual"
    className="payment-side-img"
  />
  </div>
</div>
{/* توقيع الشركة أسفل البوكس */}
<div className="payment-footer-brand">
  <img src="/removed.png" alt="Family Group" />
  <span>Family Group – Web & Software Development</span>
</div>
</div>
</div>
)}


   {/* نسخة  الموبايل صفحه الدفع*/}
{Payment && isMobile && (
  <div className="payment-page-mopil" ref={PaymentRef}>

    <div className="payment-bg-section">

      <button
        className="back-to-checkout-mopil"
        onClick={() => {
          if (PaymentRef.current) {
            gsap.to(PaymentRef.current, {
              x: "-100%",
              opacity: 0,
              duration: 0.5,
              ease: "power3.in",
              onComplete: () => {
                setPayment(false);
                setModalType("checkout");
              },
            });
          }
        }}
      >
        <i className="fa fa-arrow-left"></i> Back
      </button>

      <div className="payment-image-wrapper-mopil">
            {/* الصور الصغيرة */}
  <div className="payment-small-images-mopil">
    <img src="/11ccfbb92bce0438587dbb54abfb81cd.png" id="visa-mopil" alt="1" />
    <img src="/4c481eceb32f259b7d66d8b4006b57cd.png" alt="2"id="master-mopil" />
    <img src="/{46E2607B-2863-465F-B4DA-A9E761482763}.png"  id="amrican-mopil"alt="3" />
    <img src="/Mada.png" alt="4"id="Mada-mopil" />
  </div>

<div className="payment-top-mopil">
  <h2>Hello {formData.fullName ? formData.fullName.split(' ')[0] : "Guest"}</h2>
</div>

<div className="payment-bottom-mopil">
  <span className="payment-label">Total:</span>
  <span className="total-amount">${totalPrice}</span>
</div>
        <img 
          src="/upscalemedia-transformed (1).png" 
          alt="payment visual"
          className="payment-side-img-mopil"
        />    
      </div>
    </div>



    {/* خيارات الدفع */}
     <div className="payment-content-mopil">
<div className="payment-methods-mopil">
  <div className="payment-method-mopil">
    <img src="/toppng-paypal.png" alt="PayPal" />
  </div>
  <div className="payment-method-mopil">
    <img src="/Apple-Pay.png" alt="Apple Pay" />
  </div>
  <div className="payment-method-mopil">
    <img src="/Google.png" alt="Google Pay" />
  </div>
</div>

{/* الفورم */}
<div className="payment-form-mopil">

  <input 
    type="text"
    placeholder="Your Full Name"
    className="payment-input-mopil"
  />

  <input 
    type="text"
    placeholder="Card Number"
    className="payment-input-mopil"
  />

  <div className="payment-row-mopil">
    <input 
      type="text"
      placeholder="MM/YY"
      className="payment-input-mopil half"
    />
    <input 
      type="text"
      placeholder="CVC"
      className="payment-input-mopil half"
    />
  </div>

  <button className="confirm-payment-btn-mopil"> 
    <i className="fa fa-lock" id="lock-icon-mopil"></i>
    Confirm Payment
  </button>

</div>
</div>
  </div>
)}






























      {/* ===== Header أعلى الصفحة ===== */}
      <div className="cart-header" ref={headerRef}>
        <button className="continue-shopping" onClick={() => {
              new Audio("/ui-authorised-243460.mp3").play(); // صوت زر التسوق
              handleContinueShopping(); // دالة الانتقال
        }}
>
          <i className="fa-solid fa-arrow-left"></i>
          <span>Continue Shopping</span>
        </button>
        <div className="cart-title">
          <span className="cart-icon">🛒</span>
          <h1>Shopping Cart</h1>
        </div>
      </div>

      {/* Subtitle تحت الهيدر */}
    <p className="cart-subtitle" ref={subtitleRef}>
  {Object.keys(cartItems).length > 0 
    ? "Review your items before completing your purchase" 
    : "Your cart is empty – start shopping now!"}
</p>


      {/* ===== محتوى الصفحة ===== */}
      <div className="cart-content">

{/* العمود الشمال: المنتجات */}
<div className="cart-products">

  {Object.keys(cartItems).length > 0 ? ( 
    // ✅ لو فيه منتجات في الكارت

    Object.values(cartItems).map((item) => ( 
      // نكرر على كل منتج داخل cartItems
      <div 
        className="product-card"                // كلاس الكارت
        key={item.id}                           // مفتاح React الفريد
        ref={(el) => (productsRef.current[item.id] = el)} 
        // 🔑 تم ربط المرجع بالـ id لضمان تحديد كل عنصر بدقة للأنيميشن
      >

        <i
          className="fas fa-times"              // أيقونة الحذف
          onClick={() => {                     // لما نضغط حذف
            const card = productsRef.current[item.id]; 
            // نجيب الكارت الحالي

            gsap.to(card, {                    // أنيميشن الحذف
              x: 200,                          // يتحرك يمين
              opacity: 0,                      // يختفي تدريجياً
              scale: 0.8,                      // يصغر شوية
              duration: 0.5,                  // زمن الأنيميشن
              ease: "power2.inOut",            // نوع الحركة
              onComplete: () => {              // بعد ما الأنيميشن يخلص
                setCartItems(prev => {         // نحدّث الـ state
                  const updatedCart = { ...prev }; 
                  delete updatedCart[item.id]; 
                  // نحذف المنتج من الكارت
                  localStorage.setItem("cart", JSON.stringify(updatedCart)); 
                  // نحدث localStorage
                  return updatedCart; 
                  // نرجع الكارت الجديد
                });
              }
            });
          }}
        ></i>

        <img
          src={item.images}                    // صورة المنتج
          alt={item.productTitles}            // عنوان للصورة
          className="product-image33"           // كلاس الصورة
          style={{
            backgroundSize: "50% auto, cover",
            backgroundPosition: "center, center",
            backgroundRepeat: "no-repeat, no-repeat",
          }}
        />

        <div className="product-info1">         {/* معلومات المنتج */}
          <h3 className="Address">{item.productTitles}</h3> 
          {/* اسم المنتج */}

          <h3 className="quantity">{item.quantity}</h3> 
          {/* كمية المنتج */}

          <div className="product-right">
            <p className="product-price">${item.total}</p> 
            {/* السعر الكلي */}

            <div className="quantity-controls">
              <button
                onClick={() => {
                  new Audio("/zapsplat_multimedia_button_click_bright_002_92099.mp3").play(); // صوت كليك
                  handleQuantityChange(item.id, -1);
                  // نقص الكمية
                }}
              >
                -
              </button>

              <button
                onClick={() => {
                  new Audio("/zapsplat_multimedia_button_click_bright_002_92099.mp3").play(); // صوت كليك
                  handleQuantityChange(item.id, +1);
                  // زود الكمية
                }}
              >
                +
              </button>
            </div>

          </div>
        </div>

      </div>
    ))

  ) : (
    // ❌ لو مفيش منتجات في الكارت

  <div className="empty-cart"ref={imgRef}>
  <img 
    src="/slazzer-preview-1j141.png" 
    
    alt="Empty Cart"
       className="empty-cart-img"  // نحتفظ بالكلاس عشان الـ CSS يشتغل
    draggable={false}              // منع سحب الصورة
  />
</div>
  )}

</div>


        {/* العمود اليمين: ملخص الطلب */}
        <div className="cart-summary" ref={summaryRef}>
          <h2>Order Summary</h2>

          {Object.values(cartItems).map(item => (
            <div className="summary-row" key={item.id}>
              <span className="Address-summary">{item.productTitles}</span>
              <span className="price-summary">${item.total}</span>
            </div>
          ))}

          <hr />
          <div className="summary-total">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
<button 
  className="checkout-btn"
  onClick={() => {
    if (Object.keys(cartItems).length === 0) {
      setModalType("empty");   // اعرض رسالة السلة الفارغة
      new Audio("/ui-authorised-243460.mp3").play(); // صوت تحذير
    } else {
      setModalType("checkout");    // افتح checkout الطبيعي
    }
  }}
>
  Complete Payment
</button>




          <p className="secure-text">🔒 Secure & Encrypted Payment</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;