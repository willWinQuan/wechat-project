//index.js
//获取应用实例
var app = getApp();

/*
*ES6提供了两种声明变量的方式：let 和 const，它们几乎替代了ES5中使用var声明变量的方式。let和var的工作方式很像，但是它声明的变量是有块作用域的，它只在于当前的块作用域中有效。而var声明的变量是在函数作用域内有效。
*
***/ 
function func(randomize) {
    if (randomize) {
        let x = Math.random(); // 注意：变量x只存在于这个if作用域中 
        var y = Math.random(); // 但是变量y可以在整个func函数中访问到 
        } 

        // 块作用域意思是：我们可以在一个函数中保护一个变量。比如，这里的x与上述的x没有任何关系。 
        let x = 5; 
        return y; 
        }

/**
 * const 和 let工作原理类似，但是你声明变量的同时必须立即用一个不会再改变的值对其进行初始化。
 * const a = 123;
 * 注意const 陷阱！const只保证变量自身是永恒不变的，如果变量是一个对象，则其属性仍然是可变的，相应的解决办法就是JavaScript的 freeze() 方法。
 * const freezObj = Object.freeze({});
 * 
 * **/

function getJSONno(url,callback){
    let arry_data = [];
    for (var i = 0; i < url.length; i++) {
        wx.request({
            url: url[i],
            data: {

            },
            success: function (res) {
                arry_data.push(res);
                callback(arry_data);
            },
            fail: function (error) {
               console.log(error);
            }
        })
    }
}

//promise
function getJSON(url) {
    let promise = new Promise(function (resolve, reject) { 
        // OK，现在我们可以在promise中编写我们的异步行为代码了。比如ajax调用。 
        let arry_data=[];
        for (var i = 0; i < url.length; i++) {
            wx.request({
                url: url[i],
                data: {

                },
                success: function (res) {
                    arry_data.push(res);
                    resolve(arry_data);
                },
                fail: function (error) {
                    reject(error);
                }
            })
        }
        // 如果我们的ajax调用成功，会调用resolve()并传递必要的参数给它。参数是什么呢？由我们自己根据我们的异步工作而决定。 
        // 比如，对于ajax工作，jquery的ajax()方法在其成功加载文件后会调用我们的成功回调函数。它也会传递一个参数，就是它实际加载的数据。 
        // 因此我们这儿的参数就是这个数据。 
        // 如果失败，我们会调用reject()，并且传递必要的参数给它。 
        }); 
  
        return promise; 
        // r记得将promise返回 
    }


