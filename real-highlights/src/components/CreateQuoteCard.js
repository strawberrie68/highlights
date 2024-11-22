import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function CreateQuoteCard() {
  return (
    <div>
      <div className="createQuote-card m-3 px-4 border-2 border-dashed flex flex-col border-zinc-300">
        <div className="text-3xl text-zinc-300 my-2">
          <FontAwesomeIcon
            icon="fa-solid fa-circle-plus"
            style={{ color: "#dbdbdb" }}
          />
        </div>

        <p className="px-6 text-zinc-300">Add Quote</p>
      </div>
    </div>
  );
}
