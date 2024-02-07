import React, { useEffect, useReducer, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import searchPageReducer from '../Reducers/searchPageReducer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError, getFilterURL } from '../utils';
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../actions';
import Title from '../Components/Shared/Title';
import { Button, Col, LinkContainer, Row } from '../imports';
import Rating from '../Components/Shared/Rating';
import Loading from '../Components/Shared/Loading';
import MessageBox from '../Components/Shared/MessageBox';
import Product from '../Components/HomePage/Product';

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
    const page = searchParams.get("page") || 1; //feels smelly...

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
    }, [category, order, page, price, query, rating]);

    return (
        <div>
            <Title title="Search Page" />
            <Row>
                <Col md={3}>
                    <h3>Categories:</h3>
                    <div>
                        <ul>
                            <li>
                                <Link
                                    className={"all" === category ? "text-bold" : ""} //doesn't work
                                    to={getFilterURL(search, { category: "all" })}
                                >
                                    Any
                                </Link>
                            </li>
                            {categories.map((categoryLocal) => (
                                <li key={categoryLocal}>
                                    <Link
                                        className={categoryLocal === category ? "text-bold" : ""}
                                        to={getFilterURL(search, { category: categoryLocal })}
                                    >
                                        {categoryLocal}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <h3>Price:</h3>
                    <div>
                        <ul>
                            <li>
                                <Link
                                    className={"all" === price ? "text-bold" : ""} //doesn't work
                                    to={getFilterURL(search, { price: "all" })}
                                >
                                    Any
                                </Link>
                            </li>
                            {prices.map((priceLocal) => (
                                <li key={priceLocal.value}>
                                    <Link
                                        className={priceLocal.value === price ? "text-bold" : ""}
                                        to={getFilterURL(search, { price: priceLocal.value })}
                                    >
                                        {priceLocal.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <h3>Reviews:</h3>
                    <div>
                        <ul>
                            <li>
                                <Link
                                    className={"all" === rating ? "text-bold" : ""} //doesn't work
                                    to={getFilterURL(search, { price: "all" })}
                                >
                                    Any
                                </Link>
                            </li>
                            {ratings.map((ratingLocal) => (
                                <li key={ratingLocal.rating}>
                                    <Link
                                        className={ratingLocal.rating === rating ? "text-bold" : ""}
                                        to={getFilterURL(search, { rating: ratingLocal.rating })}
                                    >
                                        {ratingLocal.name}
                                        <Rating rating={ratingLocal.rating} caption={" "} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Col>
                <Col md={9}>
                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <>
                            <Row>
                                <Col md={6}>
                                    <div>
                                        {countProducts === 0 ? "No" : countProducts} Results
                                        {query !== "all" && " : " + query}
                                        {category !== "all" && " : " + category}
                                        {price !== "all" && " : Price " + price}
                                        {rating !== "all" && " : Rating" + rating + " & up"}
                                        {query !== "all" ||
                                            category !== "all" ||
                                            price !== "all" ||
                                            rating !== "all" ? (
                                            <Button
                                                variant="light"
                                                onClick={() =>
                                                    navigate(
                                                        getFilterURL(search, {
                                                            query: "all",
                                                            category: "all",
                                                            price: "all",
                                                            rating: "all",
                                                            order: "newest",
                                                            page: 1,
                                                        })
                                                    )
                                                }
                                            >
                                                <i className="fas fa-times-circle" />
                                            </Button>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col className="text-end">
                                    Sort by{" "}
                                    <select
                                        value={order}
                                        onChange={(e) => {
                                            navigate(getFilterURL(search, { order: e.target.value }));
                                        }}
                                    >
                                        <option value="newest">Newest Arrivals</option>
                                        <option value="lowest">Price: Low to High</option>
                                        <option value="highest">Price: High to Low</option>
                                        <option value="toprated">Customer Reviews</option>
                                    </select>
                                </Col>
                            </Row>
                            {products.length === 0 && (
                                <MessageBox>No Product Found</MessageBox>
                            )}
                            <Row>
                                {products.map((product) => (
                                    <Col sm={6} lg={4} className="mb-3" key={product._id}>
                                        <Product product={product}></Product>
                                    </Col>
                                ))}
                            </Row>

                            <div>
                                {[...Array(pages).keys()].map((x) => (
                                    <LinkContainer
                                        key={x + 1}
                                        className="mx-1"
                                        to={{
                                            pathname: "/search",
                                            search: getFilterURL(search, { page: x + 1 }, true),
                                        }}
                                    >
                                        <Button
                                            className={
                                                Number(page) === x + 1 ? "highlight-current-page" : ""
                                            }
                                            variant="light"
                                        >
                                            {x + 1}
                                        </Button>
                                    </LinkContainer>
                                ))}
                            </div>
                        </>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default SearchPage