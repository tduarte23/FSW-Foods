import { db } from "../_lib/prisma";
import ProductItem from "./product-item";

const ProductList = async () => {

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
    return ( 
        <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden pt-6 px-5 gap-4">
            {(await products).map(i => <ProductItem key={i.id} product={i} />)}</div>
     );
}
 
export default ProductList;