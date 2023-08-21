import { BiFoodTag } from "react-icons/bi";

export default function FoodCategorySymbol(props: { isNonVeg: boolean; }) {
  return (
    <BiFoodTag
      className={`absolute top-1 left-1 text-xl ${
        props.isNonVeg ? "text-red-800" : "text-green-800"
      }`}
    />
  );
}
