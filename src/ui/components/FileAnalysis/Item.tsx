import React from "react";

type Item2={
  item: any
}
function Item({item}: Item2) {
  console.log("threat item " + item)
  return (
    <tr>
      <td>{item}</td>
    </tr>
  );
}

export default Item;
