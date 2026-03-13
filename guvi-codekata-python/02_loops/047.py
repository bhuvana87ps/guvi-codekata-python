# CodeKata Problem 47
n=int(input());
for i in range(2,n+1):
 if all(i%j for j in range(2,int(i**0.5)+1)):print(i,end=' ')