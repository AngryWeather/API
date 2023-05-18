const getCategories = async (req, res) => {
    const response = await fetch("https://opentdb.com/api_category.php");
    const json = await response.json();
    res.status(200).json(json);
}

const isNumOfQuestionsValid = numOfQuestions => {
    console.log(numOfQuestions);
    return (numOfQuestions > 0) && (numOfQuestions < 51);
}

const postTriviaData = (req, res, next) => {
    const {numOfQuestions} = req.body;
    
    if (!isNumOfQuestionsValid(numOfQuestions)) {
        res.status(400).json({error: "Number of questions must be between 1 and 50 (both inclusive)"});
    }

    next();
}

const generateURL = async (req) => {
    let url = `https://opentdb.com/api.php?amount=${req.body.numOfQuestions}`;

    if (req.body.category !== undefined) {
        const response = await fetch("https://opentdb.com/api_category.php");
        const categories = await response.json();
        const id = categories.trivia_categories.find(n => n.name === req.body.category).id;
        url += `&category=${id}`;        
    } if (req.body.type !== undefined) {
        url += `&type=${req.body.type}`;
    } if (req.body.difficulty !== undefined) {
        url += `&difficulty=${req.body.difficulty}`;
    }

    return url;
}

const generateForm = async (req, res) => {
    const url = await generateURL(req);
    const response = await fetch(url); 
    const trivia = await response.json();
    
    res.status(200).json(trivia);
}

module.exports = {
    getCategories,
    postTriviaData,
    generateForm,
};