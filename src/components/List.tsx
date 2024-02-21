import React, { useState } from "react";
import { CategoryData, Item } from "../App";
import { CheckmarkIcon } from "./Icons/CheckmarkIcon";

interface Props {
  category: string;
  categoryData: CategoryData;
}
export const List = ({ category, categoryData }: Props) => {
  const [data, setData] = useState(categoryData);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: Item
  ) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setData((prev) => ({
        ...prev,
        completed: data.completed + item.count,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        completed: data.completed - item.count,
      }));
    }
  };

  return (
    <div className="mb-6 break-inside-avoid last:mb-0">
      <div className="flex justify-between items-center p-4 ">
        <p className="font-bold text-neutral-900 capitalize">{category}</p>
        <p>{`${data.completed} / ${data.total}`}</p>
      </div>

      <ul className="bg-white shadow-sm rounded-2xl border-g">
        {data.items.map((item) => (
          <React.Fragment key={item.id}>
            <div key={item.id}>
              <li className="flex justify-between p-4">
                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      id={item.id}
                      type="checkbox"
                      className="sr-only peer"
                      onChange={(e) => handleOnChange(e, item)}
                    />
                    <span
                      tabIndex={0}
                      className="w-6 h-6 mr-3 rounded-full border shadow-sm flex items-center justify-center peer-checked:bg-blue-600 focus:outline-none focus:ring-2  focus:ring-blue-600/10 focus:border-blue-600/50 focus:border"
                    >
                      <CheckmarkIcon />
                    </span>
                    <p className="text-neutral-900 font-bold peer-checked:line-through peer-checked:text-neutral-400 peer-checked:font-normal">
                      {item.name}
                    </p>
                  </label>
                </div>

                <div className="flex">
                  <p className="ml-3">x</p>
                  <p className="ml-3">{item.count}</p>
                </div>
              </li>
            </div>
            <hr className="mx-4 last:hidden" />
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};
