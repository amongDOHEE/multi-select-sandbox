import "./App.css";

//import { MultiSelect } from "@sandboxnetwork/mip-multi-selector";
import React, { useState } from "react";

import MultiSelect from "./multi-select-component/multi-select";

function App() {
  const options = [
    { label: "뮤직", value: "뮤직", type: "ent" },
    { label: "정치", value: "정치", type: "ent" },
    { label: "푸드(비주얼)", value: "푸드(비주얼)", type: "ent" },
    { label: "DIY", value: "DIY", type: "ent" },
    { label: "경제", value: "경제", type: "ent" },
    { label: "키즈", value: "키즈", type: "ent" },
    { label: "동물", value: "동물", type: "ent" },
    { label: "뷰티/패션", value: "뷰티/패션", type: "ent" },
    { label: "건강/운동", value: "건강/운동", type: "ent" },
    { label: "IT/가전", value: "IT/가전", type: "ent" },
    { label: "지식/기술", value: "지식/기술", type: "ent" },
    { label: "댄스", value: "댄스", type: "ent" },
    { label: "팬/직캠", value: "팬/직캠", type: "ent" },
    { label: "자동차", value: "자동차", type: "ent" },
    { label: "모바일게임", value: "모바일게임", type: "ent" },
    { label: "이슈/가십", value: "이슈/가십", type: "ent" },
    { label: "스타크래프트", value: "스타크래프트", type: "ent" },
    { label: "기타", value: "기타", type: "ent" },
    { label: "종교/미신", value: "종교/미신", type: "game" },
    { label: "탤런트", value: "탤런트", type: "game" },
    { label: "외국인/해외", value: "외국인/해외", type: "game" },
    { label: "게임-기타", value: "게임-기타", type: "game" },
    { label: "애니/스톱모션", value: "애니/스톱모션", type: "game" },
    { label: "영화/드라마", value: "영화/드라마", type: "game" },
    { label: "ASMR", value: "ASMR", type: "game" },
    { label: "생활/일상", value: "생활/일상", type: "game" },
    { label: "기획/예능", value: "기획/예능", type: "game" },
    { label: "종합게임", value: "종합게임", type: "game" },
    { label: "푸드(정보)", value: "푸드(정보)", type: "game" },
    { label: "IRL", value: "IRL", type: "game" },
    { label: "자기계발", value: "자기계발", type: "game" },
    { label: "연애/섹슈얼", value: "연애/섹슈얼", type: "game" },
    { label: "카트라이더", value: "카트라이더", type: "game" },
    { label: "TCG/CCG", value: "TCG/CCG", type: "game" },
    { label: "오버워치", value: "오버워치", type: "game" },
    { label: "배틀그라운드", value: "배틀그라운드", type: "game" },
    { label: "리그오브레전드", value: "리그오브레전드", type: "game" },
    { label: "배틀그라운드", value: "배틀그라운드", type: "game" },
  ];
  const [selected, setSelected] = useState([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const buttonTest = () => {
    // eslint-disable-next-line no-console
    console.log("hello");
  };

  return (
    <div className="App">
      <div>
        <MultiSelect
          types={["ent", "game"]}
          className="fillter-width"
          pannelWidth={`650px`}
          applyButton={buttonTest}
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
          overrideStrings={{
            selectSomeItems: "카테고리",
          }}
        />
      </div>
    </div>
  );
}

export default App;
