import { useNavigate } from "react-router-dom";

const BreadCrumb=({prodName,storeName})=>{
    const navigate=useNavigate();
    const handleNavigation=(e,nav)=>{
        e.preventDefault();
        if(nav==='Home'){
            navigate(`/store/${storeName}`)
        }else if(nav==="All"){
            navigate(`/store/products/${storeName}`)
        }
    }

    return (
        <div className="text-gray-400 font-light flex gap-2 mt-4 md:mt-10">
            <button onClick={e=>handleNavigation(e,'Home')}>Home</button>/
            <button onClick={e=>handleNavigation(e,"All")}>AllProducts</button>/
            <div>{prodName}</div>
        </div>
    )
}
export default BreadCrumb