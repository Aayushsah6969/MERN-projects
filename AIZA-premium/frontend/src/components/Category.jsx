import { Link } from "react-router-dom";

const Category = () => {
    
  const categories = [
    { name: "Tops", image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" },
    { name: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1783&q=80" },
    { name: "Outerwear", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1736&q=80" },
    { name: "Accessories", image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80" },
    { name: "Tops", image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" },
    { name: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1783&q=80" },
    { name: "Outerwear", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1736&q=80" },
    { name: "Accessories", image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80" }
  ];
  return (
   <>
<section className="container mx-auto py-16 px-4">
  <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
  <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
    {categories.map((category, index) => (
      <div
        key={index}
        className="relative flex-shrink-0 w-64 overflow-hidden rounded-lg shadow-lg group"
      >
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-64 object-cover transition duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <h3 className="text-white text-2xl font-semibold">{category.name}</h3>
          <Link to='/shop' className="relative top-20 text-white font-bold">Shop these <span><i className="fas fa-arrow-right"></i>
          </span> </Link>
        </div>
      </div>
    ))}
  </div>
</section>

   </>
  )
}

export default Category