import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./dashboard.css";
import "./analytics.css";
import SalesChart from "./SalesChart";
import { translations } from "./translations"; 
import { themes } from "./themes";
import VisitorsVsSalesChart from "./VisitorsVsSalesChart";
import TripleComparisonChart from "./TripleComparisonChart";
import BusinessInsights from "./BusinessInsights";
import Customers from "./Customers";
import "./Prodct.css";
import AddProductPage from "./addProduct";
import { useNavigate } from "react-router-dom";
// تم تغيير اسم "products" هنا إلى "initialProducts" لمنع تضارب الأسماء مع الـ State بالأسفل
function Dashboard({ products, setProducts, language, setLanguage }) {
  // 1. جلب المنتجات من LocalStorage عند البداية
 


// 1. تصحيح الحالة الابتدائية: لو القيمة home أو مش موجودة، افتح dashboard
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem("page");
    return (savedPage === "home" || !savedPage) ? "dashboard" : savedPage;
  });

  // 2. مراقبة الصفحة: لو اتغيرت لـ home بالغلط من أي مكان، رجعها dashboard
  useEffect(() => {
    if (page === "home") {
      
      localStorage.setItem("page", "dashboard");
    }
  }, [page]);

  // 3. تأمين GSAP: التحقق من وجود العنصر قبل تحريكه
  useEffect(() => {
    const headerElement = document.querySelector(".header-center");
    if (!headerElement) return; // اخرج لو العنصر مش موجود عشان الكونسول ميتمليش أخطاء

    if (page === "business") {
      gsap.to(".header-center", { opacity: 0, y: -20, duration: 0.3 });
    } else {
      gsap.to(".header-center", { opacity: 1, y: 0, duration: 0.3 });
    }
  }, [page]);


  const [editingProduct, setEditingProduct] = useState(null);
  const handleEdit = (product) => {
  setEditingProduct(product); // تخزين بيانات المنتج المراد تعديله
  changePage("addProduct");   // الانتقال لصفحة الإضافة
};

  const changePage = (newPage) => {
    setPage(newPage);
    localStorage.setItem("page", newPage);
  };

  const [searchQuery, setSearchQuery] = useState("");

  // تم الاعتماد على language القادمة من Props لمنع خطأ Identifier already declared
  const langKey = language === "ENGLISH" ? "EN" : "AR";
  const t = translations[langKey];

  const [darkIcon, setDarkIcon] = useState(() => {
    return localStorage.getItem("darkIcon") === "true" ? true : false;
  });

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0); 

  const dropdownRef = useRef(null);
  const arrowRef = useRef(null);
  const headerRef = useRef(null);
  // ... في بداية المكون أضف
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [productToDelete, setProductToDelete] = useState(null);

// دالة لفتح المودال
const openDeleteModal = (id) => {
  setProductToDelete(id);
  setShowDeleteModal(true);
};

