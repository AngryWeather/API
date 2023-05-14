const getCategories = async (req, res) => {
    const response = await fetch("https://opentdb.com/api_category.php");
    const json = await response.json();
    res.status(200).json(json);
}

module.exports = {
    getCategories,
};