/**
 * A generic dropdown component.  It takes the children of the component
 * and hosts it in the component.  When the component is selected, it
 * drops-down the contentComponent and applies the contentProps.
 */
import React, { useEffect, useRef, useState } from "react";

import { useDidUpdateEffect } from "../hooks/use-did-update-effect";
import { useKey } from "../hooks/use-key";
import { useMultiSelect } from "../hooks/use-multi-select";
import { KEY } from "../lib/constants";
import SelectPanel from "../select-panel";
import { Arrow } from "./arrow";
import { DropdownHeader } from "./header";
import { Loading } from "./loading";

const Dropdown = () => {
  const {
    //t,
    pannelWidth,
    onChange,
    onMenuToggle,
    ArrowRenderer,
    shouldToggleOnHover,
    isLoading,
    disabled,
    labelledBy,
    value,
    isOpen,
    defaultIsOpen,
    ClearSelectedIcon,
    closeOnChangedValue,
  } = useMultiSelect();

  useEffect(() => {
    if (closeOnChangedValue) {
      setExpanded(false);
    }
  }, [value]);

  const [isInternalExpand, setIsInternalExpand] = useState(true);
  const [expanded, setExpanded] = useState(defaultIsOpen);
  const [hasFocus, setHasFocus] = useState(false);
  const FinalArrow = ArrowRenderer || Arrow;

  const wrapper: any = useRef();

  useDidUpdateEffect(() => {
    onMenuToggle && onMenuToggle(expanded);
  }, [expanded]);

  useEffect(() => {
    if (defaultIsOpen === undefined && typeof isOpen === "boolean") {
      setIsInternalExpand(false);
      setExpanded(isOpen);
    }
  }, [isOpen]);

  const handleKeyDown = (e: any) => {
    // allows space and enter when focused on input/button
    if (
      ["text", "button"].includes(e.target.type) &&
      [KEY.SPACE, KEY.ENTER].includes(e.code)
    ) {
      return;
    }

    if (isInternalExpand) {
      if (e.code === KEY.ESCAPE) {
        setExpanded(false);
        wrapper?.current?.focus();
      } else {
        setExpanded(true);
      }
    }
    e.preventDefault();
  };

  useKey([KEY.ENTER, KEY.ARROW_DOWN, KEY.SPACE, KEY.ESCAPE], handleKeyDown, {
    target: wrapper,
  });

  const handleHover = (iexpanded: boolean) => {
    isInternalExpand && shouldToggleOnHover && setExpanded(iexpanded);
  };

  const handleFocus = () => !hasFocus && setHasFocus(true);

  const handleBlur = (e: any) => {
    if (!e.currentTarget.contains(e.relatedTarget) && isInternalExpand) {
      setHasFocus(false);
      setExpanded(true); //이 부분 변경 - 테스트를 위함 (default: false)
    }
  };

  const handleMouseEnter = () => handleHover(true);

  const handleMouseLeave = () => handleHover(false);

  const toggleExpanded = () => {
    isInternalExpand && setExpanded(isLoading || disabled ? false : !expanded);
  };

  {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleClearSelected = (e: any) => {
      e.stopPropagation();
      onChange([]);
      isInternalExpand && setExpanded(false);
    };
  }

  return (
    <div
      tabIndex={0}
      className={
        value.length > 0 && ClearSelectedIcon !== null
          ? "dropdown-container-select"
          : "dropdown-container"
      }
      aria-labelledby={labelledBy}
      aria-expanded={expanded}
      aria-readonly={true}
      aria-disabled={disabled}
      ref={wrapper}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/*선택 시 선택 조건 개수 배지*/}
      {value.length > 0 && ClearSelectedIcon !== null ? (
        <div className="select-count">{value.length}</div>
      ) : (
        <div></div>
      )}
      <div className={"dropdown-heading"} onClick={toggleExpanded}>
        <div className="dropdown-heading-value">
          {/*input text (select)*/}
          {<DropdownHeader />}
        </div>
        {isLoading && <Loading />}

        <FinalArrow expanded={expanded} />
      </div>
      {expanded && (
        <div className="dropdown-content" style={{ width: pannelWidth }}>
          <div className="panel-content">
            <SelectPanel />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
