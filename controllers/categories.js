const getCategories = async () => {
    const response = await fetch("https://opentdb.com/api_category.php");
    return await response.json();
}