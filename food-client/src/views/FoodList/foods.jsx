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
        }
        this.generateFoodList = this.generateFoodList.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.calcTotal = this.calcTotal.bind(this);
        this.calcTotalAferDel = this.calcTotalAferDel.bind(this);
        this.geneateFoodListTable = this.geneateFoodListTable.bind(this);
        
    }

    componentDidMount() {

        fetch('/hi')
            .then(res => res.json())
            .then(data => {
                this.setState({ foodArray: data["data"] })
            })

    }

    componentWillMount(){
        this.generateFoodList()
    }
    handleClick(index, event) {
        var qty = this.state.qty.slice();
        qty[index] = event.target.value;
        this.setState({ qty: qty });
    }
    async removeFromCart(a) {
        var ind = this.state.fullCart.indexOf(a);
        this.state.fullCart.splice(ind, 1);
        await this.calcTotalAferDel()

    }
    async calcTotalAferDel() {
        var temp = 0;
       this.state.fullCart.map( (item)=>{
        temp += item.subTotal
       }
   
       )
           
        
       await this.setState({totalPrice:temp});
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
geneateFoodListTable(){
    {
            return(
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
                <Col>
                    {this.generateFoodList()}
                </Col>

            </div>
        )
    }
}