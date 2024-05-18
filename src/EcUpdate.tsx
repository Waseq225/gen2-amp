import "@aws-amplify/ui-react/styles.css";
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { EventListPage } from "./EventListPage";
import { CartList } from "./Cart";
import { AuthUser } from "aws-amplify/auth";

const client = generateClient<Schema>();

export const EcUpdate = (props: { user: AuthUser | undefined }) => {
  const { user } = props;
  const [events, setEvents] = useState<Array<Schema["Event"]["type"]>>([]);
  const [cart, setCart] = useState<Array<Schema["Cart"]["type"]>>([]);

  useEffect(() => {
    client.models.Event.observeQuery().subscribe({
      next: (data) => setEvents([...data.items]),
    });
    client.models.Cart.observeQuery().subscribe({
      next: (data) => setCart([...data.items]),
    });
  }, []);

  function addToCart(id: string) {
    console.log(id);
    // client.models.Cart.create({eventId: id, numberOfTickets: 1, isCheckedOut: false});
  }

  //   function deleteCart(id: string) {
  //     client.models.Cart.delete({ id });
  //   }

  return (
    <main>
      <EventListPage events={events} onClick={addToCart} />
      {user && <CartList cartItems={cart} onClick={addToCart} />}
    </main>
  );
};
