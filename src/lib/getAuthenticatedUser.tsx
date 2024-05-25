interface UserAccount {
    userid: string;
    name: string;
    kode_dosen: string;
    token: string;
    login_type: string;
  }
  
export function getAuthenticatedUser() {
    const userAccountData: UserAccount = {
        userid: "1",
        name: "Asri Maspupah",
        kode_dosen: "KO067N",
        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIxIiwibmFtZSI6IkFzcmkgTWFzcHVwYWgiLCJrb2RlX2Rvc2VuIjoiS08wNjdOIiwibG9naW5fdHlwZSI6InRlYWNoZXIiLCJleHAiOjE3MTY2MDIxNDJ9.2psU1DVImuXl8mLLEf7XsKN1OBaR_1GsQ0Rms6zQKgc",
        login_type: "teacher"
    };
  
return userAccountData;
}