import "@aws-amplify/ui-react/styles.css";
import type { Schema } from "../amplify/data/resource";

export const CartList = (props: {
  cartItems: Array<Schema["Cart"]["type"]>;
  onClick: (id: string | undefined | null) => void;
}) => {
  const { cartItems, onClick } = props;

  return (
    <ul>
      {cartItems.map((item) => (
        <li onClick={() => onClick(item.eventId)} key={item.eventId}>
          {item.eventId}
        </li>
      ))}
    </ul>
  );
};
