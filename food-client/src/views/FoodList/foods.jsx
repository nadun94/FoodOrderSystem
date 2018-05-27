import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, FormGroup, Label, Input
} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import '../../assets/css/foodStyle.css'
import { Table } from 'reactstrap';
import UniqeIdMixin from 'unique-id-mixin';
export default class FoodList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            foodArray: [],
            qty: [],
            cart: [{
                'foodName': '',
                'price': '',
                'qty': '',
                'subTotal': '',

            }],

        }

        this.generateFoodList = this.generateFoodList.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);


    }

    componentDidMount() {

        fetch('/hi')
            .then(res => res.json())
            .then(data => {
                this.setState({ foodArray: data["data"] })
            })

    }
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    handleClick(index, event) {
        var qty = this.state.qty.slice(); // Make a copy of the emails first.
        qty[index] = event.target.value; // Update it with the modified email.
        this.setState({qty: qty}); // Update the state.
    }
    yourFoodList() {


    }
    addToCart(item) {
        alert(this.state.qty[item.id - 1])
        // this.setState({
        //         cart:{...this.state.cart,'foodName':item.foodName,'price':item.price,'qty':this.state.qty[item.id],'subTotal':5}
        // }) 
        console.log(this.state.cart)
        // alert(this.sate.cart)
    }


    generateFoodList() {
var x;
        return (
            <ul className="mainGrid">
                {
                    this.state.foodArray.map(foodItem =>
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
                                                onChange={this.handleClick.bind(this, (foodItem.id-1))}
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
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </Table>

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