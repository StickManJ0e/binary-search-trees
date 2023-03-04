import {Tree, prettyPrint} from './script';

console.log('hi')
let array = [7, 6, 2, 5, 3, 10, 1, 5, 13, 21, 18, 23, 14, 32]
let binaryTree = Tree(array);
prettyPrint(binaryTree.root);

// Testing
// let array = [7, 6, 2, 5, 3, 10, 1, 5, 13, 21, 18, 23, 14, 32]
// let binaryTree = Tree(array);
// prettyPrint(binaryTree.root);
// prettyPrint(binaryTree.insert(17));
// prettyPrint(binaryTree.deleteValue(7));
// binaryTree.insert(33);
// binaryTree.insert(34);
// binaryTree.insert(35);
// console.log(binaryTree.isBalanced());
// binaryTree.rebalance();
// console.log(binaryTree.isBalanced());
// prettyPrint(binaryTree.root)