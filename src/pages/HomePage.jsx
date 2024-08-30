import {useState} from 'react'

function HomePage() {
    <div>
    Wecome to our website
    </div>
  
}

export default HomePage





// function HomePage() {
//    const [recipe, setRecipes]= useState([]);
//    useEffect(() => {
//     const fetchRecipe = async () =>{
//         try{
//            const response=  await axios.get("http://localhost:3001/recipes", recipe);
//            setRecipes(response.data);
//            console.logr(response.data)
//             alert("Recipe Created")

//         }catch (err){
//         console.error(err);
//       }
//     };
   
//     fetchRecipe()

//    }, []);
//    return(
//     <div>
//         <h2>
//             Recipes
//         </h2></div>
//    )
  
// }

// export default HomePage