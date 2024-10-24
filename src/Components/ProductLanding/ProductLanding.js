import { useEffect,useState } from 'react';
import ProductLanding1 from './ProductLanding1'
import Theme2ProductLanding1 from './Theme2/ProductLanding1'

const ProductLanding=()=>{
    const { product, store: fetchedStore } = localStorage.getItem('product') || {};
    const [store, setStore] = useState(() => {
        const storeData = localStorage.getItem('store');
        return fetchedStore || (storeData ? JSON.parse(storeData) : null);
    });
    const ProductLandingProps={product,store,setStore}   
    switch(store.activeTheme){
        case 1:
            return <ProductLanding1 ProductLandingProps={ProductLandingProps}/>
        case 2:
            return <Theme2ProductLanding1 ProductLandingProps={ProductLandingProps}/>

    } 
}
export default ProductLanding;