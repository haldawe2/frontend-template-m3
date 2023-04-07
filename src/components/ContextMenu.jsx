import React from "react";

export default function ContextMenu({ top, left, children }) {

  return (
    <div className={`absolute top-[${top}] left-[${left}] flex flex-col`}>
      {children}
    </div>
  )
};