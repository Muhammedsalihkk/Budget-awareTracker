export const setSessionItem = (token: string) => {
  console.log("helo");
  
  sessionStorage.setItem("accessToken", token);
};
