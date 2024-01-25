import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const DescriptionPage = () => {
    const params = useParams();
    const { token } = params;
    const navigate = useNavigate();

    return (
        <div>DescriptionPage</div>
    )
}

export default DescriptionPage