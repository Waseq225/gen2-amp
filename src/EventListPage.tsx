import "@aws-amplify/ui-react/styles.css";
import type { Schema } from "../amplify/data/resource";

export const EventListPage = (props: {
  events: Array<Schema["Event"]["type"]>;
  onClick: (id: string) => void;
}) => {
  const { events, onClick } = props;
  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          {event.content}
          <button onClick={() => onClick(event.id)}>+ </button>
        </li>
      ))}
    </ul>
  );
};
