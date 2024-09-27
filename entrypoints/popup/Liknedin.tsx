// Not using this component in the final version of the project. Just for testing purposes.

import React, { useState } from "react";

const LinkedInMessageInput = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        className="msg-form__contenteditable"
        contentEditable="true"
        role="textbox"
        dir="auto"
        aria-multiline="true"
        aria-label="Write a message..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <p>
          <br />
        </p>
      </div>
      {isFocused && (
        <h1
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            color: "#0077b5",
          }}
        >hell </h1>
      )}
    </div>
  );
};

export default LinkedInMessageInput;
