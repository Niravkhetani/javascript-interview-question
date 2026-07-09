class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.head = new Node(null, null);
        this.tail = new Node(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    addToFront(node) {
        console.log("this.head",this.head)
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }
    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    moveToFront(node) {
        this.removeNode(node);
        this.addToFront(node);
    }
    removeLRU() {
        const lru = this.tail.prev;
        this.removeNode(lru);
        this.cache.delete(lru.key);
    }
    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }
        const node = this.cache.get(key);
        this.moveToFront(node);
        return node.value;
    }
    put(key, value) {
        console.log("cache",this.cache)
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            node.value = value;
            this.moveToFront(node);
            return;
        }
        const node = new Node(key, value);
        this.cache.set(key, node);
        this.addToFront(node);
        if (this.cache.size > this.capacity) {
            this.removeLRU();
        }
    }
}

let cache = new LRUCache(3)
cache.put("user1","nirav")
cache.put("user2","nirav2")
cache.put("user3","nirav3")

