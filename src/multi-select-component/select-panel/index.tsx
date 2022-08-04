/**
 * This component represents the entire panel which gets dropped down when the
 * user selects the component.  It encapsulates the search filter, the
 * Select-all item, and the list of options.
 */
import "../style.css";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { useKey } from "../hooks/use-key";
import { useMultiSelect } from "../hooks/use-multi-select";
import { KEY } from "../lib/constants";
import { filterOptions } from "../lib/simple-match-utils";
import SelectItem from "./select-item";
import SelectList from "./select-list";

const SelectPanel = () => {
  const {
    t,
    types,
    onChange,
    options,
    setOptions,
    value,
    filterOptions: customFilterOptions,
    ItemRenderer,
    disabled,
    disableSearch,
    hasSelectAll,

    isCreatable,
    onCreateOption,
    applyButton, //적용 버튼 클릭 시 함수
    putComponents,
  } = useMultiSelect();

  //들어오는 타입의 경우 분리
  //엔터테이먼트 / 게임 / 제작자 유형  MCN/ 미디어사 / (엔터사/음원) / CMS 미연결 / 참여도 등급 / 구독자수 성장 등급
  /*
  const types = [
    "ent",
    "game",
    "owner",
    "media",
    "mcn",
    "enter",
    "cms",
    "part",
    "sub",
  ];
  */
  const listRef = useRef<any>();
  const searchInputRef = useRef<any>();
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchTextForFilter, setSearchTextForFilter] = useState("");
  const [focusIndex, setFocusIndex] = useState(0);

  const skipIndex = useMemo(() => {
    let start = 0;

    if (!disableSearch) start += 1; // if search is enabled then +1 to skipIndex
    if (hasSelectAll) start += 1; // if select-all is enabled then +1 to skipIndex

    return start;
  }, [disableSearch, hasSelectAll]);

  const selectAllOption = {
    label: searchText ? t("selectAllFiltered") : t("selectAll"),
    value: "",
  };

  const selectAllValues = (checked: boolean) => {
    const filteredValues = filteredOptions
      .filter((o) => !o.disabled)
      .map((o) => o.value);

    if (checked) {
      const selectedValues = value.map((o) => o.value);
      const finalSelectedValues = [...selectedValues, ...filteredValues];

      return (customFilterOptions ? filteredOptions : options).filter((o) =>
        finalSelectedValues.includes(o.value)
      );
    }

    return value.filter((o) => !filteredValues.includes(o.value));
  };

  const selectAllChanged = (checked: boolean) => {
    const newOptions = selectAllValues(checked);
    onChange(newOptions);
  };

  const handleClear = () => {
    setSearchTextForFilter("");
    setSearchText("");
    searchInputRef?.current?.focus();
  };

  const handleItemClicked = (index: number) => setFocusIndex(index);

  // Arrow Key Navigation
  const handleKeyDown = (e: {
    code: any;
    stopPropagation: () => void;
    preventDefault: () => void;
  }) => {
    switch (e.code) {
      case KEY.ARROW_UP:
        updateFocus(-1);
        break;
      case KEY.ARROW_DOWN:
        updateFocus(1);
        break;
      default:
        return;
    }
    e.stopPropagation();
    e.preventDefault();
  };

  useKey([KEY.ARROW_DOWN, KEY.ARROW_UP], handleKeyDown, {
    target: listRef,
  });

  const handleOnCreateOption = async () => {
    let newOption = { label: searchText, value: searchText, __isNew__: true };

    // if custom `onCreateOption` is given then this will call this
    if (onCreateOption) {
      newOption = await onCreateOption(searchText);
    }

    // adds created value to existing options
    setOptions([newOption, ...options]);
    //sortLines(newOption);
    handleClear();

    onChange([...value, newOption]);
  };

  const getFilteredOptions = async () =>
    customFilterOptions
      ? await customFilterOptions(options, searchTextForFilter)
      : filterOptions(options, searchTextForFilter);

  const updateFocus = (offset: number) => {
    let newFocus = focusIndex + offset;
    newFocus = Math.max(0, newFocus);
    newFocus = Math.min(newFocus, options.length + Math.max(skipIndex - 1, 0));
    setFocusIndex(newFocus);
  };

  //컴포넌트를 넣기 않기를 바랄때 체크 (default)
  const wantAddComponent = () => {
    if (putComponents !== undefined) {
      return putComponents();
    }
    return "";
  };

  useEffect(() => {
    listRef?.current?.querySelector(`[tabIndex='${focusIndex}']`)?.focus();
  }, [focusIndex]);

  const [isAllOptionSelected, hasSelectableOptions] = useMemo(() => {
    const filteredOptionsList = filteredOptions.filter((o) => !o.disabled);
    return [
      filteredOptionsList.every(
        (o) => value.findIndex((v) => v.value === o.value) !== -1
      ),
      filteredOptionsList.length !== 0,
    ];
    // eslint-disable-next-line
  }, [filteredOptions, value]);

  useEffect(() => {
    getFilteredOptions().then(setFilteredOptions);
  }, [searchTextForFilter, options]);

  const creationRef: any = useRef();
  useKey([KEY.ENTER], handleOnCreateOption, { target: creationRef });

  const showCratable =
    isCreatable &&
    searchText &&
    !filteredOptions.some((e) => e?.value === searchText);

  return (
    <div className="select-panel" role="listbox" ref={listRef}>
      {/*select option section*/}
      <ul className="options">
        {hasSelectAll && hasSelectableOptions && (
          <div>
            <div className="split-section">
              <SelectItem
                tabIndex={skipIndex === 1 ? 0 : 1}
                checked={isAllOptionSelected}
                option={selectAllOption}
                onSelectionChanged={selectAllChanged}
                onClick={() => handleItemClicked(1)}
                itemRenderer={ItemRenderer}
                disabled={disabled}
                isMain={true}
              />
              <div className="dott-line"></div>
            </div>
            <div className="split-section">
              <SelectItem
                tabIndex={skipIndex === 1 ? 0 : 1}
                checked={isAllOptionSelected}
                option={selectAllOption}
                onSelectionChanged={selectAllChanged}
                onClick={() => handleItemClicked(1)}
                itemRenderer={ItemRenderer}
                disabled={disabled}
                isMain={true}
              />
              <div className="dott-line"></div>
            </div>
          </div>
        )}

        {/**일단 이 부분 분할 */}
        {filteredOptions.length ? (
          <div>
            {types.map((type, idx) => (
              <div
                className="split-section"
                style={{ width: `${100 / types.length - 5}%` }}
                key={`split-section-${idx}`}
              >
                <SelectList
                  skipIndex={skipIndex}
                  options={filteredOptions.filter((o) => o.type === type)}
                  onClick={(_e: any, index: number) => handleItemClicked(index)}
                />
              </div>
            ))}
          </div>
        ) : showCratable ? (
          <li
            onClick={handleOnCreateOption}
            className="select-item creatable"
            tabIndex={skipIndex === 1 ? 0 : 1}
            ref={creationRef}
          >
            {`${t("create")} "${searchText}"`}
          </li>
        ) : (
          <li className="no-options">{t("noOptions")}</li>
        )}
      </ul>
      <div className="blank-style"></div>
      {/*외부 컴포넌트를 넣을 수 있는 자리*/}
      {wantAddComponent()}
      <button className="btn" onClick={applyButton}>
        적용
      </button>
    </div>
  );
};

export default SelectPanel;
