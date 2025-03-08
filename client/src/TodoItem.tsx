import { useState } from "react";

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoItem({ id, text, completed }: TodoItem) {
  const [isEditing, setIsEditing] = useState(false);
  // const [newText, setNewText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewText(e.target.value);
  // };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="list-group-item list-group-item-action flex-column">
        <div className="d-flex justify-content-between align-items-center">
          <input className="form-check-input" type="checkbox" checked />
          {isEditing
            ? <input type="text" className="form-control mx-2" value={text} />
            : <span className="lead align-text-bottom">{text}</span>}
          {isEditing
            ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save
              </button>
            )
            : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEdit}
              >
                Edit
              </button>
            )}
        </div>
      </div>
    </>
  );
}
