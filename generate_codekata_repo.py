import os

base = "guvi-codekata-python"

topics = {
    "01_conditionals": range(1, 31),
    "02_loops": range(31, 71),
    "03_recursion": range(71, 96),
    "04_arrays": range(96, 121),
    "05_strings": range(121, 146),
    "06_mixed_logic": range(146, 201)
}

solutions = {
1:"n=int(input());print('Positive' if n>0 else 'Negative' if n<0 else 'Zero')",
2:"n=int(input());print('Even' if n%2==0 else 'Odd')",
3:"n=int(input());print('Yes' if n%5==0 else 'No')",
4:"n=int(input());print('Yes' if n%3==0 and n%5==0 else 'No')",
5:"y=int(input());print('Leap Year' if (y%4==0 and y%100!=0) or y%400==0 else 'Not Leap Year')",
6:"a,b=map(int,input().split());print(max(a,b))",
7:"a,b,c=map(int,input().split());print(max(a,b,c))",
8:"t=int(input());print('Cold' if t<20 else 'Warm' if t<30 else 'Hot')",
9:"c=input().lower();print('Vowel' if c in 'aeiou' else 'Consonant')",
10:"c=input();print('Digit' if c.isdigit() else 'Letter' if c.isalpha() else 'Special')",
31:"n=int(input());[print(i) for i in range(1,n+1)]",
32:"n=int(input());[print(i,end=' ') for i in range(2,n+1,2)]",
33:"n=int(input());[print(i,end=' ') for i in range(1,n+1,2)]",
34:"n=int(input());[print(i) for i in range(n,0,-1)]",
35:"n=int(input());[print(n*i) for i in range(1,11)]",
36:"n=int(input());print(n*(n+1)//2)",
39:"import math;n=int(input());print(math.factorial(n))",
41:"n=int(input());print(len(str(n)))",
42:"print(int(str(input())[::-1]))",
43:"n=input();print('Yes' if n==n[::-1] else 'No')",
44:"print(sum(map(int,input())))",
47:"n=int(input());\nfor i in range(2,n+1):\n if all(i%j for j in range(2,int(i**0.5)+1)):print(i,end=' ')",
96:"n=int(input());a=list(map(int,input().split()));print(sum(a))",
97:"n=int(input());a=list(map(int,input().split()));print(sum(a)/n)",
98:"n=int(input());a=list(map(int,input().split()));print(max(a))",
99:"n=int(input());a=list(map(int,input().split()));print(min(a))",
111:"n=int(input());a=list(map(int,input().split()));print(*a[::-1])",
118:"n=int(input());a=list(map(int,input().split()));a=list(set(a));a.sort();print(a[-2])",
121:"s=input();print(len(s))",
131:"print(input()[::-1])",
134:"s=input();print('Yes' if s==s[::-1] else 'No')",
146:"n=int(input());[print(i,end=' ') for i in range(1,n+1) if i%15==0]"
}

os.makedirs(base,exist_ok=True)

for folder,nums in topics.items():
    path=os.path.join(base,folder)
    os.makedirs(path,exist_ok=True)

    for i in nums:
        filename=os.path.join(path,f"{i:03}.py")
        code=solutions.get(i,"# TODO: Implement solution")
        with open(filename,"w") as f:
            f.write(f"# CodeKata Problem {i}\n{code}")

print("Project with 200 problems created.")