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
    return {
        root: buildTree(array),

        insert(input, currentNode = this.root) {
            if (currentNode === null) {
                currentNode = Node(input);
                return currentNode;
            }

            if (input > currentNode.value) {
                currentNode.rightNode = this.insert(input, currentNode.rightNode);
            }

            else if (input < currentNode.value) {
                currentNode.leftNode = this.insert(input, currentNode.leftNode);
            }

            return currentNode;
        },

        deleteValue(input, currentNode = this.root, previousNode = null) {
            if (currentNode === null) return;

            if (input > currentNode.value) {
                currentNode.rightNode = this.deleteValue(input, currentNode.rightNode, currentNode);
            }

            else if (input < currentNode.value) {
                currentNode.leftNode = this.deleteValue(input, currentNode.leftNode, currentNode);
            }

            else {
                if (currentNode.leftNode === null) {
                    return currentNode.rightNode;
                }
                else if (currentNode.rightNode === null) {
                    return currentNode.leftNode;
                }

                currentNode.value = this.minValue(currentNode.rightNode);
                currentNode.rightNode = this.deleteValue(currentNode.value, currentNode.rightNode);
            }

            return currentNode;
        },

        minValue(currentNode) {
            let minV = currentNode.value;
            while (currentNode.leftNode != null) {
                minV = currentNode.leftNode.value;
                currentNode = currentNode.leftNode
            }
            return minV;
        },

        find(input, currentNode = this.root) {
            if (currentNode === null || currentNode.value === input) return currentNode;

            if (input > currentNode.value) {
                return this.find(input, currentNode.rightNode);
            }

            else if (input < currentNode.value) {
                return this.find(input, currentNode.leftNode);
            }
        },

        levelOrder(currentNode = this.root, queue = [], array = []) {
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
                this.levelOrder(level, queue, array);
            }

            return array;
        },

        inorder(currentNode = this.root, array = []) {
            if (currentNode === null) return;
            this.inorder(currentNode.leftNode, array);
            array.push(currentNode);
            this.inorder(currentNode.rightNode, array);
            return array;
        },

        preorder(currentNode = this.root, array = []) {
            if (currentNode === null) return;
            array.push(currentNode);
            this.preorder(currentNode.leftNode, array);
            this.preorder(currentNode.rightNode, array);
            return array;
        },

        postorder(currentNode = this.root, array = []) {
            if (currentNode === null) return;
            this.postorder(currentNode.leftNode, array);
            this.postorder(currentNode.rightNode, array);
            array.push(currentNode);
            return array;
        },

        height(currentNode = this.root, count = 0) {
            if (currentNode === null) return 0;

            return Math.max(this.height(currentNode.leftNode), this.height(currentNode.rightNode)) + 1;
        },

        depth(input, currentNode = this.root, count = 0) {
            if (currentNode === null || currentNode.value === input) return count += 1;

            if (input > currentNode.value) {
                return this.depth(input, currentNode.rightNode, count += 1);
            }

            else if (input < currentNode.value) {
                return this.depth(input, currentNode.leftNode, count += 1);
            }
        },

        isBalanced(currentNode = this.root) {
            let leftHeight = this.height(currentNode.leftNode);
            let rightHeight = this.height(currentNode.rightNode);

            if (Math.abs(leftHeight - rightHeight) < 2) return true;
            return false;
        },

        rebalance() {
            let array = this.levelOrder();
            let valueArray = [];
            array.forEach((item) => {
                valueArray.push(item.value);
            })
            valueArray = [...new Set(valueArray.sort((a, b) => a - b))];
            return this.root = buildTree(valueArray);
        }
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

export { Tree, prettyPrint };

