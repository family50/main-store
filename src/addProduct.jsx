import { useState, useEffect } from "react";
import "./addProduct.css";
import { translations } from "./translations";

export default function AddProductPage({ changePage, language, addNewProduct, editingProduct }) {
    const langKey = language === "ENGLISH" ? "EN" : "AR";
    const t = translations[langKey].addProductPage;

    const [title, setTitle] = useState("");
    const [titleColor, setTitleColor] = useState("#000000");
    const [description, setDescription] = useState("");
    const [descriptionColor, setDescriptionColor] = useState("#000000");
    const [price, setPrice] = useState("");
    const [buttonColor, setButtonColor] = useState("#4b4b4b");
    const [buttonTextColor, setButtonTextColor] = useState("#ffffff");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [bgGradient, setBgGradient] = useState("none");
    const [productImage, setProductImage] = useState(null);
    const [boxShadowColor, setBoxShadowColor] = useState("#000000");
    const [iconShadowColor, setIconShadowColor] = useState("#000000");
    const [errors, setErrors] = useState({});
    const [formKey, setFormKey] = useState(() => Date.now());

    useEffect(() => {
        if (editingProduct) {
            setTitle(editingProduct.productTitles || "");
            setTitleColor(editingProduct.textColors?.title || "#000000");
            setDescription(editingProduct.productDescriptions || "");
            setDescriptionColor(editingProduct.textColors?.description || "#000000");
            setPrice(editingProduct.price || "");
            setButtonColor(editingProduct.buttonColors || "#4b4b4b");
            setButtonTextColor(editingProduct.buttonTextColors || "#ffffff");
            setBgColor(editingProduct.backgrounds || "#ffffff");
            setProductImage(Array.isArray(editingProduct.images) ? editingProduct.images[0] : editingProduct.images || null);
            setIconShadowColor(editingProduct.cartCountshadow || "#000000");
            
            if (!editingProduct.backgroundshadow || editingProduct.backgroundshadow === "none") {
                setBgGradient("none");
            } else {
                setBgGradient(editingProduct.backgroundshadow.includes("255,255,255") ? "light" : "dark");
            }
        } else {
            resetForm();
        }
    }, [editingProduct]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductImage(reader.result);
                if (errors.productImage) setErrors(prev => ({ ...prev, productImage: false }));
            };
            reader.readAsDataURL(file);
        }
    };

    const resetForm = () => {
        setTitle(""); setTitleColor("#000000"); setDescription(""); setDescriptionColor("#000000");
        setPrice(""); setButtonColor("#4b4b4b"); setButtonTextColor("#ffffff"); setBgColor("#ffffff");
        setBgGradient("none"); setProductImage(null); setBoxShadowColor("#000000"); setIconShadowColor("#000000");
        setErrors({}); setFormKey(Date.now());
    };

    const handleAdd = () => {
        let newErrors = {};
        if (!title) newErrors.title = true;
        if (!description) newErrors.description = true;
        if (!price) newErrors.price = true;
        if (!productImage) newErrors.productImage = true;

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const whiteGradient = `radial-gradient(circle at center, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 70%)`;
            const blackGradient = `radial-gradient(circle at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 70%)`;

            let selectedGradient = "none";
            if (bgGradient === "light") selectedGradient = whiteGradient;
            if (bgGradient === "dark") selectedGradient = blackGradient;

            const updatedProduct = {
                id: editingProduct ? editingProduct.id : Date.now(),
                productTitles: title,
                productDescriptions: description,
                images: [productImage],
                backgrounds: bgColor,
                textColors: { title: titleColor, description: descriptionColor },
                price: parseFloat(price),
                buttonColors: buttonColor,
                buttonTextColors: buttonTextColor,
                quantity: editingProduct ? editingProduct.quantity : 1,
                leftshadow: `0 4px 15px ${boxShadowColor}`,
                headerShadows: `0 4px 15px ${boxShadowColor}`,
                iconShadows: `2px 2px 8px ${iconShadowColor}`,
                backgroundshadow: selectedGradient,
                backgroundcartCount: bgColor,
                cartCountshadow: iconShadowColor,
            };

            addNewProduct(updatedProduct);
            alert(editingProduct ? (language === "ENGLISH" ? "Changes Saved!" : "تم حفظ التغييرات!") : (language === "ENGLISH" ? "Product Added!" : "تمت الإضافة!"));
            
            if (!editingProduct) resetForm();
            else changePage("dashboard");
        }
    };

    return (
        <div className="add-product-page" style={{ backgroundColor: bgColor }}>
            <div className="add-product-container">
                <h1 className="add-product-title">
                    {editingProduct ? (language === "ENGLISH" ? "Edit Product" : "تعديل المنتج") : t.buttonAdd}
                </h1>
                <div className="add-product-content">
                    <div className="form-group">
                        <label>{t.title}</label>
                        <input type="text" value={title} maxLength={18} onChange={(e) => setTitle(e.target.value)} style={{ borderColor: errors.title ? "red" : "#cbd5e1" }} />
                        <label className="a">{t.colorTitle}</label>
                        <input type="color" value={titleColor} onChange={(e) => setTitleColor(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>{t.description}</label>
                        <input type="text" value={description} maxLength={42} onChange={(e) => setDescription(e.target.value)} style={{ borderColor: errors.description ? "red" : "#cbd5e1" }} />
                        <label className="a">{t.colorDescription}</label>
                        <input type="color" value={descriptionColor} onChange={(e) => setDescriptionColor(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>{t.price}</label>
                        <input className="input" type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={{ borderColor: errors.price ? "red" : "#cbd5e1" }} />
                    </div>
                    <div className="form-group">
                        <label className="a">{t.buttonColor}</label>
                        <input type="color" value={buttonColor} onChange={(e) => setButtonColor(e.target.value)} />
                        <label className="a">{t.buttonTextColor}</label>
                        <input type="color" value={buttonTextColor} onChange={(e) => setButtonTextColor(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="a">{t.bgColor}</label>
                        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                        <div className="gradient-options">
                            <div className={`gradient-box ${bgGradient === "none" ? "selected" : ""}`} onClick={() => setBgGradient("none")}><span>{t.noGradient}</span></div>
                            <div className={`gradient-box ${bgGradient === "light" ? "selected" : ""}`} onClick={() => setBgGradient("light")}><span>{t.lightGradient}</span></div>
                            <div className={`gradient-box ${bgGradient === "dark" ? "selected" : ""}`} onClick={() => setBgGradient("dark")}><span>{t.darkGradient}</span></div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>{t.productImage}</label>
                        <input key={formKey} type="file" accept="image/*" onChange={handleImageChange} style={{ borderColor: errors.productImage ? "red" : "#cbd5e1" }} />
                        {productImage && <img src={productImage} alt="preview" className="image-preview" />}
                    </div>
                    <div className="form-group">
                        <label className="a">{t.boxShadow}</label>
                        <input type="color" value={boxShadowColor} onChange={(e) => setBoxShadowColor(e.target.value)} />
                        <label className="a">{t.iconShadow}</label>
                        <input type="color" value={iconShadowColor} onChange={(e) => setIconShadowColor(e.target.value)} />
                    </div>
                    <div className="form-group buttons">
                        <button onClick={handleAdd} style={{ backgroundColor: buttonColor, color: buttonTextColor }}>
                            {editingProduct ? (language === "ENGLISH" ? "Save Changes" : "حفظ التغييرات") : t.buttonAdd}
                        </button>
                        <button onClick={() => changePage("dashboard")}>{t.buttonBack}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}