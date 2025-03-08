import TodoItem from "./TodoItem.tsx";
import { TodoItemTemplate } from "./TodoItemTemplate.tsx";

interface TodoItemListProps {
  items: TodoItemTemplate[];
}

export default function TodoItemList({ items }: TodoItemListProps) {
  return (
    <>
      <div className="list-group">
        { items.map((item) => (
          <TodoItem key={item.id} id={item.id} text={item.text} completed={item.completed} />
        )) }
      </div>
    </>
  )
}
