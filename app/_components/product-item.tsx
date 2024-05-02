import { Prisma, Product } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice } from "../_helpers/price";
import { ArrowDown, ArrowDown01Icon } from "lucide-react";

interface ProductItemProps{
    product: Prisma.ProductGetPayload<{
        include : {
            restaurant:{
                select:{
                    name : true
                }
            }
            }     
    }>
}


const ProductItem = ({product}: ProductItemProps) => {
    return ( 
        <div className="space-y-2 w-[150px] min-w-[150px]">
            <div className="h-[150px] w-full relative">
                <Image src={product.imageUrl} alt={product.name} fill className="object-cover rounded-lg shadow-md" />
                {product.discountPercentage && (
                    <div className="flex gap-1 items-center absolute top-2 left-2 bg-primary px-2 py-[2px] rounded-full text-white">
                        <ArrowDown size={12} />
                        <span className="font-semibold">{product.discountPercentage}%</span>
                    </div>
                )}
            </div>
            <div>

            <h2 className="text-sm truncate">{product.name}</h2>
            <div className="flex gap-1 items-center">
                <h3 className="font-semibold">{Intl.NumberFormat("pt-BR",{
                    currency: "BRL",
                    minimumFractionDigits: 2,
                }).format(Number(calculateProductTotalPrice(product)))}
                </h3>
                {
                    product.discountPercentage > 0 && (
                        <span className="line-through text-xs text-muted-foreground">{Intl.NumberFormat("pt-BR",{
                            style: "currency",
                            currency: "BRL"
                        }).format(Number(product.price))}</span>
                    )
                }   

                
            </div>
            <span className="text-xs text-muted-foreground block">{product.restaurant.name}</span>
            </div>
        </div>
     );
}
 
export default ProductItem;