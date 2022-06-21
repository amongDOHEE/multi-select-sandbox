import { ReactNode } from "react";

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
  applyButton?: any;
}