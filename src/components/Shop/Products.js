import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  const productItems = [
    {
      id: 1,
      title: "Test",
      price: 200,
      description: "This is a first product - amazing!",
    },
    {
      id: 2,
      title: "Test 2",
      price: 400,
      description: "This is a second product - amazing!",
    },
    {
      id: 3,
      title: "Test 3",
      price: 600,
      description: "This is a third product - amazing!",
    },
    {
      id: 4,
      title: "Test 4",
      price: 800,
      description: "This is a forth product - amazing!",
    },
  ];
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {productItems.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
