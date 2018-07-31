const Realm = require('realm');

// Define your models and their properties 
// 定义模型及其属性
const CarSchema = {
  name: 'Car',
  properties: {
    make:  'string',
    model: 'string',
    miles: {type: 'int', default: 0},
  }
};
const PersonSchema = {
  name: 'Person',
  properties: {
    name:     'string',
    birthday: 'date',
    cars:     'Car[]',
    picture:  'data?' // optional property
  }
};

const RealmOpen = () => {
   Realm.open({schema: [CarSchema, PersonSchema]}).then(realm => {
    // Create Realm objects and write to local storage
    realm.write(() => {
      const myCar = realm.create('Car', {
        make: 'Honda',
        model: 'Civic',
        miles: 1000,
      });
      myCar.miles += 20; // Update a property value
      console.log('myCar:', myCar)
    });

    // Query Realm for all cars with a high mileage
    const cars = realm.objects('Car').filtered('miles > 1000');
    console.log('cars1:', JSON.stringify(cars))
    // Will return a Results object with our 1 car
    cars.length // => 1

    // Add another car
    realm.write(() => {
      const myCar = realm.create('Car', {
        make: 'Ford',
        model: 'Focus',
        miles: 2000,
      });
    }); 
    console.log('cars2:', cars)
    // Query results are updated in realtime
    cars.length // => 2
  })
  .catch(error => {
    console.log(error);
  });
}
export {
  RealmOpen,
}
export default {
  RealmOpen,
}