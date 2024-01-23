const getError = (err) => {
    return err.message && err.response.data.message ? err.response.data.message : err.message
};

const addToCartHandler = () => {

}

export { getError, addToCartHandler };