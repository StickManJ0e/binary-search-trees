import {Tree, prettyPrint} from './script';

let array = [7, 6, 2, 5, 3, 10, 1, 5, 13, 21, 18, 23, 14, 32]
let binaryTree = Tree(array);

//Balanced Test
console.log(binaryTree.isBalanced());
console.log(binaryTree.levelOrder());
console.log(binaryTree.preorder());
console.log(binaryTree.postorder());
console.log(binaryTree.inorder());
prettyPrint(binaryTree.root);

//Unbalance tree
binaryTree.insert(101);
binaryTree.insert(102);
binaryTree.insert(103);
binaryTree.insert(104);
console.log(binaryTree.isBalanced());
binaryTree.rebalance();
console.log(binaryTree.isBalanced());
console.log(binaryTree.levelOrder());
console.log(binaryTree.preorder());
console.log(binaryTree.postorder());
console.log(binaryTree.inorder());
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