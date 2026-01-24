import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
function Header({ iconColor, headerShadow, iconShadow,buttonColors,buttonTextColors ,cartCount,setCartCount,deleteCookie}) {
   const navigate = useNavigate(); 
 

  const [showUserBox, setShowUserBox] = useState(false);
  const [modalType, setModalType] = useState("main"); 

  const headerRef = useRef(null);
  const cartRef = useRef(null);
  const userRef = useRef(null);
  const modalRef = useRef(null);
const handleBackToMain = (e) => {
  e.preventDefault();
  setModalType("main");
};
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // أنميشن الهيدر والأيقونات عند تحميل الصفحة
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    gsap.fromTo(
      [cartRef.current, userRef.current],
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
    );
  }, []);

  // أنميشن ظهور واختفاء الـ modal
  useEffect(() => {
    if (showUserBox && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [showUserBox]);

  const handleToggle = () => {
    if (showUserBox && modalRef.current) {
      gsap.to(modalRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
        onComplete: () => setShowUserBox(false)
      });
    } else {
      setModalType("main"); // افتراضياً main
      setShowUserBox(true);
    }
  };

  // دالة لفتح modal "Create Account"
  const handleCreateAccount = () => {
    setModalType("account");
    if (!showUserBox) setShowUserBox(true);
  };
  useEffect(() => {
  if (modalRef.current) {
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
    );
  };
}, [modalType]);
const handleForgotPassword = (e) => {
  e.preventDefault();
  setModalType("forgot");
};



  return (
    
    <>
    
      <div className="header-container" ref={headerRef}
        style={{
             boxShadow: windowWidth > 1024 ? headerShadow : "none",
       }}>
         <i className="fas fa-shopping-cart cart-icon" ref={cartRef}
         style={{color:iconColor  ,textShadow: iconShadow}} 
          onClick={() =>{
             deleteCookie("cartCount"); // 🧹 نمسح الكوكي
             setCartCount(0); 
             navigate("/cart")}

             }></i>
        
        
  {cartCount > 0 && (
    <span
      className="cart-badge"
      style={{
        backgroundColor: buttonColors,
        color: buttonTextColors,
      }}
    >
      {cartCount}
    </span>
  )}
         <i 
        style={{ color:iconColor, textShadow: iconShadow}}
          className="fas fa-user user-icon"
          ref={userRef}
          onClick={handleToggle}
        ></i>
        
      </div>

      {showUserBox && (
        <div className="user-modal" ref={modalRef}>
          {modalType === "main" ? (
  <>
    <h1 className="modal-title">Main Store</h1>
    <p className="modal-subtitle">Own Your Store Now</p>

    <form className="modal-form">
      <input type="email" placeholder="Email" className="modal-input" />
      <input type="password" placeholder="Password" className="modal-input" />
      <input type="text" placeholder="Domain" className="modal-input" />

      <div className="modal-links">
        <a href="#">Login with Email</a>
        <a href="#" onClick={handleCreateAccount}>Own an Account</a>
      </div>

      <button type="submit" className="modal-submit">Submit</button>
    </form>
  </>
) : modalType === "account" ? (
  <>
    <h1 className="modal-title">Welcome!</h1>
    <p className="modal-subtitle">Back to your store</p>

    <form className="modal-form">
      <input type="email" placeholder="Email" className="modal-input" />
      <input type="password" placeholder="Password" className="modal-input" />

      <div className="modal-links">
        <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
        <a href="#" onClick={handleBackToMain}>Create New Account</a>
      </div>

      <button type="submit" className="modal-submit">Submit</button>
    </form>
  </>
) : (
  /* 🔑 Forgot Password */
  <>
    <h1 className="modal-title">Forgot Password</h1>
    <p className="modal-subtitle">Enter your email to reset password</p>

    <form className="modal-form">
      <input type="email" placeholder="Email" className="modal-input" />

      <div className="modal-links">
        <a href="#" onClick={handleBackToMain}>Create New Account</a>
      </div>

      <button type="submit" className="modal-submit">
        Reset Password
      </button>
    </form>
  </>
)}
        </div>
      )}
    </>
  );
}


export default Header;
