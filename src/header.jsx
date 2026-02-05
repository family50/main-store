import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
function Header({ iconColor, headerShadow, iconShadow,buttonColors,buttonTextColors ,cartCount,setCartCount,deleteCookie,products,scrollIndex}) {
   const navigate = useNavigate(); 
    const [focusedInput, setFocusedInput] = useState(null);

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
  const currentProduct = products?.[scrollIndex];
const clickSound = useRef(new Audio("/correct-356013.mp3"));


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




const getInputStyle = (name) => ({
  border: focusedInput === name
    ? `2px solid ${products[scrollIndex].backgroundcartCount}`
    : "2px solid #ccc",
  outline: "none"
});




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
             navigate("/cart")
             setTimeout(() => {
      clickSound.current.play().catch(err => console.log("Error playing sound:", err));
     }, 400); // 500 ملي ثانية = نص ثانية
    }
             

         }></i>
        
        
  {cartCount > 0 && (
    <span
      className="cart-badge"
      style={{
        backgroundColor: buttonColors,
        color: buttonTextColors,
      }}
      onClick={() =>{
             deleteCookie("cartCount"); // 🧹 نمسح الكوكي
             setCartCount(0); 
             navigate("/cart")
             setTimeout(() => {
      clickSound.current.play().catch(err => console.log("Error playing sound:", err));
     },100); // 500 ملي ثانية = نص ثانية
            }
             

         }
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

        <div className="user-modal"style={{
         boxShadow: `0 10px 30px ${currentProduct?.cartCountshadow}`
        }} ref={modalRef}>
          {modalType === "main" ? (
  <>

    <h1 className="modal-title"
     style={{ color: currentProduct?.backgroundcartCount}}
    >Main Store</h1>
    <p className="modal-subtitle"
     style={{ color: currentProduct?.backgroundcartCount}}
    >Own Your Store Now</p>

      <form className="modal-form">
      <input
        type="email"
        placeholder="email"
        className="modal-input"
       style={getInputStyle("email")}
        onFocus={() => setFocusedInput("email")}
        onBlur={() => setFocusedInput(null)}
      />

      <input
        type="password"
        placeholder="password"
        className="modal-input"
        style={getInputStyle("password")}
        onFocus={() => setFocusedInput("password")}
        onBlur={() => setFocusedInput(null)}
      />

      <input
        type="text"
        placeholder="domain"
        className="modal-input"
        style={getInputStyle("domain")}
        onFocus={() => setFocusedInput("domain")}
        onBlur={() => setFocusedInput(null)}
      />

      <div className="modal-links" >
        <button type="button" style={{ color: currentProduct?.backgroundcartCount}}>Login with Email</button>
        <button type="button" style={{ color: currentProduct?.backgroundcartCount}}onClick={handleCreateAccount}>Own an Account</button>
      </div>

      <button type="submit"  style={{ color: currentProduct?.backgroundcartCount}} className="modal-submit" >Submit</button>
    </form>
  </>
) : modalType === "account" ? (
  <>
    <h1 className="modal-title"style={{ color: currentProduct?.backgroundcartCount}}>Welcome!</h1>
    <p className="modal-subtitle"style={{ color: currentProduct?.backgroundcartCount}}>Back to your store</p>

    <form className="modal-form">
      <input type="email" placeholder="email" className="modal-input" 
      style={getInputStyle("password")}
        onFocus={() => setFocusedInput("password")}
        onBlur={() => setFocusedInput(null)} />
      <input type="password" placeholder="password" className="modal-input" 
      style={getInputStyle("password")}
        onFocus={() => setFocusedInput("password")}
        onBlur={() => setFocusedInput(null)}/>

      <div className="modal-links">
        <button type="button"style={{ color: currentProduct?.backgroundcartCount}} onClick={handleForgotPassword}>Forgot Password?</button>
        <button type="button" style={{ color: currentProduct?.backgroundcartCount}}onClick={handleBackToMain}>Create New Account</button>
      </div>

      <button type="submit"style={{ color: currentProduct?.backgroundcartCount}} className="modal-submit">Submit</button>
    </form>
  </>
) : (
  /* 🔑 Forgot Password */
  <>
    <h1 className="modal-title"style={{ color: currentProduct?.backgroundcartCount}}>Forgot Password</h1>
    <p className="modal-subtitle"style={{ color:currentProduct?.backgroundcartCount}}>Enter your email to reset password</p>

    <form className="modal-form">
      <input type="email" placeholder="email" className="modal-input"  
      style={getInputStyle("password")}
        onFocus={() => setFocusedInput("password")}
        onBlur={() => setFocusedInput(null)}/>

      <div className="modal-links">
        <button type="button" style={{ color: currentProduct?.backgroundcartCount}}onClick={handleBackToMain}>Create New Account</button>
      </div>

      <button type="submit"style={{ color: currentProduct?.backgroundcartCount}} className="modal-submit" >
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
