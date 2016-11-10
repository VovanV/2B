import express from 'express';
import cors from 'cors'

const __DEV__ = true;
const app = express();

function validation(inputValue){

    if (!inputValue) {
        return false;
    }
    var Reg61 = new RegExp('^.*[^ _A-zА-яЁёó].*$');
    if (Reg61.test(inputValue)) {
        return false;
    }

    var result = inputValue.split(/ /);
    if (result.length > 3) {
        return false;
    }



    return result[result.length-1] +((result[result.length-3])? (' '+result[result.length-3].substr(0,1)+'.').toUpperCase():'')+((result[result.length-2])? (' '+result[result.length-2].substr(0,1)+'.').toUpperCase():'')
}

app.use(cors());
app.get('/', (req, res) => {
    try {
        const result = validation(req.query.fullname)
        if (result) res.send(String(result))
        else res.send('Invalid fullname')
       // const fio =
        //const inputA = ((req.query.a) ? req.query.a : 0);
        //const a = (((+inputA) && typeof (+inputA) === 'number')? (+inputA):0);
        //const b = (((+inputB) && typeof (+inputB) === 'number')? (+inputB):0);
       // const result = a + b;
    }
    catch(e) {
        res.send(e);
    }
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000');
})