Page({
  data: {
    motto: 'Hello World wechat',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad');
    // 内嵌变量绑定 
    let name = 'Bob', time = 'today'; 
    let greeting = `Hello ${name}, how are you ${time}?`;
    console.log(greeting);
   
    // 与标签模板一起使用，生成的原始字符串将包含模板字符串中的所有转义字符和反斜杠。 
    let str = String.raw`This is a text with multiple lines. Escapes are not interpreted, \n is not a newline.`;
    console.log(str);

    func();

    /*
    *解构
    */
    //解构对象
    let obj2 = { first: 'Jane', last: 'Doe' }; 
    let { first: f2, 
          last: l2 
         } = obj2; // 现在我们获得了变量f2和l2。
    console.log(f2);
    console.log(l2);

    //解构数组
    let [x1, y1] = ['a', 'b']; // => x1 = 'a'; y1 = 'b'
    
    //深层解构
    let obj3 = { a: [{ foo: 123, bar: 'abc' }, {}], b: true }; 
    let { a: [{ foo: f3 }] } = obj3; // => f3 = 123
    
    //解构赋值默认值
    let [x3=3,y3]=[];//=> x3=3;y3=undefined
    let {foo:x4=3,bar:y4}={};//=>x4=3;y4=undefined
    
     //默认值可以是函数
     function log(){return 'yes'}
     let [aa=log()]=[];
     console.log(aa);

    //使用for...of循环数组示例
    let arr=['a','b','c'];
    for(let item of arr){
        console.log(item);
    }

    //通过使用新的数组方法 entries()和解构赋值，我们可以得到数组中每个元素的索引和值
    for(let [index,item] of arr.entries()){
        console.log(index +'.'+item);
    }

    //数组模式对可迭代对象都有效
    let [x2,...y2]='abc'; //=>x2='a'; y2=['b','c'];展开运算符'rest'
    let [,,x]=['a','b','c','d'];//=>x='c'; 可以省略元素
    let [y] = ['a', 'b', 'c', 'd'];//=>y='a';
    
    // 在ES5中，你是这样定义参数的默认值的： 
    function foo(x, y) { 
        x = x || 0; y = y || 0; 
        // do something 
    } 
    // ES6用更好的语法来实现： 
    function foo(x=0, y=0) { 
        // y is 0 if not passed (or passed as undefined) 
    }
    // 通过ES6，你可以在定义参数时使用解构赋值，代码会变得更简洁： 
    function selectEntries1({ start=0, end=-1, step=1 } = {}) { 
        // do something 
    } 
    // 上述函数与这个等同： 
    function selectEntries2(options) { 
        options = options || {}; 
        var start = options.start || 0; 
        var end = options.end || -1; 
        var step = options.step || 1; 
        // do something 
    }

    function format(pattern, ...params) { 
        return params; 
    } 
    format('a', 'b', 'c'); 
    // ['b', 'c'] 
    // params是一个数组 
    // ES6 中我们有展开运算符'...'。 
    // 在ES5中，我们使用apply()来将数组中的元素转成参数。 
    var max=[];
    Math.max.apply(null, [-1, 5, 11, 3]); 
    // 现在，我们很容易就可以实现这个功能，因为展开运算符会提取它的每一项，然后将其转换到参数中。 
    var new_max =Math.max(...[-1, 5, 11, 3]);
    console.log(new_max);
   
    var evens = [0, 2, 4]; 
    // 以下两种写法效果相同： 
    var odds = evens.map(v => v + 1); 
    var odds = evens.map(function(v){ return v + 1; }); 
    // 以下两种写法效果相同： 
    var nums = evens.map((v, i) =>{
        console.log(v);
        console.log(i);
        return v + i;
    }); 
    console.log(nums);
    var nums = evens.map(function(v, i){ return v + i; });
    console.log(odds);
    console.log(nums);
    
    let first = 'Jane'; 
    let last = 'Doe'; 
    let propKey = 'foo'; 
    let obj = { 
        // 方法的定义 
        myMethod(x, y) { 
            // do something 
        }, 
        // 属性值简写，如下： 
        // let obj = { first, last }; 
        // 效果同下： 
        // let obj = { first: first, last: last };
         first, 
         last, 
        // 计算后的属性值： 
        [propKey]: true, 
        ['b'+'ar']: 123, 
        ['h'+'ello']() { 
            // console.log(obj.hello()); 
            return 'hi'; 
        }, 
        // Setter和Getter函数 
        get sth() { 
            console.log('Object Literal-> ', 'sth getter'); 
            return 123; 
        }, 
        set sth(value) { 
            console.log('Object Literal-> ', 'sth setter'); 
            // 返回值被忽略 
            } 
        }; 
        // 对象中的新方法 
        // 对象中最重要的新方法就是assign(). Object.assign(obj, { bar: true }); 
        // 它为我们的对象新增参数。 console.log('Object Literal-> ', JSON.stringify(obj)); 
        // {"first":"Jane","last":"Doe","foo":true,"bar":123,"sth":123}
    console.log('Object Literal-> ', JSON.stringify(obj));

   //调用promise
   var url=[
       'https://823.dev.wsy010.cn/mini_program/minvite/back/index.php/home/user/resume_detail?customer_id_en=UWRUYw%3D%3D&user_id_en=BDMBMgZkUmsGMgZkU2w%3D',
       'https://823.dev.wsy010.cn/mini_program/minvite/back/index.php/home/user/resume_detail?customer_id_en=UWRUYw%3D%3D&user_id_en=BDMBMgZkUmsGMgZkU2w%3D'
   ];

   var url2=[
       'https://823.dev.wsy010.cn/mini_program/minvite/back/index.php/home/user/resume_detail?customer_id_en=UWRUYw%3D%3D&user_id_en=BDMBMgZkUmsGMgZkU2w%3D',
       'https://823.dev.wsy010.cn/mini_program/minvite/back/index.php/home/user/resume_detail?customer_id_en=UWRUYw%3D%3D&user_id_en=BDMBMgZkUmsGMgZkU2w%3D'
   ];

   getJSONno(url2, function (res) {
        console.log(res);
    })
  
    getJSON(url)
    .then(value => { 
        console.log(value);
        return {'ok':'write by chq,数数数，这是1'};
    })
    .then(value2 =>{
        console.log(value2);
        return { 'ok': 'write by chq,数数数，这是2' };
    })
    .then(value3 =>{
        console.log(value3);
        return { 'ok': 'write by chq,数数数，这是3' };
    })
    .then(value4 => {
        console.log(value4);
        return { 'ok': 'write by chq,数数数，这是4' };
    })
    .then(value5 => {
        console.log(value5);
        console.log(this.route);
    })
    .catch(error => { 
        console.log(error);
    });
  
 

    var that = this;
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      that.update()
    })
  }
})
