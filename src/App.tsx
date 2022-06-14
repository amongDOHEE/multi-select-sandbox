import "./App.css";

import React, { useState } from "react";

import MultiSelect from "./multi-select-component/multi-select";

function App() {
  const options = [{ label: "NONE", value: "NONE" }];
  const [selected, setSelected] = useState([]);

  return (
    <div className="App">
      hello
      <p>hello</p>
      <MultiSelect
        className="fillter-width"
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
          selectAll: "모두 선택하기",
          selectAllFiltered: "모두 선택하기(필터)",
          selectSomeItems: "TEST",
          create: "만들기",
        }}
      />
    </div>
  );
}

export default App;
