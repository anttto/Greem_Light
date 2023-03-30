import React from "react";
import Banner from "../components/Banner";
// import Products from "../components/Products";
import AllProducts from "../components/AllProducts";

export default function Home() {
  return (
    <div className="py-6">
      <Banner />
      <AllProducts />
      {/* <Products /> */}
    </div>
  );
}
