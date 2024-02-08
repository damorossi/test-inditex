import React, { useEffect, useState } from 'react';

const ListComponent = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
      fetch('http://localhost:4001/products')
        .then(response => response.json())
        .then(data => setProducts(data));
    }, []);


	return (
		<>
			<section className="products-container">
				<div className="products-items">
					{!true ? (
                        <h3>cargando</h3>
					) : (
						products.map((item) => {
							return (
                                <h4>algo</h4> 
							);
						})
					)}
				</div>
			</section>
		</>
	);
};

export default ListComponent;
