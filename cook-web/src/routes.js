import Recipe from './components/Recipe';
import RecipeDetail from './components/RecipeDetail';

var routes = [

 
  {
    path: '/',
    name: ' List',
    icon: 'ni ni-bullet-list-67 text-info',
    component: Recipe,
   
    visible:false,
  },
   
  {
    path: '/singleRecipe/:id',
    name: 'Recipe Detail',
    icon: 'ni ni-bullet-list-67 text-green',
    component: RecipeDetail,
   
    visible: false,
  },

];
export default routes;
