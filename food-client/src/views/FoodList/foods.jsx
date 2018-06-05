import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, FormGroup, Label, Input
} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import '../../assets/css/foodStyle.css'
import { Table } from 'reactstrap';
import UniqeIdMixin from 'unique-id-mixin';
import MdClear from 'react-icons/lib/md/clear';
import { task } from 'react-task';
import axios from 'axios';
export default class FoodList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            foodArray: [],
            qty: [],
            cart: [],
            fullCart: [],
            i: 0,
            totalPrice: 0,
            showphone: false,
            pin: null,
            phone: null,
            originalPin: null,
            list_to_send_db:[],
        }
        this.generateFoodList = this.generateFoodList.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChangetxt = this.handleChangetxt.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.calcTotal = this.calcTotal.bind(this);
        this.calcTotalAferDel = this.calcTotalAferDel.bind(this);
        this.geneateFoodListTable = this.geneateFoodListTable.bind(this);
        this.showPhone = this.showPhone.bind(this);
        this.hidePhone = this.hidePhone.bind(this);
        this.PurchaseByPhone = this.PurchaseByPhone.bind(this);
        this.getPin = this.getPin.bind(this);
        




    }

    componentDidMount() {

        fetch('/hi')
            .then(res => res.json())
            .then(data => {
                this.setState({ foodArray: data["data"] })
            })

    }
    //send phone number to get pin
    getPin() {
        alert(this.state.phone)
        if (this.state.phone !=null) {
            var self = this;
            axios.post('/get-pin', {
                phone: this.state.phone,
            })
                .then(function (res) {
                    console.log(res.data);
                    //   sessionStorage.setItem('loging_status',res.data.loging_status)
                    this.setState({ originalPin: res.data.oriPin })
                    alert('success')

                }).catch(function (error) {
                    console.log(error);
                });

        }

    }
    //pay by phone
  async  PurchaseByPhone() {
      await this.state.fullCart.map((item) => {
        this.state.list_to_send_db.push({"foodName":item.foodName,"qty":item.qty,"subTotal":item.subTotal})
      })

      
        if (this.state.pin == this.state.originalPin) {
            if (this.state.totalPrice != null) {
                var self = this;
                axios.post('/add-order-by-phone', {
                    list:this.state.list_to_send_db,
                    totalPrice: this.state.totalPrice,
                    payment_method:"pay_by_phone",
                    pay_by_phone:{
                        phone:this.state.phone,
                        pin:this.state.pin
                    }
                 
                })
                    .then(function (res) {
                        console.log(res.data);
                        //   sessionStorage.setItem('loging_status',res.data.loging_status)

                    }).catch(function (error) {
                        console.log(error);
                    });

            }
        }
        else {
            alert('Your pin is incorrect. Try again.')
        }

    }
    showPhone() {
        const { showphone } = this.state;
        this.setState({ showphone: true })
    }
    hidePhone() {
        const { showphone } = this.state;
        this.setState({ showphone: false })
    }
    componentWillMount() {
        this.generateFoodList()
    }
    handleClick(index, event) {
        var qty = this.state.qty.slice();
        qty[index] = event.target.value;
        this.setState({ qty: qty });
    }
    handleChangetxt(event){
        this.setState({value: event.target.value});
    }
    async removeFromCart(a) {
        var ind = this.state.fullCart.indexOf(a);
        this.state.fullCart.splice(ind, 1);
        await this.calcTotalAferDel()

    }
    async calcTotalAferDel() {
        var temp = 0;
        this.state.fullCart.map((item) => {
            temp += item.subTotal
            
        }

        )


        await this.setState({ totalPrice: temp });
        this.generateFoodList()
    }
    calcTotal(j) {
        const { totalPrice } = this.state;
        var tt = this.state.fullCart[j - 1].subTotal + this.state.totalPrice;
        this.setState({ totalPrice: tt })
    }
    async addToCart(item) {
        var j = ++this.state.i;
        var tempQty = this.state.qty[item.id - 1]
        await this.setState({ cart: { index: j, foodName: item.foodName, price: item.price, qty: tempQty, subTotal: (tempQty * item.price) } })

        await this.state.fullCart.push(this.state.cart)
        this.calcTotalAferDel();
    }
    geneateFoodListTable() {
        {
            return (
                this.state.fullCart.map(item =>
                    <tr>
                        <th scope="row">{item.index}</th>
                        <td>{item.foodName}</td>
                        <td>{item.price}</td>
                        <td>{item.qty}</td>
                        <td>{item.subTotal}</td>
                        <td><span id="remove"><MdClear size={24} color="red" onClick={this.removeFromCart.bind(item)} /></span></td>

                    </tr>
                )
            )
        }
    }

    generateFoodList() {
        return (
            <ul className="mainGrid">
                {
                    this.state.foodArray.map((foodItem) =>
                        <li key={foodItem.id} className="food-list-cards">
                            <div className="food-item">

                                <Card>
                                    {/* <CardImg top width="10%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
                                    <CardBody>
                                        <div className="space-f7or">
                                            <CardTitle><h4>{foodItem.foodName}</h4></CardTitle>
                                        </div>
                                        <div className="space-for">
                                            <CardSubtitle><h4>Rs {foodItem.price}</h4></CardSubtitle>
                                            <Input type="number" id={foodItem.id} placeholder="Enter quantity"
                                                name='qty'
                                                onChange={this.handleClick.bind(this, (foodItem.id - 1))}
                                            />
                                        </div>
                                        <div className="space-for">
                                            <Button color="primary" size="lg" onClick={this.addToCart.bind(this, foodItem)}>Add to List</Button>
                                        </div>
                                    </CardBody>
                                </Card>

                            </div>

                        </li>
                    )
                }
            </ul>
        )
    }
    render() {
        return (
            <div >
                <div className="mainGrid">
                    <div className="food-Order-cart">

                        <Card>
                            {/* <CardImg top width="10%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
                            <CardBody>
                                <div className="space-f7or">
                                    <CardTitle><h4 className="OrderListTitle">Your Food List</h4></CardTitle>
                                </div>

                                <Table borderless>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Food Name</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Sub Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.geneateFoodListTable()
                                        }

                                    </tbody>
                                </Table>
                                <h4> Total Price: {this.state.totalPrice}</h4>
                            </CardBody>
                        </Card>

                    </div>

                    {!this.state.showphone && <div className="food-Order-cart">

                        <Card>
                            {/* <CardImg top width="10%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
                            <CardBody>
                                <div className="space-f7or">
                                    <CardTitle><h4 className="OrderListTitle">Buy Your Food List</h4></CardTitle>
                                </div>
                                <div className="space-for">
                                    <Button color="danger" size="lg">Pay via Credit Card</Button>

                                </div>
                                <div className="space-for">
                                    <Button color="danger" size="lg" onClick={this.showPhone}>Pay via Dialog Mobile</Button>
                                </div>
                            </CardBody>
                        </Card>

                    </div>}

                    {/* pay by credit card */}

                    {this.state.showphone && <div className="food-Order-cart">

                        <Card>
                            <CardBody>
                                <div className="space-f7or">
                                    <CardTitle><h4 className="OrderListTitle">Pay via Dialog Mobile</h4></CardTitle>
                                </div>
                                <div className="space-for">
                                    <FormGroup>
                                        <Label for="phone">Phone Number</Label>
                                        <Input type="text" name="phone" value={this.state.phone} onChange={this.handleChangetxt}  placeholder="Enter your mobile phone number" />
                                    </FormGroup>
                                    <div className="space-for">
                                        <Button color="danger" size="lg" onClick={this.getPin}>Send PIN</Button>
                                    </div>
                                    <FormGroup>
                                        <Label for="pin">4 digit pin</Label>
                                        <Input type="number" name="pin" value={this.state.pin} onChange={this.handleChangetxt} placeholder="Enter your pin" />
                                    </FormGroup>
                                </div>
                                <div className="space-for">
                                    <Button color="danger" size="lg" onClick={this.PurchaseByPhone}>Purchase</Button>
                                    <Button color="primary" size="lg" onClick={this.hidePhone}>Go back</Button>
                                </div>
                            </CardBody>
                        </Card>

                    </div>}

                </div>
                <Col>
                    {this.generateFoodList()}
                </Col>

            </div>
        )
    }
}