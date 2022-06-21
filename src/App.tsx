import "./App.css";

import React, { useState } from "react";

import MultiSelect from "./multi-select-component/multi-select";

function App() {
  const options = [
    { label: "뮤직", value: "뮤직" },
    { label: "정치", value: "정치" },
    { label: "푸드(비주얼)", value: "푸드(비주얼)" },
    { label: "DIY", value: "DIY" },
    { label: "경제", value: "경제" },
    { label: "키즈", value: "키즈" },
    { label: "동물", value: "동물" },
    { label: "뷰티/패션", value: "뷰티/패션" },
    { label: "건강/운동", value: "건강/운동" },
    { label: "IT/가전", value: "IT/가전" },
    { label: "지식/기술", value: "지식/기술" },
    { label: "댄스", value: "댄스" },
    { label: "팬/직캠", value: "팬/직캠" },
    { label: "자동차", value: "자동차" },
    { label: "모바일게임", value: "모바일게임" },
    { label: "이슈/가십", value: "이슈/가십" },
    { label: "스타크래프트", value: "스타크래프트" },
    { label: "기타", value: "기타" },
    { label: "종교/미신", value: "종교/미신" },
    { label: "탤런트", value: "탤런트" },
    { label: "외국인/해외", value: "외국인/해외" },
    { label: "게임-기타", value: "게임-기타" },
    { label: "애니/스톱모션", value: "애니/스톱모션" },
    { label: "영화/드라마", value: "영화/드라마" },
    { label: "ASMR", value: "ASMR" },
    { label: "생활/일상", value: "생활/일상" },
    { label: "기획/예능", value: "기획/예능" },
    { label: "종합게임", value: "종합게임" },
    { label: "푸드(정보)", value: "푸드(정보)" },
    { label: "IRL", value: "IRL" },
    { label: "자기계발", value: "자기계발" },
    { label: "연애/섹슈얼", value: "연애/섹슈얼" },
    { label: "카트라이더", value: "카트라이더" },
    { label: "TCG/CCG", value: "TCG/CCG" },
    { label: "마인크래프트/로블록스", value: "마인크래프트/로블록스" },
    { label: "오버워치", value: "오버워치" },
    { label: "배틀그라운드", value: "배틀그라운드" },
    { label: "리그오브레전드", value: "리그오브레전드" },
  ];
  const [selected, setSelected] = useState([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const buttonTest = () => {
    // eslint-disable-next-line no-console
    console.log("hello");
  };

  const divElement = () => {
    return (
      <div>
        <div>Fillter(1)</div>
        <div>Fillter(2)</div>
      </div>
    );
  };
  return (
    <div className="App">
      <div>
        <MultiSelect
          className="fillter-width"
          applyButton={buttonTest}
          putComponents={divElement}
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
          overrideStrings={{
            allItemsAreSelected: "모든 조건 선택",
            clearSearch: "검색 초기화",
            clearSelected: "선택 초기화",
            noOptions: "조건 없음",
            search: "검색",
            selectAll: "엔터테이먼트 & 게임",
            selectAllFiltered: "모두 선택하기(필터)",
            selectSomeItems: "카테고리",
            create: "만들기",
          }}
        />
      </div>
    </div>
  );
}

export default App;
