import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";

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
    })

    if(!product){
        return notFound();
    }
    return ( 
        <div>
            <ProductImage product={product}/>
            <div className="p-5">
                    <div className="flex items-center gap-[0.375rem]">
                        <div className="relative h-6 w-6">
                            <Image src={product.restaurant.imageUrl} width={32} alt={product.restaurant.name} height={32} className="rounded-full object-cover" />
                        </div>
                        <span>{product.restaurant.name}</span>
                    </div>
                    
                </div>
        </div>
     );
}

export default ProductPage ;