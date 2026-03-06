import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Main from "./main.jsx";
import "./home.css";
function Home({ scrollIndex, setScrollIndex, products,Quantities, setQuantities,handleAddToCart  }) {
  const leftBoxRef = useRef(null);
  const centerBoxRef = useRef(null);
  const rightBoxRef = useRef(null);
  const titleRef = useRef(null); // مرجع العنوان
  const descRef = useRef(null);  // مرجع الوصف
  const priceRef = useRef(null); // مرجع السعر
  const scrollButtonsRef = useRef(null);
  const prevIndex = useRef(scrollIndex);


useEffect(() => {
  const img = centerBoxRef.current?.querySelector("img");
  if (!img) return;

  gsap.set(img, { x: 0, y: 0, opacity: 1 });
}, []);


  // ===== Animation عند تحميل الصفحة =====
  useEffect(() => {
    let mm = gsap.matchMedia();

    // ===== شاشات صغيرة ≤1024px =====
    mm.add("(max-width: 1024px)", () => {
      const tl = gsap.timeline({ defaults: { duration: 3, ease: "power2.out" } });

      tl.fromTo(leftBoxRef.current, { x: -200, opacity: 0 }, { x: 0, opacity: 1 });
      tl.fromTo(centerBoxRef.current, { y: 200, opacity: 0 }, { y: 0, opacity: 1 }, "<");
      tl.fromTo(
        rightBoxRef.current.children,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1 },
        "<"
      );

      return () => tl.kill();
    });

    // ===== شاشات كبيرة >1024px =====
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({ defaults: { duration: 2, ease: "power2.out" } });

      tl.fromTo(leftBoxRef.current, { x: -200, opacity: 0 }, { x: 0, opacity: 1 });
      tl.fromTo(centerBoxRef.current, { y: 200 , opacity: 0 }, { y: 0 ,opacity: 1 }, "<");
      tl.fromTo(
        rightBoxRef.current.children,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1 },
        "<"
      );

      return () => tl.kill();
    });

    return () => mm.revert();
  }, []);




