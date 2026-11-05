const { NotImplementedError } = require('../lib');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    if (!this.rootNode) {
      this.rootNode = newNode;
      return;
    }

    let currentNode = this.rootNode;

    while(currentNode) {
      if (newNode.data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  find(data) {
    if (!this.rootNode) return null;
    let currentNode = this.rootNode;
    while (currentNode) {
      if (data === currentNode.data) return currentNode;
      if (data < currentNode.data) {
        if (!currentNode.left) return null;
        currentNode = currentNode.left;
      }
      if (data > currentNode.data) {
        if (!currentNode.right) return null;
        currentNode = currentNode.right;
      }
    }
  }

  has(data) {
    return Boolean(this.find(data));
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  removeNode(node, data) {
    if (!node) return;
    if (data === node.data) {
      if (!node.left && !node.right) return;
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      let tempNode = this.minNode(node.right);
      node.data = tempNode.data;
      node.right = this.removeNode(node.right, tempNode.data)
      return node;
    }
    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    }
    if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    }
  }

  minNode(node) {
    if (!node.left) return node;
    else return this.minNode(node.left);
  }

  min() {
    let currentNode = this.rootNode;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    let currentNode = this.rootNode;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};
