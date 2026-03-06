import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

function Header({ iconColor, headerShadow, iconShadow, buttonColors, buttonTextColors, cartCount, setCartCount, deleteCookie, products, scrollIndex }) {
    const navigate = useNavigate();
    const headerRef = useRef(null);
    const cartRef = useRef(null);
    const userRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const clickSound = useRef(new Audio("/correct-356013.mp3"));

    // تحديث عرض الشاشة عند تغيير حجم المتصفح
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // أنميشن دخول الهيدر عند تحميل الصفحة
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

    // الوظيفة المسؤولة عن الذهاب للداشبورد مباشرة
    const handleUserClick = () => {
        // إذا كنت تحتاج لوجود بيانات وهمية لتعمل الداشبورد بشكل صحيح
        localStorage.setItem("user_logged_in", "true");
        
        // الانتقال الفوري للداشبورد
        navigate("/dashboard");
    };

    return (
        <>
            <div className="header-container" ref={headerRef}
                style={{ boxShadow: windowWidth > 1024 ? headerShadow : "none" }}>
                
                {/* أيقونة العربة */}
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <i className="fas fa-shopping-cart cart-icon" ref={cartRef}
                        style={{ color: iconColor, textShadow: iconShadow }}
                        onClick={() => {
                            deleteCookie("cartCount");
                            setCartCount(0);
                            navigate("/cart");
                            setTimeout(() => {
                                clickSound.current.play().catch(err => console.log("Sound error:", err));
                            }, 400);
                        }}></i>

                    {cartCount > 0 && (
                        <span className="cart-badge"
                            style={{ backgroundColor: buttonColors, color: buttonTextColors }}
                            onClick={() => {
                                deleteCookie("cartCount");
                                setCartCount(0);
                                navigate("/cart");
                            }}>
                            {cartCount}
                        </span>
                    )}
                </div>

                {/* أيقونة المستخدم - تذهب للداشبورد مباشرة */}
                <i
                    className="fas fa-user user-icon"
                    ref={userRef}
                    style={{ color: iconColor, textShadow: iconShadow, cursor: 'pointer' }}
                    onClick={handleUserClick}
                ></i>

            </div>
        </>
    );
}

export default Header;