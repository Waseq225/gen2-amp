import "@aws-amplify/ui-react/styles.css";
import type { Schema } from "../amplify/data/resource";

export const CartList = (props: {
  cartItems: Array<Schema["Cart"]["type"]>;
  onClick: (id: string) => void;
}) => {
  const { cartItems, onClick } = props;

  return (
    <ul>
      {cartItems.map((item) => (
        <li key={item.id}>
          {item.cartId}
          <button onClick={() => onClick(item.id)}>+ </button>
        </li>
      ))}
    </ul>
  );
};
