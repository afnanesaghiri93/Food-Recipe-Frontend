//Import hooks and libararies
import {useState, useEffect} from 'react'// useState is used to create a state variables and useEffect is used for side effects like data fetching
import axios from "axios"//importing axios for making HTTP request
// Define the Createrecipe component , which manages the creation , editing , updating , deleting of recipes
function  Createrecipe () {
    // const userID = UseGetUserId();
    const [recipes, setRecipes] = useState([]);
    const [editingRecipeId, setEdittingRecipeId] = useState(null);
    //Initialize the recipe state as an oblject with default values for each property 
    
    const [recipe, setRecipe] = useState({
        name: "",
        description: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        // userOwner:userID,
        
      });
      
      // useEffect to Fetch all recipes from the server 
      useEffect(() => {
        const fetchRecipes = async ()=> {
            try{
                //Fetch recipes frpm ther backend server
                const response = await axios.get("http://localhost:3001/recipes")
                setRecipes(response.data);// set the fetched recipes to the state
                console.log(response.data);// log data for debugging purpose
            }catch (err){
                console.error(err);// log error yto the console
        }};
        fetchRecipes();// Call the fetch function
      }, [])// empty array ensures this runs only once when the component mount

      // function to handle  changes in  form input 
      const handleChange= (event)=>{
        const {name, value} = event.target;// Destructure name and and value from the event target
        setRecipe({...recipe,[name]: value});// update the coresponding field in the recipe state
      };

      //function to handle changes in  ingredient input 
      const handleIngredientChange= (event, idx)=>{
      const {value} = event.target; // get new value for the ingredient
      const newingredients = [...recipe.ingredients];//copy the current ingredients array 
      newingredients[idx]=value;// update the ingredients at the specific index[idx]
      setRecipe({...recipe,ingredients: newingredients});// update the recipe state with the new ingredients
      console.log(recipe);// log the update recipe for debugging
    };
    // function to add new ingredients input 
      const addIngredient = ()=> {
        setRecipe({...recipe, ingredients:[...recipe.ingredients, ""] });// add an empty string to the ingredients array
      }

      // function to handle form submission for creating or updating a recipe
      const onSubmit = async (event) => {
        event.preventDefault();// prevent default form submission behavior
        //if editingrecipe is set then update the existing recipe
        if (editingRecipeId){
            try{
                // send PUT request to updtae the recipe
                const response = await axios.put(`http://localhost:3001/recipes/${editingRecipeId}`, recipe)
                console.log(response.data);// log the response data for debugging
                //update the recipes state withh new arary r3eturned by map function
                setRecipes(recipes.map(r => r._id === editingRecipeId ? response.data : r))// recipes.map(r => // Iterate over each recipe in the recipes array
                //r._id === editingRecipeId // Check if the current recipe's _id matches the ID of the recipe being edited
                //  ? response.data  // If the IDs match ? then replace the recipe with the updated data from the response
                //: r   // If the IDs don't match : otherwise keep the original recipe object unchanged
            
                setEdittingRecipeId(null);//reset the editingrecipe state 
                //reset recipes to inint values
                setRecipe({
                    name: "",
                    description: "",
                    ingredients: [],
                    instructions: "",
                    imageUrl: "",
                    cookingTime: 0,
                    // userOwner:userID,
                });
                alert("Recipe Updated")// alert user of succesful upate
                
            }catch (err){
                console.error(err);// log errors to cosnsole
              }
        } else{// if editingRecipeId not set , create a new recipe

        try{
            // send POST req to create a new recipe
           const  response = await axios.post("http://localhost:3001/recipes", recipe)
            console.log(response.data);
            setRecipes([...recipes, response.data])// Add the new recipe to the recipes state
            // reset rhe recipe state to the initial values
                setRecipe({
                    name: "",
                    description: "",
                    ingredients: [],
                    instructions: "",
                    imageUrl: "",
                    cookingTime: 0,
                    // userOwner:userID,
                });
                alert("Recipe Created")// alert user of succesful create new recipe
                

        }catch (err){
        console.error(err);// log errors to cosnsole
      }}}



      // function to Delete  a recipe
      const deleteRecipe = async (id) => {
        try{
            // send DELETE request to nremove the recipe with specifed id 
            await axios.delete(`http://localhost:3001/recipes/${id}`);
            // check if the curent recipe's _id is not eaqual to the id we want to remove// recipes.filter(recipe => iterate over each recipes state with the new arary returned by filter function
            setRecipes(recipes.filter(recipe =>recipe._id !== id));// if the _id != doesn't match then keep this recipe in the new array
        }catch (err){
            console.error(err);// log errors to cosnsole
          }
      }




      // function to start editing a recipe
      const startEditing = (id) => {// declare a function named startEditing that accept id parameter 
        const recipeToEdit = recipes.find(r => r._id === id);// use find method to search a recipe in the recipes array//r._id === id) codition for finding is check if the current recipe's _id match the provided id 
        setRecipe(recipeToEdit);//set the recipe state to the recipe being edite=d
        setEdittingRecipeId(id);//set the editingRecipes state to the id recipe being edited
      };

        //return the JSX that renders then cp
    return (
        
        <div className="create-recipe">

        <h2>{editingRecipeId ? "Edit Recipe" : "Create Recipe"}</h2> {/*if editingRecipeId has a value ? then diplay  "Edit Recipe" , if it is undefined (null) : otherwise display "Create Recipe"   */}
        <form onSubmit={onSubmit}>{/* form submission is handled by the onSubmit */}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
           value={recipe.name}
            onChange={handleChange}
            style={{padding:'10px', marginBottum: '10px', borderRadius:'5px'}}// inline styling
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={recipe.description}
            onChange={handleChange}
            style={{padding:'10px', marginBottum: '10px', borderRadius:'5px'}}// inline styling
          ></textarea>
          <label htmlFor="ingredients"> Ingredients</label>
          <button 
          onClick={addIngredient} 
          type='button'// type button to prevent form submission when clicked
          style={{padding:'10px', marginBottum: '10px', borderRadius:'5px'}}> Add Ingredient</button>
         { recipe.ingredients.map((ingredient, idx) => (
            <input 
          key={idx}// unique key for each ingredients input
          type="text"
          name="ingredients"
          value={ingredient}
          onChange={(event) => handleIngredientChange(event, idx)} />
         ))}
         
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            style={{padding:'10px', marginBottum: '10px', borderRadius:'5px'}}// inline styling
          ></textarea>
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
            style={{padding:'10px', marginBottum: '10px', borderRadius:'5px'}}// inline styling
          />
          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
         
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            style={{padding:'10px', marginBottum: '10px', borderRadius:'5px'}}// inline styling
          />
          
          <button type="submit">{editingRecipeId ? "Update Recipe" : "Create Recipe"}</button> {/*checkn if editingRecipeId has value ? if it is then  display "Update Recipe"  : if it isnot display "Create Recipe"*/}
           </form>
          
         
          


           
              <h2>Recipes List</h2>
              {/*render  alist of recipes */}
                 {recipes.map(recipe => (// for each recipe in the recipes array , perform the following :
                    
                 <div key={recipe._id}>{/* the key prop identify which item have changed , edded or removed */}
                    <h3>{recipe.name}</h3>{/*render recipe's name inside h3 */}
                    <p>{recipe.ingredients.join(', ')}</p>{/*display the list of ingredients as a comma separated string */}
                    <p>{recipe.cookingTime} minutes</p>{/*render condition if the recipe has an image Url */}
                    {recipe.imageUrl  && (
                        <img  src= {recipe.imageUrl} alt={recipe.name} style={{ maxwidth : "200px", marginTop: "10px" }}/>

                    )}
                    <button onClick={() => startEditing(recipe._id)}>Edit</button>{/*button to start editing the recipe */}
                    <button onClick={() => deleteRecipe(recipe._id)}>Delete</button>{/*button to delete the recipe */}
                </div>
            ))}
      </div>
    );
}


export default Createrecipe