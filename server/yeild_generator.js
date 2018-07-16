/* eslint-disable no-console */
let go = function*(x) {
    console.log('x', x)
    let a = yield x
    console.log('xx', x)

    console.log('a', a)

    let b = yield x + 1

    sum = a + b

    yield a + b

    return a + b
}
// go(10)
let g = go(10);
console.log(g.next());
console.log(g.next(1000).value)
console.log(g.next(100).value)
console.log(g.next(50).value)
console.log(g.next(50).value)
console.log(g.next(50).value)
console.log(g.next(50).value)


function *curr() {
    let items = [],
        value
    do {
        console.log("**********1=",value)
        console.log("**********1=",items.join(","))
        //  如果不需要返回值，可以直接写成value = yield
        //  每次返回现有的数组元素
        value = yield items.slice()
        //  当等于-1时终止
        if(value !== -1) {
            items.push(value)
        }
    } while(value !== -1)
    console.log("**********2=",value)
    //  进行求值
    let sum = 0
    items.forEach(item => sum = sum + item)
    // yield sum
    return sum;
}

let curring = curr()
 // 必须要空转一次，代码启动柯里化
curring.next()
curring.next(1)
curring.next(2)
curring.next(3)
 // 启动求值过程
console.log(curring.next(-1))