const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const URI=process.env.DATABASE_URL
async function main() {
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
}
main()
    .then(() => {
        console.log('database connected')
    })
    .catch((err) => {
        console.log(err)
    })