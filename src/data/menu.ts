export const MENU_CATEGORIES = [
  'Classic Pizzas',
  'Chicken Pizzas',
  'Beef Pizzas',
  'Pakistani Flavor Pizzas',
  'Special / House Special',
  'Veggie Pizzas',
  'Deals / Combos',
  'Sides',
  'Drinks',
  'Desserts'
] as const;

export type MenuCategory = (typeof MENU_CATEGORIES)[number];

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  popular?: boolean;
  ingredients?: string[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'classic-cheese',
    name: 'Cheese Pizza',
    description: 'Mozzarella-loaded classic pizza with rich tomato sauce and a golden crust.',
    price: 1299,
    category: 'Classic Pizzas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
    popular: true
  },
  {
    id: 'classic-pepperoni',
    name: 'Pepperoni Pizza',
    description: 'Classic pepperoni slices over extra cheese and house pizza sauce.',
    price: 1499,
    category: 'Classic Pizzas',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'classic-chicken',
    name: 'Chicken Pizza',
    description: 'Tender chicken, mozzarella, and herbs on a classic tomato base.',
    price: 1549,
    category: 'Classic Pizzas',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'chicken-tikka',
    name: 'Chicken Tikka Pizza',
    description: 'Spicy chicken tikka, onions, capsicum, and cheese on a smoky sauce base.',
    price: 1699,
    category: 'Chicken Pizzas',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=900&q=80',
    popular: true
  },
  {
    id: 'chicken-fajita',
    name: 'Chicken Fajita Pizza',
    description: 'Fajita chicken with onions and peppers for a bold, savory bite.',
    price: 1749,
    category: 'Chicken Pizzas',
    image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'chicken-supreme',
    name: 'Chicken Supreme Pizza',
    description: 'Loaded with chicken, olives, onions, capsicum, and melting cheese.',
    price: 1849,
    category: 'Chicken Pizzas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'bbq-chicken',
    name: 'BBQ Chicken Pizza',
    description: 'Smoky BBQ chicken with onion, cheese, and a tangy barbecue finish.',
    price: 1799,
    category: 'Chicken Pizzas',
    image: 'https://images.unsplash.com/photo-1541745537413-b804d9048a04?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'chicken-lover',
    name: 'Chicken Lover Pizza',
    description: 'A heavy chicken-loaded pizza made for customers who want extra protein.',
    price: 1899,
    category: 'Chicken Pizzas',
    image: 'https://images.unsplash.com/photo-1601924638867-3ec2b0d7c3b8?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'beef-pepperoni',
    name: 'Beef Pepperoni Pizza',
    description: 'Beef pepperoni layered with mozzarella and house pizza sauce.',
    price: 1749,
    category: 'Beef Pizzas',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'beef-supreme',
    name: 'Beef Supreme Pizza',
    description: 'Seasoned beef, onions, capsicum, olives, and cheese in every slice.',
    price: 1849,
    category: 'Beef Pizzas',
    image: 'https://images.unsplash.com/photo-1601924582971-b0c5a01a5f3d?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'bbq-beef',
    name: 'BBQ Beef Pizza',
    description: 'Smoky barbecue beef with onion and a rich cheese topping.',
    price: 1799,
    category: 'Beef Pizzas',
    image: 'https://images.unsplash.com/photo-1548365328-9f547fbafd74?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'pak-chicken-tikka',
    name: 'Chicken Tikka Pizza',
    description: 'Desi-style chicken tikka pizza with green chilies and bold masala flavor.',
    price: 1749,
    category: 'Pakistani Flavor Pizzas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'seekh-kebab',
    name: 'Seekh Kebab Pizza',
    description: 'Spiced seekh kebab chunks with onion, capsicum, and mozzarella cheese.',
    price: 1899,
    category: 'Pakistani Flavor Pizzas',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=900&q=80',
    popular: true
  },
  {
    id: 'malai-boti',
    name: 'Malai Boti Pizza',
    description: 'Creamy malai boti chicken with cheese and a mild Pakistani-style sauce.',
    price: 1949,
    category: 'Pakistani Flavor Pizzas',
    image: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'behari-chicken',
    name: 'Behari Chicken Pizza',
    description: 'Behari-marinated chicken with smoky spices and a rich cheesy layer.',
    price: 1949,
    category: 'Pakistani Flavor Pizzas',
    image: 'https://images.unsplash.com/photo-1600628422019-6c8a4fa8f3c3?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'special-pizza',
    name: 'Special Pizza',
    description: 'A loaded house special pizza with chicken, beef, vegetables, and extra cheese.',
    price: 1999,
    category: 'Special / House Special',
    image: 'https://images.unsplash.com/photo-1541745537413-b804d9048a04?auto=format&fit=crop&w=900&q=80',
    popular: true
  },
  {
    id: 'crown-crust',
    name: 'Crown Crust Pizza',
    description: 'Signature crown crust pizza with cheesy stuffed edges and premium toppings.',
    price: 2299,
    category: 'Special / House Special',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'stuffed-crust',
    name: 'Stuffed Crust Pizza',
    description: 'Cheese-filled crust pizza with rich sauce and a satisfying cheesy finish.',
    price: 2199,
    category: 'Special / House Special',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'super-supreme',
    name: 'Super Supreme Pizza',
    description: 'An overloaded premium pizza with meat, vegetables, and maximum cheese.',
    price: 2399,
    category: 'Special / House Special',
    image: 'https://images.unsplash.com/photo-1548365324-0f5d7f8a9d56?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'veggie-lover',
    name: 'Veggie Lover Pizza',
    description: 'A colorful mix of vegetables, mozzarella, and classic tomato sauce.',
    price: 1499,
    category: 'Veggie Pizzas',
    image: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'garden-fresh',
    name: 'Garden Fresh Pizza',
    description: 'Fresh tomatoes, onions, capsicum, mushrooms, and olives on a crisp base.',
    price: 1549,
    category: 'Veggie Pizzas',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'mushroom-pizza',
    name: 'Mushroom Pizza',
    description: 'Simple and satisfying mushroom pizza with cheese and house seasoning.',
    price: 1599,
    category: 'Veggie Pizzas',
    image: 'https://images.unsplash.com/photo-1600028068383-ea11a7a101f3?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'family-deal',
    name: 'Family Deal',
    description: 'A family meal combo with large pizza, side, and drinks for sharing.',
    price: 3299,
    category: 'Deals / Combos',
    image: 'https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'student-deal',
    name: 'Student Deal',
    description: 'Budget-friendly personal pizza combo made for quick student meals.',
    price: 1199,
    category: 'Deals / Combos',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'pizza-drink-combo',
    name: 'Pizza + Drink Combo',
    description: 'One pizza with a chilled drink for a simple everyday combo.',
    price: 1599,
    category: 'Deals / Combos',
    image: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'pizza-wings-combo',
    name: 'Pizza + Wings Combo',
    description: 'A satisfying combo of pizza with crispy chicken wings.',
    price: 2199,
    category: 'Deals / Combos',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'garlic-bread',
    name: 'Garlic Bread',
    description: 'Freshly baked garlic bread brushed with butter and herbs.',
    price: 499,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'chicken-wings',
    name: 'Chicken Wings',
    description: 'Crispy chicken wings tossed in a flavorful house seasoning.',
    price: 899,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'fries',
    name: 'Fries',
    description: 'Hot and crispy fries served with seasoning and ketchup.',
    price: 399,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'nuggets',
    name: 'Nuggets',
    description: 'Golden chicken nuggets, crispy outside and juicy inside.',
    price: 599,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'soft-drinks',
    name: 'Soft Drinks',
    description: 'Chilled soft drink bottle to pair with your meal.',
    price: 199,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'mineral-water',
    name: 'Mineral Water',
    description: 'Refreshing mineral water bottle.',
    price: 99,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'juices',
    name: 'Juices',
    description: 'Assorted fruit juice options served chilled.',
    price: 249,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd5bba3f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'lava-cake',
    name: 'Lava Cake',
    description: 'Warm chocolate lava cake with a soft molten center.',
    price: 499,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1617305855058-336d24456869?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'brownie',
    name: 'Brownie',
    description: 'Rich chocolate brownie with a dense, fudgy texture.',
    price: 349,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'ice-cream',
    name: 'Ice Cream',
    description: 'Creamy ice cream scoop to finish your meal on a sweet note.',
    price: 299,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80'
  }
];
