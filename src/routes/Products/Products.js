import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import styles from './Products.less'
import ProductList from '../../components/ProductList'
function Products({dispatch, products,loading}) {
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id
    })
  }
  
  return (
    <div>
      <h2 className={styles.title}>产品列表</h2>
      <ProductList onDelete={handleDelete} products={products}></ProductList>
    </div>
  );
};

function mapStateToProps({products,loading}) {
  return {products,loading};
};
Products.propTypes = {
  dispatch: PropTypes.func,
  products: PropTypes.array,
  loading: PropTypes.object,
}
export default connect(mapStateToProps)(Products);
