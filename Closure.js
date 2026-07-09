/* inifinity currying example.*/

function sum(...args){
    let total = 0;
    args.map((i)=>total+=i)
    function inner(...args){
        args.map((i)=>total+=i)
        return inner;
    }
    inner.valueOf = () => total
    inner.toString = () => total
    return inner;
}

console.log(+sum(2,3)(2,1)(3)(5,2));


function singleSum(a){
    let total =+ a;
    function inner(b){
        total+=b
        return inner;
    }
    inner.valueOf = () => total
    inner.toString = () => total
    return inner;
}

console.log(+singleSum(2)(2)(3)(5));

/** Counter using Closure. */
