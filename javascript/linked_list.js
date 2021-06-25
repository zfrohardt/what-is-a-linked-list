class LinkedList {
  constructor(head=null) {
    this.head = head
  }

  iterate(callback) {
    let currentNode = this.head
    while (currentNode) {
      callback(currentNode)
      currentNode = currentNode.next
    }
    return this.head
  }

  // print each node's value on its own line
  // use your iterate method to be DRY! Don't get caught in the code rain, brrr.
  print() {
    this.iterate(node => console.log(node.value))
  }

  // find the node with the target value and return it
  // if not found return null, use your iterate method to be DRY!
  find(target) {
    let foundNode = null;

    this.iterate(node => {
      if(!foundNode) {
        if(node.value === target) {
          foundNode = node;
        }
      }
    })

    return foundNode;
  }

  // add the node to the start of the list, no nodes should be removed
  addFirst(node) {
    node.next = this.head
    this.head = node
  }

  // add node to end of list, no nodes should be removed
  // you may wish to use the iterate method
  addLast(node) {
    let lastNode = this.head
    this.iterate(node => {
      lastNode = node
    })

    if (lastNode) {
      lastNode.next = node
    } else {
      this.head = node
    }
  }

  // remove the first Node in the list and update head
  // and return the removed node
  removeFirst() {
    if(!this.head) {
      return null
    }

    let oldHead = this.head
    this.head = this.head.next
    return oldHead
  }

  // remove the tail node, iterate may be helpful
  // return the node you just removed
  removeLast() {
    if(!this.head) {
      return null
    } else if (!this.head.next) {
      return this.removeFirst()
    }

    let penultimateNode = this.head

    this.iterate(node => {
      if (node.next && !node.next.next) {
        penultimateNode = node
      }
    })

    let last = penultimateNode.next;
    penultimateNode.next = null
    return last;
  }

  // replace the node at the given index with the given node
  replace(idx, newNode) {
    let count = 0;

    if(idx === 0) {
      this.removeFirst();
      this.addFirst(newNode)
    }

    this.iterate(node => {
      if (count + 1 === idx) {
        newNode.next = node.next.next
        node.next = newNode
      }
      count++
    })

    return newNode
  }

  // insert the node at the given index
  // no existing nodes should be removed or replaced
  insert(idx, newNode) {
    if (idx === 0) {
      this.addFirst(newNode)
    }

    let count = 0;
    this.iterate(node => {
      if(count + 1 === idx) {
        newNode.next = node.next
        node.next = newNode
      }
      count++
    })
  }

  // remove the node at the given index, and return it
  remove(idx) {
    if (idx === 0) {
      return this.removeFirst()
    }

    let count = 0;
    let oldNode = null;
    this.iterate(node => {
      if (count + 1 === idx) {
        oldNode = node.next
        node.next = node.next.next
      }
      count++
    })

    return oldNode
  }

  clear() {
    this.head = null;
  }
}

class Node {
  constructor(value=null, next=null) {
    this.value = value
    this.next = next
  }
}

if (require.main === module) {
  // add your own tests in here
  const n = new Node('Hamtaro', new Node('Walter White'))
  const ll = new LinkedList(n)
  ll.print()

  let list = new LinkedList(new Node('Dante'));
  list.print();
}

module.exports = {
  Node, LinkedList
};