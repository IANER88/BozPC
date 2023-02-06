class Regular{
  constructor(){
    
  }
  Email(){
    return /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
  }
  Password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
}
export default new Regular()