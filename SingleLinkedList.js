class Node {
    constructor() {
        this.value = value;
        // 다음 Node를 가리키는 포인터는 필요할 때마다 할당
        this.next = null;
    }
}

//this는 SingleLinkedList를 의미
class SingleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // 새로운 Node를 리스트 마지막에 추가
    push(value) {
        var newNode = new Node(value);
        // 리스트가 비어 있을 경우
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        }
        // 리스트에 Node가 있을 경우
        else {
            // 기존의 tail과 새로운 Node의 연결고리 생성
            this.tail.next = newNode;
            // tail을 새로운 Node로 변경
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    // 마지막 Node 제거
    pop() {
        // 리스트가 비어 있을 경우
        if (!this.head) return undefined;

        // 리스트에 Node 가 있을 경우
        var current = this.head;
        var curTail = current;

        // next가 null인 Node를 찾을때까지 순회 
        while (current.next) {
            newTail = current;
            current = current.next;
        }
        // 제거할 Node의 전 Node를 tail로 설정
        this.tail = newTail;
        // 제거할 Node와의 연결을 끊기
        this.tail.next = null;
        this.length--;

        // 예외 Case -> pop을 했을 경우 head와 tail이 정의되는 것을 막기 위한 코드
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return current;
    }

    // 맨 앞의 Node 제거
    shift() {
        // 리스트가 비어 있을 경우
        if (!this.head) return undefined;

        // 리스트에 Node가 있을 경우
        var currentHead = this.head;

        // head를 앞에서 두번째 요소로 설정
        this.head = currentHead.next;
        this.length--;

        // 예외 Case -> shift 했을 경우 tail이 정의되는 것을 막기 위한 코드
        if (this.length === 0) {
            this.tail = null;
        }
        return currentHead;
    }

    // 맨 앞의 Node 추가
    unshift(value) {
        var newNode = new Node(value);

        // 리스트가 비어 있을 경우
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        }
        // 리스트에 Node가 있을 경우
        else {
            // 새로운 Node의 next를 현재의 head로 할당
            newNode.next = this.head;
            // 현대 head를 새로운 Node로 변경
            this.head = newNode;
        }
        this.length++;
        return this;
    }

    // 특정한 위치에 있는 Node 찾기
    get(index) {
        // 해당 index가 헌재 리스트의 범위 밖일 경우
        if (index < 0 || index >= this.length) return undefined;

        // 리스트에 Node가 있을 경우
        var counter = 0; // 위치를 찾기 위해 선언한 변수
        var current = this.head;

        // counter가 찾으려는 Node에 도달할때까지 순히하며 counter를 증가
        while (counter !== index) {
            current = current.next;
            counter++;
        }
        return current;
    }

    // 특정한 위치에 있는 Node의 값을 변경
    set(index, val) {
        //get을 활용하여 찾기
        var foundNode = this.get(index);

        // 해당 Node를 찾았을 경우
        if (foundNode) {
            foundNode.val = val;
            return true;
        }

        // 해당 Node를 찾지 못했을 경우
        return false;
    }

    // 리스트의 중간에 Node 추가
    insert(index, val) {
        // 해당 index가 헌재 리스트의 범위 밖일 경우
        if (index < 0 || index > this.length) return false;

        // insert할 Node의 index가 현재 리스트의 마지막일 경우
        if (index === this.length) return !!this.push(val); // boolean으로 리턴값을 통일하기 위한 truthy 활용

        // insert할 Node의 index가 현재 리스트의 맨 앞일 경우
        if (index === 0) return !!this.unshift(val); // boolean으로 리턴값을 통일하기 위한 truthy 활용

        // 현재 리스트의 중간에 Node를 추가할 경우
        var newNode = new Node(val);

        // 해당 index의 이전 Node의 next를 추가할 Node와 연결
        var prev = this.get(index - 1);
        var temp = prev.next;
        prev.next = newNode;

        // 추가할 Node의 next를 다음 Node와 연결
        newNode.next = temp;
        this.length++;
        return true;
    }

    // 리스트의 중간에 있는 Node 제거
    remove(index) {
        // 해당 index가 헌재 리스트의 범위 밖일 경우
        if (index < 0 || index >= this.length) return undefined;

        // remove할 Node의 index가 현재 리스트의 마지막일 경우
        if (index === this.length - 1) return this.pop();

        // remove할 Node의 index가 현재 리스트의 맨 앞일 경우
        if (index === 0) return this.shift();

        // 현재 리스트의 중간에 Node를 제거할 경우
        var previousNode = this.get(index - 1);

        // 제거할 Node의 next를 이전 노드의 next로 할당시켜, 연결을 끊음
        var removed = previousNode.next;
        previousNode.next = removed.next;
        this.length--;
        return removed;
    }

    // 연결 리스트의 순서를 뒤집기
    reverse() {
        //head와 tail을 swap
        var node = this.head;
        this.head = this.tail;
        this.tail = node;

        // 순회할때, 사용할 변수 next와 prev를 설정
        var next;
        var prev = undefined;

        // 순회하며 Node의 연결을 재할당
        for (var i = 0; i < this.length; i++) {
            next = node.next;
            node.next = prev;
            prev = node;
            node = next;
        }
        return this;
    }

    // 출력
    print() {
        var current = this.head;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }
}

var list = new SingleLinkedList();