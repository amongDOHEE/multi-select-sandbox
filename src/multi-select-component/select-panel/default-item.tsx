import React from "react";
import { FaCheck, FaCheckSquare } from "react-icons/fa";

import { Option } from "../lib/interfaces";

interface IDefaultItemRendererProps {
  checked: boolean;
  option: Option;
  disabled?: boolean;
  onClick: any;
  main: boolean;
}

const DefaultItemRenderer = ({
  checked,
  option,
  onClick,
  disabled,
  main,
}: IDefaultItemRendererProps) => (
  <div
    className={
      main ? "item-renderer-main" : `item-renderer ${disabled && "disabled"}`
    }
  >
    <input
      type="checkbox"
      onChange={onClick}
      checked={checked}
      tabIndex={-1}
      disabled={disabled}
    />
    <div>
      {main ? (
        //all select title
        checked ? (
          <FaCheckSquare className="icon-all-select checked" />
        ) : (
          <FaCheckSquare className="icon-all-select" />
        )
      ) : //select one item
      option.value.length < 1 ? (
        <div></div>
      ) : checked ? (
        <FaCheck className="icon-default checked" />
      ) : (
        <FaCheck className="icon-default" />
      )}
      <span className={main ? "all-select-text" : ""}>{option.label}</span>
    </div>
  </div>
);

export default DefaultItemRenderer;
