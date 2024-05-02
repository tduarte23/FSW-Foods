import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductDetails from "./_components/product-details";

interface ProductPageProps {
    params : {
        id: string
    }
}

const ProductPage = async ({params :{id}}:ProductPageProps) => {
    const product = await db.product.findUnique({
        where:{
            id,
        },
        include:{
            restaurant: true
        }
    });
    const juices = await db.product.findMany({
        where: {
          category: {
            name: "Sucos",
          },
          restaurant: {
            id: product?.restaurant.id,
          },
        },
        include: {
          restaurant: true,
        },
      });

    if(!product){
        return notFound();
    }
    return ( 
        <div>
            <ProductImage product={product}/>
            <div className="p-5">
                    <div className="flex items-center gap-[0.375rem]">
                       <ProductDetails product={product} complementaryProducts={juices} />
                    </div>
                    
                </div>
        </div>
     );
}

export default ProductPage ;