// دالة الحذف النهائية
const confirmDelete = () => {
  deleteProduct(productToDelete);
  setShowDeleteModal(false);
  setProductToDelete(null);
};

  // تحديث القائمة إذا تم إضافة منتج جديد أو تغير الـ LocalStorage
  useEffect(() => {
    const updateProducts = () => {
      const saved = localStorage.getItem("all_store_products");
      if (saved) setProducts(JSON.parse(saved));
    };

    window.addEventListener("storage", updateProducts); // لمراقبة التغييرات من تبويبات أخرى
    return () => window.removeEventListener("storage", updateProducts);
  }, []);

  // حفظ اللغة واللون عند التغيير
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("darkIcon", darkIcon);
  }, [darkIcon]);




  // GSAP animation لما يفتح / يقفل dropdown
  useEffect(() => {
    if (langDropdownOpen) {
      gsap.to(arrowRef.current, { rotation: 180, duration: 0.3 });
      gsap.fromTo(
        dropdownRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power1.out" }
      );
    } else {
      gsap.to(arrowRef.current, { rotation: 0, duration: 0.3 });
      if (dropdownRef.current)
        gsap.to(dropdownRef.current, { y: -20, opacity: 0, duration: 0.3 });
    }
  }, [langDropdownOpen]);

  // تطبيق الثيم عند التحميل أو عند تغيير darkIcon
  useEffect(() => {
    const theme = darkIcon ? themes.dark : themes.light;
    Object.entries(theme).forEach(([variable, value]) => {
      document.documentElement.style.setProperty(variable, value);
    });
  }, [darkIcon]);

  useEffect(() => {
    if (page === "business") {
      gsap.to(".header-center", { opacity: 0, y: -20, duration: 0.3 });
    } else {
      gsap.to(".header-center", { opacity: 1, y: 0, duration: 0.3 });
    }
  }, [page]);

  useEffect(() => {
    let wasSmallScreen = window.innerWidth <= 1024;

    const runAnimation = () => {
      const tl = gsap.timeline();
      const width = window.innerWidth;
      gsap.set(".header-center", { clearProps: "all" });

      if (width <= 1024) {
        tl.fromTo(
          [".header-right", ".header-left"],
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        ).fromTo(
          ".header-center",
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
          "+=0.02"
        );
      } else {
        tl.fromTo(
          [".header-right", ".header-left"],
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        ).fromTo(
          ".header-center",
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "+=0.02"
        );
      }
    };

    runAnimation();

    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 1024;
      if (isSmallScreen !== wasSmallScreen) {
        gsap.killTweensOf([".header-right", ".header-left", ".header-center"]);
        runAnimation();
        wasSmallScreen = isSmallScreen;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const theme = darkIcon ? themes.dark : themes.light;
    document.body.className = "dashboard-active";
    document.documentElement.className = "dashboard-active";
    document.body.classList.add("dashboard-active");
    document.documentElement.classList.add("dashboard-active");

    Object.entries(theme).forEach(([variable, value]) => {
      document.documentElement.style.setProperty(variable, value);
    });

    const bgColor = theme["--background-main"];
    const textColor = theme["--text-title"];

    if (bgColor) {
      document.body.style.setProperty("background-color", bgColor, "important");
      document.body.style.setProperty("background-image", "none", "important");
      document.body.style.setProperty("background", bgColor, "important");
    }

    if (textColor) {
      document.body.style.setProperty("color", textColor, "important");
    }

    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.backgroundImage = "";
      document.body.style.background = "";
      document.body.style.color = "";
      document.body.classList.remove("dashboard-active");
      document.documentElement.classList.remove("dashboard-active");
    };
  }, [darkIcon]);

  // دالة لحذف منتج من اللوكل استورج وتحديث الواجهة
const deleteProduct = (id) => {
 // 1. جلب المنتجات الحالية وتصفيتها
const savedProducts = JSON.parse(localStorage.getItem("all_store_products") || "[]");
 const updatedProducts = savedProducts.filter(p => p.id !== id);
    
 // 2. تحديث الـ State المحلية للداشبورد فوراً
 setProducts(updatedProducts);
    
 // 3. تحديث الـ LocalStorage
 localStorage.setItem("all_store_products", JSON.stringify(updatedProducts));

 // 4. إرسال "حدث مخصص" لإخبار الصفحات الأخرى (مثل Home) بالتحديث
 window.dispatchEvent(new Event("productsUpdated"));
 };
