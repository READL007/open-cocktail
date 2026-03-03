require('dotenv').config();
const sequelize = require('../src/config/database');
const Cocktail = require('../src/models/Cocktail');

const cocktails = [
  {
    name: 'Mojito',
    category: 'alcohol_free',
    preparation_time: 10,
    ingredients: '60ml white rum, 30ml lime juice, 2 tsp sugar, 6 fresh mint leaves, sparkling water, ice',
    steps: '1. Muddle mint leaves with sugar in a glass.\n2. Add lime juice and rum.\n3. Fill with ice and top with sparkling water.\n4. Stir gently and garnish with a mint sprig.',
    servings: 1,
    difficulty: 'easy',
    ustensils: 'Highball glass, muddler, bar spoon',
    image: null,
  },
  {
    name: 'Margarita',
    category: 'dry',
    preparation_time: 5,
    ingredients: '50ml tequila, 25ml triple sec, 25ml fresh lime juice, salt for rim, ice',
    steps: '1. Rim glass with salt.\n2. Combine tequila, triple sec and lime juice in a shaker with ice.\n3. Shake well for 15 seconds.\n4. Strain into the prepared glass over ice.',
    servings: 1,
    difficulty: 'easy',
    ustensils: 'Cocktail shaker, strainer, margarita glass',
    image: null,
  },
  {
    name: 'Espresso Martini',
    category: 'sugary',
    preparation_time: 8,
    ingredients: '50ml vodka, 30ml coffee liqueur, 30ml freshly brewed espresso, 10ml simple syrup, ice',
    steps: '1. Brew a fresh espresso and let it cool slightly.\n2. Add all ingredients to a shaker filled with ice.\n3. Shake hard for 20 seconds to create a foam.\n4. Double strain into a chilled martini glass.\n5. Garnish with 3 coffee beans.',
    servings: 1,
    difficulty: 'medium',
    ustensils: 'Cocktail shaker, double strainer, martini glass, espresso machine',
    image: null,
  },
  {
    name: 'Negroni',
    category: 'dry',
    preparation_time: 5,
    ingredients: '30ml gin, 30ml sweet vermouth, 30ml Campari, orange peel, ice',
    steps: '1. Fill a mixing glass with ice.\n2. Add gin, vermouth and Campari.\n3. Stir for 30 seconds until well chilled.\n4. Strain into a rocks glass over a large ice cube.\n5. Express an orange peel over the glass and drop it in.',
    servings: 1,
    difficulty: 'easy',
    ustensils: 'Mixing glass, bar spoon, strainer, rocks glass',
    image: null,
  },
  {
    name: 'Piña Colada',
    category: 'sugary',
    preparation_time: 10,
    ingredients: '60ml white rum, 90ml pineapple juice, 30ml coconut cream, 1 cup crushed ice',
    steps: '1. Add all ingredients to a blender.\n2. Blend until smooth and creamy.\n3. Pour into a chilled hurricane glass.\n4. Garnish with a pineapple slice and a cherry.',
    servings: 1,
    difficulty: 'easy',
    ustensils: 'Blender, hurricane glass, straw',
    image: null,
  },
  {
    name: 'Aperol Spritz',
    category: 'dry',
    preparation_time: 3,
    ingredients: '90ml Prosecco, 60ml Aperol, 30ml sparkling water, orange slice, ice',
    steps: '1. Fill a large wine glass with ice.\n2. Pour in Aperol, then Prosecco.\n3. Add a splash of sparkling water.\n4. Stir briefly and garnish with an orange slice.',
    servings: 1,
    difficulty: 'easy',
    ustensils: 'Large wine glass, bar spoon',
    image: null,
  },
  {
    name: 'Whiskey Sour',
    category: 'dry',
    preparation_time: 7,
    ingredients: '60ml bourbon whiskey, 30ml fresh lemon juice, 15ml simple syrup, 1 egg white (optional), ice, cherry and orange slice to garnish',
    steps: '1. Dry shake all ingredients (without ice) for 10 seconds if using egg white.\n2. Add ice and shake hard for 15 seconds.\n3. Strain into a rocks glass over ice.\n4. Garnish with a cherry and orange slice.',
    servings: 1,
    difficulty: 'medium',
    ustensils: 'Cocktail shaker, strainer, rocks glass',
    image: null,
  },
  {
    name: 'Virgin Strawberry Daiquiri',
    category: 'alcohol_free',
    preparation_time: 8,
    ingredients: '100g fresh strawberries, 30ml lime juice, 20ml simple syrup, 1 cup crushed ice, strawberry to garnish',
    steps: '1. Hull and halve the strawberries.\n2. Add strawberries, lime juice, syrup and ice to a blender.\n3. Blend until completely smooth.\n4. Pour into a chilled glass and garnish with a fresh strawberry.',
    servings: 1,
    difficulty: 'easy',
    ustensils: 'Blender, daiquiri glass',
    image: null,
  },
  {
    name: 'Old Fashioned',
    category: 'dry',
    preparation_time: 5,
    ingredients: '60ml bourbon or rye whiskey, 1 sugar cube, 2 dashes Angostura bitters, orange peel, ice',
    steps: '1. Place a sugar cube in a rocks glass.\n2. Saturate with bitters and a splash of water.\n3. Muddle until dissolved.\n4. Add whiskey and a large ice cube.\n5. Stir for 20 seconds.\n6. Express orange peel over the glass and use as garnish.',
    servings: 1,
    difficulty: 'medium',
    ustensils: 'Rocks glass, muddler, bar spoon',
    image: null,
  },
  {
    name: 'Blue Lagoon',
    category: 'alcohol_free',
    preparation_time: 5,
    ingredients: '45ml vodka, 30ml blue curaçao, 120ml lemonade, ice, lemon slice and cherry to garnish',
    steps: '1. Fill a highball glass with ice.\n2. Pour in vodka and blue curaçao.\n3. Top with lemonade and stir gently.\n4. Garnish with a lemon slice and maraschino cherry.',
    servings: 1,
    difficulty: 'easy',
    ustensils: 'Highball glass, bar spoon, straw',
    image: null,
  },
];

const seed = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced');

    const existing = await Cocktail.count();
    if (existing > 0) {
      console.log(`⚠️  Database already has ${existing} cocktail(s). Skipping seed.`);
      console.log('   Run with --force to wipe and re-seed: node seeders/cocktailSeeder.js --force');
      process.exit(0);
    }

    if (process.argv.includes('--force')) {
      await Cocktail.destroy({ where: {}, truncate: true });
      console.log('🗑️  Existing cocktails cleared.');
    }

    const created = await Cocktail.bulkCreate(cocktails);
    console.log(`🍹 Seeded ${created.length} cocktails successfully!`);
    created.forEach(c => console.log(`   - [${c.id}] ${c.name} (${c.category}, ${c.difficulty})`));
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

seed();