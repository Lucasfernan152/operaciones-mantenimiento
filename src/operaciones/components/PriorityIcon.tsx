import React from "react";
import { Prioridad } from "../../storage/useStorage";
import { DragHandle, KeyboardArrowDown, KeyboardArrowUp, KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from "@mui/icons-material";

export const PriorityIcon = ({ priority }: { priority: string }) => {
  if (priority === "Alta")
    return (
      <div className="flex justify-center">
        <h2 className=" font-bold text-gray-800">ALTA</h2>
        <KeyboardArrowUp className="pb-[0.20rem] text-orange-800" />
      </div>
    );
    if (priority === "Muy Alta")
    return (
      <div className="flex justify-center">
        <h2 className=" font-bold text-gray-800">MUY ALTA</h2>
        <KeyboardDoubleArrowUp className="pb-[0.20rem] text-red-800" />
      </div>
    );
    if (priority === "Media")
    return (
      <div className="flex justify-center">
        <h2 className=" font-bold text-gray-800">MEDIA</h2>
        <DragHandle className="pl-[0.20rem] text-amber-500" />
      </div>
    );
    if (priority === "Baja")
    return (
      <div className="flex justify-center">
        <h2 className=" font-bold text-gray-800">BAJA</h2>
        <KeyboardArrowDown  className="pb-[0.20rem] text-sky-600" />
      </div>
    );
    if (priority === "Muy Baja")
    return (
      <div className="flex justify-center">
        <h2 className=" font-bold text-gray-800">MUY BAJA</h2>
        <KeyboardDoubleArrowDown  className=" text-indigo-950" />
      </div>
    );
};
