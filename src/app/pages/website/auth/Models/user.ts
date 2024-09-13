export interface User {
  email:string,
  password: string,
  fname:string,
  lname: string,
  username:string,
  role:string,
  image :{
    imageUrl:string,
    publicId:string
  },
  gender:string
}
