import {useState, useEffect} from 'react'
import axios from "axios"
import UseGetUserId from '../hooks/UseGetUserId';

function  Createrecipe () {
    // const userID = UseGetUserId();
    const [recipes, setRecipes] = useState([]);
    const [editingRecipeId, setEdittingRecipeId] = useState(null);

    const [recipe, setRecipe] = useState({
        name: "",
        description: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        // userOwner:userID,
        
      });
      // Fetch all recipes 
      useEffect(() => {
        const fetchRecipes = async ()=> {
            try{
                const response = await axios.get("http://localhost:3001/recipes")
                setRecipes(response.data);
                console.log(response.data);
            }catch (err){
                console.error(err);
        }};
        fetchRecipes();
      }, [])
      // handle form input changes
      const handleChange= (event)=>{
        const {name, value} = event.target
        setRecipe({...recipe,[name]: value});
      };

      //handle ingredient input changes
      const handleIngredientChange= (event, idx)=>{
      const {value} = event.target;
      const newingredients = [...recipe.ingredients];
      newingredients[idx]=value;
      setRecipe({...recipe,ingredients: newingredients});
      console.log(recipe);
    };
    // add new ingredients input
      const addIngredient = ()=> {
        setRecipe({...recipe, ingredients:[...recipe.ingredients, ""] });
      }

      // handle form submission for creating or updating a recipe
      const onSubmit = async (event) => {
        event.preventDefault();
        if (editingRecipeId){
            try{
                await axios.put(`http://localhost:3001/recipes/${editingRecipeId}`, recipe)// mske a put req to udate the recipe
                console.log(recipe.data);
                setRecipes(recipes.map(r => r._id === editingRecipeId ? response.data : r))// update the recipes state with the updtaed recipe
                setEdittingRecipeId(null);
                setRecipe({
                    name: "",
                    description: "",
                    ingredients: [],
                    instructions: "",
                    imageUrl: "",
                    cookingTime: 0,
                    // userOwner:userID,
                });
                alert("Recipe Updated")
                
            }catch (err){
                console.error(err);
              }
        } else{

        try{
           const  response = await axios.post("http://localhost:3001/recipes", recipe)
            console.log(response.data);
            setRecipes([...recipes, response.data])// updating satate here eith the updated recipe
                setRecipe({
                    name: "",
                    description: "",
                    ingredients: [],
                    instructions: "",
                    imageUrl: "",
                    cookingTime: 0,
                    // userOwner:userID,
                });
                alert("Recipe Created")
                

        }catch (err){
        console.error(err);
      }}}



      // dDelete  a recipe
      const deleteRecipe = async (id) => {
        try{
            await axios.delete(`http://localhost:3001/recipes/${id}`);// make a delete req to the server to remove the recipe with the specified Id
            setRecipes(recipes.filter(recipe =>recipe._id !== id));// update the state to remove the deleted 
        }catch (err){
            console.error(err);
          }
      }




      // start editing a recipe
      const startEditing = (id) => {
        const recipeToEdit = recipes.find(r => r._id === id);
        setRecipe(recipeToEdit);
        setEdittingRecipeId(id);
      };




    return (
        
        <div className="create-recipe">
        <h2>{editingRecipeId ? "Edit Recipe" : "Create Recipe"}</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
           value={recipe.name}
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={recipe.name}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="ingredients"> Ingredients</label>
          <button onClick={addIngredient} type='button'> Add Ingredient</button>
         { recipe.ingredients.map((ingredient, idx) => (
            <input 
          key={idx}
          type="text"
          name="ingredients"
          value={ingredient}
          onChange={(event) => handleIngredientChange(event, idx)} />
         ))}
         
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            
            onChange={handleChange}
          ></textarea>
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
          />
          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
         
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
          />
          
          <button type="submit">{editingRecipeId ? "Update Recipe" : "Create Recipe"}</button> 
           </form>

           
              <h2>Recipes List</h2>
                 {recipes.map(recipe => (
                 <div key={recipe._id}>
                    <h3>{recipe.name}</h3>
                    <p>{recipe.ingredients.join(', ')}</p>
                    <p>{recipe.cookingTime} minutes</p>
                    <button onClick={() => startEditing(recipe._id)}>Edit</button>
                    <button onClick={() => deleteRecipe(recipe._id)}>Delete</button>
                </div>
            ))}
      </div>
    );
}


export default Createrecipe