const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({ path: './config/config.env' })

// Load models

const User = require('./models/User')
const TypeInstallation = require('./models/TypeInstallation')
const Installation = require('./models/Installation')
const Intervention = require('./models/Intervention')
const ContratMaintenance = require('./models/ContratMaintenance')

// Connect to DB
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
})

// Read JSON files

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'),
)


const typeInstallations = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/typeInstallations.json`, 'utf-8'),
)
const installations = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/installations.json`, 'utf-8'),
)

const interventions = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/interventions.json`, 'utf-8'),
)
const contratsMaintenance = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/contratsMaintenance.json`, 'utf-8'),
)

// Import into DB
const importData = async () => {
  try {
    await User.create(users)
    await TypeInstallation.create(typeInstallations)
    await Installation.create(installations)
    await Intervention.create(interventions)
    await ContratMaintenance.create(contratsMaintenance)

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
    await TypeInstallation.deleteMany()
    await Installation.deleteMany()
    await Intervention.deleteMany()
    await ContratMaintenance.deleteMany()
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
