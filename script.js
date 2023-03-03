//Node factory function
let Node = (input, left = null, right = null) => {
    let value = input || null;
    let leftNode = left;
    let rightNode = right;

    return {
        value,
        leftNode,
        rightNode
    };
}

//Build tree with recursive function
function buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    let midPoint = parseInt((start + end) / 2);
    let newNode = Node(array[midPoint]);

    newNode.leftNode = buildTree(array, start, midPoint - 1);
    newNode.rightNode = buildTree(array, midPoint + 1, end);
    return newNode;
}

//Tree factory function
let Tree = (array) => {
    array = [...new Set(array.sort((a, b) => a - b))];
    let root = buildTree(array);

    let insert = (input, currentNode = root) => {
        if (currentNode === null) {
            currentNode = Node(input);
            return currentNode;
        }

        if (input > currentNode.value) {
            currentNode.rightNode = insert(input, currentNode.rightNode);
        }

        else if (input < currentNode.value) {
            currentNode.leftNode = insert(input, currentNode.leftNode);
        }

        return currentNode;
    }

    let deleteValue = (input, currentNode = root, previousNode = null) => {
        if (currentNode === null) return;

        if (input > currentNode.value) {
            currentNode.rightNode = deleteValue(input, currentNode.rightNode, currentNode);
        }

        else if (input < currentNode.value) {
            currentNode.leftNode = deleteValue(input, currentNode.leftNode, currentNode);
        }

        else {
            if (currentNode.leftNode === null) {
                return currentNode.rightNode;
            }
            else if (currentNode.rightNode === null) {
                return currentNode.leftNode;
            }

            currentNode.value = minValue(currentNode.rightNode);
            currentNode.rightNode = deleteValue(currentNode.value, currentNode.rightNode);
        }

        return currentNode;
    }

    let minValue = (currentNode) => {
        let minV = currentNode.value;
        while (currentNode.leftNode != null) {
            minV = currentNode.leftNode.value;
            currentNode = currentNode.leftNode
        }
        return minV;
    }

    let find = (input, currentNode = root) => {
        if (currentNode === null || currentNode.value === input) return currentNode;

        if (input > currentNode.value) {
            return find(input, currentNode.rightNode);
        }

        else if (input < currentNode.value) {
            return find(input, currentNode.leftNode);
        }
    }

    let levelOrder = (currentNode = root, queue = [], array = []) => {
        array.push(currentNode);
        if (currentNode === null) return;

        if (currentNode.leftNode !== null) {
            queue.push(currentNode.leftNode);
        }

        if (currentNode.rightNode !== null) {
            queue.push(currentNode.rightNode);
        }

        while (queue.length) {
            let level = queue[0];
            queue.shift();
            levelOrder(level, queue, array);
        }

        return array;
    }

    let inorder = (currentNode = root, array = []) => {
        if (currentNode === null) return;
        inorder(currentNode.leftNode, array);
        array.push(currentNode);
        inorder(currentNode.rightNode, array);
        return array;
    }

    let preorder = (currentNode = root, array = []) => {
        if (currentNode === null) return;
        array.push(currentNode);
        preorder(currentNode.leftNode, array);
        preorder(currentNode.rightNode, array);
        return array;
    }

    let postorder = (currentNode = root, array = []) => {
        if (currentNode === null) return;
        postorder(currentNode.leftNode, array);
        postorder(currentNode.rightNode, array);
        array.push(currentNode);
        return array;
    }

    let height = (currentNode = root, count = 0) => {
        if (currentNode === null) return 0;

        return Math.max(height(currentNode.leftNode), height(currentNode.rightNode)) + 1;
    }

    let depth = (input, currentNode = root, count = 0) => {
        if (currentNode === null || currentNode.value === input) return count += 1;

        if (input > currentNode.value) {
            return depth(input, currentNode.rightNode, count += 1);
        }

        else if (input < currentNode.value) {
            return depth(input, currentNode.leftNode, count += 1);
        }
    }

    let isBalanced = (currentNode = root) => {
        let leftHeight = height(currentNode.leftNode);
        let rightHeight = height(currentNode.rightHeight);

        if (Math.abs(leftHeight - rightHeight) < 2) return true;
        return false;
    }

    let rebalance = () => {
        let array = levelOrder();
        let valueArray = [];
        array.forEach((item) => {
            valueArray.push(item.value);
        })
        valueArray = [...new Set(valueArray.sort((a, b) => a - b))];
        return root = buildTree(valueArray);
    }

    return {
        get root() {
            return root;
        },
        insert,
        deleteValue,
        minValue,
        find,
        levelOrder,
        inorder,
        preorder,
        postorder,
        height,
        depth,
        isBalanced,
        rebalance
    }
}

//Console.log the binary tree
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.rightNode !== null) {
        prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.leftNode !== null) {
        prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

//Testing
let array = [7, 6, 2, 5, 3, 10, 1, 5, 13, 21, 18, 23, 14, 32]
let binaryTree = Tree(array);
// prettyPrint(binaryTree.root);
// prettyPrint(binaryTree.insert(17));
// prettyPrint(binaryTree.deleteValue(7));
binaryTree.insert(33);
binaryTree.insert(34);
binaryTree.insert(35);
console.log(binaryTree.isBalanced());
binaryTree.rebalance();
console.log(binaryTree.isBalanced());
prettyPrint(binaryTree.root)

