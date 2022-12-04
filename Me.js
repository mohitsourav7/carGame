let arr=[5,5,7,9,0,7,3,2]
let count=0
// let l=0
// let r=arr.length-1
// let mid=(l+r)/2
for(i=0;i<arr.length;i++){
    for(j=i+1;j<arr.length;j++){
        if(arr[i]==arr[j]){
            count=count+1
            break;
        }
        // else {console.log(`No repetition`);}
    }
    console.log(count);
}