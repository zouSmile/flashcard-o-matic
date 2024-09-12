import React from "react";
import { useNavigate } from "react-router-dom";
function CardForm({
  action,
  front,
  back,
  handleFrontChange,
  handleBackChange,
  handleSubmit,
  handleCancel,
  handleDone,
  handleSave,
}) {
  const navigate = useNavigate();

  return (
    <form>
      <label htmlFor="front">
        Front
        <br />
        <textarea
          id="front"
          type="text"
          name="front"
          onChange={handleFrontChange}
          value={front}
        />
      </label>
      <br />
      <label htmlFor="back">
        Back
        <br />
        <textarea
          id="back"
          type="text"
          name="back"
          onChange={handleBackChange}
          value={back}
        />
      </label>
      <br />
      {action === "create" && (
        <div>
          <button type="submit" onClick={handleSave}>
            Save
          </button>
          <button type="submit" onClick={handleDone}>
            Done
          </button>
        </div>
      )}
      {action === "edit" && (
        <div>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
    </form>
  );
}

export default CardForm;
