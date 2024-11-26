import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import StorePage from "./pages/Store";
import CartPage from "./pages/Cart";
import NewsPage from "./pages/New";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/Contact";
import NewVD from "./pages/NewVD";

function App() {
  // Danh sách sản phẩm theo danh mục
  const productCategories = {
    DELL: [
      {
        id: 1,
        name: "Dell Latitude E5550",
        price: 15000000,
        image:
          "https://i5.walmartimages.com/asr/3a0b16b3-88f9-4797-a546-8a7a5f3d15cc.9cd02e837eeb8ced4ef44bdac35a84e9.jpeg",
      },
      {
        id: 2,
        name: "DELL Latitude 5440",
        price: 17506000,
        image:
          "https://i.ebayimg.com/images/g/edUAAOSw6Z5m24UH/s-l1600.webp",
      },
      {
        id: 3,
        name: "DELL Latitude 5490",
        price: 15516000,
        image:
          "https://i.ebayimg.com/images/g/CVwAAOSww2lnLk83/s-l1600.webp",
      },
      {
        id: 4,
        name: "DELL Alienware X15 R1 15",
        price: 36000000,
        image:
          "https://i.ebayimg.com/images/g/84YAAOSw0NNnLk-x/s-l960.webp",
      },
    ],
    HP: [
      {
        id: 7,
        name: "HP 255 G10 Laptop Ryzen 7",
        price: 18000000,
        image:
          "https://i.ebayimg.com/images/g/AhQAAOSwZpxnLlCc/s-l960.webp",
      },
      {
        id: 8,
        name: "HP 15-DW3363ST",
        price: 8500000,
        image:
          "https://i.ebayimg.com/images/g/bQUAAOSwCCFnQOwK/s-l1600.webp",
      },
      {
        id: 9,
        name: "HP EliteBook 645 G10 Laptop Ryzen 5",
        price: 24000000,
        image:
          "https://i.ebayimg.com/images/g/w40AAOSwnX1nLlB0/s-l1600.webp",
      },
      {
        id: 10,
        name: "HP Envy 17",
        price: 64000000,
        image:
          "https://i.ebayimg.com/images/g/HNAAAOSw1qZk8HnK/s-l1600.webp",
      },
    ],
    ACER: [
      {
        id: 13,
        name: "Acer Swift Go SFG16-71-52SD",
        price: 15000000,
        image:
          "https://i.ebayimg.com/images/g/tywAAOSw0kJlrZDA/s-l1600.webp",
      },
      {
        id: 14,
        name: "Acer Nitro V 16",
        price: 24532000,
        image:
          "https://i.ebayimg.com/images/g/M68AAOSw~bFm1g~C/s-l1600.webp",
      },
      {
        id: 15,
        name: "Acer Nitro V ANV15-51-789J",
        price: 25050400,
        image:
          "https://i.ebayimg.com/images/g/vn4AAOSwh8hmbJ0Y/s-l1600.webp",
      },
      {
        id: 16,
        name: "Acer Nitro 5 AN515-58",
        price: 2800000,
        image:
          "https://i.ebayimg.com/images/g/VzkAAOSwhWRmFUl~/s-l1600.webp",
      },
    ],
  };

  return (
    <div className="App">
      <BrowserRouter>
        {/* Hiển thị thanh điều hướng */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Trang chi tiết sản phẩm */}
          <Route
            path="/product/:productId"
            element={
              <ProductDetailPage productCategories={productCategories} />
            }
          />
          {/* Trang ví dụ khác */}
          <Route path="/NewVD" element={<NewVD />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;