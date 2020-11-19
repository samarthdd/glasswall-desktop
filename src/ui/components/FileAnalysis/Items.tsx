import React from "react";
import Item from "./Item";

type Item2={
  items: any|undefined;
}

function Items({items}:Item2) {
  if (items === null || items === undefined) return null;
  console.log("thread items " + items)
  return items.map((item:string, index:number) => (
    <Item key={index} item={item} />
  ));
}

export default Items;
