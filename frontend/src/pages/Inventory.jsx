import { useState, useEffect } from "react";

function Inventory() {
  const [products, setProducts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("inventory")) || [
        {
          id: 1,
          product: "Laptop",
          stock: 25,
        },
        {
          id: 2,
          product: "Monitor",
          stock: 40,
        },
        {
          id: 3,
          product: "Keyboard",
          stock: 100,
        },
      ]
    );
  });

  const [productName, setProductName] =
    useState("");

  const [stock, setStock] = useState("");

  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);

  const [editProduct, setEditProduct] =
    useState("");

  const [editStock, setEditStock] =
    useState("");

  useEffect(() => {
    localStorage.setItem(
      "inventory",
      JSON.stringify(products)
    );
  }, [products]);

  const addProduct = () => {
    if (!productName || !stock) {
      alert("Fill all fields");
      return;
    }

    const newProduct = {
      id: Date.now(),
      product: productName,
      stock,
    };

    setProducts([
      ...products,
      newProduct,
    ]);

    setProductName("");
    setStock("");
  };

  const deleteProduct = (id) => {
    setProducts(
      products.filter(
        (item) => item.id !== id
      )
    );
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditProduct(item.product);
    setEditStock(item.stock);
  };

  const updateProduct = () => {
    const updatedProducts =
      products.map((item) =>
        item.id === editId
          ? {
              ...item,
              product: editProduct,
              stock: editStock,
            }
          : item
      );

    setProducts(updatedProducts);

    setEditId(null);
    setEditProduct("");
    setEditStock("");
  };

  const filteredProducts =
    products.filter((item) =>
      item.product
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div>

      <h1 className="text-5xl font-bold mb-8">
        Inventory
      </h1>

      {/* Add Product */}

      <div className="bg-slate-800 p-6 rounded-xl mb-6">

        <h2 className="text-3xl font-bold mb-4">
          Add Product
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) =>
              setProductName(
                e.target.value
              )
            }
            className="p-3 bg-slate-700 rounded"
          />

          <input
            type="number"
            placeholder="Stock Quantity"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            className="p-3 bg-slate-700 rounded"
          />

        </div>

        <button
          onClick={addProduct}
          className="mt-4 bg-green-600 px-5 py-2 rounded"
        >
          Add Product
        </button>

      </div>

      {/* Edit Product */}

      {editId && (

        <div className="bg-slate-800 p-6 rounded-xl mb-6">

          <h2 className="text-3xl font-bold mb-4">
            Edit Product
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <input
              value={editProduct}
              onChange={(e) =>
                setEditProduct(
                  e.target.value
                )
              }
              className="p-3 bg-slate-700 rounded"
            />

            <input
              value={editStock}
              onChange={(e) =>
                setEditStock(
                  e.target.value
                )
              }
              className="p-3 bg-slate-700 rounded"
            />

          </div>

          <button
            onClick={updateProduct}
            className="mt-4 bg-blue-600 px-5 py-2 rounded"
          >
            Update Product
          </button>

        </div>
      )}

      {/* Search */}

      <input
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full p-3 mb-6 bg-slate-700 rounded"
      />

      {/* Table */}

      <table className="w-full bg-slate-800 rounded-xl overflow-hidden">

        <thead>

          <tr className="bg-slate-700">

            <th className="p-4 text-left">
              ID
            </th>

            <th className="p-4 text-left">
              Product
            </th>

            <th className="p-4 text-left">
              Stock
            </th>

            <th className="p-4 text-left">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredProducts.map((item) => (

            <tr
              key={item.id}
              className="border-b border-slate-700"
            >

              <td className="p-4">
                {item.id}
              </td>

              <td className="p-4">
                {item.product}
              </td>

              <td className="p-4">
                {item.stock}
              </td>

              <td className="p-4">

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      handleEdit(item)
                    }
                    className="bg-yellow-500 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteProduct(item.id)
                    }
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Inventory;