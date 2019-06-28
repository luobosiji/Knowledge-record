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

