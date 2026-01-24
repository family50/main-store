import { useEffect, useRef } from "react"; // استيراد useEffect للتعامل مع lifecycle و useRef لتخزين المراجع
import gsap from "gsap"; // استيراد GSAP للأنيميشن
import "./cart.css"; // استيراد تنسيقات CSS
import { useNavigate } from "react-router-dom";

function Cart({ products, setProducts }) {

  const summaryRef = useRef(null); // reference لملخص الطلب
  const headerRef = useRef(null); // reference للهيدر
  const subtitleRef = useRef(null); // reference للـ subtitle
  const productsRef = useRef([]); // مصفوفة لتخزين كل كارت منتج
 const navigate = useNavigate(); 
   const handleContinueShopping = () => {
  navigate("/");
};

  // هذه الدالة لإضافة عناصر المنتجات إلى المصفوفة
  const addToRefs = (el) => {
    if (el && !productsRef.current.includes(el)) {
      productsRef.current.push(el); // إضافة الكارت إذا لم يكن موجود
    }
  };

  useEffect(() => {
    // إزالة أي كلاس قديم من صفحات أخرى
    document.body.classList.remove("home", "other-page"); 
    document.documentElement.classList.remove("home", "other-page");

    // إضافة كلاس خاص بعربة التسوق للـ body و html
    document.body.classList.add("cart-container");
    document.documentElement.classList.add("cart-container");

    // ===== أنيميشن GSAP لجميع العناصر عند دخول الصفحة =====

    // أنيميشن ملخص الطلب (من الأسفل fade + slide)
    gsap.fromTo(
      summaryRef.current,
      { y: 200, opacity: 0 }, // البداية: تحت الشاشة وشفاف
      { y: 0, opacity: 1, duration: 2, ease: "power3.out", delay: 0.5 } // النهاية: مكانه الطبيعي
    );

    // أنيميشن الهيدر (fade + slide من أعلى)
    gsap.fromTo(
      headerRef.current,
      { y: -50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    // أنيميشن الـ subtitle بعد الهيدر
    gsap.fromTo(
      subtitleRef.current,
      { y: -20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 3, ease: "power3.out", delay: 0.3 }
    );

    // أنيميشن المنتجات واحدة تلو الأخرى (stagger)
    gsap.fromTo(
      productsRef.current,
      { x: -50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 3, ease: "power3.out", stagger: 0.2, delay: 0.5 }
    );

    // Cleanup: إزالة الكلاس عند الخروج من الصفحة
    return () => {
      document.body.classList.remove("cart-container");
      document.documentElement.classList.remove("cart-container");
    };
  }, []);

   useEffect(() => {
    // إزالة أي كلاس قديم من صفحات أخرى
    document.body.classList.remove("home", "other-page");
    document.documentElement.classList.remove("home", "other-page");

    // إضافة كلاس cart-page للـ body و html
    document.body.classList.add("cart-container");
    document.documentElement.classList.add("cart-container");

    // Cleanup: إزالة الكلاس عند الخروج من الصفحة
    return () => {
      document.body.classList.remove("cart-container");
      document.documentElement.classList.remove("cart-container");
    };
  }, []); // تنفيذ مرة واحدة عند تحميل الصفحة
  
  
  return (
    <div className="cart-container">

      {/* ===== Header أعلى الصفحة ===== */}
      <div className="cart-header" ref={headerRef}>
        {/* زر تصفح المزيد (يسار) */}
        <button className="continue-shopping" onClick={handleContinueShopping}>
          <i className="fa-solid fa-arrow-left"></i>
          <span>Continue Shopping</span>
        </button>

        {/* عنوان الصفحة + أيقونة السلة (يمين) */}
        <div className="cart-title">
          <span className="cart-icon">🛒</span>
          <h1>Shopping Cart</h1>
        </div>
      </div>

      {/* Subtitle تحت الهيدر */}
      <p className="cart-subtitle" ref={subtitleRef}>
        Review your items before completing your purchase
      </p>

      {/* ===== محتوى الصفحة ===== */}
      <div className="cart-content">

        {/* ===== العمود الشمال: المنتجات ===== */}
        <div className="cart-products">
           

          {/* كارت منتج واحد (يتكرر) */}
          <div className="product-card" ref={addToRefs}>
             <i className="fas fa-times"></i> {/* Font Awesome icon */}
            {/* صورة المنتج */}
            <img
              src="/14_of_the_Coolest_Cropped_Sweaters_to_Rock_This_Fall-removebg-preview.png"
              alt="product"
              className="product-image"
              style={{
                backgroundSize: "50% auto, cover",
                backgroundPosition: "center, center",
                backgroundRepeat: "no-repeat, no-repeat",
              }}
            />

            {/* تفاصيل المنتج */}
            <div className="product-info">
              <h3 className="Address">Women's hoodie</h3>
              <h3 className="quantity">1</h3>
              <div className="product-right">
                <p className="product-price">$120</p>
                {/* التحكم في الكمية */}
                <div className="quantity-controls">
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
              </div>
            </div>
          </div>
          {/* يمكنك تكرار product-card عدة مرات وستظهر مع stagger */}
        </div>

        {/* ===== العمود اليمين: ملخص الطلب ===== */}
        <div className="cart-summary" ref={summaryRef}>
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span className="Address-summary">Women's hoodie</span>
            <span className="price-summary">$120</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>$120</span>
          </div>

          {/* زر الدفع */}
          <button className="checkout-btn">
            <i className="fa-brands fa-cc-visa checkout-icon"></i>
            Complete Payment
          </button>

          {/* رسالة أمان */}
          <p className="secure-text">🔒 Secure & Encrypted Payment</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
