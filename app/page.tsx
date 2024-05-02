import Image from "next/image";
import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/categoryList";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";

const Home = async ()=> {

  const products = db.product.findMany({
    where:{
        discountPercentage:{
            gt: 0
        }
    },
    take: 10,
    include:{
        restaurant : {
            select : {
                name: true,
            }
        }
    }
})
  return  <>
  <Header />
  <div className="pt-6 px-5">
    <Search />
  </div>
  
  <div className="pt-6 px-5">
    <CategoryList />
  </div>

  <div className="pt-6 px-5">
    <Image src="/promo-banner-01.png" alt="Promo-banner" width={0} height={0} sizes="100vw" quality={100}
      className="h-auto w-full object-contain"
    />
  </div>

  <div className="pt-6 space-y-4">
    <div className="px-5 flex items-center justify-between">
      <h2 className="font-semibold" >Pedidos Recomendados</h2>
      <Button variant="ghost" className="text-primary p-0 hover:bg-transparent h-fit">Ver Todos
      <ChevronRightIcon/>
      </Button>
    </div>
    <ProductList products={products}/>
  </div>
</>;
}
export default Home;