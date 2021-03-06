'use strict';

const obj = {
  greeting:'hello ~',
  name:'Michael Project'
}

const { greeting, name} = obj
console.log(greeting, name)

function breakfast(){
  return ['蛋糕','奶茶','苹果'];
}
// 解构数组和对象
var tmp = breakfast(),
    dessert = tmp[0],drink = tmp[1],fruit = tmp[2];
console.log(dessert,drink,fruit);

let Dessert ='蛋糕',
    Drink = '奶茶';

let Breakfast = kitchen`今天的早餐是
${Dessert} 与 ${Drink}!`;

function kitchen (string,...value){
console.log(string);
console.log(value);
}

// 迭代器 生成器

function chef(foods){
  let i = 0;
  return {
    next(){
      let done = (i>=foods.length);
      let value = !done ? foods[i++] : undefined;
      return {
        value: value,
        done: done
      }
    }
  }
}
let ninghao  = chef(['西红柿','炒鸡蛋']);
console.log(ninghao.next());
console.log(ninghao.next());
console.log(ninghao.next());

// function* chef2(foods) {
//   for (var i = 0; i < foods.length; i++) {
//     yield foods[i];
//   }
// }
// let foodList = chef2(['西红柿','炒鸡蛋']);
// console.log(foodList.next());
// console.log(foodList.next());
// console.log(foodList.next());
