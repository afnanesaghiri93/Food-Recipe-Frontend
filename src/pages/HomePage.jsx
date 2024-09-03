//====== Imports==========
//importing React hook
import {useState, useEffect} from 'react'// useState is used to create a state variables and useEffect is used for side effects like data fetching
import axios from'axios'//importing axios for making HTTP request for handling assync operation
import { Link } from 'react-router-dom';//importing Link for navigation Links
import { useNavigate } from 'react-router-dom';//importing useNavigate for programatic navigation
// import UseGetUserId from '../hooks/UseGetUserId';



function HomePage() {
   const [recipes, setRecipes]= useState([]);//state to store the list of recipes fetched drom the server
   const navigate = useNavigate();// function to navigate to diffrent routes programatically
   useEffect(() => {
      // Function to fetch recipes from the server
    const fetchRecipe = async () =>{
        try{
           const response=  await axios.get("http://localhost:3001/recipes");// Make GET request to fetch recipes
           setRecipes(response.data); // Set the fetched recipes to the state
           console.log(response.data) // Log the data for debugging purposes
           

        }catch (err){
        console.error(err);
      }
    };
   
    fetchRecipe();//call the function to fetch recipes when the component mounts

   }, []);// empty array means useEffect runs only after the initia;l render 
   const handleRecipeClick = () => {
    navigate(`resipe/${id}`);// function to navigate to a specific recipe page 
}

   return (
    <div style={styles.container}>
      {recipes.map((recipe) => (
        <div key={recipe.id} style={styles.card}>
             {/* Link component to navigate to the create recipe page */}
            <Link to={'/createrecipe'} style={styles.imagelink}>
          <div style={styles.imageContainer}>
          {/* Display recipe image */}
            <img src={recipe.imageUrl} alt={recipe.name} style={styles.image} />
            <div style={styles.overlay}>{/* Display recipe name in overlay */}
              <h3 style={styles.recipeName}>{recipe.name}</h3>
            </div>
          </div>
          </Link>

          <div style={styles.details}>
            <p style={styles.description}>{recipe.description}</p>{/* Display recipe description */}
             {/* Display cooking time */}
            <p style={styles.cookingTime}>Cooking Time: {recipe.cookingTime} (minutes)</p>
          </div>
        </div>
      ))}
    </div>
    
  );
};


        
    
  // Inline styles object
const styles = {
  container: {
    display: 'flex', // Use flexbox for layout
    flexWrap: 'wrap', // Allow cards to wrap to the next line
    justifyContent: 'center', // Center items horizontally
    padding: '50px', // Add padding around the container
  },
  card: {
    width: '500px', // Fixed width for each card
    margin: '20px', // Margin around each card
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow for card elevation
    borderRadius: '10px', // Rounded corners
    overflow: 'hidden', // Clip child elements to fit card boundaries
    backgroundColor: '#fff', // White background color for the card
  },
  imageContainer: {
    position: 'relative', // Relative positioning for overlay
  },
  imageUrl: {
    width: '100%', // Full width of the container
    height: 'auto', // Maintain aspect ratio
    display: 'block', // Display as block to remove any default inline spacing
  },
  overlay: {
    position: 'absolute', // Position overlay on top of the image
    bottom: '0', // Align to the bottom
    background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    width: '100%', // Full width of the container
    textAlign: 'center', // Center text
    padding: '10px', // Padding inside the overlay
    color: '#fff', // White text color
  },
  recipeName: {
    margin: '0', // Remove margin around heading
  },
  details: {
    padding: '10px', // Padding around details
  },
  description: {
    margin: '0 0 10px', // Margin below description
    color: '#555', // Darker text color for description
  },
  cookingTime: {
    margin: '0', // Remove margin around cooking time
    fontWeight: 'bold', // Bold font for emphasis
    color: '#333', // Darker color for cooking time
  },
};

    

export default HomePage