const navigate = useNavigate();

  return (
    <div className={`dashboard ${language === "ARABIC" ? "rtl" : "ltr"}`}>
      {page === "dashboard" && (
        <>
          <header className="dashboard-header" ref={headerRef}>
            <div className="header-right">
              {/* زر عرض القائمة المنسدلة */}
              <button
                className="language-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              >
                {t.languageBtn}
                <i className="fas fa-chevron-down" ref={arrowRef}></i>
              </button>

              {/* القائمة المنسدلة للغات */}
              {langDropdownOpen && (
                <div className="language-dropdown" ref={dropdownRef}>
                  <div
                    className="language-option"
                    onClick={() => {
                      // التبديل الفعلي للغة
                      const newLang = language === "ENGLISH" ? "ARABIC" : "ENGLISH";
                      setLanguage(newLang);
                      setLangDropdownOpen(false);
                    }}
                  >
                    {t.otherLanguage}
                    <i className="fas fa-globe"></i>
                  </div>
                </div>
              )}
            </div>

            <div className="header-center">
              {t.tabs.map((tabText, index) => {
                const icons = ["fas fa-chart-bar", "fas fa-box"]; 
                return (
                  <div
                    key={index}
                    className={`tab ${activeTab === index ? "active-tab" : ""}`}
                    onClick={() => setActiveTab(index)}
                  >
                    <i className={icons[index]}></i> {tabText}
                  </div>
                );
              })}
            </div>

            <div className="header-left">
              <button
                className="color-toggle-btn"
                onClick={() => setDarkIcon(!darkIcon)}
              >
                {darkIcon ? (
                  <i className="fas fa-moon" style={{ color: "#d9dee1" }}></i>
                ) : (
                  <i className="fas fa-sun" style={{ color: "#1a1a1a" }}></i>
                )}
              </button>
            </div>
          </header>

          <div className="tab-content">
            {activeTab === 0 && (
              <div className="analytics-page">
                <h1 className="analytics-title">
                  📊 {t.charts.dashboardTitle}
                </h1>
                <div className="analytics-grid">
                  <div className="chart-card"><SalesChart lang={langKey} /></div>
                  <div className="chart-card"><VisitorsVsSalesChart lang={langKey} /></div>
                  <div className="chart-card"><TripleComparisonChart lang={langKey} /></div>
                  <div className="analytics-buttons">
                    <button className="big-btn" onClick={() => setPage("customers")}>
                      <i className="fas fa-users"></i> {t.charts.customersData}
                    </button>
                    <button className="big-btn" onClick={() => changePage("business")}>
                      <i className="fas fa-chart-line"></i> {t.charts.businessInsights}
                    </button>
                  </div>
                </div>
              </div>
            )}




     {activeTab === 1 && (
  <div className="products-admin-page">
    <div className="products-content">
      <div className="products-header">
        <h1 className="products-title">{t.products.manageTitle}</h1>
      </div>
      <input
        type="text"
        placeholder={t.products.searchPlaceholder}
        className="products-search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ color: "black" }}
      />
      <div className="products-actions">
        <button className="add-product-btn" onClick={() => {
    setEditingProduct(null); // 👈 أضف هذا السطر هنا لتصفير البيانات القديمة
    changePage("addProduct");
}}>
          <i className="fas fa-plus"></i> {t.products.addProduct}
        </button>
        <button 
  className="view-store-btn" 
  onClick={() => {
    localStorage.setItem("page", "dashboard"); // تأمين عشان لما ترجع الداشبورد يفتح على طول
    navigate("/"); // الانتقال للمسار الرئيسي
  }}
>
  <i className="fas fa-eye"></i> {t.products.viewStore}
</button>
      </div>

      <div className="products-grid">
        {products
          .filter((product) =>
            product.productTitles?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((product) => (
            <div className="product-admin-card" key={product.id} style={{ position: "relative", overflow: "hidden" }}>
              <div className="product-image">
                <img 
                  src={Array.isArray(product.images) ? product.images[0] : product.images} 
                  alt={product.productTitles} 
                />
              </div>
              <h3>{product.productTitles}</h3>
              <div className="product-views">
                <i className="fas fa-eye"></i> <span>{product.views || 0}</span>
              </div>
              <p className="price">${product.price}</p>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleEdit(product)}>
  <i className="fas fa-edit"></i>
</button>
                {/* زر الحذف يفتح التأكيد لهذا الكارد فقط */}
                <button className="delete-btn" onClick={() => openDeleteModal(product.id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>

              {/* طبقة التأكيد الصغيرة (تظهر فقط عند طلب حذف هذا المنتج) */}
              {showDeleteModal && productToDelete === product.id && (
                <div className="mini-delete-overlay">
                  <div className="mini-confirm-box">
                    <p>{t.confirmDelete.title}</p>
                    <div className="mini-actions">
                      <button className="mini-confirm-btn" onClick={confirmDelete}>
                        {t.confirmDelete.confirm}
                      </button>
                      <button className="mini-cancel-btn" onClick={() => {
                        setShowDeleteModal(false);
                        setProductToDelete(null);
                      }}>
                        {t.confirmDelete.cancel}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
                    {products.length === 0 && <p style={{textAlign: 'center', gridColumn: '1/-1'}}>{t.products.noProducts}</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
{page === "addProduct" && (
  <AddProductPage 
    changePage={changePage} 
    language={language} 
    editingProduct={editingProduct} // تمرير المنتج المختار
    setEditingProduct={setEditingProduct} // لتصفيره بعد الانتهاء
    addNewProduct={(newP) => {
      let updated;
      if (editingProduct) {
        // إذا كنا في وضع التعديل: نستبدل القديم بالجديد
        updated = products.map(p => p.id === editingProduct.id ? newP : p);
      } else {
        // إذا كان منتجاً جديداً تماماً
        updated = [...products, newP];
      }
      setProducts(updated);
      localStorage.setItem("all_store_products", JSON.stringify(updated));
      setEditingProduct(null); // مسح حالة التعديل
      changePage("dashboard");
    }} 
  />
)}
      {page === "business" && <BusinessInsights changePage={changePage} lang={langKey} />}
      {page === "customers" && <Customers lang={langKey} changePage={changePage} />}
    </div>
  );
}

export default Dashboard;