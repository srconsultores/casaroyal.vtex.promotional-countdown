import React, { useEffect, useState, cloneElement, ReactElement } from "react";
import { useCssHandles } from "vtex.css-handles";
import { useRuntime } from 'vtex.render-runtime'
import "./typings/storefront";

const CSS_HANDLES = [
  "productContainer",
  "productContextText",
  "productText",
  "productbrand",
  "productLink",
  "productContextImg",
  "productBackground",
  "productImage",
  "productDiscount",
  "productPrice",
  "productListPrice",
  "productSellingPrice",
];

const ProductCard = ({
  name,
  url,
  discount,
  brand,
  price,
  sellingPrice,
  image,
}: ProductCard) => {
  const handles = useCssHandles(CSS_HANDLES);
  const runtime = useRuntime()

  useEffect(() => {
    console.log("isActive: ");
  }, []);

  const goToUrl = (newTab = false) => {
    if (!url) return;
    if (newTab) {
      window.open(url, "_blank");
    } else {
      window.location.assign(url);
    }
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // El link "Comprar" ya navega por sí mismo
    if ((e.target as HTMLElement).closest("a")) return;
    goToUrl(e.metaKey || e.ctrlKey);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && e.key === "Enter") goToUrl();
  };

  return (
    <div
      className={handles.productContainer}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role="link"
      tabIndex={0}
      style={{ cursor: url ? "pointer" : undefined }}
    >
      <div className={handles.productContextText}>
        <p className={handles.productText}>
          {brand && <span className={handles.productbrand}>{brand}</span>}
          {name}
        </p>
        <p className={`${handles.productPrice} ${handles.productSellingPrice}`}>
          {sellingPrice && sellingPrice}
          {
            discount && (
              <span className={handles.productDiscount}>{discount}</span>
            )
          }
          {!runtime?.deviceInfo?.isMobile && price && (
            <span
              className={`${handles.productPrice} ${handles.productListPrice}`}
            >
              {price}
            </span>
          )}
        </p>
        {runtime?.deviceInfo?.isMobile && price && (
          <span
            className={`${handles.productPrice} ${handles.productListPrice}`}
          >
            {price}
          </span>
        )}
        <a href={url} className={handles.productLink}>
          Comprar
        </a>
      </div>
      <div className={handles.productContextImg}>
        <div className={handles.productBackground}>
          <img className={handles.productImage} src={image} alt="img" />
        </div>
      </div>
    </div>
  );
};

ProductCard.schema = {
  title: "ProductCard",
  description: "ProductCard props",
  type: "object",
  properties: {
    name: {
      title: "Nombre del Producto",
      type: "string",
    },
    price: {
      title: "Precio sin descuento",
      type: "string",
    },
    sellingPrice: {
      title: "Precio con descuento",
      type: "string",
    },
    brand: {
      title: "Marca del Producto",
      type: "string",
    },
    discount: {
      title: "Porcentaje de descuento",
      type: "string",
    },
    callToAction: {
      title: "Boton de compra",
      type: "string",
    },
    url: {
      title: "Url del Producto",
      type: "string",
    },
    image: {
      title: "Imagen del Producto",
      type: "string",
      widget: {
        "ui:widget": "image-uploader",
      },
    },
  },
};

export default ProductCard;
