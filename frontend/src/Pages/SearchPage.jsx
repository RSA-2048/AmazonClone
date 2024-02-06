import React, { useEffect, useReducer, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import searchPageReducer from '../Reducers/searchPageReducer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError, getFilterURL } from '../utils';
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../actions';
import Title from '../Components/Shared/Title';
import { Col, Row } from '../imports';

const prices = [
    { name: "$1-$50", value: "1-50" },
    { name: "$51-$200", value: "51-200" },
    { name: "$201-$1000", value: "201-1000" },
]; //maybe add 1000+

const ratings = [
    { name: "4 stars and up", rating: 4 },
    { name: "3 stars and up", rating: 3 },
    { name: "2 stars and up", rating: 2 },
    { name: "1 star and up", rating: 1 },
];

const SearchPage = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const category = searchParams.get("category") || "all";
    const query = searchParams.get("query") || "all";
    const price = searchParams.get("price") || "all";
    const rating = searchParams.get("rating") || "all";
    const order = searchParams.get("order") || "newest";
    const page = searchParams.get("page") || 1;

    const [{ loading, error, products, pages, countProducts }, dispatch] =
        useReducer(searchPageReducer, { loading: true, error: "" });

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await axios.get("/api/v1/products/categories");
                setCategories(data);
            } catch (error) {
                toast.error(getError(error));
            }
        };
        getCategories();
    }, []);

    useEffect(() => {
        const getProducts = async () => {
            try {
                dispatch({ type: GET_REQUEST });
                const { data } = await axios.get(
                    `/api/v1/products/search?category=${category}&query=${query}&price=${price}&rating=${rating}&order=${order}&page=${page}`
                );
                dispatch({ type: GET_SUCCESS, payload: data });
            } catch (error) {
                dispatch({ type: GET_FAIL, payload: getError(error) });
            }
        };
        getProducts();
    }, []);



    return (
        <div>
            <Title title="Search Page" />
            <Row>
                <Col md={3}>
                    <h3>Categories:</h3>
                    <div>
                        <ul>
                            <li>
                                <Link className={"all" === category ? "text-bold" : ""} to={getFilterURL(search, { category: "all" })}>Any</Link>
                            </li>
                            {categories.map((category => (
                                <li key={category}>
                                    <Link className={"category" === category ? "text-bold" : ""} to={getFilterURL(search, { category: category })}>{category}</Link>
                                </li>
                            )))}
                        </ul>
                    </div>
                </Col>
                <Col md={9}></Col>
            </Row>
        </div>
    )
}

export default SearchPage