// ===== scroll + scale =====// دالة التعامل مع الضغط على الصناديق اليمنى
const handleBoxClick = (index) => { // دالة التعامل مع الضغط على الصناديق اليمنى
  const container = rightBoxRef.current; // الحصول على حاوية الصناديق اليمنى
  if (!container) return; // إذا الحاوية غير موجودة، اخرج من الدالة

  const children = container.children; // جميع الصناديق الصغيرة داخل الحاوية
  const boxHeight = children[0].offsetHeight; // ارتفاع كل صندوق
  const boxWidth = children[0].offsetWidth;   // عرض كل صندوق

  const screenWidth = window.innerWidth; // عرض الشاشة الحالي

  if (screenWidth <= 1024) { // إذا الشاشة صغيرة (موبايل / تابليت)
    const newIndex = index; // الفهرس الجديد للصندوق الذي تم الضغط عليه
    const prevIndex = scrollIndex; // حفظ الفهرس الحالي قبل التغيير

    setScrollIndex(newIndex); // تحديث الفهرس الحالي

    // رقمين مختلفين لتصحيح موقع الحاوية قليلاً أثناء الحركة
    const forwardOffset = 40; // offset عند التمرير للأمام
    const backOffset = -50;   // offset عند التمرير للوراء

    const isForward = newIndex > prevIndex; // تحديد اتجاه الحركة (أمام أو خلف)

    gsap.to(container, { // تحريك الحاوية أفقياً
      x: -newIndex * boxWidth + (isForward ? forwardOffset : -backOffset), // حساب الإزاحة
      duration: 0.5, // مدة التحريك نصف ثانية
      ease: "power3.out", // نوع easing للتحريك بسلاسة
    });

    Array.from(children).forEach((child, i) => { // تعديل حجم كل صندوق
      gsap.to(child, { 
        scale: i === newIndex ? 1 : 0.9, // تكبير الصندوق الحالي وتصغير الباقي
        duration: 0.4, // مدة التحريك
        ease: "power2.out", // نوع easing لتأثير سلس
      });
    });
    return; // الخروج بعد تنفيذ التحريك الأفقي للشاشات الصغيرة
  }



  // ===== شاشات كبيرة → scroll عمودي + scale ثابت =====
let newIndex = scrollIndex; // تعيين الفهرس الجديد مبدئيًا إلى الفهرس الحالي

if (index !== undefined) { // إذا تم تمرير فهرس جديد عند الضغط
  const maxIndex = children.length - 1; // آخر فهرس مسموح به بناءً على عدد الصناديق

  if (index < 0 || index > maxIndex) { 
    return; // ❌ منع التمرير إذا كان الفهرس خارج الحدود
  }

  newIndex = index; // تحديث الفهرس الجديد بالقيمة المطلوبة
}

// إعادة العنصر السابق للوضع الطبيعي (تصغيره إذا كان مكبر)
if (scrollIndex !== newIndex) {
  gsap.to(children[scrollIndex], { scale: 1, duration: 1, ease: "power3.out" }); 
  // تصغير العنصر القديم إلى حجمه الطبيعي (scale = 1) بسلاسة
}

setScrollIndex(newIndex); // تحديث الـ state للفهرس الحالي

// تحريك الحاوية عموديًا لموضع العنصر الجديد
gsap.fromTo(
  container, // الحاوية
  { y: -scrollIndex * boxHeight }, // الوضع الابتدائي: تحريك الحاوية حسب الفهرس القديم
  { y: -newIndex * boxHeight, duration: 1, ease: "power3.out" } // الوضع النهائي: تحريك الحاوية للفهرس الجديد
);

// تكبير العنصر الحالي فقط
gsap.to(children[newIndex], { scale: 1.2, duration: 1, ease: "power3.out" }); 
// العنصر المختار يتم تكبيره لإبراز التركيز عليه
};


  // ===== إعادة الحاوية اليمين+ البوكسات للوضع الطبيعي عند resize =====
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 1024px)", () => {
      const container = rightBoxRef.current;
      if (container) {
        gsap.to(container, { x: 0, duration: 0.5, ease: "power3.out" });
        Array.from(container.children).forEach((child) => {
          gsap.to(child, { scale: 1, duration: 0.5, ease: "power3.out" });
        });
      }
      
    });

    mm.add("(min-width: 1024px)", () => {
      const container = rightBoxRef.current;
      if (container) {
        gsap.to(container, { y: 0, duration: 0.5, ease: "power3.out" });
        Array.from(container.children).forEach((child) => {
          gsap.to(child, { scale: 1, duration: 0.5, ease: "power3.out" });
        });
      }
   
    });

    return () => mm.revert();
  }, []);


