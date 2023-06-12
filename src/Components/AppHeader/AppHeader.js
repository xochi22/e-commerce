import React, {useEffect, useState} from 'react';
import {Menu, Typography, Badge, Drawer, Table, InputNumber, Button, Form, Input, Checkbox, message} from 'antd';
import {HomeFilled, ShoppingCartOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getYourCart } from '../../API/Api';


function AppHeader(){
    const navigate = useNavigate();

    const onMenuClick = (item) => {
     navigate(`/${item.key}`)
    }

    return(
        <div className='AppHeader'>
        <Menu 
        className='menuTitle'
        onClick={onMenuClick}
        mode='horizontal'
        items={[

         {
         label:<HomeFilled/>,
         key:""
         },

         {
         label:"Men",
         key:"men",
         children:[

            {
            label:"Men's Shirts",
            key: "mens-shirts",  
            },

            {
            label:"Men's Shoes",
            key: "mens-shoes"  
            },

            {
            label:"Men's-Watches",
            key: "mens-watches"  
            },
         ],
         },

         {
         label:"Women",
         key:"women",
         children:[

            {
            label: "Women's-dresses",
            key: "womens-dresses"
            },

            {
            label: "Women's Shoes",
            key: "womens-shoes"
            },

            {
            label: "Women's Watches",
            key: "womens-watches"
            },

            {
            label: "Women's Bags",
            key: "womens-bags"
           },

           {
           label: "Women's Jewellery",
           key: "womens-jewellery"
            },

         ]
         },

         {
         label:"Fragrances",
         key: "fragrances"
         }

        ]}
        />
        <Typography.Title className='storeTitle'> Sochi's Store </Typography.Title>
        <CartBadge/>
        </div>
    )
}

function CartBadge(){

const [openDrawer, setOpenDrawer] = useState(false)
const [cartItems, setCartItems] = useState([])
const [checkItems, setCheckItems] = useState(false)

const onMenuBadge=()=>{
    setOpenDrawer(true)
   }
const onCheckItems =()=>{
    setCheckItems(true)
}

useEffect(()=>{
    getYourCart().then((res)=>{
     setCartItems(res.products)
    })
},[])

const onConfirmOrder =(values)=>{
 console.log({values});
 setOpenDrawer(false);
 setCheckItems(false);
 message.success("Your Order has been placed successfully!")
};




    return(
        <div className='badgeCart'>
         <Badge onClick={onMenuBadge} count={cartItems.length}>
        <ShoppingCartOutlined className='cartStyle'/>
        </Badge>
        <Drawer open={openDrawer} onClose={()=>{
            setOpenDrawer(false)
        }}
        title='Your Cart'
        contentWrapperStyle={{width:500}}
        >
        <Table
        pagination={false}
        columns={[
        {
         title:'Title',
         dataIndex:'title'      
      },

      {
        title:'Price',
        dataIndex:'price',
        render: (value) => {
            return(
                <span>${value}</span>
            )
        }     
     },

     {
        title:'Quantity',
        dataIndex:'quantity',
        render: (value, record)=>{
        return <InputNumber min={0} defaultValue={value} onChange={(value)=>{
        setCartItems((prev)=> prev.map((cart)=>{
        if (record.id === cart.id){
            cart.total = cart.price*value
        }
        return cart;
        }))
        }}></InputNumber>
        }      
     },

     {
        title:'Total',
        dataIndex:'total' ,
        render: (value) => {
            return(
                <span>${value}</span>
            )
        }          
     },
        ]}
        dataSource={cartItems}
        summary={(data)=>{
         const total = data.reduce((pre,current)=>{
            return pre+current.total 
         },0)
            return <span>Total:${total}</span>   
        }}
        />

     <Button onClick={onCheckItems}
      type='primary'> Check Your Cart</Button>
        </Drawer>
        <Drawer open={checkItems} onClose={()=>{
            setCheckItems(false)
        }}
        title="Confirm Order"
        >
        <Form onFinish={onConfirmOrder}>
    <Form.Item 
    rules={[
        {
        required:true,
        message:"Enter your name"
        }
    ]}
    label='Full name' name='full_name'>
    <Input placeholder='Enter full name'/>
    </Form.Item>

    <Form.Item 
    rules={[
        {
        required:true,
        message:"Enter a valid email",
        type:'email'
        }
    ]}
    label='Email' name='email'>
    <Input placeholder='Enter your email'/>
    </Form.Item>

    <Form.Item 
    rules={[
        {
        required:true,
        message:"Enter an address"
        }
    ]}
    label='Address' name='address'>
    <Input placeholder='Enter full address'/>
    </Form.Item> 
    <Form.Item>
        <Checkbox defaultChecked disabled>Cash on delivery</Checkbox>
        </Form.Item>
        <Typography.Paragraph type='secondary'>
        More methods coming soon
        </Typography.Paragraph>
<Button type='primary' htmlType='submit' onFinish={onConfirmOrder}> {""} Confirm Order</Button>     
        </Form>
        </Drawer>
        </div>
    )
}
export default AppHeader; 