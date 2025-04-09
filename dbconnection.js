const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const URI=process.env.DATABASE_URL
async function main() {
    await mongoose.connect(URI)
}
main()
    .then(() => {
        console.log('Database connected ✅')
    })
    .catch((err) => {
        console.log(err)
    })