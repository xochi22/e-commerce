import { useEffect, useState } from "react"
import { addToCart, getAllProducts, getProductsByCategory } from "../../API/Api"
import {List, Card, Image, Typography, Badge, Rate, Button, message, Spin, Select} from 'antd';
import { useParams } from "react-router-dom";


function Products(){

const [loading, setLoading] = useState(false)

const param = useParams()

const [items, setItems] = useState([])

const [sortOrder, setSortOrder] = useState('az')

    useEffect(()=>{
    setLoading(true);
    (param?.CategoryId?getProductsByCategory(param.CategoryId):getAllProducts())
    .then((res)=>{
     setItems(res.products)
     setLoading(false)
    })
    },[param])

    const getSortedItems=()=>{
    const sortedItems = [...items]
    sortedItems.sort((a,b)=>{
        const aLowerCaseTitle = a.title.toLowerCase()
        const bLowerCaseTitle = b.title.toLowerCase()
    
        if(sortOrder === 'az'){
            return aLowerCaseTitle > bLowerCaseTitle ? 1: aLowerCaseTitle === bLowerCaseTitle ? 0:-1
        }

        else if(sortOrder === 'za'){
            return aLowerCaseTitle < bLowerCaseTitle ? 1: aLowerCaseTitle === bLowerCaseTitle ? 0:-1
        }

       else if(sortOrder === 'lowHigh'){
            return a.price > b.price ? 1: a.price === b.price ? 0:-1
        }

       else if(sortOrder === 'highLow'){
            return a.price < b.price ? 1: a.price === b.price ? 0:-1
        }
    })
    return sortedItems;
    }

    return(
        <div className="productContainer">
        <div>
        <Typography.Text>View Items Sorted By: </Typography.Text>
        <Select
        onChange={(value)=>{
         setSortOrder(value)
        }}
        defaultValue={"az"}
        options={[
        {
          label:"Alphabetically A-Z",
          value:"az"
        },

        {
            label:"Alphabetically Z-A",
            value:"za"
        },

        {
            label:"Price Low to High",
            value:"lowHigh"
          },

          {
            label:"Price High to Low",
            value:"highLow"
          }, 
        ]}
        ></Select>
        </div>
       <List 
       loading={loading} 
       grid={{column: 3}}
       renderItem={(product, index)=>{
        return(
        
        <Badge.Ribbon  className="itemCardBadge" text={`${product.discountPercentage}% off`} color={"pink"}>
         <Card 
         className="itemCard"
         title={product.title} 
         key={index} 
         cover={<Image className="styleImage" 
         src={product.thumbnail}/>}
         actions={[
         <Rate disabled allowHalf value={ product.rating}/>, <AddToCartButton item={product}/>
         ]}
         >

        <Card.Meta title={<Typography.Paragraph>
            price:${product.price}{''}
            <Typography.Text delete type="danger">
                $
                {parseFloat(product.price + (product.price*product.discountPercentage)/100).toFixed(2)}
            </Typography.Text>
        </Typography.Paragraph>}
        
        description={<Typography.Paragraph ellipsis={{rows:2, expandable:true, symbol:'more'}}>
            {product.description}</Typography.Paragraph>}>

        </Card.Meta>
         </Card>
         </Badge.Ribbon>
        )
       }} dataSource={getSortedItems()}></List>
        </div>
    )

}

function AddToCartButton({item}){

    const [loading, setLoading] = useState(false)

    const addProductToCart=()=>{
        setLoading(true)
        addToCart(item.id).then((res)=>{
          message.success(`${item.title} has been added to your Cart!`)  
        })
        setLoading(false)
    }

return(
 <Button type="Link" 
 onClick={addProductToCart}
 loading={loading}
 > Add to Cart </Button>
    )
}

export default Products;