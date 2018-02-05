import React, { Component, Children } from 'react';
import PropTypes from 'prop-types'
import CourseOrderItem from './CourseOrderItem'

class CourseOrder extends Component {
  constructor(props) {
    super(props);
    const { activeKey, order, sort } = this.props;
    this.state = {
      activeKey: activeKey,
      sort: sort,
      order: order,
    };
  }
  
  onClickItem(key, or) {
    let activeKey = this.state.activeKey;
    activeKey = activeKey === key ? '' : key;
    if (!('activeKey' in this.props)) {
      this.setState({ activeKey });
    }
    
    let order = this.state.order;
    order = or ? or : order;
    if (!('order' in this.props)) {
      this.setState({ order });
    }
    
    let sort = key ? key : activeKey;
    
    this.props.onChange(activeKey, order, sort);
  }
  
  getItems() {
    const activeKey = this.state.activeKey;
    const newChildren = [];
    Children.forEach(this.props.children, (child, index) => {
      if (!child) return;
      // If there is no key provide, use the panel order as default key
      const key = child.key || String(index);
      // const {} = child.props;
      let isActive = activeKey === key;
      let order = isActive ? 'desc' : 'asc';
      const props = {
        isActive,
        name: child.props.name,
        onOrderClick: () => this.onClickItem(key, order),
      };
      
      newChildren.push(React.cloneElement(child, props));
    });
    
    return newChildren;
  }
  
  render() {
    return (
      <div>
        { this.getItems() }
      </div>
    )
  }
  
  componentWillMount() {
  }
  
  componentDidMount() {
  }
  
  componentWillReceiveProps(nextProps) {
    if ('activeKey' in nextProps) {
      this.setState({
        activeKey: nextProps.activeKey,
      });
    }
    if ('order' in nextProps) {
      this.setState({
        order: nextProps.order,
      });
    }
  }
  
  //在重新渲染过程开始前触发的。 这个函数默认返回true，可使React执行更新,来提升速度
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  
  componentWillUpdate(nextProps, nextState) {
  }
  
  componentDidUpdate(prevProps, prevState) {
  }
  
  componentWillUnmount() {
  }
}

CourseOrder.propTypes = {
  activeKey: PropTypes.string,
  order: PropTypes.string,
  sort: PropTypes.string,
  onChange: PropTypes.func,
}
CourseOrder.defaultProps = {
  onChange() {
  },
};
CourseOrder.Item = CourseOrderItem;
export default CourseOrder;
