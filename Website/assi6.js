class TreeNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Dictionary {
    constructor() {
        this.root = null;
    }

    insert(key, value) {
        this.root = this._insertNode(this.root, key, value);
    }

    _insertNode(root, key, value) {
        if (root === null) {
            return new TreeNode(key, value);
        }

        if (key < root.key) {
            root.left = this._insertNode(root.left, key, value);
        } else if (key > root.key) {
            root.right = this._insertNode(root.right, key, value);
        }

        return root;
    }

    find(key) {
        return this._findNode(this.root, key);
    }

    _findNode(root, key) {
        if (root === null || root.key === key) {
            return root;
        }

        if (key < root.key) {
            return this._findNode(root.left, key);
        } else {
            return this._findNode(root.right, key);
        }
    }

    delete(key) {
        this.root = this._deleteNode(this.root, key);
    }

    _deleteNode(root, key) {
        if (root === null) {
            return root;
        }

        if (key < root.key) {
            root.left = this._deleteNode(root.left, key);
        } else if (key > root.key) {
            root.right = this._deleteNode(root.right, key);
        } else {
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }

            const minRightNode = this._findMin(root.right);
            root.key = minRightNode.key;
            root.right = this._deleteNode(root.right, minRightNode.key);
        }

        return root;
    }

    _findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    inorderTraversal(node, callback) {
        if (node !== null) {
            this.inorderTraversal(node.left, callback);
            callback(node);
            this.inorderTraversal(node.right, callback);
        }
    }

    reverseInorderTraversal(node, callback) {
        if (node !== null) {
            this.reverseInorderTraversal(node.right, callback);
            callback(node);
            this.reverseInorderTraversal(node.left, callback);
        }
    }
}

const dictionary = new Dictionary();

function insert() {
    const key = document.getElementById('key').value;
    const value = document.getElementById('value').value;
    dictionary.insert(key, value);
    updateTree();
}

function find() {
    const key = document.getElementById('key').value;
    const node = dictionary.find(key);
    if (node !== null) {
        document.getElementById('output-text').innerText = `Found: Key=${node.key}, Value=${node.value}`;
    } else {
        document.getElementById('output-text').innerText = 'Key not found';
    }
}

function deleteNode() {
    const key = document.getElementById('key').value;
    dictionary.delete(key);
    updateTree();
}

function sortAscending() {
    let sortedNodes = [];
    dictionary.inorderTraversal(dictionary.root, (node) => sortedNodes.push(node));
    displaySortedOutput(sortedNodes);
}

function sortDescending() {
    let sortedNodes = [];
    dictionary.reverseInorderTraversal(dictionary.root, (node) => sortedNodes.push(node));
    displaySortedOutput(sortedNodes);
}

function updateTree() {
    const treeContainer = document.getElementById('tree-container');
    treeContainer.innerHTML = '';
    visualizeTree(dictionary.root, treeContainer);
}

function visualizeTree(root, container) {
    if (root === null) return;

    visualizeTree(root.left, container);

    const nodeElement = document.createElement('div');
    nodeElement.classList.add('node');
    nodeElement.innerText = `${root.key} : ${root.value}`;
    container.appendChild(nodeElement);

    visualizeTree(root.right, container);
}

function displaySortedOutput(nodes) {
    const outputText = nodes.map(node => `${node.key} : ${node.value}`).join('\n');
    document.getElementById('output-text').innerText = outputText;
}

// Initial visualization
updateTree();
