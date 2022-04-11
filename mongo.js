const mongoose = require ('mongoose')
require('dotenv').config()

if (process.argv.length <3) {

    console.log('Usage: node mongo.js <name> <number>')
    process.exit(1)
}

const password = process.env.PASSWORD

const name = process.argv[2]

const phone = process.argv[3]

const url = `mongodb+srv://mannywq:${password}@mannywq.5xaev.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({

    name: String, 
    phone: String, 

})

const Person = mongoose.model('Person', personSchema);

const person = new Person({
    name: `${name}`,
    phone: `${phone}`
})

person.save().then(response => {

    console.log(`Added ${name} with ${phone} to phonebook`)
    
})

Person.find({}).then(result => {

    result.forEach(person => {

        console.log(person)
    })

    mongoose.connection.close()
})