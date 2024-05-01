import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
    const categories = db.category.findMany({}) ;

    return (
        
        <div className="grid grid-cols-2 gap-3">
            {(await categories).map(e=> <CategoryItem key={e.id} category={e} />)}
        </div>
    );
}
 
export default CategoryList;