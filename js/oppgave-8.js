const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for (let i=1;i<numbers.length-2;i++){
    numbers.fill(13,i,i+1);
    console.log(numbers);
}