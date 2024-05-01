import Image from "next/image";
import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/categoryList";

export default function Home() {
  return <>
    <Header />
    <div className="pt-6 px-5">
      <Search />
    </div>
    
    <div className="pt-6 px-5">
      <CategoryList />
    </div>
  </>
}
