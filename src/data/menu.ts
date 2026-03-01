export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category:
    | 'Signature Pizzas'
    | 'Gourmet White Pies'
    | 'Spicy & Bold'
    | 'Plant-Based'
    | 'Calzones'
    | 'Wings'
    | 'Salads'
    | 'Sides'
    | 'Dips'
    | 'Desserts';
  image: string;
  popular?: boolean;
  ingredients?: string[];
}

export const MENU_ITEMS: MenuItem[] = [
  // Signature Pizzas
  {
    id: 'sig1',
    name: 'Margherita Reserve',
    description: 'San Marzano tomato, fresh mozzarella, basil, sea salt, olive oil, blistered crust.',
    price: 1800,
    category: 'Signature Pizzas',
    image: 'https://images.unsplash.com/photo-1548365328-9f547fbafd74?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'sig2',
    name: 'Pepperoni Luxe',
    description: 'Cup-and-char pepperoni, aged mozzarella, parmesan, oregano, chili honey, caramelized edges.',
    price: 2000,
    category: 'Signature Pizzas',
    image: 'https://images.unsplash.com/photo-1601924579404-2246f5abb882?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sig3',
    name: 'The Works Royale',
    description: 'Sausage, pepperoni, mushrooms, peppers, onions, olives; hearty and perfectly balanced.',
    price: 2200,
    category: 'Signature Pizzas',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e4?auto=format&fit=crop&w=800&q=80'
  },

  // Gourmet White Pies
  {
    id: 'white1',
    name: 'Truffle Mushroom',
    description: 'Garlic cream, fontina, roasted mushrooms, black truffle finish, chives, aromatic luxury.',
    price: 2100,
    category: 'Gourmet White Pies',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0863b87?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'white2',
    name: 'Garlic Ricotta Cloud',
    description: 'Whipped ricotta, confit garlic, mozzarella, lemon zest, cracked pepper, olive oil.',
    price: 1900,
    category: 'Gourmet White Pies',
    image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'white3',
    name: 'Pesto Chicken Verde',
    description: 'Basil pesto, roasted chicken, mozzarella pearls, tomatoes, pine nuts; bright summer vibes.',
    price: 2000,
    category: 'Gourmet White Pies',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80'
  },

  // Spicy & Bold
  {
    id: 'spice1',
    name: 'Inferno Habanero',
    description: 'Fiery habanero sauce, pepperoni, jalapeños, mozzarella, chili flakes, ranch ribbons.',
    price: 1900,
    category: 'Spicy & Bold',
    image: 'https://images.unsplash.com/photo-1544885935-efee8f19e80f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'spice2',
    name: 'Hot Honey Salami',
    description: 'Sweet heat glaze, spicy salami, garlic oil, mozzarella, Calabrian chilies, perfect kick.',
    price: 2000,
    category: 'Spicy & Bold',
    image: 'https://images.unsplash.com/photo-1613564834361-9436948817d5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'spice3',
    name: 'Buffalo Blue Blaze',
    description: 'Buffalo swirl, grilled chicken, mozzarella, blue cheese crumble, scallion finish.',
    price: 1800,
    category: 'Spicy & Bold',
    image: 'https://images.unsplash.com/photo-1566843971836-89b7b28c66e8?auto=format&fit=crop&w=800&q=80'
  },

  // Plant-Based
  {
    id: 'plant1',
    name: 'Vegan Garden',
    description: 'Peppers, artichokes, mushrooms, olives, spinach, dairy-free mozzarella, bright passata, herbaceous.',
    price: 1700,
    category: 'Plant-Based',
    image: 'https://images.unsplash.com/photo-1546549037-848203b6f806?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'plant2',
    name: 'Beyond Meat Supreme',
    description: 'Plant-based crumbles, marinara, vegan cheese, roasted onions, peppers, bold satisfaction.',
    price: 1900,
    category: 'Plant-Based',
    image: 'https://images.unsplash.com/photo-1628840042884-789a8b85bd47?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'plant3',
    name: 'Dairy-Free Truffle',
    description: 'Cashew cream, roasted mushrooms, truffle oil, arugula, lemon brightness, luxurious vegan.',
    price: 2100,
    category: 'Plant-Based',
    image: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=800&q=80'
  },

  // Calzones
  {
    id: 'cal1',
    name: 'Meatball Marinara',
    description: 'Hand-rolled dough, meatballs, rich marinara, mozzarella, pecorino; cozy Italian comfort.',
    price: 1400,
    category: 'Calzones',
    image: 'https://images.unsplash.com/photo-1585238341267-1cfec2047b9e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cal2',
    name: 'Five-Cheese Blend',
    description: 'Mozzarella, provolone, fontina, ricotta, parmesan inside buttery crust; melty bliss.',
    price: 1300,
    category: 'Calzones',
    image: 'https://images.unsplash.com/photo-1543342386-1a7b2df8ff84?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cal3',
    name: 'Spinach & Feta',
    description: 'Garlic sautéed spinach, feta, herbs, lemon zest; light yet deeply satisfying.',
    price: 1200,
    category: 'Calzones',
    image: 'https://images.unsplash.com/photo-1599785209707-28f3f8ad1345?auto=format&fit=crop&w=800&q=80'
  },

  // Wings
  {
    id: 'wing1',
    name: 'Classic Buffalo',
    description: 'Crisp wings in tangy Buffalo sauce; celery and blue cheese on side.',
    price: 1200,
    category: 'Wings',
    image: 'https://images.unsplash.com/photo-1604908177220-9f0e6d1e6b98?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'wing2',
    name: 'Honey Garlic',
    description: 'Slow-simmered honey garlic glaze, sesame sprinkle; irresistibly sticky-sweet, savory finish.',
    price: 1300,
    category: 'Wings',
    image: 'https://images.unsplash.com/photo-1608032363049-149d3bd4bd5c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'wing3',
    name: 'Lemon Pepper Dry Rub',
    description: 'Lemon zest and cracked pepper coat crisp wings; buttery, bright, zesty indulgence.',
    price: 1300,
    category: 'Wings',
    image: 'https://images.unsplash.com/photo-1611255550541-f7bde18d0c09?auto=format&fit=crop&w=800&q=80'
  },

  // Salads
  {
    id: 'sal1',
    name: 'Caesar Classic',
    description: 'Crisp romaine, parmesan, croutons, anchovy dressing, cracked pepper, lemon lift.',
    price: 1000,
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sal2',
    name: 'Greek Goddess',
    description: 'Tomatoes, cucumbers, olives, feta, oregano vinaigrette, red onion, fresh herbs.',
    price: 1100,
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sal3',
    name: 'Garden Harvest',
    description: 'Mixed greens, roasted beets, walnuts, goat cheese, citrus vinaigrette, seasonal brightness.',
    price: 1200,
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=800&q=80'
  },

  // Sides
  {
    id: 'side1',
    name: 'Garlic Knots',
    description: 'Hand-tied dough, garlic butter, parmesan dusting, parsley; warm marinara side.',
    price: 700,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'side2',
    name: 'Mozzarella Sticks',
    description: 'Crisp golden crust, gooey mozzarella center, bright marinara for dipping.',
    price: 800,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'side3',
    name: 'Loaded Potato Wedges',
    description: 'Roasted wedges, cheddar melt, bacon, scallions, sour cream drizzle; hearty snack.',
    price: 900,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1543337207-5bf88ef19698?auto=format&fit=crop&w=800&q=80'
  },

  // Dips
  {
    id: 'dip1',
    name: 'Truffle Mayo',
    description: 'Silky truffle, lemon, herbs; decadent dip for everything, luxuriously earthy.',
    price: 600,
    category: 'Dips',
    image: 'https://images.unsplash.com/photo-1589308078053-158f5f1f1b96?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dip2',
    name: 'Creamy Garlic',
    description: 'Roasted garlic and chives folded into velvety crema; bright, savory elegance.',
    price: 500,
    category: 'Dips',
    image: 'https://images.unsplash.com/photo-1514511547119-1654700fb60f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dip3',
    name: 'Spicy Ranch',
    description: 'Buttermilk ranch kissed with cayenne, paprika, jalapeño; cooling heat, craveable balance.',
    price: 500,
    category: 'Dips',
    image: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=800&q=80'
  },

  // Desserts
  {
    id: 'des1',
    name: 'Cinnamon Sugar Bites',
    description: 'Warm dough bites in cinnamon sugar, vanilla glaze drizzle; nostalgic comfort.',
    price: 700,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'des2',
    name: 'Chocolate Lava Cake',
    description: 'Molten-centered chocolate cake, vanilla gelato side; indulgent, elegant finale.',
    price: 900,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'des3',
    name: 'Artisanal Sodas',
    description: 'Small-batch sparkling sodas with real fruit; balanced sweetness, refreshing finish.',
    price: 500,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=800&q=80'
  },

  // Additional items to reach ~50 products
  // Signature Pizzas
  {
    id: 'sig4',
    name: 'Smoked Prosciutto Fig',
    description: 'Ricotta base, smoked prosciutto, figs, arugula, balsamic glaze, sweet-savory luxury.',
    price: 2300,
    category: 'Signature Pizzas',
    image: 'https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sig5',
    name: 'Sicilian Sausage Crumble',
    description: 'Robust tomato, fennel sausage, roasted peppers, olives, pecorino finish, rustic boldness.',
    price: 2100,
    category: 'Signature Pizzas',
    image: 'https://images.unsplash.com/photo-1548365324-0f5d7f8a9d56?auto=format&fit=crop&w=800&q=80'
  },

  // Gourmet White Pies
  {
    id: 'white4',
    name: 'Carbonara Bianca',
    description: 'Cream base, guanciale, pecorino, black pepper, soft yolk drizzle, silky indulgence.',
    price: 2200,
    category: 'Gourmet White Pies',
    image: 'https://images.unsplash.com/photo-1604917869799-8e03f5a5b2a9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'white5',
    name: 'Four Cheese Alchemy',
    description: 'Mozzarella, fontina, taleggio, parmesan harmony; garlic oil and thyme accent.',
    price: 2000,
    category: 'Gourmet White Pies',
    image: 'https://images.unsplash.com/photo-1541745537413-b804d9048a04?auto=format&fit=crop&w=800&q=80'
  },

  // Spicy & Bold
  {
    id: 'spice4',
    name: 'Diavola Calabrese',
    description: 'Calabrese salami, hot chilies, garlic confit, oregano, chili oil; blazing character.',
    price: 2050,
    category: 'Spicy & Bold',
    image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'spice5',
    name: 'Sriracha Pineapple Heatwave',
    description: 'Sriracha-kissed tomato, roasted pineapple, jalapeños, smoky ham; sweet-heat fireworks.',
    price: 1950,
    category: 'Spicy & Bold',
    image: 'https://images.unsplash.com/photo-1601924582971-b0c5a01a5f3d?auto=format&fit=crop&w=800&q=80'
  },

  // Plant-Based
  {
    id: 'plant4',
    name: 'Mediterranean Veg Medley',
    description: 'Zesty tomato, olives, artichokes, cherry tomatoes, red onion, vegan feta crumble.',
    price: 1750,
    category: 'Plant-Based',
    image: 'https://images.unsplash.com/photo-1506355683710-bd071c0a5828?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'plant5',
    name: 'Roasted Cauliflower Tahini',
    description: 'Roasted cauliflower, tahini drizzle, pine nuts, parsley, lemon zest; earthy brightness.',
    price: 1850,
    category: 'Plant-Based',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'
  },

  // Calzones
  {
    id: 'cal4',
    name: 'Chicken Pesto Fold',
    description: 'Roasted chicken, basil pesto, mozzarella, sun-dried tomatoes; golden-baked handheld satisfaction.',
    price: 1350,
    category: 'Calzones',
    image: 'https://images.unsplash.com/photo-1595295333152-78190a520f4c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cal5',
    name: 'Spicy Pepperoni Pocket',
    description: 'Zesty marinara, pepperoni, chili flakes, mozzarella; crackling crust, cheesy molten center.',
    price: 1250,
    category: 'Calzones',
    image: 'https://images.unsplash.com/photo-1612927606382-9f8e6bd5a2e6?auto=format&fit=crop&w=800&q=80'
  },

  // Wings
  {
    id: 'wing4',
    name: 'Korean Gochujang Wings',
    description: 'Crispy wings lacquered in gochujang glaze; sesame and scallion finish, addictive.',
    price: 1400,
    category: 'Wings',
    image: 'https://images.unsplash.com/photo-1617195737492-9a48eb2b29d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'wing5',
    name: 'Garlic Parmesan Wings',
    description: 'Buttery garlic-parm coating, herby finish; savory, rich, utterly craveable crowd favorite.',
    price: 1350,
    category: 'Wings',
    image: 'https://images.unsplash.com/photo-1612392062511-734a3239ac49?auto=format&fit=crop&w=800&q=80'
  },

  // Salads
  {
    id: 'sal4',
    name: 'Super Green Power',
    description: 'Kale, spinach, avocado, cucumber, pumpkin seeds, lemon-herb vinaigrette; refreshing crunch.',
    price: 1150,
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea3f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sal5',
    name: 'Roasted Beet Citrus',
    description: 'Beets, oranges, goat cheese, toasted walnuts, arugula, citrus dressing; jewel-toned vibrance.',
    price: 1250,
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'
  },

  // Sides
  {
    id: 'side4',
    name: 'Parmesan Truffle Fries',
    description: 'Hand-cut fries, truffle oil, parmesan rain, parsley; irresistibly aromatic golden crunch.',
    price: 950,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1541592553160-82008b127ccb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'side5',
    name: 'Cheesy Breadsticks',
    description: 'Buttery breadsticks loaded with mozzarella; served with warm marinara for dipping.',
    price: 850,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1619099982226-2471daa436d6?auto=format&fit=crop&w=800&q=80'
  },

  // Dips
  {
    id: 'dip4',
    name: 'Basil Pesto Dip',
    description: 'Fresh basil, parmesan, pine nuts, olive oil; vibrant, nutty, deeply aromatic companion.',
    price: 550,
    category: 'Dips',
    image: 'https://images.unsplash.com/photo-1496115965489-21be7e6e59b0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dip5',
    name: 'Smoky Chipotle Crema',
    description: 'Smoked chipotle, lime, crema; velvety texture with gentle lingering heat, versatile.',
    price: 550,
    category: 'Dips',
    image: 'https://images.unsplash.com/photo-1563245372-8526dfd84407?auto=format&fit=crop&w=800&q=80'
  },

  // Desserts
  {
    id: 'des4',
    name: 'Tiramisu Jar',
    description: 'Espresso-soaked ladyfingers, mascarpone cream, cocoa dust; elegant, silky handheld dessert.',
    price: 1000,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1541976076758-347942db1970?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'des5',
    name: 'New York Cheesecake',
    description: 'Creamy cheesecake wedge, buttery crust, seasonal fruit coulis; timeless, decadent finish.',
    price: 1100,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1578756645270-8cb7cf572e56?auto=format&fit=crop&w=800&q=80'
  }
];
