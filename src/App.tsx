import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import View from "./components/View";
import AvatarImage from "./assets/avatar.png";
import { ShareIcon } from "./components/Icons/ShareIcon";
import { FacebookIcon } from "./components/Icons/FacebookIcon";
import { TwitterIcon } from "./components/Icons/TwitterIcon";
import { List } from "./components/List";
import { useMemo } from "react";

const apiUrl = import.meta.env.VITE_API_URI;

export interface Item {
  id: string;
  category: string;
  name: string;
  count: number;
}

export interface CategoryData {
  items: Item[];
  total: number;
  completed: number;
}

export interface Dict {
  [key: string]: CategoryData;
}

const decorateData = (data: Item[] | undefined) => {
  if (!data) return {};

  return data.reduce((dict, item) => {
    if (!dict[item.category]) {
      dict[item.category] = { items: [], total: 0, completed: 0 };
    }
    dict[item.category].items.push(item);
    dict[item.category].total += item.count;

    return dict;
  }, {} as Dict);
};
function App() {
  const query = useQuery<Item[]>({
    queryKey: ["data"],
    queryFn: () => axios.get(apiUrl).then((response) => response.data),
  });

  const decoratedData = useMemo(() => decorateData(query.data), [query.data]);

  return (
    <View query={query}>
      <div className="max-w-2xl mx-auto py-14 px-6 min-h-screen">
        <header className="text-center mb-6">
          <img
            src={AvatarImage}
            className="mx-auto rounded-full max-h-14 mb-6"
          />
          <h1>Home</h1>
          <p className="mb-6 ">Created 2 days ago</p>
          <button className="w-11 h-11 mx-auto">
            <ShareIcon />
          </button>
        </header>
        <main className="columns-1 2xl:columns-2 gap-6 mb-14">
          {Object.entries(decoratedData)
            .sort()
            .map(([category, categoryData]) => (
              <List
                key={category}
                category={category}
                categoryData={categoryData}
              />
            ))}
        </main>
        <footer className="text-center">
          <p className="mb-3">Follow us</p>
          <div className="flex justify-center items-center">
            <a
              href="https://www.facebook.com/avantarte/"
              className="size-9 mr-3"
            >
              <FacebookIcon />
            </a>
            <a href="https://x.com/avant_arte?s=20" className="size-9">
              <TwitterIcon />
            </a>
          </div>
        </footer>
      </div>
    </View>
  );
}

export default App;
