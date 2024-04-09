import { useEffect, useReducer, useState } from "react"

const LandingPage =()=>{

const [state,setState] = useReducer((state,newValidation)=>({...state,...newValidation}),{
    userData:{
        name:"asha",
        age:"23",
        number:"as",
        email:"asha@gmail.com",
        state:"AP",
        country:"India",
        gender:"female"
    },
    userList:[],
    actionType :"",
    currentIndex : 0,
    loginData :{
        name:"",
        email:""


    },
    Tab :1,
    searchquery:""
})

const handleSearch=(e)=>{
let {searchquery} = state 
searchquery = e.target.value 
setState({searchquery})  

}


 useEffect(()=>{
    setState(0)

 },[])


 const handleEdit=(item,index)=>{
  let {userData} = state
 userData = JSON.parse(JSON.stringify(item))
 setState({userData,actionType:"edit",currentIndex:index})


 }

 const  handleLoginOnchange = (e,name)=>{
    let {loginData} = state
    loginData[name] = e.target.value 
    setState({loginData})
    

 }

 const handleLogin=()=>{
    let {userList,loginData} = state 
    let filteredData = userList.filter((v)=> v.name === loginData.name && v.email === loginData.email) 
    console.log(filteredData)
    console.log(userList)
    console.log(loginData)
    if (filteredData.length > 0){
        setState({Tab : 2 })
    }

 }

 const handleSubmit=()=>{
    const {userData,userList} = state
    if (state.actionType==="edit"){
        userList[state.currentIndex]=userData

    }else{
        let tempObj = JSON.parse(JSON.stringify(userData))
        userList.push(tempObj)

    }
   
    setState({userList})
}

 let tablevalue = state.userList.filter((v)=>v.name.toLowerCase().includes(state.searchquery.toLowerCase()) ).map((item,index)=>{
    return <tr key={index}>
    
<td >{item.name}</td>
<td >{item.age}</td>
<td >{item.number}</td>
<td >{item.email}</td>
<td >{item.state}</td>
<td >{item.country}</td>
<td >{item.gender}</td>
<td><button onClick={handleEdit}>Edit</button></td>
</tr>  
 })

 const handleChange=(e,name)=>{
    let userData = state.userData 
    userData[name] = e.target.value
    setState({userData})


 }




    return(
        <div className="main-container">
           
            <div className="login-data">
            
            <label id="name">Name</label>
            <input type="text" id="name" />
            <label id ="email">email</label>
            <input type="text" id="email"/>
            <button type="submit" onClick= {()=>setState({Tab:1})} className={state.Tab === 1 ? "bg_color":""} >Login</button>
            <button className={state.Tab===2 ? "bg_color":""}  onClick={()=>setState({Tab:2})}>Home</button>
            <button className={state.Tab === 3 ? "bg_color":""} onClick={()=>setState({Tab:3})} >Registration</button>
            
            </div>
            {state.Tab  === 1 &&  <div> 
                <label id="name" >name</label>
                <input type="text" id="name" onChange={(e)=>handleLoginOnchange(e,"name")}/>
                <label id="email">email</label>
                <input type="text" id="email" onChange={(e)=>handleLoginOnchange(e,"email")} />
                <button onClick={handleLogin}> Login </button>

             </div>}
            {state.Tab=== 2 && <div><h1>Home</h1></div>}
            {state.Tab===3 && <div className="text-feilds"> 
                <label id="name">name</label>
                <input type="text" id="name"  onChange={(e)=>handleChange(e, "name")}  value={state.userData.name}/>
                <label id="age">age</label>
                <input type="text" id="age" onChange={(e)=>handleChange(e, "age")} value={state.userData.age} />
                <label id="number">number</label>
               
                
                <input type="text" id="number" onChange={(e)=>handleChange(e, "number")} value={state.userData.number}  />
                <label id="email">Email</label>
                <input type="text" id="email" onChange={(e)=>handleChange(e, "email")} value={state.userData.email} />
                <label id="state">state</label>
                <input type="text" id="state" onChange={(e)=>handleChange(e, "state")} value={state.userData.state} />
                <label id="country">Country</label>
                <input type="text" id="country" onChange={(e)=>handleChange(e, "country")} value={state.userData.country} />
                <label id="gender">gender</label>
                <input type="text" id="gender" onChange={(e)=>handleChange(e, "gender")} value={state.userData.gender} />
                <button type="button" onClick={handleSubmit}>Submit</button>
                
                

                <div> 
                    <p>{state.userData.name}</p>
                    <table>
  <input type="text" onChange={(e)=>handleSearch(e)}/>
  
  <thead>
    <tr>
    <th scope="col">name</th>
      <th scope="col">age</th>
      <th scope="col">number</th>
      <th scope="col">Email</th>
      <th scope="col">state</th>
      <th scope="col">country</th>
      <th scope="col">gender</th>
    </tr>
  </thead>
  <tbody>
   {tablevalue}
    
  </tbody>
</table>
                </div>
                


                </div>
                
               

                
                }
           
        </div>

    )
}

export default LandingPage