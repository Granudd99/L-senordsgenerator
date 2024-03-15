import React from "react";

const POWER = () => {
  const getChecked = () => {
    const checkboxes = document.querySelectorAll(".strength");
    const checkedCheckboxes = [];

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedCheckboxes.push(<div key={checkbox.id} className="barr"></div>);
      }
    });

    return checkedCheckboxes;
  };

  return <div>{getChecked()}</div>;
};

export default POWER;