//اسكرول الصوره
useEffect(() => { //
  const img = centerBoxRef.current; // الحصول على الصورة
  if (!img) return;

  // ❌ إذا scrollIndex نفسه السابق → هذا يعني أول تحميل → لا تنفذ أنيميشن
  if (scrollIndex === prevIndex.current) return;

  const direction = scrollIndex > prevIndex.current ? "forward" : "backward"; 
  const fromX = direction === "forward" ? -300 : 300; 

  gsap.fromTo(
    img, // العنصر المراد تحريكه
    { x: fromX, opacity: 0 }, // البداية: تحت + خارج الشاشة أفقيًا
    { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" } // النهاية
  );

  prevIndex.current = scrollIndex; // تحديث المرجع السابق
}, [scrollIndex]);


//تدرج باك جراوند ابيض او اسود
//تدرج باك جراوند حسب كل منتج
useEffect(() => {
  if (!products[scrollIndex]?.backgrounds) return;

  // نستخدم التدرج الموجود في كل منتج
  const gradient = products[scrollIndex].backgroundshadow;

  gsap.to(document.body, {
    background: `${gradient}, ${products[scrollIndex].backgrounds}`,
    duration: 0.6,
    ease: "power2.out",
  });
}, [scrollIndex]);


// انميشن text
useEffect(() => {
  if (!titleRef.current || !descRef.current) return;

  // Timeline جديد عند كل scroll
  const tl = gsap.timeline();

  // إعادة تعيين
  tl.set([titleRef.current, descRef.current], { opacity: 0 });

  // أنيميشن العنوان
  tl.fromTo(
    titleRef.current,
    {
      y: -40,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    }
  );

  // أنيميشن الوصف (بعد العنوان)
  tl.fromTo(
    descRef.current,
    {
      y: -30,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    },
    "-=0.3" // تداخل خفيف
  );

}, [scrollIndex]);


//انميشن السعر
useEffect(() => {
  const price = priceRef.current; // الحصول على عنصر السعر من المرجع
  if (!price) return; // إذا العنصر غير موجود، اخرج من الـ useEffect

  gsap.fromTo(
    price, // العنصر الذي سيتم تحريكه
    { y: -50, opacity: 0 }, // الحالة الابتدائية: مخفي أعلى الصفحة (y = -50) وشفافيته 0
    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" } // الحالة النهائية: مكانه الطبيعي، مرئي، مدة الأنيميشن 0.8 ثانية، easing سلس
  );
}, [scrollIndex]); // يعتمد على scrollIndex → يتنفذ كل مرة يتغير الفهرس



//انميشن لون الاسكرول
useEffect(() => {
  // حماية
  if (!products[scrollIndex].backgrounds || !products[scrollIndex].buttonColors) return;

  // لون مسار الاسكرول (الخلفية)
  document.documentElement.style.setProperty(
    "--scroll-track",
    products[scrollIndex].backgrounds
  );

  // لون الاسكرول نفسه
  document.documentElement.style.setProperty(
    "--scroll-thumb",
    products[scrollIndex].buttonColors
  );
}, [scrollIndex]);




//لو على ديسكتوب → الأزرار تظهر ويقدر المستخدم يضغط عليهم.
//لو على موبايل → الأزرار تختفي وما ينفعش يضغط عليها.
useEffect(() => {
  const el = scrollButtonsRef.current; // الحصول على عنصر أزرار التمرير من المرجع
  if (!el) return; // إذا العنصر غير موجود، اخرج من الـ useEffect

  const mm = gsap.matchMedia(); // إنشاء matchMedia للتحكم في الأنيميشن حسب حجم الشاشة

  // 🖥 شاشات كبيرة
  mm.add("(min-width: 1024px)", () => {
    gsap.to(el, {
      opacity: 1, // جعل العنصر ظاهر
      y: 0,      // وضعه الطبيعي على المحور الرأسي
      duration: 0.6, // مدة الأنيميشن 0.6 ثانية
      ease: "power3.out", // easing سلس
      onStart: () => {
        el.style.pointerEvents = "auto"; // تفعيل إمكانية الضغط على الأزرار
      },
    });
  });

  // 📱 شاشات صغيرة
  mm.add("(max-width: 1024px)", () => {
    gsap.to(el, {
      opacity: 0, // جعل العنصر مخفي
      y: 20,      // تحريكه لأسفل قليلاً
      duration: 0.4, // مدة الأنيميشن 0.4 ثانية
      ease: "power2.in", // easing للحركة السلسة
      onComplete: () => {
        el.style.pointerEvents = "none"; // تعطيل الضغط على الأزرار بعد الأنيميشن
      },
    });
  });

  return () => mm.revert(); // عند إزالة الـ component → إعادة إعدادات matchMedia القديمة
}, []); // يتم تشغيل الـ useEffect مرة واحدة عند تحميل الصفحة فقط




// انميشن add-to-cart
 const textRef = useRef(null);
  const iconRef = useRef(null);
  const buttonRef = useRef(null);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // عند الضغط على الزر
  const handleClickAnimation = () => {
  if (isAnimating) return; // ❌ امنع أي ضغط أثناء الأنيميشن

  setIsAnimating(true);
  setTriggerAnimation(true);

  // هنقفل التريجر بعد مدة الأنيميشن
  setTimeout(() => {
    setTriggerAnimation(false);
    setIsAnimating(false); // ✅ نسمح بالضغط تاني
  }, 2000); // نفس مدة الـ GSAP تقريبًا
};
          
  useEffect(() => {
    if (!triggerAnimation) return; // لو مش مضغوط، لا نفعل شيء

     const tl = gsap.timeline({
    onComplete: () => {
      setTriggerAnimation(false);
      setIsAnimating(false); // ✅ نسمح بالضغط تاني
    }
  });

    // 1️⃣ نبض سريع + تكبير خفيف للزر كله
    tl.to(buttonRef.current, {
      duration: 1,
      scale: 1.05,          
     boxShadow: `0 22px 40px ${products[scrollIndex].buttonColors}`,

      ease: "power1.inOut",
      repeat: 1,
      yoyo: true,
    }, 0);

    // 2️⃣ تكبير النص و slight jump
    tl.to(textRef.current, {
      duration: 1,
      scale: 1.3,
      y: -10,
      ease: "back.out(2)",
      repeat: 1,
      yoyo: true,
    }, 0);

    // 3️⃣ أيقونة تدور وتكبر شوي مع lift
    tl.to(iconRef.current, {
      duration: 1,
      rotate: 360,
      scale: 1.4,
      x: -20,
      y: -12,
      ease: "power2.out",
      repeat: 1,
      yoyo: true,
    }, 0);

  

  }, [triggerAnimation]);








useEffect(() => {
  // 1. تنظيف أي كلاسات قديمة من صفحات أخرى
  document.body.classList.remove("cart-page", "other-page", "dashboard-active");
  document.documentElement.classList.remove("cart-page", "other-page", "dashboard-active");

  // 2. إضافة كلاس الهوم
  document.body.classList.add("home");
  document.documentElement.classList.add("home");

  return () => {
    // 3. تنظيف الهوم عند الانتقال لأي صفحة أخرى
    document.body.classList.remove("home");
    document.documentElement.classList.remove("home");
  };
}, []);


const currentProduct = products[scrollIndex];
const quantity = Quantities[currentProduct.id] || 1;



return (
    <div className="home">
      <div className="bottom-section">
      
        {/* Left Box */}
         <div
           className="left-box"
            ref={leftBoxRef}
            style={{ boxShadow: products[scrollIndex].leftshadow }}
          >
           <div className="left-box-content33">

            <div className="left-box-text33">
            {/* العنوان */}
            <div
                className="product-title33"
                style={{ color: products[scrollIndex].textColors.title }}
                ref={titleRef}
             >
              {products[scrollIndex].productTitles}
             </div>

             {/* الوصف */}
               <div
                  className="product-description33"
                  style={{ color: products[scrollIndex].textColors.description }}
                  ref={descRef}
                >
                {products[scrollIndex].productDescriptions}
               </div>
              </div>



          <div className="left-box-price33">
              {/* السعر */}
              <div
                  className="price33"
                  ref={priceRef}
                  style={{ color: currentProduct.textColors.title }}
               >
               ${currentProduct.price * quantity}
              </div>


               {/* الكونتر */}
                 <div className="quantity-counter33">

                <button 
                      style={{
                      backgroundColor: currentProduct.buttonColors,
                      color: currentProduct.buttonTextColors,
                }}
                    onClick={() => {
    // إنشاء وتشغيل الصوت مباشرة عند الضغط
    new Audio("/zapsplat_multimedia_button_click_bright_002_92099.mp3").play().catch(err => {
      console.log("Error playing sound:", err);
    });

    setQuantities(prev => ({
      ...prev,
      [currentProduct.id]: Math.max(1, (prev[currentProduct.id] || 1) - 1),
    }));
  }}
>
                   -
                </button>

                <span
                     className="quantity33"
                     style={{ color: currentProduct.textColors.title }}
                 >
                      {Quantities[currentProduct.id] || 1}
                     </span>

                    <button
                      style={{
                       backgroundColor: currentProduct.buttonColors,
                       color: currentProduct.buttonTextColors,
                    }}
                       onClick={() => {
    new Audio("/zapsplat_multimedia_button_click_bright_002_92099.mp3").play().catch(err => {
      console.log("Error playing sound:", err);
    });

    setQuantities(prev => ({
      ...prev,
      [currentProduct.id]: (prev[currentProduct.id] || 1) + 1,
    }));
  }}
>
                    +
                  </button>

               </div>
 
             {/* زر الإضافة */}
                  <div className="add-to-cart33">
                  <button ref={buttonRef}
                    style={{
                    backgroundColor: currentProduct.buttonColors,
                    color: currentProduct.buttonTextColors,
                  }}
                     onClick={() => {
      handleAddToCart(currentProduct.id); // إضافة المنتج للـ cart في localStorage
      handleClickAnimation();             // تشغيل الانيميشن
      
      // 🔊 تشغيل الصوت
      const audio = new Audio("/coin-and-money-bag-7-185268.mp3"); // من public
      audio.volume = 1; // ضبط مستوى الصوت (0.0 - 1.0)
      audio.play().catch(err => console.log("Error playing sound:", err)); // التعامل مع أي خطأ
    }}
               >
                 <i className="fas fa-shopping-cart" ref={iconRef}></i>
                <span ref={textRef}>Add Cart</span>
                 </button>
           </div>
         </div>
       </div>
       </div>

       {/* Center Box */}
      <div className="center-box" >
         <img
         ref={centerBoxRef}
           
            src={Array.isArray(products[scrollIndex]?.images) ? products[scrollIndex].images[0] : products[scrollIndex]?.images}
            alt="Product"
            className="center-image"
           />
        </div>


      {/* Right Boxes */}
        <div className="right-box-wrapper">
          {/* أزرار التحكم تظهر فقط للشاشات الكبيرة */}
          {window.innerWidth > 1024 && (
            <div className="scroll-buttons"  ref={scrollButtonsRef}>
              <button className="scroll-btn left-btn" 
               style={{
    backgroundColor: products[scrollIndex].buttonColors,
    color: products[scrollIndex].buttonTextColors,
  }}
              onClick={() => {
    new Audio("/ui-authorised-243460.mp3").play(); // تشغيل الصوت مباشرة
    handleBoxClick(scrollIndex - 1);        // تحريك البوكس
  }}
>
                ◀
              </button>
              <button className="scroll-btn right-btn" 
                style={{
    backgroundColor: products[scrollIndex].buttonColors,
    color: products[scrollIndex].buttonTextColors,
  }}
             onClick={() => {
    new Audio("/ui-authorised-243460.mp3").play(); // تشغيل الصوت مباشرة
    handleBoxClick(scrollIndex + 1);        // تحريك البوكس
  }}
>
                ▶
              </button>
            </div>
          )}
<div className="right-box" ref={rightBoxRef}>
  {products.map((product, pIndex) => (
    product.images.map((img, i) => (
      <div
        key={`${pIndex}-${i}`}
        className="small-box"
        onClick={() =>{
           new Audio("/ui-authorised-243460.mp3").play();
           handleBoxClick(pIndex)
          }}
        style={{
          backgroundColor: product.backgrounds,
          backgroundImage: `url(${img}), ${product.backgroundshadow}`,
          backgroundSize: "60% auto, cover",
          backgroundPosition: "center, center",
          backgroundRepeat: "no-repeat, no-repeat",
        }}
      />
    ))
  ))}
</div>


    <div className="bottom-line"
           style={{
    backgroundColor: products[scrollIndex].buttonColors,
    
  }}></div>
        </div>
      </div>
     
    </div>
    
  );
  
}

export default Home;
