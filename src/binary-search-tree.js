const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    const newNode = new TreeNode(data);
    if (!this.treeRoot){
      this.treeRoot = newNode;
      return;
    }  
    let currNode = this.treeRoot;
    while(currNode) {
      if(newNode.data < currNode.data) {
        if (!currNode.left) {
          currNode.left = newNode;
          return;
        }
        currNode = currNode.left;
      } else {
        if (!currNode.right) {
          currNode.right = newNode;
          return;
        }
        currNode = currNode.right;
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    if (!this.treeRoot){
      return null;
    }  
    let currNode = this.treeRoot;
    while(currNode) {
      if (data === currNode.data)
        return currNode;
      if (data < currNode.data){
        if (!currNode.left)
          return null;
        currNode = currNode.left;
      }
      if (data > currNode.data){
        if (!currNode.right)
          return null;
        currNode = currNode.right;
      }
    }
  }

  remove(data) {
    this.treeRoot = this.removeNode(this.treeRoot, data);
  }

  removeNode(node, data) {
    if(!node){
      return;
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      if (!node.left && !node.right) {
        node = null;
        return node;
      }  
      if (!node.left) {
        node = node.right;
        return node;
      } else if (!node.right) {
        node = node.left;
        return node;
      } 
      let replaceNode = this.minNode(node.right);
      node.data = replaceNode.data;
      node.right = this.removeNode(node.right, replaceNode.data)
      return node;
    }
  }

  minNode(node) {
    if(!node.left)
      return node;
    else
      return this.minNode(node.left);
  }


  min() {
    if (!this.treeRoot){
      return null;
    }  
    let currNode = this.treeRoot;
    while(currNode) {
      if (!currNode.left)
        return currNode.data;
      currNode = currNode.left;
    }
  }

  max() {
    if (!this.treeRoot){
      return null;
    }  
    let currNode = this.treeRoot;
    while(currNode) {
      if (!currNode.right)
        return currNode.data;
      currNode = currNode.right;
    }
  }
}

module.exports = {
  BinarySearchTree
};