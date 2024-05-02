interface ProductPageProps {
    params : {
        id: string
    }
}

const ProductPage = ({params :{id}}:ProductPageProps) => {
    return ( 
        <div>
            <h2>
                {id}
            </h2>
        </div>
     );
}

export default ProductPage ;