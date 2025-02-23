import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";

export default function DeleteProductPage() {
    const router = useRouter();
    const [productInfo, setProductInfo] = useState();
    const { id } = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/products?id=' + id).then(response => {
            setProductInfo(response.data);
        });
    }, [id]);
    function goBack() {
        router.push('/products');
    }
    async function deleteProduct(){
        await axios.delete('/api/products?id='+id)
    }
    return (
        <Layout>
            <h1>do you really want to delete this
                &nbsp;"{productInfo.title}?"
            </h1>
            <div className="flex gap-2 justify-center">
                <button 
                onClick={DeleteProductPage()}
                className="btn-red">Yes</button>
                <button className="btn-default" onClick={goBack}>NO</button>
            </div>
        </Layout>
    );
}