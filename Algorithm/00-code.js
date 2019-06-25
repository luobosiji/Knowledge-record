// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
var twoSum = function(nums, target, map = new Map(), i = 0) {
  let result = target - nums[i]
  if (map.has(result)) {
    return [map.get(result), i]
  }
  map.set(nums[i], i)
  if (++i >= nums.length) return "Can't find"
  return twoSum(nums, target, map, i)
}

/**
 * 
 *  ************************************************环形链表 
 * */
// set存址 进行判重 O(n*1)
var hasCycle = function(head) {
  let set = new Set()
  while (head && head.next !== null) {
    if (set.has(head)) {
      return true
    }
    set.add(head)
    head = head.next
  }
  return false
}
// 递归实现
var hasCycle = function(head, set = new Set()) {
  if (!head || head.next === null) return false
  if (set.has(head)) {
    return true
  }
  set.add(head)
  return hasCycle(head.next, set)
}
// 快慢指针
// 快慢相遇 O(n) 空间复杂度比set存址好
var hasCycle = function(head) {
  let fast = head
  let slow = head
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      return true
    }
  }
  return false
}
// 大神实现
var hasCycle = function(head) {
  let cur = head
  while (cur) {
    if (cur.hasVisited) return true
    cur.hasVisited = true
    cur = cur.next
  }
  return false
}

/**
 * 
 *  ************************************************反转链表 
 * */
// 时间复杂度   O(n)
// 空间复杂度   O(1)
const reverseList = function(listNode) {
  let list = listNode //当前节点
  let n = null //上一个节点
  while (list && list.next !== null) {
    n = list.next
    list.next = n.next
    n.next = listNode
    listNode = n
  }
  return listNode
}
// 递归实现反转链表 时间最优
// 时间复杂度   O(n)
// 空间复杂度   O(n)
let n = null
var reverseList = function(head) {
  if (head === null || head.next === null) return head
  n = reverseList(head.next)
  head.next.next = head
  head.next = null
  return n
}
// 内存最优
var reverseList = function(head) {
  if (!head) return null
  let p = head.next
  head.next = null
  let r = null
  while (p !== null) {
    r = p.next
    p.next = head
    head = p
    p = r
  }
  return head
}

// 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let result = new ListNode(null)

  let resultNext = result
  let sum = 0
  let params = 0 //和大于10进位
  let x = 0
  let y = 0

  while (l1 !== null || l2 !== null) {
    x = l1 ? l1.val : 0
    y = l2 ? l2.val : 0
    sum = (x + y + params) % 10
    params = Math.floor((x + y + params) / 10)
    resultNext.next = new ListNode(sum)
    resultNext = resultNext.next

    l1 && (l1 = l1.next)
    l2 && (l2 = l2.next)
  }
  if (params) {
    resultNext.next = new ListNode(params)
  }

  return result.next
}

/**
 * 
 *  ************************************************两两交换链表中的节点 
 * */
var swapPairs = function(head) {
  if (!head || head.next === null) return head
  let n = head.next
  head.next = swapPairs(n.next)
  n.next = head
  return n
}
