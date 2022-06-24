import { ReactNode } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

export interface Option {
  value: string;
  label: string;
  key?: string;
  disabled?: boolean;
}

export interface ISelectProps {
  options: Option[];
  value: Option[];
  onChange?: any;
  pannelWidth?: any;
  valueRenderer?: (selected: Option[], options: Option[]) => ReactNode;
  ItemRenderer?: any;
  ArrowRenderer?: (expanded: any) => JSX.Element;
  isLoading?: boolean;
  disabled?: boolean;
  disableSearch?: boolean;
  shouldToggleOnHover?: boolean;
  hasSelectAll?: boolean;
  filterOptions?: (
    options: Option[],
    filter: string
  ) => Promise<Option[]> | Option[];
  overrideStrings?: { [key: string]: string };
  labelledBy: string;
  className?: string;
  onMenuToggle?: any;
  ClearIcon?: ReactNode;
  debounceDuration?: number;
  ClearSelectedIcon?: ReactNode;
  defaultIsOpen?: boolean;
  isOpen?: boolean;
  isCreatable?: boolean;
  onCreateOption?: any;
  closeOnChangedValue?: boolean;
  applyButton?: any; //적용 버튼 동작함수
  putComponents?: any; //패널 안에 넣을 수 있는 요소
}
