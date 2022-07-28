import React from "react";

import { useMultiSelect } from "../hooks/use-multi-select";

export const DropdownHeader = () => {
  const { t, value, options, valueRenderer } = useMultiSelect();

  const noneSelected = value.length === 0;
  const customText = valueRenderer && valueRenderer(value, options);

  return noneSelected ? (
    //미선택시
    <span className="dropdown-header-font">
      {customText || t("selectSomeItems")}
    </span>
  ) : (
    //조건선택시
    <span className="dropdown-header-font" style={{ color: "#34caae" }}>
      {customText || t("selectSomeItems")}
    </span>
  );
};
