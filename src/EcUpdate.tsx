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
    client.models.Event.observeQuery({ authMode: "apiKey" }).subscribe({
      next: (data) => setEvents([...data.items]),
    });
    client.models.Cart.observeQuery().subscribe({
      next: (data) => setCart([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Event.create(
      {
        content: window.prompt("Todo content"),
        availableTickets: 10,
      },
      { authMode: "apiKey" }
    ).then((y) => console.log(y));
  }

  function addToCart(id: string) {
    client.models.Cart.create({
      eventId: id,
      numberOfTickets: 1,
      isCheckedOut: false,
    });
  }

  function deleteCart(id: string | undefined | null) {
    if (!id) return;
    console.log("Im here 2", id);

    client.models.Cart.delete({ id }).then((h) => console.log(h));
  }

  return (
    <main>
      <button onClick={createTodo}>+ new</button>
      <EventListPage events={events} onClick={addToCart} />
      {user && <CartList cartItems={cart} onClick={deleteCart} />}
    </main>
  );
};
