#include<iostream>
#include<math.h>
using namespace std;

void Print(int board[][9], int n){
    for(int i=0; i<n; i++){
        for(int j=0;j<n;j++){
            cout<<board[i][j]<<" ";
        }
        cout<<endl;
    }
    cout<<endl;
}

//check within row, colum and subgrid
bool isValid(int board[][9], int i, int j, int num, int n){
    //row check
    //for(int x=0; x<n; x++){
    //    if(board[i][x]==num){
    //        return false;
    //    }
    //}
    //col check
    //for(int x=0; x<n; x++){
    //    if(board[x][j]==num){
    //        return false;
    //   }
    //} merge
    for(int x=0; x<n; x++){
        if(board[i][x]==num || board[x][j]==num)
            return false;
    }

    //sub-matrix check
    int rtn = sqrt(n);
    int si = i - i%rtn;
    int sj = j - j%rtn;
    for(int x = si; x<si+rtn; x++)
    {
        for(int y=sj; y<sj+rtn; y++){
            if (board[x][y]==num)
            {
                return false;
            }

        }
    }
    return true; //if allthe three cases are checked
}

bool sudokusolver(int board[][9], int i, int j, int n)
{
    //base case
    if(i==n){
        Print(board,n);
        return true;
    }
    //if we wre  not inside the board i.e if we cross the 9th colum then it must go to next row
    if(j==n){
       return sudokusolver(board,i+1, 0,n);//starting colum of next row 
    }
    //if cell is already filled, i.e the fixed numbers
    if(board[i][j]!=0)
    {
       return sudokusolver(board,i,j+1,n); 
    }
    //First, we'll try to fill the cell with n apt number
    for(int num=1; num<=9; num++){
        //check if num cab be filled
        if(isValid(board,i,j,num, n)){
            board[i][j]=num;
            bool subAns = sudokusolver(board,i,j+1,n); //j+1 to check the ahead cell//
            if(subAns){
                return true;
            }
            //backtracking if subAns is not true -> undo the changes//
            board[i][j]=0;
        }
    }
    return false; //we were unable to fill any number 
}

int main()
{
    int n=9;
    int board[9][9]={
        {0,0,7,1,0,0,0,6,0},
        {1,0,5,2,0,8,0,0,0},
        {6,0,0,0,0,7,1,2,0},
        {3,1,2,4,0,5,0,0,8},
        {0,0,6,0,9,0,2,0,0},
        {0,0,0,0,0,3,0,0,1},
        {0,0,1,0,0,4,9,8,6},
        {8,0,3,9,0,6,0,0,0},
        {0,6,0,0,8,2,7,0,3}
    };
    sudokusolver(board, 0,0,n);
    return 0;
}