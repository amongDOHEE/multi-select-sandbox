/* eslint-disable react/react-in-jsx-scope */
/**
 * This component represents an unadorned list of SelectItem (s).
 */

import React from "react";

import { useMultiSelect } from "../hooks/use-multi-select";
import { Option } from "../lib/interfaces";
import SelectItem from "./select-item";

interface ISelectListProps {
  options: Option[];
  onClick: any;
  skipIndex: number;
}

const SelectList = ({ options, onClick, skipIndex }: ISelectListProps) => {
  const { disabled, value, onChange, ItemRenderer } = useMultiSelect();

  //줄맞춤용
  if (options.length % 5 !== 0) {
    options.push({ label: "", value: "" });
  }

  const handleSelectionChanged = (option: Option, checked: boolean) => {
    if (disabled) return;

    onChange(
      checked
        ? [...value, option]
        : value.filter((o: any) => o.value !== option.value)
    );
  };

  return (
    <>
      {options.map((o: any, i) => {
        const tabIndex = i + skipIndex;

        return (
          <li key={o?.key || i} className="item-styles">
            <SelectItem
              tabIndex={tabIndex}
              option={o}
              onSelectionChanged={(c) => handleSelectionChanged(o, c)}
              checked={!!value.find((s) => s.value === o.value)}
              onClick={(e: any) => onClick(e, tabIndex)}
              itemRenderer={ItemRenderer}
              disabled={o.disabled || disabled}
              isMain={false}
            />
          </li>
        );
      })}
    </>
  );
};

export default SelectList;
