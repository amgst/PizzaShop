export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Pizza' | 'Burgers' | 'Pasta' | 'Wings' | 'Sandwiches';
  image: string;
  popular?: boolean;
  ingredients?: string[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'p1',
    name: 'The Crown Crust',
    description: 'Our signature pizza with a cheesy crown crust, loaded with pepperoni and veggies.',
    price: 1450,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    popular: true,
    ingredients: ['Cheesy Crown Crust', 'Premium Pepperoni', 'Fresh Bell Peppers', 'Red Onions', 'Signature Tomato Sauce', '100% Mozzarella'],
  },
  {
    id: 'p2',
    name: 'Fajita Passion',
    description: 'Spicy chicken fajita, onions, bell peppers, and lots of mozzarella.',
    price: 1250,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Spicy Chicken Fajita', 'Green Bell Peppers', 'White Onions', 'Mozzarella Cheese', 'Oregano', 'Chili Flakes'],
  },
  {
    id: 'b1',
    name: 'Monster Beef Burger',
    description: 'Double beef patty, caramelized onions, secret sauce, and melted cheddar.',
    price: 850,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    popular: true,
    ingredients: ['Double Beef Patty', 'Caramelized Onions', 'Melted Cheddar', 'Secret House Sauce', 'Toasted Brioche Bun', 'Fresh Lettuce'],
  },
  {
    id: 'b2',
    name: 'Zinger Supreme',
    description: 'Crispy fried chicken fillet with lettuce, mayo, and a toasted bun.',
    price: 650,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1513185158878-8d8c196b8dd3?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Crispy Chicken Fillet', 'Fresh Iceberg Lettuce', 'Creamy Mayo', 'Sesame Seed Bun', 'Pickles'],
  },
  {
    id: 'pa1',
    name: 'Creamy Alfredo',
    description: 'Fettuccine pasta in a rich and creamy white sauce with grilled chicken.',
    price: 950,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1645112481338-3518977af114?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Fettuccine Pasta', 'Grilled Chicken Breast', 'Heavy Cream', 'Parmesan Cheese', 'Garlic', 'Fresh Parsley'],
  },
  {
    id: 'w1',
    name: 'Honey BBQ Wings',
    description: '10 pieces of crispy wings tossed in our sweet and smoky BBQ sauce.',
    price: 750,
    category: 'Wings',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
    ingredients: ['10pcs Chicken Wings', 'Honey BBQ Glaze', 'Smoked Paprika', 'Ranch Dip (on side)', 'Celery Sticks'],
  },
  {
    id: 's1',
    name: 'Club Sandwich',
    description: 'Classic triple-decker with chicken, egg, cheese, and fresh veggies.',
    price: 550,
    category: 'Sandwiches',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Grilled Chicken', 'Fried Egg', 'Cheddar Cheese', 'Fresh Tomatoes', 'Cucumber', 'Toasted White Bread'],
  }
];
