import {useState, useEffect} from 'react'
import axios from'axios'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import UseGetUserId from '../hooks/UseGetUserId';



function HomePage() {
   const [recipes, setRecipes]= useState([]);
   const navigate = useNavigate();
   useEffect(() => {
    const fetchRecipe = async () =>{
        try{
           const response=  await axios.get("http://localhost:3001/recipes");
           setRecipes(response.data);
           console.log(response.data)
           

        }catch (err){
        console.error(err);
      }
    };
   
    fetchRecipe();

   }, []);
   const handleRecipeClick = () => {
    navigate(`resipe/${id}`);
}

   return (
    <div style={styles.container}>
      {recipes.map((recipe) => (
        <div key={recipe.id} style={styles.card}>
            <Link to={`/recipe/${recipe.id}`} style={styles.imagelink}>
          <div style={styles.imageContainer}>
            <img src={recipe.imageUrl} alt={recipe.name} style={styles.image} />
            <div style={styles.overlay}>
              <h3 style={styles.recipeName}>{recipe.name}</h3>
            </div>
          </div>
          </Link>

          <div style={styles.details}>
            <p style={styles.description}>{recipe.description}</p>
            <p style={styles.cookingTime}>Cooking Time: {recipe.cookingTime} (minutes)</p>
          </div>
        </div>
      ))}
    </div>
    
  );
};


        
    
  // Inline style
  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: '50px',
    },
    card: {
      width: '500px',
      margin: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      overflow: 'hidden',
      backgroundColor: '#fff',
    },
    imageContainer: {
      position: 'relative',
    },
    imageUrl: {
      width: '100%',
      height: 'auto',
    },
    overlay: {
      position: 'absolute',
      bottom: '0',
      background: 'rgba(0, 0, 0, 0.5)',
      width: '100%',
      textAlign: 'center',
      padding: '10px',
      color: '#fff',
    },
    recipeName: {
      margin: '0',
    },
    details: {
      padding: '10px',
    },
    description: {
      margin: '0 0 10px',
      color: '#555',
    },
    cookingTime: {
      margin: '0',
      fontWeight: 'bold',
      color: '#333',
    }}

    
          
    

export default HomePage



