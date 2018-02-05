/**
 * 分类Tree
 */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './tmCategory.less'
import GeneralHead from '../GeneralHead/GeneralHead'
import { Tree } from 'antd';

const TreeNode = Tree.TreeNode;
const TmCategory = ({ treeData, searchData, updateExpandedKeys, expandedKeys }) => {
  const onExpand = (expandedKeys) => {
    updateExpandedKeys(expandedKeys);
  }
  const onSelect = (selectedKeys, info) => {
    searchData(selectedKeys[ 0 ]);
  }
  const loop = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode key={ item.id } title={ item.text }>
          { loop(item.children) }
        </TreeNode>
      );
    }
    return <TreeNode key={ item.id } title={ item.text }/>;
  });
  
  return (
    <div className={ styles.tmCategory }>
      <GeneralHead showIcon={ false } title={ treeData.TitleNav }></GeneralHead>
      <div className="border-base">
        <Tree
          onExpand={ onExpand } expandedKeys={ expandedKeys }
          onSelect={ onSelect }
          autoExpandParent={ false }
        >
          { loop(treeData.ListData) }
        </Tree>
      </div>
    </div>
  )
}


TmCategory.propTypes = {
  treeData: PropTypes.object,
  searchData: PropTypes.func,
  updateExpandedKeys: PropTypes.func,
  expandedKeys: PropTypes.array,
};
export default TmCategory;
