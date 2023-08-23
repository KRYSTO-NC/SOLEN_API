const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({ path: './config/config.env' })

// Load models

const User = require('./models/User')
const Contact = require('./models/Contact')
const Compagny = require('./models/Compagny')
const Demandeur = require('./models/Demandeur')
const TypeInstallation = require('./models/TypeInstallation')
const  Installation = require('./models/Installation')
const  Benneficiare = require('./models/Benneficiaire')
const  Forfait = require('./models/Forfait')
const  Origine = require('./models/Origine')
const  Commune = require('./models/Commune')

// Connect to DB
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
})

// Read JSON files

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'),
)

const contacts = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/contacts.json`, 'utf-8'),
)
const compagnies = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/compagnies.json`, 'utf-8'),
)
const demandeurs = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/demandeur.json`, 'utf-8'),
)
const typeInstallations = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/typeInstallations.json`, 'utf-8'),
)
const installations = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/installations.json`, 'utf-8'),
)
const benneficiaires = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/benneficiares.json`, 'utf-8'),
)
const forfaits = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/forfaits.json`, 'utf-8'),
)
const origines = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/origines.json`, 'utf-8'),
)
const communes = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/communes.json`, 'utf-8'),
)

// Import into DB
const importData = async () => {
  try {
    await User.create(users)
    await Contact.create(contacts)
    await Compagny.create(compagnies)
    await Demandeur.create(demandeurs)
    await TypeInstallation.create(typeInstallations)
    await Installation.create(installations)
    await Benneficiare.create(benneficiaires)
    await Origine.create(origines)
    await Forfait.create(forfaits)
    await Commune.create(communes)

    console.log('Data Imported...'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany()
    await Contact.deleteMany()
    await Compagny.deleteMany()
    await Demandeur.deleteMany()
    await TypeInstallation.deleteMany()
    await Installation.deleteMany()
    await Benneficiare.deleteMany()
    await Forfait.deleteMany()
    await Origine.deleteMany()
    await Commune.deleteMany()
    console.log('Data Destroyed...'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
