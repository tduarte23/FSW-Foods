import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";
import ProductItem from "./product-item";

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

const ProductList = async ({products}:ProductItemProps) => {

    
    return ( 
        <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden pt-6 px-5 gap-4">
            {(await products).map(i => <ProductItem key={i.id} product={i} />)}</div>
     );
}
 
export default ProductList;