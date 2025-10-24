const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootValue = null;
  }

  root() {
    return this.rootValue;
  }

  add(value) {
    const node = new Node(value);
    if (!this.rootValue) {
      this.rootValue = node;
      return;
    }

    let curNode = this.rootValue;
    while (curNode) {
      if (curNode.data === node.data) {
        return;
      }
      if (node.data < curNode.data) {
        if (!curNode.left) {
          curNode.left = node;
          return;
        }
        curNode = curNode.left;
      } else {
        if (!curNode.right) {
          curNode.right = node;
          return;
        }
        curNode = curNode.right;
      }
    }
  }

  has(value) {

    return searchNode(this.rootValue, value);

    function searchNode(node, data) {
      if (!node) return false;

      if (data === node.data) return true;

      if (data < node.data) {
        return searchNode(node.left, value);
      } else {
        return searchNode(node.right, value);
      }
    }
  }

  find(value) {
    return searchNode(this.rootValue, value);

    function searchNode(node, data) {
      if (!node) return null;

      if (data === node.data) return node;

      if (data < node.data) {
        return searchNode(node.left, value);
      } else {
        return searchNode(node.right, value);
      }
    }
  }

  remove(data) {
    this.rootValue = removeValue(this.rootValue, data);

    function removeValue(node, value) {
      if (!node) {
        return null;
      }

      if (node.data === value) {
        if (!node.right && !node.left) {
          return null;
        } else if (!node.right) {
          node = node.left;
          return node;
        } else if (!node.left) {
          node = node.right;
          return node;
        } else {
          let maxFromLeft = node.left;

          while (maxFromLeft.right) {
            maxFromLeft = maxFromLeft.right;
          }

          node.data = maxFromLeft.data;

          node.left = removeValue(node.left, maxFromLeft.data);

          return node;
        } 
      } else if (value < node.data) {
        node.left = removeValue(node.left, data);
        return node;
      } else {
        node.right = removeValue(node.right, data);
        return node;
      }
    }
  }

  min() {
    return findMin(this.rootValue);

    function findMin(node) {
      if (!node.left) return node.data;

      if (node.left) return findMin(node.left);
    }
  }

  max() {
    return findMin(this.rootValue);

    function findMin(node) {
      if (!node.right) return node.data;

      if (node.right) return findMin(node.right);
    }
  }
}

module.exports = {
  BinarySearchTree
};